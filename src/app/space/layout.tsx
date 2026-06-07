import type { Metadata } from "next";

/**
 * /space 그룹 레이아웃 — 의도적으로 중립(wrapper만).
 * 브랜드홈(/space, 매거진 .psm-)과 거점상세(/space/shinan, 에살렌 .spc-)는
 * 디자인 시스템이 완전히 달라 각 페이지/하위 레이아웃이 자체 nav·footer·CSS를 갖는다.
 */

export const metadata: Metadata = {
  title: {
    absolute:
      "열정의공간 | 쉬고, 재능으로 지역을 살리는 지역재생 리트릿 (1호 신안)",
  },
  description:
    "열정의공간(PASSION SPACE)은 사라져가는 지역에 영향력 있는 사람들을 모아 깊이 쉬게 하고, 그들이 남긴 재능으로 지역을 되살리는 지역재생 리트릿 운동입니다. 마케터·크리에이터·인플루언서·전문가가 머물며 마케팅·콘텐츠·아이디어를 남겨 관계인구와 지역 경제를 키웁니다. 지방소멸 대응·지역활성화 모델로 지자체·공공기관과 함께 거점을 넓혀갑니다. 첫 거점은 전남 신안.",
  keywords: [
    "열정의공간",
    "PASSION SPACE",
    "지역재생 리트릿",
    "지역재생 사업",
    "지방소멸 대응",
    "지방소멸대응기금",
    "지역활성화",
    "관계인구",
    "로컬 리트릿",
    "지자체 협력",
    "지역 살리기 프로젝트",
    "재능기부 리트릿",
    "재능기부 여행",
    "워케이션",
    "크리에이터 리트릿",
    "인플루언서 리트릿",
    "마케터 워케이션",
    "디지털노마드 리트릿",
    "기업 워크숍 리트릿",
    "신안 리트릿",
    "신안 힐링 여행",
    "신안 한달살기",
    "신안 여행",
    "퍼플섬",
    "증도 슬로시티",
    "신안 1004섬",
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
