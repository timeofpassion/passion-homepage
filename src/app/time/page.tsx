import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/og";
import BackgroundEffects from "@/components/BackgroundEffects";
import SystemLabels from "@/components/SystemLabels";
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
          "13년 노하우의 병원 마케팅 전문 에이전시. 국내 통합 마케팅부터 일본·중국·대만 해외환자 유치까지 원스톱으로. 하나의 계약으로 6개 팀이 동시에 움직입니다.",
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
import ClientsSection from "@/components/ClientsSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ServicesSection from "@/components/ServicesSection";
import ServiceTeamsSection from "@/components/ServiceTeamsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import KakaoFloat from "@/components/KakaoFloat";
// import Popup from "@/components/Popup"; // 팝업 내용 준비되면 주석 해제

export default function Home() {
  return (
    <>
      <BackgroundEffects />
      <SystemLabels />

      <main className="relative z-10">
        <Header />
        <HeroSection />
        <ClientsSection medicalOnly />
        <ArchitectureSection />
        <ServicesSection />
        <ServiceTeamsSection />
        <TestimonialsSection />
        <BlogSection />
        <CTASection />
        <Footer />
      </main>

      {/* <Popup /> */}{/* 팝업 내용 준비되면 주석 해제 */}
      <FixedCTA />
      <KakaoFloat />

      {/* SEO: 검색엔진 크롤러용 숨김 텍스트 (시맨틱 콘텐츠) */}
      <div className="sr-only" aria-hidden="false">
        <h1>열정의시간 - 병원 마케팅 전문 에이전시</h1>
        <p>
          열정의시간은 13년의 노하우를 가진 병원 마케팅 전문 에이전시입니다.
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
          카카오톡 채널: @timfofpassion
        </p>
      </div>
    </>
  );
}
