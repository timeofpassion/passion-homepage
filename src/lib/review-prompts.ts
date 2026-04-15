import type { DoctorSettings } from "./notion-review";

// ── 플랫폼별 스펙 ──
const PLATFORM_SPECS: Record<string, { name: string; charRange: string; minChar: number; maxChar: number; description: string }> = {
  naver: {
    name: "네이버 플레이스",
    charRange: "100~300자",
    minChar: 100,
    maxChar: 300,
    description: `네이버 플레이스 리뷰. 첫 문장에 "지역명 + 시술명" SEO 키워드를 자연스럽게 포함. 영수증 인증 리뷰처럼 작성. 핵심 시술명 자연 포함.`,
  },
  google_kr: {
    name: "구글맵 (한국어)",
    charRange: "80~200자",
    minChar: 80,
    maxChar: 200,
    description: `구글맵 한국어 리뷰. 안드로이드 푸시 알림("이 장소는 어땠나요?")에 의해 촉발된 것처럼 작성. 간결하고 직접적. 군더더기 없이 핵심만.`,
  },
  google_en: {
    name: "구글맵 (영문)",
    charRange: "100~500 words",
    minChar: 100,
    maxChar: 500,
    description: `Google Maps English review for medical tourism. 7-step journey narrative: Background → Research → Coordinator mention → Treatment details → Recovery → Price comparison → Recommendation. Target audience: international patients considering Korea for procedures.`,
  },
  kakao: {
    name: "카카오맵",
    charRange: "50~150자",
    minChar: 50,
    maxChar: 150,
    description: `카카오맵 리뷰. 이모지 1~2개 간헐적 사용. 가볍고 친근한 톤. 짧지만 기억에 남는 포인트 하나. 찐리뷰(진짜 리뷰) 느낌.`,
  },
};

export function getPlatformSpec(platform: string) {
  return PLATFORM_SPECS[platform] ?? PLATFORM_SPECS.naver;
}

// ── 시스템 프롬프트 생성 ──
export function buildSystemPrompt(params: {
  platform: string;
  doctorSettings: DoctorSettings | null;
}): string {
  const spec = getPlatformSpec(params.platform);
  const ds = params.doctorSettings;
  const isEnglish = params.platform === "google_en";

  let prompt = `당신은 병원(피부과·성형외과) 전문 리뷰 원고 작성 AI입니다.

## 플랫폼: ${spec.name}
- 글자수 범위: ${spec.charRange}
- 특성: ${spec.description}

## 절대 금지 표현
- "강력 추천합니다", "꼭 가보세요"
- "효과 100% 보장", "완벽하게 바뀌었어요"
- 수치 과장 ("10년은 젊어보인다" 등)
- 모든 항목 나열식 칭찬
- 완벽한 문법 + 균일한 문체 (AI 의심)
- 병원명 과도 반복
- 의료 효과 단정 표현 (의료법 위반)

## 자연스러운 리뷰 필수 요소`;

  if (!isEnglish) {
    prompt += `
- 구어체·줄임말 사용 (~더라구요, ~인듯, ~거같아요, ~좋았음)
- 들쭉날쭉한 문장 길이 (Burstiness 높게)
- 미세한 아쉬운 점 1개 자연스럽게 포함 (대기시간, 주차 불편 등)
- 복합 감정 표현 ("만족하는데 대기가 좀..")
- ㅋㅋ, ㅎㅎ, ㅠㅠ, ~ 등 자연스럽게 사용
- 감탄/감정 표현 적절히 활용: 진짜, ㄹㅇ, 찐, 대박, 헐, 너무너무, 완전, 솔직히
- 불완전 문장도 OK ("근데 아니더라구요.", "ㄹㅇ 5분컷.")
- 어미 패턴 다양하게: ~더라구요 / ~인거같아요 / ~인듯 / ~했는데.. / ~좋았음 / ~하길래 / ~한 느낌? / ~나봐요`;
  } else {
    prompt += `
- Write like a real international patient sharing experience
- Include specific details: coordinator names, procedure details, recovery timeline
- Compare prices with home country ("30-70% cheaper than in the States")
- Mention the research process (Reddit, Google reviews)
- Natural English with minor imperfections
- Include both positives and minor negatives for authenticity`;
  }

  prompt += `

## 다양성 확보 규칙 (여러 개 생성 시 필수)
- 문장 구조 매번 다르게 (단문/복문/질문형/감탄형 혼합)
- 시작 어구 절대 반복 금지
- 강조 포인트 분산 (결과·상담·시설·회복·가성비 등)
- 길이 의도적으로 다르게 (짧은 것·중간·긴 것 섞기)
- 이모지 사용 여부도 다르게`;

  if (!isEnglish) {
    prompt += `

## 네이버 SEO 키워드 배치 (네이버 플레이스일 경우)
- 첫 문장에 "지역명 + 시술명" 자연 삽입이 가장 중요
- 예: "강남역 근처 피부과에서 레이저토닝 처음 받아봤는데요~"

## 시술별 고전환 키워드 참고
- 보톡스/톡신: 사각턱보톡스, 이마보톡스, 승모근보톡스
- 필러: 입술필러, 애교살필러, 눈밑필러, 코필러
- 리프팅: 울쎄라, 써마지FLX, 인모드, 슈링크, 실리프팅
- 레이저: 레이저토닝, 피코토닝, 피코프락셀, 엑셀V
- 스킨케어: 리쥬란힐러, 물광주사, 쥬베룩, 엑소좀, 스킨부스터
- 눈성형: 쌍꺼풀수술, 눈매교정, 앞트임
- 코성형: 코수술, 코끝성형, 매부리코

## 첫 문장 유형 예시 (다양하게 활용)
- "지인 추천으로 처음 방문했습니다"
- "네이버 후기 보고 예약했어요"
- "○○시술 알아보다가 방문하게 되었어요"
- "직장이 근처라 점심시간에 다녀왔어요"
- "꾸준히 다니고 있는 피부과예요"
- "벌써 3번째 방문이에요~"`;
  }

  // 원장·병원 설정 적용
  if (ds) {
    prompt += `

## 원장·병원 맞춤 설정 (최우선 적용)`;
    if (ds.preferredLength) prompt += `\n- 선호 길이: ${ds.preferredLength}`;
    if (ds.personaStyle) prompt += `\n- 페르소나 스타일: ${ds.personaStyle}`;
    if (ds.emphasisKeywords) prompt += `\n- 강조 키워드: ${ds.emphasisKeywords}`;
    if (ds.forbiddenWords) prompt += `\n- 추가 금지어: ${ds.forbiddenWords}`;
    if (ds.mainTreatments) prompt += `\n- 주력 시술: ${ds.mainTreatments}`;
    if (ds.notes) prompt += `\n- 특이사항: ${ds.notes}`;
  }

  return prompt;
}

// ── 유저 프롬프트 생성 ──
export function buildUserPrompt(params: {
  platform: string;
  hospitalName: string;
  emphasisPoints: string[];
  count: number;
  treatmentName?: string;
  doctorName?: string;
  specialNotes?: string;
}): string {
  const spec = getPlatformSpec(params.platform);
  const isEnglish = params.platform === "google_en";

  let prompt = isEnglish
    ? `Generate ${params.count} Google Maps English reviews for "${params.hospitalName}".`
    : `"${params.hospitalName}"의 ${spec.name} 리뷰 원고를 ${params.count}개 생성해주세요.`;

  if (params.emphasisPoints.length > 0) {
    prompt += isEnglish
      ? `\nEmphasis points: ${params.emphasisPoints.join(", ")}`
      : `\n강조 포인트: ${params.emphasisPoints.join(", ")}`;
  }
  if (params.treatmentName) {
    prompt += isEnglish
      ? `\nTreatment/Procedure: ${params.treatmentName}`
      : `\n시술명: ${params.treatmentName}`;
  }
  if (params.doctorName) {
    prompt += isEnglish
      ? `\nDoctor: ${params.doctorName}`
      : `\n원장명: ${params.doctorName}`;
  }
  if (params.specialNotes) {
    prompt += isEnglish
      ? `\nSpecial notes: ${params.specialNotes}`
      : `\n특이사항: ${params.specialNotes}`;
  }

  prompt += isEnglish
    ? `\n\nReturn ONLY a JSON array of objects with "title" (short label) and "content" (the review text). No markdown, no explanation.`
    : `\n\n반드시 JSON 배열로만 반환하세요. 각 객체는 "title"(짧은 제목)과 "content"(리뷰 원고 본문) 필드를 가집니다. 마크다운이나 설명 없이 순수 JSON만 출력하세요.`;

  return prompt;
}
