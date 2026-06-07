import Link from "next/link";
import "./space-magazine.css";
import MagNav from "./_components/MagNav";
import Reveal from "./_components/Reveal";
import GalleryBento from "./_components/GalleryBento";
import { MEDIA, CONTACT } from "./_data/media";
import { PLACES } from "./_data/places";

// 작동 방식 — 3단계 프로세스(사진 카드). 핵심 후킹: 돈이 아니라 재능으로 머문다.
// 지역명에 종속되지 않게('거점'으로) — 어느 지역에도 적용되는 모델임을 보여준다.
const PROCESS = [
  {
    n: "01",
    lead: "힐링이 필요한 사람들이",
    t: "모인다",
    d: "전국에서, 해외에서. 쉼이 필요한 영향력 있는 사람들이 부담 없이 거점으로 내려옵니다.",
    img: "shinan-walk.jpg",
  },
  {
    n: "02",
    lead: "돈이 아니라 재능으로",
    t: "푹 빠져, 남긴다",
    d: "머무는 동안 그 지역에 푹 빠져, 할인된 머무름 대신 자신의 재능 — 마케팅·콘텐츠·아이디어 — 을 지역에 남깁니다.",
    img: "shinan-tea.jpg",
  },
  {
    n: "03",
    lead: "국내외가 함께",
    t: "지역이 살아난다",
    d: "다양한 사람들이 남긴 콘텐츠와 홍보로, 잊혀가던 지역에 다시 사람이 찾아오고 지역 경제가 깨어납니다.",
    img: "shinan-aerial.jpg",
  },
];

// 지자체·공공기관 대상 — 우리 모델이 '지역'에 무엇을 남기는가.
const GOV = [
  {
    n: "01",
    t: "사람이 모입니다",
    d: "영향력 있는 마케터·크리에이터·전문가가 당신의 지역에 내려와 머뭅니다. 관계인구가 생깁니다.",
  },
  {
    n: "02",
    t: "수요가 생깁니다",
    d: "체류·재방문·입소문으로 관광 수요와 지역 경제가 살아납니다.",
  },
  {
    n: "03",
    t: "콘텐츠·홍보가 남습니다",
    d: "머문 사람들이 지역을 알리는 콘텐츠를 만들어 전국·해외로 확산합니다.",
  },
  {
    n: "04",
    t: "예산이 지속됩니다",
    d: "지방소멸대응기금 등 공공예산을 활용해, 한 번의 행사가 아닌 지속가능한 모델로 운영합니다.",
  },
];

const GALLERY = [
  { src: "shinan-aerial.jpg", cap: "천 개의 섬", area: "B1", size: "big" },
  { src: "shinan-kayak.jpg", cap: "바다 위에서", area: "B2", size: "big" },
  { src: "shinan-salt.jpg", cap: "천일염전", area: "W1", size: "" },
  { src: "shinan-purple.jpg", cap: "퍼플섬", area: "n1", size: "" },
  { src: "shinan-lighthouse.jpg", cap: "등대", area: "n2", size: "" },
  { src: "shinan-campfire.jpg", cap: "밤의 모닥불", area: "B3", size: "big" },
  { src: "shinan-mudflat.jpg", cap: "갯벌 노을", area: "W2", size: "" },
  { src: "shinan-walk.jpg", cap: "함께 걷는 해변", area: "W3", size: "" },
  { src: "shinan-beach.jpg", cap: "백사장", area: "n3", size: "" },
  { src: "shinan-cycle.jpg", cap: "해안 라이딩", area: "n4", size: "" },
  { src: "shinan-camellia.jpg", cap: "동백길", area: "n5", size: "" },
  { src: "shinan-tea.jpg", cap: "노을 티타임", area: "n6", size: "" },
];

const WHO = [
  { nm: "마케터 · CMO", d: "지역을 알릴 전략과 브랜딩", gv: "Strategy" },
  { nm: "영상 PD · 크리에이터", d: "지역을 담는 콘텐츠", gv: "Content" },
  { nm: "인플루언서", d: "세상으로의 확산", gv: "Reach" },
  { nm: "전문직 · 연구자", d: "지역 재생의 깊은 사유", gv: "Insight" },
];

const MARQUEE = [
  "지역재생 리트릿 운동",
  "쉼이 곧 전략이 된다",
  "사라져가는 지역마다, 다시 사람을",
  "지역소멸, 사람으로 푼다",
  "다음 거점을 찾습니다",
];

// SEO: 지역재생 리트릿 운동(브랜드) 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "열정의공간 (PASSION SPACE)",
  alternateName: "PASSIONSPACE",
  url: "https://www.timeofpassion.com/space",
  description:
    "사라져가는 지역에 영향력 있는 사람들을 모아 깊이 쉬게 하고, 그들이 남긴 재능과 영감으로 지역을 되살리는 지역재생 리트릿 운동. 지자체·공공기관과 함께 거점을 늘려갑니다. 신안 1호 운영 중.",
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

// SEO: 자주 묻는 질문 — 지역재생·지자체 협력·리트릿 키워드를 자연스럽게 담는다.
const FAQ = [
  {
    q: "열정의공간(PASSION SPACE)은 무엇인가요?",
    a: "열정의공간은 사라져가는 지역에 영향력 있는 사람들을 모아 깊이 쉬게 하고, 그들이 남긴 재능과 영감으로 지역을 되살리는 지역재생 리트릿 운동입니다. 현재 전남 신안에서 1호 거점을 운영하며, 다른 지역으로 거점을 넓혀가고 있습니다.",
  },
  {
    q: "기존 관광·숙박 사업과 무엇이 다른가요?",
    a: "단순히 쉬다 가는 곳이 아닙니다. 영향력 있는 사람들이 머무는 동안 마케팅·콘텐츠·아이디어 등 재능을 지역에 남겨, 지역을 알리고 관계인구를 만드는 지역재생 모델입니다.",
  },
  {
    q: "지자체·공공기관도 함께할 수 있나요?",
    a: "네. 인구가 줄어드는 지역에 사람·수요·콘텐츠·홍보가 생기는 사업으로, 지방소멸대응기금 등 공공예산을 활용해 지속가능하게 운영할 수 있습니다. 카카오톡 채널로 '우리 지역 거점 제안'을 보내주시면 협력 방안을 안내해 드립니다.",
  },
  {
    q: "참가자는 어떻게 참여하나요? 비용이 드나요?",
    a: "돈이 아니라 재능으로 머뭅니다. 마케터·영상 PD·크리에이터·인플루언서·전문가 등을 선발해 초대하며, 깊은 힐링과 부담 없는 머무름을 제공받는 대신 자신의 재능을 지역에 남깁니다. 카카오톡 채널로 멤버 초대를 신청하세요.",
  },
  {
    q: "워케이션이나 한달살기로도 참여할 수 있나요?",
    a: "네. 깊이 쉬면서 자신의 일과 재능을 지역에 연결하는 워케이션형 리트릿으로 참여할 수 있습니다. 일정·기간은 거점 사정에 따라 안내됩니다.",
  },
  {
    q: "첫 거점 신안은 어떤 곳인가요?",
    a: "신안은 1,004개의 섬으로 이루어진 다도해로, 퍼플섬·증도 슬로시티·유네스코 세계자연유산 갯벌 등 천혜의 풍경을 가진 곳입니다. 자세한 내용은 신안 거점 페이지에서 확인할 수 있습니다.",
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

function Marquee({ spot }: { spot?: boolean }) {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className={`psm-marquee ${spot ? "spot" : ""}`} aria-hidden="true">
      <div className="psm-marquee__track">
        {items.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function SpaceBrandHome() {
  return (
    <div className="psm-root" id="top">
      <div className="psm-grain" aria-hidden="true" />
      {/* 에디토리얼 디스플레이/라벨 폰트 (CDN) — 본문 Pretendard 는 루트 레이아웃에서 로드 */}
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

      <MagNav />

      {/* HERO — 풀블리드 매거진 커버 */}
      <header className="psm-hero">
        <div className="psm-hero__media psm-treat">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={MEDIA.hero.poster}
            src={MEDIA.hero.video}
            aria-hidden="true"
          />
        </div>

        <span className="psm-crop tl">✛</span>
        <span className="psm-crop tr">✛</span>
        <span className="psm-crop bl">✛</span>
        <span className="psm-crop br">✛</span>

        <div className="psm-hero__folio">01</div>
        <div className="psm-hero__vlabel">PASSION SPACE · 지역재생 리트릿</div>

        <div className="psm-hero__frame">
          <div className="psm-hero__top">
            <div className="psm-hero__kick">사람을 모아, 지역을 살린다</div>
            <div className="psm-hero__date">
              지역재생 리트릿 운동
              <br />
              EST. 2026 · 열정의 그룹
            </div>
          </div>

          <div className="psm-hero__center">
            <div className="psm-hero__issue">A Region-Revival Retreat</div>
            <h1 className="psm-hero__h1">
              공간은 장소가
              <br />
              아니라, 그곳에 모인
              <br />
              <span className="hl">사람의</span>{" "}
              <span className="out">에너지다</span>
            </h1>
          </div>

          <div className="psm-hero__bottom">
            <p className="psm-hero__lead">
              사라져가는 지역에 영향력 있는 사람들을 모읍니다. 쉬러 왔다가, 그
              지역의 내일을 만들고 갑니다. 첫 시작은 신안입니다.
            </p>
            <a href="#how" className="psm-hero__enter">
              <span className="dot" />
              더 알아보기 ↓
            </a>
          </div>
        </div>
      </header>

      <Marquee />

      {/* 01 MANIFESTO */}
      <section className="psm-sec psm-manifesto" id="manifesto">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">01</div>
          <div>
            <div className="psm-shead__cat">Manifesto · 우리는</div>
            <h2>
              우리는 게스트하우스가 아니라,
              <br />
              <span className="hl">쉼 속의 싱크탱크다</span>
            </h2>
          </div>
        </Reveal>
        <div className="psm-manifesto__body">
          <Reveal className="psm-manifesto__pull">
            “놀러 와서 소비하고 떠나는 곳이 아니다.
            <br />
            <b>쉬면서, 이 지역을 어떻게 살릴지 함께 사유한다.</b>”
          </Reveal>
          <Reveal className="psm-manifesto__txt">
            <span className="psm-label">The Exchange</span>
            <p>
              마케터·PD·크리에이터·전문가가 깊이 쉬고, 그 안에서 태어난 아이디어와
              콘텐츠가 잊혀가던 지역을 다시 뛰게 합니다.
            </p>
            <p>
              사라져가는 지역에 사람을 모아 다시 살리는 리트릿 운동. 공간은 장소가
              아니라, 그곳에 모인 사람의 에너지다. 열정의공간.
            </p>
            <p>
              힐링은 우리가 드리고, 당신은 영감을 남깁니다. 그 교환이 곧 지역의
              재생입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 PROCESS / MODEL */}
      <section className="psm-sec psm-proc" id="how">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">02</div>
          <div>
            <div className="psm-shead__cat">The Model · 작동 방식</div>
            <h2>
              쉬러 왔다가, <span className="hl">지역을 살리고</span> 갑니다
            </h2>
          </div>
        </Reveal>

        {/* 교환 — 핵심 후킹: 돈이 아니라 재능 */}
        <Reveal className="psm-exchange">
          <div className="psm-exchange__side">
            <span className="psm-exchange__label">당신이 받는 것</span>
            <strong>깊은 힐링 · 부담 없는 머무름</strong>
          </div>
          <div className="psm-exchange__swap" aria-hidden="true">⇄</div>
          <div className="psm-exchange__side give-back">
            <span className="psm-exchange__label">당신이 남기는 것</span>
            <strong>재능 · 콘텐츠 · 아이디어</strong>
          </div>
        </Reveal>
        <Reveal className="psm-proc__note">돈이 아니라, 재능으로 머뭅니다.</Reveal>

        {/* 3단계 여정 */}
        <div className="psm-proc__steps">
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} className="psm-proc__step">
              <div className="psm-proc__media">
                <img
                  src={`/space/gallery/${s.img}`}
                  alt={`거점에서 ${s.t}`}
                  loading="lazy"
                />
                <span className="psm-proc__num">{s.n}</span>
                {i < PROCESS.length - 1 && (
                  <span className="psm-proc__arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
              <div className="psm-proc__body">
                <span className="psm-proc__lead">{s.lead}</span>
                <h3 className="psm-proc__t">{s.t}</h3>
                <p className="psm-proc__d">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 참여 유도 */}
        <Reveal className="psm-proc__cta">
          <p>부담 없이 내려와 힐링하고 — 지역을 살리는 프로젝트에 함께해요.</p>
          <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
            함께하기 <span>→</span>
          </a>
        </Reveal>
      </section>

      {/* 03 FOR LOCAL GOVERNMENTS · 지자체·기관이라면 */}
      <section className="psm-sec psm-gov" id="gov">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">03</div>
          <div>
            <div className="psm-shead__cat">For Regions · 지자체·기관이라면</div>
            <h2>
              지역소멸, 예산이 아니라 <span className="hl">사람으로 풉니다</span>
            </h2>
          </div>
        </Reveal>
        <Reveal className="psm-gov__intro">
          인구가 줄어드는 지역에 ‘사람·수요·콘텐츠·홍보’가 생기는 사업입니다.
          한 번의 축제가 아니라, 머문 사람들이 지역을 알리는 지속가능한 지역재생
          모델로 함께합니다.
        </Reveal>
        <div className="psm-gov__grid">
          {GOV.map((g) => (
            <Reveal key={g.n} className="psm-gov__card">
              <span className="psm-gov__n">{g.n}</span>
              <h3 className="psm-gov__t">{g.t}</h3>
              <p className="psm-gov__d">{g.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="psm-gov__cta">
          <p>우리 지역도 다음 거점이 될 수 있습니다.</p>
          <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
            우리 지역 거점 제안하기 <span>→</span>
          </a>
        </Reveal>
      </section>

      {/* 04 NETWORK */}
      <section className="psm-sec psm-net" id="network">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">04</div>
          <div>
            <div className="psm-shead__cat">The Network · 거점</div>
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
                    <>
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={p.poster}
                        src={p.video}
                        aria-hidden="true"
                      />
                      <div className="duo" />
                    </>
                  ) : (
                    <>
                      <div className="ph">{p.placeholder}</div>
                      <div className="duo" />
                    </>
                  ))}
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
                <a
                  key={p.slug}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
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

      {/* 첫 거점 신안 미리보기 — 갤러리(축소·재배치) + 상세 링크 */}
      <section className="psm-gallery" id="shinan-preview" aria-label="첫 거점 신안 미리보기">
        <Reveal className="psm-gallery__head">
          <div className="psm-gallery__kick">No.01 · 첫 거점</div>
          <h2 className="psm-gallery__h2">
            첫 시작은, <span className="hl">신안입니다</span>
          </h2>
          <p className="psm-gallery__sub">
            천 개의 섬과 노을 위에서 모델을 처음 증명하는 거점. 신안 이야기는 따로
            담았습니다.
          </p>
          <Link href="/space/shinan" className="psm-gallery__link">
            신안 거점 자세히 보기 <span>→</span>
          </Link>
        </Reveal>
        <GalleryBento items={GALLERY} />
      </section>

      {/* 05 WHO / PEOPLE */}
      <section className="psm-sec psm-who" id="who">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">05</div>
          <div>
            <div className="psm-shead__cat">The People · 함께할 사람</div>
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

      <Marquee spot />

      {/* FAQ — 검색 노출용 자주 묻는 질문 */}
      <section className="psm-sec psm-faq" id="faq">
        <Reveal className="psm-shead">
          <div className="psm-shead__idx">06</div>
          <div>
            <div className="psm-shead__cat">FAQ · 자주 묻는 질문</div>
            <h2>
              지역재생 리트릿, <span className="hl">무엇이든 물어보세요</span>
            </h2>
          </div>
        </Reveal>
        <div className="psm-faq__list">
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

      {/* JOIN */}
      <section className="psm-join" id="join">
        <div className="psm-join__mark" aria-hidden="true">
          Join
        </div>
        <Reveal className="psm-join__big">
          돈 내고 오는 곳이 아니라, <span className="w">초대받는</span> 곳이다
        </Reveal>
        <Reveal className="psm-join__row">
          <p>
            당신의 재능으로 함께할 수 있다면, 또는 살려야 할 지역이 있다면 — 문을
            두드려주세요. 함께하는 사람을 선발해 모십니다.
          </p>
          <div className="psm-join__opts">
            <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
              멤버 초대 신청 <span>→</span>
            </a>
            <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
              지역 · 거점 제안 <span>→</span>
            </a>
            <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
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
            <a href="#gov">지자체·기관이라면</a>
            <a href="#who">함께할 사람</a>
          </div>
          <div className="psm-footer__col">
            <h5>Network</h5>
            <Link href="/space/shinan">No.01 신안</Link>
            <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
              거점 제안
            </a>
          </div>
          <div className="psm-footer__col">
            <h5>Join</h5>
            <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
              초대 신청
            </a>
            <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
              파트너·후원
            </a>
            <Link href="/">← PASSION GROUP</Link>
          </div>
        </div>
        <div className="psm-footer__bot">
          <span>© 2026 Passion Space — 열정의 그룹</span>
          <span>時 · 人 · 空 · 지역재생 리트릿</span>
        </div>
      </footer>

      {/* 카카오톡 채널 플로팅 — 문의는 열정의시간 카카오 채널로 */}
      <a
        href={CONTACT.kakao}
        target="_blank"
        rel="noopener noreferrer"
        className="psm-kakao"
        aria-label="카카오톡 채널로 문의"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#3C1E1E" aria-hidden="true">
          <path d="M12 3c-5.523 0-10 3.538-10 7.9 0 2.85 1.848 5.347 4.636 6.74l-1.185 4.316c-.056.205.18.366.353.243l5.06-3.327c.373.048.755.074 1.146.074 5.523 0 10-3.538 10-7.9S17.523 3 12 3z" />
        </svg>
        <span>카카오톡 문의</span>
      </a>
    </div>
  );
}
