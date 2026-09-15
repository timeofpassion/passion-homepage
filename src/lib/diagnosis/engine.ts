// @ts-nocheck
// ★정본 = 이 파일 (2026-09-15 설계 시안 dev/survey-quote/engine.mjs 에서 옮김). 규칙을 바꾸면 여기만 고친다.
// 진단형 견적 — 설문 답변 → 3축 자가진단 + 해외 궁금증 답 + 맞춤 로드맵(먼저 깔 것 / 매달 / 얹을 것) + 금액
// 정본 설계 = passion-vault/_공통/인트라넷-기능카탈로그/feat-진단형견적.md
// 이 파일 하나를 시뮬레이터(HTML)·홈페이지·인트라넷 초안 생성이 같이 쓴다. 규칙을 바꾸면 여기만 고친다.
// 금액은 인트라넷 상품 DB(2026-09-15) 기준, VAT 별도, 만원 단위.

// 문구 원칙(2026-09-15 대표): 원장님께 드리는 제안서 말투 · 한 줄 · 반말·물음표식 금지 · 건방지지 않게
export const QUESTIONS = {
  openWhen: {
    q: "개원 예정 시기를 선택해 주세요", multi: false, when: (a) => a.opening,
    options: [["m1", "1개월 이내"], ["m3", "1~3개월"], ["m6", "3개월 이후"]],
  },
  countries: { q: "환자 유치를 원하시는 국가를 선택해 주세요", multi: true, other: "기타 국가 (직접 입력)", options: [["kr", "국내"], ["jp", "일본"], ["cn", "중국"], ["tw", "대만"]] },
  pains: {
    q: "현재 마케팅에서 가장 고민되시는 부분을 선택해 주세요", multi: true, other: "기타 (직접 입력)", when: (a) => a.countries.includes("kr") && !a.opening,
    options: [
      ["search", "네이버 검색·플레이스 노출이 약합니다", "", "노출"],
      ["launch", "신규 시술·장비를 알리고 싶습니다", "", "노출"],
      ["reviews", "리뷰·후기가 경쟁 병원보다 적습니다", "", "신뢰"],
      ["branding", "원장님의 전문성을 브랜딩하고 싶습니다", "", "신뢰"],
      ["ads", "광고비 대비 문의·예약 전환이 낮습니다", "", "전환"],
      ["measure", "마케팅 성과를 수치로 확인하기 어렵습니다", "", "전환"],
      ["integrate", "여러 업체를 한 팀으로 통합하고 싶습니다", "", "운영"],
      ["compliance", "의료광고 심의·민원 대응이 부담됩니다", "", "운영"],
    ],
  },
  openPains: {
    q: "개원 준비 중 가장 고민되시는 부분을 선택해 주세요", multi: true, other: "기타 (직접 입력)", when: (a) => a.countries.includes("kr") && a.opening,
    options: [
      ["openFind", "개원일부터 검색에 노출되고 싶습니다", "", "노출"],
      ["openFirst", "개원 초기 신규 환자를 확보하고 싶습니다", "", "노출"],
      ["openBrand", "원장님 브랜딩을 먼저 하고 싶습니다", "", "신뢰"],
      ["openCompliance", "개원 광고의 의료광고 심의가 걱정됩니다", "", "운영"],
      ["openBudget", "예산 안에서 우선순위를 정하고 싶습니다", "", "운영"],
    ],
  },
  concerns: {
    q: "해외 환자 유치와 관련해 확인하고 싶으신 내용을 선택해 주세요", multi: true, other: "기타 (직접 입력)", when: (a) => a.countries.some((c) => c !== "kr"),
    hint: "선택하신 항목의 답변을 진단 리포트에 담아 드립니다",
    options: [
      ["demand", "진료과별 해외 환자 수요"],
      ["where", "국가별 진출 순서와 채널"],
      ["cost", "비용 구조 (정액형 · 성과 수수료형)"],
      ["talk", "외국어 상담·통역 운영 방식"],
      ["rules", "해외 플랫폼의 의료광고 규제"],
      ["time", "시작부터 성과까지 예상 기간"],
    ],
  },
  ready: {
    q: "해외 환자 유치를 위해 준비된 항목을 선택해 주세요", multi: true, other: "기타 (직접 입력)", when: (a) => a.countries.some((c) => c !== "kr"),
    options: [
      ["site", "외국어 홈페이지"], ["sns", "해외 SNS 계정 운영"], ["content", "외국어 콘텐츠 (영상·게시물)"],
      ["desk", "외국어 상담 창구 (LINE·위챗 등)"], ["agency", "외국인환자 유치기관 등록"], ["self", "원내 해외 마케팅 담당자"],
    ],
  },
  doing: {
    q: "현재 운영 중인 채널·서비스를 선택해 주세요", multi: true, other: "기타 (직접 입력)", hint: "직접 운영과 대행을 모두 포함해 주세요", when: (a) => !a.opening,
    options: [
      ["homepage", "홈페이지", "", "채널"], ["blog", "블로그", "", "채널"], ["place", "네이버 플레이스 관리", "", "채널"], ["insta", "인스타그램", "", "채널"], ["youtube", "유튜브", "", "채널"], ["kakao", "카카오톡 채널", "", "채널"],
      ["naverAds", "네이버 광고", "", "광고·플랫폼"], ["metaAds", "META 광고 (인스타그램·페이스북)", "", "광고·플랫폼"], ["platform", "강남언니·여신티켓 등 플랫폼", "", "광고·플랫폼"], ["otherAgency", "타 마케팅 대행사 이용", "", "광고·플랫폼"],
    ],
  },
  budget: { q: "월 마케팅 예산 범위를 선택해 주세요", multi: false, options: [["s", "400만 원 이하"], ["m", "400만 ~ 800만 원"], ["l", "800만 ~ 1,500만 원"], ["xl", "1,500만 원 이상"]] },
}

const CEILING = { s: 400, m: 800, l: 1500, xl: Infinity }

export const P = {
  kr: { id: "c92f352c9wfecvlsu74jpupjk", name: "국내 병원마케팅 패키지", tiers: { LITE: 400, STANDARD: 600, DELUXE: 800, PREMIUM: 1000 } },
  cn: { id: "cmr0bz44x000009klxh3fhdbx", name: "중국 통합마케팅 패키지", price: 400 },
  tw: { id: "cmr0ecxx000000aktqalysro7", name: "대만 통합마케팅 패키지", price: 400 },
  jp: { id: "cmquk5pl900000ajhsaqo7asw", name: "일본 인플루언서 체험단 10명", price: 300 },
  xhsSeed: { id: "cmr0g41jo000009hzrakl2rvv", name: "샤오홍슈 체험단 10명", price: 150 },
  xhsPress: { id: "cmr1ik4ej000004l2gd8jxarg", name: "샤오홍슈 기자단 20건", price: 100 },
  siteNew1: { id: "c97b2f8a6u3fsguc8f50s1pdv", name: "병원 홈페이지 · 원페이지", price: 200 },
  siteNew: { id: "c97b2f8a6u3fsguc8f50s1pdv", name: "병원 홈페이지 · 기본형", price: 600 },
  siteNewGlobal: { id: "c97b2f8a6u3fsguc8f50s1pdv", name: "병원 홈페이지 · 해외 동시형(언어 2개)", price: 1200 },
  siteFix: { id: "c97b2f8a6ygntfw5l8nvh2p1x", name: "기존 홈페이지 살리기 · SEO 안정화", price: 100 },
  siteFixLang: { id: "c97b2f8a6ygntfw5l8nvh2p1x", name: "기존 홈페이지 살리기 · 안정화 + 외국어 1개", price: 400 },
  landing: { id: "cmqyqh8bd000504juch07zip7", name: "랜딩페이지 디자인", price: 30 },
  shorts: { id: "cmqyj0rkf00010aglc74fbk59", name: "유튜브 쇼츠 8건", price: 240 },
}

// 결과 화면의 「받는 것」 — 인트라넷 상품 옵션 기준 요약(2026-09-15)
export const GETS = {
  LITE: ["블로그 8건 → 홈페이지 연동 색인", "플레이스·구글 리뷰 10건", "블로그 체험단 2건", "카페 바이럴 5건", "카카오 채널 소식 2건", "네이버 검색광고 운영", "월간 보고서"],
  STANDARD: ["라이트 전부", "인스타 체험단 2건 · 디자인 10건 · 랜딩 3건", "담당 PM 월 1회 미팅", "의료광고 심의 대행 · 문구 점검", "문의 → 예약 전환 숫자", "상담 스크립트 정비"],
  DELUXE: ["스탠다드 전부", "META 광고 기획·소재·성과관리", "GA4·카카오 전환 설정", "쇼츠 6건 (해외용 원본 포함)", "유튜브·인스타·네이버TV 업로드"],
  PREMIUM: ["디럭스 전부", "풀 영상 4건 + 쇼츠 8건", "해외용 원본으로 각색 지원"],
  cn: ["샤오홍슈 기업 인증·계정 운영", "콘텐츠 월 8편", "체험단·기자단 운영", "광고 운영대행"],
  tw: ["쇼츠 8 · 풀영상 4 번체 자막", "인스타·페이스북 업로드", "META 광고 최적화", "구글맵 리뷰 10건 · 번체 페이지 색인"],
  jp: ["일본 인플루언서 10명 실제 방문", "인스타·틱톡·X 게시", "인원 × 단가 표"],
  xhsSeed: ["중국 인플루언서 10명 방문 체험", "일상 vlog 형식 게시"],
  xhsPress: ["후기 20건 게시", "병원명·시술명 검색 결과 채우기"],
  siteNew1: ["원페이지 제작", "검색 등록", "전화·카카오 연결"],
  siteNew: ["메인 + 서브 5", "검색 최적화 기본", "문의 연결"],
  siteNewGlobal: ["메인 + 서브 5", "외국어 2개", "검색 최적화 기본"],
  siteFix: ["재분석·SEO 안정화", "속도·모바일 점검"],
  siteFixLang: ["SEO 안정화", "외국어 1개 추가"],
  landing: ["후킹 카피 기획", "강남언니·이벤트 랜딩"],
  shorts: ["기획·촬영·편집 8건"],
}

// 해외 궁금증에 대한 답 — 출처가 있는 사실만. 바뀌면 여기만 고친다.
export const FAQ = {
  demand: { a: "2024년 한국을 찾은 외국인 환자는 117만 명으로 2020년보다 크게 늘었고, 일본 환자가 가장 많습니다. 일본 환자의 진료과는 피부과·성형외과가 대부분입니다. 대만 방한객도 2025년 189만 명(전년 대비 +28.3%)입니다.", src: "보건복지부 외국인환자 유치 실적(2024) · 문화체육관광부·한국관광공사 방한 외래관광객 집계(2025)" },
  where: { a: "진료과·가격대·지금 들어오는 외국인 문의의 국적으로 정합니다. 일본은 LINE, 중국은 샤오홍슈, 대만은 유튜브·인스타·구글이 주 경로라 채널이 완전히 다릅니다. 한 나라에서 반응을 본 뒤 넓히는 게 비용이 적게 듭니다." },
  cost: { a: "두 방식이 있습니다. ① 마케팅 정액형 — 월 정액(나라별 월 400만 원부터)으로 마케팅만 맡기고 상담·내원은 병원이 직접. 수수료가 없습니다. ② 성과 수수료형 — 초기 부담은 적고 환자 진료비의 일정 비율(일본 운영 기준 피부과 20%·성형외과 30%)을 냅니다. 이 방식은 외국인환자 유치기관 등록이 필요합니다." },
  talk: { a: "원내에 담당자가 있으면 LINE·위챗 등 창구와 응대 스크립트만 세팅해 드리고, 없으면 상담 창구 운영을 함께 설계합니다. 통역은 필요한 시간 기준으로 따로 안내합니다." },
  rules: { a: "중국 샤오홍슈는 2026년 2월부터 의료 미용 협찬 표현을 강하게 제한합니다. 한국 병원은 개인 의사 인증을 받을 수 없어 기업 인증 계정이 유일한 합법 경로이고, 인증 없이 위챗 ID를 적으면 노출 제한·정지로 이어집니다. 콘텐츠는 여행·일상 형식으로 설계합니다." },
  time: { a: "해외 인플루언서 체험단은 모집부터 게시까지 약 4주, 샤오홍슈 기업 인증은 승인까지 2~3주가 걸립니다. 첫 달은 계정·창구 세팅, 둘째 달부터 콘텐츠와 문의가 쌓이는 흐름이 일반적입니다." },
}

// 병원 채널 확인값(네이버 지역 검색 + 홈페이지 한 장 + 블로그 검색) → 「하고 있는 것」 자동 체크
// 원장님은 고치기만 한다. 확인 못 한 값(null)은 체크하지도, 없다고 단정하지도 않는다.
export function prefillDoing(ch = {}) {
  const q = ch.quick || {}
  const out = []
  if (ch.homepage) out.push("homepage")
  if (ch.blogMentions30d > 0 || q.naverBlog) out.push("blog")
  if (ch.instagram || q.instagram) out.push("insta")
  if (ch.youtube || q.youtube) out.push("youtube")
  if (q.kakao) out.push("kakao")
  return out
}

// 나라별 페이지 언어 — 영어 페이지가 있어도 대만을 원하면 번체 페이지는 따로 필요하다
const LANG = { jp: ["ja", "jp"], cn: ["zh", "cn", "zh-cn", "zh-hans"], tw: ["tw", "zh-tw", "zh-hant"] }
const LANG_NAME = { jp: "일본어", cn: "중국어(간체)", tw: "번체(대만)" }
const CODE_NAME = { en: "영어", ja: "일본어", jp: "일본어", zh: "중국어", cn: "중국어(간체)", "zh-cn": "중국어(간체)", "zh-hans": "중국어(간체)", tw: "번체", "zh-tw": "번체", "zh-hant": "번체", vi: "베트남어", th: "태국어", ru: "러시아어" }
const codeNames = (xs) => [...new Set(xs.map((x) => CODE_NAME[x] || x))].join("·")
function langGap(ans) {
  const q = ans.channels?.quick
  const overseas = ans.countries.filter((c) => LANG[c])
  if (!q) return { known: false, missing: ans.ready.includes("site") ? [] : overseas, have: [] }
  const found = [...(q.langLinks || []), ...(q.hreflang || [])].map((x) => x.toLowerCase())
  const have = [...new Set(found)]
  return { known: true, missing: overseas.filter((c) => !LANG[c].some((l) => have.includes(l))), have }
}

const TIER_ORDER = ["LITE", "STANDARD", "DELUXE", "PREMIUM"]
const PAIN_TIER = { search: "LITE", reviews: "LITE", launch: "LITE", measure: "STANDARD", integrate: "STANDARD", compliance: "STANDARD", ads: "DELUXE", branding: "DELUXE",
  openFind: "LITE", openFirst: "LITE", openBudget: "LITE", openCompliance: "STANDARD", openBrand: "DELUXE" }
const BUDGET_TIER = { s: "LITE", m: "STANDARD", l: "DELUXE", xl: "PREMIUM" }
const label = (key, v) => QUESTIONS[key].options.find((o) => o[0] === v)?.[1] ?? v
// 개원 고민도 같은 칸(pains)으로 계산한다 — 제목은 어느 질문에서 왔든 찾아 쓴다
const painLabel = (v) => (QUESTIONS.pains.options.find((o) => o[0] === v) || QUESTIONS.openPains.options.find((o) => o[0] === v))?.[1] ?? v
const clamp = (n) => Math.max(8, Math.min(92, n))

// 3축 자가진단 — 답변만으로 계산한 "지금 어디가 약한가". 실측이 아니므로 화면에 반드시 그렇게 적는다.
function diagnose(ans) {
  const q = ans.channels?.quick
  const blog = ans.channels?.blogMentions30d
  const d = (x) => ans.doing.includes(x)
  const p = (x) => ans.pains.includes(x)
  const axes = [
    {
      key: "find", name: "발견", desc: "검색·지도에서 병원이 보이는가",
      score: clamp(25 + 14 * ["homepage", "blog", "place", "naverAds", "metaAds"].filter(d).length - (p("search") ? 22 : 0) - (p("launch") ? 8 : 0)),
      why: typeof blog === "number" && blog < 5 ? `최근 한 달 병원 이름이 들어간 블로그 글이 ${blog}건입니다` : p("search") ? "검색·플레이스 노출이 약하다고 답하셨습니다" : ["homepage", "blog", "place"].filter(d).length >= 2 ? `${["homepage", "blog", "place"].filter(d).map((x) => label("doing", x)).join("·")}를 운영 중입니다` : "검색에 잡힐 채널이 적습니다",
    },
    {
      key: "trust", name: "신뢰", desc: "후기·원장 전문성이 쌓여 있는가",
      score: clamp(25 + 16 * ["insta", "youtube", "platform"].filter(d).length - (p("reviews") ? 22 : 0) - (p("branding") ? 14 : 0)),
      why: p("reviews") ? "리뷰·후기가 경쟁 병원보다 적다고 답하셨습니다" : p("branding") ? "원장님 브랜딩을 키우고 싶다고 답하셨습니다" : d("youtube") ? "영상 채널이 있습니다" : "후기·영상 같은 신뢰 자산이 적습니다",
    },
    {
      key: "convert", name: "전환", desc: "문의가 예약으로 이어지고 숫자로 보이는가",
      score: clamp(30 + 18 * ["kakao", "platform"].filter(d).length - (p("ads") ? 20 : 0) - (p("measure") ? 18 : 0) - (p("integrate") ? 10 : 0) - (q && !q.ga4 && !q.metaPixel ? 12 : 0)),
      why: q && !q.ga4 && !q.metaPixel ? "홈페이지에 방문·광고 전환 측정 도구가 없습니다" : q && !q.naverBooking && !q.kakao ? "홈페이지에 예약·카카오 문의 연결이 없습니다" : p("measure") ? "무엇이 효과인지 모르겠다고 답하셨습니다" : p("ads") ? "광고비 대비 문의·예약이 그대로라고 답하셨습니다" : d("kakao") ? "카카오 채널로 문의를 받고 있습니다" : "문의 창구·전환 측정이 약합니다",
    },
  ]
  if (ans.countries.some((c) => c !== "kr")) {
    const r = (x) => ans.ready.includes(x)
    axes.push({
      key: "global", name: "해외 준비", desc: "외국 환자가 찾고, 묻고, 예약할 수 있는가",
      score: clamp(10 + 15 * ["site", "sns", "content", "desk", "agency", "self"].filter(r).length),
      why: (() => {
        const g = langGap(ans)
        if (g.known && g.missing.length) return (g.have.length ? `홈페이지에 ${codeNames(g.have)} 페이지는 있지만 ` : "홈페이지에 ") + g.missing.map((c) => LANG_NAME[c]).join("·") + " 페이지가 없습니다"
        if (g.known) return "고르신 나라 언어의 페이지가 홈페이지에 있습니다"
        return null
      })() || (r("site") && r("desk") ? "외국어 홈페이지와 상담 창구가 있습니다" : !r("site") ? "외국어 홈페이지가 없어 환자가 병원을 다시 확인할 곳이 없습니다" : "외국어 상담 창구가 없어 문의가 끊길 수 있습니다"),
    })
  }
  const weakest = [...axes].sort((a, b) => a.score - b.score)[0]
  return { axes, weakest: weakest.name }
}

export function recommend(a) {
  const ans = { countries: [], pains: [], openPains: [], concerns: [], ready: [], doing: [], budget: "m", ...a }
  if (ans.opening) { ans.doing = []; ans.pains = [...ans.openPains] }
  const foundation = [] // 1회
  const engine = [] // 매달
  const amplify = [] // 여유 되면
  const notes = []
  const cut = []
  const has = (x) => ans.doing.includes(x)
  const overseas = ans.countries.filter((c) => c !== "kr")

  // ── 국내 ──
  let krTier = null
  if (ans.countries.includes("kr")) {
    const wanted = ans.pains.map((p) => PAIN_TIER[p]).filter(Boolean)
    const need = wanted.reduce((m, t) => (TIER_ORDER.indexOf(t) > TIER_ORDER.indexOf(m) ? t : m), "LITE")
    const cap = BUDGET_TIER[ans.budget]
    krTier = TIER_ORDER.indexOf(need) > TIER_ORDER.indexOf(cap) ? cap : need
    if ((ans.pains.includes("branding") || ans.pains.includes("openBrand")) && ans.budget === "xl") krTier = "PREMIUM"
    const why = ans.pains.length ? ans.pains.map((p) => `「${painLabel(p)}」`).join(" · ") : ans.opening ? "개원과 함께 국내 환자를 모으고 싶다" : "국내 환자를 늘리고 싶다"
    engine.push({ ...P.kr, key: krTier, tier: krTier, name: `${P.kr.name} · ${krTier}`, price: P.kr.tiers[krTier], why })
    if (TIER_ORDER.indexOf(need) > TIER_ORDER.indexOf(krTier)) {
      notes.push(`고민을 다 채우려면 ${need}(월 ${P.kr.tiers[need]}만)가 맞지만, 금액대에 맞춰 ${krTier}로 시작합니다.`)
      if (ans.pains.includes("ads") && TIER_ORDER.indexOf(krTier) < 2) amplify.push({ ...P.landing, key: "landing", why: "「광고비는 느는데 문의·예약은 그대로」 — 광고 최적화 전, 새는 랜딩부터" })
      if ((ans.pains.includes("branding") || ans.pains.includes("openBrand")) && TIER_ORDER.indexOf(krTier) < 2) amplify.push({ ...P.shorts, key: "shorts", why: "「원장님 브랜딩」 — 디럭스 전까지 쇼츠로 원장님 얼굴부터" })
    }
    if ((ans.pains.includes("launch") || ans.pains.includes("openFirst")) && !amplify.some((x) => x.key === "landing")) amplify.push({ ...P.landing, key: "landing", why: "「새 시술·장비」 — 그 시술 하나를 위한 랜딩" })
    if (ans.opening) notes.push({ m1: "개원까지 한 달이 안 남아, 첫 주에 플레이스 등록·홈페이지 원페이지·카카오 채널부터 엽니다.", m3: "개원 4주 전까지 홈페이지와 플레이스를 열고, 2주 전부터 블로그·체험단으로 오픈일에 검색 결과를 채웁니다.", m6: "개원 전 석 달은 원장님 브랜딩(영상·인터뷰)을 먼저 쌓고, 한 달 전부터 검색·후기를 엽니다." }[ans.openWhen] || "개원 일정에 맞춰 홈페이지·플레이스부터 엽니다.")
    if (ans.pains.includes("openBudget")) notes.push("개원 초기엔 라이트로 검색·리뷰를 먼저 깔고, 신환이 들어오기 시작하면 단계를 올리는 순서를 권합니다.")
    if (ans.pains.includes("integrate")) notes.push("업체가 여럿이면 지금 계약 범위를 받아 겹치는 걸 정리하고, 담당 PM 한 명이 매달 한 장의 보고서로 묶습니다.")
    const inherit = ["blog", "place", "naverAds", "metaAds", "insta", "kakao"].filter(has)
    if (inherit.length) notes.push(`이미 하고 계신 ${inherit.map((k) => label("doing", k)).join("·")}는 새로 만들지 않고 이어받습니다. 직접 운영 중이면 계속 하시고 저희는 방향·성과만 맞출 수도 있습니다.`)
  }

  // ── 홈페이지(기반) ──
  const gap = langGap(ans)
  const needLang = gap.missing.length > 0
  const langWhy = gap.known && gap.have.length ? `${codeNames(gap.have)} 페이지는 있지만 ${gap.missing.map((c) => LANG_NAME[c]).join("·")} 페이지가 없음` : "해외 환자가 병원을 다시 확인하는 외국어 페이지가 없음"
  if (!has("homepage")) {
    if (needLang) foundation.push({ ...P.siteNewGlobal, key: "siteNewGlobal", why: "홈페이지가 없고, 해외 환자가 볼 외국어 페이지도 필요" })
    else if (ans.countries.includes("kr")) foundation.push({ ...(ans.budget === "s" ? P.siteNew1 : P.siteNew), key: ans.budget === "s" ? "siteNew1" : "siteNew", why: ans.opening ? "개원 병원 — 검색·광고가 도착할 첫 자리" : "홈페이지가 없으면 검색·광고가 도착할 곳이 없음" })
  } else if (needLang) {
    foundation.push({ ...P.siteFixLang, key: "siteFixLang", why: langWhy })
  } else if (ans.pains.includes("search")) {
    foundation.push({ ...P.siteFix, key: "siteFix", why: "「검색에서 밀린다」 — 지금 사이트의 검색 기본기부터" })
  }

  // ── 해외 ──
  const r = (x) => ans.ready.includes(x)
  for (const c of overseas) {
    if (c === "cn") {
      engine.push({ ...P.cn, key: "cn", why: r("sns") ? "중국 — 운영 중인 계정을 기업 인증으로 전환해 운영" : "중국 — 샤오홍슈 기업 인증 계정부터 합법적으로" })
      if (ans.budget === "l" || ans.budget === "xl") amplify.push({ ...P.xhsSeed, key: "xhsSeed", why: "중국 — 실제 방문 후기로 저장·문의 늘리기" })
      amplify.push({ ...P.xhsPress, key: "xhsPress", why: "중국 — 병원명·시술명 검색 결과 채우기" })
    }
    if (c === "tw") engine.push({ ...P.tw, key: "tw", why: r("content") ? "대만 — 가진 외국어 콘텐츠를 번체로 넓혀 문의까지" : "대만 — 유튜브·META·구글 검색으로 문의까지" })
    if (c === "jp") amplify.push({ ...P.jp, key: "jp", why: "일본 — 소액 체험단으로 반응부터(월 운영은 일본 제안서의 A·B 트랙)" })
  }
  if (overseas.length && !r("desk")) notes.push(r("self") ? "원내 담당자가 있으니 LINE·위챗 창구와 응대 스크립트만 첫 달에 세팅합니다." : "외국어 상담 창구와 응대 담당이 없어, 첫 달에 창구 세팅과 운영 방식을 함께 정합니다.")
  if (overseas.length && !r("agency")) notes.push("성과 수수료형으로 하려면 외국인환자 유치기관 등록이 필요합니다. 마케팅 정액형이면 등록 없이도 됩니다.")
  if (overseas.length && krTier && TIER_ORDER.indexOf(krTier) >= 2) notes.push("국내 디럭스 이상은 영상 클린 원본이 나와, 해외 채널에 재촬영 없이 씁니다.")
  if (has("otherAgency")) notes.push("다른 대행사 범위를 확인해 겹치는 항목은 빼고 제안드립니다.")

  // ── 금액대 맞추기: 매달 합계가 상한을 넘으면 얹을 것 → 해외 엔진 순으로 뺀다 ──
  const ceiling = CEILING[ans.budget]
  const monthly = () => engine.reduce((s, x) => s + x.price, 0) + amplify.reduce((s, x) => s + x.price, 0)
  while (monthly() > ceiling && amplify.length) cut.push(amplify.pop())
  while (monthly() > ceiling && engine.length > 1) cut.push(engine.pop())
  if (cut.length) notes.push(`금액대에 맞추느라 뒤로 미룬 것: ${cut.map((x) => x.name).join(", ")}`)

  // 답한 고민을 무엇이 채우나 — 못 채우면 숨기지 않고 「상담에서」로 보여준다
  const all = [...foundation, ...engine, ...amplify]
  const coverage = ans.pains.map((p) => {
    const by = []
    if (krTier && TIER_ORDER.indexOf(krTier) >= TIER_ORDER.indexOf(PAIN_TIER[p])) by.push(`국내 ${krTier}`)
    if (p === "search" && all.some((x) => x.key?.startsWith("site"))) by.push("홈페이지")
    if ((p === "ads" || p === "launch") && all.some((x) => x.key === "landing")) by.push("랜딩페이지")
    if (p === "branding" && all.some((x) => x.key === "shorts")) by.push("쇼츠")
    if (p === "openFind" && all.some((x) => x.key?.startsWith("site"))) by.push("홈페이지")
    if (p === "openFirst" && all.some((x) => x.key === "landing")) by.push("오픈 랜딩")
    if (p === "openBrand" && all.some((x) => x.key === "shorts")) by.push("쇼츠")
    return { pain: p, label: painLabel(p), by, covered: by.length > 0 }
  })
  const faq = ans.concerns.filter((c) => FAQ[c]).map((c) => ({ q: label("concerns", c), ...FAQ[c] }))
  const others = Object.entries(ans.other || {}).filter(([, v]) => v && v.trim()).map(([k, v]) => ({ q: QUESTIONS[k]?.q ?? k, text: v.trim() }))
  if (ans.memo?.trim()) others.push({ q: "더 알려주신 것", text: ans.memo.trim() })

  const qq = ans.channels?.quick
  const evidence = qq ? [
    ["외국어 페이지" + ([...(qq.langLinks || []), ...(qq.hreflang || [])].length ? ` (${codeNames([...(qq.langLinks || []), ...(qq.hreflang || [])])})` : ""), !!(qq.langLinks?.length || qq.hreflang?.length)], ["네이버 예약 연결", qq.naverBooking], ["카카오톡 채널 연결", qq.kakao],
    ["방문 측정(구글 애널리틱스)", qq.ga4], ["광고 전환 측정(META 픽셀)", qq.metaPixel], ["모바일 대응", qq.mobile],
  ] : []

  return {
    diagnosis: diagnose(ans), faq, evidence, blogMentions30d: ans.channels?.blogMentions30d ?? null,
    foundation, engine, amplify, notes, cut, coverage, others,
    oneTime: foundation.reduce((s, x) => s + x.price, 0),
    monthly: monthly(),
  }
}
