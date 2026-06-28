import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "열정의시간 | 병원 마케팅 & 해외환자 유치 전문 에이전시",
    template: "%s | 열정의시간",
  },
  description:
    "병원 마케팅 전문 에이전시 열정의시간. 10년 이상 노하우로 국내 마케팅(블로그 SEO, 영상, SNS, 플레이스)부터 일본·중국·대만 해외환자 유치까지. 광고비 낭비 없이 실질적 매출 구조를 설계합니다. 무료 전략 상담.",
  keywords: [
    "열정의시간",
    "병원마케팅",
    "병원마케팅대행",
    "병원마케팅업체",
    "병원마케팅에이전시",
    "의료마케팅",
    "의료마케팅대행사",
    "병원광고",
    "병원광고대행",
    "국내마케팅",
    "해외마케팅",
    "해외환자유치",
    "일본마케팅",
    "일본환자유치",
    "중국마케팅",
    "중국환자유치",
    "대만마케팅",
    "대만환자유치",
    "의료관광마케팅",
    "병원블로그마케팅",
    "병원SEO",
    "병원영상마케팅",
    "성형외과마케팅",
    "피부과마케팅",
    "치과마케팅",
    "한의원마케팅",
    "강남병원마케팅",
    "병원플레이스",
    "병원바이럴마케팅",
    "샤오홍슈마케팅",
    "라인마케팅",
  ],
  openGraph: {
    title: "열정의시간 | 병원 마케팅 & 해외환자 유치 전문 에이전시",
    description:
      "10년 이상 노하우의 병원 마케팅 전문 에이전시. 국내 통합 마케팅부터 일본·중국·대만 해외환자 유치까지 원스톱으로. 하나의 계약으로 6개 팀이 동시에 움직입니다.",
    url: "https://www.timeofpassion.com/time",
    siteName: "열정의시간",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/time/og-time-v2.jpg",
        width: 1200,
        height: 630,
        alt: "열정의시간 — 병원 마케팅 & 해외환자 유치 전문 에이전시",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "열정의시간 | 병원 마케팅 & 해외환자 유치 전문",
    description:
      "국내 마케팅부터 일본·중국·대만 해외환자 유치까지. 10년 이상 노하우의 병원 전문 에이전시.",
    images: ["/time/og-time-v2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.timeofpassion.com/time",
  },
};

// JSON-LD 구조화된 데이터 (열정의시간 — /time)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.timeofpassion.com/time/#organization",
      name: "열정의시간",
      url: "https://www.timeofpassion.com/time",
      parentOrganization: {
        "@type": "Organization",
        name: "PASSION GROUP",
        url: "https://www.timeofpassion.com",
      },
      description:
        "병원 마케팅 전문 에이전시. 국내 통합 마케팅부터 일본·중국·대만 해외환자 유치까지. 대표의 병원 마케팅 운영 경력 10년 이상.",
      foundingDate: "2023",
      identifier: {
        "@type": "PropertyValue",
        name: "외국인환자 유치업 등록번호",
        value: "A-2025-01-02-06178호",
      },
      areaServed: [
        { "@type": "Country", name: "South Korea" },
        { "@type": "Country", name: "Japan" },
        { "@type": "Country", name: "China" },
        { "@type": "Country", name: "Taiwan" },
      ],
      knowsAbout: [
        "병원 마케팅",
        "의료 마케팅",
        "해외환자 유치",
        "일본 마케팅",
        "중국 마케팅",
        "대만 마케팅",
        "블로그 SEO",
        "영상 마케팅",
        "SNS 마케팅",
        "샤오홍슈 마케팅",
      ],
      sameAs: ["https://pf.kakao.com/_RgYcxj"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.timeofpassion.com/time/#business",
      name: "열정의시간",
      url: "https://www.timeofpassion.com/time",
      description:
        "병원 마케팅 전문 에이전시 - 국내 마케팅, 해외환자 유치, 영상 제작, 디자인",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "서울",
        addressRegion: "강남구",
        addressCountry: "KR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.5665,
        longitude: 126.978,
      },
      serviceType: [
        "병원 마케팅",
        "의료 마케팅 대행",
        "해외환자 유치 마케팅",
        "블로그 SEO",
        "영상 제작",
        "SNS 운영",
        "일본 마케팅",
        "중국 마케팅",
        "대만 마케팅",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "병원 마케팅 서비스",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "국내 통합 마케팅",
              description:
                "블로그 SEO, 영상, SNS, 플레이스, 플랫폼, 바이럴 원스톱 마케팅",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "해외 마케팅 (일본·중국·대만)",
              description:
                "현지 전담팀이 직접 운영하는 해외환자 유치 마케팅",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "해외환자 유치 풀 프로세스",
              description:
                "문의부터 내원, 사후관리까지 전 과정 설계",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.timeofpassion.com/time/#website",
      url: "https://www.timeofpassion.com/time",
      name: "열정의시간",
      publisher: {
        "@id": "https://www.timeofpassion.com/time/#organization",
      },
      inLanguage: "ko-KR",
    },
  ],
};

export default function TimeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* JS 미실행 시 스크롤 리빌 콘텐츠가 숨지 않도록 폴백 */}
      <noscript>
        <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      {children}
    </>
  );
}
