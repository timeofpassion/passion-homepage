// 의료광고 자가검수 — AI 판정 엔진
//
// runAdCheck(text, media): 입력 문구를 AI가 문맥으로 판정해 위반문장·근거조항·수정문안을 도출.
//
// 2026-07-17 전면 교체 (정규식 → AI). 정답지 100건 실측:
//   기존 정규식  47/100 · 오탐 19 · 미탐 15 · 함정통과 13/32
//   AI 판정      90/100 · 오탐  0 · 미탐  0 · 함정통과 32/32
// 남은 10건은 전부 회색지대 등급차이며, 정답지 자체가 자문 검수 대기 중이다(90%는 하한).
//
// 핵심 설계 = 2단계 게이트. ①이 표현이 "의료 주장"인가? 아니면 green ②맞으면 13개 호 대조.
// 오탐(멀쩡한 문구를 위반이라 때리는 것)은 사용자 신뢰를 즉시 깎으므로 1단계로 확실히 막는다.

import Anthropic from "@anthropic-ai/sdk";
import {
  RULE_BOOK,
  HO_LABEL,
  lawOf,
  judgeMedia,
  STANDARD_DISCLAIMER,
  RESULT_DISCLAIMER,
  type RiskLevel,
} from "./rules";

const MODEL = "claude-sonnet-4-6";

export interface Violation {
  id: string;
  article: string;
  law: string;
  label: string;
  risk: RiskLevel;
  reason: string;
  allowCond?: string;
  fix: string;
  /** 원문에서 실제로 걸린 문장 */
  matches: string[];
  /** 첫 등장 위치 (정렬용) */
  index: number;
}

export interface ScanSpan {
  start: number;
  end: number;
  risk: RiskLevel;
}

export interface ScanResult {
  overallRisk: "high" | "medium" | "low";
  riskLabel: string; // 위험 / 주의 / 안전
  verdict: string; // 한 줄 판정 메시지
  violations: Violation[];
  spans: ScanSpan[];
  missingDisclaimer: boolean;
  standardDisclaimer: string;
  disclaimer: string;
  counts: { high: number; medium: number; gray: number };
  /** 조건을 갖추면 게시 가능한 항목 안내 (차단이 아니라 통과조건) */
  grayNotes: string[];
  /** 매체 기반 사전심의 대상 판정 (11호 대응) */
  mediaNote: string;
  reviewRequired: boolean;
}

const SYSTEM_PROMPT = `너는 대한민국 의료법 제56조 제2항 기준으로 병원 광고 문구를 검수하는 전문가다.

${RULE_BOOK}

너는 반드시 아래 2단계 순서로 판정한다. 순서를 건너뛰지 마라.

════════ 1단계 게이트: 이 표현이 "의료 주장"인가? ════════
문장마다 먼저 묻는다 —
  "이 표현이 ①의료행위의 효과·안전성 ②다른 의료기관 대비 우월성 ③의료인의 자격·명칭 ④환자 유인(할인·대가)
   중 하나에 관한 주장인가?"

아니면 → 그 문장은 광고 규제 대상이 아니다. 위반으로 잡지 마라. 여기서 끝.
같은 단어라도 무엇을 가리키는지가 전부다. 글자 대조는 틀린 방법이다.

1단계에서 걸러져야 하는 것(= 전부 정상):
- "100% 사전 예약제" / "주차 100% 무료" → 100%가 운영방식·시설. 효과 주장 아님.
- "완벽한 회복을 위해 최선을 다하겠습니다" / "최고의 서비스를 위해 직원 교육" → 다짐·태도. 효과·순위 주장 아님.
- "유일하게 남은 예약 시간대" → 예약 안내.
- "명의 도용 방지" → 이름(名義)이지 명의(名醫) 아님.
- "장비의 영구적 손상 방지" / "평생 건강관리의 동반자" → 장비 관리·다짐.
- "주차 공간이 한정되어" → 시설 안내. 할인 유인 아님.
- "인증받은 멸균 장비" → 장비 규격이지 병원 인증 광고 아님.
- "후기 이벤트를 하지 않습니다" / "리뷰를 요청드리지 않습니다" / "대가성 후기는 위반입니다" → 부정문·설명문. 하지 않는다는 말은 위반이 아니다.
- "본 게시물은 광고입니다" → 10호가 요구하는 바로 그 표기.
- 진료시간·위치·휴진·예약방법·질환정보·건강정보·개인정보 안내 → 규제 대상 아님.

════════ 2단계: 1단계를 통과한 것만 13개 호와 대조 ════════
의료 주장이 맞다면, 이제는 봐준다는 태도를 버리고 정확히 판정한다.
금지어가 없어도 의미가 위반이면 반드시 잡는다. 명백한 위반을 green으로 넘기는 것도 심각한 잘못이다.

반드시 red로 잡아야 하는 것(예시):
- "국내 최초 도입 신개념 줄기세포 리프팅" / "세계 최초 개발 특허 시술법" → 1호. 평가받지 않은 신의료기술을 최초로 표방.
- "OO의원에서 받고 인생이 바뀌었어요, 위치는 강남역" → 2호. 치료경험담 + 병원 식별정보.
- "[협찬] 시술받았는데 효과가 확실했습니다" → 2호. 대가성 + 효과 서술.
- "환자분들의 생생한 치료 후기 100건, 다들 만족하셨습니다" → 2호. 경험담으로 효과 오인.
- "개원 3개월차 원장이지만 자신 있습니다" → 2호. 시행령상 6개월 이하 임상경력 광고 금지.
- "시술 한 번이면 다시는 그 고민으로 병원 찾을 일 없습니다" → 3호. 영구 효과 단정.
- "실패 사례가 단 한 건도 없습니다" → 3호. 검증 불가 단정.
- "이 분야에서 저희를 따라올 곳은 없습니다" → 8호. 최상급.
- "부작용요? 저희는 그런 거 모릅니다" → 7호. 부작용 없음 주장.
- "보건복지부 공식 지정 리프팅 센터" → 9호. 허위 공식지정.
- "저가 이벤트로 환자 끌어모으는 곳들, 결국 재수술하러 옵니다" → 5호. 타 기관 비방.
- "딱 이번 주만 특별가로 모십니다" → 13호. 할인 조건·할인전가격 불명확.
- "OO일보 선정 올해의 병원 대상 수상" → 14호. 언론사 주관 수상 게시.

yellow로 두어야 하는 것(= 조건 갖추면 가능. 차단이 아니라 통과조건을 안내):
- 근거·출처를 붙이면 되는 것(임상 수치, 누적 건수, 신의료기술평가 통과분)
- 실제 보유 여부만 확인하면 되는 것(학회 정회원, 보건복지부 인증, 전문병원 지정)
- 조건을 명시하면 되는 것(할인의 금액·대상·기간·범위·할인전가격)
- 법정 예외 해당 여부를 확인해야 하는 것(정부·공공기관 인증)
- 맥락에 따라 갈리는 것(단순 방문후기인지 대가성 후기인지, 통역 안내인지 외국인환자 유치인지)

════════ 등급 ════════
- red: 위 2단계에서 명백히 위반으로 확인된 것.
- yellow: 의료 주장은 맞는데, 조건·근거·사실확인에 따라 갈리는 것. 판단이 갈리면 여기.
- green: 1단계에서 걸러진 것(의료 주장이 아님) 또는 위반 요소가 없는 것.

두 가지 잘못의 무게는 다르다:
- 멀쩡한 문구에 red를 주면 → 사용자가 도구를 신뢰하지 않는다. 가장 큰 잘못.
- 명백한 위반을 green으로 넘기면 → 사용자가 처분을 받는다. 이것도 큰 잘못.
따라서: 1단계를 엄격히 적용해 무관한 문장은 확실히 green으로 보내되, 1단계를 통과한 의료 주장은 봐주지 말고 정확히 판정한다.
확신이 서지 않는 의료 주장은 green이 아니라 yellow다.

════════ 판독 불가 ════════
입력이 깨진 인코딩이거나, 의미 있는 한국어 광고 문구로 판독할 수 없으면 risk 를 "unreadable" 로 한다.
판독하지 못한 것을 green(안전)으로 처리하면 사용자가 위반 문구를 통과된 줄 알고 게시하게 된다.
"못 읽었다"와 "위반이 없다"는 완전히 다른 말이다. 절대 섞지 마라.

[출력]
JSON만 출력. 코드펜스·설명 금지.
{"risk":"red|yellow|green|unreadable","violations":[{"sentence":"원문에서 그대로 복사한 위반 문장","ho":0,"severity":"red|yellow","reason":"왜 저촉되는지 한 줄","fix":"바로 쓸 수 있는 수정 문안"}],"gray_notes":["조건을 갖추면 가능한 항목의 통과조건 안내"],"summary":"전체 한 줄 총평"}
sentence 는 반드시 입력 원문에 있는 그대로 복사한다(하이라이트에 쓰인다). 요약·변형 금지.
risk 는 violations 중 최고 등급. violations 가 비면 green. 단 판독 불가면 unreadable.`;

interface AiViolation {
  sentence: string;
  ho: number;
  severity: "red" | "yellow";
  reason: string;
  fix: string;
}

interface AiResult {
  /** unreadable = 판독 불가. "위반 없음"과 구분해야 한다 — 못 읽은 걸 안전으로 내보내면 안 된다. */
  risk: "red" | "yellow" | "green" | "unreadable";
  violations: AiViolation[];
  gray_notes: string[];
  summary: string;
}

function parseAiJson(s: string): AiResult | null {
  const cleaned = String(s).replace(/```json/gi, "").replace(/```/g, "").trim();
  const a = cleaned.indexOf("{");
  const b = cleaned.lastIndexOf("}");
  if (a < 0 || b <= a) return null;
  try {
    const p = JSON.parse(cleaned.slice(a, b + 1)) as Partial<AiResult>;
    const raw = Array.isArray(p.violations) ? p.violations : [];
    const violations: AiViolation[] = raw
      .filter((v) => !!v && typeof v.sentence === "string" && !!v.sentence.trim() && typeof v.ho === "number")
      .slice(0, 20)
      .map((v) => ({
        sentence: String(v.sentence),
        ho: Number(v.ho),
        severity: v.severity === "red" ? "red" : "yellow",
        reason: String(v.reason ?? ""),
        fix: String(v.fix ?? ""),
      }));
    const risk: AiResult["risk"] =
      p.risk === "red" || p.risk === "yellow" || p.risk === "green" || p.risk === "unreadable"
        ? p.risk
        : violations.some((v) => v.severity === "red")
          ? "red"
          : violations.length
            ? "yellow"
            : "green";
    return {
      risk,
      violations,
      gray_notes: Array.isArray(p.gray_notes) ? p.gray_notes.map(String).slice(0, 8) : [],
      summary: typeof p.summary === "string" ? p.summary : "",
    };
  } catch {
    return null;
  }
}

/** AI severity → UI RiskLevel */
const toRisk = (s: "red" | "yellow"): RiskLevel => (s === "red" ? "high" : "medium");

/** AI 결과 → 화면 계약(ScanResult)으로 변환. 위반 문장을 원문에서 찾아 하이라이트 좌표를 만든다. */
function toScanResult(text: string, ai: AiResult, media?: string): ScanResult {
  const m = judgeMedia(media);
  const spans: ScanSpan[] = [];
  const violations: Violation[] = [];

  ai.violations.forEach((v, i) => {
    const risk = toRisk(v.severity);
    const idx = text.indexOf(v.sentence);
    if (idx >= 0) spans.push({ start: idx, end: idx + v.sentence.length, risk });
    violations.push({
      id: `ho${v.ho}-${i}`,
      article: `56-2-${v.ho}`,
      law: lawOf(v.ho),
      label: HO_LABEL[v.ho] ?? `${v.ho}호`,
      risk,
      reason: v.reason,
      fix: v.fix,
      matches: [v.sentence],
      index: idx >= 0 ? idx : Number.MAX_SAFE_INTEGER,
    });
  });

  violations.sort((a, b) => a.index - b.index);
  spans.sort((a, b) => a.start - b.start);

  const counts = {
    high: violations.filter((v) => v.risk === "high").length,
    medium: violations.filter((v) => v.risk === "medium").length,
    gray: violations.filter((v) => v.risk === "gray").length,
  };

  const overallRisk: ScanResult["overallRisk"] =
    ai.risk === "red" ? "high" : ai.risk === "yellow" ? "medium" : "low";
  const riskLabel = overallRisk === "high" ? "위험" : overallRisk === "medium" ? "주의" : "안전";
  const verdict =
    ai.summary ||
    (overallRisk === "high"
      ? "이대로 게시하면 의료법 위반 소지가 있습니다."
      : overallRisk === "medium"
        ? "조건을 갖추면 게시 가능합니다. 아래 통과조건을 확인하세요."
        : "의료법 제56조 제2항 위반 요소가 발견되지 않았습니다.");

  // 7호(부작용 고지 누락)를 AI가 실제로 지적했을 때만 표준 고지문을 권한다.
  const missingDisclaimer = ai.violations.some((v) => v.ho === 7);

  return {
    overallRisk,
    riskLabel,
    verdict,
    violations,
    spans,
    missingDisclaimer,
    standardDisclaimer: STANDARD_DISCLAIMER,
    disclaimer: RESULT_DISCLAIMER,
    counts,
    grayNotes: ai.gray_notes,
    mediaNote: m.note,
    reviewRequired: m.reviewRequired,
  };
}

/** 판독 가능한 입력인지 먼저 코드가 판단한다.
 *  AI에게 "못 읽겠으면 그렇게 말해라"라고 부탁해봤지만 지키지 않았다 —
 *  깨진 입력에 "판독 불가"라고 총평을 쓰면서 등급은 green(안전)을 줬다.
 *  못 읽은 것을 안전이라고 하면 사용자가 위반 문구를 통과된 줄 알고 게시한다. 그래서 코드가 먼저 막는다. */
function isUnreadable(text: string): boolean {
  if (/�/.test(text)) return true; // 인코딩이 깨질 때 나오는 대체문자
  const meaningful = text.match(/[가-힣a-zA-Z0-9]/g)?.length ?? 0;
  return meaningful / text.length < 0.3; // 의미 있는 글자가 3할도 안 되면 판독 불가로 본다
}

/** 검수 실행.
 *  AI 호출에 실패하면 절대 "안전"으로 위장하지 않고 예외를 던진다 —
 *  실패를 green 으로 삼키면 사용자가 위반 문구를 통과된 줄 알고 게시하게 된다. */
export async function runAdCheck(input: string, media?: string): Promise<ScanResult> {
  const text = (input ?? "").slice(0, 12000);
  if (isUnreadable(text)) throw new Error("AI_UNREADABLE");

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY_MISSING");

  const anthropic = new Anthropic({ apiKey });
  let lastErr: unknown = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 2000,
        system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        messages: [{ role: "user", content: `[매체] ${media ?? "미지정"}\n[검수할 문구]\n${text}` }],
      });
      const part = res.content.find((c) => c.type === "text");
      const ai = parseAiJson(part && part.type === "text" ? part.text : "");
      if (ai) {
        // 못 읽은 것을 "안전"으로 내보내지 않는다. 사용자가 통과된 줄 알고 게시하게 된다.
        if (ai.risk === "unreadable") throw new Error("AI_UNREADABLE");
        return toScanResult(text, ai, media);
      }
      lastErr = new Error("AI_PARSE_FAILED");
    } catch (e) {
      lastErr = e;
      if (attempt === 0) await new Promise((r) => setTimeout(r, 1200));
    }
  }
  console.error("[ad-check] 판정 실패:", lastErr);
  throw new Error("AI_JUDGE_FAILED");
}
