import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    // 기존 주소(북마크·외부 링크) → /time 하위 새 주소로 영구 이동
    return [
      { source: "/quote", destination: "/time/quote", permanent: true },
      { source: "/quote/:id", destination: "/time/quote/:id", permanent: true },
      { source: "/services/:id", destination: "/time/services/:id", permanent: true },
      { source: "/review-studio", destination: "/time/review-studio", permanent: true },
      // 협력병원: 기존 /ko/hospitals(언어별) → /hospital 통합 페이지로 영구 이동
      { source: "/:lang(ko|en|ja|zh-cn|zh-tw|vi)/hospitals", destination: "/hospital", permanent: true },
      { source: "/:lang(ko|en|ja|zh-cn|zh-tw|vi)/hospitals/:slug", destination: "/hospital", permanent: true },
    ];
  },
};

export default nextConfig;
