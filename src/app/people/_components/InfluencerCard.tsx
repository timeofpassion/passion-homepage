import {
  type Influencer,
  PLATFORM_LABEL,
  formatFollowers,
  pickAiPortrait,
} from "../_data/sample";
import Flag from "./Flag";

export default function InfluencerCard({ inf }: { inf: Influencer }) {
  // 실제 사진이 없으면 AI 포트레이트로 대체하고 "AI 이미지" 표기
  const isAiPhoto = !inf.profileImage;
  const photo = inf.profileImage || pickAiPortrait(inf.id);

  return (
    <article className="ppl-card">
      <div
        className="ppl-card__photo"
        style={{ backgroundImage: `url(${photo})` }}
      >
        {isAiPhoto && (
          <span className="ppl-card__ai">AI 이미지 · 교체예정</span>
        )}
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

        <div className="ppl-card__channels">
          {inf.channels.map((ch, i) => (
            <a
              key={i}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ppl-chan"
            >
              {PLATFORM_LABEL[ch.platform]}{" "}
              <b>{formatFollowers(ch.followers)}</b>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
