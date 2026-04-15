"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function SystemLabels() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) return null;

  return (
    <div
      className="font-mono-sys"
      style={{
        position: "fixed",
        bottom: 80,
        left: 24,
        fontSize: 9,
        letterSpacing: "0.12em",
        color: "rgba(204,0,0,0.35)",
        lineHeight: 1.8,
        zIndex: 5,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#cc0000",
          opacity: 0.6,
        }}
      />
      SECURE_CONNECTION
    </div>
  );
}
