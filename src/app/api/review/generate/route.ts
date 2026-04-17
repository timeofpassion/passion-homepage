import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getDoctorSettings, saveReviewToNotion, getTreatmentKnowledgeBase, getRecentReviews } from "@/lib/notion-review";
import { buildSystemPrompt, buildUserPrompt, getPlatformSpec } from "@/lib/review-prompts";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface GenerateRequest {
  platforms: string[];
  hospitalName: string;
  emphasisPoints: string[];
  count: number;
  treatmentNames?: string[];
  doctorNames?: string[];
  specialNotes?: string;
}

interface Review {
  title: string;
  content: string;
}

interface PlatformResult {
  platform: string;
  platformLabel: string;
  charRange: string;
  reviews: Review[];
  savedCount: number;
  error?: string;
}

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const body: GenerateRequest = await request.json();
    const { platforms, hospitalName, emphasisPoints, count, treatmentNames, doctorNames, specialNotes } = body;

    if (!platforms || platforms.length === 0 || !hospitalName || !count) {
      return NextResponse.json({ error: "필수 항목 누락 (플랫폼, 병원명, 개수)" }, { status: 400 });
    }

    // 원장·병원 설정 및 시술 지식 베이스 동시 조회 (한 번만)
    const [doctorSettings, treatmentKB] = await Promise.all([
      getDoctorSettings(hospitalName),
      getTreatmentKnowledgeBase(),
    ]);

    // 플랫폼별 병렬 생성
    const results: PlatformResult[] = await Promise.all(
      platforms.map(async (platform): Promise<PlatformResult> => {
        const spec = getPlatformSpec(platform);
        try {
          // 해당 병원의 해당 플랫폼 최근 원고 조회 (중복 방지)
          const recentReviews = await getRecentReviews({
            platform,
            hospitalName,
            limit: 20,
          });

          const systemPrompt = buildSystemPrompt({
            platform,
            doctorSettings,
            treatmentKB,
            recentReviews,
          });
          const userPrompt = buildUserPrompt({
            platform,
            hospitalName,
            emphasisPoints,
            count,
            treatmentNames,
            doctorNames,
            specialNotes,
          });

          // web_search 도구 사용 (agentic loop)
          const messages: Anthropic.MessageParam[] = [
            { role: "user", content: userPrompt },
          ];

          let finalMessage: Anthropic.Message | null = null;
          const maxTurns = 4; // 웹 검색 최대 3번 + 최종 응답 1번
          for (let turn = 0; turn < maxTurns; turn++) {
            const response = await anthropic.messages.create({
              model: "claude-sonnet-4-20250514",
              max_tokens: 8000,
              system: systemPrompt,
              tools: [
                {
                  type: "web_search_20250305",
                  name: "web_search",
                  max_uses: 3,
                } as unknown as Anthropic.Tool,
              ],
              messages,
            });

            if (response.stop_reason === "end_turn" || response.stop_reason === "max_tokens") {
              finalMessage = response;
              break;
            }

            // pause_turn 또는 tool_use → assistant 메시지를 누적하고 계속
            messages.push({ role: "assistant", content: response.content });

            if (response.stop_reason === "pause_turn") {
              continue; // 서버 측에서 검색 후 자동 이어서
            }
            // tool_use는 web_search_20250305는 서버 측 실행이므로 pause_turn 처리됨
            // 혹시 다른 stop_reason이면 종료
            finalMessage = response;
            break;
          }

          if (!finalMessage) {
            return { platform, platformLabel: spec.name, charRange: spec.charRange, reviews: [], savedCount: 0, error: "AI 응답 없음 (루프 초과)" };
          }

          const message = finalMessage;
          const textContent = message.content.find((c) => c.type === "text");
          if (!textContent || textContent.type !== "text") {
            return { platform, platformLabel: spec.name, charRange: spec.charRange, reviews: [], savedCount: 0, error: "AI 응답 없음" };
          }

          let reviews: Review[];
          try {
            const raw = textContent.text.trim();
            const jsonMatch = raw.match(/\[[\s\S]*\]/);
            if (!jsonMatch) throw new Error("JSON not found");
            reviews = JSON.parse(jsonMatch[0]);
          } catch {
            return { platform, platformLabel: spec.name, charRange: spec.charRange, reviews: [], savedCount: 0, error: "AI 응답 파싱 실패" };
          }

          // 노션 저장
          let savedCount = 0;
          for (const review of reviews) {
            try {
              await saveReviewToNotion({
                platform,
                clientName: hospitalName,
                title: review.title,
                content: review.content,
                charCount: review.content.length,
                emphasisPoints,
              });
              savedCount++;
            } catch (e) {
              console.error(`[${platform}] 노션 저장 실패:`, e);
            }
          }

          return { platform, platformLabel: spec.name, charRange: spec.charRange, reviews, savedCount };
        } catch (err) {
          console.error(`[${platform}] 생성 실패:`, err);
          return { platform, platformLabel: spec.name, charRange: spec.charRange, reviews: [], savedCount: 0, error: "생성 실패" };
        }
      })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json({ error: "원고 생성 실패" }, { status: 500 });
  }
}
