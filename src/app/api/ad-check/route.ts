import { NextResponse } from "next/server";
import { runAdCheck } from "@/lib/ad-review/engine";
import { fetchPageText } from "@/lib/ad-review/page-text";
import { RULE_BOOK_BASELINE } from "@/lib/ad-review/rules";
import { getMedicalAdLaw, toLawMeta } from "@/lib/law/lawgo";

export const runtime = "nodejs";
// 60초로는 긴 페이지 한 장을 못 끝낸다(실측 FUNCTION_INVOCATION_TIMEOUT). Vercel 상한인 300초로 연다.
export const maxDuration = 300;

// 2026-07-17: 룰베이스(정규식) 1단 + AI 2단(기본 OFF) 구조를 폐기하고 AI 단일 판정으로 교체.
// 이유 — 정규식은 문맥을 못 읽어 정답지 100건 실측 47%(오탐 19·미탐 15)였고,
// 무료 사용자에게 가장 나쁜 엔진을 첫인상으로 보여주는 구조였다. AI 판정은 90%(오탐 0·미탐 0).
// 비용은 검수 1건당 수십원 수준이라, 신뢰를 잃는 대가에 비하면 무시할 수 있다.

// 남용 방지 — IP당 분당 상한 (인스턴스 메모리 기준. 서버리스라 완벽하진 않으나 대량 스크립트는 막는다)
const RATE_LIMIT = 8;
const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // 메모리 폭주 방지
  return arr.length > RATE_LIMIT;
}

// 예산 상한 — 검수 1건에 AI 비용이 50원 안팎이라, 하루 66건 = 월 10만원 선에서 끊는다.
// ponytail: 인스턴스 메모리 카운터라 서버리스 인스턴스가 여러 개면 그 배수만큼 초과될 수 있다.
// 진짜 천장은 Anthropic 콘솔의 월 지출 한도(별도 설정)이고, 이건 그 앞의 1차 브레이크다.
// 정확한 상한이 필요해지면 인트라넷(INTRANET_API_URL)에 카운터 엔드포인트를 두고 공유한다.
const capEnv = process.env.AD_CHECK_DAILY_CAP;
const DAILY_CAP = capEnv && Number.isFinite(Number(capEnv)) ? Number(capEnv) : 66; // 0도 유효값이라 `||` 금지
let capDay = "";
let capUsed = 0;

/** 한국시간 기준 날짜 — 자정에 리셋된다 */
function kstDay(): string {
  return new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10);
}

function remainingToday(): number {
  if (capDay !== kstDay()) {
    capDay = kstDay();
    capUsed = 0;
  }
  return Math.max(0, DAILY_CAP - capUsed);
}

// 히어로의 "오늘 남은 검수" 표시용. 이 도구가 공짜가 아니라는 걸 화면에 세우는 근거값이다.
export async function GET() {
  return NextResponse.json(
    { remaining: remainingToday(), cap: DAILY_CAP },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: string; media?: string; url?: string };
    let text = (body.text ?? "").trim();
    const media = typeof body.media === "string" ? body.media : undefined;

    // 페이지 주소만 준 경우 — 서버가 대신 열어 본문을 뽑는다.
    // 남용 방지 카운터 앞에서 처리해야 남의 서버를 대신 긁는 용도로 쓰이지 않는다.
    const url = typeof body.url === "string" ? body.url.trim() : "";
    let fromUrl = false;
    if (!text && url) {
      const ipForUrl =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";
      if (rateLimited(ipForUrl)) {
        return NextResponse.json({ error: "요청이 많습니다. 잠시 후 다시 시도해 주세요." }, { status: 429 });
      }
      try {
        // 페이지 전문은 붙여넣기 문구보다 훨씬 길다. 판정이 시간 안에 끝나는 길이로 자른다.
        // 잘린 건 화면 입력창에 그대로 돌아가므로 사용자가 무엇이 검수됐는지 눈으로 본다.
        text = await fetchPageText(url, 8000);
        fromUrl = true;
      } catch (e) {
        const m = e instanceof Error ? e.message : "";
        const msg =
          m === "URL_INVALID" ? "주소 형식이 올바르지 않습니다. https:// 로 시작하는 주소를 넣어 주세요."
          : m === "URL_BLOCKED" ? "열 수 없는 주소입니다. 공개된 페이지 주소만 검수할 수 있습니다."
          : m === "URL_EMPTY" ? "페이지에서 읽을 글이 없습니다. 문구를 직접 붙여넣어 주세요."
          : "페이지를 열지 못했습니다. 주소를 확인하거나 문구를 직접 붙여넣어 주세요.";
        return NextResponse.json({ error: msg }, { status: 400 });
      }
    }

    if (text.length < 5) {
      return NextResponse.json({ error: "검수할 문구를 5자 이상 입력해 주세요." }, { status: 400 });
    }
    if (text.length > 12000) {
      return NextResponse.json({ error: "한 번에 검수 가능한 길이(12,000자)를 초과했습니다." }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "요청이 많습니다. 잠시 후 다시 시도해 주세요." },
        { status: 429 },
      );
    }

    if (remainingToday() <= 0) {
      return NextResponse.json(
        {
          error: "오늘 무료 검수가 모두 소진됐습니다.",
          soldOut: true,
          remaining: 0,
          cap: DAILY_CAP,
        },
        { status: 429 },
      );
    }
    capUsed += 1; // 호출 전에 센다 — 실패해도 토큰은 이미 나갔을 수 있다

    // 근거 조문의 현행 시행일·출처를 법제처에서 확인한다(24h 캐시).
    // 판정과 무관하게 병렬로 돌리고, 실패하면 null 로 조용히 빠진다 — 검수는 멈추지 않는다.
    const lawPromise = getMedicalAdLaw();

    const rule = await runAdCheck(text, media);

    const snapshot = await lawPromise;
    const law = snapshot ? toLawMeta(snapshot, RULE_BOOK_BASELINE) : null;
    if (law?.stale.length) {
      // 규칙 사전(rules.ts)이 대조한 시점 이후로 법이 바뀌었다. 사람이 손봐야 한다.
      console.warn("[ad-check] 규칙 사전이 낡았을 수 있음:", JSON.stringify(law.stale));
    }

    // 주소로 들어온 건 무엇을 검수했는지 화면에 되돌려준다 — 안 보여주면 결과를 믿을 근거가 없다
    return NextResponse.json({
      rule,
      law,
      remaining: remainingToday(),
      cap: DAILY_CAP,
      ...(fromUrl ? { text } : {}),
    });
  } catch (error) {
    // 판정 실패를 "안전"으로 위장하지 않는다. 실패는 실패로 알린다.
    const msg = error instanceof Error ? error.message : "";
    if (msg === "ANTHROPIC_API_KEY_MISSING") {
      console.error("[ad-check] ANTHROPIC_API_KEY 미설정");
      return NextResponse.json(
        { error: "검수 엔진이 준비되지 않았습니다. 잠시 후 다시 시도해 주세요." },
        { status: 503 },
      );
    }
    if (msg === "AI_UNREADABLE") {
      return NextResponse.json(
        { error: "문구를 판독하지 못했습니다. 검수되지 않았으니 게시 전 다시 확인해 주세요." },
        { status: 422 },
      );
    }
    console.error("[ad-check] 검수 실패:", error);
    return NextResponse.json(
      { error: "검수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
