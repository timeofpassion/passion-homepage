"use client"

import { useState } from "react"
import { CONTACT_TYPES, type Dict, type Locale } from "@/lib/hospital-portal"

export default function InquiryForm({
  lang,
  slug,
  hospitalName,
  t,
}: {
  lang: Locale
  slug: string
  hospitalName: string
  t: Dict
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
        body: JSON.stringify({ slug, locale: lang, name, contactType, contact, message }),
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
        <p className="hp-form__success">✓ {t.form.success}</p>
      </div>
    )
  }

  return (
    <form className="hp-form" onSubmit={submit}>
      <h2 className="hp-form__heading">{t.form.heading}</h2>
      <p className="hp-form__hospital">{hospitalName}</p>

      <label className="hp-form__label">
        {t.form.name}
        <input
          className="hp-form__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="hp-form__label">
        {t.form.contactType}
        <select
          className="hp-form__input"
          value={contactType}
          onChange={(e) => setContactType(e.target.value)}
        >
          {CONTACT_TYPES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="hp-form__label">
        {t.form.contact}
        <input
          className="hp-form__input"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </label>

      <label className="hp-form__label">
        {t.form.message}
        <textarea
          className="hp-form__input hp-form__textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
      </label>

      <label className="hp-form__consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
        />
        <span>{t.form.consent}</span>
      </label>

      {state === "error" && <p className="hp-form__error">{t.form.error}</p>}

      <button
        type="submit"
        className="hp-form__submit"
        disabled={state === "sending" || !name.trim() || !contact.trim() || !consent}
      >
        {state === "sending" ? t.form.sending : t.form.submit}
      </button>
    </form>
  )
}
