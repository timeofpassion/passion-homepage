// 열정의시간 의료관광 협력병원 — 단일 데이터 소스 (Phase 1: ko only).
// ⚠️ 검증된 데이터(인트라넷 ClientGuide·웹조사)만 사용. 미확정 항목(실사진·네이버수치·등록번호)은
//    채우지 않고 "준비 중" 처리한다(의료광고법·정직성). 대표 확정 후 보강.
// Phase 2에서 I18n({ko,ja,zhCN,zhTW,en}) 구조로 확장 예정 — 현재는 ko 평문.

export type ClinicCategory = "derma" | "plastic" | "dental" | "hanbang" | "checkup";

export type Treatment = {
  name: string;
  desc: string;
  why: string; // 근거(가격 금지)
  downtime?: string;
  duration?: string;
};

export type Clinic = {
  slug: string;
  category: ClinicCategory;
  active: boolean;

  signature: string; // 병원명보다 먼저 노출되는 한 줄
  name: string;
  nameEn?: string;
  catEn: string; // "Dermatology · Sinsa"
  mono: string; // 카드 이니셜
  tone: string; // 카드/히어로 배경 톤(실사진 전까지 색상 플레이스홀더)

  badges: { koreanPatients: boolean; foreignRegistered: boolean; interpreter: boolean };

  doctor: {
    name: string;
    title: string;
    quote: string;
    tags: string[];
  };

  treatments: Treatment[];

  tags: string[]; // 2층 고민 태그(카테고리 종속)
  mainTag: string; // 카드 강조 시술
  location: { areaHint: string; fromAirport: string };
  cardFoot: string; // 카드 하단 한 줄(검증 가능한 사실만)

  // 미확정(대표 제공 대기) — 있으면 렌더, 없으면 "준비 중"
  localTrust?: {
    naverRating?: number;
    koreanReviews?: number;
    revisitRate?: number;
    reviews?: { text: string; meta: string }[];
  };

  // 실제 병원 사진(있으면 렌더, 없으면 톤 그라데이션 플레이스홀더)
  photos?: {
    hero?: string;
    doctor?: string;
    doctorPos?: string; // 원장 사진 object-position (기본 "top center")
    space?: { src: string; label: string }[];
  };
};

export const CATEGORY_LABEL: Record<ClinicCategory, string> = {
  derma: "피부과",
  plastic: "성형외과",
  dental: "치과",
  hanbang: "한의원",
  checkup: "건강검진",
};

// 카테고리 표시 순서(의료관광 수요 순)
export const CATEGORY_ORDER: ClinicCategory[] = [
  "derma",
  "plastic",
  "dental",
  "hanbang",
  "checkup",
];

// 카테고리별 고민 태그(2층 필터)
export const CATEGORY_TAGS: Record<ClinicCategory, string[]> = {
  derma: ["색소·기미", "리프팅", "모공·흉터", "미백·피부톤", "보톡스·필러"],
  plastic: ["눈", "코", "윤곽·턱", "지방흡입·바디"],
  dental: ["임플란트", "라미네이트", "미백", "교정"],
  hanbang: ["한방다이어트", "피부·여드름", "체질개선"],
  checkup: ["종합검진", "내시경", "MRI·정밀"],
};

export const CLINICS: Clinic[] = [
  {
    slug: "mellow-sinsa",
    category: "derma",
    active: true,
    signature: "색소·리프팅에 집중해 온\n안티에이징 피부과",
    name: "멜로우피부과 신사점",
    nameEn: "MELLOW Dermatology",
    catEn: "Dermatology · Sinsa",
    mono: "M",
    tone: "#0E4A3F",
    badges: { koreanPatients: true, foreignRegistered: true, interpreter: true },
    photos: {
      hero: "/time/hospital/mellow/hero.jpg",
      doctor: "/time/hospital/mellow/doctor.png",
      space: [
        { src: "/time/hospital/mellow/space-1.jpg", label: "리셉션 · 라운지" },
        { src: "/time/hospital/mellow/space-2.jpg", label: "리셉션" },
        { src: "/time/hospital/mellow/space-3.jpg", label: "대기 라운지" },
        { src: "/time/hospital/mellow/space-4.jpg", label: "피부 진단" },
      ],
    },
    doctor: {
      name: "고영욱 대표원장",
      title: "피부과 전문의",
      quote:
        "유행이 아니라 기준으로 진료합니다. 필요한 시술만, 정품·정량으로 — 본연의 아름다움을 되찾는 것이 멜로우의 원칙입니다.",
      tags: ["피부과 전문의", "정품·정량 원칙", "원장 직접 시술"],
    },
    treatments: [
      {
        name: "울쎄라 (HIFU 리프팅)",
        desc: "고강도 집속 초음파 리프팅. 절개 없이 탄력 개선에 집중하는 멜로우의 대표 안티에이징 시술입니다.",
        why: "피부과 전문의 직접 시술 · 정품·정량 원칙",
        downtime: "다운타임 거의 없음",
        duration: "시술 약 40~60분",
      },
      {
        name: "써마지 (고주파 타이트닝)",
        desc: "고주파로 진피층을 자극해 피부 탄력과 윤곽을 다듬는 시술입니다.",
        why: "정규 장비 · 전문의 상담 후 맞춤 설계",
        downtime: "다운타임 거의 없음",
        duration: "시술 약 30~60분",
      },
      {
        name: "포텐자 (RF 마이크로니들링)",
        desc: "모공·흉터·피부결을 함께 관리하는 고주파 미세침 시술입니다.",
        why: "개인 피부 상태에 맞춘 단계별 설계",
        downtime: "다운타임 1일 내외",
        duration: "시술 약 30분",
      },
    ],
    tags: ["리프팅", "색소·기미", "모공·흉터"],
    mainTag: "울쎄라",
    location: {
      areaHint: "서울 강남 · 신사역 인근",
      fromAirport: "인천공항에서 약 60분",
    },
    cardFoot: "신사역 인근 · 피부과 전문의",
  },
  {
    slug: "olara",
    category: "derma",
    active: true,
    signature: "과하지 않게,\n자연스러운 리프팅",
    name: "올라라의원",
    nameEn: "OLARA Clinic",
    catEn: "Dermatology · Apgujeong",
    mono: "O",
    tone: "#13614F",
    badges: { koreanPatients: true, foreignRegistered: true, interpreter: true },
    photos: {
      hero: "/time/hospital/olara/hero.jpg",
      doctor: "/time/hospital/olara/doctor.webp",
      doctorPos: "30% center",
      space: [
        { src: "/time/hospital/olara/space-1.jpg", label: "파우더룸" },
        { src: "/time/hospital/olara/space-2.jpg", label: "상담실" },
        { src: "/time/hospital/olara/space-3.jpg", label: "내부 전경" },
        { src: "/time/hospital/olara/space-4.jpg", label: "진료 공간" },
      ],
    },
    doctor: {
      name: "이지영 대표원장",
      title: "원장 직접 1:1 진료",
      quote:
        "의사이기 전에 같은 고민을 가진 사람으로서, 과하지 않고 자연스러운 변화를 함께 설계합니다. Lift right, feel light.",
      tags: ["원장 1:1 상담·시술", "슬로우 에이징", "중안부 리프팅"],
    },
    treatments: [
      {
        name: "올타이트 리프팅",
        desc: "개인 맞춤 기반 리프팅으로 중안부 축소와 얼굴 윤곽 개선에 집중합니다.",
        why: "원장 직접 1:1 설계 · 자연스러운 변화 중심",
        downtime: "다운타임 거의 없음",
      },
      {
        name: "슈링크 유니버스",
        desc: "초음파 리프팅으로 탄력 저하와 처짐을 단계적으로 개선합니다.",
        why: "과하지 않은 자연스러운 결과 지향",
        downtime: "다운타임 거의 없음",
      },
      {
        name: "실리프팅",
        desc: "중안부 축소와 얼굴선 정리를 위한 맞춤 실리프팅입니다.",
        why: "얼굴 조화·균형을 살리는 절제된 설계",
      },
    ],
    tags: ["리프팅", "미백·피부톤", "보톡스·필러"],
    mainTag: "올타이트 리프팅",
    location: {
      areaHint: "서울 강남 · 압구정역 인근",
      fromAirport: "인천공항에서 약 60분",
    },
    cardFoot: "압구정역 인근 · 원장 1:1 진료",
  },
  {
    slug: "inique",
    category: "plastic",
    active: true,
    signature: "눈·코 디테일,\n자연스러운 성형",
    name: "아이니크성형외과",
    nameEn: "INIQUE Plastic Surgery",
    catEn: "Plastic Surgery · Sinsa",
    mono: "I",
    tone: "#1C3640",
    badges: { koreanPatients: true, foreignRegistered: true, interpreter: true },
    photos: {
      doctor: "/time/hospital/inique/doctor.png",
      doctorPos: "center",
    },
    doctor: {
      name: "양해원 대표원장",
      title: "성형외과 전문의",
      quote:
        "처음부터 그랬던 것처럼 자연스럽게 — 무리한 변화보다 조화를 우선합니다.",
      tags: ["눈성형·눈재수술", "원장 책임 진료", "남자성형"],
    },
    treatments: [
      {
        name: "눈성형 · 눈재수술",
        desc: "쌍꺼풀·눈매교정부터 재수술까지, 개인 눈매에 맞춘 디테일 중심 성형입니다.",
        why: "눈성형·눈재수술 다수 진료",
      },
      {
        name: "코성형",
        desc: "얼굴 균형을 고려한 코성형으로 자연스러운 라인을 설계합니다.",
        why: "얼굴 전체 조화 중심 설계",
      },
      {
        name: "안면윤곽 · 양악",
        desc: "윤곽·턱선 개선을 위한 성형 진료를 진행합니다.",
        why: "전문의 진료 기반",
      },
    ],
    tags: ["눈", "코", "윤곽·턱"],
    mainTag: "눈재수술",
    location: {
      areaHint: "서울 강남 · 신사·압구정 인근",
      fromAirport: "인천공항에서 약 60분",
    },
    cardFoot: "신사·압구정 인근 · 성형외과 전문의",
  },
  {
    slug: "vc-ps",
    category: "plastic",
    active: true,
    signature: "곧 합류하는\n강남 성형외과",
    name: "VC성형외과",
    nameEn: "VC Plastic Surgery",
    catEn: "Plastic Surgery · Gangnam",
    mono: "V",
    tone: "#26424D",
    badges: { koreanPatients: true, foreignRegistered: false, interpreter: true },
    doctor: {
      name: "준비 중",
      title: "성형외과",
      quote:
        "2026년 7월 개원과 함께 의료진·진료 정보를 안내해 드릴 예정입니다.",
      tags: ["2026년 7월 개원 예정"],
    },
    treatments: [
      {
        name: "진료 정보 준비 중",
        desc: "개원 후 대표 시술과 진료 정보가 업데이트됩니다.",
        why: "열정의시간 협력 기준에 따라 준비 중",
      },
    ],
    tags: ["눈", "코"],
    mainTag: "2026.07 개원 예정",
    location: {
      areaHint: "서울 강남",
      fromAirport: "인천공항에서 약 60분",
    },
    cardFoot: "2026년 7월 개원 예정",
  },
];

export function getClinic(slug: string): Clinic | undefined {
  return CLINICS.find((c) => c.slug === slug && c.active);
}

export function activeClinics(): Clinic[] {
  return CLINICS.filter((c) => c.active);
}
