import type { MetadataRoute } from "next";

// 전통 검색엔진 + 생성형 AI 검색엔진(GEO) 모두에 콘텐츠를 명시적으로 개방한다.
// 마케팅 인사이트(/time/blog)와 협력병원 포털을 색인·인용 대상으로 환영.
export default function robots(): MetadataRoute.Robots {
  // 생성형 검색·LLM 크롤러를 명시적으로 허용해 인용(citation) 가능성을 높인다.
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "Google-Extended",
    "ClaudeBot",
    "anthropic-ai",
    "Claude-Web",
    "PerplexityBot",
    "Perplexity-User",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "Meta-ExternalAgent",
    "Amazonbot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // "/hospital$" · "/hospital/" 두 줄로 분리: robots 규칙은 접두 매칭이라
        // "/hospital" 만 쓰면 공개 중인 "/ko/hospitals" 계열까지 함께 막힌다.
        disallow: ["/api/", "/hospital$", "/hospital/"],
      },
      {
        userAgent: aiBots,
        allow: "/",
        // "/hospital$" · "/hospital/" 두 줄로 분리: robots 규칙은 접두 매칭이라
        // "/hospital" 만 쓰면 공개 중인 "/ko/hospitals" 계열까지 함께 막힌다.
        disallow: ["/api/", "/hospital$", "/hospital/"],
      },
    ],
    sitemap: "https://www.timeofpassion.com/sitemap.xml",
    host: "https://www.timeofpassion.com",
  };
}
