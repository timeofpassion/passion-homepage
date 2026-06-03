import { clientLogos } from "@/data/clients";

export default function ClientsSection() {
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "6rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: 16, lineHeight: 1.4 }}>
            열정의 시간을 오랫동안 믿고 맡겨주신 우리 소중한 클라이언트
          </h2>
          <p style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: "#FFD700", fontWeight: 600 }}>
            &lt;열정의시간은 클라이언트의 &lsquo;진짜&rsquo; 직원처럼 결과와 매출을 먼저 걱정합니다&gt;
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4" style={{ maxWidth: 1000, margin: "0 auto" }}>
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="p-2 md:p-4"
              style={{
                background: "#ffffff",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 80,
              }}
            >
              <img
                src={client.logo}
                alt={client.name}
                style={{
                  maxHeight: 55,
                  maxWidth: "90%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
