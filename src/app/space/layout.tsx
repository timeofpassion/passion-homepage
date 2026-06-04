import type { Metadata } from "next";

/**
 * /space 그룹 레이아웃 — 의도적으로 중립(wrapper만).
 * 브랜드홈(/space, 매거진 .psm-)과 거점상세(/space/shinan, 에살렌 .spc-)는
 * 디자인 시스템이 완전히 달라 각 페이지/하위 레이아웃이 자체 nav·footer·CSS를 갖는다.
 */

export const metadata: Metadata = {
  title: {
    absolute: "열정의공간 | 사라져가는 지역에 사람을 모아 되살리는 리트릿 운동",
  },
  description:
    "열정의공간(PASSION SPACE)은 장소가 아니라 운동입니다. 사라져가는 지역에 영향력 있는 사람들을 모아 깊이 쉬게 하고, 그들이 남긴 영감으로 지역을 되살리는 리트릿 운동 — 열정의 그룹의 공간 비즈니스. 신안 1호 운영 중.",
  alternates: { canonical: "https://www.timeofpassion.com/space" },
  openGraph: {
    title: "열정의공간 | 공간은 장소가 아니라, 그곳에 모인 사람의 에너지다",
    description:
      "사라져가는 지역에 사람을 모아 되살리는 리트릿 운동. 신안 1호 운영 중, 거점 확장 예정. 열정의 그룹.",
    url: "https://www.timeofpassion.com/space",
    siteName: "열정의공간",
    locale: "ko_KR",
    type: "website",
  },
};

export default function SpaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
