"use client";

import { useState } from "react";
import {
  portfolioCategories,
  itemsByCategory,
  categoryCount,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/data/portfolio";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import Lightbox from "@/components/portfolio/Lightbox";

// 포트폴리오 창 본문: 카테고리 탭 + 카드 그리드 + 라이트박스
export default function PortfolioExplorer() {
  const [active, setActive] = useState<PortfolioCategory>("homepage");
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const items = itemsByCategory(active);

  return (
    <section style={{ position: "relative", zIndex: 20, padding: "2.5rem 0 7rem" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
        {/* 카테고리 탭 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          {portfolioCategories.map((cat) => {
            const count = categoryCount(cat.key);
            const isActive = cat.key === active;
            const disabled = !cat.ready;
            return (
              <button
                key={cat.key}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setActive(cat.key)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 999,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: disabled ? "not-allowed" : "pointer",
                  background: isActive ? "#cc0000" : "rgba(255,255,255,0.04)",
                  color: disabled
                    ? "rgba(255,255,255,0.3)"
                    : isActive
                      ? "#fff"
                      : "rgba(255,255,255,0.7)",
                  border: `1px solid ${isActive ? "#cc0000" : "rgba(255,255,255,0.12)"}`,
                  transition: "all 0.2s",
                }}
              >
                {cat.label}
                {cat.ready ? (
                  <span style={{ marginLeft: 7, fontSize: "0.75rem", opacity: 0.7 }}>{count}</span>
                ) : (
                  <span style={{ marginLeft: 7, fontSize: "0.7rem", opacity: 0.7 }}>준비중</span>
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
