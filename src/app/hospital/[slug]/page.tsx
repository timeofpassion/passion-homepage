import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllHospitals, type HospitalI18n } from "@/lib/hospital-portal"
import HospitalDetail from "./HospitalDetail"
import { HOSPITAL_PORTAL_PUBLIC } from "../_visibility"
import "../../[lang]/hospitals/hospitals.css"
import "../hospital.css"

export const revalidate = 300

export async function generateStaticParams() {
  if (!HOSPITAL_PORTAL_PUBLIC) return []
  const { hospitals } = await getAllHospitals()
  return hospitals.map((h) => ({ slug: h.slug }))
}

async function findHospital(slug: string): Promise<HospitalI18n | null> {
  const { hospitals } = await getAllHospitals()
  return hospitals.find((h) => h.slug === slug) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!HOSPITAL_PORTAL_PUBLIC) return { robots: { index: false, follow: false } }
  const h = await findHospital(slug)
  const ko = h ? (h.translations.ko ?? Object.values(h.translations)[0]) : null
  const name = ko?.name ?? slug
  const title = `${name} | 열정의시간 협력병원`
  const description =
    ko?.summary ?? ko?.tagline ?? "열정의시간이 함께하는 협력병원 — 강점·대표 시술·의료진 소개"
  const url = `https://www.timeofpassion.com/hospital/${slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "열정의시간",
      type: "website",
      images: h?.heroImageUrl ? [{ url: h.heroImageUrl }] : undefined,
    },
  }
}

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!HOSPITAL_PORTAL_PUBLIC) notFound()
  const h = await findHospital(slug)
  if (!h) notFound()
  return <HospitalDetail hospital={h} />
}
