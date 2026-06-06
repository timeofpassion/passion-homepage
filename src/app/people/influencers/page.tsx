import type { Metadata } from "next";
import InfluencerFilter from "../_components/InfluencerFilter";
import { getInfluencers, buildNetworkStats } from "../_data/people-data";
import { COUNTRY_LABEL } from "../_data/sample";

export const metadata: Metadata = {
  title: { absolute: "인플루언서 | 열정의사람들" },
  description:
    "열정의사람들이 보유한 한국·일본·중국·대만·베트남 현지 인플루언서를 국가·분야별로 살펴보세요.",
  alternates: { canonical: "https://www.timeofpassion.com/people/influencers" },
};

export default async function InfluencersPage() {
  const { influencers, usingSample } = await getInfluencers();
  // 보유 네트워크 규모(고정) — 아래 필터 목록은 실데이터 연동
  const networkStats = buildNetworkStats();
  const networkTotal = networkStats.reduce((sum, s) => sum + s.count, 0);
  const marketLabels = networkStats
    .map((s) => COUNTRY_LABEL[s.country])
    .join(" · ");

  return (
    <section className="ppl-section">
      <div className="ppl-container ppl-fadeup">
        <span className="ppl-eyebrow">INFLUENCERS</span>
        <h1 className="ppl-section-title">보유 인플루언서</h1>
        <p className="ppl-section-sub">
          {marketLabels || "한국·일본·중국·대만·베트남"}, 총{" "}
          {networkTotal.toLocaleString()}명+의 현지 인플루언서 네트워크.
          국가·플랫폼·분야로 필터링해 보세요.
        </p>

        {usingSample && (
          <div className="ppl-prepnote">
            <span className="ppl-prepnote__badge">업데이트 중</span>
            <p>
              실시간 인플루언서 데이터는 자사 운영관리 시스템과 연동 작업 중입니다.
              아래는 구성·필터 예시이며, 실제 프로필·채널 수치는 순차 공개됩니다.
            </p>
          </div>
        )}

        <InfluencerFilter data={influencers} />
      </div>
    </section>
  );
}
