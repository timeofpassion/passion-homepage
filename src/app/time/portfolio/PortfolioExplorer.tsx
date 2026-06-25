"use client";

import { useState } from "react";
import {
  portfolioRegions,
  portfolioCategories,
  itemsByRegionAndCategory,
  regionCount,
  categoryCountInRegion,
  type PortfolioRegion,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/data/portfolio";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import Lightbox from "@/components/portfolio/Lightbox";

// 포트폴리오 창 본문: 1차 권역 탭 + 2차 작업유형 탭 + 카드 그리드 + 라이트박스
export default function PortfolioExplorer() {
  const [region, setRegion] = useState<PortfolioRegion>("own");
  const [category, setCategory] = useState<PortfolioCategory>("homepage");
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const items = itemsByRegionAndCategory(region, category);

  return (
    <section style={{ position: "relative", zIndex: 20, padding: "2.5rem 0 7rem" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
        {/* 1차 탭: 마케팅 권역 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: "1.2rem",
          }}
        >
          {portfolioRegions.map((r) => {
            const count = regionCount(r.key);
            const isActive = r.key === region;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setRegion(r.key)}
                style={{
                  padding: "11px 22px",
                  borderRadius: 999,
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: isActive ? "#cc0000" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  border: `1px solid ${isActive ? "#cc0000" : "rgba(255,255,255,0.12)"}`,
                  transition: "all 0.2s",
                }}
              >
                {r.label}
                <span style={{ marginLeft: 7, fontSize: "0.75rem", opacity: 0.7 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* 2차 탭: 작업 유형 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          {portfolioCategories.map((cat) => {
            const count = categoryCountInRegion(region, cat.key);
            const isActive = cat.key === category;
            const disabled = !cat.ready;
            return (
              <button
                key={cat.key}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setCategory(cat.key)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 999,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: disabled ? "not-allowed" : "pointer",
                  background: "transparent",
                  color: disabled
                    ? "rgba(255,255,255,0.28)"
                    : isActive
                      ? "#fff"
                      : "rgba(255,255,255,0.55)",
                  border: `1px solid ${
                    isActive ? "rgba(204,0,0,0.6)" : "rgba(255,255,255,0.08)"
                  }`,
                  transition: "all 0.2s",
                }}
              >
                {cat.label}
                {cat.ready ? (
                  <span style={{ marginLeft: 6, fontSize: "0.72rem", opacity: 0.7 }}>{count}</span>
                ) : (
                  <span style={{ marginLeft: 6, fontSize: "0.68rem", opacity: 0.7 }}>준비중</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 카드 그리드 */}
        {items.length > 0 ? (
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
        ) : (
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "4rem 0" }}>
            곧 준비됩니다.
          </p>
        )}
      </div>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
