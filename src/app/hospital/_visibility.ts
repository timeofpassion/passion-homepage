/**
 * 협력병원 카탈로그(/hospital, /hospital/[slug]) 공개 여부 스위치.
 *
 * 2026-07-20 대표 지시로 비공개 전환 — 콘텐츠가 완료되기 전까지 외부 노출 금지.
 * 코드·데이터는 그대로 두고 이 플래그만 false 로 두어 404 를 반환한다.
 * 완료 후 공개할 때는 이 값을 true 로 바꾸고, src/app/robots.ts 의 disallow 항목도 함께 해제한다.
 */
export const HOSPITAL_PORTAL_PUBLIC = false
