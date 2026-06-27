import type { Metadata } from "next";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import KakaoFloat from "@/components/KakaoFloat";
import { TimeBlogCarousel, TimeBlogGrid } from "@/components/TimeBlogCarousel";
import { loadPosts } from "@/lib/time-blog-source";

// 인트라넷 발행 글을 5분 ISR 로 반영
export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: "마케팅 인사이트 | 열정의시간 — 일본·중국·대만 해외환자 유치",
  },
  description:
    "병원 마케팅 전문 에이전시 열정의시간의 마케팅 인사이트. 일본 라인 마케팅, 중국 샤오홍슈, 대만 멀티채널 등 13년 현장에서 검증한 해외환자 유치 전략을 정리합니다.",
  keywords: [
    "병원마케팅",
    "해외환자유치",
    "일본마케팅",
    "중국마케팅",
    "대만마케팅",
    "샤오홍슈마케팅",
    "라인마케팅",
    "의료관광마케팅",
  ],
  openGraph: {
    title: "마케팅 인사이트 | 열정의시간",
    description:
      "일본·중국·대만 해외환자 유치 전략을 13년 현장 관점에서 정리한 열정의시간 마케팅 인사이트.",
    url: "https://www.timeofpassion.com/time/blog",
    siteName: "열정의시간",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.timeofpassion.com/time/blog",
  },
};

export default async function BlogIndexPage() {
  const posts = await loadPosts();
  const latest = posts.slice(0, 6);

  return (
    <>
      <BackgroundEffects />
      <main className="relative z-10">
        <Header />

        <section style={{ padding: "8rem 0 1.5rem" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
            <span
              style={{
                color: "#FFD700",
                fontSize: ".85rem",
                letterSpacing: ".15em",
                fontWeight: 800,
                display: "block",
                marginBottom: ".75rem",
              }}
            >
              MARKETING INSIGHTS
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              마케팅 인사이트
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                color: "rgba(255,255,255,0.7)",
                maxWidth: 720,
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              일본 라인 마케팅, 중국 샤오홍슈, 대만 멀티채널까지. 13년 현장에서
              검증한 해외환자 유치 전략을 병원 관점에서 정리합니다.
            </p>
          </div>
        </section>

        {latest.length > 0 && (
          <section style={{ padding: "1rem 0" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "1.1rem" }}>
                최신 인사이트
              </h2>
              <TimeBlogCarousel posts={latest} />
            </div>
          </section>
        )}

        <section style={{ padding: "1rem 0 6rem" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "1.1rem" }}>
              전체 글
            </h2>
            <TimeBlogGrid posts={posts} />
          </div>
        </section>

        <Footer />
      </main>
      <FixedCTA />
      <KakaoFloat />
    </>
  );
}
