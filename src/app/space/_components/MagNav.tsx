"use client";

import { useState } from "react";
import { CONTACT } from "../_data/media";

const MENU = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Model", href: "#how" },
  { label: "Network", href: "#network" },
  { label: "People", href: "#who" },
];

const INVITE = CONTACT.kakao;

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
        <a
          href={INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="psm-nav__invite"
        >
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
        <a
          href={INVITE}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          style={{ color: "var(--spot)" }}
        >
          초대 신청
        </a>
      </div>
    </nav>
  );
}
