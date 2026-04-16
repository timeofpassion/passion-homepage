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
        <span className="hero-highlight">광고비</span>만 쓰고
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
    </section>
  );
}
