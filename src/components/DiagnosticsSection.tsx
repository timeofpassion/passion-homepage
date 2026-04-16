const diagnostics = [
  {
    id: "01 // EFFICIENCY",
    title: "광고비 누수",
    desc: "예산은 늘어나지만 매출은 제자리입니다. 마케팅 구조의 근본적인 결함을 진단하고 새어나가는 비용을 차단해야 합니다.",
    position: "diag-card diag-card--left",
    z: 1,
  },
  {
    id: "02 // TRANSPARENCY",
    title: "불투명한 성과",
    desc: "숫자뿐인 리포트에 속지 마십시오. 실제 환자 내원 데이터와 연동된 본질적인 성과 지표를 구축합니다.",
    position: "diag-card diag-card--right",
    z: 2,
  },
  {
    id: "03 // EXPANSION",
    title: "해외 유치 한계",
    desc: "일본, 중국, 대만 환자가 실제 내원으로 이어지는 글로벌 프로세스를 설계하여 진료 범위를 세계로 확장합니다.",
    position: "diag-card diag-card--left-2",
    z: 3,
  },
];

export default function DiagnosticsSection() {
  return (
    <section
      style={{
        padding: "12vh 6% 20vh",
        background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
        position: "relative",
      }}
    >
      <div style={{ marginBottom: "4rem" }} />

      <div className="diag-grid">
        {diagnostics.map((item) => (
          <div
            key={item.id}
            className={item.position}
            style={{ zIndex: item.z }}
          >
            <span
              className="font-mono-sys"
              style={{ fontSize: 11, color: "#cc0000", marginBottom: 12, display: "block" }}
            >
              {item.id}
            </span>
            <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, marginBottom: 16 }}>
              {item.title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 300, lineHeight: 1.7, fontSize: "0.95rem" }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
