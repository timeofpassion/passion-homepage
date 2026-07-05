import type { Metadata } from "next";
import Link from "next/link";
import InfluencerFilter from "./_components/InfluencerFilter";
import Flag from "./_components/Flag";
import ClientsSection from "@/components/ClientsSection";
import DirectAnswer from "@/components/DirectAnswer";
import FaqSection from "@/components/FaqSection";
import LastUpdated from "@/components/LastUpdated";
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

// GEO FAQ — "정보형 질의" 인용 노림. 본문은 기존 사이트 사실만 사용(새 수치 창작 금지).
const PEOPLE_FAQ = [
  {
    q: "왕홍(샤오홍슈) 마케팅은 어떻게 진행되나요?",
    a: "중국 현지에서 직접 운영하는 크리에이터(왕홍·KOL) 풀에서 캠페인 목표에 맞는 인플루언서를 매칭하고, 샤오홍슈·더우인 콘텐츠를 ‘번역’이 아닌 ‘현지화’로 기획·발행한 뒤 성과를 리포트합니다. 에이전시 재하청 없이 한 팀이 끝까지 운영합니다.",
  },
  {
    q: "일본·대만 인플루언서 마케팅도 가능한가요?",
    a: "네. 일본은 인스타그램·X 인플루언서와 라인(LINE), 대만은 페이스북·인스타·유튜브와 라인(번체)을 활용합니다. 각 시장의 현지 크리에이터를 직접 관리해 정서에 맞는 콘텐츠로 진행합니다.",
  },
  {
    q: "인플루언서 섭외부터 리포트까지 과정이 어떻게 되나요?",
    a: "① 캠페인 목표에 맞는 현지 인플루언서 섭외 → ② 콘텐츠 기획·현지화 → ③ 발행·운영·현지 커뮤니케이션 → ④ 성과 리포트의 원스톱 흐름으로 진행합니다.",
  },
  {
    q: "어떤 분야(업종)가 가능한가요?",
    a: "병원·기업·관공서까지 분야를 가리지 않습니다. 단순 노출이 아니라 문의·방문·구매 전환을 목표로 캠페인을 설계합니다.",
  },
  {
    q: "비용은 어떻게 되나요?",
    a: "캠페인 규모(시장·인플루언서 등급·콘텐츠 수)에 따라 맞춤 견적으로 안내합니다. 카카오톡 채널로 문의하시면 평균 1영업일 내 담당자가 회신드립니다.",
  },
];

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
            url: "/people/og-people-v2.jpg",
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

      {/* GEO Direct Answer — "열정의사람들은 어떤 회사인가" 자답(패시지 추출용) */}
      <DirectAnswer
        eyebrow="ABOUT"
        question="열정의사람들은 어떤 회사인가요?"
        answer="열정의사람들은 국내·일본·중국·대만 현지 인플루언서로 진출하는 글로벌 인플루언서 마케팅 전문 기업입니다. 에이전시 재하청이 아니라 각 시장의 크리에이터를 직접 운영하며, 샤오홍슈·더우인 왕홍(KOL)부터 일본·대만 인플루언서까지 캠페인 목표에 맞게 매칭합니다. ‘번역’이 아닌 ‘현지화’로, 단순 노출이 아니라 병원·기업·관공서의 문의·방문·구매 전환까지 설계하는 것이 핵심 차별점입니다."
        accent="#1e63c8"
        color="#0f172a"
        subColor="#475569"
        background="#ffffff"
      />

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
            <span className="ppl-prepnote__badge">안내</span>
            <p>
              아래 인플루언서는 실제 열정의사람들에 등록되어 있는 인플루언서입니다.
              초상권 보호와 직접 컨택 방지를 위해 프로필을 자동 AI 이미지로 대체했으며,
              인플루언서 관련 문의는 회사 카카오톡 채널로 주시기 바랍니다.
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

          {/* 분야별 상세(내부 링크) */}
          <div className="ppl-center" style={{ marginTop: "1.5rem" }}>
            <Link
              href="/people/wanghong-marketing"
              className="ppl-btn ppl-btn--ghost"
            >
              왕홍(샤오홍슈) 마케팅·체험단 자세히 →
            </Link>
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

      {/* GEO FAQ — 정보형 질의 자답(FAQPage 구조화데이터 동반) */}
      <FaqSection
        items={PEOPLE_FAQ}
        accent="#1e63c8"
        color="#0f172a"
        subColor="#475569"
        background="#ffffff"
        borderColor="rgba(15,23,42,0.1)"
      />
      <LastUpdated date="2026.06.28" color="#94a3b8" background="#ffffff" />

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
