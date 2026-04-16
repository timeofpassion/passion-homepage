const teams = [
  { name: "국내\n마케팅팀", members: ["이선주", "김주연", "윤선영", "손효정"] },
  { name: "디자인팀", members: ["이장인", "열윤인"] },
  { name: "영상팀", members: ["장장목"] },
  { name: "중국/중화권\n마케팅팀", members: ["입가비", "초가미", "항명기"] },
  { name: "일본\n마케팅팀", members: [] },
];

export default function OrgChart() {
  return (
    <div style={{ maxWidth: 1000, margin: "3rem auto 0", padding: "0 4%" }}>
      {/* Top: 열정의시간 */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 0 }}>
        <div
          style={{
            background: "#8b1a1a",
            color: "#fff",
            padding: "14px 32px",
            fontWeight: 800,
            fontSize: "1.1rem",
            textAlign: "center",
            borderRadius: 6,
            lineHeight: 1.4,
          }}
        >
          열정의시간
          <div style={{ fontSize: "0.75rem", fontWeight: 400, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
            (경영총괄)
          </div>
        </div>
      </div>

      {/* Vertical line from top */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 2, height: 24, background: "rgba(255,255,255,0.2)" }} />
      </div>

      {/* Horizontal line connecting all teams */}
      <div style={{ display: "flex", justifyContent: "center", padding: "0 8%" }}>
        <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.2)" }} />
      </div>

      {/* Teams */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          marginTop: 0,
        }}
      >
        {teams.map((team) => (
          <div key={team.name} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Vertical line to team */}
            <div style={{ width: 2, height: 20, background: "rgba(255,255,255,0.2)" }} />

            {/* Team name */}
            <div
              style={{
                background: "#8b1a1a",
                color: "#fff",
                padding: "10px 8px",
                fontWeight: 700,
                fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
                textAlign: "center",
                borderRadius: 4,
                width: "100%",
                whiteSpace: "pre-line",
                lineHeight: 1.4,
                minHeight: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {team.name}
            </div>

            {/* Members */}
            {team.members.length > 0 && (
              <div style={{ width: "100%", marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
                {team.members.map((member) => (
                  <div
                    key={member}
                    style={{
                      background: "rgba(0,0,0,0.6)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.8)",
                      padding: "8px 6px",
                      fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
                      textAlign: "center",
                      borderRadius: 3,
                    }}
                  >
                    {member}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
