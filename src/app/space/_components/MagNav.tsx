"use client";

import { useState } from "react";

const MENU = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Model", href: "#how" },
  { label: "Network", href: "#network" },
  { label: "People", href: "#who" },
];

const INVITE = "mailto:hello@passionspace.kr?subject=[열정의공간] 초대 신청";

export default function MagNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="psm-nav">
      <div className="psm-nav__nl">
        <a href="#top" className="psm-nav__logo">
          PASSION<span className="o">SPACE</span>
        </a>
      </div>

      <div className="psm-nav__menu">
        {MENU.map((m) => (
          <a key={m.href} href={m.href}>
            {m.label}
          </a>
        ))}
      </div>

      <div className="psm-nav__right">
        <span className="psm-nav__iss">ISSUE 01 — 신안</span>
        <button
          type="button"
          className="psm-nav__lang"
          aria-label="언어 전환 (준비중)"
          title="English (준비중)"
        >
          KR / EN
        </button>
        <a href={INVITE} className="psm-nav__invite">
          초대 신청
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
        <a href={INVITE} onClick={() => setOpen(false)} style={{ color: "var(--spot)" }}>
          초대 신청
        </a>
      </div>
    </nav>
  );
}
