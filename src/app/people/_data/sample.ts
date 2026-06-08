// 열정의사람들 — 타입·라벨 + 폴백(샘플) 데이터
// 실데이터는 인트라넷 운영관리(/influencers)에서 "홈페이지 공개" 토글을 켠 인플루언서를
// /api/public/influencers 로 받아온다(→ people-data.ts). 인트라넷 연동 실패 시 아래 샘플로 폴백한다.

export type Country = "KR" | "JP" | "CN" | "TW" | "VN";
export type Platform =
  | "instagram"
  | "youtube"
  | "tiktok"
  | "xiaohongshu"
  | "douyin"
  | "facebook"
  | "x"
  | "naver"
  | "ameba";

export type Channel = {
  platform: Platform;
  url: string;
  followers: number;
};

export type Gender = "FEMALE" | "MALE" | "OTHER";
export type AgeRange =
  | "TEENS"
  | "TWENTIES"
  | "THIRTIES"
  | "FORTIES"
  | "FIFTIES"
  | "SIXTIES_PLUS";

export type Influencer = {
  id: string;
  name: string;
  country: Country;
  categories: string[]; // 자유 입력 분야(인트라넷과 동일): "뷰티", "여행" 등
  profileImage?: string; // 비우면 성별·연령대 매칭 AI 포트레이트로 폴백
  gender?: Gender; // 사진 미등록 시 포트레이트 매칭에 사용
  ageRange?: AgeRange; // 사진 미등록 시 포트레이트 매칭에 사용
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

// 노출 국가 순서(국내 → 일본 → 중국 → 대만 → 베트남)
export const COUNTRY_ORDER: Country[] = ["KR", "JP", "CN", "TW", "VN"];

export const COUNTRY_LABEL: Record<Country, string> = {
  KR: "한국",
  JP: "일본",
  CN: "중국",
  TW: "대만",
  VN: "베트남",
};
// 이모지 국기(🇯🇵)는 Windows 등 일부 환경에서 "JP/CN/TW" 글자로 깨져 보임 → SVG 이미지 사용
export const COUNTRY_FLAG_SRC: Record<Country, string> = {
  KR: "/people/flags/kr.svg",
  JP: "/people/flags/jp.svg",
  CN: "/people/flags/cn.svg",
  TW: "/people/flags/tw.svg",
  VN: "/people/flags/vn.svg",
};
// (호환용) 텍스트가 필요한 곳을 위한 폴백
export const COUNTRY_FLAG: Record<Country, string> = {
  KR: "🇰🇷",
  JP: "🇯🇵",
  CN: "🇨🇳",
  TW: "🇹🇼",
  VN: "🇻🇳",
};

// 국가별 강점 카피(에디토리얼) — 이 문구만 고정
export const COUNTRY_STRENGTH: Record<Country, string> = {
  KR: "국내 체험단·기자단부터 뷰티·라이프 크리에이터까지 직접 운영",
  JP: "도쿄·오사카 핵심 도시 뷰티·라이프 크리에이터 다수 확보",
  CN: "샤오홍슈·더우인 KOL 직접 운영, 의료·뷰티 전환에 강점",
  TW: "현지 파트너 네트워크 기반 신뢰도 높은 추천형 콘텐츠",
  VN: "페이스북·틱톡 중심 동남아 고성장 시장, 뷰티·라이프 추천 콘텐츠 강세",
};

// ── NETWORK 섹션(검증된 현지 인플루언서 네트워크) 고정 수치 ──
// 회사가 직접 운영·제휴하는 현지 크리에이터 풀의 '규모'를 보여주는 마케팅 수치다.
// 아래 '지금 활동 중인 인플루언서' 목록(실데이터 연동)과는 별개로 운영진이 직접 관리한다.
export const NETWORK_SIZE: Record<Country, number> = {
  KR: 500,
  JP: 300,
  CN: 1000,
  TW: 150,
  VN: 100,
};
export const NETWORK_PLATFORMS: Record<Country, string[]> = {
  KR: ["Instagram", "네이버블로그", "YouTube"],
  JP: ["Instagram", "YouTube", "X", "TikTok"],
  CN: ["샤오홍슈", "더우인"],
  TW: ["Instagram", "Facebook", "YouTube"],
  VN: ["Facebook", "TikTok", "YouTube"],
};

export const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  xiaohongshu: "샤오홍슈",
  douyin: "더우인",
  facebook: "Facebook",
  x: "X",
  naver: "네이버블로그",
  ameba: "아메바",
};
export const CLIENT_TYPE_LABEL: Record<ClientType, string> = {
  medical: "의료",
  corporate: "기업",
  public: "공공",
};

// ── 폴백(샘플) 인플루언서 — 인트라넷 연동 전/실패 시에만 사용. 모두 가상. ──
export const SAMPLE_INFLUENCERS: Influencer[] = [
  {
    id: "kr-001",
    profileImage: "/people/influencers/kr-001.webp",
    name: "이수민",
    country: "KR",
    categories: ["체험단", "뷰티"],
    oneLiner: "국내 뷰티·시술 전문 리뷰 크리에이터",
    exclusive: true,
    channels: [
      { platform: "instagram", url: "#", followers: 52000 },
      { platform: "naver", url: "#", followers: 30000 },
    ],
  },
  {
    id: "kr-002",
    profileImage: "/people/influencers/kr-002.webp",
    name: "정현맘",
    country: "KR",
    categories: ["기자단", "라이프"],
    oneLiner: "지역 맘카페·블로그 기반 라이프 크리에이터",
    exclusive: false,
    channels: [{ platform: "naver", url: "#", followers: 18000 }],
  },
  {
    id: "jp-001",
    profileImage: "/people/influencers/jp-001.webp",
    name: "사쿠라 미오",
    country: "JP",
    categories: ["뷰티"],
    oneLiner: "도쿄 기반 스킨케어·코스메틱 리뷰 크리에이터",
    exclusive: true,
    channels: [
      { platform: "instagram", url: "#", followers: 184000 },
      { platform: "youtube", url: "#", followers: 92000 },
    ],
  },
  {
    id: "jp-002",
    profileImage: "/people/influencers/jp-002.webp",
    name: "타카하시 렌",
    country: "JP",
    categories: ["라이프", "여행"],
    oneLiner: "일본 전국 여행·라이프스타일 브이로거",
    exclusive: false,
    channels: [
      { platform: "youtube", url: "#", followers: 240000 },
      { platform: "x", url: "#", followers: 60000 },
    ],
  },
  {
    id: "jp-003",
    profileImage: "/people/influencers/jp-003.webp",
    name: "유이",
    country: "JP",
    categories: ["패션"],
    oneLiner: "하라주쿠 스트릿 패션 인플루언서",
    exclusive: true,
    channels: [{ platform: "instagram", url: "#", followers: 130000 }],
  },
  {
    id: "cn-001",
    profileImage: "/people/influencers/cn-001.webp",
    name: "린샤오 (林小)",
    country: "CN",
    categories: ["뷰티"],
    oneLiner: "샤오홍슈 의료·뷰티 전문 KOL",
    exclusive: true,
    channels: [
      { platform: "xiaohongshu", url: "#", followers: 410000 },
      { platform: "douyin", url: "#", followers: 220000 },
    ],
  },
  {
    id: "cn-002",
    profileImage: "/people/influencers/cn-002.webp",
    name: "왕레이 (王磊)",
    country: "CN",
    categories: ["푸드", "여행"],
    oneLiner: "더우인 푸드·여행 쇼트폼 크리에이터",
    exclusive: false,
    channels: [{ platform: "douyin", url: "#", followers: 680000 }],
  },
  {
    id: "cn-003",
    profileImage: "/people/influencers/cn-003.webp",
    name: "천위 (陈雨)",
    country: "CN",
    categories: ["라이프"],
    oneLiner: "상하이 라이프스타일·소비 트렌드 KOL",
    exclusive: false,
    channels: [{ platform: "xiaohongshu", url: "#", followers: 250000 }],
  },
  {
    id: "tw-001",
    profileImage: "/people/influencers/tw-001.webp",
    name: "샤오메이 (小美)",
    country: "TW",
    categories: ["뷰티", "라이프"],
    oneLiner: "타이베이 뷰티·데일리 추천 크리에이터",
    exclusive: true,
    channels: [
      { platform: "instagram", url: "#", followers: 165000 },
      { platform: "facebook", url: "#", followers: 80000 },
    ],
  },
  {
    id: "tw-002",
    profileImage: "/people/influencers/tw-002.webp",
    name: "아룬 (阿倫)",
    country: "TW",
    categories: ["푸드"],
    oneLiner: "대만 맛집·미식 콘텐츠 유튜버",
    exclusive: false,
    channels: [{ platform: "youtube", url: "#", followers: 310000 }],
  },
  {
    id: "tw-003",
    profileImage: "/people/influencers/tw-003.webp",
    name: "지아지아 (佳佳)",
    country: "TW",
    categories: ["여행", "라이프"],
    oneLiner: "여행·호캉스 추천 인스타 인플루언서",
    exclusive: false,
    channels: [{ platform: "instagram", url: "#", followers: 98000 }],
  },
  {
    id: "jp-004",
    profileImage: "/people/influencers/jp-004.webp",
    name: "모모카",
    country: "JP",
    categories: ["푸드"],
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
    thumbnail: "/people/portfolio/case-001.webp",
    title: "성형외과 일본 환자 유치 인플루언서 캠페인",
    clientName: "OO성형외과",
    clientType: "medical",
    country: ["JP"],
    metrics: { views: 1200000, reach: 850000 },
    summary: "일본 뷰티 KOL 8인 협업으로 상담 문의 3.2배 증가",
  },
  {
    id: "case-002",
    thumbnail: "/people/portfolio/case-002.webp",
    title: "지자체 관광 콘텐츠 대만 확산 프로젝트",
    clientName: "OO시청",
    clientType: "public",
    country: ["TW"],
    metrics: { views: 940000, reach: 620000 },
    summary: "대만 여행 인플루언서 협업으로 현지 인지도 제고",
  },
  {
    id: "case-003",
    thumbnail: "/people/portfolio/case-003.webp",
    title: "뷰티 브랜드 중국 샤오홍슈 런칭",
    clientName: "OO코스메틱",
    clientType: "corporate",
    country: ["CN"],
    metrics: { views: 2100000, reach: 1500000 },
    summary: "샤오홍슈 KOL 12인 동시 발행으로 검색 상위 노출",
  },
  {
    id: "case-004",
    thumbnail: "/people/portfolio/case-004.webp",
    title: "의료기관 3개국 동시 진출 캠페인",
    clientName: "OO의료재단",
    clientType: "medical",
    country: ["JP", "CN", "TW"],
    metrics: { views: 3400000, reach: 2300000 },
    summary: "일·중·대 동시 운영으로 글로벌 환자 문의 채널 구축",
  },
  {
    id: "case-005",
    thumbnail: "/people/portfolio/case-005.webp",
    title: "국내 피부과 네이버·인스타 통합 인플루언서 캠페인",
    clientName: "OO피부과",
    clientType: "medical",
    country: ["KR"],
    metrics: { views: 1450000, reach: 980000 },
    summary: "국내 뷰티 인플루언서 10인 + 체험단 운영으로 예약 문의 2.8배 증가",
  },
  {
    id: "case-006",
    thumbnail: "/people/portfolio/case-006.webp",
    title: "일본 코스메틱 브랜드 인스타 리브랜딩",
    clientName: "OO코스메틱 재팬",
    clientType: "corporate",
    country: ["JP"],
    metrics: { views: 1760000, reach: 1200000 },
    summary: "도쿄 뷰티 크리에이터 협업으로 브랜드 팔로워 4.1만 증가",
  },
  {
    id: "case-007",
    thumbnail: "/people/portfolio/case-007.webp",
    title: "대만 F&B 프랜차이즈 신규 오픈 캠페인",
    clientName: "OO다이닝",
    clientType: "corporate",
    country: ["TW"],
    metrics: { views: 1320000, reach: 870000 },
    summary: "타이베이 맛집 인플루언서 협업으로 오픈 첫 주 웨이팅 매진",
  },
  {
    id: "case-008",
    thumbnail: "/people/portfolio/case-008.webp",
    title: "베트남 진출 뷰티 브랜드 틱톡 런칭",
    clientName: "OO뷰티",
    clientType: "corporate",
    country: ["VN"],
    metrics: { views: 2600000, reach: 1700000 },
    summary: "호치민 현지 틱톡 크리에이터 동시 발행으로 런칭 인지도 확보",
  },
];

// 프로필 사진 미등록 인플루언서에게 임시로 보여줄 AI 생성 포트레이트(동아시아) 풀.
// 성별·연령대(인트라넷 운영관리 입력값)에 맞는 얼굴을 배정한다 — 60대 여성에 20대 남성 얼굴이
// 붙던 문제를 방지. 시니어(50대+) 여성은 전용 풀, 그 외는 성별별 풀에서 id 해시로 결정.
const PORTRAITS_FEMALE_YOUNG = [
  "/people/influencers/jp-001.webp",
  "/people/influencers/jp-003.webp",
  "/people/influencers/jp-004.webp",
  "/people/influencers/cn-001.webp",
  "/people/influencers/cn-003.webp",
  "/people/influencers/tw-001.webp",
  "/people/influencers/tw-003.webp",
];
const PORTRAITS_MALE_YOUNG = [
  "/people/influencers/jp-002.webp",
  "/people/influencers/cn-002.webp",
  "/people/influencers/tw-002.webp",
];
const PORTRAITS_FEMALE_SENIOR = [
  "/people/influencers/kr-senior-f-01.webp", // 60대
  "/people/influencers/kr-senior-f-02.webp", // 50대
];

// (구) 호환용 — 전체 풀(성별 무관 호출부가 남아 있을 때)
export const AI_PORTRAITS = [...PORTRAITS_FEMALE_YOUNG, ...PORTRAITS_MALE_YOUNG];

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

// 성별·연령대 매칭 포트레이트 배정(사진 미등록 시). 시니어 남성 전용 풀은 아직 없어 남성 풀로 폴백.
export function pickPortrait(seed: string, gender?: Gender, ageRange?: AgeRange): string {
  const senior = ageRange === "FIFTIES" || ageRange === "SIXTIES_PLUS";
  let pool: string[];
  if (gender === "MALE") pool = PORTRAITS_MALE_YOUNG;
  else if (senior) pool = PORTRAITS_FEMALE_SENIOR; // 여성/미상 + 시니어
  else pool = PORTRAITS_FEMALE_YOUNG; // 여성/미상 + 비시니어
  return pool[hashSeed(seed) % pool.length];
}

// (구) 호환용 — 성별 정보 없이 호출하던 곳을 위해 유지
export function pickAiPortrait(seed: string): string {
  return AI_PORTRAITS[hashSeed(seed) % AI_PORTRAITS.length];
}

// 팔로워 수 한국어 축약 (12만, 1.2만 등)
export function formatFollowers(n: number): string {
  if (n >= 10000) {
    const man = n / 10000;
    return (Number.isInteger(man) ? man : man.toFixed(1)) + "만";
  }
  if (n >= 1000) return (n / 1000).toFixed(1) + "천";
  return String(n);
}
