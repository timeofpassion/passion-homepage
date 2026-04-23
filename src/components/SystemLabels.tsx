export default function SystemLabels() {
  return (
    <>
      <div
        className="font-mono-sys"
        style={{
          position: "fixed",
          top: 24,
          left: 24,
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.25)",
          lineHeight: 1.8,
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        PROTOCOL: PASSION_V2
        <br />
        STATUS: ACTIVE
      </div>
      <div
        className="font-mono-sys"
        style={{
          position: "fixed",
          top: 24,
          right: 24,
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.25)",
          lineHeight: 1.8,
          zIndex: 50,
          pointerEvents: "none",
          textAlign: "right",
        }}
      >
        37.5665° N, 126.9780° E
        <br />
        RENDER_MODE: FULL_BLEED
      </div>
      <div
        className="font-mono-sys"
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "#cc0000",
          zIndex: 50,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#cc0000",
            animation: "pulse 2s infinite",
          }}
        />
        SECURE_CONNECTION
      </div>
    </>
  );
}
