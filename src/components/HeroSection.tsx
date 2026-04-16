export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: "70vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 8%",
        position: "relative",
      }}
    >
      <img
        src="/logo_passion.png"
        alt="열정의시간 로고"
        style={{ width: 80, height: 80, marginBottom: "2rem", objectFit: "contain" }}
      />
      <h1
        style={{
          fontSize: "clamp(2.4rem, 7vw, 6rem)",
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          marginBottom: "2rem",
        }}
      >
        병원 마케팅,
        <br />
        <span style={{ background: "#cc0000", color: "#ffffff", padding: "0.05em 0.25em" }}>광고비</span>만 쓰고
        <br />
        끝난 적 있으신가요?
      </h1>
      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "rgba(255,255,255,0.75)",
          maxWidth: 620,
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        13년의 노하우. 단순한 유입량이 아닌,
        <br />
        병원의 실질적 매출을 만드는 &lsquo;수익 구조&rsquo; 자체를 설계합니다.
      </p>
      <p
        style={{
          fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
          color: "rgba(255,255,255,0.45)",
          maxWidth: 620,
          lineHeight: 1.7,
          fontWeight: 300,
          marginTop: "1.2rem",
        }}
      >
        열정의시간은 국내, 중국, 대만, 일본 마케팅이 가능한
        <br />
        마케팅 통합 전문기업입니다.
      </p>
      <a
        href="https://docs.google.com/presentation/d/17fAOTFOwVV91fOpLUcWycyWzV6GFCpvfjwQGYgNYiZY/edit?slide=id.g36df296e312_1_29#slide=id.g36df296e312_1_29"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "2rem",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 28px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          fontSize: "0.95rem",
          fontWeight: 600,
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
      >
        회사소개서 보러가기
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </section>
  );
}
