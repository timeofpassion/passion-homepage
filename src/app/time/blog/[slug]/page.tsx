import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import KakaoFloat from "@/components/KakaoFloat";
import { blogPosts, getPostBySlug } from "@/data/blog";

const BASE = "https://www.timeofpassion.com";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${BASE}/time/blog/${post.slug}`;
  return {
    // 그룹 템플릿 우회 — 글 제목 + 열정의시간
    title: { absolute: `${post.title} | 열정의시간` },
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "열정의시간",
      locale: "ko_KR",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${BASE}/time/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "ko-KR",
    keywords: post.tags.join(", "),
    articleSection: post.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Organization",
      name: "열정의시간",
      url: `${BASE}/time`,
    },
    publisher: {
      "@type": "Organization",
      name: "열정의시간",
      url: `${BASE}/time`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackgroundEffects />
      <main className="relative z-10">
        <Header />

        <article style={{ padding: "8rem 0 4rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 6%" }}>
            <Link
              href="/time/blog"
              style={{
                color: "#FFD700",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginBottom: "2rem",
              }}
            >
              ← 마케팅 인사이트 목록
            </Link>

            <span
              style={{
                color: "#FFD700",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                display: "block",
                marginBottom: "0.9rem",
              }}
            >
              {post.category}
            </span>
            <h1
              style={{
                fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)",
                fontWeight: 900,
                lineHeight: 1.3,
                marginBottom: "1.1rem",
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "2.5rem",
              }}
            >
              {post.date} · 열정의시간
            </p>

            <div style={{ fontSize: "1.02rem", lineHeight: 1.85 }}>
              {post.body.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: 800,
                        lineHeight: 1.4,
                        margin: "2.6rem 0 1rem",
                        color: "#fff",
                      }}
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul
                      key={i}
                      style={{
                        margin: "0 0 1.4rem",
                        paddingLeft: "1.2rem",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {block.items.map((item, j) => (
                        <li key={j} style={{ marginBottom: "0.5rem", lineHeight: 1.7 }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    style={{
                      margin: "0 0 1.4rem",
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 300,
                    }}
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* 본문 하단 CTA */}
            <div
              style={{
                marginTop: "3.5rem",
                padding: "2rem",
                borderRadius: 12,
                background: "rgba(204,0,0,0.08)",
                border: "1px solid rgba(204,0,0,0.25)",
              }}
            >
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.6rem" }}>
                해외환자 유치, 어디서부터 막혔는지부터 진단합니다
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.7,
                  marginBottom: "1.3rem",
                  fontWeight: 300,
                }}
              >
                13년 노하우의 일본·중국·대만 전담팀이 현재 채널 구조의 끊긴
                지점을 무료로 진단해 드립니다.
              </p>
              <a
                href="https://pf.kakao.com/_timfofpassion"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "#FFD700",
                  color: "#0a0000",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  padding: "0.85rem 1.6rem",
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                카카오톡으로 무료 상담 →
              </a>
            </div>
          </div>
        </article>

        <Footer />
      </main>
      <FixedCTA />
      <KakaoFloat />
    </>
  );
}
