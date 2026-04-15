import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getDoctorSettings, saveReviewToNotion } from "@/lib/notion-review";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/review-prompts";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface GenerateRequest {
  platform: string;
  hospitalName: string;
  emphasisPoints: string[];
  count: number;
  treatmentName?: string;
  doctorName?: string;
  specialNotes?: string;
}

export async function POST(request: Request) {
  try {
    const body: GenerateRequest = await request.json();
    const { platform, hospitalName, emphasisPoints, count, treatmentName, doctorName, specialNotes } = body;

    if (!platform || !hospitalName || !count) {
      return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
    }

    // 1) 원장·병원 설정 조회
    const doctorSettings = await getDoctorSettings(hospitalName);

    // 2) 프롬프트 구성
    const systemPrompt = buildSystemPrompt({ platform, doctorSettings });
    const userPrompt = buildUserPrompt({
      platform,
      hospitalName,
      emphasisPoints,
      count,
      treatmentName,
      doctorName,
      specialNotes,
    });

    // 3) Claude API 호출
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    // 4) 응답 파싱
    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json({ error: "AI 응답 없음" }, { status: 500 });
    }

    let reviews: { title: string; content: string }[];
    try {
      const raw = textContent.text.trim();
      // JSON 배열 추출 (마크다운 코드블록 안에 있을 수 있음)
      const jsonMatch = raw.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("JSON not found");
      reviews = JSON.parse(jsonMatch[0]);
    } catch {
      return NextResponse.json({ error: "AI 응답 파싱 실패", raw: textContent.text }, { status: 500 });
    }

    // 5) 노션 아카이브에 자동 저장
    const savedIds: string[] = [];
    for (const review of reviews) {
      try {
        const id = await saveReviewToNotion({
          platform,
          clientName: hospitalName,
          title: review.title,
          content: review.content,
          charCount: review.content.length,
          emphasisPoints,
        });
        savedIds.push(id);
      } catch (saveError) {
        console.error("노션 저장 실패:", saveError);
      }
    }

    return NextResponse.json({
      reviews,
      savedCount: savedIds.length,
      platform,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json({ error: "원고 생성 실패" }, { status: 500 });
  }
}
