import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/og";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";

// 루트 그룹 템플릿("%s | PASSION GROUP")을 우회해 열정의시간 단일 브랜딩 유지.
// og:url 을 요청 주소(쿼리 포함)에 맞춰 동적 생성 → 카카오 캐시 ?v= 우회 갱신 지원.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const sp = await searchParams;
  return {
    title: {
      absolute: "열정의시간 | 병원 마케팅 & 해외환자 유치 전문 에이전시",
    },
    openGraph: buildOpenGraph(
      {
        title: "열정의시간 | 병원 마케팅 & 해외환자 유치 전문 에이전시",
        description:
          "10년 이상 노하우의 병원 마케팅 전문 에이전시. 국내 통합 마케팅부터 일본·중국·대만 해외환자 유치까지 원스톱으로. 하나의 계약으로 6개 팀이 동시에 움직입니다.",
        siteName: "열정의시간",
        locale: "ko_KR",
        type: "website",
        images: [
          {
            url: "/time/og-time-v2.jpg",
            width: 1200,
            height: 630,
            alt: "열정의시간 — 병원 마케팅 & 해외환자 유치 전문 에이전시",
          },
        ],
      },
      "/time",
      sp,
    ),
  };
}
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CompanyFacts from "@/components/CompanyFacts";
import Reveal from "@/components/Reveal";
import DirectAnswer from "@/components/DirectAnswer";
import FaqSection from "@/components/FaqSection";
import LastUpdated from "@/components/LastUpdated";
import ClientsSection from "@/components/ClientsSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Link from "next/link";
import { TimeBlogCarousel } from "@/components/TimeBlogCarousel";
import { loadPosts } from "@/lib/time-blog-source";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import KakaoFloat from "@/components/KakaoFloat";
// import Popup from "@/components/Popup"; // 팝업 내용 준비되면 주석 해제

// GEO FAQ — "정보형 질의" 인용 노림. 본문은 기존 사이트 사실만 사용(새 수치·시설 창작 금지).
const TIME_FAQ = [
  {
    q: "병원 마케팅 대행사는 어떤 기준으로 골라야 하나요?",
    a: "노출·조회수 같은 표면 지표가 아니라 ‘상담에서 실제 내원으로’ 이어지는 전환을 설계하는지, 국내와 해외(일본·중국·대만) 채널을 한 곳에서 통합 운영하는지, 채널·계정 소유권이 병원에 있는지를 봐야 합니다. 열정의시간은 10년 이상 이 구조를 현지 전담팀과 함께 직접 운영해 왔습니다.",
  },
  {
    q: "해외환자(외국인환자) 유치 마케팅은 어떻게 진행되나요?",
    a: "유치업 등록과 위탁계약을 기반으로 합법적으로 진행합니다. 중국은 샤오홍슈·더우인에서 위챗 상담으로, 일본은 인스타그램·X에서 라인 상담으로, 대만은 페이스북·인스타·유튜브에서 라인(번체) 상담으로 전환합니다. 현지어 전담팀이 발견→상담→내원→통역·사후관리까지 운영합니다.",
  },
  {
    q: "중국 환자 유치 마케팅은 어떻게 하나요?",
    a: "샤오홍슈·더우인·바이두에서 발견되게 만들고 위챗 1:1 상담으로 전환하는 구조입니다. 간체 화법과 현지 KOL(왕홍)을 활용하며, 의료광고법과 현지 플랫폼 규정을 지켜 운영합니다.",
  },
  {
    q: "국내 마케팅은 어떤 채널을 운영하나요?",
    a: "블로그 SEO, 숏폼·영상, 인스타그램·유튜브 SNS, 네이버 플레이스, 플랫폼(강남언니·바비톡 등), 카페 바이럴을 통합 운영합니다. 하나의 계약으로 여러 전담팀이 함께 움직입니다.",
  },
  {
    q: "비용은 어떻게 책정되나요?",
    a: "진료과·목표 시장·운영 범위에 따라 맞춤 견적으로 안내합니다. 무료 전략 상담에서 현재 마케팅 비용 누수 진단과 채널 우선순위부터 점검합니다.",
  },
];

export default async function Home() {
  const posts = (await loadPosts()).slice(0, 8);
  return (
    <>
      <BackgroundEffects />

      <main className="relative z-10">
        <Header />
        <HeroSection />
        <StatsSection />
        <Reveal>
          <DirectAnswer
            eyebrow="WHO WE ARE"
            question="열정의시간은 어떤 회사인가요?"
            answer="열정의시간은 국내·일본·중국·대만 마케팅을 한 곳에서 운영하는 병원·의료 전문 마케팅 에이전시입니다. 10년 이상 블로그·영상·SNS·플레이스 등 국내 통합 마케팅부터 일본·중국·대만 해외환자(외국인환자) 유치까지, 현지어 전담팀이 직접 운영합니다. 단순 노출·조회수가 아니라 상담에서 실제 내원으로 이어지는 전환 구조 자체를 설계하는 것이 핵심 차별점입니다."
          />
        </Reveal>
        <Reveal>
          <CompanyFacts />
        </Reveal>
        <Reveal>
          <ClientsSection medicalOnly />
        </Reveal>
        <Reveal>
          <ArchitectureSection />
        </Reveal>
        <Reveal>
          <ServicesSection />
        </Reveal>
        <Reveal>
          <PortfolioSection />
        </Reveal>
        <Reveal>
          <TestimonialsSection />
        </Reveal>
        {posts.length > 0 && (
          <Reveal as="section" style={{ padding: "5rem 0 2rem" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "#E7C46A",
                      fontSize: ".85rem",
                      fontWeight: 800,
                      letterSpacing: ".15em",
                    }}
                  >
                    MARKETING INSIGHTS
                  </span>
                  <h2
                    style={{
                      fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                      fontWeight: 900,
                      lineHeight: 1.2,
                      marginTop: ".5rem",
                    }}
                  >
                    마케팅 인사이트
                  </h2>
                </div>
                <Link
                  href="/time/blog"
                  style={{
                    color: "#E7C46A",
                    fontSize: ".85rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  전체 보기 →
                </Link>
              </div>
              <TimeBlogCarousel posts={posts} />
            </div>
          </Reveal>
        )}
        <Reveal>
          <FaqSection items={TIME_FAQ} />
        </Reveal>
        <LastUpdated date="2026.06.28" />
        <Reveal>
          <CTASection />
        </Reveal>
        <Footer />
      </main>

      {/* <Popup /> */}{/* 팝업 내용 준비되면 주석 해제 */}
      <FixedCTA />
      <KakaoFloat />

      {/* SEO: 검색엔진 크롤러용 숨김 텍스트 (시맨틱 콘텐츠) */}
      <div className="sr-only" aria-hidden="false">
        <h1>열정의시간 - 병원 마케팅 전문 에이전시</h1>
        <p>
          열정의시간은 10년 이상의 노하우를 가진 병원 마케팅 전문 에이전시입니다.
          국내 통합 마케팅(블로그 SEO, 영상 제작, SNS 운영, 네이버 플레이스, 바이럴 마케팅)부터
          해외환자 유치 마케팅(일본 마케팅, 중국 마케팅, 대만 마케팅)까지 원스톱으로 제공합니다.
        </p>
        <h2>국내 마케팅 서비스</h2>
        <p>
          병원 블로그 SEO, 숏츠 영상 제작, 유튜브 채널 운영, 인스타그램 관리,
          강남언니·바비톡·여신티켓 플랫폼 대행, 네이버 플레이스 최적화, 병원 광고 대행.
          마케팅 PM이 병원 인하우스 역할을 수행하며 의료광고 심의까지 대행합니다.
        </p>
        <h2>해외 마케팅 서비스</h2>
        <p>
          일본팀: 라인, 인스타그램, 틱톡 기반 현지화 콘텐츠 운영.
          중국팀: 샤오홍슈, 웨이보, 더우인, 왕홍 KOL 직접 섭외 및 운영.
          대만팀: 현지 파트너 네트워크 활용 마케팅.
          모든 채널과 계정은 클리닉 소유로 개설되어 에이전시 종속이 없습니다.
        </p>
        <h2>해외환자 유치 프로세스</h2>
        <p>
          해외환자 유치업 등록 기반 합법적 프로세스 운영, 통역, 픽업, 상담 스크립트,
          CS 매뉴얼 제공, 국가별 플랫폼 리뷰 관리. 초기 세팅 완료 후 3개월 내 첫 해외 환자 내원을 목표로 합니다.
        </p>
        <h2>병원 마케팅 에이전시 열정의시간에 문의하기</h2>
        <p>
          무료 전략 상담을 통해 현재 마케팅 비용 누수 진단, 채널 우선순위 분석,
          해외 진출 최적 루트 설계, 월 예산별 현실적 성과 예측을 받아보세요.
          카카오톡 채널: 열정의시간 (pf.kakao.com/_RgYcxj)
        </p>
      </div>
    </>
  );
}
