/**
 * 자가검수 페이지가 밖으로 내보내는 링크 한 자리 모음.
 *
 * 예약(Cal.com)과 전체판 판매(탈잉) 주소는 아직 없다 —
 * Cal.com 계정은 대표가 만들어야 하고, 탈잉 클래스는 심사 중이다.
 * 그래서 값이 있을 때만 버튼이 뜨도록 하고, 없으면 조용히 빠진다.
 * 주소가 나오면 Vercel 환경변수만 채우면 되고 코드는 안 건드린다.
 */

export const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";

/** 30분 무료 상담 예약 (Cal.com 등). 예: https://cal.com/timeofpassion/30min */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "";

/** 전체판 50쪽 판매 페이지 (탈잉 클래스 URL).
 *  공개 판매 링크라 기본값을 코드에 박는다 — 환경변수가 비어 있던 동안 판매 링크가
 *  화면에서 통째로 사라져 있었고, 그걸 아무도 몰랐다. */
export const TALING_URL =
  process.env.NEXT_PUBLIC_TALING_URL?.trim() || "https://www.taling.me/talent/63547";
