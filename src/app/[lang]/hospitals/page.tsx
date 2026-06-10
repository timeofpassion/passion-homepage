import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getDict, getHospitals, isLocale } from "@/lib/hospital-portal"
import Showcase from "./_components/Showcase"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getDict(lang)
  return {
    title: { absolute: `${t.title} | 열정의시간` },
    description: t.intro,
    alternates: { canonical: `https://www.timeofpassion.com/${lang}/hospitals` },
    openGraph: {
      title: `${t.title} | 열정의시간`,
      description: t.intro,
      url: `https://www.timeofpassion.com/${lang}/hospitals`,
      siteName: "열정의시간",
      type: "website",
    },
  }
}

export default async function HospitalsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const [{ hospitals }, t] = await Promise.all([
    getHospitals(lang),
    Promise.resolve(getDict(lang)),
  ])
  return <Showcase lang={lang} hospitals={hospitals} t={t} />
}
