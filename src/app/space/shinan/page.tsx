import Link from "next/link";
import "../space-magazine.css";
import "../space-shinan.css";
import ShinanNav from "../_components/ShinanNav";
import Reveal from "../_components/Reveal";
import { MEDIA, CONTACT } from "../_data/media";

const FACTS = [
  {
    n: "1004",
    t: "천사(1004)의 섬",
    d: "1,025개의 섬으로 이뤄진, 국내에서 섬이 가장 많은 고장. 2019년 천사대교로 뭍과 이어졌습니다.",
  },
  {
    n: "世界",
    t: "유네스코 세계자연유산 갯벌",
    d: "2021년 등재된 ‘한국의 갯벌’ 중 신안 갯벌이 가장 넓은 구역. 살아 있는 자연 그 자체입니다.",
  },
  {
    n: "No.1",
    t: "퍼플섬 — 세계 최우수 관광마을",
    d: "반월·박지도가 유엔세계관광기구(UNWTO) 제1회 세계 최우수 관광마을(2021)에 선정됐습니다.",
  },
  {
    n: "2007",
    t: "아시아 최초 슬로시티, 증도",
    d: "느림의 가치를 처음 인정받은 섬. 태평염전 위로 시간이 천천히 흐릅니다.",
  },
];

const TILES = [
  {
    cls: "w7",
    cat: "Sunset",
    nm: "노을",
    ds: "섬과 섬 사이로 지는 다도해의 낙조",
    video: MEDIA.hero.video,
    poster: MEDIA.hero.poster,
  },
  {
    cls: "w5",
    cat: "Tidal Flat",
    nm: "갯벌",
    ds: "세계자연유산, 살아 숨 쉬는 땅",
    ph: "신안 갯벌 · 사진 준비 중",
  },
  {
    cls: "w6",
    cat: "Purple Islands",
    nm: "퍼플섬",
    ds: "보랏빛으로 되살아난 반월·박지도",
    ph: "퍼플섬 · 사진 준비 중",
  },
  {
    cls: "w6",
    cat: "Salt Field",
    nm: "염전",
    ds: "증도 태평염전, 느림의 풍경",
    video: MEDIA.feature3.video,
    poster: MEDIA.feature3.poster,
  },
];

const STAY = [
  { n: "01", t: "쉰다", d: "신안의 느린 시간 속에서 깊이 쉽니다. 섬의 노을과 갯벌이 곧 회복입니다." },
  { n: "02", t: "사유하고, 만든다", d: "쉼 속에서 떠오른 생각을 글·영상·콘텐츠로 남깁니다. 쉼이 곧 작업이 됩니다." },
  { n: "03", t: "지역과 잇는다", d: "머문 이야기가 다시 신안을 세상에 알리고, 잊혀가던 섬을 다시 뛰게 합니다." },
];

const STEPS = [
  { n: "01", t: "서울에서", d: "고속열차로 목포까지. 창밖 풍경이 바뀌는 동안 마음의 속도도 바뀝니다." },
  { n: "02", t: "목포에서", d: "천사대교를 건너 1004개의 섬으로 들어섭니다." },
  { n: "03", t: "신안에서", d: "섬과 섬을 지나, 노을이 가장 잘 보이는 거점에 닿습니다." },
  { n: "04", t: "도착", d: "여정의 끝이 곧 리트릿의 시작. 멀리 온 만큼 깊어집니다." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Resort",
  name: "열정의공간 — 신안 1호",
  description:
    "전남 신안의 섬에 자리한 리트릿 거점. 1004개의 섬과 노을, 세계자연유산 갯벌 사이에서 마케터·크리에이터·지성인이 쉬고 사유하고 콘텐츠를 남기는 순환형 리트릿. 열정의공간 리트릿 운동의 첫 번째 거점.",
  url: "https://www.timeofpassion.com/space/shinan",
  address: {
    "@type": "PostalAddress",
    addressRegion: "전라남도",
    addressLocality: "신안군",
    addressCountry: "KR",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "열정의공간 (PASSION SPACE)",
    url: "https://www.timeofpassion.com/space",
  },
};

// SEO: 신안 여행·리트릿 검색 키워드를 자연스럽게 담는 자주 묻는 질문
const FAQ = [
  {
    q: "신안은 어떤 곳인가요? 가볼 만한 여행지인가요?",
    a: "신안은 1,004개의 섬으로 이뤄진 다도해로, 보랏빛 퍼플섬(반월·박지도), 아시아 최초 슬로시티 증도와 태평염전, 유네스코 세계자연유산으로 등재된 갯벌, 다도해 노을까지 천혜의 풍경을 가진 전남의 대표 힐링 여행지입니다.",
  },
  {
    q: "신안 퍼플섬은 어디인가요?",
    a: "퍼플섬은 신안군 반월도·박지도를 보라색 테마로 꾸민 섬으로, 2021년 유엔세계관광기구(UNWTO) 제1회 ‘세계 최우수 관광마을’에 선정됐습니다. 보랏빛 다리와 마을이 어우러진 신안의 대표 명소입니다.",
  },
  {
    q: "신안은 어떻게 가나요? 천사대교로 갈 수 있나요?",
    a: "수도권에서는 고속열차로 목포까지 온 뒤, 2019년 개통한 천사대교를 건너 신안의 섬들로 들어갑니다. 섬이라 쉽게 닿지 않는 만큼 머무름이 더 깊어지는 곳입니다.",
  },
  {
    q: "열정의공간 신안 거점은 무엇을 하나요?",
    a: "신안은 열정의공간 지역재생 리트릿의 첫 번째 거점입니다. 마케터·영상 크리에이터·인플루언서·전문가가 신안에 머물며 깊이 쉬고, 마케팅·콘텐츠·아이디어 등 재능을 남겨 지역을 알리고 되살립니다.",
  },
  {
    q: "신안에서 워케이션이나 한달살기를 할 수 있나요?",
    a: "네. 신안의 느린 시간 속에서 깊이 쉬며 자신의 일과 재능을 지역에 연결하는 워케이션형 리트릿으로 참여할 수 있습니다. 방문·참여 문의는 카카오톡 채널로 받습니다.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ShinanPlace() {
  return (
    <div className="psm-root" id="top">
      <div className="psm-grain" aria-hidden="true" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,700;0,6..96,900;1,6..96,500;1,6..96,700;1,6..96,900&family=Noto+Serif+KR:wght@300;500;700&display=swap"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ShinanNav />

      {/* HERO */}
      <header className="shn-hero">
        <div className="shn-hero__media psm-treat">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={MEDIA.feature1.poster}
            src={MEDIA.feature1.video}
            aria-hidden="true"
          />
        </div>
        <div className="shn-hero__meta">
          <span className="l">Passion Space · No.01</span>
          <span className="r">
            전라남도 신안
            <br />
            천 개의 섬과 노을
          </span>
        </div>
        <div className="shn-hero__frame">
          <h1 className="shn-hero__h1">
            천 개의 섬과 노을,
            <br />그 사이에 <span className="it">머문다</span>
          </h1>
          <p className="shn-hero__sub">
            가장 많은 섬이 모인 곳, 가장 느리게 시간이 흐르는 곳. 신안은 열정의공간이
            처음 사람을 모으는 자리입니다.
          </p>
        </div>
        <div className="shn-hero__folio">Shinan · 1004 Islands</div>
      </header>

      {/* WHY */}
      <section className="shn-sec shn-why" id="why">
        <div className="shn-head">
          <div className="shn-kicker">Why Shinan · 왜 신안인가</div>
          <h2 className="shn-title">
            사라지는 섬과, 되살아나는 섬이 <span className="hl">함께 있는 곳</span>
          </h2>
        </div>
        <div className="shn-inner shn-why__body">
          <Reveal className="shn-why__lead">
            신안은 국내에서 섬이 가장 많은 고장이자, 인구가 줄어드는 소멸위기
            지역입니다. 그러나 동시에 보랏빛 섬과 세계유산 갯벌처럼,{" "}
            <b>자연과 예술로 이미 다시 살아나고 있는 땅</b>이기도 합니다. 사라짐과
            되살아남이 공존하는 이 모순이 — 우리가 첫 거점으로 신안을 택한
            이유입니다.
          </Reveal>
          <Reveal className="shn-why__facts">
            {FACTS.map((f) => (
              <div key={f.t} className="shn-fact">
                <div className="shn-fact__n">{f.n}</div>
                <div>
                  <div className="shn-fact__t">{f.t}</div>
                  <div className="shn-fact__d">{f.d}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* LANDSCAPE */}
      <section className="shn-land" id="landscape">
        <div className="shn-land__head">
          <div className="shn-kicker">The Landscape · 풍경</div>
          <h2 className="shn-title">
            말보다 먼저, <span className="it">풍경이 설득한다</span>
          </h2>
        </div>
        <div className="shn-land__grid">
          {TILES.map((t) => (
            <Reveal key={t.nm} className={`shn-tile ${t.cls}`}>
              {t.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={t.poster}
                  src={t.video}
                  aria-hidden="true"
                />
              ) : (
                <div className="ph">{t.ph}</div>
              )}
              <div className="duo" />
              <div className="shn-tile__label">
                <span className="shn-tile__cat">{t.cat}</span>
                <div className="shn-tile__nm">{t.nm}</div>
                <div className="shn-tile__ds">{t.ds}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SPACE */}
      <section className="shn-sec shn-space paper2" id="space">
        <div className="shn-head">
          <div className="shn-kicker">The Space · 공간</div>
          <h2 className="shn-title">
            폐교가 다시, <span className="hl">사람으로 채워진다</span>
          </h2>
        </div>
        <Reveal className="shn-space__row">
          <div className="shn-space__media">
            <div className="ph">거점 공간 · 사진 준비 중</div>
            <div className="duo" />
          </div>
          <div className="shn-space__txt">
            <div className="k">바다 객실 · 창작 공간</div>
            <h3>비어 있던 자리를, 머무는 자리로</h3>
            <p>
              신안의 빈 분교와 마을 공간을 되살려 창작과 사유의 자리로 만듭니다.
              바다를 마주한 방에서 쉬고, 오래된 교실에서 이야기를 나눕니다. 풍경이
              필요한 곳엔 풍경을, 몰입이 필요한 곳엔 고요를 두었습니다.
            </p>
            <div className="shn-space__note">실제 공간 사진과 상세는 준비 중입니다</div>
          </div>
        </Reveal>
      </section>

      {/* STAY */}
      <section className="shn-sec shn-stay" id="stay">
        <div className="shn-head">
          <div className="shn-kicker">How You Stay · 머무는 방식</div>
          <h2 className="shn-title">
            쉬러 왔다가, <span className="hl">이야기를 남기고 간다</span>
          </h2>
        </div>
        <div className="shn-stay__list">
          {STAY.map((s) => (
            <Reveal key={s.n} className="shn-stay__row">
              <div className="shn-stay__n">{s.n}</div>
              <div className="shn-stay__t">{s.t}</div>
              <div className="shn-stay__d">{s.d}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ACCESS */}
      <section className="shn-sec shn-access paper2" id="access">
        <div className="shn-head">
          <div className="shn-kicker">The Journey · 오는 길</div>
          <h2 className="shn-title">
            쉽게 닿지 않기에, <span className="it">머무름은 더 깊어진다</span>
          </h2>
        </div>
        <Reveal className="shn-access__lead">
          신안으로 오는 길은 그 자체가 리트릿의 시작입니다.
        </Reveal>
        <Reveal className="shn-steps">
          {STEPS.map((s) => (
            <div key={s.n} className="shn-step">
              <div className="shn-step__n">{s.n}</div>
              <div className="shn-step__t">{s.t}</div>
              <div className="shn-step__d">{s.d}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* FAQ — 신안 여행·리트릿 검색 노출용 */}
      <section className="shn-sec psm-faq" id="faq">
        <div className="shn-head">
          <div className="shn-kicker">FAQ · 자주 묻는 질문</div>
          <h2 className="shn-title">
            신안과 리트릿, <span className="it">무엇이든 물어보세요</span>
          </h2>
        </div>
        <div className="shn-inner psm-faq__list">
          {FAQ.map((f) => (
            <Reveal key={f.q} className="psm-faq__item">
              <details>
                <summary>
                  {f.q}
                  <span className="psm-faq__plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONNECT */}
      <section className="shn-connect" id="connect">
        <Reveal>
          <h2>
            신안에서 머물 자리를, <span className="it">비워두었습니다</span>
          </h2>
          <p>
            리트릿 예약 · 기업 연수 · 공간 대관 · 멤버십. 방문 문의는 카카오톡
            채널로 받습니다.
          </p>
          <a
            href={CONTACT.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="shn-connect__btn"
          >
            카카오톡으로 방문 문의 →
          </a>
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
              전남 신안 · No.01. 사라져가는 지역에 사람을 모아 다시 살리는 리트릿
              운동의 첫 번째 거점.
            </p>
            <div className="psm-footer__grp">
              <span>時</span>
              <span>人</span>
              <span>空</span>
            </div>
          </div>
          <div className="psm-footer__col">
            <h5>신안</h5>
            <a href="#why">왜 신안</a>
            <a href="#landscape">풍경</a>
            <a href="#space">공간</a>
            <a href="#access">오는 길</a>
          </div>
          <div className="psm-footer__col">
            <h5>Movement</h5>
            <Link href="/space">← 열정의공간 (운동)</Link>
            <Link href="/space#network">거점 네트워크</Link>
            <Link href="/">PASSION GROUP</Link>
          </div>
          <div className="psm-footer__col">
            <h5>Visit</h5>
            <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
              방문 문의 (카카오)
            </a>
            <span style={{ opacity: 0.7 }}>전남 신안군</span>
          </div>
        </div>
        <div className="psm-footer__bot">
          <span>© 2026 Passion Space — 열정의 그룹</span>
          <span>No.01 — 신안 · 時 · 人 · 空</span>
        </div>
      </footer>

      {/* 카카오 플로팅 */}
      <a
        href={CONTACT.kakao}
        target="_blank"
        rel="noopener noreferrer"
        className="psm-kakao"
        aria-label="카카오톡 채널로 방문 문의"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#3C1E1E" aria-hidden="true">
          <path d="M12 3c-5.523 0-10 3.538-10 7.9 0 2.85 1.848 5.347 4.636 6.74l-1.185 4.316c-.056.205.18.366.353.243l5.06-3.327c.373.048.755.074 1.146.074 5.523 0 10-3.538 10-7.9S17.523 3 12 3z" />
        </svg>
        <span>카카오톡 문의</span>
      </a>
    </div>
  );
}
