"use client";

import ReviewCard from "./ReviewCard";

interface Review {
  title: string;
  content: string;
}

interface ResultPanelProps {
  reviews: Review[];
  loading: boolean;
  savedCount: number;
  platformName: string;
  charRange: string;
}

export default function ResultPanel({ reviews, loading, savedCount, platformName, charRange }: ResultPanelProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4">
        <div className="w-10 h-10 border-3 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
        <p className="text-white/60 text-sm">AI가 원고를 생성하고 있습니다...</p>
        <p className="text-white/40 text-xs">노션 데이터를 분석하고 플랫폼 규칙을 적용 중</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-3 text-center">
        <div className="text-4xl opacity-30">&#9997;</div>
        <p className="text-white/40 text-sm">왼쪽에서 옵션을 선택하고<br />원고 생성 버튼을 눌러주세요</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 상단 정보 바 */}
      <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-white/80 text-sm font-medium">{platformName}</span>
          <span className="text-xs text-white/40 bg-white/[0.05] px-2 py-1 rounded-md">
            권장 {charRange}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">{reviews.length}개 생성</span>
          {savedCount > 0 && (
            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-md">
              노션 저장 완료 ({savedCount}개)
            </span>
          )}
        </div>
      </div>

      {/* 원고 카드 리스트 */}
      <div className="space-y-3">
        {reviews.map((review, i) => (
          <ReviewCard key={i} index={i + 1} title={review.title} content={review.content} />
        ))}
      </div>

      {/* 게시 분산 안내 */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3 text-yellow-200/70 text-xs">
        원고들은 날짜를 분산해서 게시하세요. (1일 1~2개 권장) 한꺼번에 올리면 어뷰징으로 감지될 수 있습니다.
      </div>
    </div>
  );
}
