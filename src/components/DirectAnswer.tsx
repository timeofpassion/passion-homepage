// GEO/AEO Direct Answer 블록 — H1 직하에 "이 회사가 무엇인가"를 40~60단어로 자답.
// AI 답변엔진이 패시지(문단) 단위로 추출·인용하기 좋은 자기완결형 단락.
// (디자인은 페이지 테마에 맞춰 색만 prop 으로 주입; 히어로는 건드리지 않는다.)
type Props = {
  eyebrow: string;
  question: string;
  answer: string;
  accent?: string;
  color?: string;
  subColor?: string;
  background?: string;
};

export default function DirectAnswer({
  eyebrow,
  question,
  answer,
  accent = "#FFD700",
  color = "#ffffff",
  subColor = "rgba(255,255,255,0.8)",
  background = "transparent",
}: Props) {
  return (
    <section aria-label={question} style={{ background, padding: "3.5rem 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 6%" }}>
        <p
          style={{
            color: accent,
            fontSize: "0.8rem",
            fontWeight: 800,
            letterSpacing: "0.15em",
            marginBottom: "0.8rem",
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            color,
            fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
            fontWeight: 800,
            lineHeight: 1.3,
            marginBottom: "1rem",
          }}
        >
          {question}
        </h2>
        <p
          style={{
            color: subColor,
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            lineHeight: 1.85,
            fontWeight: 300,
            maxWidth: 780,
          }}
        >
          {answer}
        </p>
      </div>
    </section>
  );
}
