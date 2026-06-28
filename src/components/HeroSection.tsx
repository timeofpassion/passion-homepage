import Link from "next/link";

const TRUST = [
  { value: "10년+", label: "노하우" },
  { value: "6개 팀", label: "전문 인력" },
  { value: "4개국", label: "통합 마케팅" },
  { value: "100%", label: "채널 소유권" },
];

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: "90vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "7rem 8% 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="hero-glow" aria-hidden="true" />

      {/* Eyebrow */}
      <div
        className="hero-anim font-mono-sys"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 12,
          letterSpacing: "0.22em",
          color: "#FFD700",
          marginBottom: "1.8rem",
          position: "relative",
          zIndex: 1,
          animationDelay: "0s",
        }}
      >
        <span style={{ width: 28, height: 1, background: "rgba(255,215,0,0.5)" }} />
        MEDICAL MARKETING SYSTEM · SINCE 2013
        <span style={{ width: 28, height: 1, background: "rgba(255,215,0,0.5)" }} />
      </div>

      <img
        src="/logo_passion.png"
        alt="열정의시간 로고"
        className="hero-anim"
        style={{
          width: 72,
          height: 72,
          marginBottom: "1.8rem",
          objectFit: "contain",
          position: "relative",
          zIndex: 1,
          animationDelay: "0.07s",
          filter: "drop-shadow(0 0 24px rgba(204,0,0,0.45))",
        }}
      />

      <h1
        className="hero-anim"
        style={{
          fontSize: "clamp(2.4rem, 7vw, 6rem)",
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          marginBottom: "2rem",
          position: "relative",
          zIndex: 1,
          animationDelay: "0.13s",
        }}
      >
        병원 마케팅,
        <br />
        <span style={{ background: "#cc0000", color: "#ffffff", padding: "0.05em 0.25em" }}>
          광고비
        </span>
        만 쓰고
        <br />
        끝난 적 있으신가요?
      </h1>

      <p
        className="hero-anim"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "rgba(255,255,255,0.78)",
          maxWidth: 620,
          lineHeight: 1.7,
          fontWeight: 300,
          position: "relative",
          zIndex: 1,
          animationDelay: "0.2s",
        }}
      >
        10년 이상의 노하우. 단순한 유입량이 아닌,
        <br />
        병원의 실질적 매출을 만드는
        <br className="sm:hidden" /> &lsquo;수익 구조&rsquo; 자체를 설계합니다.
      </p>

      <p
        className="hero-anim"
        style={{
          fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
          color: "rgba(255,255,255,0.45)",
          maxWidth: 620,
          lineHeight: 1.7,
          fontWeight: 300,
          marginTop: "1.1rem",
          position: "relative",
          zIndex: 1,
          animationDelay: "0.26s",
        }}
      >
        국내 · 일본 · 중국 · 대만을 한 곳에서 운영하는
        <br />
        병원 마케팅 통합 전문기업입니다.
      </p>

      {/* CTAs */}
      <div
        className="hero-anim"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "center",
          marginTop: "2.6rem",
          position: "relative",
          zIndex: 1,
          animationDelay: "0.34s",
        }}
      >
        <Link href="/time/quote" className="btn-primary">
          무료 전략 상담 받기
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
        <a
          href="https://docs.google.com/presentation/d/17fAOTFOwVV91fOpLUcWycyWzV6GFCpvfjwQGYgNYiZY/edit?slide=id.p#slide=id.p"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          회사소개서 보기
        </a>
      </div>

      {/* Trust strip */}
      <div
        className="hero-anim"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0",
          marginTop: "3rem",
          position: "relative",
          zIndex: 1,
          animationDelay: "0.42s",
        }}
      >
        {TRUST.map((t, i) => (
          <div
            key={t.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 clamp(0.8rem, 3vw, 1.6rem)",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}
          >
            <span
              className="font-mono-sys"
              style={{ fontSize: "clamp(1rem, 2.4vw, 1.35rem)", fontWeight: 900, color: "#fff" }}
            >
              {t.value}
            </span>
            <span style={{ fontSize: "clamp(0.72rem, 1.6vw, 0.85rem)", color: "rgba(255,255,255,0.5)" }}>
              {t.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-anim scroll-indicator"
        style={{
          marginTop: "3.4rem",
          position: "relative",
          zIndex: 1,
          animationDelay: "0.6s",
        }}
      >
        SCROLL
        <svg width="14" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
