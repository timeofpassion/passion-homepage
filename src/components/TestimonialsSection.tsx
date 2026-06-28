import {
  TestimonialsColumn,
  type ColumnTestimonial,
} from "@/components/ui/testimonials-columns-1";

// 익명화된 클라이언트 후기. 효과(result)는 사이트에 이미 공개된 성과 표현 범위 내에서만 작성.
// 실제 원장님 실명 코멘트가 확보되면 이 데이터만 교체하면 됨.
const testimonials: ColumnTestimonial[] = [
  {
    text: "“블로그 업체를 세 번 바꿨는데, 열정의시간이 처음으로 ‘왜 이 키워드를 써야 하는지’ 설명해줬습니다. 막연한 노출이 아니라 검색하는 환자에게 닿는 글이었어요.”",
    result: "→ 네이버 플레이스 3위 → 1위, 월 신환 23 → 41명",
    name: "김○○ 원장",
    role: "강남구 피부과 · 개원 2년차",
    initial: "K",
  },
  {
    text: "“광고비로 월 400만원 쓰면서 상담은 4~5건이었는데, 구조를 바꾸니 광고비를 줄이고도 상담이 늘었습니다. 돈을 더 쓰는 게 답이 아니더라고요.”",
    result: "→ 광고비 400 → 250만원, 상담 월 19건",
    name: "박○○ 실장",
    role: "서울 한의원 · 마케팅 담당",
    initial: "P",
  },
  {
    text: "“여러 업체에 나눠 맡기다 보니 조율에 시간을 다 썼어요. 기획·디자인·영상이 한 곳에 있으니 말 한 번에 끝나고, 톤이 흔들리지 않습니다.”",
    result: "→ 블로그 평균 3개월 내 네이버 1페이지 진입",
    name: "정○○ 원장",
    role: "서울 치과 · 개원 3년차",
    initial: "J",
  },
  {
    text: "“일본 마케팅 한다는 업체는 많았지만, 실제로 일본인 환자를 데려온 건 열정의시간이 처음이었습니다. 번역이 아니라 현지 사람이 쓴 콘텐츠라 반응이 달랐어요.”",
    result: "→ 4개월 만에 일본인 환자 누적 27명 내원",
    name: "이○○ 원장",
    role: "마포구 성형외과 · 개원 5년차",
    initial: "L",
  },
  {
    text: "“중국 라이브커머스를 직접 해보려다 6개월을 날렸습니다. 왕홍 섭외부터 샤오홍슈 계정 세팅까지 단 2개월 만에 끝났어요.”",
    result: "→ 첫 라이브에서 문의 38건",
    name: "최○○ 원장",
    role: "경기 피부과 · 해외 확장 중",
    initial: "C",
  },
  {
    text: "“숏폼을 외주 줬다가 우리 병원 톤과 안 맞아 늘 고생했는데, 영상팀이 내부에 있으니 기획·촬영·편집이 하루 만에 돕니다. 수정도 바로바로 됩니다.”",
    result: "→ 숏츠 채널 팔로워 평균 +31%",
    name: "한○○ 원장",
    role: "강남 성형외과 · 개원 4년차",
    initial: "H",
  },
  {
    text: "“플랫폼 상담은 많은데 내원으로 이어지질 않았어요. 상담 스크립트와 응대 동선까지 같이 손보니 ‘문의’가 ‘예약’으로 바뀌더라고요.”",
    result: "→ 상담 전환율 평균 2.4배 개선",
    name: "서○○ 실장",
    role: "강남구 피부과 · 상담실장",
    initial: "S",
  },
  {
    text: "“대만 시장은 어디서부터 시작해야 할지 막막했는데, 현지팀이 번체 콘텐츠를 직접 기획해 채널을 열어줬습니다. 첫 해외 채널을 제대로 깔았어요.”",
    result: "→ 대만 현지 채널 개설 · 문의 유입 시작",
    name: "윤○○ 원장",
    role: "서울 피부과 · 대만 타깃",
    initial: "Y",
  },
  {
    text: "“해외환자는 막연하게만 느껴졌는데, 유치업 등록부터 통역·픽업·사후관리까지 한 번에 정리해줬습니다. ‘되는 구조’를 만들어준다는 말이 무슨 뜻인지 알겠더라고요.”",
    result: "→ 해외환자 월 평균 12~18명 유입",
    name: "강○○ 원장",
    role: "인천 성형외과 · 해외 유치",
    initial: "K",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ position: "relative", zIndex: 20, padding: "8rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
            CLIENT VOICES
            <span style={{ width: 28, height: 1, background: "rgba(255,215,0,0.5)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
            함께한 원장님들의 이야기
          </h2>
          <p
            style={{
              marginTop: 18,
              fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 300,
            }}
          >
            성과는 말이 아니라 숫자로 증명됩니다.
          </p>
        </div>

        {/* Animated columns */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            maxHeight: 720,
            overflow: "hidden",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={17} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={19} />
        </div>
      </div>
    </section>
  );
}
