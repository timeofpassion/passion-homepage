import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import KakaoFloat from "@/components/KakaoFloat";
import { loadPosts, loadPostBySlug, loadAllSlugs } from "@/lib/time-blog-source";

const BASE = "https://www.timeofpassion.com";
const OG_IMAGE = `${BASE}/time/og-time-v2.jpg`;
const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";

// 인트라넷에서 새로 발행한 글도 on-demand 로 렌더(빌드 후 추가분)
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await loadAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPostBySlug(slug);
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
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [OG_IMAGE],
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
  const post = await loadPostBySlug(slug);
  if (!post) notFound();

  const url = `${BASE}/time/blog/${post.slug}`;

  // 같은 권역(카테고리) 글을 우선해 관련글 최대 3개
  const related = (await loadPosts())
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const ac = a.category === post.category ? 0 : 1;
      const bc = b.category === post.category ? 0 : 1;
      if (ac !== bc) return ac - bc;
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 3);

  // 구조화데이터 — BlogPosting + BreadcrumbList (+ FAQ 있으면 FAQPage)
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: "ko-KR",
      keywords: post.tags.join(", "),
      articleSection: post.category,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: [OG_IMAGE],
      author: { "@type": "Organization", name: "열정의시간", url: `${BASE}/time` },
      publisher: {
        "@type": "Organization",
        name: "열정의시간",
        url: `${BASE}/time`,
        logo: { "@type": "ImageObject", url: OG_IMAGE },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "열정의시간", item: `${BASE}/time` },
        {
          "@type": "ListItem",
          position: 2,
          name: "마케팅 인사이트",
          item: `${BASE}/time/blog`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faq && post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

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

            {/* 자주 묻는 질문 — FAQPage 구조화데이터와 동일 내용 */}
            {post.faq && post.faq.length > 0 && (
              <section style={{ marginTop: "3.5rem" }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    lineHeight: 1.4,
                    marginBottom: "1.5rem",
                    color: "#fff",
                  }}
                >
                  자주 묻는 질문
                </h2>
                {post.faq.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "1.5rem",
                      paddingBottom: "1.5rem",
                      borderBottom:
                        i < post.faq!.length - 1
                          ? "1px solid rgba(255,255,255,0.08)"
                          : "none",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#FFD700",
                        marginBottom: "0.6rem",
                        lineHeight: 1.5,
                      }}
                    >
                      Q. {f.q}
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        lineHeight: 1.75,
                        fontWeight: 300,
                      }}
                    >
                      {f.a}
                    </p>
                  </div>
                ))}
              </section>
            )}

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
                10년 이상 노하우의 일본·중국·대만 전담팀이 현재 채널 구조의 끊긴
                지점을 무료로 진단해 드립니다.
              </p>
              <a
                href={KAKAO_URL}
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

            {/* 관련글 — 토픽 클러스터 내부링크 */}
            {related.length > 0 && (
              <section style={{ marginTop: "3.5rem" }}>
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    marginBottom: "1.2rem",
                    color: "#fff",
                  }}
                >
                  함께 보면 좋은 글
                </h2>
                <div style={{ display: "grid", gap: "0.8rem" }}>
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/time/blog/${r.slug}`}
                      style={{
                        display: "block",
                        padding: "1.1rem 1.3rem",
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        textDecoration: "none",
                        color: "#fff",
                      }}
                    >
                      <span
                        style={{
                          color: "#FFD700",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          display: "block",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {r.category}
                      </span>
                      <span
                        style={{ fontSize: "0.98rem", fontWeight: 700, lineHeight: 1.5 }}
                      >
                        {r.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>

        <Footer />
      </main>
      <FixedCTA />
      <KakaoFloat />
    </>
  );
}
