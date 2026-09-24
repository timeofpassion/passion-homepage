"use client";

import { useState } from "react";
import {
  portfolioGroups,
  itemsInGroup,
  itemsInFolder,
  foldersInGroup,
  type PortfolioGroupKey,
  type PortfolioItem,
} from "@/data/portfolio";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import Lightbox from "@/components/portfolio/Lightbox";

// 포트폴리오 갤러리 — 눌러서 들어간다(대표 정의 2026-09-16).
//   1단계: 큰 분류 7개 = 인트라넷 상품 DB 마케팅 유형 (data/portfolio.ts)
//   2단계: 그 분류 안의 「폴더」 = 상품 (국내는 패키지 구성 항목)
//   3단계: 폴더 안의 작업. 폴더가 하나뿐인 분류는 2단계를 건너뛴다.
// 수백 장을 한 화면에 쭉 깔지 않는다. 분류 정의는 data/portfolio.ts 가 단일 소스.
const PAGE = 24;

export default function PortfolioGallery({
  initialGroup = "domestic",
  initialType = null,
}: {
  initialGroup?: PortfolioGroupKey;
  initialType?: string | null;
} = {}) {
  const [group, setGroup] = useState<PortfolioGroupKey>(initialGroup);
  const [type, setType] = useState<string | null>(initialType);
  const [shown, setShown] = useState(PAGE);
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);

  const folders = foldersInGroup(group);
  const openable = folders.filter((t) => t.ready);
  // 열 수 있는 폴더가 하나뿐이면 굳이 한 번 더 누르게 하지 않는다(홈페이지처럼).
  // 단 옆에 「준비중」 칸이 서 있으면 그것도 보여줘야 하므로 건너뛰지 않는다.
  const single = openable.length === 1 && folders.length === 1 ? openable[0] : null;
  const opened = single ?? (type ? openable.find((t) => t.key === type) ?? null : null);
  const items = opened ? itemsInFolder(group, opened.key) : [];

  const openGroup = (key: PortfolioGroupKey) => {
    setGroup(key);
    setType(null);
    setShown(PAGE);
  };
  const openType = (key: string) => {
    setType(key);
    setShown(PAGE);
  };

  return (
    <section style={{ position: "relative", zIndex: 20, padding: "2.5rem 0 7rem" }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 6%" }}>
        {/* 1단계: 큰 분류 */}
        <div className="pg-tabs">
          {portfolioGroups.map((g) => {
            const on = g.key === group;
            return (
              <button key={g.key} type="button" onClick={() => openGroup(g.key)} className={`pg-tab${on ? " on" : ""}`}>
                {g.label}
                <span className="pg-tab-n">{itemsInGroup(g.key).length}</span>
              </button>
            );
          })}
        </div>

        {!opened ? (
          <>
            <p className="pg-lead">{portfolioGroups.find((g) => g.key === group)?.desc}</p>

            {/* 2단계: 폴더 */}
            {folders.length > 0 ? (
              <div className="pg-folders">
                {folders.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    className={`pg-folder${t.ready ? "" : " soon"}`}
                    disabled={!t.ready}
                    aria-disabled={!t.ready}
                    onClick={t.ready ? () => openType(t.key) : undefined}
                  >
                    <span className="pg-folder-thumb">
                      {t.ready && t.cover ? (
                        <img src={t.cover} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <span className="pg-folder-blank" />
                      )}
                    </span>
                    <span className="pg-folder-body">
                      <strong className="pg-folder-name">{t.label}</strong>
                      <span className="pg-folder-go">{t.ready ? `${t.count}건 보기 →` : "준비중"}</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="pg-empty">곧 준비됩니다.</p>
            )}
          </>
        ) : (
          <>
            {/* 3단계: 유형 안의 작업 */}
            <div className="pg-crumb">
              {!single && (
                <button type="button" onClick={() => { setType(null); setShown(PAGE); }} className="pg-back">
                  ← {portfolioGroups.find((g) => g.key === group)?.label}
                </button>
              )}
              <h2 className="pg-title">
                {opened.label}
                <span className="pg-title-n">{opened.count}건</span>
              </h2>
            </div>

            <div className="pg-grid">
              {items.slice(0, shown).map((it) => (
                <PortfolioCard key={it.id} item={it} onOpen={setLightbox} />
              ))}
            </div>

            {items.length > shown && (
              <div className="pg-more-wrap">
                <button type="button" className="pg-more" onClick={() => setShown((n) => n + PAGE)}>
                  더 보기 <span className="pg-more-n">{items.length - shown}건 남음</span>
                </button>
              </div>
            )}
          </>
        )}

        <p className="pg-note">포트폴리오는 지속적으로 업데이트 중입니다.</p>
      </div>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}

const CSS = `
  .pg-tabs{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:1.6rem}
  .pg-tab{padding:11px 22px;border-radius:999px;font-size:.95rem;font-weight:700;cursor:pointer;
    background:rgba(255,255,255,.04);color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.12);transition:all .2s}
  .pg-tab:hover{color:#fff;border-color:rgba(255,255,255,.3)}
  .pg-tab.on{background:#E63329;color:#fff;border-color:#E63329}
  .pg-tab-n{margin-left:7px;font-size:.75rem;opacity:.7}

  .pg-lead{text-align:center;color:rgba(255,255,255,.5);font-size:.92rem;margin:0 0 2.6rem;word-break:keep-all}

  .pg-folders{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
  @media (max-width:900px){.pg-folders{grid-template-columns:repeat(2,1fr)}}
  @media (max-width:560px){.pg-folders{grid-template-columns:1fr}}
  .pg-folder{display:block;width:100%;text-align:left;padding:0;cursor:pointer;background:#0a0a0a;
    border:1px solid rgba(255,255,255,.12);color:#fff;transition:transform .2s,border-color .2s}
  .pg-folder:hover{transform:translateY(-3px);border-color:rgba(230,51,41,.6)}
  .pg-folder-thumb{display:block;aspect-ratio:16/10;overflow:hidden;background:#111;position:relative}
  .pg-folder-thumb img{width:100%;height:100%;object-fit:contain;opacity:.62;transition:opacity .25s}
  .pg-folder:hover .pg-folder-thumb img{opacity:.8}
  .pg-folder-blank{display:block;height:100%;background:linear-gradient(140deg,rgba(230,51,41,.35),#0a0a0a)}
  .pg-folder-body{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:1.1rem 1.2rem 1.2rem}
  .pg-folder-name{font-size:1.05rem;font-weight:800;letter-spacing:-.02em;word-break:keep-all}
  .pg-folder-go{font-size:.82rem;font-weight:700;color:#E7C46A;white-space:nowrap}

  /* 준비중 칸 — 이름만 세워두고 누를 수 없게 한다 */
  .pg-folder.soon{cursor:default;opacity:.5}
  .pg-folder.soon:hover{transform:none;border-color:rgba(255,255,255,.1)}
  .pg-folder.soon .pg-folder-blank{background:linear-gradient(140deg,rgba(255,255,255,.08),#0a0a0a)}
  .pg-folder.soon .pg-folder-go{color:rgba(255,255,255,.45)}

  .pg-crumb{margin-bottom:2rem}
  .pg-back{background:none;border:0;padding:0;cursor:pointer;color:rgba(255,255,255,.55);font-size:.88rem;font-weight:700}
  .pg-back:hover{color:#fff}
  .pg-title{font-size:clamp(1.4rem,3vw,2rem);font-weight:900;letter-spacing:-.02em;margin:10px 0 0}
  .pg-title-n{margin-left:10px;font-size:.85rem;font-weight:700;color:rgba(255,255,255,.45)}

  .pg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.4rem}
  .pg-more-wrap{display:flex;justify-content:center;margin-top:2.6rem}
  .pg-more{padding:14px 30px;background:transparent;border:1px solid rgba(255,255,255,.25);color:#fff;
    font-weight:800;font-size:.95rem;cursor:pointer;transition:all .2s}
  .pg-more:hover{border-color:#E63329;background:rgba(230,51,41,.1)}
  .pg-more-n{margin-left:8px;font-size:.8rem;font-weight:600;color:rgba(255,255,255,.5)}

  .pg-empty{text-align:center;color:rgba(255,255,255,.4);padding:4rem 0}
  .pg-note{text-align:center;color:rgba(255,255,255,.4);margin-top:3.5rem;font-size:.9rem}
`;
