import { clientLogos } from "@/data/clients";

// 로고·디자인은 공용(단일 소스). 제목·부제만 페이지별로 분기(기본값=열정의시간).
export default function ClientsSection({
  title = "열정의 시간을 오랫동안 믿고 맡겨주신 우리 소중한 클라이언트",
  subtitle = "열정의시간은 클라이언트의 ‘진짜’ 직원처럼 결과와 매출을 먼저 걱정합니다",
  medicalOnly = false,
  showBrackets = true,
}: {
  title?: string;
  subtitle?: string;
  medicalOnly?: boolean;
  showBrackets?: boolean;
} = {}) {
  // 열정의시간(/time)은 병원·의료만, 열정의사람들(/people)은 전체 노출
  const logos = medicalOnly ? clientLogos.filter((c) => c.medical) : clientLogos;
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "6rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: 16, lineHeight: 1.4, whiteSpace: "pre-line", wordBreak: "keep-all" }}>
            {title}
          </h2>
          <p style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: "#FFD700", fontWeight: 600, whiteSpace: "pre-line", wordBreak: "keep-all" }}>
            {showBrackets ? `<${subtitle}>` : subtitle}
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4" style={{ maxWidth: 1000, margin: "0 auto" }}>
          {logos.map((client) => (
            <div
              key={client.name}
              className="p-2 md:p-4 group"
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
                className="grayscale opacity-100 transition duration-300 group-hover:grayscale-0"
                style={{
                  maxHeight: 48,
                  maxWidth: "82%",
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
