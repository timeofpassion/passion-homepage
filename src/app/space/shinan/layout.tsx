import type { Metadata } from "next";
import Link from "next/link";
import "../space.css";
import SpaceNav from "../_components/SpaceNav";
import { CONTACT } from "../_data/media";

export const metadata: Metadata = {
  title: {
    absolute: "신안 1호 | 열정의공간 (PASSION SPACE) — 전남 신안 리트릿 거점",
  },
  description:
    "열정의공간 리트릿 운동의 첫 번째 거점, 전남 신안. 천 개의 섬과 노을 사이에서 마케터·크리에이터·지성인이 쉬고 사유하고 콘텐츠를 만드는 순환형 리트릿.",
  alternates: { canonical: "https://www.timeofpassion.com/space/shinan" },
  openGraph: {
    title: "신안 1호 | 열정의공간 — 머무는 것이 곧 영감이 된다",
    description:
      "전남 신안, 천 개의 섬과 노을 사이의 리트릿 거점. 시그니처 리트릿 · 워크숍/살롱 · 자기주도 리트릿 · 기업 오프사이트.",
    url: "https://www.timeofpassion.com/space/shinan",
    siteName: "열정의공간",
    locale: "ko_KR",
    type: "website",
  },
};

export default function ShinanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="spc-root">
      {/* 에디토리얼 명조/라틴 라벨 폰트 (CDN) — 본문 Pretendard 는 루트 레이아웃에서 로드 */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Noto+Serif+KR:wght@200;300;400&display=swap"
      />

      <SpaceNav />

      {children}

      <footer className="spc-footer">
        <div className="spc-container">
          <div className="spc-footer__grid">
            <div>
              <div className="spc-footer__brand">
                열정의<b>공간</b> · 신안 1호
              </div>
              <p className="spc-footer__about">
                전남 신안의 섬에서, 머무는 것만으로 영감이 되는 리트릿. 열정의공간
                리트릿 운동의 첫 번째 거점입니다.
              </p>
              <div className="spc-footer__group">時 · 人 · 空</div>
            </div>

            <div className="spc-footer__col">
              <h4>둘러보기</h4>
              <a href="#story">이야기</a>
              <a href="#programs">프로그램</a>
              <a href="#stay">머무름</a>
              <a href="#journal">저널</a>
            </div>

            <div className="spc-footer__col">
              <h4>방문</h4>
              <p>{CONTACT.region}</p>
              <a href="#connect">방문 안내</a>
              <a href="#connect">예약 문의</a>
            </div>

            <div className="spc-footer__col">
              <h4>문의</h4>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                {CONTACT.instagramHandle}
              </a>
              <Link href="/space">← 열정의공간 (운동)</Link>
              <Link href="/">← PASSION GROUP</Link>
            </div>
          </div>

          <div className="spc-footer__bottom">
            <span>© 2026 열정의공간 (PASSION SPACE). ALL RIGHTS RESERVED.</span>
            <span>열정의 그룹 · 時 시간 · 人 사람 · 空 공간</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
