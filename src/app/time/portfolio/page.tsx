import type { Metadata } from "next";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import KakaoFloat from "@/components/KakaoFloat";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

export const metadata: Metadata = {
  title: "포트폴리오",
  description:
    "열정의시간이 직접 만든 홈페이지 포트폴리오. 병원·브랜드 홈페이지 제작 사례를 확인하세요.",
  alternates: { canonical: "https://www.timeofpassion.com/time/portfolio" },
  openGraph: {
    title: "포트폴리오 | 열정의시간",
    description: "열정의시간이 직접 만든 홈페이지 포트폴리오.",
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

export default function PortfolioPage() {
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
              style={{ color: "#cc0000", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 16 }}
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
              열정의시간이 기획부터 디자인·퍼블리싱까지 직접 만든 홈페이지입니다.
              카드를 누르면 실제 사이트로 이동합니다.
            </p>
          </div>
        </header>

        <PortfolioGallery />
        <Footer />
      </main>

      <FixedCTA />
      <KakaoFloat />
    </>
  );
}
