"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  DEPARTMENT_ORDER,
  type Dict,
  type Hospital,
  type Locale,
} from "@/lib/hospital-portal"

export default function Showcase({
  lang,
  hospitals,
  t,
}: {
  lang: Locale
  hospitals: Hospital[]
  t: Dict
}) {
  // 데이터에 등장하는 진료과목을 고정 순서 우선으로 정렬
  const departments = useMemo(() => {
    const set = new Set<string>()
    hospitals.forEach((h) => h.departments.forEach((d) => set.add(d)))
    const ordered = DEPARTMENT_ORDER.filter((d) => set.has(d))
    const rest = [...set].filter((d) => !ordered.includes(d))
    return [...ordered, ...rest]
  }, [hospitals])

  const [active, setActive] = useState<string | null>(null)
  const visible = active
    ? hospitals.filter((h) => h.departments.includes(active))
    : hospitals

  return (
    <main className="hp-portal">
      <section className="hp-hero">
        <p className="hp-hero__eyebrow">TIME OF PASSION · PARTNER HOSPITALS</p>
        <h1 className="hp-hero__title">{t.title}</h1>
        <p className="hp-hero__subtitle">{t.subtitle}</p>
        <p className="hp-hero__intro">{t.intro}</p>
      </section>

      {departments.length > 0 && (
        <div className="hp-filter" role="tablist" aria-label={t.title}>
          <button
            type="button"
            className={`hp-chip ${active === null ? "is-active" : ""}`}
            onClick={() => setActive(null)}
          >
            {t.filterAll}
          </button>
          {departments.map((d) => (
            <button
              key={d}
              type="button"
              className={`hp-chip ${active === d ? "is-active" : ""}`}
              onClick={() => setActive(d)}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      <ul className="hp-grid">
        {visible.map((h) => (
          <li key={h.slug}>
            <Link href={`/${lang}/hospitals/${h.slug}`} className="hp-card">
              <div className="hp-card__media">
                {h.heroImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={h.heroImageUrl} alt="" className="hp-card__img" />
                ) : (
                  <div className="hp-card__placeholder" aria-hidden>
                    {h.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={h.logoUrl} alt="" className="hp-card__logo" />
                    ) : (
                      <span>{h.name.slice(0, 2)}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="hp-card__body">
                <div className="hp-card__tags">
                  {h.departments.slice(0, 3).map((d) => (
                    <span key={d} className="hp-card__tag">
                      {d}
                    </span>
                  ))}
                  {h.region && <span className="hp-card__region">{h.region}</span>}
                </div>
                <h2 className="hp-card__name">{h.name}</h2>
                {h.tagline && <p className="hp-card__tagline">{h.tagline}</p>}
                {h.signatureTreatments.length > 0 && (
                  <div className="hp-card__treatments">
                    {h.signatureTreatments.slice(0, 3).map((s) => (
                      <span key={s} className="hp-card__treatment">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <span className="hp-card__cta">{t.inquire} →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
