// 협력병원 포털 — 인트라넷 단일 소스 연동 + locale/사전.
// 인트라넷 /api/public/partner-hospitals (isPublished, 공개 안전 필드만)에서 받아 화면에 쓴다.
// /people 패턴(people-data.ts) 동일: INTRANET_API_URL fetch + ISR revalidate + 실패/0건 폴백.

const INTRANET_URL =
  process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com"

export const LOCALES = ["ko", "en", "ja", "zh-cn", "zh-tw", "vi"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "ko"
// P1 실제 노출 locale (P2에서 확장). 라우트·사이트맵·hreflang 은 이 목록만 생성.
export const ACTIVE_LOCALES: Locale[] = ["ko"]

// URL(소문자) → 인트라넷 API locale 표기
export const API_LOCALE: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  "zh-cn": "zh-CN",
  "zh-tw": "zh-TW",
  vi: "vi",
}
// <html lang> / hreflang 값
export const HTML_LANG: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  "zh-cn": "zh-Hans",
  "zh-tw": "zh-Hant",
  vi: "vi",
}

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v)
}

export type Doctor = {
  name: string
  title: string | null
  specialty: string | null
  bio: string | null
  imageUrl: string | null
}

export type Hospital = {
  slug: string
  departments: string[]
  region: string | null
  establishedYear: number | null
  logoUrl: string | null
  heroImageUrl: string | null
  galleryUrls: string[]
  doctors: Doctor[]
  name: string
  tagline: string | null
  summary: string | null
  strengths: string[]
  signatureTreatments: string[]
  seoTitle: string | null
  seoDescription: string | null
}

// 전 언어 묶음 — /hospital 통합 페이지(클라이언트 언어 토글)용.
export type LocaleContent = {
  name: string
  tagline: string | null
  summary: string | null
  strengths: string[]
  signatureTreatments: string[]
}
export type HospitalI18n = {
  slug: string
  departments: string[]
  region: string | null
  establishedYear: number | null
  logoUrl: string | null
  heroImageUrl: string | null
  galleryUrls: string[]
  doctors: Doctor[]
  translations: Record<string, LocaleContent>
}

// 인트라넷 미응답·실데이터 0건일 때 화면이 비지 않도록 하는 폴백(데모/초기). ko 기준.
const SAMPLE_HOSPITALS: Hospital[] = [
  {
    slug: "sample-derma",
    departments: ["피부과"],
    region: "서울 강남",
    establishedYear: 2015,
    logoUrl: null,
    heroImageUrl: null,
    galleryUrls: [],
    doctors: [],
    name: "샘플피부과의원",
    tagline: "색소·리프팅에 강한 강남 피부과",
    summary: "10년간 색소·리프팅 시술에 집중해 온 강남 피부과입니다.",
    strengths: ["색소 클리닉 전문", "1:1 맞춤 진료", "사후관리 프로그램"],
    signatureTreatments: ["레이저토닝", "고주파 리프팅", "물광주사"],
    seoTitle: null,
    seoDescription: null,
  },
]

export async function getHospitals(
  locale: Locale,
): Promise<{ hospitals: Hospital[]; usingSample: boolean }> {
  try {
    const res = await fetch(
      `${INTRANET_URL}/api/public/partner-hospitals?locale=${API_LOCALE[locale]}`,
      { next: { revalidate: 300 } },
    )
    if (!res.ok) throw new Error(`status ${res.status}`)
    const data = (await res.json()) as Hospital[]
    const list = Array.isArray(data) ? data : []
    if (list.length === 0) return { hospitals: SAMPLE_HOSPITALS, usingSample: true }
    return { hospitals: list, usingSample: false }
  } catch {
    return { hospitals: SAMPLE_HOSPITALS, usingSample: true }
  }
}

export async function getHospital(
  locale: Locale,
  slug: string,
): Promise<Hospital | null> {
  try {
    const res = await fetch(
      `${INTRANET_URL}/api/public/partner-hospitals?locale=${API_LOCALE[locale]}&slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 300 } },
    )
    if (!res.ok) throw new Error(`status ${res.status}`)
    const arr = (await res.json()) as Hospital[]
    if (Array.isArray(arr) && arr[0]) return arr[0]
  } catch {
    /* fall through to sample */
  }
  return SAMPLE_HOSPITALS.find((h) => h.slug === slug) ?? null
}

// /hospital 통합 페이지 — 전 언어 묶음을 한 번에(allLocales=1). 클라이언트가 토글로 전환.
const SAMPLE_I18N: HospitalI18n[] = SAMPLE_HOSPITALS.map((h) => ({
  slug: h.slug,
  departments: h.departments,
  region: h.region,
  establishedYear: h.establishedYear,
  logoUrl: h.logoUrl,
  heroImageUrl: h.heroImageUrl,
  galleryUrls: h.galleryUrls,
  doctors: h.doctors,
  translations: {
    ko: {
      name: h.name,
      tagline: h.tagline,
      summary: h.summary,
      strengths: h.strengths,
      signatureTreatments: h.signatureTreatments,
    },
  },
}))

// API 응답을 HospitalI18n 으로 정규화. 구버전 API(단일 locale·translations 없음)도 ko 맵으로 폴백.
function normalizeI18n(h: Record<string, unknown>): HospitalI18n {
  const get = <T>(k: string, d: T): T => (h[k] === undefined || h[k] === null ? d : (h[k] as T))
  const base = {
    slug: get("slug", ""),
    departments: get<string[]>("departments", []),
    region: get<string | null>("region", null),
    establishedYear: get<number | null>("establishedYear", null),
    logoUrl: get<string | null>("logoUrl", null),
    heroImageUrl: get<string | null>("heroImageUrl", null),
    galleryUrls: get<string[]>("galleryUrls", []),
    doctors: get<Doctor[]>("doctors", []),
  }
  const tr = h.translations as Record<string, LocaleContent> | undefined
  if (tr && typeof tr === "object") return { ...base, translations: tr }
  // 구형식 폴백 — 단일 locale 필드를 ko 맵으로
  return {
    ...base,
    translations: {
      ko: {
        name: get<string>("name", base.slug),
        tagline: get<string | null>("tagline", null),
        summary: get<string | null>("summary", null),
        strengths: get<string[]>("strengths", []),
        signatureTreatments: get<string[]>("signatureTreatments", []),
      },
    },
  }
}

export async function getAllHospitals(): Promise<{ hospitals: HospitalI18n[]; usingSample: boolean }> {
  try {
    const res = await fetch(`${INTRANET_URL}/api/public/partner-hospitals?allLocales=1`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    const raw = await res.json()
    const list = (Array.isArray(raw) ? raw : []).map(normalizeI18n)
    if (list.length === 0) return { hospitals: SAMPLE_I18N, usingSample: true }
    return { hospitals: list, usingSample: false }
  } catch {
    return { hospitals: SAMPLE_I18N, usingSample: true }
  }
}

// /hospital 언어 토글 (한국어·영어·일본어·중국어·대만어)
export const TOGGLE_LOCALES = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "zh-CN", label: "简体中文" },
  { value: "zh-TW", label: "繁體中文" },
] as const
export type ToggleLocale = (typeof TOGGLE_LOCALES)[number]["value"]

// 진료과목 고정 표시 순서(의료관광 수요 높은 순). 데이터에 없는 과목은 뒤에 자동 추가.
export const DEPARTMENT_ORDER = [
  "피부과",
  "성형외과",
  "모발이식",
  "안과",
  "치과",
  "한방",
]

export type Dict = {
  title: string
  subtitle: string
  intro: string
  filterAll: string
  signatureTreatments: string
  strengths: string
  established: string
  visitSite: string
  inquire: string
  backToList: string
  form: {
    heading: string
    name: string
    contactType: string
    contact: string
    message: string
    submit: string
    sending: string
    success: string
    error: string
    consent: string
  }
}

const DICTS: Record<Locale, Dict> = {
  ko: {
    title: "협력병원",
    subtitle: "열정의시간이 함께하는 병원들",
    intro:
      "엄선된 협력병원을 소개합니다. 각 병원의 대표 시술과 강점을 확인하고, 바로 문의해 보세요.",
    filterAll: "전체",
    signatureTreatments: "대표 시술",
    strengths: "강점",
    established: "개원",
    visitSite: "병원 홈페이지",
    inquire: "자세히 보기",
    backToList: "목록으로",
    form: {
      heading: "열정의시간 무료 상담",
      name: "이름",
      contactType: "연락 수단",
      contact: "연락처",
      message: "문의 내용",
      submit: "문의 보내기",
      sending: "전송 중…",
      success: "문의가 접수되었습니다. 곧 연락드리겠습니다.",
      error: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      consent: "개인정보 수집·이용에 동의합니다.",
    },
  },
  // P2 확장 — 현재는 ko 폴백
  en: null as unknown as Dict,
  ja: null as unknown as Dict,
  "zh-cn": null as unknown as Dict,
  "zh-tw": null as unknown as Dict,
  vi: null as unknown as Dict,
}

export function getDict(locale: Locale): Dict {
  return DICTS[locale] ?? DICTS.ko
}

export const CONTACT_TYPES = [
  { value: "email", label: "이메일 (Email)" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "line", label: "LINE" },
  { value: "wechat", label: "WeChat" },
  { value: "kakao", label: "카카오톡 (KakaoTalk)" },
  { value: "phone", label: "전화 (Phone)" },
] as const
