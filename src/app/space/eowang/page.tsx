import Link from "next/link";
import "../space-magazine.css";
import "../space-shinan.css";
import EowangNav from "../_components/EowangNav";
import Reveal from "../_components/Reveal";
import { CONTACT } from "../_data/media";

// 순천(어왕분교)의 의미 — 폐교의 현실 + 순천이 가진 검증된 자산.
const FACTS = [
  {
    n: "폐교",
    t: "비어 있던 옛 어왕분교",
    d: "오래전 문을 닫고 방치돼 온 폐교. 단순 보수가 아니라, 사람이 모이는 콘텐츠 기지로 되살립니다.",
  },
  {
    n: "No.1",
    t: "대한민국 제1호 국가정원, 순천만",
    d: "순천만국가정원은 우리나라 첫 국가정원. 세계적 생태도시 순천을 상징하는 무대입니다.",
  },
  {
    n: "世界",
    t: "유네스코 세계유산, 선암사",
    d: "2018년 ‘산사, 한국의 산지승원’으로 등재된 조계산 선암사가 순천에 있습니다.",
  },
  {
    n: "民俗",
    t: "살아있는 민속마을, 낙안읍성",
    d: "조선시대 읍성이 그대로 남아 주민이 실제로 사는, 국내 유일의 민속마을입니다.",
  },
];

// 풍경 — 어왕분교는 베이스캠프, 무대는 순천 전역.
const TILES = [
  {
    cls: "w7",
    cat: "National Garden",
    nm: "순천만국가정원",
    ds: "대한민국 제1호 국가정원",
    img: "/space/eowang/garden-korean.jpg",
  },
  {
    cls: "w5",
    cat: "Folk Town",
    nm: "낙안읍성",
    ds: "조선 읍성이 살아있는 민속마을",
    img: "/space/eowang/nagan-01.jpg",
  },
  {
    cls: "w6",
    cat: "Eco City",
    nm: "순천만 정원",
    ds: "갈대와 물길, 생태수도의 풍경",
    img: "/space/eowang/garden-04.jpg",
  },
  {
    cls: "w6",
    cat: "Heritage",
    nm: "낙안의 골목",
    ds: "돌담 너머, 옛 마을의 결",
    img: "/space/eowang/nagan-02.jpg",
  },
];

// 작동 방식 — 재능으로 머물고, 순천을 남긴다.
const MODEL = [
  {
    n: "01",
    t: "모인다",
    d: "전국·해외 청년 크리에이터를 어왕분교에 초청합니다. 돈이 아니라 재능으로, 거의 무료로 머뭅니다.",
  },
  {
    n: "02",
    t: "순천을 담는다",
    d: "순천만국가정원·낙안읍성·선암사를 돌며 숏폼·영상·마케팅 기획을 만듭니다. 어왕분교는 베이스캠프, 무대는 순천 전체입니다.",
  },
  {
    n: "03",
    t: "순천에 남긴다",
    d: "만들어진 콘텐츠를 순천에 정기적으로 공급하고 전국·해외로 확산해, 관계인구와 관광 수요를 만듭니다.",
  },
];

// 추진 일정 — 민관 협력 공모 연계(추진 중).
const PLAN = [
  { n: "01", t: "협약(MOU)", w: "~7월", d: "순천시·전남도교육청·열정의공간 협력 체계 구축" },
  { n: "02", t: "공모 공동신청", w: "7월", d: "지자체·교육청 공동 명의 신청 (민간 협력 포함)" },
  { n: "03", t: "심사·선정", w: "~10월", d: "서면·현장 심사를 거쳐 선정" },
  { n: "04", t: "구축·운영", w: "선정 후", d: "공간 조성 뒤 열정의공간이 위탁 운영" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "순천 어왕분교 — 열정의공간 첫 거점",
  description:
    "방치된 순천 어왕분교를 청년 크리에이터 베이스캠프로 되살려, 순천 전역을 알리는 콘텐츠 생산기지로 만드는 민관 협력 지역재생 사업(추진 중).",
  url: "https://www.timeofpassion.com/space/eowang",
  isPartOf: {
    "@type": "WebSite",
    name: "열정의공간 (PASSION SPACE)",
    url: "https://www.timeofpassion.com/space",
  },
  about: {
    "@type": "Organization",
    name: "열정의공간 (PASSION SPACE)",
    url: "https://www.timeofpassion.com/space",
  },
};

export default function EowangPlace() {
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

      <EowangNav />

      {/* HERO */}
      <header className="shn-hero">
        <div className="shn-hero__media psm-treat">
          <img
            src="/space/eowang/garden-01.jpg"
            alt="순천만국가정원 — 순천 전역이 열정의공간의 무대가 됩니다"
          />
        </div>
        <div className="shn-hero__meta">
          <span className="l">Passion Space · No.01 · 추진 중</span>
          <span className="r">
            전라남도 순천
            <br />옛 어왕분교
          </span>
        </div>
        <div className="shn-hero__frame">
          <h1 className="shn-hero__h1">
            비어 있던 교실에,
            <br />
            다시 <span className="it">사람을</span> 모은다
          </h1>
          <p className="shn-hero__sub">
            오래전 문을 닫은 순천 어왕분교. 방치된 폐교를 청년 크리에이터의
            베이스캠프로 되살리려는, 열정의공간의 첫 거점입니다.
          </p>
        </div>
        <div className="shn-hero__folio">Suncheon · Eowang</div>
      </header>

      {/* WHY */}
      <section className="shn-sec shn-why" id="why">
        <div className="shn-head">
          <div className="shn-kicker">Why Eowang · 왜 어왕분교인가</div>
          <h2 className="shn-title">
            사라지는 폐교와, 살아나는 순천이 <span className="hl">만나는 곳</span>
          </h2>
        </div>
        <div className="shn-inner shn-why__body">
          <Reveal className="shn-why__lead">
            순천 주암면은 인구가 줄어드는 지역이고, 어왕분교는 오래전 문을 닫은 채
            비어 있습니다. 그러나 순천은 <b>제1호 국가정원과 세계유산을 품은
            대한민국의 생태수도</b>이기도 합니다. 사라짐과 살아남이 함께 있는 이
            땅이 — 우리가 첫 거점으로 어왕분교를 택한 이유입니다.
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

      {/* LANDSCAPE — 무대는 순천 전역 */}
      <section className="shn-land" id="landscape">
        <div className="shn-land__head">
          <div className="shn-kicker">The Stage · 순천 풍경</div>
          <h2 className="shn-title">
            어왕분교는 베이스캠프, <span className="it">무대는 순천 전체</span>
          </h2>
        </div>
        <div className="shn-land__grid">
          {TILES.map((t) => (
            <Reveal key={t.nm} className={`shn-tile ${t.cls}`}>
              {t.img ? (
                <img src={t.img} alt={t.nm} loading="lazy" />
              ) : (
                <div className="ph">사진 준비 중</div>
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

      {/* SPACE — 공간 계획 */}
      <section className="shn-sec shn-space paper2" id="space">
        <div className="shn-head">
          <div className="shn-kicker">The Space · 공간 계획</div>
          <h2 className="shn-title">
            비어 있던 교실이, <span className="hl">코워킹 랩과 스테이로</span>
          </h2>
        </div>
        <Reveal className="shn-space__row">
          <div className="shn-space__media">
            <img
              src="/space/eowang/interior-concept.jpg"
              alt="어왕분교를 코워킹 랩·커뮤니티 공간으로 꾸민 공간 컨셉 예시"
              loading="lazy"
            />
            <span className="shn-space__cap">공간 컨셉 예시</span>
          </div>
          <div className="shn-space__txt">
            <div className="k">공간 계획 · 어왕분교</div>
            <h3>폐교를, 머무는 자리로</h3>
            <p>
              1층은 디지털 편집·아이디어를 나누는 집단지성 코워킹 랩과 커뮤니티
              키친으로, 2층은 독립형 객실을 갖춘 체류 스테이로. 운동장은 로컬 팝업
              마켓·페스티벌의 무대가 됩니다.
            </p>
            <div className="shn-space__note">
              ※ 위 이미지는 공간 컨셉 예시이며, 실제 도면·객실 수 등 구체 계획은
              현장 실사 후 확정됩니다
            </div>
          </div>
        </Reveal>
      </section>

      {/* MODEL — 재능으로 머물고, 순천을 남긴다 */}
      <section className="shn-sec shn-stay" id="model">
        <div className="shn-head">
          <div className="shn-kicker">How It Works · 작동 방식</div>
          <h2 className="shn-title">
            재능으로 머물고, <span className="hl">순천을 남기고 간다</span>
          </h2>
        </div>
        <div className="shn-stay__list">
          {MODEL.map((s) => (
            <Reveal key={s.n} className="shn-stay__row">
              <div className="shn-stay__n">{s.n}</div>
              <div className="shn-stay__t">{s.t}</div>
              <div className="shn-stay__d">{s.d}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PLAN — 추진 일정 */}
      <section className="shn-sec shn-access paper2" id="plan">
        <div className="shn-head">
          <div className="shn-kicker">The Plan · 추진 일정</div>
          <h2 className="shn-title">
            건물이 아니라, <span className="it">사람과 콘텐츠로 되살립니다</span>
          </h2>
        </div>
        <Reveal className="shn-access__lead">
          교육부·행정안전부의 폐교 활용 공동협력 공모와 연계해, 순천시·전남도교육청·
          열정의공간이 함께 추진합니다.
        </Reveal>
        <Reveal className="shn-steps">
          {PLAN.map((s) => (
            <div key={s.n} className="shn-step">
              <div className="shn-step__n">{s.n}</div>
              <div className="shn-step__t">
                {s.t}
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--arch)",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: 1,
                    color: "var(--spot)",
                    marginTop: 6,
                  }}
                >
                  {s.w}
                </span>
              </div>
              <div className="shn-step__d">{s.d}</div>
            </div>
          ))}
        </Reveal>
        <p
          className="shn-access__lead"
          style={{ marginTop: 40, opacity: 0.6, fontSize: 14, maxWidth: "60ch" }}
        >
          ※ 본 페이지는 추진 중인 민관 협력 제안 내용을 담고 있으며, 일정·계획은
          협의 과정에서 변동될 수 있습니다.
        </p>
      </section>

      {/* CONNECT */}
      <section className="shn-connect" id="connect">
        <Reveal>
          <h2>
            순천의 다음 페이지를, <span className="it">함께 씁니다</span>
          </h2>
          <p>
            순천시·교육청·민간이 함께하는 민관 협력 제안입니다. 협력 검토·실무 협의
            문의는 카카오톡 채널로 받습니다.
          </p>
          <a
            href={CONTACT.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="shn-connect__btn"
            style={{ color: "#000" }}
          >
            카카오톡으로 협력 문의 →
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
              전남 순천 · No.01 (추진 중). 방치된 폐교를 사람과 콘텐츠로 되살리는
              지역재생 리트릿 운동의 첫 거점.
            </p>
            <div className="psm-footer__grp">
              <span>時</span>
              <span>人</span>
              <span>空</span>
            </div>
          </div>
          <div className="psm-footer__col">
            <h5>순천 어왕분교</h5>
            <a href="#why">왜 어왕분교</a>
            <a href="#landscape">순천 풍경</a>
            <a href="#space">공간 계획</a>
            <a href="#plan">추진 일정</a>
          </div>
          <div className="psm-footer__col">
            <h5>Movement</h5>
            <Link href="/space">← 열정의공간 (운동)</Link>
            <Link href="/space#network">거점 네트워크</Link>
            <Link href="/">PASSION GROUP</Link>
          </div>
          <div className="psm-footer__col">
            <h5>Contact</h5>
            <a href={CONTACT.kakao} target="_blank" rel="noopener noreferrer">
              협력 문의 (카카오)
            </a>
            <span style={{ opacity: 0.7 }}>전남 순천시</span>
          </div>
        </div>
        <div className="psm-footer__bot">
          <span>© 2026 Passion Space — 열정의 그룹</span>
          <span>No.01 — 순천 어왕분교 · 時 · 人 · 空</span>
        </div>
      </footer>

      {/* 카카오 플로팅 */}
      <a
        href={CONTACT.kakao}
        target="_blank"
        rel="noopener noreferrer"
        className="psm-kakao"
        aria-label="카카오톡 채널로 협력 문의"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#3C1E1E" aria-hidden="true">
          <path d="M12 3c-5.523 0-10 3.538-10 7.9 0 2.85 1.848 5.347 4.636 6.74l-1.185 4.316c-.056.205.18.366.353.243l5.06-3.327c.373.048.755.074 1.146.074 5.523 0 10-3.538 10-7.9S17.523 3 12 3z" />
        </svg>
        <span>카카오톡 문의</span>
      </a>
    </div>
  );
}
