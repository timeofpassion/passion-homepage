const teams = [
  { id: "01", name: "국내 마케팅팀", role: "블로그 SEO · SNS · 플레이스 · 플랫폼" },
  { id: "02", name: "디자인팀", role: "카드뉴스 · 배너 · 브랜딩 · 상세페이지" },
  { id: "03", name: "영상팀", role: "숏폼 · 유튜브 · 촬영 · 편집" },
  { id: "04", name: "중화권 마케팅팀", role: "샤오홍슈 · 더우인 · 왕홍 KOL" },
  { id: "05", name: "일본 마케팅팀", role: "라인 · 인스타 · 현지 콘텐츠" },
];

function InHouseTag() {
  return (
    <span
      className="font-mono-sys"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 10,
        letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.55)",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#cc0000",
          boxShadow: "0 0 8px rgba(204,0,0,0.8)",
        }}
      />
      IN-HOUSE
    </span>
  );
}

export default function OrgChart() {
  return (
    <div style={{ maxWidth: 1000, margin: "2.5rem auto 0", padding: "0 4%" }}>
      {/* 핵심 메시지: 외주 0% */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.8rem",
          marginBottom: "3rem",
        }}
      >
        {[
          { big: "0%", small: "외주 비중" },
          { big: "100%", small: "내부 완결" },
          { big: "6", small: "한 지붕 아래 팀" },
        ].map((s) => (
          <div
            key={s.small}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              padding: "10px 22px",
              background: "rgba(204,0,0,0.06)",
              border: "1px solid rgba(204,0,0,0.25)",
            }}
          >
            <span
              className="font-mono-sys"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#ff3b3b" }}
            >
              {s.big}
            </span>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{s.small}</span>
          </div>
        ))}
      </div>

      {/* 중심 허브 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #b01515, #6e0d0d)",
            color: "#fff",
            padding: "18px 40px",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 0 40px rgba(204,0,0,0.3)",
          }}
        >
          <div style={{ fontWeight: 900, fontSize: "1.25rem", letterSpacing: "-0.01em" }}>열정의시간</div>
          <div style={{ fontSize: "0.78rem", fontWeight: 400, color: "rgba(255,255,255,0.8)", marginTop: 3 }}>
            경영총괄 · 전 과정 직접 운영
          </div>
        </div>
      </div>

      {/* 커넥터 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 2, height: 32, background: "linear-gradient(to bottom, rgba(204,0,0,0.6), rgba(255,255,255,0.12))" }} />
      </div>

      {/* 팀 카드 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
          gap: 14,
        }}
      >
        {teams.map((team) => (
          <div
            key={team.id}
            className="glass-card"
            style={{ position: "relative", padding: "1.4rem 1.3rem", overflow: "hidden" }}
          >
            <div className="tech-border" style={{ position: "absolute", inset: 0 }} />
            <div
              className="font-mono-sys"
              style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", marginBottom: 10 }}
            >
              TEAM.{team.id}
            </div>
            <div style={{ fontWeight: 800, fontSize: "1.02rem", marginBottom: 8, lineHeight: 1.3 }}>
              {team.name}
            </div>
            <div
              style={{
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
                fontWeight: 300,
                marginBottom: 14,
                minHeight: 40,
              }}
            >
              {team.role}
            </div>
            <InHouseTag />
          </div>
        ))}
      </div>

      {/* 하단 강조 메시지 */}
      <div
        style={{
          marginTop: "2.6rem",
          textAlign: "center",
          padding: "1.2rem 1.5rem",
          background: "rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderLeft: "2px solid #cc0000",
        }}
      >
        <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", fontWeight: 500, lineHeight: 1.6 }}>
          기획 · 콘텐츠 · 디자인 · 영상 · 현지화까지{" "}
          <span style={{ color: "#ff5a5a", fontWeight: 700 }}>한 단계도 외주로 넘기지 않습니다.</span>
        </p>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", marginTop: 8, fontWeight: 300 }}>
          모든 실행이 내부에 있어, 조율 비용 없이 같은 속도로 움직입니다.
        </p>
      </div>
    </div>
  );
}
