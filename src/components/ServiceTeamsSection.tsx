'use client';

import Link from "next/link";
import { servicesData } from "@/data/services";

export default function ServiceTeamsSection() {
  return (
    <section id="service-teams" style={{ position: "relative", zIndex: 20, padding: "6rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6%" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            className="font-mono-sys"
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "#E7C46A",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <span style={{ width: 32, height: 1, background: "rgba(231,196,106,0.5)" }} />
            세부 서비스 영역
            <span style={{ width: 32, height: 1, background: "rgba(231,196,106,0.5)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.2 }}>
            6개 팀, 각자의 전문 영역
          </h2>
        </div>

        {/* Team grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {servicesData.map((team) => (
            <Link key={team.id} href={`/time/services/${team.id}`} style={{ textDecoration: "none" }}>
              <div
                className="glass-card"
                style={{
                  padding: "2rem",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(231,196,106,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <div className="tech-border" style={{ position: "absolute", inset: 0 }} />
                <span
                  className="font-mono-sys"
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: 20,
                  }}
                >
                  {team.sysId}
                </span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 12 }}>
                  {team.title}
                </h3>
                <div
                  style={{
                    width: 40,
                    height: 1,
                    background: "rgba(255,255,255,0.2)",
                    marginBottom: 12,
                  }}
                />
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    fontSize: "0.9rem",
                  }}
                >
                  {team.shortDesc}
                </p>
                <div
                  style={{
                    marginTop: "1.5rem",
                    color: "#E7C46A",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    opacity: 0.8,
                  }}
                >
                  자세히 보기 →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
