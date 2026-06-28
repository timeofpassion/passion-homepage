// EXP-005 — GEO '통계·수치 슬롯'. AI가 인용하기 쉬운 크롤 가능한 사실(fact) 블록.
// 모든 값은 검증된 사실만 사용(등록번호=대표 제공, 협력 의료기관=인트라넷 Client DB 집계).
const FACTS: { k: string; v: string; strong?: boolean }[] = [
  { k: "외국인환자 유치업 등록", v: "A-2025-01-02-06178호", strong: true },
  { k: "법인 설립", v: "2023년 · 대표 병원 마케팅 운영 경력 10년 이상" },
  { k: "운영 마케팅 시장", v: "국내 · 일본 · 중국 · 대만 (4개국)" },
  { k: "협력 의료기관", v: "누적 19곳 (계약 종료 포함)" },
  { k: "채널 · 계정 소유권", v: "100% 클리닉(병원) 귀속" },
];

export default function CompanyFacts() {
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "3rem 0" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 6%" }}>
        <div
          className="font-mono-sys"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            fontSize: 12,
            letterSpacing: "0.22em",
            color: "#FFD700",
            marginBottom: "2rem",
          }}
        >
          <span style={{ width: 28, height: 1, background: "rgba(255,215,0,0.5)" }} />
          OFFICIAL RECORD · 공식 정보
          <span style={{ width: 28, height: 1, background: "rgba(255,215,0,0.5)" }} />
        </div>

        <dl
          className="glass-card"
          style={{ position: "relative", overflow: "hidden", padding: "0.5rem 0" }}
        >
          <div className="tech-border" style={{ position: "absolute", inset: 0 }} />
          {FACTS.map((f, i) => (
            <div
              key={f.k}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem 1rem",
                alignItems: "baseline",
                padding: "0.95rem 1.6rem",
                borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                position: "relative",
                zIndex: 10,
              }}
            >
              <dt
                style={{
                  flex: "0 0 auto",
                  minWidth: 150,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {f.k}
              </dt>
              <dd
                className={f.strong ? "font-mono-sys" : undefined}
                style={{
                  flex: "1 1 200px",
                  margin: 0,
                  fontSize: f.strong ? "1.02rem" : "0.98rem",
                  fontWeight: f.strong ? 800 : 600,
                  color: f.strong ? "#ff5a5a" : "#fff",
                  letterSpacing: f.strong ? "0.01em" : undefined,
                }}
              >
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
