import { clientLogos } from "@/data/clients";

// 클라이언트 로고 띠(A안). 로고는 public/clients/clean 의 배경 제거·크기 통일본을 흰색 한 톤으로 흘린다.
// 로고 파일이 없는(logo 빈 값) 클라이언트는 띠에서 빠진다.
const logos = clientLogos.filter((c) => c.medical && c.logo);
const half = Math.ceil(logos.length / 2);

function Row({ items, reverse }: { items: typeof logos; reverse?: boolean }) {
  return (
    <div className="cm-marquee">
      <div className={`cm-track${reverse ? " cm-rev" : ""}`}>
        {[...items, ...items].map((c, i) => (
          <img
            key={i}
            src={c.logo}
            alt={i < items.length ? c.name : ""}
            aria-hidden={i >= items.length}
            style={{ height: 64, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "5rem 0" }}>
      <style>{`
        .cm-marquee{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
        .cm-track{display:flex;gap:2.5rem;align-items:center;width:max-content;padding-block:1.2rem;animation:cm-scroll 60s linear infinite}
        .cm-rev{animation-direction:reverse}
        .cm-marquee:hover .cm-track{animation-play-state:paused}
        @keyframes cm-scroll{to{transform:translateX(-50%)}}
        @media (prefers-reduced-motion: reduce){.cm-track{animation:none}}
      `}</style>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
        <p className="font-mono-sys" style={{ color: "#E7C46A", fontSize: 12, letterSpacing: ".2em", marginBottom: 16 }}>CLIENTS</p>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, marginBottom: "1.6rem", wordBreak: "keep-all" }}>
          병원들이 <span style={{ color: "#E63329" }}>열정의시간</span>과 함께했습니다
        </h2>
      </div>
      <Row items={logos.slice(0, half)} />
      <Row items={logos.slice(half)} reverse />
    </section>
  );
}
