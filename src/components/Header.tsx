"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS: { label: string; href: string; quote?: boolean }[] = [
  { label: "서비스", href: "/time#services" },
  { label: "팀", href: "/time#service-teams" },
  { label: "후기", href: "/time#testimonials" },
  { label: "인사이트", href: "/time/blog" },
  { label: "협력병원", href: "/ko/hospitals" },
  { label: "견적 의뢰", href: "/time/quote", quote: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [drawerOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link href="/time" className="site-header__brand" aria-label="열정의시간 홈">
          열정의시간
        </Link>

        <nav className="site-header__nav" aria-label="주 메뉴">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.quote ? "site-header__nav-quote" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="site-header__burger"
          aria-label="메뉴 열기"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        className={`site-drawer ${drawerOpen ? "is-open" : ""}`}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          className="site-drawer__close"
          aria-label="메뉴 닫기"
          onClick={() => setDrawerOpen(false)}
        >
          ✕
        </button>
        <nav className="site-drawer__nav" aria-label="모바일 메뉴">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.quote ? "site-drawer__nav-quote" : undefined}
              onClick={() => setDrawerOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
