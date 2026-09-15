import { NextResponse } from "next/server";
import { QUESTIONS, recommend } from "@/lib/diagnosis/engine";

export const runtime = "nodejs";
export const maxDuration = 30;

const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";

// 남의 병원 이름으로 리포트를 반복해 받아가는 걸 막는다 — 같은 이메일·전화는 하루 3회까지.
// ponytail: 서버리스 인스턴스마다 따로 세는 메모리 제한. 악용이 보이면 인트라넷 DB(QuoteRequest) 기준으로 센다.
const hits = new Map<string, number[]>();
function limited(key: string) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < 86400_000);
  arr.push(now);
  hits.set(key, arr);
  return arr.length > 3;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const pick = (key: string, v: unknown): string[] => {
  const allowed = new Set((QUESTIONS as Record<string, { options: string[][] }>)[key]?.options.map((o) => o[0]) ?? []);
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && allowed.has(x)) : [];
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });

  const hospital = { name: str(body.hospital?.name, 60), address: str(body.hospital?.address, 120), homepage: str(body.hospital?.homepage, 200) };
  const contact = { phone: str(body.contact?.phone, 30), email: str(body.contact?.email, 120).toLowerCase(), name: str(body.contact?.name, 30) };
  if (!hospital.name) return NextResponse.json({ error: "병원명을 입력해 주세요." }, { status: 400 });
  if (!/^[0-9+\-\s()]{9,}$/.test(contact.phone)) return NextResponse.json({ error: "연락처를 확인해 주세요." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(contact.email)) return NextResponse.json({ error: "이메일 주소를 확인해 주세요." }, { status: 400 });
  if (limited(contact.email) || limited(contact.phone.replace(/\D/g, ""))) return NextResponse.json({ error: "오늘 요청 가능한 횟수를 넘었습니다. 카카오톡 채널로 문의해 주세요." }, { status: 429 });

  const a = body.answers ?? {};
  const q = a.channels?.quick;
  const answers = {
    opening: a.opening === true,
    openWhen: pick("openWhen", [a.openWhen])[0],
    countries: pick("countries", a.countries),
    pains: pick("pains", a.pains),
    openPains: pick("openPains", a.openPains),
    concerns: pick("concerns", a.concerns),
    ready: pick("ready", a.ready),
    doing: pick("doing", a.doing),
    budget: pick("budget", [a.budget])[0] ?? "m",
    other: Object.fromEntries(Object.entries(a.other ?? {}).map(([k, v]) => [k, str(v, 200)]).filter(([k, v]) => k in QUESTIONS && v)),
    memo: str(a.memo, 1000),
    channels: q && typeof q === "object"
      ? { quick: { url: str(q.url, 100), langLinks: ((q.langLinks ?? []).filter((x: unknown) => typeof x === "string").slice(0, 8)), hreflang: (q.hreflang ?? []).filter((x: unknown) => typeof x === "string").slice(0, 8), ...Object.fromEntries(["https", "mobile", "description", "instagram", "youtube", "kakao", "naverBlog", "naverBooking", "ga4", "metaPixel", "naverWcs"].map((k) => [k, q[k] === true])) }, blogMentions30d: Number.isFinite(a.channels?.blogMentions30d) ? Number(a.channels.blogMentions30d) : null }
      : null,
  };
  if (!answers.countries.length && !answers.other.countries) return NextResponse.json({ error: "환자 유치를 원하시는 국가를 선택해 주세요." }, { status: 400 });

  const r = recommend(answers);

  // 2) 견적 접수함 — 답변 전체를 메모로, 추천 상품을 담은 상품으로
  const label = (key: string, v: string) => (QUESTIONS as Record<string, { options: string[][] }>)[key]?.options.find((o) => o[0] === v)?.[1] ?? v;
  const memo = [
    `[진단형 견적] ${answers.opening ? "개원 예정" : hospital.address}`,
    hospital.homepage && `홈페이지: ${hospital.homepage}`,
    `국가: ${[...answers.countries.map((c) => label("countries", c)), answers.other.countries].filter(Boolean).join(", ")}`,
    answers.pains.length && `고민: ${answers.pains.map((p) => label("pains", p)).join(" / ")}`,
    answers.openPains.length && `개원 고민(${label("openWhen", answers.openWhen ?? "")}): ${answers.openPains.map((p) => label("openPains", p)).join(" / ")}`,
    answers.concerns.length && `해외 궁금증: ${answers.concerns.map((p) => label("concerns", p)).join(" / ")}`,
    answers.ready.length && `해외 준비: ${answers.ready.map((p) => label("ready", p)).join(", ")}`,
    answers.doing.length && `운영 중: ${answers.doing.map((p) => label("doing", p)).join(", ")}`,
    `예산: ${label("budget", answers.budget)}`,
    ...Object.entries(answers.other).map(([k, v]) => `직접 입력(${k}): ${v}`),
    answers.memo && `추가 내용: ${answers.memo}`,
    `진단: ${answers.opening ? "개원 전" : `가장 약한 곳 ${r.diagnosis.weakest}`} · 첫 달 ${(r.oneTime + r.monthly).toLocaleString()}만 · 매달 ${r.monthly.toLocaleString()}만`,
  ].filter(Boolean).join("\n");
  const items = [...r.foundation, ...r.engine, ...r.amplify].map((x) => ({ id: x.id, name: x.name, price: x.price * 10000 }));

  let requestNum = "";
  try {
    const res = await fetch(`${INTRANET_URL}/api/public/quote/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName: contact.name || hospital.name, email: contact.email, phone: contact.phone, hospitalName: hospital.name, memo, selectedProducts: items.length ? items : [{ id: "", name: "진단형 견적 상담", price: 0 }] }),
    });
    const d = await res.json().catch(() => ({}));
    requestNum = d.requestNum ?? "";
  } catch (e) {
    console.error("diagnosis intranet save failed", e);
  }

  // 3) 메일 — 홈페이지엔 메일 발송 키가 없어(2026-09-15 확인) 인트라넷이 대표 회사 메일함으로 PDF 를 만들어 보낸다.
  //    인트라넷은 방금 접수된 요청·같은 이메일일 때만 보낸다(아무 주소로나 보내는 창구가 되지 않게).
  let emailSent = false;
  if (requestNum) {
    try {
      const res = await fetch(`${INTRANET_URL}/api/public/diagnosis/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestNum, email: contact.email, hospital, answers }),
      });
      const d = await res.json().catch(() => ({}));
      emailSent = d.sent === true;
      if (!emailSent) console.error("diagnosis mail not sent", res.status, d.reason);
    } catch (e) {
      console.error("diagnosis mail request failed", e);
    }
  }

  return NextResponse.json({ success: true, emailSent, requestNum });
}
