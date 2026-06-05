"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 진입 지연(초). 연속 요소를 살짝 어긋나게 띄울 때 사용 */
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

/**
 * IntersectionObserver 기반 스크롤 reveal.
 * 뷰포트에 들어오면 .is-in 을 붙여 opacity/translateY 페이드업.
 * prefers-reduced-motion 사용자는 CSS에서 즉시 표시 처리됨.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`spc-reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
