const teams = [
  { id: "SYS.01", title: "국내마케팅팀", desc: "블로그 SEO · 플레이스 · 광고 · 플랫폼 운영" },
  { id: "SYS.02", title: "디자인팀", desc: "카드뉴스 · SNS 이미지 · 배너 · 브랜딩" },
  { id: "SYS.03", title: "영상팀", desc: "풀영상 · 숏츠 · 유튜브 · 틱톡 콘텐츠" },
  { id: "SYS.04 / JP", title: "일본팀", desc: "라인 · 인스타 · 틱톡 현지 운영" },
  { id: "SYS.05 / CN", title: "중국팀", desc: "샤오홍슈 · 웨이보 · 더우인 · 왕홍 KOL" },
  { id: "SYS.06 / TW", title: "대만팀", desc: "현지 파트너 네트워크 기반 마케팅" },
];

export default function ArchitectureSection() {
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "10rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div
            className="font-mono-sys"
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "#cc0000",
              marginBottom: 20,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <span style={{ width: 32, height: 1, background: "rgba(204,0,0,0.5)" }} />
            왜 열정의시간인가요?
            <span style={{ width: 32, height: 1, background: "rgba(204,0,0,0.5)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: 40 }}>
            한 곳에서 국내부터
            <br />
            <span style={{ borderBottom: "2px solid #cc0000", paddingBottom: 4 }}>
              일본·중국·대만까지
            </span>{" "}
            됩니다.
          </h2>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: "rgba(255,255,255,0.75)", fontWeight: 300, lineHeight: 1.7, marginBottom: 16 }}>
              대부분의 마케팅 업체는 한 가지를 잘합니다.
            </p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>
              국내 콘텐츠 잘하는 곳, 일본 마케팅 한다는 곳, 영상 제작하는 곳.
            </p>
            <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: "rgba(255,255,255,0.75)", fontWeight: 300, lineHeight: 1.7 }}>
              그래서 원장님들은 업체를 3~4개 쓰고,
              <br />
              커뮤니케이션 비용과 조율 비용이 마케팅 비용만큼 나갑니다.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", margin: "4rem 0", opacity: 0.9 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(204,0,0,0.4), transparent)" }} />
          <div
            style={{
              padding: "12px 28px",
              background: "#0a0000",
              border: "1px solid rgba(204,0,0,0.3)",
              fontWeight: 700,
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              boxShadow: "0 0 30px rgba(204,0,0,0.15)",
              whiteSpace: "nowrap",
            }}
          >
            열정의시간은 다릅니다
          </div>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(204,0,0,0.4), transparent)" }} />
        </div>

        {/* Team grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginTop: "3rem",
          }}
        >
          {teams.map((team) => (
            <div key={team.id} className="glass-card" style={{ padding: "2rem", position: "relative" }}>
              <div className="tech-border" style={{ position: "absolute", inset: 0 }} />
              <span
                className="font-mono-sys"
                style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", display: "block", marginBottom: 20 }}
              >
                {team.id}
              </span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 12 }}>{team.title}</h3>
              <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)", marginBottom: 12 }} />
              <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.6, fontSize: "0.9rem" }}>
                {team.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div style={{ textAlign: "center", marginTop: "6rem" }}>
          <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "rgba(255,255,255,0.85)", fontWeight: 500, marginBottom: 12 }}>
            하나의 계약으로 6개 팀이 동시에 움직입니다.
          </p>
          <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.7, marginBottom: "4rem" }}>
            국내 콘텐츠가 해외용으로 현지화되고,
            <br />
            국내에서 쌓은 리뷰가 해외 환자 신뢰로 연결됩니다.
          </p>

          {/* Quote */}
          <div style={{ position: "relative", display: "inline-block", padding: "2.5rem 3rem" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 28, height: 28, borderTop: "2px solid rgba(204,0,0,0.6)", borderLeft: "2px solid rgba(204,0,0,0.6)" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderBottom: "2px solid rgba(204,0,0,0.6)", borderRight: "2px solid rgba(204,0,0,0.6)" }} />
            <blockquote className="text-glow" style={{ fontSize: "clamp(1.3rem, 3vw, 2.2rem)", fontWeight: 900, lineHeight: 1.3 }}>
              &ldquo;국내 마케팅이 깔리고,
              <br />
              해외 마케팅이 올라탑니다.&rdquo;
            </blockquote>
          </div>

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", fontWeight: 300 }}>
              이 구조를 갖춘 마케팅 에이전시,{" "}
              <span style={{ fontWeight: 700, color: "#fff", borderBottom: "1px solid #cc0000", paddingBottom: 2 }}>
                국내에서 흔하지 않습니다.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
