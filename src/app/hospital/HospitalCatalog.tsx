"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  TOGGLE_LOCALES,
  type ToggleLocale,
  type HospitalI18n,
  type LocaleContent,
  DEPARTMENT_ORDER,
  toToggleLocale,
} from "@/lib/hospital-portal"

type UIStrings = {
  title: string
  subtitle: string
  intro: string
  all: string
  detail: string
  mohw: string
}

const UI: Record<ToggleLocale, UIStrings> = {
  ko: { title: "협력병원", subtitle: "열정의시간이 함께하는 병원들", intro: "각 병원의 강점·대표 시술·원장을 확인하고, 열정의시간으로 편하게 문의해 보세요.", all: "전체", detail: "자세히 보기", mohw: "보건복지부 등록 외국인환자 유치 마케팅 기업" },
  en: { title: "Partner Hospitals", subtitle: "Clinics we work with", intro: "Explore each clinic's strengths, signature treatments and doctors, then reach out to Time of Passion.", all: "All", detail: "View details", mohw: "Registered with Korea's Ministry of Health & Welfare (foreign patient attraction)" },
  ja: { title: "提携病院", subtitle: "TIME OF PASSIONが共に歩む病院", intro: "各病院の強み・代表施術・院長をご確認のうえ、TIME OF PASSIONへお気軽にお問い合わせください。", all: "すべて", detail: "詳細を見る", mohw: "韓国 保健福祉部 登録 外国人患者誘致マーケティング企業" },
  "zh-CN": { title: "合作医院", subtitle: "与TIME OF PASSION同行的医院", intro: "了解各医院的优势·代表项目·院长，并通过TIME OF PASSION轻松咨询。", all: "全部", detail: "查看详情", mohw: "韩国保健福祉部注册 外国患者招引营销企业" },
  "zh-TW": { title: "合作醫院", subtitle: "與TIME OF PASSION同行的醫院", intro: "了解各醫院的優勢·代表療程·院長，並透過TIME OF PASSION輕鬆諮詢。", all: "全部", detail: "查看詳情", mohw: "韓國保健福祉部登錄 外國患者招攬行銷企業" },
  vi: { title: "Bệnh viện đối tác", subtitle: "Các bệnh viện đồng hành cùng Time of Passion", intro: "Khám phá thế mạnh·thủ thuật tiêu biểu·bác sĩ của từng bệnh viện, rồi liên hệ Time of Passion một cách thoải mái.", all: "Tất cả", detail: "Xem chi tiết", mohw: "Doanh nghiệp marketing thu hút bệnh nhân nước ngoài đã đăng ký với Bộ Y tế Hàn Quốc" },
}

function pick(h: HospitalI18n, locale: ToggleLocale): LocaleContent {
  return (
    h.translations[locale] ??
    h.translations.ko ??
    Object.values(h.translations)[0] ?? {
      name: h.slug,
      tagline: null,
      summary: null,
      strengths: [],
      signatureTreatments: [],
    }
  )
}

export default function HospitalCatalog({ hospitals }: { hospitals: HospitalI18n[] }) {
  const [locale, setLocale] = useState<ToggleLocale>("ko")
  const [dept, setDept] = useState<string | null>(null)

  // 외부(koreamedguide 등 영문) 유입이 ?lang=en 으로 언어를 고정해 딥링크할 때 초기 언어 반영.
  // 서버 프리렌더는 ko(정적 유지), 마운트 후 URL 쿼리로 전환 → hydration 안전.
  useEffect(() => {
    const loc = toToggleLocale(new URLSearchParams(window.location.search).get("lang"))
    if (loc) setLocale(loc)
  }, [])
  const t = UI[locale]

  const departments = useMemo(() => {
    const set = new Set<string>()
    hospitals.forEach((h) => h.departments.forEach((d) => set.add(d)))
    const ordered = DEPARTMENT_ORDER.filter((d) => set.has(d))
    const rest = [...set].filter((d) => !ordered.includes(d))
    return [...ordered, ...rest]
  }, [hospitals])

  const visible = dept ? hospitals.filter((h) => h.departments.includes(dept)) : hospitals

  return (
    <main className="hp-portal">
      <section className="hp-hero">
        <p className="hp-hero__eyebrow">TIME OF PASSION · PARTNER HOSPITALS</p>
        <h1 className="hp-hero__title">{t.title}</h1>
        <p className="hp-hero__subtitle">{t.subtitle}</p>
        <p className="hp-hero__intro">{t.intro}</p>
        <div className="hp-hero__mohw">
          <span className="hp-hero__mohw-ico" aria-hidden>✓</span>
          {t.mohw}
        </div>

        {/* 언어 토글 */}
        <div className="hp-langbar">
          {TOGGLE_LOCALES.map((l) => (
            <button
              key={l.value}
              type="button"
              className={`hp-lang ${locale === l.value ? "is-active" : ""}`}
              onClick={() => setLocale(l.value)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </section>

      {departments.length > 0 && (
        <div className="hp-filter">
          <button className={`hp-chip ${dept === null ? "is-active" : ""}`} onClick={() => setDept(null)}>
            {t.all}
          </button>
          {departments.map((d) => (
            <button key={d} className={`hp-chip ${dept === d ? "is-active" : ""}`} onClick={() => setDept(d)}>
              {d}
            </button>
          ))}
        </div>
      )}

      <ul className="hp-grid">
        {visible.map((h) => {
          const c = pick(h, locale)
          return (
            <li key={h.slug}>
              <Link className="hp-card" href={`/hospital/${h.slug}`}>
                <div className="hp-card__media">
                  {h.heroImageUrl ? (
                    <img src={h.heroImageUrl} alt="" className="hp-card__img" />
                  ) : (
                    <div className="hp-card__placeholder" aria-hidden>
                      {h.logoUrl ? (
                        <img src={h.logoUrl} alt="" className="hp-card__logo" />
                      ) : (
                        <div className="hp-card__fallback">
                          <span className="hp-card__fallback-brand">TIME OF PASSION</span>
                          <span className="hp-card__fallback-name">{c.name}</span>
                          {h.departments[0] && (
                            <span className="hp-card__fallback-dept">
                              {h.departments[0]}
                              {h.region ? ` · ${h.region}` : ""}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="hp-card__body">
                  <div className="hp-card__tags">
                    {h.departments.slice(0, 3).map((d) => (
                      <span key={d} className="hp-card__tag">{d}</span>
                    ))}
                    {h.region && <span className="hp-card__region">{h.region}</span>}
                  </div>
                  <h2 className="hp-card__name">{c.name}</h2>
                  {c.tagline && <p className="hp-card__tagline">{c.tagline}</p>}
                  {c.signatureTreatments.length > 0 && (
                    <div className="hp-card__treatments">
                      {c.signatureTreatments.slice(0, 3).map((s) => (
                        <span key={s} className="hp-card__treatment">{s}</span>
                      ))}
                    </div>
                  )}
                  <span className="hp-card__cta">{t.detail} →</span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
