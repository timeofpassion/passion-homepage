import { CONTACT } from "./media";

/**
 * 열정의공간 거점(Network) 데이터.
 *
 * 브랜드홈(L1)의 거점 네트워크 섹션 + 향후 거점 상세(L2 /space/[slug]) 확장의 단일 소스.
 * 거점이 늘면 이 배열에 항목만 추가하면 네트워크 그리드에 반영된다.
 * status: open(운영중·상세링크) / soon(예정) / review(검토중) / propose(제안받음·라이트셀)
 */

export type PlaceStatus = "open" | "soon" | "review" | "propose";

export type Place = {
  slug: string;
  no?: string; // No.01 등 (propose 셀은 없음)
  status: PlaceStatus;
  statusLabel: string; // 셀 배지 텍스트
  name: string;
  desc: string;
  href?: string; // 상세/액션 링크
  arrow?: string; // 링크 라벨
  feat?: boolean; // 좌상단 큰 셀
  light?: boolean; // 종이 톤 셀(당신의 지역)
  video?: string;
  poster?: string;
  img?: string; // 영상 없이 이미지로 채울 때
  placeholder?: string; // 영상·이미지 없을 때 표시 텍스트
};

export const PLACES: Place[] = [
  {
    slug: "eowang",
    no: "No.01",
    status: "soon",
    statusLabel: "No.01 · 추진 중",
    name: "순천 어왕분교",
    desc: "방치된 폐교를 청년 크리에이터 베이스캠프로",
    href: "/space/eowang",
    arrow: "자세히 보기 →",
    feat: true,
    img: "/space/eowang/garden-01.jpg",
  },
  {
    slug: "your-region",
    status: "propose",
    statusLabel: "Where is next?",
    name: "당신의 지역",
    desc: "살려야 할 다음 지역을 제안해주세요",
    href: CONTACT.kakao,
    arrow: "거점 제안 →",
    light: true,
  },
];
