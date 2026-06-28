import Link from "next/link";

interface Layer {
  n: string;
  phase: string; // 영문 단계 라벨
  phaseKo: string; // 한글 단계
  title: string;
  titleSub?: string;
  tagline: string;
  problem: string;
  how: string[];
  result: string;
  badges: string[];
}

// 카피·수치는 사이트 기존 사실 범위 내에서만 사용(새 수치 창작 금지).
const layers: Layer[] = [
  {
    n: "01",
    phase: "FOUNDATION",
    phaseKo: "토대",
    title: "국내 통합 마케팅",
    tagline: "블로그 SEO · 영상 · SNS · 플레이스 · 플랫폼 · 바이럴",
    problem: "광고비는 나가는데 검색에선 안 보이고, 상담이 내원으로 이어지지 않는다.",
    how: [
      "국내마케팅·디자인·영상팀이 한 팀으로 기획·제작·운영까지 완결",
      "마케팅 PM이 병원 인하우스 역할 수행 (의료광고 심의 대행 포함)",
    ],
    result: "블로그 평균 3개월 내 네이버 1페이지 · 상담 전환율 평균 2.4배 개선",
    badges: ["전 과정 인하우스", "외주 없음"],
  },
  {
    n: "02",
    phase: "EXPANSION",
    phaseKo: "확장",
    title: "해외 마케팅",
    titleSub: "(일본 · 중국 · 대만)",
    tagline: "현지 전담팀이 직접 운영합니다. 번역 대행이 아닙니다.",
    problem: "해외는 어디서부터 시작할지 막막하고, 번역만 맡기면 현지에서 안 먹힌다.",
    how: [
      "일본·중국·대만 현지팀이 라인·샤오홍슈·더우인·왕홍까지 직접 기획·운영",
      "모든 채널·계정은 클리닉 소유로 개설 (에이전시 종속 없음)",
    ],
    result: "국내에서 쌓은 콘텐츠·리뷰가 해외 신뢰로 연결 · 해외환자 월 평균 12~18명",
    badges: ["현지 전담팀", "채널 소유권 100%"],
  },
  {
    n: "03",
    phase: "CONVERSION",
    phaseKo: "전환·정착",
    title: "해외환자 유치 풀 프로세스",
    tagline: "문의 ~ 내원 ~ 사후관리까지 전 과정 설계",
    problem: "어렵게 유입시켜도 예약·내원·사후관리에서 다 새어 나간다.",
    how: [
      "유치업 등록 기반 합법 프로세스 · 통역 · 픽업 · 상담 스크립트 · CS 매뉴얼",
      "국가별 플랫폼 리뷰 관리로 ‘반복 유입되는 채널’로 정착",
    ],
    result: "초기 세팅 완료 후 3개월 내 첫 해외 환자 내원을 목표로 설계",
    badges: ["유치업 등록 기반", "반복 유입 구조"],
  },
];

function LayerCard({ layer, isLast }: { layer: Layer; isLast: boolean }) {
  return (
    <div style={{ display: "flex", gap: 0, marginBottom: isLast ? 0 : "3.5rem" }}>
      {/* Layer number rail */}
      <div
        className="hidden sm:flex"
        style={{ flexDirection: "column", alignItems: "center", width: 86, flexShrink: 0, paddingTop: 24 }}
      >
        <div
          className="font-mono-sys"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#0a0000",
            border: "1px solid rgba(204,0,0,0.4)",
            boxShadow: "0 0 24px rgba(204,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            fontWeight: 900,
            color: "#fff",
          }}
        >
          {layer.n}
        </div>
        <div
          className="font-mono-sys"
          style={{ marginTop: 8, fontSize: 9, letterSpacing: "0.14em", color: "#FFD700", textAlign: "center" }}
        >
          {layer.phase}
        </div>
      </div>

      {/* Card */}
      <div
        className="glass-card--service ml-0 sm:ml-5"
        style={{ flex: 1, padding: "2rem 2.2rem", position: "relative", overflow: "hidden" }}
      >
        <div className="tech-border" style={{ position: "absolute", inset: 0 }} />

        {/* Background number */}
        <div
          className="font-mono-sys"
          style={{
            position: "absolute",
            bottom: -22,
            right: -8,
            fontSize: "9rem",
            fontWeight: 900,
            color: "rgba(255,255,255,0.02)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {layer.n}
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>
          {/* phase chip (모바일에서도 단계 인지) */}
          <div
            className="font-mono-sys"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 14,
            }}
          >
            <span style={{ color: "#cc0000", fontWeight: 700 }}>LAYER {layer.n}</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <span style={{ color: "#FFD700" }}>{layer.phaseKo}</span>
          </div>

          <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 800, marginBottom: 6 }}>
            {layer.title}{" "}
            {layer.titleSub && (
              <span style={{ fontSize: "0.7em", fontWeight: 300, color: "rgba(255,255,255,0.5)" }}>
                {layer.titleSub}
              </span>
            )}
          </h3>
          <p style={{ fontSize: "clamp(0.95rem, 1.7vw, 1.1rem)", color: "rgba(255,255,255,0.8)", fontWeight: 500, marginBottom: 20 }}>
            {layer.tagline}
          </p>

          {/* PROBLEM */}
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 18 }}>
            <span
              className="font-mono-sys"
              style={{
                flexShrink: 0,
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.45)",
                border: "1px solid rgba(255,255,255,0.14)",
                padding: "3px 8px",
                marginTop: 2,
              }}
            >
              문제
            </span>
            <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontWeight: 300 }}>
              {layer.problem}
            </p>
          </div>

          {/* OUR WAY */}
          <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)", padding: "1.1rem 1.3rem", marginBottom: 18 }}>
            <div
              className="font-mono-sys"
              style={{ fontSize: 10, letterSpacing: "0.12em", color: "#cc0000", marginBottom: 12 }}
            >
              우리 방식
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {layer.how.map((h, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span className="font-mono-sys" style={{ color: "#cc0000", flexShrink: 0, marginTop: 1, fontSize: "0.85rem" }}>
                    _&gt;
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.78)", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* RESULT */}
          <div
            style={{
              padding: "12px 18px",
              marginBottom: 18,
              borderLeft: "2px solid #cc0000",
              background: "linear-gradient(to right, rgba(204,0,0,0.1), transparent)",
            }}
          >
            <span className="font-mono-sys" style={{ color: "#ff5a5a", marginRight: 8, fontWeight: 700 }}>→</span>
            <span style={{ fontSize: "clamp(0.92rem, 1.6vw, 1.05rem)", fontWeight: 600, color: "#fff" }}>
              {layer.result}
            </span>
          </div>

          {/* BADGES + CTA */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {layer.badges.map((b) => (
                <span
                  key={b}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#ff8a8a",
                    background: "rgba(204,0,0,0.08)",
                    border: "1px solid rgba(204,0,0,0.3)",
                    borderRadius: 999,
                    padding: "5px 12px",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
            <Link
              href="/time/quote"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
                whiteSpace: "nowrap",
                borderBottom: "1px solid rgba(204,0,0,0.6)",
                paddingBottom: 2,
              }}
            >
              이 단계 상담받기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" style={{ position: "relative", zIndex: 20, padding: "4rem 0 8rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            className="font-mono-sys"
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "#FFD700",
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <span style={{ width: 28, height: 1, background: "rgba(255,215,0,0.5)" }} />
            WHAT WE DO
            <span style={{ width: 28, height: 1, background: "rgba(255,215,0,0.5)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 900, lineHeight: 1.25 }}>
            마케팅을 3개로 따로 파는 게 아니라,
            <br />
            <span style={{ borderBottom: "2px solid #cc0000", paddingBottom: 4 }}>하나의 흐름</span>으로 쌓습니다.
          </h2>
          <p
            style={{
              maxWidth: 600,
              margin: "1.6rem auto 0",
              fontSize: "clamp(0.95rem, 1.7vw, 1.1rem)",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            대부분의 업체는 이 중 하나만 합니다. 열정의시간은 국내에서 토대를 깔고, 그 위에 해외 마케팅을 올리고, 해외환자 유치로 전환·정착까지 한 흐름으로 연결합니다.
          </p>
        </div>

        {/* Stack flow indicator (세로 진행) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginBottom: "4rem",
          }}
        >
          {[
            { ko: "국내 마케팅", sub: "토대" },
            { ko: "해외 마케팅", sub: "확장" },
            { ko: "해외환자 유치", sub: "전환·정착" },
          ].map((s, i) => (
            <div
              key={s.ko}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 240,
                  maxWidth: "80vw",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>{s.ko}</span>
                <span className="font-mono-sys" style={{ fontSize: 10, color: "#FFD700", marginTop: 2 }}>
                  {s.sub}
                </span>
              </div>
              {i < 2 && (
                <span
                  className="font-mono-sys"
                  style={{ color: "#cc0000", fontSize: "1.3rem", fontWeight: 900, lineHeight: 1 }}
                >
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Layers */}
        <div style={{ position: "relative" }}>
          <div
            className="timeline-line hidden sm:block"
            style={{ position: "absolute", left: 42, top: 30, bottom: 30, width: 1 }}
          />
          {layers.map((layer, idx) => (
            <LayerCard key={layer.n} layer={layer} isLast={idx === layers.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
