"use client";

import { useEffect, useState } from "react";

interface BlogPost {
  title: string;
  link: string;
  thumbnail: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section style={{ position: "relative", zIndex: 20, padding: "6rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: 12 }}>
            열정의시간 소식
          </h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>
            네이버 블로그에서 최신 마케팅 인사이트를 확인하세요
          </p>
        </div>

        {/* Posts grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "1.2rem",
          }}
        >
          {posts.map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none",
                color: "#fff",
                overflow: "hidden",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                borderRadius: 6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(204,0,0,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: "100%", height: 180, overflow: "hidden", background: "rgba(204,0,0,0.08)" }}>
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>
                    열정의시간
                  </div>
                )}
              </div>

              {/* Title */}
              <div style={{ padding: "1rem 1.2rem 1.2rem" }}>
                <h3
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* More button */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="https://blog.naver.com/mimichelin"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: "0.85rem",
            }}
          >
            블로그 더보기 →
          </a>
        </div>
      </div>
    </section>
  );
}
