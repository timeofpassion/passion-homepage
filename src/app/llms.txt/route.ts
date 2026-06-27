import { getAllPosts } from "@/data/blog";

// llms.txt — LLM·AI 에이전트가 이 사이트를 정확히 이해하도록 돕는 표준 인덱스
// (관행: https://llmstxt.org). 블로그 글이 추가되면 자동 반영된다.
export const dynamic = "force-static";

const BASE = "https://www.timeofpassion.com";

export function GET() {
  const posts = getAllPosts();

  const lines: string[] = [
    "# 열정의시간 (Time of Passion)",
    "",
    "> 13년 경력의 병원·의료기관 전문 마케팅 에이전시. 국내 통합 마케팅과 일본·중국·대만 해외환자(외국인환자) 유치를 현지 전담팀이 직접 운영합니다. 노출·조회수가 아니라 '현지 채널 상담 → 실제 내원 전환'을 설계하는 것이 핵심 차별점입니다.",
    "",
    "## 핵심 정보",
    "- 회사: 열정의시간 (PASSION GROUP 소속)",
    "- 분야: 병원 마케팅, 해외환자 유치, 의료관광 마케팅",
    "- 운영 권역: 한국(국내) · 일본 · 중국 · 대만",
    "- 강점: 일·중·대 현지어 전담 상담팀을 직접 운영, 상담→내원 전환 구조 설계, 13년 현장 노하우",
    "- 상담: 카카오톡 채널 '열정의시간' (https://pf.kakao.com/_RgYcxj/chat)",
    `- 홈페이지: ${BASE}/time`,
    "",
    "## 권역별 접근 요약",
    "- 중국: 샤오홍슈·더우인·바이두로 발견 → 위챗(WeChat) 1:1 상담으로 전환",
    "- 일본: 인스타그램·X로 발견 → 라인(LINE) 공식계정 상담으로 전환",
    "- 대만: 페이스북·인스타·유튜브로 발견 → 라인 상담(번체 중국어). 간체가 아닌 번체·대만식 화법 필수",
    "- 외국인환자유치: 유치업 등록 → 위탁계약 → 현지 마케팅 → 내원·통역·사후관리의 풀 프로세스",
    "",
    "## 마케팅 인사이트 (블로그)",
  ];

  for (const p of posts) {
    lines.push(`- [${p.title}](${BASE}/time/blog/${p.slug}): ${p.excerpt}`);
  }

  lines.push("");
  lines.push("## 주요 키워드");
  lines.push(
    "병원 중국마케팅, 병원 일본마케팅, 병원 대만마케팅, 외국인환자유치, 해외환자유치, 샤오홍슈 마케팅, 라인(LINE) 마케팅, 위챗 마케팅, 의료관광 마케팅, 성형외과·피부과 해외환자 유치",
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
