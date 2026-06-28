"use client"
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react"
import {
  TOGGLE_LOCALES,
  type ToggleLocale,
  type HospitalI18n,
  type LocaleContent,
  DEPARTMENT_ORDER,
  CONTACT_TYPES,
} from "@/lib/hospital-portal"

type UIStrings = {
  title: string
  subtitle: string
  intro: string
  all: string
  strengths: string
  signature: string
  doctors: string
  gallery: string
  detail: string
  interest: string
  heading: string
  name: string
  contactType: string
  contact: string
  message: string
  submit: string
  sending: string
  success: string
  consent: string
  close: string
}

const UI: Record<ToggleLocale, UIStrings> = {
  ko: { title: "협력병원", subtitle: "열정의시간이 함께하는 병원들", intro: "각 병원의 강점·대표 시술·원장을 확인하고, 열정의시간으로 편하게 문의해 보세요.", all: "전체", strengths: "강점", signature: "대표 시술", doctors: "원장 소개", gallery: "시설·위치", detail: "자세히 보기", interest: "관심 병원", heading: "열정의시간 무료 상담", name: "이름", contactType: "연락 수단", contact: "연락처", message: "문의 내용", submit: "문의 보내기", sending: "전송 중…", success: "문의가 접수되었습니다. 곧 연락드리겠습니다.", consent: "개인정보 수집·이용에 동의합니다.", close: "닫기" },
  en: { title: "Partner Hospitals", subtitle: "Clinics we work with", intro: "Explore each clinic's strengths, signature treatments and doctors, then reach out to Time of Passion.", all: "All", strengths: "Strengths", signature: "Signature", doctors: "Doctors", gallery: "Facility & Location", detail: "View details", interest: "Hospital of interest", heading: "Free consultation with Time of Passion", name: "Name", contactType: "Contact method", contact: "Contact", message: "Message", submit: "Send inquiry", sending: "Sending…", success: "Received. We'll contact you soon.", consent: "I agree to the collection and use of my personal information.", close: "Close" },
  ja: { title: "提携病院", subtitle: "TIME OF PASSIONが共に歩む病院", intro: "各病院の強み・代表施術・院長をご確認のうえ、TIME OF PASSIONへお気軽にお問い合わせください。", all: "すべて", strengths: "強み", signature: "代表施術", doctors: "院長紹介", gallery: "施設・立地", detail: "詳細を見る", interest: "関心のある病院", heading: "TIME OF PASSION 無料相談", name: "お名前", contactType: "連絡手段", contact: "連絡先", message: "お問い合わせ内容", submit: "送信する", sending: "送信中…", success: "受け付けました。追ってご連絡いたします。", consent: "個人情報の収集・利用に同意します。", close: "閉じる" },
  "zh-CN": { title: "合作医院", subtitle: "与TIME OF PASSION同行的医院", intro: "了解各医院的优势·代表项目·院长，并通过TIME OF PASSION轻松咨询。", all: "全部", strengths: "优势", signature: "代表项目", doctors: "院长介绍", gallery: "设施·位置", detail: "查看详情", interest: "感兴趣的医院", heading: "TIME OF PASSION 免费咨询", name: "姓名", contactType: "联系方式", contact: "联系方式", message: "咨询内容", submit: "发送咨询", sending: "发送中…", success: "已受理，我们会尽快与您联系。", consent: "我同意收集和使用个人信息。", close: "关闭" },
  "zh-TW": { title: "合作醫院", subtitle: "與TIME OF PASSION同行的醫院", intro: "了解各醫院的優勢·代表療程·院長，並透過TIME OF PASSION輕鬆諮詢。", all: "全部", strengths: "優勢", signature: "代表療程", doctors: "院長介紹", gallery: "設施·位置", detail: "查看詳情", interest: "感興趣的醫院", heading: "TIME OF PASSION 免費諮詢", name: "姓名", contactType: "聯絡方式", contact: "聯絡方式", message: "諮詢內容", submit: "送出諮詢", sending: "傳送中…", success: "已受理，我們會盡快與您聯絡。", consent: "我同意蒐集與使用個人資訊。", close: "關閉" },
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
  const [sel, setSel] = useState<HospitalI18n | null>(null)
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
              <button className="hp-card" onClick={() => setSel(h)}>
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
              </button>
            </li>
          )
        })}
      </ul>

      {sel && <DetailModal hospital={sel} locale={locale} t={t} onClose={() => setSel(null)} />}
    </main>
  )
}

function DetailModal({
  hospital: h,
  locale,
  t,
  onClose,
}: {
  hospital: HospitalI18n
  locale: ToggleLocale
  t: UIStrings
  onClose: () => void
}) {
  const c = pick(h, locale)
  return (
    <div className="hp-modal" onClick={onClose}>
      <div className="hp-modal__panel" onClick={(e) => e.stopPropagation()}>
        <button className="hp-modal__close" onClick={onClose} aria-label={t.close}>
          ×
        </button>

        <header className="hp-detail__header">
          <div className="hp-detail__tags">
            {h.departments.map((d) => (
              <span key={d} className="hp-card__tag">{d}</span>
            ))}
            {h.region && <span className="hp-card__region">{h.region}</span>}
          </div>
          <h2 className="hp-detail__name">{c.name}</h2>
          {c.tagline && <p className="hp-detail__tagline">{c.tagline}</p>}
        </header>

        {h.heroImageUrl && <img src={h.heroImageUrl} alt="" className="hp-detail__hero" />}

        <div className="hp-detail__cols">
          <article className="hp-detail__main">
            {c.summary && <p className="hp-detail__summary">{c.summary}</p>}

            {c.strengths.length > 0 && (
              <section className="hp-detail__block">
                <h3 className="hp-detail__h2">{t.strengths}</h3>
                <ul className="hp-detail__strengths">
                  {c.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>
            )}

            {c.signatureTreatments.length > 0 && (
              <section className="hp-detail__block">
                <h3 className="hp-detail__h2">{t.signature}</h3>
                <div className="hp-detail__treatments">
                  {c.signatureTreatments.map((s) => (
                    <span key={s} className="hp-detail__treatment">{s}</span>
                  ))}
                </div>
              </section>
            )}

            {h.doctors.length > 0 && (
              <section className="hp-detail__block">
                <h3 className="hp-detail__h2">{t.doctors}</h3>
                <div className="hp-doctors">
                  {h.doctors.map((d, i) => (
                    <div key={i} className="hp-doctor">
                      {d.imageUrl ? (
                        <img src={d.imageUrl} alt={d.name} className="hp-doctor__photo" />
                      ) : (
                        <div className="hp-doctor__photo hp-doctor__photo--ph">{d.name.slice(0, 1)}</div>
                      )}
                      <div>
                        <p className="hp-doctor__name">
                          {d.name}
                          {d.title && <span className="hp-doctor__title"> {d.title}</span>}
                        </p>
                        {d.specialty && <p className="hp-doctor__specialty">{d.specialty}</p>}
                        {d.bio && <p className="hp-doctor__bio">{d.bio}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {h.galleryUrls.length > 0 && (
              <section className="hp-detail__block">
                <h3 className="hp-detail__h2">{t.gallery}</h3>
                <div className="hp-detail__gallery">
                  {h.galleryUrls.map((url) => (
                    <img key={url} src={url} alt="" />
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="hp-detail__aside">
            <InquiryForm slug={h.slug} hospitalName={c.name} locale={locale} t={t} />
          </aside>
        </div>
      </div>
    </div>
  )
}

function InquiryForm({
  slug,
  hospitalName,
  locale,
  t,
}: {
  slug: string
  hospitalName: string
  locale: ToggleLocale
  t: UIStrings
}) {
  const [name, setName] = useState("")
  const [contactType, setContactType] = useState<string>(CONTACT_TYPES[0].value)
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")
  const [consent, setConsent] = useState(false)
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !contact.trim() || !consent) return
    setState("sending")
    try {
      const res = await fetch("/api/hospital-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, locale, name, contactType, contact, message }),
      })
      if (!res.ok) throw new Error()
      setState("done")
    } catch {
      setState("error")
    }
  }

  if (state === "done") {
    return (
      <div className="hp-form hp-form--done">
        <p className="hp-form__success">✓ {t.success}</p>
      </div>
    )
  }

  return (
    <form className="hp-form" onSubmit={submit}>
      <h3 className="hp-form__heading">{t.heading}</h3>
      <p className="hp-form__hospital">{t.interest} · {hospitalName}</p>

      <label className="hp-form__label">
        {t.name}
        <input className="hp-form__input" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="hp-form__label">
        {t.contactType}
        <select className="hp-form__input" value={contactType} onChange={(e) => setContactType(e.target.value)}>
          {CONTACT_TYPES.map((ct) => (
            <option key={ct.value} value={ct.value}>{ct.label}</option>
          ))}
        </select>
      </label>
      <label className="hp-form__label">
        {t.contact}
        <input className="hp-form__input" value={contact} onChange={(e) => setContact(e.target.value)} required />
      </label>
      <label className="hp-form__label">
        {t.message}
        <textarea className="hp-form__input hp-form__textarea" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
      </label>
      <label className="hp-form__consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <span>{t.consent}</span>
      </label>
      {state === "error" && <p className="hp-form__error">⚠</p>}
      <button type="submit" className="hp-form__submit" disabled={state === "sending" || !name.trim() || !contact.trim() || !consent}>
        {state === "sending" ? t.sending : t.submit}
      </button>
    </form>
  )
}
