// GEO/AEO FAQ 섹션 — "정보형 질의"(어떻게 하나요/어떤 기준)에 자답해 AI 인용을 노린다.
// 본문은 전부 가시 텍스트(크롤 가능) + FAQPage 구조화데이터를 동일 내용으로 함께 emit.
// 블로그 상세(/time/blog/[slug])의 FAQ 스타일과 동일 톤. 테마 색만 prop 주입.
type FaqItem = { q: string; a: string };

type Props = {
  eyebrow?: string;
  title?: string;
  items: FaqItem[];
  accent?: string;
  color?: string;
  subColor?: string;
  background?: string;
  borderColor?: string;
};

export default function FaqSection({
  eyebrow = "FAQ",
  title = "자주 묻는 질문",
  items,
  accent = "#E7C46A",
  color = "#ffffff",
  subColor = "rgba(255,255,255,0.8)",
  background = "transparent",
  borderColor = "rgba(255,255,255,0.08)",
}: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section aria-label={title} style={{ background, padding: "4.5rem 0" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 6%" }}>
        <p
          style={{
            color: accent,
            fontSize: "0.8rem",
            fontWeight: 800,
            letterSpacing: "0.15em",
            marginBottom: "0.7rem",
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            color,
            fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
            fontWeight: 900,
            lineHeight: 1.3,
            marginBottom: "2rem",
          }}
        >
          {title}
        </h2>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              marginBottom: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom:
                i < items.length - 1 ? `1px solid ${borderColor}` : "none",
            }}
          >
            <h3
              style={{
                fontSize: "1.08rem",
                fontWeight: 700,
                color: accent,
                marginBottom: "0.6rem",
                lineHeight: 1.5,
              }}
            >
              Q. {it.q}
            </h3>
            <p style={{ color: subColor, lineHeight: 1.8, fontWeight: 300 }}>
              {it.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
