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
  // 협력병원 카탈로그는 브로커·에이전시 전용 숨김 공개 → 검색엔진에 hreflang 힌트를 주지 않는다
  // (2026-07-21 대표 지시). 공개 전환 시 아래 hospitals hreflang 복원:
  //   const languages = Object.fromEntries(
  //     ACTIVE_LOCALES.map((l) => [HTML_LANG[l], `${SITE}/${l}/hospitals`]),
  //   )
  //   return { metadataBase: new URL(SITE),
  //     alternates: { languages: { ...languages, "x-default": `${SITE}/ko/hospitals` } } }
  return {
    metadataBase: new URL(SITE),
    robots: { index: false, follow: false },
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
