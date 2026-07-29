// 섹션 머리말. 예전엔 각 섹션이 "—— LABEL ——" 를 각자 그렸는데,
// 가운데 정렬 + 양옆 hairline 조합이 5개 섹션에 반복되면서 템플릿처럼 읽혔다.
// 좌측 정렬 한 벌로 통일한다. (DESIGN.md §4 — 좌측 정렬 기본, 가운데는 히어로 1곳만)
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono-sys"
      style={{
        fontSize: 12,
        letterSpacing: "0.2em",
        color: "#E7C46A",
        marginBottom: "1.4rem",
      }}
    >
      {children}
    </div>
  );
}
