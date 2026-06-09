"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * GA4 멀티 속성 추적.
 * - 그룹 속성(GROUP_ID): 모든 페이지를 추적 → PASSION GROUP 전체 통합 분석
 * - 섹션 속성(SECTION_IDS): 해당 서브 사이트 경로만 추적 → 각 사이트 독립 분석
 *
 * 경로 첫 세그먼트(/time·/people·/space)로 분기한다.
 * App Router의 클라이언트 라우팅(페이지 새로고침 없는 이동)까지 추적하기 위해
 * usePathname 변화 시점에 page_view 이벤트를 수동 전송한다.
 */
const GROUP_ID = "G-ZKNXJBD012";
const SECTION_IDS: Record<string, string> = {
  time: "G-4HYT2HLJLJ",
  people: "G-MLY6P8H013",
  space: "G-TB8X9G3DQK",
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  // 이미 config 한 섹션 속성 추적(중복 config 방지). 그룹은 init 스크립트에서 config.
  const configured = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    const sendPageView = (id: string) => {
      window.gtag("event", "page_view", {
        send_to: id,
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    };

    // 그룹 속성 — 모든 페이지
    sendPageView(GROUP_ID);

    // 섹션 속성 — 현재 서브 사이트만
    const section = pathname.split("/")[1];
    const sectionId = SECTION_IDS[section];
    if (sectionId) {
      if (!configured.current.has(sectionId)) {
        window.gtag("config", sectionId, { send_page_view: false });
        configured.current.add(sectionId);
      }
      sendPageView(sectionId);
    }
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GROUP_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GROUP_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
