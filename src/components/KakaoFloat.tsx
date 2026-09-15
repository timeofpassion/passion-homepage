"use client";

import { useEffect, useState } from "react";

// 오른쪽 플로팅 메뉴(위→아래): 카카오톡 · 회사 소개서(마우스 올리면 권역별 제안서) · 네이버 블로그 · 스레드 · 유튜브
const KAKAO_URL = "http://pf.kakao.com/_RgYcxj/chat";
const BLOG_URL = "https://blog.naver.com/mimichelin";
const THREADS_URL = "https://www.threads.com/@marketing__passion";
const YOUTUBE_URL = "https://www.youtube.com/channel/UCSqL7cb4P5LJ8a28jqAWKlA";

// 링크 교체는 이 배열만 고치면 된다.
const PROPOSALS = [
  { label: "국내 마케팅", href: "https://docs.google.com/presentation/d/17fAOTFOwVV91fOpLUcWycyWzV6GFCpvfjwQGYgNYiZY/edit" },
  { label: "중국 마케팅", href: "https://docs.google.com/presentation/d/1clu7n3Ag0l6GrWlFzKF1bN-0kzXP63ws-22-jlTTcyA/edit" },
  { label: "대만 마케팅", href: "https://docs.google.com/presentation/d/15kiF0BlcWDyevXr_PZ6YuElaF2CsQOWPXgREksaZqIg/edit" },
  { label: "일본 마케팅", href: "https://docs.google.com/presentation/d/1IYYSmlSdHhbhDPvl_8RH8OthDxWQHKPhbjmEHjpQwJo/edit" },
];

type Post = { title: string; link: string; date: string };

const CSS = `
  .pf-float{position:fixed;right:24px;bottom:24px;z-index:100;display:flex;flex-direction:column;gap:10px;align-items:flex-end}
  .pf-item{position:relative;display:flex;justify-content:flex-end}
  .pf-btn{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(0,0,0,.3);transition:transform .2s;cursor:pointer;text-decoration:none;border:none;padding:0}
  .pf-btn:hover,.pf-btn:focus-visible{transform:scale(1.08)}
  .pf-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
  .pf-tip{position:absolute;right:62px;top:50%;transform:translateY(-50%);white-space:nowrap;background:rgba(15,23,42,.92);color:#fff;font-size:12px;font-weight:700;padding:6px 10px;border-radius:6px;opacity:0;pointer-events:none;transition:opacity .15s}
  .pf-item:hover .pf-tip,.pf-item:focus-within .pf-tip{opacity:1}
  .pf-pop{position:absolute;right:52px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:6px;padding-right:10px;opacity:0;visibility:hidden;transition:opacity .15s}
  .pf-deck:hover .pf-pop,.pf-deck:focus-within .pf-pop,.pf-deck.is-open .pf-pop{opacity:1;visibility:visible}
  .pf-deck:hover .pf-tip,.pf-deck:focus-within .pf-tip,.pf-deck.is-open .pf-tip{opacity:0}
  .pf-pop a{display:block;padding:9px 16px;border-radius:8px;background:#fff;color:#0f172a;font-size:13px;font-weight:800;text-decoration:none;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,.35)}
  .pf-pop a:hover{background:#E63329;color:#fff}
  .pf-blog{position:absolute;right:62px;bottom:0;width:280px;background:#fff;color:#0f172a;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.4);overflow:hidden}
  @media (max-width:600px){.pf-float{right:14px;bottom:14px;gap:8px}.pf-btn{width:46px;height:46px}.pf-tip{display:none}}
`;

export default function KakaoFloat() {
  const [deckOpen, setDeckOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (!blogOpen || posts) return;
    fetch("/api/naver-blog")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => setPosts([]));
  }, [blogOpen, posts]);

  return (
    <nav className="pf-float" aria-label="빠른 메뉴">
      <style>{CSS}</style>

      {/* 1. 카카오톡 채널 */}
      <div className="pf-item">
        <span className="pf-tip">카카오톡 상담</span>
        <a className="pf-btn" href={KAKAO_URL} target="_blank" rel="noopener noreferrer" aria-label="카카오톡 채널 상담" style={{ background: "#FEE500" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#3C1E1E" aria-hidden="true">
            <path d="M12 3c-5.523 0-10 3.538-10 7.9 0 2.85 1.848 5.347 4.636 6.74l-1.185 4.316c-.056.205.18.366.353.243l5.06-3.327c.373.048.755.074 1.146.074 5.523 0 10-3.538 10-7.9S17.523 3 12 3z" />
          </svg>
        </a>
      </div>

      {/* 3. 회사 소개서 — 마우스를 올리면 권역별 제안서 4개 */}
      <div className={`pf-item pf-deck${deckOpen ? " is-open" : ""}`} onMouseLeave={() => setDeckOpen(false)}>
        <span className="pf-tip">회사 소개서</span>
        <div className="pf-pop" id="deck-list">
          {PROPOSALS.map((p) => (
            <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer">
              {p.label} ↗
            </a>
          ))}
        </div>
        <button
          type="button"
          className="pf-btn"
          aria-label="회사 소개서 보기"
          aria-expanded={deckOpen}
          aria-controls="deck-list"
          onClick={() => setDeckOpen((v) => !v)}
          style={{ background: "#fff", padding: 4 }}
        >
          <img src="/logo_passion.png" alt="" style={{ width: 38, height: 38, objectFit: "contain", borderRadius: "50%" }} />
        </button>
      </div>

      {/* 4. 네이버 블로그 — 누르면 최신 글 */}
      <div className="pf-item">
        {!blogOpen && <span className="pf-tip">네이버 블로그</span>}
        {blogOpen && (
          <div className="pf-blog" id="blog-list">
            <div style={{ padding: "12px 14px", borderBottom: "1px solid #eee", fontSize: 13, fontWeight: 800, display: "flex", justifyContent: "space-between" }}>
              열정의시간 블로그 <span style={{ color: "#03C75A" }}>최신 글</span>
            </div>
            {posts === null ? (
              <p style={{ padding: 14, fontSize: 12, color: "#64748b" }}>불러오는 중…</p>
            ) : (
              posts.map((p) => (
                <a key={p.link} href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "11px 14px", borderBottom: "1px solid #f1f1f1", textDecoration: "none", color: "#0f172a" }}>
                  <span style={{ display: "block", fontSize: 13, fontWeight: 700, lineHeight: 1.45 }}>{p.title}</span>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>{p.date}</span>
                </a>
              ))
            )}
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "11px 14px", fontSize: 12, fontWeight: 800, color: "#03C75A", textDecoration: "none", textAlign: "center" }}>
              블로그 전체 보기 ↗
            </a>
          </div>
        )}
        <button
          type="button"
          className="pf-btn"
          aria-label="네이버 블로그 최신 글 보기"
          aria-expanded={blogOpen}
          aria-controls="blog-list"
          onClick={() => setBlogOpen((v) => !v)}
          style={{ background: "#03C75A", color: "#fff", fontWeight: 900, fontSize: 21, fontFamily: "Arial, sans-serif" }}
        >
          N
        </button>
      </div>

      {/* 5. 스레드 */}
      <div className="pf-item">
        <span className="pf-tip">스레드</span>
        <a className="pf-btn" href={THREADS_URL} target="_blank" rel="noopener noreferrer" aria-label="스레드" style={{ background: "#000", border: "1px solid rgba(255,255,255,.25)" }}>
          <svg width="24" height="24" viewBox="0 0 192 192" fill="#fff" aria-hidden="true">
            <path d="M141.5 88.9c-.8-.4-1.7-.8-2.5-1.2-1.5-27.2-16.4-42.8-41.3-43h-.3c-14.9 0-27.3 6.4-35 18l13.7 9.4c5.7-8.7 14.7-10.5 21.3-10.5h.2c8.2.1 14.4 2.4 18.4 7.1 2.9 3.4 4.9 8.1 5.9 14-7.3-1.2-15.2-1.6-23.6-1.1-23.8 1.4-39.1 15.2-38.1 34.4.5 9.7 5.4 18.1 13.7 23.6 7 4.6 16.1 6.9 25.5 6.4 12.4-.7 22.2-5.4 29-14.1 5.2-6.6 8.5-15.2 9.9-26 5.9 3.6 10.3 8.3 12.7 13.9 4.1 9.6 4.4 25.3-8.5 38.2-11.3 11.3-24.8 16.2-45.3 16.3-22.7-.2-39.9-7.5-51.1-21.7C35.5 139.2 30.1 119.5 29.9 96c.2-23.5 5.6-43.2 16.1-58.6 11.2-14.2 28.4-21.5 51.1-21.7 22.9.2 40.3 7.5 51.9 21.8 5.7 7 9.9 15.8 12.8 26.1l16.1-4.3c-3.4-12.7-8.9-23.6-16.4-32.8C146.3 8.7 124.3.2 96 0h-.1C67.7.2 46 8.7 31.4 25.3 18.5 40 11.9 60.5 11.7 96v.1c.2 25.6 6.8 46.1 19.7 60.8C46 173.5 67.7 182 95.9 182.2h.1c25-.2 42.7-6.7 57.3-21.3 19.1-19.1 18.5-43 12.2-57.7-4.5-10.5-13.1-19-24-24.3zM98.4 139.4c-10.4.6-21.3-4.1-21.8-14.1-.4-7.5 5.3-15.8 22.5-16.8 2-.1 3.9-.2 5.8-.2 6.2 0 12 .6 17.3 1.8-2 24.6-13.6 28.7-23.8 29.3z" />
          </svg>
        </a>
      </div>

      {/* 6. 유튜브 */}
      <div className="pf-item">
        <span className="pf-tip">유튜브</span>
        <a className="pf-btn" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="유튜브" style={{ background: "#FF0000" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
