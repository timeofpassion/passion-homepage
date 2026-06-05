"use client";

import { useEffect, useRef, useState } from "react";

export type GalleryItem = {
  src: string;
  cap: string;
  area: string; // grid-template-areas 이름 (B1, W1, n1 ...)
  size: string; // "big" 이면 캡션 크게
};

export default function GalleryBento({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // 스크롤 등장
  useEffect(() => {
    const els = gridRef.current?.querySelectorAll(".psm-bento__cell");
    if (!els || els.length === 0) return;
    const io = new IntersectionObserver(
      (ents) =>
        ents.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // 라이트박스 키보드 조작
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight")
        setOpen((i) => (i === null ? i : (i + 1) % items.length));
      else if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, items.length]);

  return (
    <>
      <div className="psm-bento" ref={gridRef}>
        {items.map((g, i) => (
          <button
            key={g.src}
            type="button"
            className={`psm-bento__cell ${g.size}`}
            style={{ gridArea: g.area }}
            onClick={() => setOpen(i)}
            aria-label={`신안 ${g.cap} 크게 보기`}
          >
            <img
              src={`/space/gallery/${g.src}`}
              alt={`신안 ${g.cap}`}
              loading="lazy"
            />
            <span className="psm-bento__cap">{g.cap}</span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="psm-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="psm-lightbox__close"
            aria-label="닫기"
            onClick={() => setOpen(null)}
          >
            ✕
          </button>
          <button
            type="button"
            className="psm-lightbox__nav prev"
            aria-label="이전"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open - 1 + items.length) % items.length);
            }}
          >
            ‹
          </button>
          <figure className="psm-lightbox__fig" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/space/gallery/${items[open].src}`}
              alt={`신안 ${items[open].cap}`}
            />
            <figcaption>{items[open].cap}</figcaption>
          </figure>
          <button
            type="button"
            className="psm-lightbox__nav next"
            aria-label="다음"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + 1) % items.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
