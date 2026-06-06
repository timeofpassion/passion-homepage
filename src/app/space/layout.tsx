import type { Metadata } from "next";

/**
 * /space 그룹 레이아웃 — 의도적으로 중립(wrapper만).
 * 브랜드홈(/space, 매거진 .psm-)과 거점상세(/space/shinan, 에살렌 .spc-)는
 * 디자인 시스템이 완전히 달라 각 페이지/하위 레이아웃이 자체 nav·footer·CSS를 갖는다.
 */

export const metadata: Metadata = {
  title: {
    absolute:
      "열정의공간 | 신안 리트릿 — 쉬고, 재능으로 지역을 살리는 지역재생 리트릿",
  },
  description:
    "열정의공간(PASSION SPACE)은 신안에서 진행하는 지역재생 리트릿입니다. 마케터·영상 크리에이터·인플루언서·전문가가 신안에 모여 깊이 힐링하고, 할인된 머무름 대신 마케팅·콘텐츠·아이디어 등 재능을 남겨 잊혀가던 지역을 되살립니다. 신안 힐링 여행·워케이션·재능기부 리트릿. 신안 1호 운영 중.",
  keywords: [
    "열정의공간",
    "PASSION SPACE",
    "신안 리트릿",
    "신안 힐링 여행",
    "지역재생 리트릿",
    "재능기부 여행",
    "재능기부 리트릿",
    "워케이션 신안",
    "신안 한달살기",
    "로컬 리트릿",
    "크리에이터 리트릿",
    "지역 살리기 프로젝트",
    "지방소멸 대응",
    "신안 여행",
    "퍼플섬",
    "증도 슬로시티",
    "신안 1004섬",
    "인플루언서 리트릿",
    "마케터 워케이션",
    "디지털노마드 리트릿",
  ],
  alternates: { canonical: "https://www.timeofpassion.com/space" },
  openGraph: {
    title: "열정의공간 | 신안에서 쉬고, 재능으로 지역을 살리는 리트릿",
    description:
      "신안에 모여 힐링하고, 재능으로 잊혀가던 지역을 되살리는 지역재생 리트릿. 신안 힐링 여행·워케이션·재능기부. 신안 1호 운영 중.",
    url: "https://www.timeofpassion.com/space",
    siteName: "열정의공간",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/space/og-space.jpg",
        width: 1200,
        height: 630,
        alt: "열정의공간 — 신안 지역재생 리트릿",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "열정의공간 | 신안에서 쉬고, 재능으로 지역을 살리는 리트릿",
    description:
      "신안에 모여 힐링하고, 재능으로 지역을 되살리는 지역재생 리트릿. 신안 힐링 여행·워케이션·재능기부.",
    images: ["/space/og-space.jpg"],
  },
};

export default function SpaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
