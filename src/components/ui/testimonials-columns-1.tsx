"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export interface ColumnTestimonial {
  text: string;
  result?: string;
  name: string;
  role: string;
  initial: string;
}

function Stars() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 14 }}>
      {Array.from({ length: 5 }).map((_, s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#cc0000" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: ColumnTestimonial[];
  duration?: number;
}) => {
  const reduce = useReducedMotion();
  return (
    <div className={props.className}>
      <motion.div
        animate={reduce ? undefined : { translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, result, name, role, initial }, i) => (
              <div
                key={i}
                style={{
                  width: 330,
                  maxWidth: "100%",
                  padding: "1.9rem 1.8rem",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 14px 36px -16px rgba(204,0,0,0.18)",
                }}
              >
                <Stars />
                <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", fontWeight: 300 }}>
                  {text}
                </p>
                {result && (
                  <p style={{ marginTop: 14, fontSize: "0.9rem", fontWeight: 700, color: "#ff5a5a", lineHeight: 1.5 }}>
                    {result}
                  </p>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
                  <div
                    className="font-mono-sys"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "#0a0000",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.7)",
                      flexShrink: 0,
                    }}
                  >
                    {initial}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.3, color: "#fff" }}>
                      {name}
                    </div>
                    <div style={{ fontSize: "0.8rem", lineHeight: 1.4, color: "rgba(255,255,255,0.5)" }}>
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
