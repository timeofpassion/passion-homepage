import {
  type Influencer,
  PLATFORM_LABEL,
  formatFollowers,
} from "../_data/sample";
import Flag from "./Flag";

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
        {!inf.profileImage && (
          <div className="ppl-card__ph" aria-hidden>
            <svg viewBox="0 0 24 24" width="46" height="46" fill="currentColor">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" />
            </svg>
            <span>프로필 준비중</span>
          </div>
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
