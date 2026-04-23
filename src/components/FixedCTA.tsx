export default function FixedCTA() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
      }}
    >
      <button className="cta-float font-mono-sys">
        무료 전략 상담 신청하기
      </button>
    </div>
  );
}
