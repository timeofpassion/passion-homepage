// 열정의시간 포트폴리오 데이터 (단일 소스)
// /time/portfolio 창 + /time 메인 진입 섹션이 함께 사용한다.
// 작품을 계속 쌓을 때 이 배열에 항목만 추가하면 양쪽에 자동 반영된다.
//
// ── 항목 추가/수정 방법 ──────────────────────────────────────────
// 1) thumbnail: public/portfolio/<id>.webp 에 캡처 이미지를 넣는다.
//    (이미지가 아직 없으면 카드가 자동으로 브랜드 색 폴백으로 표시됨, 확장자 .png)
// 2) liveUrl: 살아있는 홈페이지 주소를 넣으면 카드 클릭 시 새 탭으로 이동.
//    주소가 없거나 운영 종료된 작품은 liveUrl 을 비우고 expired: true 로 둔다.
//    → 이 경우 클릭하면 캡처 이미지를 크게 보여준다(라이트박스).
// 3) featured: true 인 항목이 /time 메인 진입 섹션 미리보기에 노출된다.
// ─────────────────────────────────────────────────────────────────

export type PortfolioCategory = "homepage" | "video" | "sns";

export type PortfolioItem = {
  id: string;                  // 고유 kebab-case (= 썸네일 파일명)
  category: PortfolioCategory;
  title: string;               // 작품명
  summary: string;             // 한 줄 설명(제작/운영 범위)
  thumbnail?: string;          // /portfolio/<id>.webp — 없으면 색 폴백
  liveUrl?: string;            // 있으면 클릭 시 새 탭 이동
  expired?: boolean;           // true면 라이브 대신 이미지 라이트박스("운영 종료")
  tags?: string[];             // "의료","일본어","브랜드" 등
  featured?: boolean;          // 메인 진입 섹션 노출
  accent?: string;             // 폴백 카드 배경 그라데이션 기준색(hex)
};

// 카테고리 탭 정의. ready:false 는 "준비중"으로 비활성 표시된다.
// 영상/SNS 포트폴리오는 나중에 ready:true 로 바꾸고 항목만 추가하면 된다.
export const portfolioCategories: {
  key: PortfolioCategory;
  label: string;
  ready: boolean;
}[] = [
  { key: "homepage", label: "홈페이지", ready: true },
  { key: "video", label: "영상", ready: false },
  { key: "sns", label: "SNS · 카드뉴스", ready: false },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "passion-time",
    category: "homepage",
    title: "열정의시간 공식 홈페이지",
    summary: "병원 마케팅 에이전시 브랜드 사이트(본 사이트)",
    thumbnail: "/portfolio/passion-time.png",
    liveUrl: "https://www.timeofpassion.com/time",
    tags: ["자사", "반응형", "브랜드"],
    featured: true,
    accent: "#cc0000",
  },
  {
    id: "passion-people",
    category: "homepage",
    title: "열정의사람들",
    summary: "인플루언서·크리에이터 매칭 브랜드 사이트",
    thumbnail: "/portfolio/passion-people.png",
    liveUrl: "https://www.timeofpassion.com/people",
    tags: ["자사", "브랜드"],
    featured: true,
    accent: "#0ea5e9",
  },
  {
    id: "olara",
    category: "homepage",
    title: "올라라의원",
    summary: "중화권(중국·대만) 마케팅 페이지 제작 · 운영",
    thumbnail: "/portfolio/olara.png",
    liveUrl: "https://www.olara.co.kr",
    tags: ["의료", "중국어", "대만"],
    accent: "#7c3aed",
  },
  {
    id: "mellow-sinsa",
    category: "homepage",
    title: "멜로우피부과 신사점",
    summary: "피부과 브랜드 반응형 홈페이지",
    thumbnail: "/portfolio/mellow-sinsa.png",
    tags: ["의료", "반응형", "브랜드"],
    accent: "#db2777",
  },
  {
    id: "passion-space",
    category: "homepage",
    title: "열정의공간",
    summary: "공간 브랜드 사이트 · 거점 매거진",
    thumbnail: "/portfolio/passion-space.png",
    liveUrl: "https://www.timeofpassion.com/space",
    tags: ["브랜드", "자사"],
    featured: true,
    accent: "#0d9488",
  },
  {
    id: "impetus",
    category: "homepage",
    title: "IMPETVS",
    summary: "향수 브랜드 사이트",
    thumbnail: "/portfolio/impetus.png",
    tags: ["브랜드", "뷰티"],
    accent: "#b45309",
  },
  {
    id: "sm-plastic-jp",
    category: "homepage",
    title: "SM성형외과 (일본)",
    summary: "일본 환자 대상 일본어 사이트",
    thumbnail: "/portfolio/sm-plastic-jp.png",
    tags: ["의료", "일본어"],
    accent: "#2563eb",
  },
  {
    id: "beautyculize",
    category: "homepage",
    title: "뷰티컬라이즈",
    summary: "브랜드 랜딩페이지",
    thumbnail: "/portfolio/beautyculize.png",
    tags: ["랜딩", "뷰티"],
    accent: "#e11d48",
  },
  {
    id: "mellow-sinsa-jp",
    category: "homepage",
    title: "멜로우 신사 · 일본 랜딩",
    summary: "일본 환자 유치 LINE 랜딩페이지",
    thumbnail: "/portfolio/mellow-sinsa-jp.png",
    tags: ["의료", "일본어", "랜딩"],
    accent: "#db2777",
  },
  {
    id: "mellow-cheonho",
    category: "homepage",
    title: "멜로우피부과 천호점",
    summary: "피부과 지점 홈페이지",
    thumbnail: "/portfolio/mellow-cheonho.png",
    tags: ["의료", "반응형"],
    accent: "#db2777",
  },
  {
    id: "ostellomaree",
    category: "homepage",
    title: "OSTELLO MARE",
    summary: "브랜드 사이트",
    thumbnail: "/portfolio/ostellomaree.png",
    tags: ["브랜드"],
    accent: "#0891b2",
  },
  {
    id: "restaurant",
    category: "homepage",
    title: "음식점 브랜드 홈페이지",
    summary: "요식업 브랜드 홈페이지 제작 사례",
    thumbnail: "/portfolio/restaurant.png",
    expired: true,
    tags: ["요식업", "비의료"],
    accent: "#c2410c",
  },
];

// ── 헬퍼 ──────────────────────────────────────────────────────────
export function itemsByCategory(category: PortfolioCategory): PortfolioItem[] {
  return portfolioItems.filter((it) => it.category === category);
}

export function categoryCount(category: PortfolioCategory): number {
  return itemsByCategory(category).length;
}

export function featuredItems(limit = 6): PortfolioItem[] {
  const featured = portfolioItems.filter((it) => it.featured);
  const pool = featured.length > 0 ? featured : portfolioItems;
  return pool.slice(0, limit);
}
