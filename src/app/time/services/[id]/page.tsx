'use client';

import Link from "next/link";
import { getServiceById } from "@/data/services";

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = getServiceById(params.id);

  if (!service) {
    return (
      <main className="min-h-screen bg-[#0a0000] flex items-center justify-center">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1rem" }}>
            서비스를 찾을 수 없습니다
          </h1>
          <Link href="/" style={{ color: "#FFD700", textDecoration: "underline" }}>
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0000]" style={{ paddingTop: "2rem" }}>
      {/* Navigation */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%", marginBottom: "3rem" }}>
        <Link href="/time#architecture" style={{ color: "#FFD700", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          ← 팀 소개로 돌아가기
        </Link>
      </div>

      {/* Hero Section */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%", marginBottom: "6rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ color: "#FFD700", fontSize: "0.85rem", letterSpacing: "0.15em", fontWeight: 700, display: "block", marginBottom: "0.5rem" }}>
            {service.sysId}
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.2 }}>
            {service.title}
          </h1>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)", color: "rgba(255,255,255,0.8)", maxWidth: 700, lineHeight: 1.6, fontWeight: 300 }}>
            {service.fullDesc}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%", marginBottom: "6rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
            제공 서비스
          </h2>
          <div style={{ width: 40, height: 2, background: "#cc0000", borderRadius: 1 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
          {service.services.map((svc) => (
            <div key={svc.name} style={{
              padding: "2rem",
              background: "rgba(255, 215, 0, 0.03)",
              border: "1px solid rgba(255, 215, 0, 0.15)",
              borderRadius: "8px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 215, 0, 0.08)";
              e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 215, 0, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.15)";
            }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#FFD700" }}>
                {svc.name}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Section */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%", marginBottom: "6rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
            포트폴리오
          </h2>
          <div style={{ width: 40, height: 2, background: "#cc0000", borderRadius: 1 }} />
        </div>

        {service.portfolio.length === 0 ? (
          <div style={{
            padding: "4rem 2rem",
            textAlign: "center",
            background: "rgba(255, 215, 0, 0.03)",
            border: "2px dashed rgba(255, 215, 0, 0.2)",
            borderRadius: "8px"
          }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "1rem" }}>
              포트폴리오는 차례대로 추가될 예정입니다.
            </p>
            <p style={{ color: "rgba(255,215,0,0.6)", fontSize: "0.9rem", fontWeight: 600 }}>
              문의하기: ceo@timeofpassion.com
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            {service.portfolio.map((item, idx) => (
              <div key={idx} style={{
                background: "rgba(255,255,255,0.02)",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(255,215,0,0.1)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,215,0,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,215,0,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
                <div style={{ paddingBottom: "66%", position: "relative", background: "rgba(0,0,0,0.8)" }}>
                  {item.image && (
                    <img src={item.image} alt={item.title} style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }} />
                  )}
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#fff" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 6%", marginBottom: "4rem", textAlign: "center", background: "rgba(204, 0, 0, 0.08)", borderRadius: "8px", border: "1px solid rgba(204, 0, 0, 0.2)" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>
          {service.title}에 대해 더 알고 싶으신가요?
        </h3>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem", fontSize: "1rem" }}>
          무료 전략 상담으로 귀사의 마케팅 전략을 함께 설계해보세요.
        </p>
        <a href="https://pf.kakao.com/_RgYcxj/chat" target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block",
          padding: "0.8rem 2rem",
          background: "#FFD700",
          color: "#0a0000",
          fontWeight: 700,
          borderRadius: "4px",
          textDecoration: "none",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}>
          카카오톡 문의하기
        </a>
      </div>
    </main>
  );
}
