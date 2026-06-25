// 열정의시간 포트폴리오 데이터 (단일 소스)
// /time/portfolio 창 + /time 메인 진입 섹션이 함께 사용한다.
// 작품을 계속 쌓을 때 이 배열에 항목만 추가하면 양쪽에 자동 반영된다.
//
// ── 분류 체계 ────────────────────────────────────────────────────
// 1차 = 마케팅 권역(region): 국내마케팅 / 일본마케팅 / 중국마케팅 / 대만마케팅
//        한 작업이 여러 권역에 걸치면 regions 배열에 여러 개를 넣는다.
// 2차 = 작업 유형(category): 홈페이지 제작 / 영상 / SNS·콘텐츠
//   ※ 포트폴리오는 "고객사(클라이언트) 작업"만 노출한다. 자사 사이트는 제외.
//
// ── 항목 추가/수정 방법 ──────────────────────────────────────────
// 1) thumbnail: public/portfolio/<id>.png 에 캡처 이미지를 넣는다(없으면 브랜드색 폴백).
// 2) liveUrl: 살아있는 주소를 넣으면 카드 클릭 시 새 탭으로 이동.
//    캡처 이미지만 있고 주소가 없으면 liveUrl 을 비운다 → 클릭 시 이미지 확대.
// 3) featured: true 인 항목이 /time 메인 진입 섹션 미리보기에 노출된다.
// ─────────────────────────────────────────────────────────────────

export type PortfolioRegion = "domestic" | "japan" | "china" | "taiwan";
export type PortfolioCategory = "homepage" | "video" | "sns";

export type PortfolioItem = {
  id: string;
  regions: PortfolioRegion[];
  category: PortfolioCategory;
  title: string;
  summary: string;
  thumbnail?: string;
  liveUrl?: string;
  expired?: boolean;
  tags?: string[];
  featured?: boolean;
  accent?: string;
};

// 1차 탭: 마케팅 권역
export const portfolioRegions: { key: PortfolioRegion; label: string }[] = [
  { key: "domestic", label: "국내마케팅" },
  { key: "japan", label: "일본마케팅" },
  { key: "china", label: "중국마케팅" },
  { key: "taiwan", label: "대만마케팅" },
];

// 2차 탭: 작업 유형. ready:false 는 "준비중"으로 비활성 표시.
export const portfolioCategories: {
  key: PortfolioCategory;
  label: string;
  ready: boolean;
}[] = [
  { key: "homepage", label: "홈페이지 제작", ready: true },
  { key: "sns", label: "SNS · 콘텐츠", ready: true },
  { key: "video", label: "영상", ready: false },
];

export const portfolioItems: PortfolioItem[] = [
  // ── 국내마케팅 · 멜로우피부과 ────────────────────────────────
  {
    id: "mellow-sinsa",
    regions: ["domestic"],
    category: "homepage",
    title: "멜로우피부과 (브랜드)",
    summary: "피부과 그룹 브랜드 홈페이지",
    thumbnail: "/portfolio/mellow-sinsa.png",
    liveUrl: "https://www.doctormellow.com",
    tags: ["의료", "반응형", "브랜드"],
    featured: true,
    accent: "#db2777",
  },
  {
    id: "mellow-cheonho",
    regions: ["domestic"],
    category: "homepage",
    title: "멜로우피부과 천호점",
    summary: "피부과 지점 홈페이지",
    thumbnail: "/portfolio/mellow-cheonho.png",
    liveUrl: "http://doctormellow-ch.com",
    tags: ["의료", "반응형"],
    accent: "#db2777",
  },
  {
    id: "mellow-cheongdam",
    regions: ["domestic"],
    category: "homepage",
    title: "멜로우피부과 청담점",
    summary: "피부과 지점 홈페이지",
    thumbnail: "/portfolio/mellow-cheongdam.png",
    liveUrl: "http://doctormellow-cd.com",
    tags: ["의료", "반응형"],
    accent: "#db2777",
  },
  {
    id: "mellow-gangbuk",
    regions: ["domestic"],
    category: "homepage",
    title: "멜로우피부과 강북본점",
    summary: "피부과 지점 홈페이지",
    thumbnail: "/portfolio/mellow-gangbuk.png",
    liveUrl: "http://doctormellow-db.com",
    tags: ["의료", "반응형"],
    accent: "#db2777",
  },
  {
    id: "mellow-sinsa-branch",
    regions: ["domestic"],
    category: "homepage",
    title: "멜로우피부과 신사점",
    summary: "피부과 지점 홈페이지",
    thumbnail: "/portfolio/mellow-sinsa-branch.png",
    liveUrl: "http://doctormellow-ss.com",
    tags: ["의료", "반응형"],
    accent: "#db2777",
  },

  // ── 국내마케팅 · 요식업 브랜드 홈페이지 ──────────────────────
  {
    id: "rest-seogwan",
    regions: ["domestic"],
    category: "homepage",
    title: "서관면옥",
    summary: "평양냉면 전문점 브랜드 홈페이지",
    thumbnail: "/portfolio/rest-seogwan.png",
    liveUrl: "http://seogwanmyeonog.kr",
    tags: ["요식업", "브랜드"],
    featured: true,
    accent: "#c2410c",
  },
  {
    id: "rest-hayanjib",
    regions: ["domestic"],
    category: "homepage",
    title: "하얀집",
    summary: "나주곰탕 전문점(since 1910) 브랜드 홈페이지",
    thumbnail: "/portfolio/rest-hayanjib.png",
    tags: ["요식업", "브랜드"],
    accent: "#b45309",
  },
  {
    id: "rest-hongeojin",
    regions: ["domestic"],
    category: "homepage",
    title: "신설홍어진",
    summary: "국내산 홍어 전문점 브랜드 홈페이지",
    thumbnail: "/portfolio/rest-hongeojin.png",
    liveUrl: "http://hongeojin.com",
    tags: ["요식업", "브랜드"],
    accent: "#9a3412",
  },
  {
    id: "rest-itaewon",
    regions: ["domestic"],
    category: "homepage",
    title: "이자까야 천상",
    summary: "이태원 25년 전통 이자카야 창업 브랜드 홈페이지",
    thumbnail: "/portfolio/rest-itaewon.png",
    liveUrl: "https://www.10040.co.kr",
    tags: ["요식업", "브랜드"],
    accent: "#a16207",
  },
  {
    id: "rest-kimchiok",
    regions: ["domestic"],
    category: "homepage",
    title: "김치옥",
    summary: "김치찌개 창업 프랜차이즈 브랜드 홈페이지",
    thumbnail: "/portfolio/rest-kimchiok.png",
    liveUrl: "https://kimchi-ok.com",
    tags: ["요식업", "브랜드"],
    accent: "#ca8a04",
  },
  {
    id: "rest-kksarada",
    regions: ["domestic"],
    category: "homepage",
    title: "크크사라다",
    summary: "수제 사라다빵 브랜드 홈페이지",
    thumbnail: "/portfolio/rest-kksarada.png",
    tags: ["요식업", "브랜드"],
    accent: "#ea580c",
  },
  {
    id: "rest-pyongan",
    regions: ["domestic"],
    category: "homepage",
    title: "평안면옥",
    summary: "평양냉면 전문점(3대 전통) 브랜드 홈페이지",
    thumbnail: "/portfolio/rest-pyongan.png",
    liveUrl: "http://pyoungan-myeonok.com",
    tags: ["요식업", "브랜드"],
    accent: "#92400e",
  },
  {
    id: "rest-ssangkyo",
    regions: ["domestic"],
    category: "homepage",
    title: "쌍교숯불갈비",
    summary: "숯불갈비 전문점(since 1995) 브랜드 홈페이지",
    thumbnail: "/portfolio/rest-ssangkyo.png",
    liveUrl: "http://ssangkyo.com",
    tags: ["요식업", "브랜드"],
    accent: "#78350f",
  },

  // ── 국내마케팅 · 올라라의원 (한국 메인) ──────────────────────
  {
    id: "olara",
    regions: ["domestic"],
    category: "homepage",
    title: "올라라의원 (한국)",
    summary: "압구정 피부과 · 리프팅 — 한국 메인 사이트",
    thumbnail: "/portfolio/olara.png",
    liveUrl: "https://www.olara.co.kr",
    tags: ["의료", "브랜드"],
    featured: true,
    accent: "#7c3aed",
  },

  // ── 일본마케팅 · 홈페이지 ────────────────────────────────────
  {
    id: "mellow-jp",
    regions: ["japan"],
    category: "homepage",
    title: "멜로우피부과 (일본)",
    summary: "일본어 브랜드 사이트 (LINE·X 채널)",
    thumbnail: "/portfolio/mellow-jp.png",
    liveUrl: "http://jp.doctormellow.com",
    tags: ["의료", "일본어", "브랜드"],
    featured: true,
    accent: "#2563eb",
  },
  {
    id: "mellow-sinsa-jp",
    regions: ["japan"],
    category: "homepage",
    title: "멜로우 신사 · 일본 랜딩",
    summary: "일본 환자 유치 LINE 랜딩페이지",
    thumbnail: "/portfolio/mellow-sinsa-jp.png",
    tags: ["의료", "일본어", "랜딩"],
    accent: "#db2777",
  },

  // ── 일본마케팅 · SNS·콘텐츠 (인플루언서) ─────────────────────
  {
    id: "sns-jp-derma-1",
    regions: ["japan"],
    category: "sns",
    title: "일본 피부과 인스타 릴스 ①",
    summary: "일본 인플루언서 시술 후기 릴스",
    thumbnail: "/portfolio/sns-jp-derma-1.png",
    liveUrl: "https://www.instagram.com/reel/DUFrmHWE3NN/",
    tags: ["인스타그램", "인플루언서", "피부과"],
    accent: "#c13584",
  },
  {
    id: "sns-jp-derma-2",
    regions: ["japan"],
    category: "sns",
    title: "일본 피부과 인스타 릴스 ②",
    summary: "일본 인플루언서 시술 후기 릴스",
    thumbnail: "/portfolio/sns-jp-derma-2.png",
    liveUrl: "https://www.instagram.com/reel/DSzsqsgE5Lc/",
    tags: ["인스타그램", "인플루언서", "피부과"],
    accent: "#c13584",
  },
  {
    id: "sns-jp-derma-3",
    regions: ["japan"],
    category: "sns",
    title: "일본 피부과 인스타 릴스 ③",
    summary: "일본 인플루언서 시술 후기 릴스",
    thumbnail: "/portfolio/sns-jp-derma-3.png",
    liveUrl: "https://www.instagram.com/reel/DUAa48bkok0/",
    tags: ["인스타그램", "인플루언서", "피부과"],
    accent: "#c13584",
  },
  {
    id: "sns-jp-food-1",
    regions: ["japan"],
    category: "sns",
    title: "일본 맛집 인스타 릴스",
    summary: "일본 타겟 맛집 콘텐츠 릴스",
    thumbnail: "/portfolio/sns-jp-food-1.png",
    liveUrl: "https://www.instagram.com/reel/DT7aFS0jzl3/",
    tags: ["인스타그램", "인플루언서", "맛집"],
    accent: "#c13584",
  },

  // ── 중국마케팅 · 홈페이지 ────────────────────────────────────
  {
    id: "olara-cn",
    regions: ["china"],
    category: "homepage",
    title: "올라라의원 (중국·간체)",
    summary: "중국(간체) 현지화 페이지 — 위챗·샤오홍슈",
    thumbnail: "/portfolio/olara-cn.png",
    liveUrl: "https://www.olara.co.kr/cn",
    tags: ["의료", "중국어", "간체"],
    featured: true,
    accent: "#7c3aed",
  },
  {
    id: "mellow-cn",
    regions: ["china"],
    category: "homepage",
    title: "멜로우피부과 (중국·간체)",
    summary: "중국어 브랜드 사이트 (위챗·샤오홍슈)",
    thumbnail: "/portfolio/mellow-cn.png",
    liveUrl: "http://cn.doctormellow.com",
    tags: ["의료", "중국어", "간체"],
    accent: "#dc2626",
  },

  // ── 중국마케팅 · SNS·콘텐츠 (기자단) ─────────────────────────
  {
    id: "sns-cn-1",
    regions: ["china"],
    category: "sns",
    title: "중국 샤오홍슈 기자단 ①",
    summary: "샤오홍슈 피부과 기자단 콘텐츠",
    liveUrl: "https://www.xiaohongshu.com/explore/68d601f20000000012021e8c?xsec_token=ABtPSW56NuK0arBdnJTEav1acuFNlYi8712I1fO2IOwa0=&xsec_source=pc_search&source=web_search_result_notes",
    tags: ["샤오홍슈", "기자단", "피부과"],
    accent: "#ff2442",
  },
  {
    id: "sns-cn-2",
    regions: ["china"],
    category: "sns",
    title: "중국 샤오홍슈 기자단 ②",
    summary: "샤오홍슈 피부과 기자단 콘텐츠",
    liveUrl: "https://www.xiaohongshu.com/explore/697a306e000000002102b4fc?xsec_token=ABnulpnOnEX1pqkM_GqYFQUmskZhoe83oRB7Zugp2v7us=&xsec_source=pc_search&source=web_search_result_notes",
    tags: ["샤오홍슈", "기자단", "피부과"],
    accent: "#ff2442",
  },
  {
    id: "sns-cn-3",
    regions: ["china"],
    category: "sns",
    title: "중국 샤오홍슈 기자단 ③",
    summary: "샤오홍슈 피부과 기자단 콘텐츠",
    liveUrl: "https://www.xiaohongshu.com/explore/694a3b1f000000000d0353a5?xsec_token=ABW7hB8EFjS8GN3YXYFI9C-lg8oV648k4Ulmvm5XnhENo=&xsec_source=pc_search&source=web_search_result_notes",
    tags: ["샤오홍슈", "기자단", "피부과"],
    accent: "#ff2442",
  },
  {
    id: "sns-cn-4",
    regions: ["china"],
    category: "sns",
    title: "중국 더우인 기자단",
    summary: "더우인(중국판 틱톡) 피부과 기자단 영상",
    liveUrl: "https://www.douyin.com/video/7574297539656432521",
    tags: ["더우인", "기자단", "피부과"],
    accent: "#fe2c55",
  },
  {
    id: "sns-cn-5",
    regions: ["china"],
    category: "sns",
    title: "중국 샤오홍슈 기자단 ④",
    summary: "샤오홍슈 피부과 기자단 콘텐츠",
    liveUrl: "https://www.xiaohongshu.com/explore/682acef000000000220075d0?xsec_token=ABOOODCD0_6nf46tZDX-Fhb5h-w_ajjEPfkL2oOQI8wQc=&xsec_source=pc_search&source=web_search_result_notes",
    tags: ["샤오홍슈", "기자단", "피부과"],
    accent: "#ff2442",
  },

  // ── 대만마케팅 · 홈페이지 ────────────────────────────────────
  {
    id: "olara-tw",
    regions: ["taiwan"],
    category: "homepage",
    title: "올라라의원 (대만·번체)",
    summary: "대만(번체) 현지화 페이지 14p — 가장 완성도 높은 외국어판",
    thumbnail: "/portfolio/olara-tw.png",
    liveUrl: "https://www.olara.co.kr/tw",
    tags: ["의료", "번체", "대만"],
    featured: true,
    accent: "#7c3aed",
  },

  // ── 대만마케팅 · SNS·콘텐츠 (인플루언서) ─────────────────────
  {
    id: "sns-tw-derma-1",
    regions: ["taiwan"],
    category: "sns",
    title: "대만 피부과 인스타 릴스",
    summary: "중화권(대만·홍콩) 인플루언서 피부과 릴스",
    liveUrl: "https://www.instagram.com/reel/DAOGh3Wyubr/",
    tags: ["인스타그램", "인플루언서", "피부과"],
    accent: "#c13584",
  },
  {
    id: "sns-tw-derma-2",
    regions: ["taiwan"],
    category: "sns",
    title: "대만 피부과 인스타 게시물",
    summary: "중화권(대만·홍콩) 인플루언서 피부과 게시물",
    liveUrl: "https://www.instagram.com/p/DPq9nAoE8il/",
    tags: ["인스타그램", "인플루언서", "피부과"],
    accent: "#c13584",
  },
];

// ── 헬퍼 ──────────────────────────────────────────────────────────
export function itemsByRegion(region: PortfolioRegion): PortfolioItem[] {
  return portfolioItems.filter((it) => it.regions.includes(region));
}

export function itemsByRegionAndCategory(
  region: PortfolioRegion,
  category: PortfolioCategory,
): PortfolioItem[] {
  return portfolioItems.filter(
    (it) => it.regions.includes(region) && it.category === category,
  );
}

export function regionCount(region: PortfolioRegion): number {
  return itemsByRegion(region).length;
}

export function categoryCountInRegion(
  region: PortfolioRegion,
  category: PortfolioCategory,
): number {
  return itemsByRegionAndCategory(region, category).length;
}

export function featuredItems(limit = 6): PortfolioItem[] {
  const featured = portfolioItems.filter((it) => it.featured);
  const pool = featured.length > 0 ? featured : portfolioItems;
  return pool.slice(0, limit);
}
