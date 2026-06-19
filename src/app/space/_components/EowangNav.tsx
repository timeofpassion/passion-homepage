"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT } from "../_data/media";

const MENU = [
  { label: "왜 어왕분교", href: "#why" },
  { label: "순천 풍경", href: "#landscape" },
  { label: "공간 계획", href: "#space" },
  { label: "추진 일정", href: "#plan" },
];

export default function EowangNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="psm-nav">
      <div className="psm-nav__nl">
        <Link href="/space" className="psm-nav__logo">
          PASSION<span className="o">SPACE</span>
        </Link>
      </div>

      <div className="psm-nav__menu">
        {MENU.map((m) => (
          <a key={m.href} href={m.href}>
            {m.label}
          </a>
        ))}
      </div>

      <div className="psm-nav__right">
        <span className="psm-nav__iss">No.01 — 순천</span>
        <a
          href={CONTACT.kakao}
          target="_blank"
          rel="noopener noreferrer"
          className="psm-nav__invite"
        >
          협력 문의
        </a>
        <button
          type="button"
          className="psm-burger"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`psm-nav__mobile ${open ? "is-open" : ""}`}>
        {MENU.map((m) => (
          <a key={m.href} href={m.href} onClick={() => setOpen(false)}>
            {m.label}
          </a>
        ))}
        <Link href="/space" onClick={() => setOpen(false)}>
          ← 열정의공간 (운동)
        </Link>
        <a
          href={CONTACT.kakao}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          style={{ color: "var(--spot)" }}
        >
          협력 문의
        </a>
      </div>
    </nav>
  );
}
