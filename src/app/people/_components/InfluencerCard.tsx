import {
  type Influencer,
  PLATFORM_LABEL,
  formatFollowers,
  pickAiPortrait,
} from "../_data/sample";
import Flag from "./Flag";

export default function InfluencerCard({ inf }: { inf: Influencer }) {
  // 사진 미등록 시 AI 포트레이트로 대체(별도 표기 없음)
  const photo = inf.profileImage || pickAiPortrait(inf.id);

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

        {/* 채널·팔로워는 정보 표시용(직접 연락 방지를 위해 외부 링크 비활성) */}
        <div className="ppl-card__channels">
          {inf.channels.map((ch, i) => (
            <span key={i} className="ppl-chan">
              {PLATFORM_LABEL[ch.platform]}{" "}
              <b>{formatFollowers(ch.followers)}</b>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
