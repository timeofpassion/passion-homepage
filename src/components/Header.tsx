export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "2rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 20,
      }}
    >
      <div style={{ fontWeight: 800, fontSize: "1.15rem" }}>열정의시간</div>
      <div
        className="font-mono-sys"
        style={{
          fontSize: 10,
          textAlign: "right",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.1em",
          lineHeight: 1.8,
        }}
      >
        DATA_STREAM: SECURE
        <br />
        VOL: MAX_CAPACITY
      </div>
    </header>
  );
}
