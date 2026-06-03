import type { Metadata } from "next";
import Link from "next/link";
import InfluencerCard from "./_components/InfluencerCard";
import { clientLogos } from "@/data/clients";
import {
  INFLUENCERS,
  PORTFOLIO,
  COUNTRY_STATS,
  COUNTRY_LABEL,
  COUNTRY_FLAG,
  CLIENT_TYPE_LABEL,
  formatFollowers,
  totalInfluencers,
} from "./_data/sample";

const KAKAO_URL = "https://pf.kakao.com/_timfofpassion"; // TODO: 전용 채널 확정 시 교체

export const metadata: Metadata = {
  title: {
    absolute: "열정의사람들 | 글로벌 인플루언서 마케팅 (일본·중국·대만)",
  },
};

const SERVICES = [
  {
    no: "01",
    title: "인플루언서 섭외",
    desc: "일본·중국·대만 현지 검증된 인플루언서 풀에서 캠페인 목표에 맞는 적임자를 매칭합니다.",
  },
  {
    no: "02",
    title: "콘텐츠 기획",
    desc: "시장·플랫폼별 현지 정서에 맞는 콘텐츠를 기획하고 핵심 메시지를 설계합니다.",
  },
  {
    no: "03",
    title: "캠페인 실행",
    desc: "발행·운영·현지 커뮤니케이션까지 전 과정을 원스톱으로 실행합니다.",
  },
];

export default function PeopleHome() {
  const previewInfluencers = INFLUENCERS.slice(0, 8);

  return (
    <>
      {/* 4-1 HERO */}
      <section className="ppl-hero">
        <div
          className="ppl-hero__bg"
          style={{ backgroundImage: "url(/portal/people.jpg)" }}
        />
        <div className="ppl-hero__overlay" />
        <div className="ppl-container ppl-hero__inner ppl-fadeup">
          <span className="ppl-hero__badge">GLOBAL INFLUENCER MARKETING</span>
          <h1 className="ppl-hero__h1">
            일본·중국·대만,
            <br />
            <b>현지 인플루언서</b>로 진출하다
          </h1>
          <p className="ppl-hero__sub">
            병원·기업·기관의 동아시아 시장 진출을 현지 인플루언서 마케팅으로
            실행합니다.
          </p>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ppl-btn ppl-btn--red"
          >
            무료 상담 신청 →
          </a>

          <div className="ppl-hero__stats">
            <div className="ppl-hero__stat">
              <b>3개국</b>
              <span>일본 · 중국 · 대만 운영</span>
            </div>
            <div className="ppl-hero__stat">
              <b>{totalInfluencers().toLocaleString()}+</b>
              <span>누적 인플루언서 풀</span>
            </div>
            <div className="ppl-hero__stat">
              <b>7개+</b>
              <span>운영 플랫폼</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-2 COUNTRY STATS */}
      <section className="ppl-section">
        <div className="ppl-container">
          <span className="ppl-eyebrow">EAST ASIA NETWORK</span>
          <h2 className="ppl-section-title">
            동아시아 3개국, 검증된 인플루언서 네트워크
          </h2>
          <p className="ppl-section-sub">
            각 시장의 주력 플랫폼과 현지 크리에이터를 직접 운영합니다.
          </p>

          <div className="ppl-country-grid">
            {COUNTRY_STATS.map((c) => (
              <div key={c.country} className="ppl-country-card">
                <div className="ppl-country-card__flag">
                  {COUNTRY_FLAG[c.country]}
                </div>
                <div className="ppl-country-card__name">
                  {COUNTRY_LABEL[c.country]}
                </div>
                <div className="ppl-country-card__count">
                  {c.count}
                  <span>명+</span>
                </div>
                <div className="ppl-country-card__platforms">
                  {c.platforms.map((p) => (
                    <span key={p} className="ppl-tag">
                      {p}
                    </span>
                  ))}
                </div>
                <p className="ppl-country-card__strength">{c.strength}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-3 INFLUENCER PREVIEW */}
      <section className="ppl-section" style={{ background: "#fff" }}>
        <div className="ppl-container">
          <span className="ppl-eyebrow">INFLUENCERS</span>
          <h2 className="ppl-section-title">지금 활동 중인 인플루언서</h2>
          <p className="ppl-section-sub">
            일본·중국·대만 현지에서 활동하는 크리에이터를 만나보세요.
          </p>

          <div className="ppl-inf-grid">
            {previewInfluencers.map((inf) => (
              <InfluencerCard key={inf.id} inf={inf} />
            ))}
          </div>

          <div className="ppl-center">
            <Link href="/people/influencers" className="ppl-btn ppl-btn--ghost">
              전체 인플루언서 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 4-4 PORTFOLIO PREVIEW */}
      <section className="ppl-section" id="portfolio">
        <div className="ppl-container">
          <span className="ppl-eyebrow">PORTFOLIO</span>
          <h2 className="ppl-section-title">우리가 만든 결과</h2>
          <p className="ppl-section-sub">
            의료·기업·공공 분야의 동아시아 진출 캠페인 사례입니다.
          </p>

          <div className="ppl-port-grid">
            {PORTFOLIO.map((p) => (
              <article key={p.id} className="ppl-port-card">
                <div className="ppl-port-card__thumb">
                  {p.country.map((c) => COUNTRY_FLAG[c]).join(" ")}
                </div>
                <div className="ppl-port-card__body">
                  <span className="ppl-port-card__type">
                    {CLIENT_TYPE_LABEL[p.clientType]}
                  </span>
                  <h3 className="ppl-port-card__title">{p.title}</h3>
                  <p className="ppl-port-card__sum">{p.summary}</p>
                  <div className="ppl-port-card__metrics">
                    {p.metrics.views != null && (
                      <div>
                        <b>{formatFollowers(p.metrics.views)}</b>
                        <span>조회수</span>
                      </div>
                    )}
                    {p.metrics.reach != null && (
                      <div>
                        <b>{formatFollowers(p.metrics.reach)}</b>
                        <span>도달</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="ppl-center">
            <span
              className="ppl-btn ppl-btn--ghost"
              style={{ opacity: 0.6, cursor: "default" }}
            >
              사례 더보기 (준비중)
            </span>
          </div>
        </div>
      </section>

      {/* 4-5 SERVICES */}
      <section className="ppl-section" id="service" style={{ background: "#fff" }}>
        <div className="ppl-container">
          <span className="ppl-eyebrow">SERVICE</span>
          <h2 className="ppl-section-title">섭외부터 기획·실행까지</h2>
          <p className="ppl-section-sub">
            인플루언서 마케팅의 전 과정을 한 번에 진행합니다. 가격은 캠페인
            규모에 따라 견적 안내드립니다.
          </p>

          <div className="ppl-svc-grid">
            {SERVICES.map((s) => (
              <div key={s.no} className="ppl-svc-card">
                <div className="ppl-svc-card__num">{s.no}</div>
                <div className="ppl-svc-card__title">{s.title}</div>
                <p className="ppl-svc-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="ppl-center">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ppl-btn ppl-btn--red"
            >
              문의하고 견적 받기 →
            </a>
          </div>
        </div>
      </section>

      {/* 4-6 CLIENTS MARQUEE — 열정의시간과 동일 소스(clientLogos) 연동 */}
      <div className="ppl-clients">
        <div className="ppl-clients__track">
          {[...clientLogos, ...clientLogos].map((c, i) => (
            <span key={i} className="ppl-clients__item">
              <img src={c.logo} alt={c.name} className="ppl-clients__logo" />
            </span>
          ))}
        </div>
      </div>

      {/* 4-7 CTA BAND */}
      <section className="ppl-cta-band">
        <div className="ppl-container">
          <h2>지금 동아시아 진출을 시작하세요</h2>
          <p>일본·중국·대만 현지 인플루언서가 기다리고 있습니다.</p>
          <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className="ppl-btn">
            무료 상담 신청 →
          </a>
        </div>
      </section>
    </>
  );
}
