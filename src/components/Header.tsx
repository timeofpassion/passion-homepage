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
    </header>
  );
}
