import {
  type Influencer,
  type Platform,
  PLATFORM_LABEL,
  formatFollowers,
  pickPortrait,
} from "../_data/sample";
import Flag from "./Flag";

// 플랫폼별 브랜드 컬러(로고 마스크 색)
const PLATFORM_BRAND: Record<Platform, string> = {
  instagram: "#E4405F",
  youtube: "#FF0000",
  tiktok: "#111111",
  xiaohongshu: "#FF2442",
  douyin: "#111111",
  facebook: "#1877F2",
  x: "#111111",
  naver: "#03C75A",
  ameba: "#5BB300",
};

export default function InfluencerCard({ inf }: { inf: Influencer }) {
  // 사진 미등록 시 성별·연령대에 맞는 AI 포트레이트로 대체(별도 표기 없음)
  const photo = inf.profileImage || pickPortrait(inf.id, inf.gender, inf.ageRange);

  return (
    <article className="ppl-card">
      <div
        className="ppl-card__photo"
        style={{ backgroundImage: `url(${photo})` }}
      >
        <span className="ppl-card__flag">
          <Flag country={inf.country} size={22} />
        </span>
        {inf.exclusive && <span className="ppl-card__excl">전속</span>}
      </div>

      <div className="ppl-card__body">
        <div className="ppl-card__name">{inf.name}</div>
        <p className="ppl-card__one">{inf.oneLiner}</p>

        <div className="ppl-card__cats">
          {inf.categories.map((c) => (
            <span key={c} className="ppl-tag">
              {c}
            </span>
          ))}
        </div>

        {/* 채널·팔로워는 정보 표시용(직접 연락 방지를 위해 외부 링크 비활성). 플랫폼은 로고로 표시 */}
        <div className="ppl-card__channels">
          {inf.channels.map((ch, i) => (
            <span key={i} className="ppl-chan" title={PLATFORM_LABEL[ch.platform]}>
              <span
                className="ppl-chan__ic"
                role="img"
                aria-label={PLATFORM_LABEL[ch.platform]}
                style={{
                  backgroundColor: PLATFORM_BRAND[ch.platform] ?? "#475569",
                  WebkitMaskImage: `url(/people/platforms/${ch.platform}.svg)`,
                  maskImage: `url(/people/platforms/${ch.platform}.svg)`,
                }}
              />
              <b>{formatFollowers(ch.followers)}</b>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
