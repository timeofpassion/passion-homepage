"use client";

import { useState } from "react";
import InputPanel from "@/components/review-studio/InputPanel";
import ResultPanel from "@/components/review-studio/ResultPanel";
import { getPlatformSpec } from "@/lib/review-prompts";

interface Review {
  title: string;
  content: string;
}

export default function ReviewStudioPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [currentPlatform, setCurrentPlatform] = useState("naver");

  const handleGenerate = (result: { reviews: Review[]; savedCount: number; platform: string }) => {
    setReviews(result.reviews);
    setSavedCount(result.savedCount);
    setCurrentPlatform(result.platform);
  };

  const spec = getPlatformSpec(currentPlatform);

  return (
    <div className="min-h-screen bg-[#0a0000] text-white">
      {/* 헤더 */}
      <header className="border-b border-white/10 bg-white/[0.02] backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-sm font-bold">
              R
            </div>
            <div>
              <h1 className="text-lg font-bold">Review Studio</h1>
              <p className="text-xs text-white/40">리뷰 원고 생성 도구</p>
            </div>
          </div>
          <span className="text-xs text-white/30">열정의시간 Internal</span>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* 왼쪽: 입력 패널 */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 h-fit lg:sticky lg:top-24">
            <h2 className="text-sm font-bold text-white/70 mb-4 pb-3 border-b border-white/10">
              원고 생성 옵션
            </h2>
            <InputPanel onGenerate={handleGenerate} onLoadingChange={setLoading} />
          </div>

          {/* 오른쪽: 결과 패널 */}
          <div>
            <ResultPanel
              reviews={reviews}
              loading={loading}
              savedCount={savedCount}
              platformName={spec.name}
              charRange={spec.charRange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
