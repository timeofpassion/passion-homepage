/**
 * 열정의공간 배경 영상/포스터 소스.
 *
 * 현재는 Mixkit 무료 스톡(저작권 프리·워터마크 없음·출처표기 불필요)을 데모로 사용.
 * 실제 신안 촬영물(드론 일몰·다도해·폐교·해변·객실)로 교체하는 단일 지점이다.
 * 교체 시 video/poster 경로만 바꾸면 전 페이지에 반영된다.
 */

const MIXKIT = (id: string) => ({
  video: `https://assets.mixkit.co/videos/${id}/${id}-360.mp4`,
  poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-360-0.jpg`,
});

export const MEDIA = {
  hero: MIXKIT("44370"), // 일몰 바다 항공
  feature1: MIXKIT("44397"), // 군도
  feature2: MIXKIT("44373"), // 일몰
  feature3: MIXKIT("44391"), // 섬
  journal: MIXKIT("44490"),
  connect: MIXKIT("42498"),

  // 히어로 아래 시네마틱 필름 섹션.
  // 2026-06-05 Higgsfield(Seedance 1.5 Pro)로 생성한 신안 영상으로 교체 완료.
  // 컨셉: 신안 바닷가 노을, 지도 펴놓고 여행 회의하며 쉬는 사람들(쉼 속의 싱크탱크).
  // 재생성 시 새 mp4/jpg 를 public/space/ 에 덮어쓰면 된다.
  film: { video: "/space/film-shinan.mp4", poster: "/space/film-shinan.jpg" },
} as const;

export const CONTACT = {
  email: "hello@passionspace.kr",
  instagram: "https://www.instagram.com/passion.space",
  instagramHandle: "@passion.space",
  kakao: "https://pf.kakao.com/_RgYcxj/chat",
  region: "전남 신안군",
} as const;
