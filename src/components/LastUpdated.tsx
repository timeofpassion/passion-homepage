// GEO/AEO 최신성 신호 — AI 답변엔진은 최신 갱신 콘텐츠를 선호한다(recency 편향).
// 페이지 정보가 언제까지 유효한지 가시 텍스트로 명시해 인용 가능성을 높인다.
export default function LastUpdated({
  date,
  color = "rgba(255,255,255,0.4)",
  background = "transparent",
}: {
  date: string;
  color?: string;
  background?: string;
}) {
  return (
    <div style={{ background, textAlign: "center", padding: "0 6% 2.8rem" }}>
      <p style={{ fontSize: "0.8rem", color, letterSpacing: "0.02em", margin: 0 }}>
        마지막 업데이트 · {date}
      </p>
    </div>
  );
}
