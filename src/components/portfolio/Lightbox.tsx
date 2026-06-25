"use client";

import { useEffect, useState } from "react";
import type { PortfolioItem } from "@/data/portfolio";

// 만료/주소없는 작품을 클릭하면 캡처 이미지를 크게 보여주는 라이트박스.
// 라이브 주소가 있으면 "사이트 방문" 버튼도 함께 노출.
export default function Lightbox({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;
  const accent = item.accent || "#cc0000";
  const showImage = Boolean(item.thumbnail) && !imgError;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5vw",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: 1000,
          width: "100%",
          maxHeight: "88vh",
          overflow: "auto",
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 12,
        }}
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            fontSize: "1.2rem",
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {/* 이미지 / 폴백 */}
        <div
          style={{
            width: "100%",
            background: showImage ? "#000" : `linear-gradient(135deg, ${accent}, rgba(0,0,0,0.85))`,
            minHeight: showImage ? "auto" : 240,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt={item.title}
              onError={() => setImgError(true)}
              style={{ width: "100%", display: "block" }}
            />
          ) : (
            <span style={{ padding: "3rem 1rem", fontSize: "1.6rem", fontWeight: 800, color: "#fff", textAlign: "center" }}>
              {item.title}
            </span>
          )}
        </div>

        {/* 정보 */}
        <div style={{ padding: "1.3rem 1.5rem 1.6rem" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: 6 }}>
            {item.title}
            {item.expired && (
              <span
                style={{
                  marginLeft: 10,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#f59e0b",
                  border: "1px solid rgba(245,158,11,0.4)",
                  borderRadius: 999,
                  padding: "2px 8px",
                  verticalAlign: "middle",
                }}
              >
                운영 종료
              </span>
            )}
          </h3>
          <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{item.summary}</p>

          {item.liveUrl && !item.expired && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                padding: "10px 18px",
                background: "#cc0000",
                color: "#fff",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              사이트 방문 <span aria-hidden>→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
