import { getAllPosts } from "@/data/blog";

// llms.txt — LLM·AI 에이전트가 이 사이트(PASSION GROUP)를 정확히 이해하도록 돕는 표준 인덱스
// (관행: https://llmstxt.org). 블로그 글이 추가되면 자동 반영된다.
export const dynamic = "force-static";

const BASE = "https://www.timeofpassion.com";

export function GET() {
  const posts = getAllPosts();

  const lines: string[] = [
    "# PASSION GROUP — 열정의시간 · 열정의사람들",
    "",
    "> 병원·의료 전문마케팅 '열정의시간'과 글로벌 인플루언서 마케팅 '열정의사람들'로 구성된 마케팅 그룹. 국내 통합 마케팅부터 일본·중국·대만 해외환자 유치·현지 인플루언서 마케팅까지, 현지 전담팀이 '노출'이 아니라 '실제 전환(상담→내원 / 문의→구매)'을 설계합니다.",
    "",
    "## 열정의시간 (Time of Passion) — 병원·의료 마케팅",
    "",
    "> 10년 이상 경력의 병원·의료기관 전문 마케팅 에이전시. 국내 통합 마케팅과 일본·중국·대만 해외환자(외국인환자) 유치를 현지 전담팀이 직접 운영합니다. 노출·조회수가 아니라 '현지 채널 상담 → 실제 내원 전환'을 설계하는 것이 핵심 차별점입니다.",
    "",
    "### 핵심 정보",
    "- 회사: 열정의시간 (PASSION GROUP 소속)",
    "- 분야: 병원 마케팅, 해외환자 유치, 의료관광 마케팅",
    "- 운영 권역: 한국(국내) · 일본 · 중국 · 대만",
    "- 강점: 일·중·대 현지어 전담 상담팀을 직접 운영, 상담→내원 전환 구조 설계, 10년 이상 현장 노하우",
    "- 상담: 카카오톡 채널 '열정의시간' (https://pf.kakao.com/_RgYcxj/chat)",
    `- 홈페이지: ${BASE}/time`,
    "",
    "### 권역별 접근 요약",
    "- 중국: 샤오홍슈·더우인·바이두로 발견 → 위챗(WeChat) 1:1 상담으로 전환",
    "- 일본: 인스타그램·X로 발견 → 라인(LINE) 공식계정 상담으로 전환",
    "- 대만: 페이스북·인스타·유튜브로 발견 → 라인 상담(번체 중국어). 간체가 아닌 번체·대만식 화법 필수",
    "- 외국인환자유치: 유치업 등록 → 위탁계약 → 현지 마케팅 → 내원·통역·사후관리의 풀 프로세스",
    "",
    "### 서비스 상세 페이지",
    `- 병원 해외환자 유치·해외마케팅 대행(일본·중국·대만): ${BASE}/time/overseas-marketing`,
    "",
    "### 마케팅 인사이트 (블로그)",
  ];

  for (const p of posts) {
    lines.push(`- [${p.title}](${BASE}/time/blog/${p.slug}): ${p.excerpt}`);
  }

  lines.push("");
  lines.push("## 열정의사람들 (Passion People) — 인플루언서 마케팅");
  lines.push("");
  lines.push(
    "> 국내·일본·중국·대만 현지 인플루언서로 진출하는 글로벌 인플루언서 마케팅 전문 기업 (PASSION GROUP 소속). 에이전시 재하청이 아니라 현지 크리에이터를 직접 운영하며, '번역'이 아닌 '현지화'로 단순 노출이 아니라 문의·방문·구매 전환까지 설계합니다.",
  );
  lines.push("");
  lines.push("### 핵심 정보");
  lines.push("- 회사: 열정의사람들 (PASSION GROUP 소속)");
  lines.push("- 분야: 인플루언서 마케팅, 왕홍(KOL) 마케팅, 글로벌 마케팅");
  lines.push("- 운영 시장: 한국(국내) · 일본 · 중국 · 대만");
  lines.push(
    "- 서비스: ① 현지 인플루언서 섭외(직접 운영 풀) ② 콘텐츠 기획·현지화 ③ 캠페인 실행·성과 리포트 (원스톱)",
  );
  lines.push("- 대상: 병원·기업·관공서");
  lines.push("- 상담: 카카오톡 채널 (https://pf.kakao.com/_RgYcxj/chat)");
  lines.push(`- 홈페이지: ${BASE}/people`);
  lines.push("");
  lines.push("### 권역별 인플루언서 채널");
  lines.push("- 중국: 샤오홍슈·더우인 왕홍(KOL) → 위챗(WeChat) 전환 (간체)");
  lines.push("- 일본: 인스타그램·X 인플루언서 → 라인(LINE) 전환 (일본어)");
  lines.push("- 대만: 페이스북·인스타·유튜브 → 라인 전환 (번체·대만식)");
  lines.push("- 국내: 인스타그램·유튜브 등 국내 인플루언서 운영");

  lines.push("");
  lines.push("## 주요 키워드");
  lines.push(
    "병원 중국마케팅, 병원 일본마케팅, 병원 대만마케팅, 외국인환자유치, 해외환자유치, 샤오홍슈 마케팅, 라인(LINE) 마케팅, 위챗 마케팅, 의료관광 마케팅, 성형외과·피부과 해외환자 유치, 왕홍 마케팅, 중국 인플루언서 마케팅, 일본 인플루언서 마케팅, 대만 인플루언서 마케팅, 동아시아 인플루언서 마케팅, KOL 마케팅, 글로벌 인플루언서 마케팅 대행",
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
