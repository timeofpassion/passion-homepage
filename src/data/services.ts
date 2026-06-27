interface PortfolioItem {
  title: string;
  desc: string;
  image?: string;
}

interface ServiceData {
  id: string;
  sysId: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  services: { name: string; desc: string }[];
  portfolio: PortfolioItem[];
}

export const servicesData: ServiceData[] = [
  {
    id: "domestic-marketing",
    sysId: "SYS.01",
    title: "국내마케팅팀",
    shortDesc: "블로그 SEO · 플레이스 · 광고 · 플랫폼 운영",
    fullDesc: "10년 이상 경험의 병원 마케팅 전문 팀입니다. 블로그 SEO부터 네이버 플레이스 최적화, SNS 광고까지 국내 모든 채널을 아우릅니다.",
    services: [
      { name: "블로그 SEO", desc: "병원 전문 콘텐츠로 검색 상위권 달성" },
      { name: "네이버 플레이스", desc: "플레이스 최적화로 환자 유입 증대" },
      { name: "SNS 광고 운영", desc: "타겟팅 된 광고로 효율적인 환자 모집" },
      { name: "플랫폼 관리", desc: "강남언니, 바비톡, 여신티켓 등" }
    ],
    portfolio: []
  },
  {
    id: "design",
    sysId: "SYS.02",
    title: "디자인팀",
    shortDesc: "카드뉴스 · SNS 이미지 · 배너 · 브랜딩",
    fullDesc: "의료 브랜딩부터 소셜미디어 콘텐츠까지, 의료기관에 특화된 디자인을 제공합니다. 일관된 브랜드 아이덴티티로 환자 신뢰도를 높입니다.",
    services: [
      { name: "카드뉴스", desc: "의료 정보를 쉽게 이해하는 카드 형식" },
      { name: "SNS 이미지", desc: "인스타, 페북 최적화 이미지" },
      { name: "배너", desc: "웹사이트 및 광고용 배너 디자인" },
      { name: "브랜딩", desc: "로고, 컬러팔레트, 가이드 완성" }
    ],
    portfolio: []
  },
  {
    id: "video",
    sysId: "SYS.03",
    title: "영상팀",
    shortDesc: "풀영상 · 숏츠 · 유튜브 · 틱톡 콘텐츠",
    fullDesc: "병원 소개 영상부터 Shorts 콘텐츠까지 다양한 영상 제작을 담당합니다. 시청자를 매료시키는 스토리텔링으로 브랜드 가치를 높입니다.",
    services: [
      { name: "풀 영상 제작", desc: "병원 소개, 시술 과정 등 장편 영상" },
      { name: "Shorts/틱톡", desc: "15-60초 숏폼 콘텐츠 제작" },
      { name: "유튜브 채널", desc: "월 정기 콘텐츠로 채널 운영" },
      { name: "라이브 스트리밍", desc: "실시간 상담 및 Q&A 영상" }
    ],
    portfolio: []
  },
  {
    id: "japan",
    sysId: "SYS.04",
    title: "일본 마케팅팀",
    shortDesc: "라인 · 인스타 · 틱톡 현지 운영",
    fullDesc: "일본 환자 유치 전문 팀입니다. LINE 관리부터 현지화 콘텐츠까지 담당하며, 월 10-15건의 상담 유입을 목표로 합니다.",
    services: [
      { name: "LINE 운영", desc: "일본 고객과 직접 상담 채널" },
      { name: "현지화 콘텐츠", desc: "일본인 맞춤 마케팅 콘텐츠" },
      { name: "인스타그램", desc: "일본 인스타 팔로워 확보" },
      { name: "환자 상담", desc: "일본어 상담 및 통역 서비스" }
    ],
    portfolio: []
  },
  {
    id: "china",
    sysId: "SYS.05",
    title: "중화권 마케팅팀",
    shortDesc: "샤오홍슈 · 웨이보 · 더우인 · 왕홍 KOL",
    fullDesc: "중국, 대만 환자 유치 전문 팀입니다. 현지 플랫폼과 KOL 네트워크를 활용해 월 30-50건의 상담 유입을 달성합니다.",
    services: [
      { name: "샤오홍슈 운영", desc: "중국 최대 뷰티 플랫폼 관리" },
      { name: "KOL 협업", desc: "현지 인플루언서와의 협업" },
      { name: "웨이보 관리", desc: "중국 SNS 채널 운영" },
      { name: "대만 마케팅", desc: "대만 현지 마케팅 전략" }
    ],
    portfolio: []
  }
];

export function getServiceById(id: string) {
  return servicesData.find(s => s.id === id);
}

export function getAllServiceIds() {
  return servicesData.map(s => s.id);
}
