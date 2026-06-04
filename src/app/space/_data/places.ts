import { MEDIA } from "./media";

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
  placeholder?: string; // 영상 없을 때 표시 텍스트
};

export const PLACES: Place[] = [
  {
    slug: "shinan",
    no: "No.01",
    status: "open",
    statusLabel: "No.01 · Open",
    name: "신안",
    desc: "천 개의 섬과 노을, 예술의 바다",
    href: "/space/shinan",
    arrow: "자세히 보기 →",
    feat: true,
    video: MEDIA.feature1.video,
    poster: MEDIA.feature1.poster,
  },
  {
    slug: "jeongseon",
    no: "No.02",
    status: "soon",
    statusLabel: "No.02 · 예정",
    name: "정선",
    desc: "폐광에서 재생으로",
    placeholder: "[ 정선 고원·폐광 ]",
  },
  {
    slug: "yeongyang",
    status: "review",
    statusLabel: "검토 중",
    name: "영양",
    desc: "가장 한적한 오지",
    placeholder: "[ 영양 밤하늘 ]",
  },
  {
    slug: "your-region",
    status: "propose",
    statusLabel: "제안받음",
    name: "당신의 지역",
    desc: "살려야 할 다음 지역을 제안해주세요",
    href: "mailto:hello@passionspace.kr?subject=[열정의공간] 거점 제안",
    arrow: "거점 제안 →",
    light: true,
  },
];
