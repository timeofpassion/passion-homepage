"use client"
/* eslint-disable @next/next/no-img-element */

import { useState } from "react"
import Link from "next/link"
import {
  TOGGLE_LOCALES,
  type ToggleLocale,
  type HospitalI18n,
  type LocaleContent,
  type BeforeAfterCase,
  type PriceItem,
  CONTACT_TYPES,
} from "@/lib/hospital-portal"

type UI = {
  back: string
  strengths: string
  signature: string
  prices: string
  priceSame: string
  priceDisclaim: string
  doctors: string
  interior: string
  beforeAfter: string
  before: string
  after: string
  baEmpty: string
  mohw: string
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
  ko: { back: "협력병원 목록", strengths: "강점", signature: "대표 시술", prices: "시술 과목 · 가격", priceSame: "한국인과 동일 수가 · 외국인 추가요금 없음", priceDisclaim: "표시 가격은 부가세 포함 기준이며, 개인 상태에 따라 상담 후 최종 확정됩니다.", doctors: "의료진 소개", interior: "인테리어", beforeAfter: "시술 전후", before: "BEFORE", after: "AFTER", baEmpty: "시술 전후 사진은 준비 중입니다. (등록 전)", mohw: "보건복지부 등록 외국인환자 유치 마케팅 기업", heading: "열정의시간 무료 상담", name: "이름", contactType: "연락 수단", contact: "연락처", message: "문의 내용", submit: "문의 보내기", sending: "전송 중…", success: "문의가 접수되었습니다. 곧 연락드리겠습니다.", consent: "개인정보 수집·이용에 동의합니다." },
  en: { back: "Partner hospitals", strengths: "Strengths", signature: "Signature", prices: "Treatments & Pricing", priceSame: "Same price as locals · No foreigner surcharge", priceDisclaim: "Prices include VAT and are finalized after consultation based on individual condition.", doctors: "Medical team", interior: "Interior", beforeAfter: "Before & After", before: "BEFORE", after: "AFTER", baEmpty: "Before & after photos coming soon.", mohw: "Registered with Korea's Ministry of Health & Welfare (foreign patient attraction)", heading: "Free consultation with Time of Passion", name: "Name", contactType: "Contact method", contact: "Contact", message: "Message", submit: "Send inquiry", sending: "Sending…", success: "Received. We'll contact you soon.", consent: "I agree to the collection and use of my personal information." },
  ja: { back: "提携病院一覧", strengths: "強み", signature: "代表施術", prices: "施術メニュー・料金", priceSame: "韓国人と同一料金・外国人追加料金なし", priceDisclaim: "表示料金は税込で、個人の状態に応じてカウンセリング後に最終確定します。", doctors: "医療陣紹介", interior: "院内", beforeAfter: "施術ビフォーアフター", before: "BEFORE", after: "AFTER", baEmpty: "施術ビフォーアフター写真は準備中です。", mohw: "韓国 保健福祉部 登録 外国人患者誘致マーケティング企業", heading: "TIME OF PASSION 無料相談", name: "お名前", contactType: "連絡手段", contact: "連絡先", message: "お問い合わせ内容", submit: "送信する", sending: "送信中…", success: "受け付けました。追ってご連絡いたします。", consent: "個人情報の収集・利用に同意します。" },
  "zh-CN": { back: "合作医院列表", strengths: "优势", signature: "代表项目", prices: "项目 · 价格", priceSame: "与本地人同价 · 外国人无附加费", priceDisclaim: "标示价格为含税价，将根据个人情况在咨询后最终确定。", doctors: "医疗团队", interior: "环境", beforeAfter: "术前术后", before: "术前", after: "术后", baEmpty: "术前术后照片准备中。", mohw: "韩国保健福祉部注册 外国患者招引营销企业", heading: "TIME OF PASSION 免费咨询", name: "姓名", contactType: "联系方式", contact: "联系方式", message: "咨询内容", submit: "发送咨询", sending: "发送中…", success: "已受理，我们会尽快与您联系。", consent: "我同意收集和使用个人信息。" },
  "zh-TW": { back: "合作醫院列表", strengths: "優勢", signature: "代表療程", prices: "療程 · 價格", priceSame: "與本地人同價 · 外國人無附加費", priceDisclaim: "標示價格為含稅價，將依個人狀況於諮詢後最終確定。", doctors: "醫療團隊", interior: "環境", beforeAfter: "術前術後", before: "術前", after: "術後", baEmpty: "術前術後照片準備中。", mohw: "韓國保健福祉部登錄 外國患者招攬行銷企業", heading: "TIME OF PASSION 免費諮詢", name: "姓名", contactType: "聯絡方式", contact: "聯絡方式", message: "諮詢內容", submit: "送出諮詢", sending: "傳送中…", success: "已受理，我們會盡快與您聯絡。", consent: "我同意蒐集與使用個人資訊。" },
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
      <div className="hpd__inner">
        {/* 상단 바 — 뒤로가기(좌) + 언어 토글(우). 인라인이라 스크롤 시 본문을 덮지 않음 */}
        <div className="hpd__topbar">
          <Link href="/hospital" className="hpd__back">
            ← {t.back}
          </Link>
          <div className="hpd__langbar">
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
        </div>

        <header className="hpd__header">
          <div className="hpd__tags">
            {h.departments.map((d) => (
              <span key={d} className="hp-card__tag">{d}</span>
            ))}
            {h.region && <span className="hp-card__region">{h.region}</span>}
          </div>
          <h1 className="hpd__name">{c.name}</h1>
          {c.tagline && <p className="hpd__tagline">{c.tagline}</p>}
          <div className="hpd__mohw">
            <span className="hpd__mohw-ico" aria-hidden>✓</span>
            {t.mohw}
          </div>
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

        {h.priceItems.length > 0 && (
          <section className="hpd__block">
            <h2 className="hpd__h2">{t.prices}</h2>
            <PriceTable items={h.priceItems} note={h.priceNote} t={t} />
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

        {/* 시술 전후 — 인테리어 아래 배치(대표님 지시 2026-07-06) */}
        <section className="hpd__block">
          <h2 className="hpd__h2">{t.beforeAfter}</h2>
          {h.beforeAfterCases.length > 0 ? (
            <BeforeAfter cases={h.beforeAfterCases} t={t} />
          ) : (
            <div className="hpd-ba__empty">{t.baEmpty}</div>
          )}
        </section>

        <section className="hpd__inquiry">
          <Inquiry slug={h.slug} hospitalName={c.name} locale={locale} t={t} />
        </section>
      </div>
    </main>
  )
}

function PriceTable({
  items,
  note,
  t,
}: {
  items: PriceItem[]
  note: string | null
  t: UI
}) {
  // 입력 순서를 유지하며 category 로 그룹핑
  const groups: { category: string | null; rows: PriceItem[] }[] = []
  for (const it of items) {
    const cat = it.category ?? null
    const last = groups[groups.length - 1]
    if (last && last.category === cat) last.rows.push(it)
    else groups.push({ category: cat, rows: [it] })
  }
  return (
    <div className="hpd-price">
      <div className="hpd-price__same">
        <span className="hpd-price__same-ico" aria-hidden>₩</span>
        {t.priceSame}
      </div>
      {groups.map((g, gi) => (
        <div className="hpd-price__group" key={gi}>
          {g.category && <div className="hpd-price__cat">{g.category}</div>}
          <div className="hpd-price__rows">
            {g.rows.map((r, ri) => (
              <div className="hpd-price__row" key={ri}>
                <div className="hpd-price__name">
                  {r.name}
                  {r.note && <span className="hpd-price__pnote">{r.note}</span>}
                </div>
                <div className="hpd-price__val">{r.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {note && <p className="hpd-price__extra">{note}</p>}
      <p className="hpd-price__disclaim">{t.priceDisclaim}</p>
    </div>
  )
}

function BeforeAfter({ cases, t }: { cases: BeforeAfterCase[]; t: UI }) {
  return (
    <div className="hpd-ba">
      {cases.map((ca, i) => (
        <figure key={i} className="hpd-ba__case">
          <div className="hpd-ba__pair">
            <div className="hpd-ba__img">
              <img src={ca.beforeUrl} alt={t.before} />
              <span className="hpd-ba__label">{t.before}</span>
            </div>
            <div className="hpd-ba__img">
              <img src={ca.afterUrl} alt={t.after} />
              <span className="hpd-ba__label hpd-ba__label--after">{t.after}</span>
            </div>
          </div>
          {ca.caption && <figcaption className="hpd-ba__caption">{ca.caption}</figcaption>}
        </figure>
      ))}
    </div>
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
