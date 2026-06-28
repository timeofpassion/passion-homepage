"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  /** 래핑 태그 (기본 div) */
  as?: ElementType;
  /** 노출 시 transition 지연(ms) — 연속 요소 stagger용 */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * 스크롤 진입 시 fade-up 으로 드러나는 래퍼.
 * - IntersectionObserver 로 1회만 발동(한 번 보이면 유지)
 * - reduced-motion / IO 미지원 환경에서는 즉시 노출(globals.css 가드)
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms", ...style }}
    >
      {children}
    </Tag>
  );
}
