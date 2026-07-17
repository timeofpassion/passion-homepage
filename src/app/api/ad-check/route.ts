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

    const rule = await runAdCheck(text, media);
    return NextResponse.json({ rule });
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
    console.error("[ad-check] 검수 실패:", error);
    return NextResponse.json(
      { error: "검수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
