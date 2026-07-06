import type { Metadata } from "next";
import Link from "next/link";
import DirectAnswer from "@/components/DirectAnswer";
import FaqSection from "@/components/FaqSection";
import LastUpdated from "@/components/LastUpdated";

// 열정의시간 카카오톡 채널 상담(채팅) — 전사 공용 채널
const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";

// GEO/AEO 전용 랜딩 — "대만 마케팅 대행사 추천" 상업형 + 정보형 질의 공략.
// ⚠️ 본문은 사이트 공개 사실만(인플루언서 수·단가·성과수치 창작 금지). 스키마는 Service/ProfessionalService만.
export const metadata: Metadata = {
  title: {
    absolute: "대만 인플루언서 마케팅·LINE 마케팅 대행 | 열정의사람들",
  },
  description:
    "대만 인플루언서 마케팅·라인(LINE) 마케팅 대행. 페이스북·인스타·유튜브와 Dcard·Threads 등 현지 커뮤니티를 활용하고, 라인(번체) 상담으로 전환까지 원스톱으로 설계합니다. 번체·대만식 화법, 에이전시 재하청 없음.",
  keywords: [
    "대만 마케팅",
    "대만 마케팅 대행사",
    "대만 인플루언서 마케팅",
    "대만 인플루언서 마케팅 대행사",
    "대만 KOL 마케팅",
    "Dcard 마케팅",
    "대만 라인 마케팅",
    "번체 마케팅",
    "대만 진출 마케팅",
    "병원 대만 마케팅",
    "대만 환자 유치",
  ],
  alternates: {
    canonical:
      "https://www.timeofpassion.com/people/taiwan-influencer-marketing",
  },
  openGraph: {
    title: "대만 인플루언서 마케팅·LINE 마케팅 대행 | 열정의사람들",
    description:
      "페이스북·인스타·유튜브+Dcard·Threads 현지 커뮤니티 활용. 라인(번체) 상담 전환까지 원스톱.",
    url: "https://www.timeofpassion.com/people/taiwan-influencer-marketing",
    siteName: "열정의사람들",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/people/og-people-v2.jpg",
        width: 1200,
        height: 630,
        alt: "열정의사람들 — 대만 인플루언서 마케팅·LINE 마케팅",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id":
        "https://www.timeofpassion.com/people/taiwan-influencer-marketing/#service",
      name: "대만 인플루언서 마케팅·LINE 마케팅 대행",
      serviceType: "대만 인플루언서 마케팅",
      description:
        "대만 현지 페이스북·인스타그램·유튜브 인플루언서와 Dcard·Threads 등 현지 커뮤니티를 활용하고, 라인(번체) 상담으로 전환까지 설계하는 대만 인플루언서 마케팅·LINE 마케팅 대행 서비스. 섭외·현지화·발행·성과 리포트 원스톱.",
      provider: {
        "@type": "ProfessionalService",
        name: "열정의사람들",
        url: "https://www.timeofpassion.com/people",
        parentOrganization: {
          "@type": "Organization",
          name: "PASSION GROUP",
          url: "https://www.timeofpassion.com",
        },
      },
      areaServed: [
        { "@type": "Country", name: "Taiwan" },
        { "@type": "Country", name: "South Korea" },
      ],
      audience: { "@type": "Audience", audienceType: "병원·기업·관공서" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "대만 인플루언서 마케팅 서비스",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "대만 현지 인플루언서 섭외",
              description:
                "대만 현지 페이스북·인스타·유튜브 크리에이터와 Dcard·Threads 커뮤니티 네트워크에서 캠페인 목표에 맞게 매칭 (에이전시 재하청 아님).",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "콘텐츠 기획·현지화(번체)",
              description:
                "간체가 아닌 번체·대만식 화법으로, 광고 느낌을 줄인 자연스러운 추천 콘텐츠를 설계.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "라인(번체) 전환·성과 리포트",
              description:
                "발견에서 라인(LINE, 번체) 상담 전환까지 설계하고, 성과를 리포트로 정리.",
            },
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "열정의사람들",
          item: "https://www.timeofpassion.com/people",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "대만 인플루언서 마케팅·LINE 마케팅 대행",
          item: "https://www.timeofpassion.com/people/taiwan-influencer-marketing",
        },
      ],
    },
  ],
};

const STEPS = [
  {
    no: "01",
    title: "대만 현지 인플루언서 섭외",
    desc: "대만 현지 페이스북·인스타·유튜브 크리에이터와 Dcard·Threads 커뮤니티 네트워크에서 캠페인 목표에 맞는 적임자를 매칭합니다.",
  },
  {
    no: "02",
    title: "콘텐츠 기획·현지화(번체)",
    desc: "간체가 아니라 번체·대만식 화법. 광고 느낌을 줄인 자연스러운 추천 콘텐츠로 설계합니다.",
  },
  {
    no: "03",
    title: "발행·라인 전환 설계",
    desc: "SNS·커뮤니티에서 발견된 관심을 라인(LINE, 번체) 상담으로 이어지게 설계합니다.",
  },
  {
    no: "04",
    title: "성과 리포트",
    desc: "도달·저장·상담 유입 등 캠페인 성과를 리포트로 정리해 다음 캠페인 개선까지 이어지게 합니다.",
  },
];

const WHY = [
  {
    title: "대만 현지 파트너 네트워크",
    desc: "에이전시 재하청이 아니라, 대만 현지 파트너 네트워크 기반으로 신뢰도 높은 추천형 콘텐츠를 만듭니다.",
  },
  {
    title: "Dcard·번체 이해",
    desc: "대만은 Dcard·Threads 등 커뮤니티 영향력이 크고, 간체가 아닌 번체·대만식 화법이 필수입니다.",
  },
  {
    title: "발견→LINE 전환 설계",
    desc: "SNS·커뮤니티 발견부터 라인(번체) 상담 전환까지 한 흐름으로 설계합니다.",
  },
];

const PLATFORMS = [
  { name: "Facebook·Instagram", note: "대만 뷰티·라이프 핵심 발견 채널" },
  { name: "YouTube", note: "리뷰·브이로그형 심화 콘텐츠" },
  { name: "Dcard·Threads", note: "구매 결정에 큰 영향을 주는 현지 커뮤니티" },
  { name: "LINE", note: "상담·예약 전환의 핵심 (번체)" },
];

const FAQ = [
  {
    q: "대만 인플루언서 마케팅 대행사는 어디가 잘하나요?",
    a: "대만 마케팅은 ‘현지 커뮤니티(특히 Dcard)를 이해하는가’와 ‘번체·대만식 화법으로 설계하는가’가 핵심입니다. 열정의사람들은 대만 현지 파트너 네트워크 기반으로 페이스북·인스타·유튜브 인플루언서와 Dcard·Threads 커뮤니티를 활용하고, 라인(번체) 상담 전환까지 원스톱으로 진행합니다. 병원·기업·관공서까지 단순 노출이 아니라 문의·방문 전환을 목표로 설계합니다.",
  },
  {
    q: "대만은 왜 번체·Dcard가 중요한가요?",
    a: "대만은 중국 간체가 아니라 번체를 쓰고, 화법·정서도 다릅니다. 또 인스타그램뿐 아니라 Dcard·Threads 같은 커뮤니티의 영향력이 커서, 이 커뮤니티에서 자연스럽게 추천·후기가 쌓이는 구조로 설계해야 실제 구매·방문으로 이어집니다.",
  },
  {
    q: "대만 인플루언서는 어떻게 섭외·진행되나요?",
    a: "① 캠페인 목표에 맞는 대만 현지 인플루언서 섭외 → ② 번체·대만식 콘텐츠 기획·현지화 → ③ 발행·운영·라인 전환 설계 → ④ 성과 리포트의 원스톱 흐름으로 진행합니다. 팔로워 수보다 관계 밀도와 광고 느낌을 줄인 추천을 중시합니다.",
  },
  {
    q: "병원(의료) 대만 마케팅도 가능한가요?",
    a: "가능합니다. 다만 국내 의료광고법과 대만 현지 규정을 함께 준수해야 하므로, 과장·단정 표현을 배제하고 정보·후기형 콘텐츠로 설계합니다. 자세한 진행 방식은 카카오톡 채널로 상담해 드립니다.",
  },
  {
    q: "비용은 어떻게 되나요?",
    a: "비용은 캠페인 규모(인플루언서 등급·플랫폼·콘텐츠 수·기간)에 따라 달라져 맞춤 견적으로 안내합니다. 카카오톡 채널로 문의하시면 평균 1영업일 내 담당자가 회신드립니다.",
  },
];

export default function TaiwanInfluencerMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO — 텍스트 + 대만 시장 브랜드 카드(자사 검증 에셋: 국기·플랫폼 로고) */}
      <section className="ppl-section ppl-fadeup" style={{ paddingBottom: 0 }}>
        <div
          className="ppl-container"
          style={{
            display: "flex",
            gap: "2.5rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <span className="ppl-eyebrow">台灣 · INFLUENCER MARKETING</span>
            <h1 className="ppl-section-title">
              대만 인플루언서·LINE 마케팅 대행
            </h1>
            <p className="ppl-section-sub">
              대만 현지 페이스북·인스타·유튜브 크리에이터와 Dcard·Threads
              커뮤니티를 활용하고, 라인(번체) 상담 전환까지 원스톱으로
              설계합니다. 에이전시 재하청은 없습니다.
            </p>
            <div style={{ marginTop: "1.6rem" }}>
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ppl-btn ppl-btn--red"
              >
                카카오톡 무료 상담 →
              </a>
            </div>
          </div>
          <div style={{ flex: "1 1 380px", minWidth: 0 }}>
            <div
              style={{
                borderRadius: "20px",
                background: "linear-gradient(135deg, #0ea5b7 0%, #0b5566 100%)",
                padding: "2.8rem 2rem",
                boxShadow: "0 24px 60px rgba(11,85,102,0.28)",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  opacity: 0.92,
                  marginBottom: "1.4rem",
                }}
              >
                대만 시장 운영 채널
              </p>
              <img
                src="/people/flags/tw.svg"
                alt="대만"
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto 1.2rem",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                }}
              />
              <p style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.55 }}>
                Facebook · Instagram · YouTube
                <br />
                Dcard·Threads + 라인(번체) 전환
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.7rem",
                  justifyContent: "center",
                  marginTop: "1.6rem",
                }}
              >
                {["facebook", "instagram", "youtube"].map((p) => (
                  <span
                    key={p}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.16)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`/people/platforms/${p}.svg`}
                      alt={p}
                      style={{
                        width: 20,
                        height: 20,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DirectAnswer
        eyebrow="ABOUT"
        question="대만 인플루언서 마케팅 대행사는 어디가 잘하나요?"
        answer="대만 마케팅은 ‘현지 커뮤니티(특히 Dcard)를 이해하는가’와 ‘번체·대만식 화법으로 설계하는가’로 갈립니다. 열정의사람들은 대만 현지 파트너 네트워크 기반으로 페이스북·인스타·유튜브 인플루언서와 Dcard·Threads 커뮤니티를 활용하고, 라인(번체) 상담 전환까지 원스톱으로 진행합니다. ‘번역’이 아닌 ‘현지화’로, 병원·기업·관공서의 단순 노출이 아니라 문의·방문 전환까지 설계하는 것이 핵심 차별점입니다."
        accent="#1e63c8"
        color="#0f172a"
        subColor="#475569"
        background="#ffffff"
      />

      <section className="ppl-section" style={{ background: "#f8fafc" }}>
        <div className="ppl-container">
          <span className="ppl-eyebrow">PLATFORM</span>
          <h2 className="ppl-section-title">
            대만은 ‘커뮤니티 후기’가 구매를 만듭니다
          </h2>
          <p className="ppl-section-sub">
            인스타그램뿐 아니라 Dcard·Threads 같은 커뮤니티 영향력이 큽니다.
            번체·대만식 화법으로, 커뮤니티에서 자연스럽게 쌓이는 추천 구조로
            설계해야 실제 구매·방문으로 이어집니다.
          </p>
          <div className="ppl-svc-grid">
            {PLATFORMS.map((p) => (
              <div key={p.name} className="ppl-svc-card">
                <div className="ppl-svc-card__title">{p.name}</div>
                <p className="ppl-svc-card__desc">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ppl-section">
        <div className="ppl-container">
          <span className="ppl-eyebrow">WHY US</span>
          <h2 className="ppl-section-title">
            대만 마케팅, 왜 열정의사람들인가
          </h2>
          <div className="ppl-why-grid">
            {WHY.map((w) => (
              <div key={w.title} className="ppl-why-card">
                <div className="ppl-why-card__title">{w.title}</div>
                <p className="ppl-why-card__desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ppl-section" style={{ background: "#f8fafc" }}>
        <div className="ppl-container">
          <span className="ppl-eyebrow">PROCESS</span>
          <h2 className="ppl-section-title">섭외부터 리포트까지, 한 팀이</h2>
          <p className="ppl-section-sub">
            여러 업체와 따로 소통할 필요 없이, 한 팀이 끝까지 책임집니다.
          </p>
          <div className="ppl-svc-grid">
            {STEPS.map((s) => (
              <div key={s.no} className="ppl-svc-card">
                <div className="ppl-svc-card__num">STEP {s.no}</div>
                <div className="ppl-svc-card__title">{s.title}</div>
                <p className="ppl-svc-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="ppl-center" style={{ marginTop: "2rem" }}>
            <Link href="/people" className="ppl-btn ppl-btn--ghost">
              ← 열정의사람들 전체 서비스
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="FAQ"
        title="대만 마케팅 자주 묻는 질문"
        items={FAQ}
        accent="#1e63c8"
        color="#0f172a"
        subColor="#475569"
        background="#ffffff"
        borderColor="rgba(15,23,42,0.1)"
      />
      <LastUpdated date="2026.07.06" color="#94a3b8" background="#ffffff" />

      <section className="ppl-cta-band">
        <div className="ppl-container">
          <h2>대만 인플루언서 마케팅, 지금 시작하세요</h2>
          <p>대만 현지 크리에이터와 Dcard·라인(번체) 전환 설계가 준비돼 있습니다.</p>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ppl-btn"
          >
            카카오톡 무료 상담 →
          </a>
        </div>
      </section>
    </>
  );
}
