"use client";

import { useState } from "react";

interface ReviewCardProps {
  index: number;
  title: string;
  content: string;
}

export default function ReviewCard({ index, title, content }: ReviewCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rs-review">
      <div className="rs-review-head">
        <div className="rs-review-label">
          <span className="rs-review-num">{index}</span>
          <span style={{ fontSize: 12, color: "var(--rs-text-dim)" }}>{title}</span>
        </div>
        <div className="rs-review-actions">
          <span className="rs-review-count">{content.length}자</span>
          <button
            type="button"
            className={`rs-copy-btn ${copied ? "is-copied" : ""}`}
            onClick={handleCopy}
          >
            {copied ? "복사됨" : "복사"}
          </button>
        </div>
      </div>
      <div className="rs-review-body">{content}</div>
    </div>
  );
}
