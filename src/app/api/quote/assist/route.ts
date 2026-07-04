import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// 주관식 AI 견적 어시스턴트.
// 고객이 자유롭게 쓴 요청 → 실제 상품 카탈로그에서만 조합 → 추천 견적(항목·이유·제외·추가제안·메모).
// 원칙: 없는 상품·가격 절대 생성 금지, 중복 배제, 예산 인식, 애매하면 상담 권유.
const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";
const MODEL = process.env.QUOTE_ASSIST_MODEL ?? "claude-haiku-4-5-20251001";

export const maxDuration = 60;

interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  minQty: number;
  description: string;
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function lineTotal(p: CatalogProduct) {
  return p.price * (p.minQty || 1);
}

const SYSTEM = `너는 병원 해외·국내 마케팅 대행사 "열정의시간"의 견적 어시스턴트다.
고객(병원 원장·담당자)이 자유롭게 적은 요청을 읽고, 아래 제공되는 실제 상품 목록에서만 골라 추천 견적을 조합한다.

반드시 아래 JSON 스키마로만 답한다(설명·코드펜스 금지):
{"selected":[{"id":"상품id","reason":"왜 넣었는지 한 문장"}],
 "excluded":[{"name":"상품명","reason":"왜 뺐는지(중복 등)"}],
 "suggestions":[{"id":"상품id","reason":"선택은 아니지만 필요시 추가 제안 이유"}],
 "note":"예산·티어·우선순위 등 종합 메모 한두 문장"}

규칙(엄수):
- selected 의 id 는 반드시 제공된 목록에 있는 실제 id 만. 목록에 없는 상품·서비스·가격을 절대 지어내지 마라.
- 요청 목표에 꼭 필요한 것만 담아라. 관련 없는 걸 잔뜩 넣지 마라(과잉판매 금지).
- 중복 배제: 큰 대행 패키지에 이미 포함된 기능(예: '올인원 대행'에 SNS 운영 포함)이면, 같은 걸 단품으로 또 넣지 말고 excluded 에 이유와 함께 적어라.
- 예산 인식: 고객이 예산을 언급하면 그 안에 맞춰라. 풀 패키지가 예산을 넘으면 라이트/엔트리 옵션을 고르고 note 에 설명. "작게 시작" 요청이면 최소 구성부터.
- 목표가 여러 개면(예: 일본+대만) 각 목표에 맞는 상품을 각각 담되, 예산을 넘으면 우선순위를 note 에 제안.
- 애매하거나 매칭이 없으면 selected 를 비우거나 최소화하고, note 에 "상담을 통해 맞춤 제안" 을 권한다.
- 의료·미용이므로 과장된 효과·치료 단정 표현 금지. 확정 견적이 아니라 추천 초안임을 전제한다.
- 모든 문장은 한국어, 짧고 담백하게.`;

export async function POST(req: Request) {
  let text = "";
  try {
    const body = await req.json();
    text = (body?.text ?? "").toString().trim();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (!text) return NextResponse.json({ ok: false, error: "원하는 내용을 입력해주세요." }, { status: 400 });
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, error: "AI 견적 기능이 아직 설정되지 않았습니다. 아래에서 직접 선택하거나 상담을 이용해주세요." }, { status: 503 });
  }

  // 실제 상품 카탈로그 로드(인트라넷 public API)
  let products: CatalogProduct[] = [];
  try {
    const res = await fetch(`${INTRANET_URL}/api/public/quote/products`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      products = (data.products ?? []) as CatalogProduct[];
    }
  } catch {
    /* 무시 — 아래에서 빈 목록 처리 */
  }
  if (!products.length) {
    return NextResponse.json({ ok: false, error: "상품 목록을 불러오지 못했습니다. 잠시 후 다시 시도하거나 상담을 이용해주세요." }, { status: 502 });
  }

  const byId = new Map(products.map((p) => [p.id, p]));
  const catalog = products
    .map((p) => `- id:${p.id} | ${p.name} | 분류:${p.category} | 가격:${p.price ? format(lineTotal(p)) + "원" + (p.minQty > 1 ? `(최소 ${p.minQty})` : "") : "별도문의"} | ${p.description ?? ""}`)
    .join("\n");

  let parsed: {
    selected?: { id: string; reason?: string }[];
    excluded?: { name: string; reason?: string }[];
    suggestions?: { id: string; reason?: string }[];
    note?: string;
  } | null = null;

  let rawText = "";
  try {
    const r = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2500,
      temperature: 0.4,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `[고객 요청]\n${text}\n\n[선택 가능한 상품 목록]\n${catalog}\n\n위 목록에서만 골라 아래 스키마의 JSON 하나로만 답해줘(설명·코드펜스 없이 JSON 만).`,
        },
        // 어시스턴트 응답을 '{' 로 프리필 → 반드시 JSON 오브젝트로 이어서 생성(순수 JSON 강제)
        { role: "assistant", content: "{" },
      ],
    });
    const t = r.content.find((c) => c.type === "text");
    // 프리필한 '{' 를 앞에 복원하고, 마지막 '}' 까지만 취해 뒤 잡음 제거
    rawText = "{" + (t && t.type === "text" ? t.text : "");
    const end = rawText.lastIndexOf("}");
    const jsonStr = end >= 0 ? rawText.slice(0, end + 1) : rawText;
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error("[quote/assist] fail:", (e as Error).message, "| raw:", rawText.slice(0, 500));
    return NextResponse.json({ ok: false, error: "AI 조합에 실패했습니다. 아래에서 직접 선택하거나 상담을 이용해주세요." }, { status: 502 });
  }

  // AI 선택 id → 실제 상품으로 검증·join (없는 id 는 버림 = 환각 방지)
  const items = (parsed?.selected ?? [])
    .map((s) => {
      const p = byId.get(s.id);
      if (!p) return null;
      return { id: p.id, name: p.name, category: p.category, price: p.price, minQty: p.minQty || 1, lineTotal: lineTotal(p), reason: (s.reason ?? "").trim() };
    })
    .filter(Boolean) as {
    id: string; name: string; category: string; price: number; minQty: number; lineTotal: number; reason: string;
  }[];

  const suggestions = (parsed?.suggestions ?? [])
    .map((s) => {
      const p = byId.get(s.id);
      if (!p || items.some((it) => it.id === p.id)) return null;
      return { id: p.id, name: p.name, price: p.price, minQty: p.minQty || 1, lineTotal: lineTotal(p), reason: (s.reason ?? "").trim() };
    })
    .filter(Boolean);

  const excluded = (parsed?.excluded ?? []).filter((e) => e && e.name).map((e) => ({ name: e.name, reason: (e.reason ?? "").trim() }));

  const subtotal = items.reduce((s, it) => s + it.lineTotal, 0);
  const vat = Math.round(subtotal * 0.1);
  const total = subtotal + vat;

  return NextResponse.json({
    ok: true,
    items,
    suggestions,
    excluded,
    note: (parsed?.note ?? "").trim(),
    subtotal,
    vat,
    total,
    needsConsult: items.length === 0,
  });
}

function format(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}
