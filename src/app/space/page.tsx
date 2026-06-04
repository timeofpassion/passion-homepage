import Link from "next/link";
import "./space-magazine.css";
import MagNav from "./_components/MagNav";
import Reveal from "./_components/Reveal";
import { MEDIA } from "./_data/media";
import { PLACES } from "./_data/places";

const HOW = [
  { n: "01", t: "모인다", d: "영향력 있는 사람들을 초대한다. 돈이 아니라 재능으로 함께한다." },
  { n: "02", t: "쉬고, 사유한다", d: "깊은 힐링 속에서 집단지성이 작동한다. 쉼이 곧 아이디어가 된다." },
  { n: "03", t: "남긴다", d: "이 지역을 살릴 아이디어·콘텐츠·홍보를 남기고 떠난다." },
  { n: "04", t: "지역이 산다", d: "방문 수요·지역 경제·인지도가 오르고, 그 성과가 다시 운영을 지탱한다." },
];

const MODEL = [
  { k: "이용료", h: "거의 무료", p: "수익이 목적이면 숙박업이 된다. 진입장벽을 없애 가장 좋은 사람을 모은다." },
  { k: "운영비", h: "공공예산", p: "지자체·정부엔 “돈을 대면 지역에 사람·수요·홍보가 생기는” 사업이다." },
  { k: "지불 방식", h: "기여로", p: "콘텐츠·전략·확산·아이디어 — 게스트가 남기는 것이 곧 지역의 자산이다." },
];

const WHO = [
  { nm: "마케터 · CMO", d: "지역을 알릴 전략과 브랜딩", gv: "Strategy" },
  { nm: "영상 PD · 크리에이터", d: "지역을 담는 콘텐츠", gv: "Content" },
  { nm: "인플루언서", d: "세상으로의 확산", gv: "Reach" },
  { nm: "전문직 · 연구자", d: "지역 재생의 깊은 사유", gv: "Insight" },
];

const MAIL = (subject: string) =>
  `mailto:hello@passionspace.kr?subject=${encodeURIComponent(subject)}`;

// SEO: 지역재생 리트릿 운동(브랜드) 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "열정의공간 (PASSION SPACE)",
  alternateName: "PASSIONSPACE",
  url: "https://www.timeofpassion.com/space",
  description:
    "사라져가는 지역에 영향력 있는 사람들을 모아 깊이 쉬게 하고, 그들이 남긴 영감으로 지역을 되살리는 리트릿 운동. 신안 1호 운영 중.",
  email: "hello@passionspace.kr",
  parentOrganization: {
    "@type": "Organization",
    name: "PASSION GROUP",
    url: "https://www.timeofpassion.com",
  },
  location: {
    "@type": "Place",
    name: "신안 1호",
    address: {
      "@type": "PostalAddress",
      addressRegion: "전라남도",
      addressLocality: "신안군",
      addressCountry: "KR",
    },
  },
};

export default function SpaceBrandHome() {
  return (
    <div className="psm-root" id="top">
      {/* 매거진 디스플레이/라벨 폰트 (CDN) — 본문 Pretendard 는 루트 레이아웃에서 로드 */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@600;700;800;900&family=Noto+Serif+KR:wght@300;600&display=swap"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MagNav />

      {/* HERO — 비대칭 split */}
      <header className="psm-hero">
        <div className="psm-hero__left">
          <div className="psm-hero__topmeta">
            <div className="psm-hero__m1">운동, 장소가 아니라</div>
            <div className="psm-hero__m2">
              전라남도 신안 · 1호
              <br />
              EST. 2026 · 열정의 그룹
            </div>
          </div>
          <h1 className="psm-hero__h1">
            공간은 장소가
            <br />
            아니라, 그곳에
            <br />
            모인 <span className="hl">사람의</span>
            <br />
            <span className="out">에너지다</span>
          </h1>
          <div className="psm-hero__botrow">
            <p className="psm-hero__lead">
              사라져가는 지역에 영향력 있는 사람들을 모읍니다. 쉬러 왔다가, 그
              지역의 내일을 만들고 갑니다.
            </p>
            <a href="#how" className="psm-hero__enter">
              운동 읽기 ↓
            </a>
          </div>
        </div>
        <div className="psm-hero__right">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={MEDIA.hero.poster}
            src={MEDIA.hero.video}
            aria-hidden="true"
          />
          <div className="psm-hero__no">01</div>
          <div className="psm-hero__vlabel">SHINAN · 천 개의 섬과 노을</div>
        </div>
      </header>

      {/* 01 MANIFESTO */}
      <section className="psm-sec psm-manifesto" id="manifesto">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">01</div>
          <div>
            <div className="psm-shead__cat">Manifesto / 우리는</div>
            <h2>
              우리는 게스트하우스가 아니라,{" "}
              <span className="hl">쉼 속의 싱크탱크다</span>
            </h2>
          </div>
        </Reveal>
        <div className="psm-manifesto__body">
          <Reveal className="psm-manifesto__pull">
            “놀러 와서 소비하고 떠나는 곳이 아니다.{" "}
            <b>쉬면서, 이 지역을 어떻게 살릴지 함께 사유한다.</b>”
          </Reveal>
          <Reveal className="psm-manifesto__txt">
            마케터·PD·크리에이터·전문가가 깊이 쉬고, 그 안에서 태어난 아이디어와
            콘텐츠가 잊혀가던 지역을 다시 뛰게 합니다. 힐링은 우리가 드리고, 당신은
            영감을 남깁니다. 그 교환이 곧 지역의 재생입니다.
          </Reveal>
        </div>
      </section>

      {/* 02 HOW / MODEL */}
      <section className="psm-sec psm-how" id="how">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">02</div>
          <div>
            <div className="psm-shead__cat">The Model / 작동 방식</div>
            <h2>
              사람이 모이면, <span className="hl">지역이 살아난다</span>
            </h2>
          </div>
        </Reveal>
        <div>
          {HOW.map((r) => (
            <Reveal key={r.n} className="psm-how__row">
              <div className="psm-how__n">{r.n}</div>
              <div className="psm-how__t">{r.t}</div>
              <div className="psm-how__d">{r.d}</div>
            </Reveal>
          ))}
        </div>
        <Reveal className="psm-how__model">
          {MODEL.map((m) => (
            <div key={m.k} className="psm-how__m">
              <div className="k">{m.k}</div>
              <h4>{m.h}</h4>
              <p>{m.p}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 03 NETWORK */}
      <section className="psm-sec psm-net" id="network">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">03</div>
          <div>
            <div className="psm-shead__cat">The Network / 거점</div>
            <h2>
              한 곳이 아니다. 사라져가는 <span className="hl">지역마다</span>, 다시
              사람을 모은다
            </h2>
          </div>
        </Reveal>
        <Reveal className="psm-net__grid">
          {PLACES.map((p) => {
            const cls = `psm-net__cell${p.feat ? " feat" : ""}${
              p.status === "open" ? " open" : ""
            }${p.light ? " light" : ""}`;
            const inner = (
              <>
                {!p.light &&
                  (p.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={p.poster}
                      src={p.video}
                      aria-hidden="true"
                    />
                  ) : (
                    <div className="ph">{p.placeholder}</div>
                  ))}
                {!p.light && <div className="sc" />}
                <span className="st">{p.statusLabel}</span>
                <div className="nm">{p.name}</div>
                <div className="ds">{p.desc}</div>
                {p.arrow && <div className="arrow">{p.arrow}</div>}
              </>
            );
            if (p.href?.startsWith("/")) {
              return (
                <Link key={p.slug} href={p.href} className={cls}>
                  {inner}
                </Link>
              );
            }
            if (p.href) {
              return (
                <a key={p.slug} href={p.href} className={cls}>
                  {inner}
                </a>
              );
            }
            return (
              <div key={p.slug} className={cls}>
                {inner}
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* 04 WHO / PEOPLE */}
      <section className="psm-sec psm-who" id="who">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">04</div>
          <div>
            <div className="psm-shead__cat">The People / 함께할 사람</div>
            <h2>
              당신의 재능으로 지역을 살려주세요.{" "}
              <span className="hl">쉼은 우리가 드립니다</span>
            </h2>
          </div>
        </Reveal>
        <div>
          {WHO.map((w) => (
            <Reveal key={w.nm} className="psm-who__r">
              <div className="nm">{w.nm}</div>
              <div className="d">{w.d}</div>
              <div className="gv">{w.gv}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* JOIN */}
      <section className="psm-join" id="join">
        <Reveal className="psm-join__big">
          돈 내고 오는 곳이 아니라, <span className="w">초대받는</span> 곳이다
        </Reveal>
        <Reveal className="psm-join__row">
          <p>
            당신의 재능으로 함께할 수 있다면, 또는 살려야 할 지역이 있다면 — 문을
            두드려주세요. 함께하는 사람을 선발해 모십니다.
          </p>
          <div className="psm-join__opts">
            <a href={MAIL("[열정의공간] 멤버 초대 신청")}>
              멤버 초대 신청 <span>→</span>
            </a>
            <a href={MAIL("[열정의공간] 지역·거점 제안")}>
              지역 · 거점 제안 <span>→</span>
            </a>
            <a href={MAIL("[열정의공간] 파트너·후원")}>
              파트너 · 후원 <span>→</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="psm-footer">
        <div className="psm-footer__grid">
          <div className="psm-footer__brand">
            <div className="psm-footer__logo">
              PASSION<span className="o">SPACE</span>
            </div>
            <p>
              사라져가는 지역에 사람을 모아 다시 살리는 리트릿 운동. 공간은 장소가
              아니라, 그곳에 모인 사람의 에너지다. — 열정의 그룹.
            </p>
            <div className="psm-footer__grp">
              <span>時</span>
              <span>人</span>
              <span>空</span>
            </div>
          </div>
          <div className="psm-footer__col">
            <h5>Movement</h5>
            <a href="#manifesto">우리는</a>
            <a href="#how">작동 방식</a>
            <a href="#who">함께할 사람</a>
          </div>
          <div className="psm-footer__col">
            <h5>Network</h5>
            <Link href="/space/shinan">No.01 신안</Link>
            <a href="#network">No.02 정선(예정)</a>
            <a href={MAIL("[열정의공간] 지역·거점 제안")}>거점 제안</a>
          </div>
          <div className="psm-footer__col">
            <h5>Join</h5>
            <a href={MAIL("[열정의공간] 초대 신청")}>초대 신청</a>
            <a href={MAIL("[열정의공간] 파트너·후원")}>파트너·후원</a>
            <p>hello@passionspace.kr</p>
            <Link href="/">← PASSION GROUP</Link>
          </div>
        </div>
        <div className="psm-footer__bot">
          <span>© 2026 Passion Space — 열정의 그룹</span>
          <span>時 · 人 · 空 · Issue 01 — 신안</span>
        </div>
      </footer>
    </div>
  );
}
