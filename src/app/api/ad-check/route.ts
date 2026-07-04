import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { runRuleScan } from "@/lib/ad-review/engine";
import { fetchAndExtract } from "@/lib/ad-review/extract-url";

export const runtime = "nodejs";
export const maxDuration = 60;

// 2단 — Claude 문맥판정에 쓰는 규칙 요약(정답 기준을 프롬프트에 주입 → AI가 법을 외워 판단하지 않게 함)
const RULE_BRIEF = `한국 의료법 광고심의 기준 (판정 근거는 아래에 한정):
- 제56조2항 3호(과장·거짓): 완치·100%·부작용 없이·영구 등 절대적 효과 단정.
- 8호(최상급): 최고·유일·1등 등 객관근거 없는 최상급.
- 13호·27조3항(할인·유인): 비급여 할인·이벤트·선착순·무료. 대상·기간·범위·할인전가격 4종 미명시 시 위반.
- 2호(치료경험담): 협찬·원고료 등 대가성 + 병원 식별정보가 결합된 후기. 단순 방문후기는 위반 아님.
- 4호(비교): 다른 의료기관과 비교. 9호(명칭): 학술근거 없는 시술명·자격. 14호(인증): 근거없는 수상·추천.
- 7호(중요정보 누락): 시술을 다루며 부작용 고지 없음.`;

interface AiFinding {
  sentence: string;
  article: string;
  reason: string;
  fix: string;
  risk: "high" | "medium" | "low";
}

async function runClaudeJudgment(text: string): Promise<{ findings: AiFinding[]; comment: string } | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  try {
    const anthropic = new Anthropic({ apiKey });
    const system = `당신은 한국 의료광고 심의 보조 도구입니다. 아래 "기준"에만 근거해 광고 문구의 위반 문장을 판정하세요. 기준에 없는 조항을 지어내지 마세요. 근거가 불명확하면 포함하지 마세요.

${RULE_BRIEF}

룰베이스 키워드 필터가 명백한 표현은 이미 잡았습니다. 당신은 특히 문맥 판단이 필요한 회색지대(대가성 후기, 은근한 과장, 명칭, 비교, 부작용 누락)와 키워드로 놓친 위반을 잡으세요.

출력은 JSON만. 설명·마크다운 금지. 형식:
{"findings":[{"sentence":"위반 추정 문장 원문","article":"56-2-3","reason":"위반 사유 한 줄","fix":"바로 쓸 수 있는 수정 문안","risk":"high|medium|low"}],"comment":"전체 한 줄 총평"}
위반이 없으면 {"findings":[],"comment":"..."} 로.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1800,
      system,
      messages: [{ role: "user", content: `검토 대상 의료광고 문구:\n"""\n${text.slice(0, 8000)}\n"""` }],
    });

    const textPart = response.content.find((c) => c.type === "text");
    if (!textPart || textPart.type !== "text") return null;
    const raw = textPart.text.trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]) as { findings?: AiFinding[]; comment?: string };
    const findings = Array.isArray(parsed.findings)
      ? parsed.findings
          .filter((f) => f && typeof f.sentence === "string" && f.sentence.trim())
          .slice(0, 12)
          .map((f) => ({
            sentence: String(f.sentence),
            article: String(f.article ?? ""),
            reason: String(f.reason ?? ""),
            fix: String(f.fix ?? ""),
            risk: (["high", "medium", "low"].includes(f.risk) ? f.risk : "medium") as AiFinding["risk"],
          }))
      : [];
    return { findings, comment: String(parsed.comment ?? "") };
  } catch (err) {
    console.error("[ad-check] Claude 판정 실패, 룰베이스로 폴백:", err);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: string; url?: string; mode?: string };
    const useUrl = body.mode === "url" || (!!body.url && !(body.text ?? "").trim());

    let text = (body.text ?? "").trim();
    let source: { type: "url"; url: string; title?: string } | undefined;

    // URL 모드 — 이미 올라간 블로그·홈페이지 링크를 열어 본문 추출
    if (useUrl) {
      const extracted = await fetchAndExtract(body.url ?? "");
      if (!extracted.ok) {
        return NextResponse.json({ error: extracted.error ?? "URL 본문을 읽지 못했습니다." }, { status: 400 });
      }
      text = extracted.text;
      source = { type: "url", url: (body.url ?? "").trim(), title: extracted.title };
    }

    if (!text) {
      return NextResponse.json({ error: "검수할 문구를 입력해 주세요." }, { status: 400 });
    }
    if (text.length > 12000) {
      return NextResponse.json({ error: "한 번에 검수 가능한 길이(12,000자)를 초과했습니다." }, { status: 400 });
    }

    // 1단 — 룰베이스 (항상 실행, 즉시)
    const rule = runRuleScan(text);

    // 2단 — Claude 문맥판정 (선택, 실패 시 null 폴백)
    const ai = await runClaudeJudgment(text);

    return NextResponse.json({ rule, ai, source, extractedText: source ? text : undefined });
  } catch (error) {
    console.error("[ad-check] 검수 실패:", error);
    return NextResponse.json({ error: "검수 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
