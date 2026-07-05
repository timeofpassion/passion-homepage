"use client"
/* eslint-disable @next/next/no-img-element */

import { useState } from "react"
import Link from "next/link"
import {
  TOGGLE_LOCALES,
  type ToggleLocale,
  type HospitalI18n,
  type LocaleContent,
  CONTACT_TYPES,
} from "@/lib/hospital-portal"

type UI = {
  back: string
  strengths: string
  signature: string
  doctors: string
  interior: string
  heading: string
  name: string
  contactType: string
  contact: string
  message: string
  submit: string
  sending: string
  success: string
  consent: string
}

const STR: Record<ToggleLocale, UI> = {
  ko: { back: "협력병원 목록", strengths: "강점", signature: "대표 시술", doctors: "의료진 소개", interior: "인테리어", heading: "열정의시간 무료 상담", name: "이름", contactType: "연락 수단", contact: "연락처", message: "문의 내용", submit: "문의 보내기", sending: "전송 중…", success: "문의가 접수되었습니다. 곧 연락드리겠습니다.", consent: "개인정보 수집·이용에 동의합니다." },
  en: { back: "Partner hospitals", strengths: "Strengths", signature: "Signature", doctors: "Medical team", interior: "Interior", heading: "Free consultation with Time of Passion", name: "Name", contactType: "Contact method", contact: "Contact", message: "Message", submit: "Send inquiry", sending: "Sending…", success: "Received. We'll contact you soon.", consent: "I agree to the collection and use of my personal information." },
  ja: { back: "提携病院一覧", strengths: "強み", signature: "代表施術", doctors: "医療陣紹介", interior: "院内", heading: "TIME OF PASSION 無料相談", name: "お名前", contactType: "連絡手段", contact: "連絡先", message: "お問い合わせ内容", submit: "送信する", sending: "送信中…", success: "受け付けました。追ってご連絡いたします。", consent: "個人情報の収集・利用に同意します。" },
  "zh-CN": { back: "合作医院列表", strengths: "优势", signature: "代表项目", doctors: "医疗团队", interior: "环境", heading: "TIME OF PASSION 免费咨询", name: "姓名", contactType: "联系方式", contact: "联系方式", message: "咨询内容", submit: "发送咨询", sending: "发送中…", success: "已受理，我们会尽快与您联系。", consent: "我同意收集和使用个人信息。" },
  "zh-TW": { back: "合作醫院列表", strengths: "優勢", signature: "代表療程", doctors: "醫療團隊", interior: "環境", heading: "TIME OF PASSION 免費諮詢", name: "姓名", contactType: "聯絡方式", contact: "聯絡方式", message: "諮詢內容", submit: "送出諮詢", sending: "傳送中…", success: "已受理，我們會盡快與您聯絡。", consent: "我同意蒐集與使用個人資訊。" },
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

export default function HospitalDetail({ hospital: h }: { hospital: HospitalI18n }) {
  const [locale, setLocale] = useState<ToggleLocale>("ko")
  const t = STR[locale]
  const c = pick(h, locale)

  return (
    <main className="hpd">
      {/* 우측 고정 언어 토글 */}
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

      <div className="hpd__inner">
        <Link href="/hospital" className="hpd__back">
          ← {t.back}
        </Link>

        <header className="hpd__header">
          <div className="hpd__tags">
            {h.departments.map((d) => (
              <span key={d} className="hp-card__tag">{d}</span>
            ))}
            {h.region && <span className="hp-card__region">{h.region}</span>}
          </div>
          <h1 className="hpd__name">{c.name}</h1>
          {c.tagline && <p className="hpd__tagline">{c.tagline}</p>}
        </header>

        {h.heroImageUrl && (
          <div className="hpd__hero">
            <img src={h.heroImageUrl} alt={c.name} />
          </div>
        )}

        {c.summary && <p className="hpd__summary">{c.summary}</p>}

        {c.strengths.length > 0 && (
          <section className="hpd__block">
            <h2 className="hpd__h2">{t.strengths}</h2>
            <ul className="hpd__strengths">
              {c.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {c.signatureTreatments.length > 0 && (
          <section className="hpd__block">
            <h2 className="hpd__h2">{t.signature}</h2>
            <div className="hpd__chips">
              {c.signatureTreatments.map((s) => (
                <span key={s} className="hpd__chip">{s}</span>
              ))}
            </div>
          </section>
        )}

        {h.doctors.length > 0 && (
          <section className="hpd__block">
            <h2 className="hpd__h2">{t.doctors}</h2>
            <div className="hpd__doctors">
              {h.doctors.map((d, i) => (
                <article key={i} className="hpd__doctor">
                  {d.imageUrl ? (
                    <img src={d.imageUrl} alt={d.name} className="hpd__doctor-photo" />
                  ) : (
                    <div className="hpd__doctor-photo hpd__doctor-photo--ph">{d.name.slice(0, 1)}</div>
                  )}
                  <div className="hpd__doctor-info">
                    {h.departments[0] && (
                      <p className="hpd__doctor-dept">{h.departments[0]}</p>
                    )}
                    <p className="hpd__doctor-name">
                      {d.name}
                      {d.title && <span className="hpd__doctor-title"> {d.title}</span>}
                    </p>
                    {d.specialty && <p className="hpd__doctor-specialty">{d.specialty}</p>}
                    {d.bio && <p className="hpd__doctor-bio">{d.bio}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {h.galleryUrls.length > 0 && (
          <section className="hpd__block">
            <h2 className="hpd__h2">{t.interior}</h2>
            <Gallery images={h.galleryUrls} name={c.name} />
          </section>
        )}

        <section className="hpd__inquiry">
          <Inquiry slug={h.slug} hospitalName={c.name} locale={locale} t={t} />
        </section>
      </div>
    </main>
  )
}

function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)
  const main = images[Math.min(active, images.length - 1)]
  return (
    <div className="hpd-gallery">
      <div className="hpd-gallery__main">
        <img src={main} alt={name} />
      </div>
      {images.length > 1 && (
        <div className="hpd-gallery__thumbs">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              className={`hpd-gallery__thumb ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`${name} ${i + 1}`}
            >
              <img src={url} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Inquiry({
  slug,
  hospitalName,
  locale,
  t,
}: {
  slug: string
  hospitalName: string
  locale: ToggleLocale
  t: UI
}) {
  const [open, setOpen] = useState(false)
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
    return <p className="hpd__inquiry-success">✓ {t.success}</p>
  }

  if (!open) {
    return (
      <button type="button" className="hpd__inquiry-btn" onClick={() => setOpen(true)}>
        {t.heading} →
      </button>
    )
  }

  return (
    <form className="hpd__form" onSubmit={submit}>
      <h3 className="hpd__form-heading">{t.heading}</h3>
      <p className="hpd__form-hospital">{hospitalName}</p>
      <label className="hpd__form-label">
        {t.name}
        <input className="hpd__form-input" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="hpd__form-label">
        {t.contactType}
        <select className="hpd__form-input" value={contactType} onChange={(e) => setContactType(e.target.value)}>
          {CONTACT_TYPES.map((ct) => (
            <option key={ct.value} value={ct.value}>{ct.label}</option>
          ))}
        </select>
      </label>
      <label className="hpd__form-label">
        {t.contact}
        <input className="hpd__form-input" value={contact} onChange={(e) => setContact(e.target.value)} required />
      </label>
      <label className="hpd__form-label">
        {t.message}
        <textarea className="hpd__form-input hpd__form-textarea" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
      </label>
      <label className="hpd__form-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <span>{t.consent}</span>
      </label>
      {state === "error" && <p className="hpd__form-error">⚠</p>}
      <button type="submit" className="hpd__inquiry-btn" disabled={state === "sending" || !name.trim() || !contact.trim() || !consent}>
        {state === "sending" ? t.sending : t.submit}
      </button>
    </form>
  )
}
