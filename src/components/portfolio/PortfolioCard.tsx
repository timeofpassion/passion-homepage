"use client";

import { useState, type CSSProperties } from "react";
import type { PortfolioItem } from "@/data/portfolio";

// 포트폴리오 카드 (메인 진입 섹션 + 갤러리 공용)
// - liveUrl 있고 만료 아님 → 클릭 시 새 탭으로 라이브 사이트
// - 그 외(만료·주소없음) → onOpen 콜백으로 이미지 라이트박스
// - 썸네일 없거나 로드 실패 → 브랜드색 폴백 카드
export default function PortfolioCard({
  item,
  onOpen,
}: {
  item: PortfolioItem;
  onOpen?: (item: PortfolioItem) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [hover, setHover] = useState(false);

  const hasLive = Boolean(item.liveUrl) && !item.expired;
  const showImage = Boolean(item.thumbnail) && !imgError;
  const accent = item.accent || "#cc0000";

  const badge = hasLive
    ? { label: "LIVE", color: "#22c55e" }
    : showImage
      ? { label: "이미지", color: "rgba(255,255,255,0.55)" }
      : { label: "준비중", color: "rgba(255,255,255,0.45)" };

  const inner = (
    <>
      {/* 썸네일 / 폴백 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          background: showImage
            ? "#000"
            : `linear-gradient(135deg, ${accent}, rgba(0,0,0,0.85))`,
        }}
      >
        {showImage ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              transition: "transform 0.4s ease",
              transform: hover ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.55rem)",
                fontWeight: 800,
                color: "#fff",
                textShadow: "0 2px 14px rgba(0,0,0,0.45)",
              }}
            >
              {item.title}
            </span>
            <span style={{ marginTop: 8, fontSize: "0.72rem", color: "rgba(255,255,255,0.72)" }}>
              미리보기 준비중
            </span>
          </div>
        )}

        {/* 상태 배지 */}
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 9px",
            borderRadius: 999,
            fontSize: "0.66rem",
            fontWeight: 700,
            letterSpacing: "0.02em",
            background: "rgba(0,0,0,0.55)",
            color: badge.color,
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(4px)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: badge.color, display: "inline-block" }} />
          {badge.label}
        </span>
      </div>

      {/* 메타 */}
      <div style={{ padding: "1rem 1.1rem 1.15rem", display: "flex", flexDirection: "column", gap: 8 }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>{item.title}</h3>
        <p
          style={{
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.summary}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
            {item.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  padding: "2px 8px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <span
          style={{
            marginTop: 6,
            fontSize: "0.72rem",
            fontWeight: 600,
            color: hover ? "#ff5a4d" : "rgba(255,255,255,0.45)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "color 0.2s",
          }}
        >
          {hasLive ? "사이트 방문" : showImage ? "이미지 보기" : "미리보기 보기"} <span aria-hidden>→</span>
        </span>
      </div>
    </>
  );

  const commonStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    width: "100%",
    padding: 0,
    margin: 0,
    font: "inherit",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${hover ? "rgba(204,0,0,0.45)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 10,
    overflow: "hidden",
    color: "#fff",
    cursor: "pointer",
    textDecoration: "none",
    transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
    transform: hover ? "translateY(-4px)" : "translateY(0)",
    boxShadow: hover ? "0 18px 40px -18px rgba(204,0,0,0.55)" : "none",
  };

  if (hasLive) {
    return (
      <a
        href={item.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={commonStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      style={commonStyle}
      onClick={() => onOpen?.(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {inner}
    </button>
  );
}
