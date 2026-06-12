// 인트라넷 인플루언서 운영관리 ↔ 열정의사람들 홈페이지 연동 (단일 소스).
// 인트라넷 /api/public/influencers (isPublic+ACTIVE, 공개 안전 필드만)에서 받아 화면 타입으로 매핑한다.
// 연동 실패·실데이터 0건이면 sample.ts 폴백을 사용한다(usingSample=true).
import {
  type Influencer,
  type Country,
  type Platform,
  type Gender,
  type AgeRange,
  COUNTRY_ORDER,
  COUNTRY_STRENGTH,
  PLATFORM_LABEL,
  SAMPLE_INFLUENCERS,
  NETWORK_SIZE,
  NETWORK_PLATFORMS,
  assignPortraits,
} from "./sample";

const INTRANET_URL =
  process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";

// 인트라넷 enum → 홈페이지 표시값 매핑
const MARKET_TO_COUNTRY: Record<string, Country> = {
  DOMESTIC: "KR",
  JAPAN: "JP",
  CHINA: "CN",
  TAIWAN: "TW",
  VIETNAM: "VN", // 인트라넷에 베트남 시장이 추가되면 자동 노출
  // ENGLISH(영미권)은 현재 홈페이지 미노출 → 매핑 없음(스킵)
};

const PLATFORM_MAP: Record<string, Platform> = {
  INSTAGRAM: "instagram",
  YOUTUBE: "youtube",
  TIKTOK: "tiktok",
  FACEBOOK: "facebook",
  X_TWITTER: "x",
  XIAOHONGSHU: "xiaohongshu",
  DOUYIN: "douyin",
  NAVER_BLOG: "naver",
  AMEBA: "ameba",
};

type ApiChannel = { platform: string; accountUrl: string; followerCount: number };
type ApiInfluencer = {
  id: string;
  name: string;
  photoUrl: string | null;
  market: string;
  nationality: string | null;
  gender: string | null;
  ageRange: string | null;
  languages: string[];
  categories: string[];
  grade: string;
  exclusive: boolean;
  publicHeadline: string | null;
  channels: ApiChannel[];
};

// 공개 노출 시 내부 표기("(가상)", "예시 …") 가 남아 있어도 화면엔 보이지 않도록 정화(방어).
function cleanName(n: string): string {
  return (n || "")
    .replace(/,?\s*가상/g, "")
    .replace(/\(\s*\)/g, "")
    .replace(/^예시\s+/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function mapInfluencer(i: ApiInfluencer): Influencer | null {
  const country = MARKET_TO_COUNTRY[i.market];
  if (!country) return null; // 홈페이지 비노출 시장(영미권 등)은 제외
  return {
    id: i.id,
    name: cleanName(i.name),
    country,
    categories: Array.isArray(i.categories) ? i.categories : [],
    profileImage: i.photoUrl || undefined,
    gender: (i.gender as Gender | null) ?? undefined,
    ageRange: (i.ageRange as AgeRange | null) ?? undefined,
    oneLiner:
      i.publicHeadline?.trim() ||
      (i.categories?.length ? i.categories.join(" · ") : "현지 인플루언서"),
    exclusive: !!i.exclusive,
    channels: (i.channels ?? []).map((c) => ({
      platform: PLATFORM_MAP[c.platform] ?? "instagram",
      url: c.accountUrl || "#",
      followers: c.followerCount || 0,
    })),
  };
}

export type CountryStat = {
  country: Country;
  count: number;
  platforms: string[];
  strength: string;
};

export async function getInfluencers(): Promise<{
  influencers: Influencer[];
  usingSample: boolean;
}> {
  try {
    const res = await fetch(`${INTRANET_URL}/api/public/influencers`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = (await res.json()) as ApiInfluencer[];
    const mapped = (Array.isArray(data) ? data : [])
      .map(mapInfluencer)
      .filter((x): x is Influencer => x !== null);
    if (mapped.length === 0) return { influencers: SAMPLE_INFLUENCERS, usingSample: true };
    // 사진 미등록 인플루언서에게 성별·연령대별 전용 풀에서 '중복 없이' 임시 AI 프로필을 순차 배정.
    assignPortraits(mapped);
    return { influencers: mapped, usingSample: false };
  } catch {
    // 인트라넷 미응답 → 폴백
    return { influencers: SAMPLE_INFLUENCERS, usingSample: true };
  }
}

// NETWORK 섹션용 — 운영 중인 현지 인플루언서 '네트워크 규모' 고정 수치.
// 실데이터(노출 인플루언서) 수와 무관하게, 회사가 직접 운영·제휴하는 풀 규모를 보여준다.
export function buildNetworkStats(): CountryStat[] {
  return COUNTRY_ORDER.map((country) => ({
    country,
    count: NETWORK_SIZE[country],
    platforms: NETWORK_PLATFORMS[country],
    strength: COUNTRY_STRENGTH[country],
  }));
}

// 국가별 현황(노출 순서대로, 인원 1명 이상인 국가만)
export function buildCountryStats(influencers: Influencer[]): CountryStat[] {
  return COUNTRY_ORDER.map((country) => {
    const list = influencers.filter((i) => i.country === country);
    const platforms: string[] = [];
    list.forEach((i) =>
      i.channels.forEach((ch) => {
        const label = PLATFORM_LABEL[ch.platform];
        if (label && !platforms.includes(label)) platforms.push(label);
      })
    );
    return { country, count: list.length, platforms, strength: COUNTRY_STRENGTH[country] };
  }).filter((s) => s.count > 0);
}
