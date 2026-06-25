// 열정의시간 포트폴리오 데이터 (단일 소스)
// /time/portfolio 창 + /time 메인 진입 섹션이 함께 사용한다.
// 작품을 계속 쌓을 때 이 배열에 항목만 추가하면 양쪽에 자동 반영된다.
//
// ── 분류 체계 ────────────────────────────────────────────────────
// 1차 = 마케팅 권역(region): 국내마케팅 / 일본마케팅 / 중국마케팅 / 대만마케팅
//        한 작업이 여러 권역에 걸치면 regions 배열에 여러 개를 넣는다(예: 올라라 = 중국+대만).
// 2차 = 작업 유형(category): 홈페이지 / 영상 / SNS·카드뉴스
//        포트폴리오 창에서 권역 탭 → 작업 유형 탭 순으로 좁혀 본다.
//   ※ 포트폴리오는 "고객사(클라이언트) 작업"만 노출한다. 자사 사이트(열정의시간·사람들·공간 등)는 제외.
//
// ── 항목 추가/수정 방법 ──────────────────────────────────────────
// 1) thumbnail: public/portfolio/<id>.png 에 캡처 이미지를 넣는다.
//    (이미지가 아직 없으면 카드가 자동으로 브랜드 색 폴백으로 표시됨)
// 2) liveUrl: 살아있는 홈페이지 주소를 넣으면 카드 클릭 시 새 탭으로 이동.
//    주소가 없고 캡처 이미지만 있으면 liveUrl 을 비운다 → 클릭 시 이미지 확대(라이트박스).
// 3) featured: true 인 항목이 /time 메인 진입 섹션 미리보기에 노출된다.
// ─────────────────────────────────────────────────────────────────

export type PortfolioRegion = "domestic" | "japan" | "china" | "taiwan";
export type PortfolioCategory = "homepage" | "video" | "sns";

export type PortfolioItem = {
  id: string;                  // 고유 kebab-case (= 썸네일 파일명 기본값)
  regions: PortfolioRegion[];  // 마케팅 권역(복수 가능)
  category: PortfolioCategory; // 작업 유형
  title: string;               // 작품명
  summary: string;             // 한 줄 설명(제작/운영 범위)
  thumbnail?: string;          // /portfolio/<id>.png — 없으면 색 폴백
  liveUrl?: string;            // 있으면 클릭 시 새 탭 이동
  expired?: boolean;           // true면 라이브 대신 이미지 라이트박스
  tags?: string[];             // "의료","일본어","브랜드" 등
  featured?: boolean;          // 메인 진입 섹션 노출
  accent?: string;             // 폴백 카드 배경 그라데이션 기준색(hex)
};

// 1차 탭: 마케팅 권역
export const portfolioRegions: { key: PortfolioRegion; label: string }[] = [
  { key: "domestic", label: "국내마케팅" },
  { key: "japan", label: "일본마케팅" },
  { key: "china", label: "중국마케팅" },
  { key: "taiwan", label: "대만마케팅" },
];

// 2차 탭: 작업 유형. ready:false 는 "준비중"으로 비활성 표시된다.
// 영상/SNS 포트폴리오는 나중에 ready:true 로 바꾸고 항목만 추가하면 된다.
export const portfolioCategories: {
  key: PortfolioCategory;
  label: string;
  ready: boolean;
}[] = [
  { key: "homepage", label: "홈페이지 제작", ready: true },
  { key: "video", label: "영상", ready: false },
  { key: "sns", label: "SNS · 카드뉴스", ready: false },
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
    featured: true,
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
    featured: true,
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
    featured: true,
    accent: "#78350f",
  },

  // ── 일본마케팅 ──────────────────────────────────────────────
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

  // ── 중국·대만 마케팅 ────────────────────────────────────────
  {
    id: "olara",
    regions: ["china", "taiwan"],
    category: "homepage",
    title: "올라라의원",
    summary: "중화권(중국·대만) 마케팅 페이지 제작 · 운영",
    thumbnail: "/portfolio/olara.png",
    liveUrl: "https://www.olara.co.kr",
    tags: ["의료", "중국어", "대만"],
    featured: true,
    accent: "#7c3aed",
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
