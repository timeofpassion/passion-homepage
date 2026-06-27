import type { Metadata } from "next";
import Link from "next/link";
import "./people.css";
import PplHeader from "./_components/PplHeader";

// 열정의시간 카카오톡 채널 상담(채팅) — 전사 공용 채널
const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";

export const metadata: Metadata = {
  description:
    "열정의사람들 — 일본·중국·대만 현지 인플루언서로 진출하는 글로벌 마케팅 전문 기업. 병원·기업·기관의 동아시아 시장 진출을 인플루언서 마케팅으로 실행합니다.",
  keywords: [
    "열정의사람들",
    "인플루언서 마케팅",
    "인플루언서 마케팅 대행",
    "왕홍 마케팅",
    "왕홍 마케팅 대행사",
    "샤오홍슈 마케팅",
    "KOL 마케팅",
    "중국 인플루언서 마케팅",
    "일본 인플루언서 마케팅",
    "대만 인플루언서 마케팅",
    "동아시아 인플루언서 마케팅",
    "글로벌 인플루언서 마케팅",
    "해외 인플루언서 마케팅 대행",
    "라인 마케팅",
    "외국인환자 유치 마케팅",
  ],
  alternates: { canonical: "https://www.timeofpassion.com/people" },
  openGraph: {
    title: "열정의사람들 | 글로벌 인플루언서 마케팅",
    description:
      "일본·중국·대만, 현지 인플루언서로 진출하다. 동아시아 시장 진출 인플루언서 마케팅 전문 기업.",
    url: "https://www.timeofpassion.com/people",
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
  twitter: {
    card: "summary_large_image",
    title: "열정의사람들 | 글로벌 인플루언서 마케팅",
    description:
      "일본·중국·대만, 현지 인플루언서로 진출하다. 동아시아 시장 진출 인플루언서 마케팅 전문.",
    images: ["/people/og-people-v2.jpg"],
  },
};

// JSON-LD 구조화된 데이터 (열정의사람들 — /people)
// ⚠️ 마케팅 회사이므로 Organization + ProfessionalService 만 사용 (MedicalClinic 금지).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.timeofpassion.com/people/#organization",
      name: "열정의사람들",
      url: "https://www.timeofpassion.com/people",
      parentOrganization: {
        "@type": "Organization",
        name: "PASSION GROUP",
        url: "https://www.timeofpassion.com",
      },
      description:
        "국내·일본·중국·대만 현지 인플루언서로 진출하는 글로벌 인플루언서 마케팅 전문 기업. 병원·기업·관공서의 국내·해외 마케팅을 현지 인플루언서로 실행합니다.",
      areaServed: [
        { "@type": "Country", name: "South Korea" },
        { "@type": "Country", name: "Japan" },
        { "@type": "Country", name: "China" },
        { "@type": "Country", name: "Taiwan" },
      ],
      knowsAbout: [
        "인플루언서 마케팅",
        "왕홍 마케팅",
        "KOL 마케팅",
        "샤오홍슈 마케팅",
        "라인(LINE) 마케팅",
        "글로벌 마케팅",
        "일본 인플루언서 마케팅",
        "중국 인플루언서 마케팅",
        "대만 인플루언서 마케팅",
      ],
      sameAs: ["https://pf.kakao.com/_RgYcxj"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.timeofpassion.com/people/#business",
      name: "열정의사람들",
      url: "https://www.timeofpassion.com/people",
      description:
        "국내·일본·중국·대만 현지 인플루언서 마케팅 — 섭외·콘텐츠 현지화·캠페인 실행·성과 리포트 원스톱.",
      priceRange: "$$",
      areaServed: [
        { "@type": "Country", name: "South Korea" },
        { "@type": "Country", name: "Japan" },
        { "@type": "Country", name: "China" },
        { "@type": "Country", name: "Taiwan" },
      ],
      serviceType: [
        "인플루언서 마케팅",
        "왕홍(KOL) 마케팅",
        "샤오홍슈 마케팅",
        "인플루언서 섭외",
        "콘텐츠 현지화",
        "캠페인 운영·리포트",
        "일본 인플루언서 마케팅",
        "중국 인플루언서 마케팅",
        "대만 인플루언서 마케팅",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "인플루언서 마케팅 서비스",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "현지 인플루언서 섭외",
              description:
                "국내·일본·중국·대만 현지에서 직접 운영하는 검증된 풀에서 캠페인 목표에 맞는 인플루언서를 매칭 (에이전시 재하청 아님).",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "콘텐츠 기획·현지화",
              description:
                "'번역'이 아닌 '현지화'. 시장·플랫폼별 정서에 맞는 콘텐츠 기획과 핵심 메시지 설계.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "캠페인 실행·성과 리포트",
              description:
                "발행·운영·현지 커뮤니케이션부터 성과 리포트까지 전 과정 원스톱.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.timeofpassion.com/people/#website",
      url: "https://www.timeofpassion.com/people",
      name: "열정의사람들",
      publisher: {
        "@id": "https://www.timeofpassion.com/people/#organization",
      },
      inLanguage: "ko-KR",
    },
  ],
};

export default function PeopleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="ppl-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PplHeader />

      {children}

      <footer className="ppl-footer">
        <div className="ppl-container ppl-footer__grid">
          <div>
            <div className="ppl-footer__brand">
              열정의<b>사람들</b>
            </div>
            <p>
              일본·중국·대만 현지 인플루언서로 진출하는
              <br />
              글로벌 마케팅 전문 기업
            </p>
          </div>

          <div className="ppl-footer__col">
            <h4>Company</h4>
            <p>상호: 열정의사람들</p>
            <p>대표: 한동남</p>
            <p>사업자번호: 미정</p>
            <p>주소: 미정</p>
          </div>

          <div className="ppl-footer__col">
            <h4>Contact</h4>
            <p>
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ppl-footer__kakao"
              >
                💬 카카오톡 채널 상담
              </a>
              <br />
              <Link href="/">← PASSION GROUP</Link>
            </p>
          </div>
        </div>
        <div className="ppl-container ppl-footer__bottom">
          © 2026 열정의사람들. ALL RIGHTS RESERVED.
        </div>
      </footer>

      <a
        href={KAKAO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ppl-kakao"
        aria-label="카카오톡 상담"
      >
        💬 카톡 상담
      </a>
    </div>
  );
}
