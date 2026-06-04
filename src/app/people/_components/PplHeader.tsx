"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 열정의시간 카카오톡 채널 상담(채팅) — 전사 공용 채널
const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";

const NAV = [
  { label: "메인", href: "/people" },
  { label: "인플루언서", href: "/people/influencers" },
  { label: "서비스", href: "/people#service" },
  { label: "사례", href: "/people#portfolio" },
];

export default function PplHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="ppl-header">
      <div className="ppl-container ppl-header__inner">
        <Link href="/people" className="ppl-header__brand">
          열정의<b>사람들</b>
        </Link>

        <nav className="ppl-header__nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ppl-btn ppl-btn--red"
            style={{ padding: "10px 20px", fontSize: 14 }}
          >
            상담
          </a>
        </nav>

        <button
          type="button"
          className="ppl-header__burger"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`ppl-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="ppl-drawer__top">
          <Link
            href="/people"
            className="ppl-header__brand"
            onClick={() => setOpen(false)}
          >
            열정의<b>사람들</b>
          </Link>
          <button
            type="button"
            className="ppl-drawer__close"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="ppl-drawer__nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{ color: "var(--ppl-red)" }}
          >
            상담 신청
          </a>
        </nav>
      </div>
    </header>
  );
}
