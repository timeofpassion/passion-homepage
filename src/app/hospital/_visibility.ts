/**
 * 협력병원 카탈로그(/hospital, /hospital/[slug]) 노출 정책.
 *
 * 이 페이지는 브로커·현지 에이전시에게 URL을 직접 건네 쓰는 영업용 카탈로그다.
 * 따라서 "숨김 공개(unlisted)" 로 운영한다:
 *   - 주소를 아는 사람은 접속 가능 (페이지는 정상 렌더 — 404 아님)
 *   - 홈페이지 메뉴·검색엔진·사이트맵 어디에도 연결·노출되지 않음
 *     (헤더 GNB 링크 제거 / sitemap 미등재 / hreflang 미지정 / robots disallow / noindex)
 *
 * 2026-07-21 대표 지시: "주소는 있되 홈페이지나 이런 데에 연결되면 안 된다."
 *
 * 나중에 완전 공개(검색 노출·홈페이지 메뉴 연결)로 바꾸려면 이 값을 true 로 바꾸고,
 * 함께 되돌릴 곳:
 *   - src/components/Header.tsx   NAV_ITEMS 에 "협력병원" 항목 복원
 *   - src/app/sitemap.ts          hospitalEntries 복원
 *   - src/app/[lang]/layout.tsx   hospitals hreflang 복원
 *   - src/app/robots.ts           /hospital disallow 제거
 */
export const HOSPITAL_PORTAL_LISTED = false
