import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildOpenGraph } from "@/lib/og";

// og:url 을 요청 주소(쿼리 포함)에 맞춰 동적 생성 → 카카오 캐시 ?v= 우회 갱신 지원.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const sp = await searchParams;
  return {
    openGraph: buildOpenGraph(
      {
        title: "PASSION GROUP | 열정의시간 · 열정의사람들 · 열정의공간",
        description:
          "열정으로 시간·사람·공간을 잇습니다. 병의원 전문마케팅 열정의시간, 글로벌·인플루언서 마케팅 열정의사람들, 공간 비즈니스 열정의공간.",
        siteName: "PASSION GROUP",
        locale: "ko_KR",
        type: "website",
        images: [
          {
            url: "/og-passion.jpg",
            width: 1200,
            height: 630,
            alt: "PASSION GROUP — 열정의시간 · 열정의사람들 · 열정의공간",
          },
        ],
      },
      "/",
      sp,
    ),
  };
}

type Company = {
  num: string;
  name: string;
  en: string;
  desc: string;
  href: string;
  modifier: "time" | "people" | "space";
  soon?: boolean;
};

const COMPANIES: Company[] = [
  {
    num: "01 / 時間",
    name: "열정의시간",
    en: "TIME",
    desc: "국내·해외 병의원 전문마케팅",
    href: "/time",
    modifier: "time",
  },
  {
    num: "02 / 人間",
    name: "열정의사람들",
    en: "PEOPLE",
    desc: "글로벌마케팅·인플루언서 전문마케팅",
    href: "/people",
    modifier: "people",
  },
  {
    num: "03 / 空間",
    name: "열정의공간",
    en: "SPACE",
    desc: "새로운 공간비즈니스",
    href: "/space",
    modifier: "space",
  },
];

export default function GroupPortal() {
  return (
    <>
      <div className="group-portal">
        {/* 그룹 아이덴티티 패널 */}
        <div className="group-portal__panel group-portal__panel--brand">
          <div className="group-portal__inner">
            <Image
              src="/logo_passion.png"
              alt="PASSION GROUP"
              width={132}
              height={132}
              className="group-portal__logo"
              priority
            />
            <div className="group-portal__grouptitle">
              PASSION
              <br />
              GROUP
            </div>
            <p className="group-portal__grouptag">
              열정으로 시간 · 사람 · 공간을 잇다
            </p>
          </div>
        </div>

        {/* 3개 회사 패널 */}
        {COMPANIES.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={`group-portal__panel group-portal__panel--${c.modifier}`}
            aria-label={`${c.name} ${c.soon ? "준비중" : "바로가기"}`}
          >
            {c.soon && <span className="group-portal__badge">COMING SOON</span>}
            <div className="group-portal__inner">
              <span className="group-portal__num">{c.num}</span>
              <span className="group-portal__name">{c.name}</span>
              <span className="group-portal__en">{c.en}</span>
              <p className="group-portal__desc">{c.desc}</p>
              <span
                className={`group-portal__cta${
                  c.soon ? " group-portal__cta--soon" : ""
                }`}
              >
                {c.soon ? "준비중" : "홈페이지 바로가기"} →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* SEO: 그룹·회사 키워드 노출 (검색엔진 크롤러용) */}
      <div className="sr-only" aria-hidden="false">
        <h1>PASSION GROUP — 열정으로 시간·사람·공간을 잇다</h1>
        <p>
          PASSION GROUP(열정 그룹)은 열정의시간, 열정의사람들, 열정의공간 세 회사로 구성된 마케팅 전문 그룹입니다.
        </p>
        <h2>열정의시간</h2>
        <p>
          국내·해외 병의원 전문마케팅 기업. 13년 노하우로 국내 통합 마케팅부터 일본·중국·대만 해외환자 유치까지. 자세히 보기는 열정의시간 홈페이지(/time)에서 확인하세요.
        </p>
        <h2>열정의사람들</h2>
        <p>
          글로벌마케팅과 인플루언서 국내해외 전문마케팅 기업. 일본·중국·대만 현지 인플루언서 마케팅을 제공합니다. 자세히 보기는 열정의사람들 홈페이지(/people)에서 확인하세요.
        </p>
        <h2>열정의공간</h2>
        <p>
          사라져가는 지역에 사람을 모아 되살리는 리트릿 운동을 펼치는 새로운 공간비즈니스 기업. 자세히 보기는 열정의공간 홈페이지(/space)에서 확인하세요.
        </p>
      </div>
    </>
  );
}
