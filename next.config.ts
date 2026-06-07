import type { NextConfig } from "next";

// 마케팅 업무툴(passion-marketing-suite) 배포 origin.
// 멀티존 프록시 대상. 커스텀 도메인 쓰면 Vercel env MARKETING_TOOL_URL 로 override.
const MARKETING_TOOL_URL =
  process.env.MARKETING_TOOL_URL ?? "https://passion-marketing-suite.vercel.app";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    // 기존 주소(북마크·외부 링크) → /time 하위 새 주소로 영구 이동
    return [
      { source: "/quote", destination: "/time/quote", permanent: true },
      { source: "/quote/:id", destination: "/time/quote/:id", permanent: true },
      { source: "/services/:id", destination: "/time/services/:id", permanent: true },
      { source: "/review-studio", destination: "/time/review-studio", permanent: true },
    ];
  },
  // 멀티존: /marketing-tool/* 를 마케팅 툴 배포로 프록시 (suite 는 basePath="/marketing-tool").
  // catch-all 이 _next 정적자산·api/auth 콜백까지 모두 프록시한다.
  async rewrites() {
    return [
      { source: "/marketing-tool", destination: `${MARKETING_TOOL_URL}/marketing-tool` },
      {
        source: "/marketing-tool/:path*",
        destination: `${MARKETING_TOOL_URL}/marketing-tool/:path*`,
      },
    ];
  },
};

export default nextConfig;
