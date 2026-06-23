import type { Metadata } from "next";
import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import KakaoFloat from "@/components/KakaoFloat";
import { getAllPosts } from "@/data/blog";

export const metadata: Metadata = {
  // 그룹 템플릿("%s | PASSION GROUP") 우회 — 열정의시간 단일 브랜딩
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

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <BackgroundEffects />
      <main className="relative z-10">
        <Header />

        <section style={{ padding: "8rem 0 4rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
            <span
              style={{
                color: "#FFD700",
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                fontWeight: 700,
                display: "block",
                marginBottom: "0.75rem",
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

        <section style={{ padding: "0 0 6rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/time/blog/${post.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "1.75rem",
                    textDecoration: "none",
                    color: "#fff",
                    minHeight: 220,
                  }}
                >
                  <span
                    style={{
                      color: "#FFD700",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      marginBottom: "0.9rem",
                    }}
                  >
                    {post.category}
                  </span>
                  <h2
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      lineHeight: 1.45,
                      marginBottom: "0.9rem",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.6,
                      fontWeight: 300,
                      flexGrow: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    style={{
                      marginTop: "1.25rem",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {post.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
      <FixedCTA />
      <KakaoFloat />
    </>
  );
}
