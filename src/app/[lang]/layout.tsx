import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ACTIVE_LOCALES, HTML_LANG, isLocale } from "@/lib/hospital-portal"
import "./hospitals/hospitals.css"

const SITE = "https://www.timeofpassion.com"

// P1: 한국어만 정적 생성. P2에서 ACTIVE_LOCALES 확장 시 자동으로 늘어난다.
export function generateStaticParams() {
  return ACTIVE_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  // 노출 중인 locale 만 hreflang 으로 (중복 콘텐츠 방지). P2에서 자동 확장.
  const languages = Object.fromEntries(
    ACTIVE_LOCALES.map((l) => [HTML_LANG[l], `${SITE}/${l}/hospitals`]),
  )
  return {
    metadataBase: new URL(SITE),
    alternates: {
      languages: { ...languages, "x-default": `${SITE}/ko/hospitals` },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return (
    <div lang={HTML_LANG[lang]} className="hp-shell">
      <header className="hp-topbar">
        <Link href="/time" className="hp-topbar__brand" aria-label="열정의시간">
          열정의시간
        </Link>
        <span className="hp-topbar__label">PARTNER HOSPITALS</span>
      </header>

      {children}

      <footer className="hp-footer">
        <div className="hp-footer__inner">
          <p className="hp-footer__brand">열정의시간</p>
          <p className="hp-footer__desc">병원 마케팅 · 해외환자 유치 전문 에이전시</p>
          <Link href="/" className="hp-footer__group">
            ← PASSION GROUP
          </Link>
        </div>
        <p className="hp-footer__copy">© 2026 열정의시간. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  )
}
