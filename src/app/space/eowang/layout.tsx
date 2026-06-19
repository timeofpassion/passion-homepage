import type { Metadata } from "next";

/**
 * /space/eowang 레이아웃 — 중립(metadata만).
 * 페이지가 자체 nav·footer·CSS(.psm-/.shn-)를 갖는다.
 */

export const metadata: Metadata = {
  title: {
    absolute: "순천 어왕분교 | 열정의공간 — 폐교를 청년 크리에이터 베이스캠프로",
  },
  description:
    "열정의공간 지역재생 리트릿 운동의 첫 거점, 순천 어왕분교. 방치된 폐교를 전국·해외 청년 크리에이터의 베이스캠프로 되살려, 순천만국가정원·낙안읍성·선암사 등 순천 전역을 알리는 콘텐츠 생산기지로 만드는 민관 협력 사업을 추진합니다.",
  keywords: [
    "순천 어왕분교",
    "어왕분교",
    "순천 폐교 활용",
    "폐교 재생",
    "열정의공간",
    "PASSION SPACE",
    "지역재생 리트릿",
    "청년 크리에이터 베이스캠프",
    "순천만국가정원",
    "민관 협력",
    "지방소멸 대응",
    "순천 콘텐츠 생산기지",
  ],
  alternates: { canonical: "https://www.timeofpassion.com/space/eowang" },
  openGraph: {
    title: "순천 어왕분교 | 열정의공간 — 폐교를 콘텐츠 생산기지로",
    description:
      "방치된 순천 어왕분교를 청년 크리에이터 베이스캠프로. 순천 전역을 알리는 콘텐츠를 만드는 민관 협력 지역재생 거점, 추진 중.",
    url: "https://www.timeofpassion.com/space/eowang",
    siteName: "열정의공간",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/space/eowang/garden-01.jpg",
        width: 1920,
        height: 1280,
        alt: "순천 어왕분교 — 열정의공간 첫 거점 (순천만국가정원)",
      },
    ],
  },
};

export default function EowangLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
