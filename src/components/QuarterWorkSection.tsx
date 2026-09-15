import Link from "next/link";
import SectionLabel from "./SectionLabel";

// 2026년 3분기 실제 진행 업무 요약. 성과 수치는 원장님 확인 전이라 넣지 않는다(일한 내용만).
// 분기가 바뀌면 QUARTER 와 MARKETS 만 교체한다.
const QUARTER = "2026년 3분기";

const MARKETS: { name: string; channels: string; items: string[] }[] = [
  {
    name: "국내",
    channels: "네이버 · 인스타그램 · 유튜브",
    items: [
      "피부과·성형외과 브랜드블로그 매달 세트 단위 운영 — 원장님 컨펌 흐름까지 병원별로 설계",
      "피부과 지점 홈페이지 리뉴얼·유지보수, 필러 시술 전용 랜딩페이지 제작",
      "네이버 플레이스·예약 세팅 정비와 플레이스 광고 운영",
      "META(페이스북·인스타) 광고 소재 제작과 캠페인 운영",
      "의료기기 브랜드 체험단 운영·브랜딩 가이드·정기 활동보고서",
    ],
  },
  {
    name: "중국",
    channels: "샤오홍슈 · 더우인",
    items: [
      "뷰티 브랜드 샤오홍슈 계정 콘텐츠 운영",
      "중국어(간체)·번체·영어·일본어 4개 언어 리뷰 이벤트 랜딩 공개",
      "외국인 방문객 대상 매장별 다국어 홈페이지 구축",
    ],
  },
  {
    name: "대만",
    channels: "인스타그램 · 유튜브 · LINE",
    items: [
      "피부과 대만 채널 운영과 번체 콘텐츠 제작",
    ],
  },
  {
    name: "일본",
    channels: "LINE · 인스타그램 · X",
    items: [
      "피부과 일본 마케팅 기간 계약 — 과업을 수량 기준으로 관리",
      "일본 현지 크리에이터 모집 페이지 운영",
      "영미권 확장: 영어 블로그 자동 발행과 영어권 META 광고 세팅",
    ],
  },
];

export default function QuarterWorkSection() {
  return (
    <section id="work" style={{ position: "relative", zIndex: 20, padding: "7rem 0 5rem" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
        <SectionLabel>{QUARTER} · WHAT WE DID</SectionLabel>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.25, marginBottom: 14, wordBreak: "keep-all" }}>
          이번 분기, <span style={{ color: "#E63329" }}>4개 시장</span>에서 실제로 한 일
        </h2>
        <p style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", color: "rgba(255,255,255,0.55)", marginBottom: "3rem", maxWidth: 640, lineHeight: 1.7 }}>
          하나의 계약 안에서 국내와 해외 전담팀이 동시에 움직였습니다. 성과 수치는 병원 확인을 거친 뒤 공개합니다.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          {MARKETS.map((m) => (
            <div key={m.name} style={{ padding: "1.8rem 1.4rem 1.8rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 900 }}>{m.name}</h3>
                <span style={{ fontSize: "0.72rem", color: "#E7C46A", fontWeight: 600 }}>{m.channels}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
                {m.items.map((t) => (
                  <li key={t} style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)", paddingLeft: 14, position: "relative", wordBreak: "keep-all" }}>
                    <span aria-hidden style={{ position: "absolute", left: 0, top: "0.62em", width: 5, height: 5, background: "#E63329" }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2.8rem" }}>
          <Link href="/time/quote" className="btn-primary">우리 병원도 진단 받기</Link>
        </div>
      </div>
    </section>
  );
}
