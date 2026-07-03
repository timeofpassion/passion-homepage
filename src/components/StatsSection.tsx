"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
}

// 사이트 기존 사실 기반 수치만 사용(새 수치 창작 금지).
const STATS: Stat[] = [
  { value: 10, suffix: "년+", label: "병원 마케팅 노하우" },
  { value: 6, suffix: "개 팀", label: "한 지붕 아래 전문팀" },
  { value: 4, suffix: "개국", label: "국내·일본·중국·대만" },
  { value: 2.4, decimals: 1, suffix: "배", label: "상담 전환율 개선" },
];

function format(n: number, decimals = 0) {
  return n.toLocaleString("ko-KR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatCard({ stat, run }: { stat: Stat; run: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!run) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(stat.value);
      return;
    }
    const duration = 1400;
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(stat.value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(stat.value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, stat.value]);

  return (
    <div className="stat-card">
      <span className="stat-card__bar" aria-hidden="true" />
      <div className="stat-value font-mono-sys">
        {stat.prefix}
        {format(display, stat.decimals)}
        <span className="stat-unit">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRun(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ position: "relative", zIndex: 20, padding: "1rem 0 5rem" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 6%" }}>
        <div
          className="font-mono-sys"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            fontSize: 12,
            letterSpacing: "0.22em",
            color: "#E7C46A",
            marginBottom: "2.2rem",
          }}
        >
          <span style={{ width: 28, height: 1, background: "rgba(231,196,106,0.5)" }} />
          BY THE NUMBERS
          <span style={{ width: 28, height: 1, background: "rgba(231,196,106,0.5)" }} />
        </div>

        <div ref={ref} className="stats-grid">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
