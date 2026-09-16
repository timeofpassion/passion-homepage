"use client";

import { useState } from "react";
import Link from "next/link";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import type { PreviewGroup } from "@/data/portfolio";

// /time 메인의 「분야별 포트폴리오」 — 분야를 탭으로 먼저 보여준다.
// 여섯 묶음을 세로로 쌓으면 스크롤하기 전엔 나뉜 게 안 보여서 탭으로 바꿨다(대표 2026-09-16).
// 항목 데이터는 서버에서 골라 넘긴다(전체 462건을 브라우저로 보내지 않기 위해).
export default function PortfolioPreviewTabs({ groups }: { groups: PreviewGroup[] }) {
  const [key, setKey] = useState(groups[0]?.key);
  const active = groups.find((g) => g.key === key) ?? groups[0];
  if (!active) return null;

  return (
    <>
      <style>{CSS}</style>

      <div className="pv-tabs">
        {groups.map((g) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setKey(g.key)}
            className={`pv-tab${g.key === active.key ? " on" : ""}`}
          >
            {g.label}
            <span className="pv-tab-n">{g.total}</span>
          </button>
        ))}
      </div>

      <div className="pv-head">
        <p className="pv-desc">{active.desc}</p>
        <Link href={`/time/portfolio?group=${active.key}`} className="pv-more">
          {active.label} 전체 보기 →
        </Link>
      </div>

      <div className="pv-grid">
        {active.items.map((it) => (
          <PortfolioCard key={it.id} item={it} />
        ))}
      </div>
    </>
  );
}

const CSS = `
  .pv-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 1.6rem}
  .pv-tab{padding:10px 18px;border-radius:999px;font-size:.9rem;font-weight:700;cursor:pointer;
    background:rgba(255,255,255,.04);color:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.12);transition:all .2s}
  .pv-tab:hover{color:#fff;border-color:rgba(255,255,255,.3)}
  .pv-tab.on{background:#E63329;color:#fff;border-color:#E63329}
  .pv-tab-n{margin-left:7px;font-size:.74rem;opacity:.7}

  .pv-head{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:1.2rem}
  .pv-desc{margin:0;font-size:.9rem;color:rgba(255,255,255,.55);word-break:keep-all}
  .pv-more{color:#E7C46A;font-size:.85rem;font-weight:700;text-decoration:none;white-space:nowrap}
  .pv-more:hover{text-decoration:underline}

  .pv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:1rem}
`;
