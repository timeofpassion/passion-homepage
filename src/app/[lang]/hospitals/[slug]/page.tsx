import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getDict, getHospital, isLocale } from "@/lib/hospital-portal"
import InquiryForm from "../_components/InquiryForm"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const h = await getHospital(lang, slug)
  if (!h) return {}
  const title = h.seoTitle ?? `${h.name} | 열정의시간 협력병원`
  const description = h.seoDescription ?? h.tagline ?? h.summary ?? undefined
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://www.timeofpassion.com/${lang}/hospitals/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.timeofpassion.com/${lang}/hospitals/${slug}`,
      siteName: "열정의시간",
      type: "website",
      ...(h.heroImageUrl ? { images: [{ url: h.heroImageUrl }] } : {}),
    },
  }
}

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const h = await getHospital(lang, slug)
  if (!h) notFound()
  const t = getDict(lang)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: h.name,
    description: h.summary ?? h.tagline ?? undefined,
    medicalSpecialty: h.departments,
    ...(h.region
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: h.region,
            addressCountry: "KR",
          },
        }
      : {}),
    // 직접 컨택 차단 — 병원 홈페이지 URL 은 공개 페이지·구조화데이터에 노출하지 않는다(모든 문의는 열정의시간으로).
    availableService: h.signatureTreatments.map((s) => ({
      "@type": "MedicalProcedure",
      name: s,
    })),
    parentOrganization: {
      "@type": "Organization",
      name: "열정의시간",
      url: "https://www.timeofpassion.com",
    },
  }

  return (
    <main className="hp-portal hp-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="hp-detail__back">
        <Link href={`/${lang}/hospitals`}>← {t.backToList}</Link>
      </div>

      <header className="hp-detail__header">
        <div className="hp-detail__tags">
          {h.departments.map((d) => (
            <span key={d} className="hp-card__tag">
              {d}
            </span>
          ))}
          {h.region && <span className="hp-card__region">{h.region}</span>}
          {h.establishedYear && (
            <span className="hp-card__region">
              {t.established} {h.establishedYear}
            </span>
          )}
        </div>
        <h1 className="hp-detail__name">{h.name}</h1>
        {h.tagline && <p className="hp-detail__tagline">{h.tagline}</p>}
      </header>

      {h.heroImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={h.heroImageUrl} alt="" className="hp-detail__hero" />
      )}

      <div className="hp-detail__cols">
        <article className="hp-detail__main">
          {h.summary && <p className="hp-detail__summary">{h.summary}</p>}

          {h.strengths.length > 0 && (
            <section className="hp-detail__block">
              <h2 className="hp-detail__h2">{t.strengths}</h2>
              <ul className="hp-detail__strengths">
                {h.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          )}

          {h.signatureTreatments.length > 0 && (
            <section className="hp-detail__block">
              <h2 className="hp-detail__h2">{t.signatureTreatments}</h2>
              <div className="hp-detail__treatments">
                {h.signatureTreatments.map((s) => (
                  <span key={s} className="hp-detail__treatment">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {h.galleryUrls.length > 0 && (
            <section className="hp-detail__block">
              <div className="hp-detail__gallery">
                {h.galleryUrls.map((url) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={url} src={url} alt="" />
                ))}
              </div>
            </section>
          )}

          {/* 직접 컨택 차단 — 병원 홈페이지 링크는 노출하지 않는다. 모든 문의는 아래 문의 폼(열정의시간 CRM)으로. */}
        </article>

        <aside className="hp-detail__aside">
          <InquiryForm lang={lang} slug={h.slug} hospitalName={h.name} t={t} />
        </aside>
      </div>
    </main>
  )
}
