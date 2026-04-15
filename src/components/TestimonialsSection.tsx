import { ReactNode } from "react";

interface Testimonial {
  id: string;
  recId: string;
  content: ReactNode;
  name: string;
  initial: string;
  tags: string[];
  hasScanLine?: boolean;
  scanDelay?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "TESTIMONIAL.01",
    recId: "849A-F2",
    content: (
      <>
        &ldquo;블로그 업체를 3번 바꿨는데 열정의시간이 처음으로{" "}
        <strong style={{ color: "#fff" }}>&lsquo;왜 이 키워드를 써야 하는지&rsquo;</strong>{" "}
        설명해줬습니다. 6개월 후 네이버 플레이스 3위에서 1위로 올라왔고{" "}
        <span style={{ color: "#cc0000", fontWeight: 500 }}>월 신환이 23명에서 41명으로</span> 늘었습니다.&rdquo;
      </>
    ),
    name: "김○○ 원장",
    initial: "K",
    tags: ["강남구 피부과", "개원 2년차"],
    hasScanLine: true,
  },
  {
    id: "TESTIMONIAL.02",
    recId: "331X-E9",
    content: (
      <>
        &ldquo;일본 마케팅 한다는 업체가 많았지만, 실제로{" "}
        <strong style={{ color: "#fff" }}>일본인 환자를 데려온 건 열정의시간이 처음이었습니다.</strong>{" "}
        계약 4개월 만에{" "}
        <span style={{ color: "#cc0000", fontWeight: 500 }}>일본인 환자 누적 27명 내원</span>, 지금은 월 정기 유입 구조가 잡혔습니다.&rdquo;
      </>
    ),
    name: "이○○ 원장",
    initial: "L",
    tags: ["마포구 성형외과", "개원 5년차"],
  },
  {
    id: "TESTIMONIAL.03",
    recId: "912C-B4",
    content: (
      <>
        &ldquo;광고비로 월 400만원 쓰면서 상담은 월 4~5건이었는데, 열정의시간과 함께한 후{" "}
        <strong style={{ color: "#fff" }}>광고비 250만원으로 줄이면서</strong>{" "}
        <span style={{ color: "#cc0000", fontWeight: 500 }}>상담은 오히려 월 19건으로</span> 늘었습니다. 구조가 바뀌니 결과가 달라지더라고요.&rdquo;
      </>
    ),
    name: "박○○ 실장",
    initial: "P",
    tags: ["서울 한의원", "마케팅 담당자"],
  },
  {
    id: "TESTIMONIAL.04",
    recId: "775Y-A1",
    content: (
      <>
        &ldquo;중국 라이브커머스는 직접 하려고 했다가 6개월 날렸습니다. 열정의시간 통해서 왕홍 섭외부터 샤오홍슈 계정 세팅까지{" "}
        <strong style={{ color: "#fff" }}>2개월 만에 끝냈고,</strong>{" "}
        <span style={{ color: "#cc0000", fontWeight: 500 }}>첫 라이브에서 문의 38건</span> 들어왔습니다.&rdquo;
      </>
    ),
    name: "최○○ 원장",
    initial: "C",
    tags: ["경기 피부과", "해외마케팅 확장 중"],
    hasScanLine: true,
    scanDelay: "4s",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="glass-card--testimonial" style={{ padding: "2rem 2.5rem", position: "relative", overflow: "hidden" }}>
      <div className="tech-border" style={{ position: "absolute", inset: 0 }} />
      {t.hasScanLine && (
        <div className="scan-line" style={t.scanDelay ? { animationDelay: t.scanDelay } : undefined} />
      )}

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span
            className="font-mono-sys"
            style={{
              fontSize: 10,
              color: "#cc0000",
              letterSpacing: "0.1em",
              background: "rgba(204,0,0,0.08)",
              padding: "3px 10px",
              border: "1px solid rgba(204,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#cc0000" }} />
            {t.id}
          </span>
          <span className="font-mono-sys" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
            {t.recId}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, marginBottom: 28 }}>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, fontWeight: 300 }}>
            {t.content}
          </p>
        </div>

        {/* Author */}
        <div style={{
          marginTop: "auto",
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "rgba(0,0,0,0.15)",
          padding: "14px",
          borderLeft: "2px solid rgba(204,0,0,0.4)",
        }}>
          <div
            className="font-mono-sys"
            style={{
              width: 44,
              height: 44,
              background: "#0a0000",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.7)",
              flexShrink: 0,
            }}
          >
            {t.initial}
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>{t.name}</h4>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
              {t.tags.map((tag, i) => (
                <span key={i} style={{ display: "contents" }}>
                  {i > 0 && <span className="font-mono-sys" style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>|</span>}
                  <span
                    className="font-mono-sys"
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.04)", padding: "2px 8px" }}
                  >
                    {tag}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "8rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div
            className="font-mono-sys"
            style={{ fontSize: 12, letterSpacing: "0.2em", color: "#cc0000", marginBottom: 20, textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}
          >
            <span style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(204,0,0,0.7))" }} />
            DATA_ARCHIVE // REVIEWS
            <span style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(204,0,0,0.7))" }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
            함께한 원장님들의 이야기
          </h2>
        </div>

        {/* Grid - 2 columns on large */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <TestimonialCard t={testimonials[0]} />
            <TestimonialCard t={testimonials[2]} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingTop: "4rem" }}>
            <TestimonialCard t={testimonials[1]} />
            <TestimonialCard t={testimonials[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
