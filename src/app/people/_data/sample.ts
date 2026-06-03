// 열정의사람들 — 샘플(placeholder) 데이터
// ⚠️ 모두 가상 데이터입니다. 실제 인플루언서/포트폴리오/클라이언트 데이터로 교체 예정.
// 교체 시 이 파일의 배열만 바꾸면 화면 전체가 반영됩니다.

export type Country = "JP" | "CN" | "TW";
export type Category =
  | "beauty"
  | "food"
  | "travel"
  | "lifestyle"
  | "fashion"
  | "tech";
export type Platform =
  | "instagram"
  | "youtube"
  | "tiktok"
  | "xiaohongshu"
  | "douyin"
  | "facebook"
  | "x";

export type Channel = {
  platform: Platform;
  url: string;
  followers: number;
};

export type Influencer = {
  id: string;
  name: string;
  country: Country;
  category: Category[];
  profileImage?: string; // 비우면 플레이스홀더 표시
  oneLiner: string;
  exclusive: boolean;
  channels: Channel[];
};

export type ClientType = "medical" | "corporate" | "public";

export type Portfolio = {
  id: string;
  title: string;
  clientName?: string;
  clientType: ClientType;
  country: Country[];
  thumbnail?: string;
  metrics: { views?: number; reach?: number };
  summary: string;
};

export type Client = { name: string; logo?: string; url?: string };

export const COUNTRY_LABEL: Record<Country, string> = {
  JP: "일본",
  CN: "중국",
  TW: "대만",
};
export const COUNTRY_FLAG: Record<Country, string> = {
  JP: "🇯🇵",
  CN: "🇨🇳",
  TW: "🇹🇼",
};
export const CATEGORY_LABEL: Record<Category, string> = {
  beauty: "뷰티",
  food: "푸드",
  travel: "여행",
  lifestyle: "라이프",
  fashion: "패션",
  tech: "테크",
};
export const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  xiaohongshu: "샤오홍슈",
  douyin: "더우인",
  facebook: "Facebook",
  x: "X",
};
export const CLIENT_TYPE_LABEL: Record<ClientType, string> = {
  medical: "의료",
  corporate: "기업",
  public: "공공",
};

// 3개국 현황 (샘플 수치)
export const COUNTRY_STATS: {
  country: Country;
  count: number;
  platforms: string[];
  strength: string;
}[] = [
  {
    country: "JP",
    count: 320,
    platforms: ["Instagram", "X", "YouTube"],
    strength: "도쿄·오사카 핵심 도시 뷰티·라이프 크리에이터 다수 확보",
  },
  {
    country: "CN",
    count: 280,
    platforms: ["샤오홍슈", "더우인"],
    strength: "샤오홍슈·더우인 KOL 직접 운영, 의료·뷰티 전환에 강점",
  },
  {
    country: "TW",
    count: 150,
    platforms: ["Instagram", "Facebook", "YouTube"],
    strength: "현지 파트너 네트워크 기반 신뢰도 높은 추천형 콘텐츠",
  },
];

export const INFLUENCERS: Influencer[] = [
  {
    id: "jp-001",
    name: "사쿠라 미오 (가상)",
    country: "JP",
    category: ["beauty"],
    oneLiner: "도쿄 기반 스킨케어·코스메틱 리뷰 크리에이터",
    exclusive: true,
    channels: [
      { platform: "instagram", url: "#", followers: 184000 },
      { platform: "youtube", url: "#", followers: 92000 },
    ],
  },
  {
    id: "jp-002",
    name: "타카하시 렌 (가상)",
    country: "JP",
    category: ["lifestyle", "travel"],
    oneLiner: "일본 전국 여행·라이프스타일 브이로거",
    exclusive: false,
    channels: [
      { platform: "youtube", url: "#", followers: 240000 },
      { platform: "x", url: "#", followers: 60000 },
    ],
  },
  {
    id: "jp-003",
    name: "유이 (가상)",
    country: "JP",
    category: ["fashion"],
    oneLiner: "하라주쿠 스트릿 패션 인플루언서",
    exclusive: true,
    channels: [{ platform: "instagram", url: "#", followers: 130000 }],
  },
  {
    id: "cn-001",
    name: "린샤오 (林小, 가상)",
    country: "CN",
    category: ["beauty"],
    oneLiner: "샤오홍슈 의료·뷰티 전문 KOL",
    exclusive: true,
    channels: [
      { platform: "xiaohongshu", url: "#", followers: 410000 },
      { platform: "douyin", url: "#", followers: 220000 },
    ],
  },
  {
    id: "cn-002",
    name: "왕레이 (王磊, 가상)",
    country: "CN",
    category: ["food", "travel"],
    oneLiner: "더우인 푸드·여행 쇼트폼 크리에이터",
    exclusive: false,
    channels: [{ platform: "douyin", url: "#", followers: 680000 }],
  },
  {
    id: "cn-003",
    name: "천위 (陈雨, 가상)",
    country: "CN",
    category: ["lifestyle"],
    oneLiner: "상하이 라이프스타일·소비 트렌드 KOL",
    exclusive: false,
    channels: [{ platform: "xiaohongshu", url: "#", followers: 250000 }],
  },
  {
    id: "tw-001",
    name: "샤오메이 (小美, 가상)",
    country: "TW",
    category: ["beauty", "lifestyle"],
    oneLiner: "타이베이 뷰티·데일리 추천 크리에이터",
    exclusive: true,
    channels: [
      { platform: "instagram", url: "#", followers: 165000 },
      { platform: "facebook", url: "#", followers: 80000 },
    ],
  },
  {
    id: "tw-002",
    name: "아룬 (阿倫, 가상)",
    country: "TW",
    category: ["food"],
    oneLiner: "대만 맛집·미식 콘텐츠 유튜버",
    exclusive: false,
    channels: [{ platform: "youtube", url: "#", followers: 310000 }],
  },
  {
    id: "tw-003",
    name: "지아지아 (佳佳, 가상)",
    country: "TW",
    category: ["travel", "lifestyle"],
    oneLiner: "여행·호캉스 추천 인스타 인플루언서",
    exclusive: false,
    channels: [{ platform: "instagram", url: "#", followers: 98000 }],
  },
  {
    id: "jp-004",
    name: "모모카 (가상)",
    country: "JP",
    category: ["food"],
    oneLiner: "도쿄 카페·디저트 탐방 크리에이터",
    exclusive: false,
    channels: [
      { platform: "instagram", url: "#", followers: 142000 },
      { platform: "tiktok", url: "#", followers: 200000 },
    ],
  },
];

export const PORTFOLIO: Portfolio[] = [
  {
    id: "case-001",
    title: "성형외과 일본 환자 유치 인플루언서 캠페인",
    clientName: "OO성형외과 (샘플)",
    clientType: "medical",
    country: ["JP"],
    metrics: { views: 1200000, reach: 850000 },
    summary: "일본 뷰티 KOL 8인 협업으로 상담 문의 3.2배 증가",
  },
  {
    id: "case-002",
    title: "지자체 관광 콘텐츠 대만 확산 프로젝트",
    clientName: "OO시청 (샘플)",
    clientType: "public",
    country: ["TW"],
    metrics: { views: 940000, reach: 620000 },
    summary: "대만 여행 인플루언서 협업으로 현지 인지도 제고",
  },
  {
    id: "case-003",
    title: "뷰티 브랜드 중국 샤오홍슈 런칭",
    clientName: "OO코스메틱 (샘플)",
    clientType: "corporate",
    country: ["CN"],
    metrics: { views: 2100000, reach: 1500000 },
    summary: "샤오홍슈 KOL 12인 동시 발행으로 검색 상위 노출",
  },
  {
    id: "case-004",
    title: "의료기관 3개국 동시 진출 캠페인",
    clientName: "OO의료재단 (샘플)",
    clientType: "medical",
    country: ["JP", "CN", "TW"],
    metrics: { views: 3400000, reach: 2300000 },
    summary: "일·중·대 동시 운영으로 글로벌 환자 문의 채널 구축",
  },
];

export const CLIENTS: Client[] = [
  { name: "클라이언트 A (샘플)" },
  { name: "클라이언트 B (샘플)" },
  { name: "OO시청 (샘플)" },
  { name: "OO의료재단 (샘플)" },
  { name: "OO코스메틱 (샘플)" },
  { name: "OO관광공사 (샘플)" },
];

// 팔로워 수 한국어 축약 (12만, 1.2만 등)
export function formatFollowers(n: number): string {
  if (n >= 10000) {
    const man = n / 10000;
    return (Number.isInteger(man) ? man : man.toFixed(1)) + "만";
  }
  if (n >= 1000) return (n / 1000).toFixed(1) + "천";
  return String(n);
}

export function totalInfluencers(): number {
  return COUNTRY_STATS.reduce((s, c) => s + c.count, 0);
}
