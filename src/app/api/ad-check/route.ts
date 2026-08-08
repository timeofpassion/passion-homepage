import { NextResponse } from "next/server";
import { runAdCheck } from "@/lib/ad-review/engine";

export const runtime = "nodejs";
export const maxDuration = 60;

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
    const body = (await request.json()) as { text?: string; media?: string };
    const text = (body.text ?? "").trim();
    const media = typeof body.media === "string" ? body.media : undefined;

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

    const rule = await runAdCheck(text, media);
    return NextResponse.json({ rule, remaining: remainingToday(), cap: DAILY_CAP });
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
