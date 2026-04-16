"use client";

import { useEffect, useState } from "react";

export default function Popup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("popup_dismissed");
    if (!dismissed) {
      setShow(true);
    } else {
      // 하루 지났으면 다시 표시
      const dismissedAt = Number(dismissed);
      if (Date.now() - dismissedAt > 24 * 60 * 60 * 1000) {
        setShow(true);
      }
    }
  }, []);

  const handleClose = () => setShow(false);

  const handleDismissToday = () => {
    localStorage.setItem("popup_dismissed", String(Date.now()));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.7)",
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: "#fff",
          maxWidth: 480,
          width: "90%",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            background: "rgba(0,0,0,0.05)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "#666",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* ============================== */}
        {/* 여기에 팝업 내용을 교체하세요    */}
        {/* ============================== */}
        <div style={{ padding: "3rem 2rem 2rem", textAlign: "center" }}>
          {/* 이미지 영역 - 나중에 이미지로 교체 */}
          <div
            style={{
              width: "100%",
              height: 240,
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              border: "1px dashed #ddd",
              color: "#aaa",
              fontSize: "0.9rem",
            }}
          >
            팝업 이미지 영역
            <br />
            (이미지 준비 후 교체)
          </div>

          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "#1a1a1a",
              marginBottom: 8,
            }}
          >
            열정의시간 이벤트
          </h3>
          <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: 20 }}>
            팝업 내용을 여기에 입력하세요.
          </p>

          {/* CTA 버튼 */}
          <a
            href="#"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              background: "#cc0000",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              marginBottom: 8,
            }}
          >
            자세히 보기
          </a>
        </div>

        {/* 하단: 하루동안 보지 않기 */}
        <div
          style={{
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 20px",
            background: "#fafafa",
          }}
        >
          <button
            onClick={handleDismissToday}
            style={{
              background: "none",
              border: "none",
              color: "#999",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            하루동안 보지 않기
          </button>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              color: "#999",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
