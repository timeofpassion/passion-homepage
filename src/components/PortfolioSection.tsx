"use client";

import { useState } from "react";
import Link from "next/link";
import { featuredItems, portfolioItems, type PortfolioItem } from "@/data/portfolio";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import Lightbox from "@/components/portfolio/Lightbox";

// /time 메인 진입 섹션: 대표 작품(featured) 미리보기 + 포트폴리오 창으로 가는 CTA
export default function PortfolioSection() {
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const items = featuredItems(6);
  const total = portfolioItems.length;

  return (
    <section id="portfolio" style={{ position: "relative", zIndex: 20, padding: "7rem 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            className="font-mono-sys"
            style={{ color: "#cc0000", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 14 }}
          >
            PORTFOLIO
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, marginBottom: 14 }}>
            열정의시간이 만든 <span style={{ color: "#cc0000" }}>홈페이지</span>
          </h2>
          <p style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", color: "rgba(255,255,255,0.55)" }}>
            기획부터 디자인·퍼블리싱까지. 직접 만든 작업물을 확인하세요.
          </p>
        </div>

        {/* featured 미리보기 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.4rem",
          }}
        >
          {items.map((it) => (
            <PortfolioCard key={it.id} item={it} onOpen={setLightbox} />
          ))}
        </div>

        {/* 전체 보기 CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/time/portfolio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 30px",
              border: "1px solid rgba(204,0,0,0.5)",
              borderRadius: 999,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              background: "rgba(204,0,0,0.08)",
            }}
          >
            포트폴리오 전체 보기 <span style={{ color: "#cc0000" }}>({total})</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
