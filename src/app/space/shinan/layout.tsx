import type { Metadata } from "next";

/**
 * /space/shinan 레이아웃 — 중립(metadata만).
 * 페이지가 자체 nav·footer·CSS(.psm-/.shn-)를 갖는다.
 */

export const metadata: Metadata = {
  title: {
    absolute: "신안 1호 | 열정의공간 — 천 개의 섬과 노을의 리트릿 거점",
  },
  description:
    "열정의공간 리트릿 운동의 첫 거점, 전남 신안. 1004개의 섬과 노을, 유네스코 세계자연유산 갯벌, 보랏빛 퍼플섬 사이에서 마케터·크리에이터·지성인이 쉬고 사유하고 콘텐츠를 남기는 순환형 리트릿.",
  alternates: { canonical: "https://www.timeofpassion.com/space/shinan" },
  openGraph: {
    title: "신안 1호 | 열정의공간 — 천 개의 섬과 노을",
    description:
      "전남 신안, 1004개의 섬과 세계자연유산 갯벌 사이의 리트릿 거점. 쉬러 왔다가, 이야기를 남기고 갑니다.",
    url: "https://www.timeofpassion.com/space/shinan",
    siteName: "열정의공간",
    locale: "ko_KR",
    type: "website",
  },
};

export default function ShinanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
