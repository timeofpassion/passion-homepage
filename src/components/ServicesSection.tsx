interface ServiceItem {
  text: string;
  result?: string;
  label?: string;
  sub?: string;
  highlight?: string;
}

interface Service {
  num: string;
  moduleId: string;
  title: string;
  titleSub?: string;
  subtitle: string;
  desc: string;
  items: ServiceItem[];
  quote: string;
}

const services: Service[] = [
  {
    num: "01",
    moduleId: "MODULE.01 // DOMESTIC_SYS",
    title: "국내 통합 마케팅",
    subtitle: "블로그 SEO · 영상 · SNS · 플레이스 · 플랫폼 · 바이럴 원스톱",
    desc: "국내마케팅팀 + 디자인팀 + 영상팀이 함께 움직입니다. 외주를 돌리지 않습니다. 내부에서 기획·제작·운영까지 완결합니다.",
    items: [
      { text: "블로그 SEO 포스팅 월 8건", result: "평균 3개월 내 네이버 1페이지 진입" },
      { text: "숏츠 영상 월 8편 제작", result: "채널 팔로워 평균 +31% 상승" },
      { text: "강남언니·바비톡·여신티켓 플랫폼 대행", result: "상담 전환율 평균 2.4배 개선" },
      { text: "마케팅 PM이 병원 인하우스 역할 수행", sub: "(의료광고 심의 대행 포함)" },
    ],
    quote: "\u201c콘텐츠를 올리는 게 아니라, 예약이 들어오는 구조를 만듭니다.\u201d",
  },
  {
    num: "02",
    moduleId: "MODULE.02 // GLOBAL_NET",
    title: "해외 마케팅",
    titleSub: "(일본 · 중국 · 대만)",
    subtitle: "현지 전담팀이 직접 운영합니다. 번역 대행이 아닙니다.",
    desc: "일본팀·중국팀·대만팀이 각국 언어와 문화에 맞게 처음부터 현지 콘텐츠를 기획하고 운영합니다.",
    items: [
      { label: "일본팀:", text: "라인·인스타·틱톡 기반 현지화 콘텐츠 운영" },
      { label: "중국팀:", text: "샤오홍슈·웨이보·더우인 + 왕홍 KOL 직접 섭외·운영" },
      { label: "대만팀:", text: "현지 파트너 네트워크 활용, 빠른 시장 진입" },
      { text: "모든 채널·계정은 클리닉 소유로 개설", sub: "(에이전시 종속 없음)" },
      { text: "계약 클라이언트 기준 해외환자 유치", highlight: "월 평균 12~18명" },
    ],
    quote: "\u201c채널만 세팅하는 게 아니라, 환자가 예약하고 오는 구조를 만듭니다.\u201d",
  },
  {
    num: "03",
    moduleId: "MODULE.03 // INBOUND_PROCESS",
    title: "해외환자 유치 풀 프로세스",
    subtitle: "문의~내원~사후관리까지 전 과정 설계",
    desc: "",
    items: [
      { text: "해외환자 유치업 등록 기반 합법적 프로세스 운영" },
      { text: "통역·픽업·상담 스크립트·CS 매뉴얼 제공" },
      { text: "국가별 플랫폼 리뷰 관리", sub: "(구글맵·네이버플레이스 포함)" },
      { text: "초기 세팅 완료 후", highlight: "3개월 내 첫 해외 환자 내원 목표" },
    ],
    quote: "\u201c단발성 이벤트가 아닌, 반복 유입되는 해외 채널을 구축합니다.\u201d",
  },
];

function ServiceCard({ svc, idx }: { svc: Service; idx: number }) {
  return (
    <div style={{ display: "flex", gap: 0, marginBottom: idx < 2 ? "4rem" : 0 }}>
      {/* Timeline number */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 70,
          flexShrink: 0,
          paddingTop: 28,
        }}
        className="hidden sm:flex"
      >
        <div
          className="font-mono-sys"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#000",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 900,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {svc.num}
        </div>
      </div>

      {/* Card content */}
      <div className="glass-card--service" style={{ flex: 1, padding: "2rem 2.5rem", position: "relative", overflow: "hidden", marginLeft: 20 }}>
        <div className="tech-border" style={{ position: "absolute", inset: 0 }} />

        {/* Background number */}
        <div
          className="font-mono-sys"
          style={{
            position: "absolute",
            bottom: -20,
            right: -10,
            fontSize: "10rem",
            fontWeight: 900,
            color: "rgba(255,255,255,0.02)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {idx + 1}
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>
          {/* Module badge */}
          <div style={{ marginBottom: 24, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span
              className="font-mono-sys"
              style={{
                fontSize: 11,
                color: "#cc0000",
                letterSpacing: "0.1em",
                background: "rgba(204,0,0,0.08)",
                padding: "4px 10px",
                border: "1px solid rgba(204,0,0,0.15)",
              }}
            >
              {svc.moduleId}
            </span>
          </div>

          <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, marginBottom: 8 }}>
            {svc.title}{" "}
            {svc.titleSub && (
              <span style={{ fontSize: "0.7em", fontWeight: 300, color: "rgba(255,255,255,0.5)" }}>
                {svc.titleSub}
              </span>
            )}
          </h3>

          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "rgba(255,255,255,0.85)", fontWeight: 500, marginBottom: 16 }}>
            {svc.subtitle}
          </p>

          {svc.desc && (
            <p style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 20 }}>
              {svc.desc}
            </p>
          )}

          {/* Items */}
          <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)", padding: "1.2rem 1.5rem", marginBottom: 20 }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {svc.items.map((item, j) => (
                <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span className="font-mono-sys" style={{ color: "#cc0000", flexShrink: 0, marginTop: 2, fontSize: "0.85rem" }}>
                    _&gt;
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {item.label && <strong style={{ color: "#fff" }}>{item.label} </strong>}
                    {item.text}
                    {item.result && (
                      <>
                        <span className="font-mono-sys" style={{ color: "#cc0000", margin: "0 8px" }}>→</span>
                        <strong style={{ color: "#fff" }}>{item.result}</strong>
                      </>
                    )}
                    {item.highlight && (
                      <span style={{ fontWeight: 500, color: "#fff", borderBottom: "1px solid rgba(204,0,0,0.5)", paddingBottom: 1, marginLeft: 4 }}>
                        {item.highlight}
                      </span>
                    )}
                    {item.sub && (
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginLeft: 4 }}>
                        {item.sub}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div style={{ paddingLeft: 20, borderLeft: "2px solid #cc0000", background: "linear-gradient(to right, rgba(204,0,0,0.08), transparent)", padding: "8px 20px" }}>
            <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", fontWeight: 500 }}>
              {svc.quote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "8rem 0" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div
            className="font-mono-sys"
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "#cc0000",
              marginBottom: 20,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <span style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(204,0,0,0.7))" }} />
            CORE MODULES
            <span style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(204,0,0,0.7))" }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
            열정의시간이 하는 일 <span style={{ color: "#cc0000" }}>3가지</span>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          <div
            className="timeline-line hidden sm:block"
            style={{ position: "absolute", left: 35, top: 20, bottom: 20, width: 1 }}
          />
          {services.map((svc, idx) => (
            <ServiceCard key={svc.num} svc={svc} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
