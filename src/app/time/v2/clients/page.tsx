import type { Metadata } from "next";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import { clientLogos } from "@/data/clients";

// 클라이언트 표현 시안 3종 비교(대표 확인용). 검색 노출 금지.
export const metadata: Metadata = { title: "클라이언트 표현 시안", robots: { index: false, follow: false } };

const RED = "#E63329";
const logos = clientLogos.filter((c) => c.medical);
const withLogo = logos.filter((c) => c.logo);
const half = Math.ceil(withLogo.length / 2);

// 로고는 clean/ 에서 배경 제거·480x200 공통 캔버스로 크기를 맞춰뒀다 → 흰색 한 톤으로만 칠한다.
const monoLogo = { filter: "brightness(0) invert(1)" } as const;

// C안 대표 3곳 — 권역은 인트라넷 Client DB 기준
const FEATURED = [
  { name: "오벨피부과", logo: "/clients/clean/logo_auvel.png", tags: ["국내", "대만", "영미권"], line: "블로그·영상·광고부터 대만·영어권 채널까지" },
  { name: "멜로우피부과", logo: "/clients/clean/logo_mellow.png", tags: ["국내", "중국", "일본"], line: "지점별 홈페이지·블로그·플레이스 통합 운영" },
  { name: "올라라의원", logo: "/clients/clean/logo_olara.png", tags: ["국내", "대만"], line: "시술 랜딩페이지와 META 광고, 대만 채널" },
];

function Title({ tag, name, desc }: { tag: string; name: string; desc: string }) {
  return (
    <div style={{ marginBottom: "2.2rem" }}>
      <span style={{ display: "inline-block", background: RED, color: "#fff", fontWeight: 900, fontSize: 13, padding: "4px 10px", marginBottom: 12 }}>{tag}</span>
      <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, marginBottom: 6 }}>{name}</h2>
      <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".92rem", wordBreak: "keep-all" }}>{desc}</p>
    </div>
  );
}

function Row({ items, reverse }: { items: typeof withLogo; reverse?: boolean }) {
  return (
    <div className="cl-marquee">
      <div className={`cl-track${reverse ? " cl-rev" : ""}`}>
        {[...items, ...items].map((c, i) => (
          <img key={i} src={c.logo} alt={i < items.length ? c.name : ""} aria-hidden={i >= items.length} style={{ ...monoLogo, height: 64, width: "auto", opacity: 0.8 }} />
        ))}
      </div>
    </div>
  );
}

export default function ClientsDrafts() {
  const wrap = { maxWidth: 1180, margin: "0 auto", padding: "0 6%" } as const;
  const block = { position: "relative", zIndex: 20, padding: "6rem 0", borderTop: "1px solid rgba(255,255,255,.08)" } as const;
  return (
    <>
      <style>{`
        .cl-marquee{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
        .cl-track{display:flex;gap:2.5rem;align-items:center;width:max-content;padding-block:1.4rem;animation:cl-scroll 60s linear infinite}
        .cl-rev{animation-direction:reverse}
        .cl-marquee:hover .cl-track{animation-play-state:paused}
        @keyframes cl-scroll{to{transform:translateX(-50%)}}
        .cl-cell{transition:background .25s}
        .cl-cell img{transition:opacity .25s}
        .cl-cell:hover{background:rgba(230,51,41,.08)}
        .cl-cell:hover img{opacity:1!important}
        @media (prefers-reduced-motion: reduce){.cl-track{animation:none}}
      `}</style>
      <BackgroundEffects />
      <main className="relative z-10">
        <Header />
        <div style={{ ...wrap, paddingTop: "8rem", paddingBottom: "2rem", position: "relative", zIndex: 20 }}>
          <p className="font-mono-sys" style={{ color: "#E7C46A", fontSize: 12, letterSpacing: ".2em", marginBottom: 12 }}>CLIENTS · 시안 3종</p>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900 }}>클라이언트 보여주는 방법, 셋 중 하나를 고르세요</h1>
        </div>

        {/* A. 흐르는 로고 띠 */}
        <section style={block}>
          <div style={wrap}>
            <Title tag="A안" name="흐르는 로고 띠" desc="흰 박스를 없애고 로고를 흰색 한 톤으로 통일해 두 줄로 천천히 흘립니다. 가장 적은 자리로 ‘많은 병원이 함께한다’를 보여줍니다." />
            <h3 style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)", fontWeight: 800, marginBottom: "1.4rem" }}>
              병원들이 <span style={{ color: RED }}>열정의시간</span>과 함께했습니다
            </h3>
          </div>
          <Row items={withLogo.slice(0, half)} />
          <Row items={withLogo.slice(half)} reverse />
        </section>

        {/* B. 선으로 나눈 로고 벽 */}
        <section style={block}>
          <div style={wrap}>
            <Title tag="B안" name="선으로 나눈 로고 벽" desc="박스 대신 가는 선으로 칸만 나눕니다. 평소엔 흐리게, 마우스를 올리면 밝아집니다. 명품 브랜드 사이트에서 많이 쓰는 방식입니다." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", borderTop: "1px solid rgba(255,255,255,.1)", borderLeft: "1px solid rgba(255,255,255,.1)" }}>
              {logos.map((c) => (
                <div key={c.name} className="cl-cell" style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid rgba(255,255,255,.1)", borderBottom: "1px solid rgba(255,255,255,.1)", padding: "0 1.2rem" }}>
                  {c.logo ? (
                    <img src={c.logo} alt={c.name} style={{ ...monoLogo, width: "100%", height: "auto", maxHeight: 96, objectFit: "contain", opacity: 0.6 }} />
                  ) : (
                    <span style={{ fontWeight: 800, fontSize: ".95rem", color: "rgba(255,255,255,.7)" }}>{c.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* C. 대표 3곳 크게 + 나머지 띠 */}
        <section style={block}>
          <div style={wrap}>
            <Title tag="C안" name="대표 3곳은 크게, 나머지는 띠로" desc="오래 함께한 병원 3곳을 카드로 크게 세우고 맡은 시장을 태그로 붙입니다. 로고 나열이 아니라 ‘이런 병원이 이렇게 맡긴다’가 보입니다." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
              {FEATURED.map((f) => (
                <article key={f.name} style={{ border: "1px solid rgba(255,255,255,.12)", background: "linear-gradient(160deg, rgba(230,51,41,.12), rgba(10,10,10,.9) 55%)", padding: "2rem 1.6rem", minHeight: 250, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <img src={f.logo} alt={f.name} style={{ ...monoLogo, height: 80, width: "auto", alignSelf: "flex-start", marginLeft: -24 }} />
                  <div>
                    <p style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.5, margin: "1.6rem 0 1rem", wordBreak: "keep-all" }}>{f.line}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {f.tags.map((t) => (
                        <span key={t} style={{ fontSize: 12, fontWeight: 700, padding: "3px 9px", border: "1px solid rgba(255,255,255,.25)", color: "rgba(255,255,255,.85)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <Row items={withLogo.filter((c) => !FEATURED.some((f) => f.logo === c.logo))} />
        </section>
      </main>
    </>
  );
}
