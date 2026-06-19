import type { Metadata } from "next";
import Link from "next/link";
import "./people.css";
import PplHeader from "./_components/PplHeader";

// 열정의시간 카카오톡 채널 상담(채팅) — 전사 공용 채널
const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";

export const metadata: Metadata = {
  description:
    "열정의사람들 — 일본·중국·대만 현지 인플루언서로 진출하는 글로벌 마케팅 전문 기업. 병원·기업·기관의 동아시아 시장 진출을 인플루언서 마케팅으로 실행합니다.",
  alternates: { canonical: "https://www.timeofpassion.com/people" },
  openGraph: {
    title: "열정의사람들 | 글로벌 인플루언서 마케팅",
    description:
      "일본·중국·대만, 현지 인플루언서로 진출하다. 동아시아 시장 진출 인플루언서 마케팅 전문 기업.",
    url: "https://www.timeofpassion.com/people",
    siteName: "열정의사람들",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/people/og-people.jpg",
        width: 1200,
        height: 630,
        alt: "열정의사람들 — 글로벌 인플루언서 마케팅",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "열정의사람들 | 글로벌 인플루언서 마케팅",
    description:
      "일본·중국·대만, 현지 인플루언서로 진출하다. 동아시아 시장 진출 인플루언서 마케팅 전문.",
    images: ["/people/og-people.jpg"],
  },
};

export default function PeopleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="ppl-root">
      <PplHeader />

      {children}

      <footer className="ppl-footer">
        <div className="ppl-container ppl-footer__grid">
          <div>
            <div className="ppl-footer__brand">
              열정의<b>사람들</b>
            </div>
            <p>
              일본·중국·대만 현지 인플루언서로 진출하는
              <br />
              글로벌 마케팅 전문 기업
            </p>
          </div>

          <div className="ppl-footer__col">
            <h4>Company</h4>
            <p>상호: 열정의사람들</p>
            <p>대표: 한동남</p>
            <p>사업자번호: 미정</p>
            <p>주소: 미정</p>
          </div>

          <div className="ppl-footer__col">
            <h4>Contact</h4>
            <p>
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ppl-footer__kakao"
              >
                💬 카카오톡 채널 상담
              </a>
              <br />
              <Link href="/">← PASSION GROUP</Link>
            </p>
          </div>
        </div>
        <div className="ppl-container ppl-footer__bottom">
          © 2026 열정의사람들. ALL RIGHTS RESERVED.
        </div>
      </footer>

      <a
        href={KAKAO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ppl-kakao"
        aria-label="카카오톡 상담"
      >
        💬 카톡 상담
      </a>
    </div>
  );
}
