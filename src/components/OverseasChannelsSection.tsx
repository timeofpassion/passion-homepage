const channels = [
  {
    sysId: "CN_채널",
    country: "중국",
    desc: "후기 기반 검색 1위 플랫폼을 직접 운영합니다.",
    platforms: ["샤오홍슈", "바이두", "더우인", "위챗"],
  },
  {
    sysId: "JP_채널",
    country: "일본",
    desc: "메신저·SNS 중심으로 정밀 타겟팅합니다.",
    platforms: ["LINE", "인스타그램", "X"],
  },
  {
    sysId: "TW_채널",
    country: "대만",
    desc: "영상·비주얼 콘텐츠로 신뢰를 쌓습니다.",
    platforms: ["유튜브", "인스타그램"],
  },
  {
    sysId: "KR_채널",
    country: "국내",
    desc: "검색 자산화와 플레이스 전환을 설계합니다.",
    platforms: ["네이버", "인스타그램", "유튜브"],
  },
];

export default function OverseasChannelsSection() {
  return (
    <section id="channels" style={{ position: "relative", zIndex: 20, padding: "6rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            className="font-mono-sys"
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "#FFD700",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <span style={{ width: 32, height: 1, background: "rgba(255,215,0,0.5)" }} />
            국가별 현지 채널
            <span style={{ width: 32, height: 1, background: "rgba(255,215,0,0.5)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: 16 }}>
            나라마다, 환자가 찾는 채널은 다릅니다
          </h2>
          <p style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)", color: "rgba(255,255,255,0.55)", fontWeight: 300, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            &lsquo;광고&rsquo;가 아니라 각 나라 현지 채널에서 검색되고, 신뢰받고,
            내원으로 이어지는 &lsquo;운영&rsquo;을 설계합니다.
          </p>
        </div>

        {/* Channel grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {channels.map((ch) => (
            <div
              key={ch.sysId}
              className="glass-card"
              style={{ padding: "2rem", position: "relative", height: "100%" }}
            >
              <div className="tech-border" style={{ position: "absolute", inset: 0 }} />
              <span
                className="font-mono-sys"
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 16,
                }}
              >
                {ch.sysId}
              </span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 12 }}>
                {ch.country}
              </h3>
              <div style={{ width: 40, height: 1, background: "rgba(204,0,0,0.5)", marginBottom: 14 }} />
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  fontSize: "0.9rem",
                  marginBottom: 18,
                  minHeight: 44,
                }}
              >
                {ch.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {ch.platforms.map((p) => (
                  <span
                    key={p}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                      background: "rgba(204,0,0,0.12)",
                      border: "1px solid rgba(204,0,0,0.3)",
                      padding: "5px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
