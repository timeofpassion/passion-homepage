"use client";

import { useState } from "react";
import InputPanel from "@/components/review-studio/InputPanel";
import ResultPanel from "@/components/review-studio/ResultPanel";
import "./review-studio.css";

interface Review {
  title: string;
  content: string;
}

interface PlatformResult {
  platform: string;
  platformLabel: string;
  charRange: string;
  reviews: Review[];
  savedCount: number;
  error?: string;
}

export default function ReviewStudioPage() {
  const [results, setResults] = useState<PlatformResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (data: { results: PlatformResult[] }) => {
    setResults(data.results);
  };

  return (
    <div className="rs-root">
      <header className="rs-header">
        <div className="rs-header-inner">
          <div className="rs-header-brand">
            <div className="rs-logo">R</div>
            <div>
              <h1 className="rs-header-title">Review Studio</h1>
              <p className="rs-header-sub">리뷰 원고 생성 도구</p>
            </div>
          </div>
          <span className="rs-badge">열정의시간</span>
        </div>
      </header>

      <main className="rs-main">
        <div className="rs-grid">
          <div className="rs-card rs-input-card">
            <h2 className="rs-card-title">원고 생성 옵션</h2>
            <InputPanel onGenerate={handleGenerate} onLoadingChange={setLoading} />
          </div>
          <div>
            <ResultPanel results={results} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
