"use client";

import { useState } from "react";

// 로고를 누르면 권역별 제안서가 위로 펼쳐진다. 링크 교체는 이 배열만 고치면 된다.
const PROPOSALS = [
  { label: "국내마케팅", href: "https://docs.google.com/presentation/d/17fAOTFOwVV91fOpLUcWycyWzV6GFCpvfjwQGYgNYiZY/edit" },
  { label: "중국마케팅", href: "https://docs.google.com/presentation/d/1clu7n3Ag0l6GrWlFzKF1bN-0kzXP63ws-22-jlTTcyA/edit" },
  { label: "대만마케팅", href: "https://docs.google.com/presentation/d/15kiF0BlcWDyevXr_PZ6YuElaF2CsQOWPXgREksaZqIg/edit" },
  { label: "일본마케팅", href: "https://docs.google.com/presentation/d/1IYYSmlSdHhbhDPvl_8RH8OthDxWQHKPhbjmEHjpQwJo/edit" },
];

const btnStyle: React.CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  textDecoration: "none",
};

export default function KakaoFloat() {
  const [open, setOpen] = useState(false);
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "scale(1.1)";
    e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.4)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "flex-end",
      }}
    >
      {/* 권역별 제안서 (로고 클릭 시 펼침) */}
      {open && (
        <div id="proposal-list" style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>제안서 보기</span>
          {PROPOSALS.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "9px 16px", borderRadius: 8, background: "#fff", color: "#0f172a", fontSize: 13, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(0,0,0,0.35)" }}
            >
              {p.label} 제안서 ↗
            </a>
          ))}
        </div>
      )}
      <button
        type="button"
        aria-label="마케팅 제안서 보기"
        aria-expanded={open}
        aria-controls="proposal-list"
        onClick={() => setOpen((v) => !v)}
        style={{ ...btnStyle, background: "#ffffff", padding: 4, border: open ? "2px solid #E63329" : "none" }}
      >
        <img
          src="/logo_passion.png"
          alt="열정의시간"
          style={{ width: 40, height: 40, objectFit: "contain", borderRadius: "50%" }}
        />
      </button>

      {/* 카카오톡 */}
      <a
        href="http://pf.kakao.com/_RgYcxj/chat"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담"
        style={{ ...btnStyle, background: "#FEE500" }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#3C1E1E">
          <path d="M12 3c-5.523 0-10 3.538-10 7.9 0 2.85 1.848 5.347 4.636 6.74l-1.185 4.316c-.056.205.18.366.353.243l5.06-3.327c.373.048.755.074 1.146.074 5.523 0 10-3.538 10-7.9S17.523 3 12 3z" />
        </svg>
      </a>

      {/* 견적 요청 */}
      <a
        href="/time/quote"
        style={{ ...btnStyle, width: "auto", height: "auto", borderRadius: 999, padding: "10px 14px", background: "#E63329", color: "#fff", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap" }}
      >
        견적 요청
      </a>
    </div>
  );
}
