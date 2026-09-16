import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/og";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";

// 루트 그룹 템플릿("%s | PASSION GROUP")을 우회해 열정의시간 단일 브랜딩 유지.
// og:url 을 요청 주소(쿼리 포함)에 맞춰 동적 생성 → 카카오 캐시 ?v= 우회 갱신 지원.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const sp = await searchParams;
  return {
    title: {
      absolute: "열정의시간 | 병원 마케팅 & 해외환자 유치 전문 에이전시",
    },
    openGraph: buildOpenGraph(
      {
        title: "열정의시간 | 병원 마케팅 & 해외환자 유치 전문 에이전시",
        description:
          "10년 이상 노하우의 병원 마케팅 전문 에이전시. 국내 통합 마케팅부터 일본·중국·대만 해외환자 유치까지 원스톱으로. 하나의 계약으로 6개 팀이 동시에 움직입니다.",
        siteName: "열정의시간",
        locale: "ko_KR",
        type: "website",
        images: [
          {
            url: "/time/og-time-v2.jpg",
            width: 1200,
            height: 630,
            alt: "열정의시간 — 병원 마케팅 & 해외환자 유치 전문 에이전시",
          },
        ],
      },
      "/time",
      sp,
    ),
  };
}
import Link from "next/link";
import ClientMarquee from "@/components/ClientMarquee";
import FaqSection from "@/components/FaqSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import KakaoFloat from "@/components/KakaoFloat";
import { TimeBlogCarousel } from "@/components/TimeBlogCarousel";
import { loadPosts } from "@/lib/time-blog-source";
import { previewGroups } from "@/data/portfolio";
import PortfolioCard from "@/components/portfolio/PortfolioCard";


const RED = "#E63329";
const BADGES = [
  { k: "외국인환자 유치업 등록", v: "A-2025-01-02-06178호", href: "/time/foreign-patient-cert.png" },
  { k: "의료광고", v: "사전심의 접수 · 문구 점검 대행" },
  { k: "현지 전담팀", v: "국내 · 중국 · 대만 · 일본" },
  { k: "채널 · 계정", v: "100% 병원 소유로 개설" },
];

const MARKETS = [
  {
    name: "국내", en: "KOREA", channels: "네이버 · 인스타그램 · 유튜브",
    lead: "원장님 대신 움직이는 병원 마케팅팀",
    items: ["브랜드블로그 매달 세트 운영", "홈페이지·시술 랜딩페이지 제작", "플레이스·예약 세팅과 광고", "META 광고 소재·캠페인"],
    href: "https://docs.google.com/presentation/d/17fAOTFOwVV91fOpLUcWycyWzV6GFCpvfjwQGYgNYiZY/edit",
  },
  {
    name: "중국", en: "CHINA", channels: "샤오홍슈 · 더우인 · 위챗",
    lead: "검색은 샤오홍슈에서, 상담은 위챗으로",
    items: ["샤오홍슈 계정 콘텐츠 운영", "간체 리뷰 이벤트 랜딩", "외국인 방문객용 다국어 홈페이지"],
    href: "https://docs.google.com/presentation/d/1clu7n3Ag0l6GrWlFzKF1bN-0kzXP63ws-22-jlTTcyA/edit",
  },
  {
    name: "대만", en: "TAIWAN", channels: "인스타그램 · 유튜브 · LINE",
    lead: "번체 콘텐츠로 여는 첫 해외 채널",
    items: ["대만 채널 운영", "번체 콘텐츠 제작", "LINE 상담 전환"],
    href: "https://docs.google.com/presentation/d/15kiF0BlcWDyevXr_PZ6YuElaF2CsQOWPXgREksaZqIg/edit",
  },
  {
    name: "일본", en: "JAPAN", channels: "LINE · 인스타그램 · X",
    lead: "번역이 아니라 현지 사람이 쓰는 콘텐츠",
    items: ["일본 마케팅 기간 계약 운영", "현지 크리에이터 모집", "LINE 상담 전환"],
    href: "https://docs.google.com/presentation/d/1IYYSmlSdHhbhDPvl_8RH8OthDxWQHKPhbjmEHjpQwJo/edit",
  },
];

// 일하는 방식 PHASE 1 — 진단·제안
type Doc = { src: string; cap: string };
const DIAG: { t: string; d: string; checks: string[]; out: string; docs: Doc[] }[] = [
  {
    t: "병원의 지금을 직접 확인합니다",
    d: "원장님 설명만 듣고 끝내지 않습니다. 환자가 병원을 찾는 길을 실제로 따라가며, 어디서 발견되고 어디서 놓치는지 확인합니다.",
    checks: ["네이버 검색·플레이스", "블로그·홈페이지", "강남언니·바비톡 등 플랫폼", "해외 채널·다국어 페이지", "문의 → 예약 흐름", "경쟁 병원"],
    out: "항목별 진단표",
    docs: [
      { src: "/time/proof/diag-search.jpg", cap: "진단 예시 · 확인한 항목과 출처 · 기준일" },
    ],
  },
  {
    t: "원하는 것과 상황을 맞춥니다",
    d: "신환을 늘리고 싶은지, 특정 시술을 키우고 싶은지, 해외 어느 나라 환자를 원하는지. 예산과 원내 인력 사정까지 듣고 가장 먼저 풀 과제를 한 문장으로 정합니다.",
    checks: ["목표 시술·환자층", "국내 / 해외 우선순위", "예산", "원내 응대 인력"],
    out: "우선순위와 핵심 과제 한 문장",
    docs: [
      { src: "/time/proof/diag-ask.jpg", cap: "제안서 예시 · 원장님께 여쭤보는 것(병원명·지역 가림)" },
    ],
  },
  {
    t: "필요한 것만 담아 제안합니다",
    d: "국내와 중국·대만·일본 중 지금 필요한 조합만 골라 설계합니다. 무엇을 하는지와 함께, 지금은 하지 않아도 되는 일도 적어 드립니다.",
    checks: ["국내 기반 설계", "해외 확장 시점", "월 운영 범위", "첫 달 세팅 목록"],
    out: "맞춤 제안서와 견적",
    docs: [
      { src: "/time/proof/plan-fill.jpg", cap: "제안서 예시 · 부족한 칸과 채우는 방법(병원명·지역 가림)" },
    ],
  },
];

// 일하는 방식 PHASE 2 — 데이터 운영 순환
const RUN: { t: string; d: string; out: string; docs: Doc[] }[] = [
  {
    t: "첫 달, 측정할 수 있게 엽니다",
    d: "채널과 계정은 병원 소유로 열고, 어떤 경로로 문의·예약이 들어왔는지 남도록 연결합니다. 이 연결이 있어야 다음 달 판단이 가능합니다.",
    out: "병원 소유 계정 · 유입 경로 추적",
    docs: [
      { src: "/time/proof/run-firstmonth.jpg", cap: "제안서 예시 · 첫 달 주차별 실행과 원장님 확인 사항(병원명·지역 가림)" },
    ],
  },
  {
    t: "CRM 데이터로 무엇이 내원으로 이어졌는지 봅니다",
    d: "노출·조회수가 아니라 예약·상담·내원 데이터를 봅니다. 어떤 채널, 어떤 시술 콘텐츠가 실제 환자로 이어졌고 어디서 끊겼는지 분석합니다.",
    out: "월간 분석 리포트",
    docs: [
      { src: "/time/proof/crm-1.jpg", cap: "CRM 분석 예시(가상 병원) · 채널별 광고비 대비 매출" },
    ],
  },
  {
    t: "다음 달 마케팅을 구체적으로 제안합니다",
    d: "분석 결과로 다음 달 키울 시술, 콘텐츠 주제, 광고와 이벤트를 항목 단위로 제안하고 원장님 미팅에서 확정합니다.",
    out: "다음 달 맞춤 실행안",
    docs: [
      { src: "/time/proof/crm-2.jpg", cap: "CRM 분석 예시(가상 병원) · 채널마다 데려오는 시술" },
    ],
  },
];

const HW_CSS = `
  .hw-phase{display:grid;grid-template-columns:minmax(220px,340px) 1fr;gap:3rem;margin-top:5rem;align-items:start}
  .hw-rail{position:sticky;top:110px;border-top:2px solid ${"#E63329"};padding-top:1.2rem}
  .hw-steps{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:1rem;border-left:1px solid rgba(255,255,255,.12)}
  .hw-step{padding:1.6rem 0 2.4rem 28px;position:relative}
  .hw-step::before{content:"";position:absolute;left:-5px;top:2rem;width:9px;height:9px;background:#E63329}
  .hw-step+.hw-step{border-top:1px solid rgba(255,255,255,.08)}
  .hw-docs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin-top:1.4rem}
  .hw-doc{text-decoration:none;display:block}
  .hw-paper{display:block;height:260px;overflow:hidden;background:#fff;border:1px solid rgba(255,255,255,.2);position:relative;transition:transform .25s}
  .hw-paper::after{content:"";position:absolute;inset:auto 0 0 0;height:70px;background:linear-gradient(transparent,rgba(0,0,0,.55))}
  .hw-paper img{width:100%;display:block}
  .hw-doc:hover .hw-paper{transform:translateY(-4px)}
  .hw-tiers{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.12)}
  .hw-tier{background:#0a0a0a;padding:1.6rem 1.4rem;text-decoration:none;color:#fff;display:flex;flex-direction:column;transition:background .2s}
  .hw-tier:hover{background:#121212}
  .hw-tier[data-both="1"]{background:linear-gradient(170deg,rgba(230,51,41,.14),#0a0a0a 62%)}
  .hw-tier[data-both="1"]:hover{background:linear-gradient(170deg,rgba(230,51,41,.2),#121212 62%)}
  @media (max-width:900px){.hw-tiers{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:520px){.hw-tiers{grid-template-columns:1fr}}
  @media (max-width:760px){.hw-phase{grid-template-columns:1fr;gap:1.6rem;margin-top:3.5rem}.hw-rail{position:static}}

  /* 국내·해외 시작 흐름 — 세로 타임라인 */
  .flow{list-style:none;margin:0;padding:0 0 0 30px;position:relative}
  .flow::before{content:"";position:absolute;left:4px;top:6px;bottom:6px;width:2px;background:linear-gradient(${"#E63329"},rgba(230,51,41,.35) 55%,rgba(255,255,255,.08))}
  .flow-step{position:relative;padding:0 0 2.6rem}
  .flow-step:last-child{padding-bottom:0}
  .flow-step::before{content:"";position:absolute;left:-30px;top:5px;width:10px;height:10px;background:#E63329;box-shadow:0 0 0 5px rgba(230,51,41,.14)}
  .flow-when{display:inline-block;font-size:12px;font-weight:700;color:#E7C46A;letter-spacing:.02em}
  .flow-title{font-size:clamp(1.15rem,2.2vw,1.45rem);font-weight:900;margin:6px 0 8px;letter-spacing:-.02em}
  .flow-desc{font-size:.95rem;line-height:1.75;color:rgba(255,255,255,.68);word-break:keep-all;max-width:54ch;margin:0}
  .flow-checks{list-style:none;padding:0;margin:14px 0 0;display:flex;flex-wrap:wrap;gap:6px}
  .flow-checks li{font-size:12px;padding:4px 10px;border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.8)}
  .flow-out{margin:14px 0 0;font-size:.85rem;font-weight:700}
  .flow-end{display:block;margin-top:14px;font-size:.82rem;color:rgba(255,255,255,.4)}
  @supports (animation-timeline: view()){
    @media (prefers-reduced-motion: no-preference){
      .flow-step{animation:flowIn linear both;animation-timeline:view();animation-range:entry 8% cover 32%}
      @keyframes flowIn{from{opacity:.25;transform:translateY(14px)}to{opacity:1;transform:none}}
    }
  }

  /* 견적 바로가기 */
  .quote-cta{display:inline-flex;align-items:center;gap:10px;background:${"#E63329"};color:#fff;text-decoration:none;font-weight:900;font-size:1.05rem;padding:18px 32px;border:1px solid ${"#E63329"};transition:transform .2s, box-shadow .2s}
  .quote-cta:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(230,51,41,.3)}

  /* 포트폴리오 미리보기 */
  .pf-group+.pf-group{margin-top:3.4rem;padding-top:3.4rem;border-top:1px solid rgba(255,255,255,.08)}
  .pf-head{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:1.1rem;flex-wrap:wrap}
  .pf-more{color:#E7C46A;font-size:.85rem;font-weight:700;text-decoration:none;white-space:nowrap}
  .pf-more:hover{text-decoration:underline}
  .pf-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:1rem}
`;

// 국내·해외 동시 시작 흐름 — 세로로 읽어 내린다
// 국내·해외 동시 진행의 한 바퀴. STEP 1~6(일하는 방식)과 같은 깊이로 적는다 —
// 제목 한 줄짜리로 두면 "이 섹션만 설명이 없다"가 된다(2026-09-16 대표 지적).
// 해외를 같이 할 때만 달라지는 것에 집중해 STEP 1~6 과 같은 말을 반복하지 않는다.
const FLOW: { when: string; t: string; d: string; checks: string[]; out: string }[] = [
  {
    when: "계약 전",
    t: "국내와 해외를 한 번에 진단합니다",
    d: "국내 검색만 보고 시작하지 않습니다. 중국·대만·일본 현지 플랫폼에서 병원 이름과 주력 시술이 어떻게 검색되는지, 현지 경쟁 병원은 무엇을 올리고 있는지 같이 확인합니다.",
    checks: ["네이버 검색·플레이스", "샤오홍슈·더우인", "유튜브·인스타(번체·일본어)", "다국어 페이지 유무", "현지 경쟁 병원"],
    out: "국내·해외를 함께 본 진단표",
  },
  {
    when: "첫 달",
    t: "해외 계정과 다국어 페이지를 병원 명의로 엽니다",
    d: "대행사 계정으로 만들면 계약이 끝날 때 팔로워와 후기가 함께 사라집니다. 계정은 처음부터 병원 명의로 열고, 다국어 페이지는 자동 번역 미러링이 아니라 언어별 실제 페이지로 만듭니다.",
    checks: ["샤오홍슈·인스타 계정 인증", "언어별 물리 페이지", "유입 경로 추적 연결"],
    out: "병원 소유 해외 계정 · 다국어 페이지",
  },
  {
    when: "이후 매달",
    t: "국내에서 찍은 원본을 나라별로 옮겨 씁니다",
    d: "해외용으로 다시 찍지 않습니다. 국내 촬영분을 자막·로고가 없는 클린 원본으로 남겨 두고, 나라별 자막과 표현만 각색해 현지 채널에 올립니다. 촬영은 한 번만 합니다.",
    checks: ["클린 원본 확보", "나라별 자막·각색", "현지 채널 발행", "월간 보고서"],
    out: "나라별 발행 콘텐츠 · 월간 보고서",
  },
  {
    when: "중간 점검",
    t: "약속한 시점에 계속할지 함께 정합니다",
    d: "시작할 때 정한 점검 시점에 기준 대비 결과를 보고합니다. 성과가 안 나는 나라는 줄이거나 멈추고, 되는 곳으로 옮깁니다.",
    checks: ["기준 대비 결과", "나라별 계속·조정·중단", "다음 분기 계획"],
    out: "점검 보고 · 다음 분기 결정",
  },
];

const label = { color: "#E7C46A", fontSize: 12, letterSpacing: ".2em", marginBottom: 16 } as const;

// 메인(2026-09-15 개편): 첫 화면 → 신뢰 배지 → 국내 기반+해외 → 일하는 방식 → 한 번에 맡기면 → 로고 → 포트폴리오(준비중) → 인사이트 → FAQ → 상담
// GEO FAQ — "정보형 질의" 인용 노림. 본문은 기존 사이트 사실만 사용(새 수치·시설 창작 금지).
const TIME_FAQ = [
  {
    q: "병원 마케팅 대행사는 어떤 기준으로 골라야 하나요?",
    a: "노출·조회수 같은 표면 지표가 아니라 ‘상담에서 실제 내원으로’ 이어지는 전환을 설계하는지, 국내와 해외(일본·중국·대만) 채널을 한 곳에서 통합 운영하는지, 채널·계정 소유권이 병원에 있는지를 봐야 합니다. 열정의시간은 10년 이상 이 구조를 현지 전담팀과 함께 직접 운영해 왔습니다.",
  },
  {
    q: "해외환자(외국인환자) 유치 마케팅은 어떻게 진행되나요?",
    a: "유치업 등록과 위탁계약을 기반으로 합법적으로 진행합니다. 중국은 샤오홍슈·더우인에서 위챗 상담으로, 일본은 인스타그램·X에서 라인 상담으로, 대만은 페이스북·인스타·유튜브에서 라인(번체) 상담으로 전환합니다. 현지어 전담팀이 발견→상담→내원→통역·사후관리까지 운영합니다.",
  },
  {
    q: "중국 환자 유치 마케팅은 어떻게 하나요?",
    a: "샤오홍슈·더우인·바이두에서 발견되게 만들고 위챗 1:1 상담으로 전환하는 구조입니다. 간체 화법과 현지 KOL(왕홍)을 활용하며, 의료광고법과 현지 플랫폼 규정을 지켜 운영합니다.",
  },
  {
    q: "국내 마케팅은 어떤 채널을 운영하나요?",
    a: "블로그 SEO, 숏폼·영상, 인스타그램·유튜브 SNS, 네이버 플레이스, 플랫폼(강남언니·바비톡 등), 카페 바이럴을 통합 운영합니다. 하나의 계약으로 여러 전담팀이 함께 움직입니다.",
  },
  {
    q: "비용은 어떻게 책정되나요?",
    a: "진료과·목표 시장·운영 범위에 따라 맞춤 견적으로 안내합니다. 무료 전략 상담에서 현재 마케팅 비용 누수 진단과 채널 우선순위부터 점검합니다.",
  },
];

// 국내 패키지 4단계 = 인트라넷 상품 DB 정본. 메인과 견적 페이지가 같은 값을 본다.
// 하드코딩이면 가격이 바뀔 때마다 두 곳을 손으로 맞춰야 한다(9/14 1,200→1,000 때 실제로 그랬다).
const INTRANET = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";
type Tier = { label: string; price: string; name: string; desc: string; both: boolean; pick: number };
// 인트라넷이 죽어도 메인은 떠야 한다 → 마지막으로 확인된 값으로 폴백
const FALLBACK_TIERS: Tier[] = [
  { label: "국내", price: "400", name: "라이트", desc: "네이버에서 돌릴 수 있는 건 한 바퀴 다 도는 기본 구성", both: false, pick: 0 },
  { label: "국내", price: "600", name: "스탠다드", desc: "라이트 + 인스타 체험단 + 담당 PM", both: false, pick: 1 },
  { label: "국내 + 해외", price: "800", name: "디럭스", desc: "스탠다드 + META 광고 + 쇼츠 6건(해외에 그대로 쓰는 클린 원본)", both: true, pick: 2 },
  { label: "국내 + 해외", price: "1,000", name: "프리미엄", desc: "디럭스 + 풀 영상 4건 + 쇼츠 8건", both: true, pick: 3 },
];

async function loadDomesticTiers(): Promise<Tier[]> {
  try {
    const list = await fetch(`${INTRANET}/api/public/quote/products`, { next: { revalidate: 300 } });
    if (!list.ok) return FALLBACK_TIERS;
    const { products = [] } = (await list.json()) as { products: { id: string; topCategory?: string; category?: string }[] };
    const domestic = products.find((p) => (p.topCategory || p.category) === "국내마케팅");
    if (!domestic) return FALLBACK_TIERS;
    const res = await fetch(`${INTRANET}/api/public/quote/products/${domestic.id}`, { next: { revalidate: 300 } });
    if (!res.ok) return FALLBACK_TIERS;
    const { options = [] } = (await res.json()) as { options: { optionTitle: string; price: number; description?: string }[] };
    if (options.length < 2) return FALLBACK_TIERS;
    return options.map((o, pick) => {
      const [name, ...rest] = o.optionTitle.split(" — ");
      // 옵션 제목의 꼬리가 「뼈대」처럼 한 마디뿐이면 카드가 비어 보인다 → 상품 설명 첫 문장으로 채운다
      const tail = rest.join(" — ");
      const desc = tail.replace(/[^가-힣a-zA-Z0-9]/g, "").length >= 8 ? tail : (o.description || tail).split(/[.。]\s|\n/)[0];
      return {
        label: /해외/.test(o.optionTitle) ? "국내 + 해외" : "국내",
        price: new Intl.NumberFormat("ko-KR").format(Math.round(o.price / 10000)),
        name: name.trim(),
        desc: desc.replace(/\s*\(([^)]*)\)\s*$/, " — $1").trim(),
        both: /해외/.test(o.optionTitle),
        pick,
      };
    });
  } catch {
    return FALLBACK_TIERS;
  }
}

export default async function Home() {
  const [posts, tiers] = await Promise.all([loadPosts().then((p) => p.slice(0, 8)), loadDomesticTiers()]);
  return (
    <>
      <style>{HW_CSS}</style>
      <BackgroundEffects />
      <main className="relative z-10">
        <Header />

        {/* 1. 첫 화면: 실사 + 한 문장 + 버튼 */}
        <section style={{ position: "relative", minHeight: "min(88vh, 820px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
          <video className="hero-video" autoPlay muted loop playsInline poster="/time/hero-global-poster.png" aria-hidden="true">
            <source src="/time/hero-global.mp4" type="video/mp4" />
          </video>
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.6) 45%, rgba(0,0,0,.15) 100%), linear-gradient(0deg, #000 0%, transparent 35%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, width: "100%", margin: "0 auto", padding: "0 6% 5.5rem" }}>
            <p className="font-mono-sys" style={{ ...label, color: RED }}>MEDICAL MARKETING · KR CN TW JP</p>
            <h1 style={{ fontSize: "clamp(2.2rem, 5.6vw, 4.4rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 820, wordBreak: "keep-all" }}>
              국내 환자부터<br />중국·대만·일본 환자까지,<br /><span style={{ color: RED }}>한 계약으로.</span>
            </h1>
            <p style={{ marginTop: 22, fontSize: "clamp(.95rem, 1.6vw, 1.15rem)", color: "rgba(255,255,255,.7)", maxWidth: 560, lineHeight: 1.7 }}>
              병원 마케팅 10년, 현지어 전담팀이 상담에서 내원까지 직접 운영합니다.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
              <Link href="/time/diagnosis" className="btn-primary">우리 병원 맞춤 진단 받기</Link>
              <a href="#how" className="btn-ghost">어떻게 일하나요</a>
            </div>
          </div>
        </section>

        {/* 2. 신뢰 배지 한 줄 */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", borderBottom: "1px solid rgba(255,255,255,.1)", background: "#050505", position: "relative", zIndex: 20 }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
            {BADGES.map((b) => {
              const body = (
                <>
                  <span style={{ display: "block", fontSize: ".75rem", color: "rgba(255,255,255,.5)", marginBottom: 6 }}>{b.k}</span>
                  <span style={{ display: "block", fontSize: ".95rem", fontWeight: 800, color: "#fff", wordBreak: "keep-all" }}>
                    {b.v}
                    {b.href && <span style={{ color: RED, marginLeft: 6 }}>↗</span>}
                  </span>
                </>
              );
              const st = { padding: "1.6rem 1rem 1.6rem 0", textDecoration: "none", display: "block" } as const;
              return b.href ? (
                <a key={b.k} href={b.href} target="_blank" rel="noopener noreferrer" style={st}>{body}</a>
              ) : (
                <div key={b.k} style={st}>{body}</div>
              );
            })}
          </div>
        </section>

        {/* 3. 구조: 국내 기반 위에 해외 3개국을 쌓는다 */}
        <section id="markets" style={{ position: "relative", zIndex: 20, padding: "7rem 0 5rem" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
            <p className="font-mono-sys" style={label}>HOW WE BUILD</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.25, marginBottom: 14, wordBreak: "keep-all" }}>
              국내에서 다진 기반 위에,<br /><span style={{ color: RED }}>해외 환자를 쌓습니다.</span>
            </h2>
            <p style={{ fontSize: "clamp(.9rem, 1.6vw, 1.05rem)", color: "rgba(255,255,255,.6)", maxWidth: 620, lineHeight: 1.7, marginBottom: "3rem", wordBreak: "keep-all" }}>
              해외 환자도 결국 한국 병원의 홈페이지·후기·블로그를 보고 결정합니다. 국내에서 만든 콘텐츠를 현지팀이 그대로 받아 나라별로 옮깁니다.
            </p>

            {/* 윗층: 해외 3개국 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.1)", borderBottom: "none" }}>
              {MARKETS.slice(1).map((m) => (
                <article key={m.name} style={{ background: "#0a0a0a", padding: "1.8rem 1.6rem", display: "flex", flexDirection: "column" }}>
                  <span className="font-mono-sys" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(255,255,255,.4)" }}>{m.en} · 확장</span>
                  <h3 style={{ fontSize: "1.7rem", fontWeight: 900, margin: "6px 0 4px" }}>{m.name}</h3>
                  <span style={{ fontSize: ".75rem", color: "#E7C46A", fontWeight: 600 }}>{m.channels}</span>
                  <p style={{ margin: "1.2rem 0 .8rem", fontSize: "1rem", fontWeight: 700, lineHeight: 1.5, wordBreak: "keep-all" }}>{m.lead}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.4rem", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                    {m.items.map((t) => (
                      <li key={t} style={{ fontSize: ".86rem", color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>— {t}</li>
                    ))}
                  </ul>
                  <a href={m.href} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontWeight: 800, fontSize: ".88rem", textDecoration: "none", borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: ".9rem", display: "flex", justifyContent: "space-between" }}>
                    {m.name}마케팅 제안서 <span style={{ color: RED }}>↗</span>
                  </a>
                </article>
              ))}
            </div>

            {/* 연결: 국내 콘텐츠가 위로 올라간다 */}
            <div aria-hidden style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: "#0a0a0a", borderLeft: "1px solid rgba(255,255,255,.1)", borderRight: "1px solid rgba(255,255,255,.1)" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", justifyContent: "center" }}>
                  <span style={{ width: 2, height: 28, background: `linear-gradient(to top, ${RED}, transparent)` }} />
                </div>
              ))}
            </div>

            {/* 아랫층: 국내 = 기반 */}
            {(() => {
              const k = MARKETS[0];
              return (
                <article style={{ background: RED, padding: "2rem 1.8rem", display: "flex", flexWrap: "wrap", gap: "1.4rem 3rem", alignItems: "center" }}>
                  <div style={{ flex: "1 1 280px" }}>
                    <span className="font-mono-sys" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(255,255,255,.75)" }}>{k.en} · 기반</span>
                    <h3 style={{ fontSize: "2.2rem", fontWeight: 900, margin: "6px 0 4px" }}>국내 마케팅</h3>
                    <p style={{ fontSize: "1.05rem", fontWeight: 700, wordBreak: "keep-all" }}>{k.lead} · {k.channels}</p>
                  </div>
                  <ul style={{ flex: "1 1 280px", listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px 1.5rem" }}>
                    {k.items.map((t) => (
                      <li key={t} style={{ fontSize: ".9rem", fontWeight: 600 }}>— {t}</li>
                    ))}
                  </ul>
                  <a href={k.href} target="_blank" rel="noopener noreferrer" style={{ flex: "0 0 auto", background: "#fff", color: "#0f172a", fontWeight: 800, fontSize: ".9rem", textDecoration: "none", padding: "12px 18px" }}>
                    국내마케팅 제안서 ↗
                  </a>
                </article>
              );
            })()}
          </div>
        </section>

        {/* 4. 일하는 방식: 시간 채우기 X → 진단·제안 3단계 → 데이터 운영 순환 */}
        <section id="how" style={{ position: "relative", zIndex: 20, padding: "7rem 0 6rem", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
            <p className="font-mono-sys" style={label}>HOW WE WORK</p>
            <h2 style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.02em", wordBreak: "keep-all" }}>
              시간을 채우는 마케팅은<br /><span style={{ color: RED }}>하지 않습니다.</span>
            </h2>
            <p style={{ marginTop: 20, fontSize: "clamp(.95rem, 1.6vw, 1.1rem)", color: "rgba(255,255,255,.65)", maxWidth: 640, lineHeight: 1.75, wordBreak: "keep-all" }}>
              블로그 몇 건, 광고 몇 시간을 정해두고 채우는 방식이 아닙니다. 병원이 지금 무엇을 원하고 어떤 상황인지부터 판단하고, 국내든 해외든 필요한 것만 맞춰 진행합니다.
            </p>

            {/* PHASE 1 */}
            <div className="hw-phase">
              <div className="hw-rail">
                <span className="font-mono-sys" style={{ fontSize: 12, color: RED, letterSpacing: ".15em" }}>PHASE 1</span>
                <h3 style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", fontWeight: 900, margin: "8px 0 10px", wordBreak: "keep-all" }}>맞춤형 진단과 제안</h3>
                <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7, wordBreak: "keep-all" }}>계약 전에 먼저 봅니다. 제안서는 진단 결과로 만듭니다.</p>
              </div>
              <ol className="hw-steps">
                {DIAG.map((d, i) => (
                  <li key={d.t} className="hw-step">
                    <span className="font-mono-sys" style={{ fontSize: 12, color: "rgba(255,255,255,.45)" }}>STEP {i + 1}</span>
                    <h4 style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)", fontWeight: 800, margin: "6px 0 10px", wordBreak: "keep-all" }}>{d.t}</h4>
                    <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.7)", lineHeight: 1.75, wordBreak: "keep-all" }}>{d.d}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {d.checks.map((c) => (
                        <li key={c} style={{ fontSize: 12, padding: "4px 10px", border: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.8)" }}>{c}</li>
                      ))}
                    </ul>
                    <p style={{ marginTop: 14, fontSize: ".85rem", fontWeight: 700 }}>
                      <span style={{ color: RED }}>받으시는 것 · </span>{d.out}
                    </p>
                    {d.docs.length > 0 && (
                      <div className="hw-docs">
                        {d.docs.map((doc) => (
                          <a key={doc.src} href={doc.src} target="_blank" rel="noopener noreferrer" className="hw-doc">
                            <span className="hw-paper"><img src={doc.src} alt={doc.cap} loading="lazy" /></span>
                            <span style={{ display: "block", marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.55)" }}>{doc.cap} ↗</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* PHASE 2 */}
            <div className="hw-phase">
              <div className="hw-rail">
                <span className="font-mono-sys" style={{ fontSize: 12, color: RED, letterSpacing: ".15em" }}>PHASE 2</span>
                <h3 style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", fontWeight: 900, margin: "8px 0 10px", wordBreak: "keep-all" }}>데이터로 돌리는 매달 운영</h3>
                <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7, wordBreak: "keep-all" }}>감으로 다음 달을 정하지 않습니다. 실제 예약·내원 데이터로 정합니다.</p>
              </div>
              <ol className="hw-steps">
                {RUN.map((d, i) => (
                  <li key={d.t} className="hw-step">
                    <span className="font-mono-sys" style={{ fontSize: 12, color: "rgba(255,255,255,.45)" }}>STEP {i + 4}{i > 0 ? " · 매달 반복" : ""}</span>
                    <h4 style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)", fontWeight: 800, margin: "6px 0 10px", wordBreak: "keep-all" }}>{d.t}</h4>
                    <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.7)", lineHeight: 1.75, wordBreak: "keep-all" }}>{d.d}</p>
                    <p style={{ marginTop: 14, fontSize: ".85rem", fontWeight: 700 }}>
                      <span style={{ color: RED }}>받으시는 것 · </span>{d.out}
                    </p>
                    {d.docs.length > 0 && (
                      <div className="hw-docs">
                        {d.docs.map((doc) => (
                          <a key={doc.src} href={doc.src} target="_blank" rel="noopener noreferrer" className="hw-doc">
                            <span className="hw-paper"><img src={doc.src} alt={doc.cap} loading="lazy" /></span>
                            <span style={{ display: "block", marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.55)" }}>{doc.cap} ↗</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
                <li aria-hidden className="font-mono-sys" style={{ fontSize: 12, color: "rgba(255,255,255,.45)", paddingLeft: 28 }}>↻ STEP 6 → STEP 5 로 돌아가 다음 달을 다시 분석합니다</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 5. 국내+해외를 한 번에 맡기면 */}
        <section style={{ position: "relative", zIndex: 20, padding: "7rem 0 5rem", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
            <p className="font-mono-sys" style={label}>ONE TEAM</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.25, marginBottom: "2.6rem", wordBreak: "keep-all" }}>
              국내와 해외를 <span style={{ color: RED }}>한 번에 맡기면</span> 달라지는 것
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.1)" }}>
              {[
                { t: "따로 맡기면", c: "rgba(255,255,255,.55)", rows: ["국내 업체와 해외 업체가 콘텐츠를 각각 새로 만듭니다", "병원 톤과 설명이 나라마다 달라집니다", "원장님이 두 곳에 같은 설명을 반복합니다", "성과 보고서가 따로 와서 비교가 안 됩니다"] },
                { t: "한 번에 맡기면", c: "#fff", rows: ["국내에서 만든 사진·영상·후기 원본을 해외팀이 바로 옮겨 씁니다", "같은 기준으로 나라별 표현만 현지화합니다", "창구는 PM 한 명, 미팅도 한 번입니다", "국내·해외 성과를 한 보고서에서 같이 봅니다"] },
              ].map((col, i) => (
                <div key={col.t} style={{ background: i ? "linear-gradient(160deg, rgba(230,51,41,.16), #0a0a0a 60%)" : "#0a0a0a", padding: "2rem 1.8rem" }}>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: "1.2rem", color: i ? RED : "rgba(255,255,255,.7)" }}>{col.t}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {col.rows.map((r) => (
                      <li key={r} style={{ fontSize: ".95rem", lineHeight: 1.6, color: col.c, wordBreak: "keep-all" }}>{i ? "✓ " : "— "}{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 첫 흐름 — 위에서 아래로 읽어 내리는 타임라인 */}
            <h3 style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)", fontWeight: 900, margin: "4.5rem 0 2rem" }}>국내·해외를 함께 시작하면 이렇게 흘러갑니다</h3>
            <ol className="flow">
              {FLOW.map((f, i) => (
                <li key={f.t} className="flow-step">
                  <span className="flow-when">{f.when}</span>
                  <h4 className="flow-title">{f.t}</h4>
                  <p className="flow-desc">{f.d}</p>
                  <ul className="flow-checks">
                    {f.checks.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <p className="flow-out"><span style={{ color: RED }}>받으시는 것 · </span>{f.out}</p>
                  {i === FLOW.length - 1 && <span className="flow-end">여기까지가 한 바퀴입니다. 다음 달도 같은 순서로 돕니다.</span>}
                </li>
              ))}
            </ol>

            {/* 상품 단계 */}
            <h3 style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)", fontWeight: 900, margin: "4.5rem 0 1.6rem" }}>병원 상황에 맞춰 고르는 4단계</h3>
            <div className="hw-tiers">
              {tiers.map((p) => (
                <Link key={p.price} href={`/time/quote?door=domestic&pick=${p.pick}`} className="hw-tier" data-both={p.both ? "1" : "0"}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: p.both ? RED : "rgba(255,255,255,.5)" }}>{p.label}</span>
                  <p style={{ margin: "8px 0 4px" }}><strong style={{ fontSize: "2rem", fontWeight: 900 }}>{p.price}</strong><span style={{ fontSize: ".9rem" }}> 만원 / 월</span></p>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: 6 }}>{p.name}</h4>
                  <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.65)", lineHeight: 1.55, wordBreak: "keep-all" }}>{p.desc}</p>
                  <span style={{ marginTop: "auto", paddingTop: 14, fontSize: ".82rem", fontWeight: 700, color: p.both ? RED : "rgba(255,255,255,.55)" }}>견적에 담기 →</span>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 12, fontSize: ".8rem", color: "rgba(255,255,255,.45)" }}>광고비·의료광고 심의 수수료는 별도입니다.</p>

            {/* 견적 의뢰로 바로 보내는 자리 */}
            <div style={{ marginTop: "2.2rem", display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <Link href="/time/quote" className="quote-cta">견적 바로가기 <span aria-hidden>→</span></Link>
              <p style={{ margin: 0, fontSize: ".9rem", color: "rgba(255,255,255,.6)", lineHeight: 1.6, wordBreak: "keep-all" }}>
                병원 상황을 고르면 구성과 금액을 바로 보여드리고, 그 자리에서 견적을 받아보실 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 6. 로고 */}
        <ClientMarquee />

        {/* 7. 포트폴리오 — 카테고리만 먼저 공개(사례 정리 중) */}
        <section id="portfolio" style={{ position: "relative", zIndex: 20, padding: "4rem 0 5rem", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
            <p className="font-mono-sys" style={label}>PORTFOLIO</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)", fontWeight: 900, marginBottom: 10, wordBreak: "keep-all" }}>분야별 포트폴리오</h2>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".92rem", marginBottom: "2.4rem", wordBreak: "keep-all" }}>분야마다 대표 작업을 먼저 보여드립니다. 더 보고 싶으시면 분야별로 전체를 열어보실 수 있습니다.</p>

            {previewGroups.map((g) => (
              <div key={g.key} className="pf-group">
                <div className="pf-head">
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "-.02em" }}>
                      {g.label}
                      <span style={{ marginLeft: 8, fontSize: ".82rem", fontWeight: 700, color: "rgba(255,255,255,.4)" }}>{g.total}건</span>
                    </h3>
                    <p style={{ margin: "6px 0 0", fontSize: ".88rem", color: "rgba(255,255,255,.55)", wordBreak: "keep-all" }}>{g.desc}</p>
                  </div>
                  <Link href={`/time/portfolio?group=${g.key}`} className="pf-more">더 보러 가기 →</Link>
                </div>
                <div className="pf-grid">
                  {g.items.map((it) => (
                    <PortfolioCard key={it.id} item={it} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 마케팅 인사이트 (기존 메인과 동일) */}
        {posts.length > 0 && (
          <section style={{ position: "relative", zIndex: 20, padding: "5rem 0 2rem", borderTop: "1px solid rgba(255,255,255,.08)" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <p className="font-mono-sys" style={label}>MARKETING INSIGHTS</p>
                  <h2 style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)", fontWeight: 900 }}>마케팅 인사이트</h2>
                </div>
                <Link href="/time/blog" style={{ color: "#E7C46A", fontSize: ".85rem", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
                  전체 보기 →
                </Link>
              </div>
              <TimeBlogCarousel posts={posts} />
            </div>
          </section>
        )}

        <FaqSection items={TIME_FAQ} />
        <CTASection />
        <Footer />
      </main>
      <KakaoFloat />
      {/* SEO: 검색엔진 크롤러용 숨김 텍스트 (시맨틱 콘텐츠) */}
      <div className="sr-only" aria-hidden="false">
        <h1>열정의시간 - 병원 마케팅 전문 에이전시</h1>
        <p>
          열정의시간은 10년 이상의 노하우를 가진 병원 마케팅 전문 에이전시입니다.
          국내 통합 마케팅(블로그 SEO, 영상 제작, SNS 운영, 네이버 플레이스, 바이럴 마케팅)부터
          해외환자 유치 마케팅(일본 마케팅, 중국 마케팅, 대만 마케팅)까지 원스톱으로 제공합니다.
        </p>
        <h2>국내 마케팅 서비스</h2>
        <p>
          병원 블로그 SEO, 숏츠 영상 제작, 유튜브 채널 운영, 인스타그램 관리,
          강남언니·바비톡·여신티켓 플랫폼 대행, 네이버 플레이스 최적화, 병원 광고 대행.
          마케팅 PM이 병원 인하우스 역할을 수행하며 의료광고 심의까지 대행합니다.
        </p>
        <h2>해외 마케팅 서비스</h2>
        <p>
          일본팀: 라인, 인스타그램, 틱톡 기반 현지화 콘텐츠 운영.
          중국팀: 샤오홍슈, 웨이보, 더우인, 왕홍 KOL 직접 섭외 및 운영.
          대만팀: 현지 파트너 네트워크 활용 마케팅.
          모든 채널과 계정은 클리닉 소유로 개설되어 에이전시 종속이 없습니다.
        </p>
        <h2>해외환자 유치 프로세스</h2>
        <p>
          해외환자 유치업 등록 기반 합법적 프로세스 운영, 통역, 픽업, 상담 스크립트,
          CS 매뉴얼 제공, 국가별 플랫폼 리뷰 관리. 초기 세팅 완료 후 3개월 내 첫 해외 환자 내원을 목표로 합니다.
        </p>
        <h2>병원 마케팅 에이전시 열정의시간에 문의하기</h2>
        <p>
          무료 전략 상담을 통해 현재 마케팅 비용 누수 진단, 채널 우선순위 분석,
          해외 진출 최적 루트 설계, 월 예산별 현실적 성과 예측을 받아보세요.
          카카오톡 채널: 열정의시간 (pf.kakao.com/_RgYcxj)
        </p>
      </div>
    </>
  );
}
