import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"],
});

export const metadata: Metadata = {
  title: "열정의시간 | 병원 마케팅 매출 구조 설계",
  description:
    "13년의 노하우로 병원의 실질적 매출을 만드는 수익 구조를 설계합니다. 국내 마케팅부터 일본·중국·대만 해외환자 유치까지 원스톱 솔루션.",
  keywords: [
    "병원마케팅",
    "의료마케팅",
    "병원광고",
    "해외환자유치",
    "일본환자유치",
    "중국환자유치",
    "대만환자유치",
    "병원SEO",
    "병원블로그",
    "성형외과마케팅",
    "피부과마케팅",
    "의료관광",
    "열정의시간",
  ],
  openGraph: {
    title: "열정의시간 | 병원 마케팅 매출 구조 설계",
    description:
      "13년의 노하우로 병원의 실질적 매출을 만드는 수익 구조를 설계합니다. 국내부터 일본·중국·대만까지.",
    url: "https://www.timeofpassion.com",
    siteName: "열정의시간",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "열정의시간 | 병원 마케팅 매출 구조 설계",
    description:
      "13년의 노하우로 병원의 실질적 매출을 만드는 수익 구조를 설계합니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.timeofpassion.com",
  },
  metadataBase: new URL("https://www.timeofpassion.com"),
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
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
