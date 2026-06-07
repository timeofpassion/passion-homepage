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
    "열정의공간 지역재생 리트릿의 첫 거점, 전남 신안. 1,004개의 섬과 노을, 유네스코 세계자연유산 갯벌, 보랏빛 퍼플섬, 아시아 최초 슬로시티 증도 사이에서 마케터·크리에이터·전문가가 쉬고 콘텐츠를 남기는 리트릿. 신안 여행·힐링·워케이션·한달살기 코스로도 좋은 천혜의 섬.",
  keywords: [
    "신안 리트릿",
    "신안 여행",
    "신안 가볼만한곳",
    "신안 힐링 여행",
    "신안 워케이션",
    "신안 한달살기",
    "퍼플섬",
    "신안 퍼플섬",
    "증도 슬로시티",
    "증도 태평염전",
    "신안 갯벌",
    "신안 1004섬",
    "천사대교",
    "다도해 노을",
    "전남 여행",
    "섬 여행",
    "지역재생 리트릿",
    "재능기부 리트릿",
    "열정의공간 신안",
  ],
  alternates: { canonical: "https://www.timeofpassion.com/space/shinan" },
  openGraph: {
    title: "신안 1호 | 열정의공간 — 천 개의 섬과 노을",
    description:
      "전남 신안, 1,004개의 섬과 세계자연유산 갯벌·퍼플섬·증도 슬로시티 사이의 리트릿 거점. 쉬러 왔다가, 이야기를 남기고 갑니다.",
    url: "https://www.timeofpassion.com/space/shinan",
    siteName: "열정의공간",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/space/gallery/shinan-aerial.jpg",
        width: 1200,
        height: 800,
        alt: "전남 신안 — 천 개의 섬과 노을, 열정의공간 1호 거점",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "신안 1호 | 열정의공간 — 천 개의 섬과 노을",
    description:
      "전남 신안, 1,004개의 섬과 세계자연유산 갯벌·퍼플섬·증도 사이의 지역재생 리트릿 거점.",
    images: ["/space/gallery/shinan-aerial.jpg"],
  },
};

export default function ShinanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
