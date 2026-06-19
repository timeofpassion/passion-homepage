import type { Metadata } from "next";

/**
 * /space 그룹 레이아웃 — 의도적으로 중립(wrapper만).
 * 브랜드홈(/space, 매거진 .psm-)과 거점상세(/space/shinan, 에살렌 .spc-)는
 * 디자인 시스템이 완전히 달라 각 페이지/하위 레이아웃이 자체 nav·footer·CSS를 갖는다.
 */

export const metadata: Metadata = {
  title: {
    absolute:
      "열정의공간 | 사라져가는 지역에 사람을 모아 되살리는 지역재생 리트릿 운동",
  },
  description:
    "열정의공간(PASSION SPACE)은 장소가 아니라 운동입니다. 사라져가는 지역에 영향력 있는 마케터·크리에이터·인플루언서·전문가를 모아 깊이 쉬게 하고, 할인된 머무름 대신 마케팅·콘텐츠·아이디어 등 재능을 남겨 관계인구와 지역 경제를 키웁니다. 지방소멸 대응·지역활성화 모델로 지자체·공공기관과 함께 거점을 넓혀가는 재능기부 리트릿 — 첫 거점으로 순천 어왕분교(폐교 재생)를 추진 중.",
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
    "폐교 활용",
    "폐교 재생",
    "순천 어왕분교",
    "민관 협력",
  ],
  alternates: { canonical: "https://www.timeofpassion.com/space" },
  openGraph: {
    title: "열정의공간 | 공간은 장소가 아니라, 그곳에 모인 사람의 에너지다",
    description:
      "사라져가는 지역에 사람을 모아 재능으로 되살리는 지역재생 리트릿 운동. 첫 거점으로 순천 어왕분교(폐교 재생)를 추진합니다.",
    url: "https://www.timeofpassion.com/space",
    siteName: "열정의공간",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/space/og-space.jpg",
        width: 1200,
        height: 630,
        alt: "열정의공간 — 지역재생 리트릿 운동",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "열정의공간 | 공간은 장소가 아니라, 그곳에 모인 사람의 에너지다",
    description:
      "사라져가는 지역에 사람을 모아 재능으로 되살리는 지역재생 리트릿 운동. 첫 거점 순천 어왕분교 추진 중.",
    images: ["/space/og-space.jpg"],
  },
};

export default function SpaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
