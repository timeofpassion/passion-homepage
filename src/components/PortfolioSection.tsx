import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

// /time 메인 진입 섹션: 헤더 + 포트폴리오 갤러리(권역 탭).
// /time/portfolio 전용 페이지와 동일한 갤러리(PortfolioGallery)를 그대로 사용해 스키마를 통일했다.
export default function PortfolioSection() {
  return (
    <section id="portfolio" style={{ position: "relative", zIndex: 20, padding: "7rem 0 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
        {/* 헤더 */}
        <div style={{ textAlign: "center" }}>
          <p
            className="font-mono-sys"
            style={{ color: "#cc0000", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 14 }}
          >
            PORTFOLIO
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, marginBottom: 14 }}>
            열정의시간이 만든 <span style={{ color: "#cc0000" }}>결과물</span>
          </h2>
          <p style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", color: "rgba(255,255,255,0.55)" }}>
            홈페이지 · 영상 · SNS 콘텐츠 · 해외 현지화까지. 기획부터 제작·운영까지 직접 만든 작업을 확인하세요.
          </p>
        </div>
      </div>

      <PortfolioGallery />
    </section>
  );
}
