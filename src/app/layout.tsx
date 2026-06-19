import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"],
});

export const metadata: Metadata = {
  verification: {
    google: "06n0KQdVtbte3e34Vp7VSlit0C3e8qqZmTDWaabne4Y",
    other: {
      "naver-site-verification": "4e9d8fd7b3f7336ec492afdb8fd61f5af93e5e07",
    },
  },
  title: {
    default: "PASSION GROUP | 열정의시간 · 열정의사람들 · 열정의공간",
    template: "%s | PASSION GROUP",
  },
  description:
    "PASSION GROUP — 열정으로 시간·사람·공간을 잇습니다. 열정의시간(국내·해외 병의원 전문마케팅), 열정의사람들(글로벌·인플루언서 마케팅), 열정의공간(공간 비즈니스).",
  openGraph: {
    title: "PASSION GROUP | 열정의시간 · 열정의사람들 · 열정의공간",
    description:
      "열정으로 시간·사람·공간을 잇습니다. 병의원 전문마케팅 열정의시간, 글로벌·인플루언서 마케팅 열정의사람들, 공간 비즈니스 열정의공간.",
    url: "https://www.timeofpassion.com",
    siteName: "PASSION GROUP",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-passion.jpg",
        width: 1200,
        height: 630,
        alt: "PASSION GROUP — 열정의시간 · 열정의사람들 · 열정의공간",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PASSION GROUP",
    description:
      "열정으로 시간·사람·공간을 잇습니다. 열정의시간 · 열정의사람들 · 열정의공간.",
    images: ["/og-passion.jpg"],
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
    canonical: "https://www.timeofpassion.com",
  },
  metadataBase: new URL("https://www.timeofpassion.com"),
};

// JSON-LD 구조화된 데이터 (PASSION GROUP — 그룹 레벨)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.timeofpassion.com/#organization",
      name: "PASSION GROUP",
      alternateName: "열정 그룹",
      url: "https://www.timeofpassion.com",
      description:
        "열정으로 시간·사람·공간을 잇는 그룹. 열정의시간·열정의사람들·열정의공간으로 구성됩니다.",
      sameAs: ["https://pf.kakao.com/_timfofpassion"],
      subOrganization: [
        {
          "@type": "Organization",
          name: "열정의시간",
          url: "https://www.timeofpassion.com/time",
          description: "국내·해외 병의원 전문마케팅 기업",
        },
        {
          "@type": "Organization",
          name: "열정의사람들",
          url: "https://www.timeofpassion.com/people",
          description: "글로벌마케팅·인플루언서 국내해외 전문마케팅 기업",
        },
        {
          "@type": "Organization",
          name: "열정의공간",
          url: "https://www.timeofpassion.com/space",
          description: "새로운 공간비즈니스를 준비하는 기업",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.timeofpassion.com/#website",
      url: "https://www.timeofpassion.com",
      name: "PASSION GROUP",
      publisher: {
        "@id": "https://www.timeofpassion.com/#organization",
      },
      inLanguage: "ko-KR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
