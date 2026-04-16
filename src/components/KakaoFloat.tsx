"use client";

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
        alignItems: "center",
      }}
    >
      {/* 회사소개서 */}
      <a
        href="https://docs.google.com/presentation/d/17fAOTFOwVV91fOpLUcWycyWzV6GFCpvfjwQGYgNYiZY/edit?slide=id.p#slide=id.p"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="회사소개서"
        style={{
          ...btnStyle,
          background: "#ffffff",
          width: "auto",
          borderRadius: 28,
          padding: "0 18px",
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "#333",
          gap: 6,
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        회사소개서
      </a>

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
    </div>
  );
}
