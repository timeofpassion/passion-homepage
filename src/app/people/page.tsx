import type { Metadata } from "next";
import Link from "next/link";
import InfluencerFilter from "./_components/InfluencerFilter";
import Flag from "./_components/Flag";
import ClientsSection from "@/components/ClientsSection";
import {
  PORTFOLIO,
  COUNTRY_LABEL,
  CLIENT_TYPE_LABEL,
  formatFollowers,
} from "./_data/sample";
import { getInfluencers, buildNetworkStats } from "./_data/people-data";
import { buildOpenGraph } from "@/lib/og";

// 열정의시간 카카오톡 채널 상담(채팅) — 전사 공용 채널
const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";

// og:url 을 요청 주소(쿼리 포함)에 맞춰 동적 생성 → 카카오 캐시 ?v= 우회 갱신 지원.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const sp = await searchParams;
  return {
    title: {
      absolute: "열정의사람들 | 인플루언서 마케팅 (국내·일본·중국·대만)",
    },
    openGraph: buildOpenGraph(
      {
        title: "열정의사람들 | 글로벌 인플루언서 마케팅",
        description:
          "일본·중국·대만, 현지 인플루언서로 진출하다. 동아시아 시장 진출 인플루언서 마케팅 전문 기업.",
        siteName: "열정의사람들",
        locale: "ko_KR",
        type: "website",
        images: [
          {
            url: "/people/og-people.jpg",
            width: 1200,
            height: 630,
            alt: "열정의사람들 — 글로벌 인플루언서 마케팅",
          },
        ],
      },
      "/people",
      sp,
    ),
  };
}

const SERVICES = [
  {
    no: "01",
    title: "인플루언서 섭외",
    desc: "국내·일본·중국·대만 현지에서 직접 운영하는 검증된 풀에서, 캠페인 목표에 맞는 적임자를 매칭합니다.",
  },
  {
    no: "02",
    title: "콘텐츠 기획",
    desc: "‘번역’이 아니라 ‘현지화’. 시장·플랫폼별 정서에 맞는 콘텐츠를 기획하고 핵심 메시지를 설계합니다.",
  },
  {
    no: "03",
    title: "캠페인 실행·리포트",
    desc: "발행·운영·현지 커뮤니케이션부터 성과 리포트까지 전 과정을 원스톱으로 책임집니다.",
  },
];

// 후킹용 차별점
const WHY = [
  {
    title: "현지 직접 운영 풀",
    desc: "에이전시 재하청이 아닌, 국내·일본·중국·대만 현지 크리에이터를 직접 관리합니다.",
  },
  {
    title: "분야 불문 전환 특화",
    desc: "병원·기업·관공서까지, 단순 노출이 아니라 ‘문의·방문·구매’로 이어지는 전환을 설계합니다.",
  },
  {
    title: "원스톱 실행",
    desc: "섭외→기획→발행→리포트까지 한 팀이. 여러 업체와 따로 소통할 필요 없음.",
  },
];

export default async function PeopleHome() {
  const { influencers } = await getInfluencers();
  // NETWORK 섹션·히어로 수치는 운영 네트워크 규모(고정). 아래 인플루언서 목록은 실데이터 연동.
  const networkStats = buildNetworkStats();
  const total = networkStats.reduce((sum, s) => sum + s.count, 0);
  const marketLabels = networkStats
    .map((s) => COUNTRY_LABEL[s.country])
    .join(" · ");
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
          <span className="ppl-hero__badge">INFLUENCER MARKETING</span>
          <h1 className="ppl-hero__h1">
            국내·일본·중국·대만,
            <br />
            <b>현지 인플루언서</b>로 연결하다
          </h1>
          <p className="ppl-hero__sub">
            병원·기업·관공서의 국내·해외 마케팅을 현지 인플루언서로
            실행합니다.
          </p>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ppl-btn ppl-btn--red"
          >
            카카오톡 무료 상담 →
          </a>

          <div className="ppl-hero__stats">
            <div className="ppl-hero__stat">
              <b>{networkStats.length}개 시장</b>
              <span>{marketLabels} 운영</span>
            </div>
            <div className="ppl-hero__stat">
              <b>{total.toLocaleString()}+</b>
              <span>인플루언서 풀</span>
            </div>
            <div className="ppl-hero__stat">
              <b>7개+</b>
              <span>운영 플랫폼</span>
            </div>
          </div>
        </div>
      </section>

      {/* 클라이언트 — 열정의시간과 동일 섹션 미러링(공용 ClientsSection).
          clients.ts(로고 목록)·ClientsSection(문구·디자인) 한 곳만 고치면 /time·/people 동시 반영 */}
      <div
        style={{
          background:
            "radial-gradient(circle at center, #1e63c8 -20%, #14264d 30%, #060b18 80%)",
          color: "#fff",
        }}
      >
        <ClientsSection
          title={"열정의사람들을 믿고 세계로 나아간\n우리 소중한 클라이언트"}
          subtitle={
            "열정의사람들은 단순 노출이 아니라,\n현지 인플루언서로 ‘진짜’ 결과를 만듭니다."
          }
          showBrackets={false}
        />
      </div>

      {/* 4-2 COUNTRY STATS */}
      <section className="ppl-section">
        <div className="ppl-container">
          <span className="ppl-eyebrow">NETWORK</span>
          <h2 className="ppl-section-title">
            검증된 현지 인플루언서 네트워크
          </h2>
          <p className="ppl-section-sub">
            각 시장의 주력 플랫폼과 현지 크리에이터를 직접 운영합니다.
          </p>

          <div className="ppl-country-grid">
            {networkStats.map((c) => (
              <div key={c.country} className="ppl-country-card">
                <div className="ppl-country-card__flag">
                  <Flag country={c.country} size={40} />
                </div>
                <div className="ppl-country-card__name">
                  {COUNTRY_LABEL[c.country]}
                </div>
                <div className="ppl-country-card__count">
                  {c.count.toLocaleString()}
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

      {/* 4-3 INFLUENCER PREVIEW — 국가·플랫폼·분야 필터 */}
      <section className="ppl-section" id="influencers" style={{ background: "#fff" }}>
        <div className="ppl-container">
          <span className="ppl-eyebrow">INFLUENCERS</span>
          <h2 className="ppl-section-title">지금 활동 중인 인플루언서</h2>
          <p className="ppl-section-sub">
            국가·플랫폼·분야로 직접 필터링해 보세요. 캠페인에 맞는 크리에이터를
            바로 찾을 수 있습니다.
          </p>

          <div className="ppl-prepnote">
            <span className="ppl-prepnote__badge">정리 중</span>
            <p>
              현재 인플루언서 목록을 정리·업데이트하고 있습니다. 일부만 우선
              공개되어 있으며, 순차적으로 더 많은 크리에이터가 추가됩니다.
            </p>
          </div>

          <InfluencerFilter data={influencers} />

          <div className="ppl-center">
            <Link href="/people/influencers" className="ppl-btn ppl-btn--ghost">
              인플루언서 전체 페이지 →
            </Link>
          </div>
        </div>
      </section>

      {/* 4-4 PORTFOLIO */}
      <section className="ppl-section" id="portfolio">
        <div className="ppl-container">
          <span className="ppl-eyebrow">PORTFOLIO</span>
          <h2 className="ppl-section-title">우리가 만든 결과</h2>
          <p className="ppl-section-sub">
            의료·기업·공공 분야의 국내·해외 인플루언서 캠페인 사례입니다.
          </p>

          <div className="ppl-port-grid">
            {PORTFOLIO.map((p) => (
              <article key={p.id} className="ppl-port-card">
                <div
                  className="ppl-port-card__thumb"
                  style={
                    p.thumbnail
                      ? { backgroundImage: `url(${p.thumbnail})` }
                      : undefined
                  }
                >
                  <span className="ppl-port-card__flags">
                    {p.country.map((c) => (
                      <Flag key={c} country={c} size={24} />
                    ))}
                  </span>
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
        </div>
      </section>

      {/* 4-5 SERVICES — 후킹 강화 */}
      <section className="ppl-section" id="service" style={{ background: "#fff" }}>
        <div className="ppl-container">
          <span className="ppl-eyebrow">SERVICE</span>
          <h2 className="ppl-section-title">
            인플루언서 마케팅,
            <br />
            막막함은 우리가, 성과는 당신이.
          </h2>
          <p className="ppl-section-sub">
            현지 섭외부터 콘텐츠 기획·발행·성과 리포트까지 한 팀이 끝까지
            책임집니다. 가격은 캠페인 규모에 따라 맞춤 견적으로 안내드립니다.
          </p>

          {/* 차별점 3종 */}
          <div className="ppl-why-grid">
            {WHY.map((w) => (
              <div key={w.title} className="ppl-why-card">
                <div className="ppl-why-card__title">{w.title}</div>
                <p className="ppl-why-card__desc">{w.desc}</p>
              </div>
            ))}
          </div>

          {/* 3단계 프로세스 */}
          <div className="ppl-svc-grid">
            {SERVICES.map((s) => (
              <div key={s.no} className="ppl-svc-card">
                <div className="ppl-svc-card__num">STEP {s.no}</div>
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
              30초 만에 카카오톡으로 견적 문의 →
            </a>
            <p className="ppl-svc-note">
              문의 후 평균 1영업일 내 담당자가 회신드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 4-7 CTA BAND */}
      <section className="ppl-cta-band">
        <div className="ppl-container">
          <h2>지금 인플루언서 마케팅을 시작하세요</h2>
          <p>국내·일본·중국·대만 현지 인플루언서가 기다리고 있습니다.</p>
          <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className="ppl-btn">
            카카오톡 무료 상담 →
          </a>
        </div>
      </section>
    </>
  );
}
