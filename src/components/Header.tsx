export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "1.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 20,
        background: "linear-gradient(to bottom, rgba(10,0,0,0.6), transparent)",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.02em" }}>
        열정의시간
      </div>
      <div
        className="font-mono-sys"
        style={{
          fontSize: 9,
          textAlign: "right",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.1em",
          lineHeight: 1.6,
        }}
      >
        PASSION_V2 // SECURE
      </div>
    </header>
  );
}
