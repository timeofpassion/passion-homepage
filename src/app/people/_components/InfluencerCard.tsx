import {
  type Influencer,
  CATEGORY_LABEL,
  COUNTRY_FLAG,
  PLATFORM_LABEL,
  formatFollowers,
} from "../_data/sample";

export default function InfluencerCard({ inf }: { inf: Influencer }) {
  return (
    <article className="ppl-card">
      <div
        className="ppl-card__photo"
        style={
          inf.profileImage
            ? { backgroundImage: `url(${inf.profileImage})` }
            : undefined
        }
      >
        {!inf.profileImage && "사진 자리"}
        <span className="ppl-card__flag">{COUNTRY_FLAG[inf.country]}</span>
        {inf.exclusive && <span className="ppl-card__excl">전속</span>}
      </div>

      <div className="ppl-card__body">
        <div className="ppl-card__name">{inf.name}</div>
        <p className="ppl-card__one">{inf.oneLiner}</p>

        <div className="ppl-card__cats">
          {inf.category.map((c) => (
            <span key={c} className="ppl-tag">
              {CATEGORY_LABEL[c]}
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
