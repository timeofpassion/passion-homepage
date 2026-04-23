export default function BackgroundEffects() {
  return (
    <>
      <div className="full-bleed-bg" />
      <div className="system-grid" />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.04)" />
          <circle cx="50%" cy="50%" r="30%" fill="none" stroke="rgba(255,255,255,0.02)" />
        </svg>
      </div>
    </>
  );
}
