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
  const { influencers } = await getInfluencers();
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

        <div className="ppl-prepnote">
          <span className="ppl-prepnote__badge">정리 중</span>
          <p>
            현재 인플루언서 목록을 정리·업데이트하고 있습니다. 일부만 우선
            공개되어 있으며, 순차적으로 더 많은 크리에이터가 추가됩니다.
          </p>
        </div>

        <InfluencerFilter data={influencers} />
      </div>
    </section>
  );
}
