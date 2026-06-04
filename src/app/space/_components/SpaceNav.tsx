"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "이야기", href: "#story" },
  { label: "프로그램", href: "#programs" },
  { label: "머무름", href: "#stay" },
  { label: "저널", href: "#journal" },
];

export default function SpaceNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <>
      <nav className={`spc-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="spc-container spc-nav__inner">
          <Link href="#" className="spc-nav__brand">
            열정의<b>공간</b>
          </Link>

          <div className="spc-nav__menu">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
            <button
              type="button"
              className="spc-nav__en"
              aria-label="언어 전환 (준비중)"
              title="English (준비중)"
            >
              <b>KO</b> / EN
            </button>
            <a href="#connect" className="spc-nav__cta">
              예약 문의
            </a>
          </div>

          <button
            type="button"
            className="spc-nav__burger"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`spc-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="spc-drawer__top">
          <Link
            href="#"
            className="spc-drawer__brand"
            onClick={() => setOpen(false)}
          >
            열정의<b>공간</b>
          </Link>
          <button
            type="button"
            className="spc-drawer__close"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="spc-drawer__nav">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a
            href="#connect"
            className="spc-drawer__cta"
            onClick={() => setOpen(false)}
          >
            예약 문의
          </a>
        </nav>
      </div>
    </>
  );
}
