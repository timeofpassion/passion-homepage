"use client";

import ReviewCard from "./ReviewCard";

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

interface ResultPanelProps {
  results: PlatformResult[];
  loading: boolean;
}

export default function ResultPanel({ results, loading }: ResultPanelProps) {
  if (loading) {
    return (
      <div className="rs-card">
        <div className="rs-loading">
          <div className="rs-spinner" />
          <p style={{ fontSize: 14 }}>AI가 원고를 생성하고 있습니다...</p>
          <p style={{ fontSize: 12, color: "var(--rs-text-dim)" }}>
            플랫폼별 규칙과 시술 지식 베이스를 적용하는 중
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="rs-card">
        <div className="rs-empty">
          <div className="rs-empty-icon">✍️</div>
          <p style={{ fontSize: 14 }}>
            왼쪽에서 옵션을 선택하고<br />
            원고 생성 버튼을 눌러주세요
          </p>
        </div>
      </div>
    );
  }

  const totalReviews = results.reduce((sum, r) => sum + r.reviews.length, 0);
  const totalSaved = results.reduce((sum, r) => sum + r.savedCount, 0);

  return (
    <div>
      <div className="rs-result-summary">
        <span>
          총 <strong style={{ color: "var(--rs-accent)" }}>{totalReviews}개</strong> 생성 완료
        </span>
        {totalSaved > 0 && (
          <span style={{ fontSize: 12, color: "var(--rs-success)", background: "var(--rs-success-soft)", padding: "4px 10px", borderRadius: 6 }}>
            노션 저장 {totalSaved}개
          </span>
        )}
      </div>

      {results.map((result) => (
        <div key={result.platform} className="rs-platform-section">
          <div className={`rs-platform-header rs-platform-header--${result.platform}`}>
            <div>
              <span>{result.platformLabel}</span>
              <span className="rs-platform-meta" style={{ marginLeft: 8 }}>권장 {result.charRange}</span>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span className="rs-platform-meta">{result.reviews.length}개</span>
              {result.savedCount > 0 && (
                <span className="rs-platform-meta" style={{ background: "rgba(255,255,255,0.1)", padding: "3px 8px", borderRadius: 6 }}>
                  저장 {result.savedCount}
                </span>
              )}
            </div>
          </div>

          {result.error && <div className="rs-alert rs-alert--danger">{result.error}</div>}

          {result.reviews.map((review, i) => (
            <ReviewCard
              key={`${result.platform}-${i}`}
              index={i + 1}
              title={review.title}
              content={review.content}
            />
          ))}
        </div>
      ))}

      <div className="rs-alert rs-alert--warning">
        원고들은 날짜를 분산해서 게시하세요. (1일 1~2개 권장) 한꺼번에 올리면 어뷰징으로 감지될 수 있습니다.
      </div>
    </div>
  );
}
