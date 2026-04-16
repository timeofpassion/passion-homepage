const consultItems = [
  { diagId: "DIAGNOSTIC.01", num: "01", title: "현재 마케팅에서", sub: "비용이 새고 있는 구멍" },
  { diagId: "PRIORITY.02", num: "02", title: "병원 규모·지역·진료과목에 맞는", sub: "채널 우선순위" },
  { diagId: "GLOBAL_ROUTE.03", num: "03", title: "해외 진출 시 가장 빠른 루트", sub: "(일본 / 중국 / 대만 중 선택)" },
  { diagId: "FORECAST.04", num: "04", title: "월 예산별", sub: "현실적인 성과 예측" },
];

export default function CTASection() {
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "8rem 0", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%", width: "100%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            className="font-mono-sys"
            style={{ fontSize: 12, letterSpacing: "0.2em", color: "#cc0000", marginBottom: 20, textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}
          >
            <span style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(204,0,0,0.7))" }} />
            SYSTEM_ANALYSIS // START
            <span style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(204,0,0,0.7))" }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900 }}>
            지금 어떤 단계에 계신가요?
          </h2>
        </div>

        {/* Escalating lines */}
        <div style={{ maxWidth: 700, margin: "0 auto 4rem", textAlign: "center", display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
            마케팅을 처음 시작하려는 원장님도,
          </p>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
            기존 업체에 실망하고 교체를 고민 중인 원장님도,
          </p>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "#fff", fontWeight: 300 }}>
            해외환자 유치를 처음 시도해보려는 원장님도.
          </p>
        </div>

        {/* Center badge */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "inline-block", position: "relative", padding: "20px 32px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(204,0,0,0.2)", boxShadow: "0 0 30px rgba(204,0,0,0.1)" }}>
            {/* Corner accents */}
            <div style={{ position: "absolute", top: -1, left: -1, width: 14, height: 14, borderTop: "2px solid #cc0000", borderLeft: "2px solid #cc0000" }} />
            <div style={{ position: "absolute", top: -1, right: -1, width: 14, height: 14, borderTop: "2px solid #cc0000", borderRight: "2px solid #cc0000" }} />
            <div style={{ position: "absolute", bottom: -1, left: -1, width: 14, height: 14, borderBottom: "2px solid #cc0000", borderLeft: "2px solid #cc0000" }} />
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 14, height: 14, borderBottom: "2px solid #cc0000", borderRight: "2px solid #cc0000" }} />
            <h3 style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: 700, position: "relative", zIndex: 10 }}>
              <span className="text-glow" style={{ color: "#cc0000" }}>열정의시간</span>은 현재 상황 진단부터 시작합니다.
            </h3>
          </div>
        </div>

        {/* Consult items header */}
        <div
          className="font-mono-sys"
          style={{ textAlign: "center", marginBottom: 32, fontSize: 12, letterSpacing: "0.15em", color: "#cc0000", textTransform: "uppercase" }}
        >
          무료 전략 상담에서 확인할 수 있는 것
        </div>

        {/* 4 items grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 20, marginBottom: "5rem" }}>
          {consultItems.map((item) => (
            <div
              key={item.diagId}
              className="glass-card--cta"
              style={{ padding: "2rem", position: "relative", overflow: "hidden", minHeight: 140, display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div className="tech-border" style={{ position: "absolute", inset: 0 }} />
              {/* Big background number */}
              <div className="font-mono-sys" style={{ position: "absolute", right: -8, bottom: -16, fontSize: "7rem", fontWeight: 900, color: "rgba(255,255,255,0.015)", lineHeight: 1, pointerEvents: "none" }}>
                {item.num}
              </div>
              <div style={{ position: "relative", zIndex: 10 }}>
                <span className="font-mono-sys" style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", border: "1px solid rgba(255,255,255,0.08)", padding: "2px 8px", background: "rgba(0,0,0,0.3)", display: "inline-block", marginBottom: 10 }}>
                  {item.diagId}
                </span>
                <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", fontWeight: 500, lineHeight: 1.4 }}>
                  {item.title}
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>{item.sub}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* System message */}
        <div style={{ maxWidth: 650, margin: "0 auto 4rem", textAlign: "center" }}>
          <div className="font-mono-sys" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", marginBottom: 16, letterSpacing: "0.15em" }}>
            {"// SYSTEM.MESSAGE"}
          </div>
          <div style={{ textAlign: "left", display: "inline-block", borderLeft: "2px solid rgba(204,0,0,0.5)", paddingLeft: 24 }}>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", fontWeight: 300, marginBottom: 6 }}>
              &ldquo;상담은 부담 없습니다.
            </p>
            <p style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 700, lineHeight: 1.4 }}>
              30분 안에 지금 가장 필요한 것 하나를 짚어드립니다.&rdquo;
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 200, height: 100, background: "rgba(204,0,0,0.25)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }} />
          <a href="/quote" className="cta-main" style={{ position: "relative", textDecoration: "none", color: "#fff" }}>
            <div className="tech-border" style={{ position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(90,0,0,0.2), rgba(204,0,0,0.2))", opacity: 0, transition: "opacity 0.5s" }} />
            <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: 14 }}>
              <span className="text-glow" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", fontWeight: 900 }}>
                견적 의뢰하기
              </span>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>

          {/* KakaoTalk */}
          <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 20px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FEE500">
              <path d="M12 3c-5.523 0-10 3.538-10 7.9 0 2.85 1.848 5.347 4.636 6.74l-1.185 4.316c-.056.205.18.366.353.243l5.06-3.327c.373.048.755.074 1.146.074 5.523 0 10-3.538 10-7.9s-4.477-7.9-10-7.9z" />
            </svg>
            <span className="font-mono-sys" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
              카카오톡 채널:
            </span>
            <span className="font-mono-sys" style={{ fontSize: 13, color: "#fff", fontWeight: 500, letterSpacing: "0.1em" }}>
              @timfofpassion
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
