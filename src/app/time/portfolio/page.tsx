import type { Metadata } from "next";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import KakaoFloat from "@/components/KakaoFloat";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import { portfolioGroups, portfolioCategories, typesInGroup, type PortfolioGroupKey, type PortfolioCategory } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "포트폴리오",
  description:
    "열정의시간 포트폴리오. 국내·일본·중국·대만 마케팅과 홈페이지·디자인 작업을 분야별로 확인하세요.",
  alternates: { canonical: "https://www.timeofpassion.com/time/portfolio" },
  openGraph: {
    title: "포트폴리오 | 열정의시간",
    description: "국내·일본·중국·대만 마케팅과 홈페이지·디자인 작업을 분야별로.",
    url: "https://www.timeofpassion.com/time/portfolio",
    siteName: "열정의시간",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/time/og-time-v2.jpg",
        width: 1200,
        height: 630,
        alt: "열정의시간 포트폴리오",
      },
    ],
  },
};

// /time 메인의 「더 보러 가기」가 ?region=&category= 로 해당 탭을 바로 연다.
export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const g = one(sp.group);
  const t = one(sp.type);
  const initialGroup = portfolioGroups.some((x) => x.key === g) ? (g as PortfolioGroupKey) : "domestic";
  // 유형은 그 분류 안에 실제로 작업이 있을 때만 열어준다(빈 화면 방지).
  const initialType =
    portfolioCategories.some((x) => x.key === t) && typesInGroup(initialGroup).some((x) => x.key === t)
      ? (t as PortfolioCategory)
      : null;

  return (
    <>
      <BackgroundEffects />

      <main className="relative z-10">
        <Header />

        {/* 페이지 헤더 */}
        <header
          style={{
            paddingTop: "clamp(7rem, 14vw, 10rem)",
            paddingBottom: "1rem",
            textAlign: "center",
            position: "relative",
            zIndex: 20,
          }}
        >
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
            <p
              className="font-mono-sys"
              style={{ color: "#E63329", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 16 }}
            >
              OUR WORK
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
              포트폴리오
            </h1>
            <p
              style={{
                fontSize: "clamp(0.92rem, 1.7vw, 1.1rem)",
                color: "rgba(255,255,255,0.6)",
                maxWidth: 620,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              국내·일본·중국·대만 마케팅과 홈페이지·디자인까지, 열정의시간이 직접 한 작업입니다.
              분야를 고르고 하고 싶은 일을 눌러 들어가 보세요.
            </p>
          </div>
        </header>

        <PortfolioGallery initialGroup={initialGroup} initialType={initialType} />
        <Footer />
      </main>

      <FixedCTA />
      <KakaoFloat />
    </>
  );
}
