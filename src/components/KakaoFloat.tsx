"use client";

export default function KakaoFloat() {
  return (
    <a
      href="http://pf.kakao.com/_RgYcxj/chat"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 상담"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#FEE500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#3C1E1E">
        <path d="M12 3c-5.523 0-10 3.538-10 7.9 0 2.85 1.848 5.347 4.636 6.74l-1.185 4.316c-.056.205.18.366.353.243l5.06-3.327c.373.048.755.074 1.146.074 5.523 0 10-3.538 10-7.9S17.523 3 12 3z" />
      </svg>
    </a>
  );
}
