const clients = [
  ["MELLOW", "오야로피부과", "오체안피부과", "순수안 피부과"],
  ["별성형외과의원", "타임리턴의원", "Beautique Clinic", "OLARA CLINIC"],
  ["Genabelle", "오늘우리학교는", "르웰의원", "신통정형외과"],
  ["이현한방병원", "군포시", "한세대학교", "캡틴 법률사무소"],
  ["RE&WELL", "메디힘", "Babitalk", "SMPS"],
];

export default function ClientsSection() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 20,
        padding: "6rem 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 800,
              marginBottom: 16,
              lineHeight: 1.4,
            }}
          >
            열정의 시간을 오랫동안 믿고 맡겨주신 우리 소중한 클라이언트
          </h2>
          <p
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              color: "#cc0000",
              fontWeight: 500,
            }}
          >
            &lt;열정의시간은 클라이언트의 &lsquo;진짜&rsquo; 직원처럼 결과와
            매출을 먼저 걱정합니다&gt;
          </p>
        </div>

        {/* Logo grid */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "2.5rem 2rem",
          }}
        >
          {clients.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
                borderBottom:
                  i < clients.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
              }}
            >
              {row.map((name) => (
                <div
                  key={name}
                  style={{
                    padding: "1.5rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    borderRight: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
