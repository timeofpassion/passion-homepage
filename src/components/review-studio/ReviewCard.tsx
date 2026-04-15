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
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:border-brand-500/30 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-brand-500/20 text-brand-400 text-sm font-bold flex items-center justify-center">
            {index}
          </span>
          <span className="text-white/60 text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 bg-white/[0.05] px-2 py-1 rounded-md">
            {content.length}자
          </span>
          <button
            onClick={handleCopy}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              copied
                ? "bg-green-500/20 text-green-400"
                : "bg-brand-500/20 text-brand-400 hover:bg-brand-500/30"
            }`}
          >
            {copied ? "복사됨" : "복사"}
          </button>
        </div>
      </div>
      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}
