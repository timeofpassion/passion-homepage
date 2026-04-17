import { NextResponse } from "next/server";
import { saveFeedback } from "@/lib/notion-review";

export const dynamic = "force-dynamic";

interface FeedbackRequest {
  hospitalName: string;
  feedback: string;
  platforms?: string[];
}

export async function POST(request: Request) {
  try {
    const body: FeedbackRequest = await request.json();
    const { hospitalName, feedback, platforms } = body;

    if (!hospitalName || !feedback || feedback.trim().length < 3) {
      return NextResponse.json(
        { error: "병원명과 피드백 내용은 필수입니다 (3자 이상)" },
        { status: 400 }
      );
    }

    await saveFeedback({
      hospitalName,
      feedback: feedback.trim(),
      platforms: platforms ?? ["전체"],
    });

    return NextResponse.json({
      ok: true,
      message: "피드백이 저장되었습니다. 다음 원고 생성 시 자동 반영됩니다.",
    });
  } catch (error) {
    const err = error as { message?: string; code?: string };
    console.error("[feedback API] 실패:", err);
    return NextResponse.json(
      { error: "피드백 저장 실패", detail: err?.message },
      { status: 500 }
    );
  }
}
