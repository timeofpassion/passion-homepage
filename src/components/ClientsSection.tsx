const clients = [
  [
    { name: "MELLOW", logo: "/clients/logo_mellow.png" },
    { name: "오야로피부과", logo: "/clients/logo_oaro.png" },
    { name: "오체안피부과", logo: "/clients/logo_ozhean.png" },
    { name: "순수안 피부과", logo: "/clients/logo_soosoan.png" },
  ],
  [
    { name: "별성형외과의원", logo: "/clients/logo_star.png" },
    { name: "타임리턴의원", logo: "/clients/logo_timereturn.png" },
    { name: "Beautique Clinic", logo: "/clients/logo_lefilleo.png" },
    { name: "OLARA CLINIC", logo: "/clients/logo_olara.png" },
  ],
  [
    { name: "Genabelle", logo: "/clients/logo_henabelle.png" },
    { name: "오늘우리학교는", logo: "/clients/logo_school.png" },
    { name: "르웰의원", logo: "/clients/logo_lewell.png" },
    { name: "신통정형외과", logo: "/clients/logo_sintong.png" },
  ],
  [
    { name: "이현한방병원", logo: "/clients/logo_ehyun.png" },
    { name: "군포시", logo: "/clients/logo_gunpo.png" },
    { name: "한세대학교", logo: "/clients/logo_hansei.png" },
    { name: "캡틴 법률사무소", logo: "/clients/logo_captain.png" },
  ],
  [
    { name: "RE&WELL", logo: "/clients/logo_rewell.png" },
    { name: "메디힘", logo: "/clients/logo_medihim.png" },
    { name: "Babitalk", logo: "/clients/logo_babitalk.png" },
    { name: "SMPS", logo: "/clients/logo_smps.png" },
  ],
];

export default function ClientsSection() {
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "6rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: 16, lineHeight: 1.4 }}>
            열정의 시간을 오랫동안 믿고 맡겨주신 우리 소중한 클라이언트
          </h2>
          <p style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: "#cc0000", fontWeight: 500 }}>
            &lt;열정의시간은 클라이언트의 &lsquo;진짜&rsquo; 직원처럼 결과와 매출을 먼저 걱정합니다&gt;
          </p>
        </div>

        {/* Logo grid */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
          {clients.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                borderBottom: i < clients.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              {row.map((client) => (
                <div
                  key={client.name}
                  style={{
                    padding: "1.2rem 0.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={{
                      maxHeight: 40,
                      maxWidth: "80%",
                      objectFit: "contain",
                      opacity: 0.7,
                      filter: "brightness(1.5)",
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
