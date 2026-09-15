import type { Metadata } from "next";
import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import ClientMarquee from "@/components/ClientMarquee";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import KakaoFloat from "@/components/KakaoFloat";

// 메인 개편 시안(진저 톤 + Medico 순서). 대표 확인 전이라 검색 노출 금지.
export const metadata: Metadata = { title: "열정의시간 시안", robots: { index: false, follow: false } };

const RED = "#E63329";
const BADGES = [
  { k: "외국인환자 유치업 등록", v: "A-2025-01-02-06178호", href: "/time/foreign-patient-cert.png" },
  { k: "의료광고", v: "사전심의 접수 · 문구 점검 대행" },
  { k: "현지 전담팀", v: "국내 · 중국 · 대만 · 일본" },
  { k: "채널 · 계정", v: "100% 병원 소유로 개설" },
];

const MARKETS = [
  {
    name: "국내", en: "KOREA", channels: "네이버 · 인스타그램 · 유튜브",
    lead: "원장님 대신 움직이는 병원 마케팅팀",
    items: ["브랜드블로그 매달 세트 운영", "홈페이지·시술 랜딩페이지 제작", "플레이스·예약 세팅과 광고", "META 광고 소재·캠페인"],
    href: "https://docs.google.com/presentation/d/17fAOTFOwVV91fOpLUcWycyWzV6GFCpvfjwQGYgNYiZY/edit",
  },
  {
    name: "중국", en: "CHINA", channels: "샤오홍슈 · 더우인 · 위챗",
    lead: "검색은 샤오홍슈에서, 상담은 위챗으로",
    items: ["샤오홍슈 계정 콘텐츠 운영", "간체 리뷰 이벤트 랜딩", "외국인 방문객용 다국어 홈페이지"],
    href: "https://docs.google.com/presentation/d/1clu7n3Ag0l6GrWlFzKF1bN-0kzXP63ws-22-jlTTcyA/edit",
  },
  {
    name: "대만", en: "TAIWAN", channels: "인스타그램 · 유튜브 · LINE",
    lead: "번체 콘텐츠로 여는 첫 해외 채널",
    items: ["대만 채널 운영", "번체 콘텐츠 제작", "LINE 상담 전환"],
    href: "https://docs.google.com/presentation/d/15kiF0BlcWDyevXr_PZ6YuElaF2CsQOWPXgREksaZqIg/edit",
  },
  {
    name: "일본", en: "JAPAN", channels: "LINE · 인스타그램 · X",
    lead: "번역이 아니라 현지 사람이 쓰는 콘텐츠",
    items: ["일본 마케팅 기간 계약 운영", "현지 크리에이터 모집", "LINE 상담 전환"],
    href: "https://docs.google.com/presentation/d/1IYYSmlSdHhbhDPvl_8RH8OthDxWQHKPhbjmEHjpQwJo/edit",
  },
];

const STEPS = [
  { t: "무료 진단", d: "지금 채널과 비용이 새는 곳을 먼저 봅니다" },
  { t: "맞춤 제안", d: "시장과 예산에 맞는 상품 단계를 고릅니다" },
  { t: "첫 달 세팅", d: "플랫폼·해외 창구·계정을 병원 소유로 엽니다" },
  { t: "매달 운영", d: "월 1회 원장님 미팅으로 성과와 다음 달을 정합니다" },
];

const label = { color: "#E7C46A", fontSize: 12, letterSpacing: ".2em", marginBottom: 16 } as const;

export default function TimeV2() {
  return (
    <>
      <BackgroundEffects />
      <main className="relative z-10">
        <Header />

        {/* 1. 첫 화면: 실사 + 한 문장 + 버튼 */}
        <section style={{ position: "relative", minHeight: "min(88vh, 820px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
          <video className="hero-video" autoPlay muted loop playsInline poster="/time/hero-global-poster.png" aria-hidden="true">
            <source src="/time/hero-global.mp4" type="video/mp4" />
          </video>
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.6) 45%, rgba(0,0,0,.15) 100%), linear-gradient(0deg, #000 0%, transparent 35%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, width: "100%", margin: "0 auto", padding: "0 6% 5.5rem" }}>
            <p className="font-mono-sys" style={{ ...label, color: RED }}>MEDICAL MARKETING · KR CN TW JP</p>
            <h1 style={{ fontSize: "clamp(2.2rem, 5.6vw, 4.4rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 820, wordBreak: "keep-all" }}>
              국내 환자부터<br />중국·대만·일본 환자까지,<br /><span style={{ color: RED }}>한 계약으로.</span>
            </h1>
            <p style={{ marginTop: 22, fontSize: "clamp(.95rem, 1.6vw, 1.15rem)", color: "rgba(255,255,255,.7)", maxWidth: 560, lineHeight: 1.7 }}>
              병원 마케팅 10년, 현지어 전담팀이 상담에서 내원까지 직접 운영합니다.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
              <Link href="/time/quote" className="btn-primary">우리 병원 무료 진단 받기</Link>
              <a href="#markets" className="btn-ghost">어떻게 운영하나요</a>
            </div>
          </div>
        </section>

        {/* 2. 신뢰 배지 한 줄 */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,.1)", borderBottom: "1px solid rgba(255,255,255,.1)", background: "#050505", position: "relative", zIndex: 20 }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
            {BADGES.map((b) => {
              const body = (
                <>
                  <span style={{ display: "block", fontSize: ".75rem", color: "rgba(255,255,255,.5)", marginBottom: 6 }}>{b.k}</span>
                  <span style={{ display: "block", fontSize: ".95rem", fontWeight: 800, color: "#fff", wordBreak: "keep-all" }}>
                    {b.v}
                    {b.href && <span style={{ color: RED, marginLeft: 6 }}>↗</span>}
                  </span>
                </>
              );
              const st = { padding: "1.6rem 1rem 1.6rem 0", textDecoration: "none", display: "block" } as const;
              return b.href ? (
                <a key={b.k} href={b.href} target="_blank" rel="noopener noreferrer" style={st}>{body}</a>
              ) : (
                <div key={b.k} style={st}>{body}</div>
              );
            })}
          </div>
        </section>

        {/* 3. 구조: 국내 기반 위에 해외 3개국을 쌓는다 */}
        <section id="markets" style={{ position: "relative", zIndex: 20, padding: "7rem 0 5rem" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
            <p className="font-mono-sys" style={label}>HOW WE BUILD</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.25, marginBottom: 14, wordBreak: "keep-all" }}>
              국내에서 다진 기반 위에,<br /><span style={{ color: RED }}>해외 환자를 쌓습니다.</span>
            </h2>
            <p style={{ fontSize: "clamp(.9rem, 1.6vw, 1.05rem)", color: "rgba(255,255,255,.6)", maxWidth: 620, lineHeight: 1.7, marginBottom: "3rem", wordBreak: "keep-all" }}>
              해외 환자도 결국 한국 병원의 홈페이지·후기·블로그를 보고 결정합니다. 국내에서 만든 콘텐츠를 현지팀이 그대로 받아 나라별로 옮깁니다.
            </p>

            {/* 윗층: 해외 3개국 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.1)", borderBottom: "none" }}>
              {MARKETS.slice(1).map((m) => (
                <article key={m.name} style={{ background: "#0a0a0a", padding: "1.8rem 1.6rem", display: "flex", flexDirection: "column" }}>
                  <span className="font-mono-sys" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(255,255,255,.4)" }}>{m.en} · 확장</span>
                  <h3 style={{ fontSize: "1.7rem", fontWeight: 900, margin: "6px 0 4px" }}>{m.name}</h3>
                  <span style={{ fontSize: ".75rem", color: "#E7C46A", fontWeight: 600 }}>{m.channels}</span>
                  <p style={{ margin: "1.2rem 0 .8rem", fontSize: "1rem", fontWeight: 700, lineHeight: 1.5, wordBreak: "keep-all" }}>{m.lead}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.4rem", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                    {m.items.map((t) => (
                      <li key={t} style={{ fontSize: ".86rem", color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>— {t}</li>
                    ))}
                  </ul>
                  <a href={m.href} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontWeight: 800, fontSize: ".88rem", textDecoration: "none", borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: ".9rem", display: "flex", justifyContent: "space-between" }}>
                    {m.name}마케팅 제안서 <span style={{ color: RED }}>↗</span>
                  </a>
                </article>
              ))}
            </div>

            {/* 연결: 국내 콘텐츠가 위로 올라간다 */}
            <div aria-hidden style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: "#0a0a0a", borderLeft: "1px solid rgba(255,255,255,.1)", borderRight: "1px solid rgba(255,255,255,.1)" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", justifyContent: "center" }}>
                  <span style={{ width: 2, height: 28, background: `linear-gradient(to top, ${RED}, transparent)` }} />
                </div>
              ))}
            </div>

            {/* 아랫층: 국내 = 기반 */}
            {(() => {
              const k = MARKETS[0];
              return (
                <article style={{ background: RED, padding: "2rem 1.8rem", display: "flex", flexWrap: "wrap", gap: "1.4rem 3rem", alignItems: "center" }}>
                  <div style={{ flex: "1 1 280px" }}>
                    <span className="font-mono-sys" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(255,255,255,.75)" }}>{k.en} · 기반</span>
                    <h3 style={{ fontSize: "2.2rem", fontWeight: 900, margin: "6px 0 4px" }}>국내 마케팅</h3>
                    <p style={{ fontSize: "1.05rem", fontWeight: 700, wordBreak: "keep-all" }}>{k.lead} · {k.channels}</p>
                  </div>
                  <ul style={{ flex: "1 1 280px", listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px 1.5rem" }}>
                    {k.items.map((t) => (
                      <li key={t} style={{ fontSize: ".9rem", fontWeight: 600 }}>— {t}</li>
                    ))}
                  </ul>
                  <a href={k.href} target="_blank" rel="noopener noreferrer" style={{ flex: "0 0 auto", background: "#fff", color: "#0f172a", fontWeight: 800, fontSize: ".9rem", textDecoration: "none", padding: "12px 18px" }}>
                    국내마케팅 제안서 ↗
                  </a>
                </article>
              );
            })()}
          </div>
        </section>

        {/* 4. 로고 */}
        <ClientMarquee />

        {/* 5. 진행 방식 */}
        <section style={{ position: "relative", zIndex: 20, padding: "5rem 0 6rem" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
            <p className="font-mono-sys" style={label}>HOW IT WORKS</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)", fontWeight: 900, marginBottom: "2.6rem" }}>상담부터 매달 운영까지</h2>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
              {STEPS.map((s, i) => (
                <li key={s.t} style={{ borderTop: `2px solid ${i === 0 ? RED : "rgba(255,255,255,.15)"}`, paddingTop: "1.2rem" }}>
                  <span className="font-mono-sys" style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>STEP {i + 1}</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "8px 0" }}>{s.t}</h3>
                  <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.65)", lineHeight: 1.6, wordBreak: "keep-all" }}>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CTASection />
        <Footer />
      </main>
      <KakaoFloat />
    </>
  );
}
