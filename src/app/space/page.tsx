import HeroVideo from "./_components/HeroVideo";
import Reveal from "./_components/Reveal";
import ConnectForm from "./_components/ConnectForm";
import { MEDIA, CONTACT } from "./_data/media";

const PROGRAMS = [
  {
    no: "01",
    title: "시그니처 리트릿",
    desc: "큐레이션된 일정 속 쉼·대화·웰니스를 경험하는 몰입형 체류.",
    for: "For Everyone",
    forKo: "누구나",
  },
  {
    no: "02",
    title: "워크숍 · 살롱",
    desc: "업계 리더가 이끄는 토론과 강연, 모임이 곧 콘텐츠가 됩니다.",
    for: "Marketers",
    forKo: "마케터",
  },
  {
    no: "03",
    title: "자기주도 리트릿",
    desc: "정해진 일정 없이, 나만의 속도로 머무는 자유로운 체류.",
    for: "Solo Stay",
    forKo: "단독 체류",
  },
  {
    no: "04",
    title: "기업 오프사이트",
    desc: "팀의 비전을 다듬는 단체 연수, 평일의 공간을 가장 가치 있게.",
    for: "Teams",
    forKo: "팀 단위",
  },
];

const COMMUNITY = [
  { name: "마케터 · CMO", desc: "비우고 채우는 전략가" },
  { name: "크리에이터", desc: "촬영과 휴식, 확산을 한번에" },
  { name: "기업 리더십", desc: "방향을 다시 세우는 사람들" },
  { name: "전문직 · 작가", desc: "고요 속 사유와 창작" },
];

const JOURNAL = [
  {
    cat: "Essay",
    title: "섬에서 보낸 3일, 마케터의 노트",
    excerpt:
      "일정을 비우자 비로소 보이기 시작한 것들. 신안에서의 사흘이 남긴 기록.",
    video: MEDIA.journal.video,
    poster: MEDIA.journal.poster,
  },
  {
    cat: "Space",
    title: "폐교가 리트릿이 되기까지",
    excerpt:
      "오래된 분교의 칠판과 운동장이 강의·창작의 공간으로 다시 태어난 이야기.",
  },
  {
    cat: "People",
    title: "이곳에서 만난 사람들",
    excerpt:
      "같은 노을을 바라보며 시작된 대화. 머무는 동안 이어진 인연의 기록.",
  },
];

// SEO: 리트릿(숙박/관광) 비즈니스 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Resort",
  name: "열정의공간 (PASSION SPACE)",
  description:
    "전남 신안의 섬에 위치한 리트릿 성지. 마케터·크리에이터·지성인이 모여 쉬고 사유하고 콘텐츠를 만드는 순환형 리트릿.",
  url: "https://www.timeofpassion.com/space",
  address: {
    "@type": "PostalAddress",
    addressRegion: "전라남도",
    addressLocality: "신안군",
    addressCountry: "KR",
  },
  email: CONTACT.email,
  parentOrganization: {
    "@type": "Organization",
    name: "PASSION GROUP",
    url: "https://www.timeofpassion.com",
  },
};

export default function SpaceHome() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. HERO */}
      <HeroVideo />

      {/* 3. PHILOSOPHY */}
      <section className="spc-philo" id="story">
        <div className="spc-container">
          <Reveal className="spc-philo__inner">
            <span className="spc-kicker">Our Philosophy</span>
            <h2 className="spc-h2">
              쉽게 닿지 않는 곳일수록,
              <br />
              머무름은 더 깊어집니다.
            </h2>
            <p className="spc-lead">
              열정의공간은 단순한 휴양지가 아닙니다. 마케터와 크리에이터, 사유하는
              사람들이 모여 영감을 나누고, 그 안에서 태어난 이야기가 다시 신안과
              전남을 세상에 알리는 — 순환하는 리트릿입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. FEATURE 1 — 자기주도 리트릿 (텍스트 좌) */}
      <section className="spc-feature">
        <video
          className="spc-feature__video"
          src={MEDIA.feature1.video}
          poster={MEDIA.feature1.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="spc-feature__scrim" />
        <div className="spc-container spc-feature__inner">
          <Reveal className="spc-feature__block">
            <span className="spc-feature__kicker">Self-Guided Retreat</span>
            <h3 className="spc-feature__h">나만의 속도로 떠나는 여정</h3>
            <p className="spc-feature__desc">
              정해진 일정에 얽매이지 않고, 비우고 채우는 시간을 스스로
              설계합니다. 노을이 지는 섬에서, 온전히 나에게 집중하는 며칠.
            </p>
            <a href="#programs" className="spc-textlink">
              프로그램 보기 →
            </a>
          </Reveal>
        </div>
      </section>

      {/* 5. FEATURE 2 — 커뮤니티 (텍스트 우) */}
      <section className="spc-feature spc-feature--right">
        <video
          className="spc-feature__video"
          src={MEDIA.feature2.video}
          poster={MEDIA.feature2.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="spc-feature__scrim" />
        <div className="spc-container spc-feature__inner">
          <Reveal className="spc-feature__block">
            <span className="spc-feature__kicker">Who Gathers Here</span>
            <h3 className="spc-feature__h">누가 모이느냐가 곧 브랜드가 된다</h3>
            <p className="spc-feature__desc">
              이곳의 손님은 머무는 동안 콘텐츠를 만들고, 그 이야기가 다시 신안을
              세상에 알립니다. 영향력 있는 사람들이 모이는 것 자체가 이 공간의
              자산입니다.
            </p>
            <a href="#connect" className="spc-textlink">
              멤버십 사전 등록 →
            </a>
          </Reveal>
        </div>
      </section>

      {/* 6. PROGRAMS */}
      <section className="spc-programs" id="programs">
        <div className="spc-container">
          <Reveal className="spc-programs__head">
            <div>
              <span className="spc-kicker">Programs</span>
              <h2 className="spc-h2">머무는 방식</h2>
            </div>
            <a href="#connect" className="spc-textlink">
              전체 프로그램 →
            </a>
          </Reveal>

          <div className="spc-programs__list">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.no} className="spc-program" delay={i * 0.06}>
                <span className="spc-program__no">{p.no}</span>
                <h3 className="spc-program__title">{p.title}</h3>
                <p className="spc-program__desc">{p.desc}</p>
                <div className="spc-program__for">
                  <span>{p.forKo}</span>
                  {p.for}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHO / COMMUNITY */}
      <section className="spc-who">
        <div className="spc-container">
          <Reveal className="spc-who__head">
            <span className="spc-kicker">The Community</span>
            <h2 className="spc-h2">이곳에 모이는 사람들</h2>
          </Reveal>

          <div className="spc-who__grid">
            {COMMUNITY.map((c, i) => (
              <Reveal key={c.name} className="spc-who__item" delay={i * 0.08}>
                <div className="spc-who__name">{c.name}</div>
                <p className="spc-who__desc">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FEATURE 3 — 공간(머무름) (텍스트 좌) */}
      <section className="spc-feature" id="stay">
        <video
          className="spc-feature__video"
          src={MEDIA.feature3.video}
          poster={MEDIA.feature3.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="spc-feature__scrim" />
        <div className="spc-container spc-feature__inner">
          <Reveal className="spc-feature__block">
            <span className="spc-feature__kicker">The Space</span>
            <h3 className="spc-feature__h">경치는 경험으로, 폐교는 영감으로</h3>
            <p className="spc-feature__desc">
              바다를 마주한 객실과 사색의 공간, 그리고 오래된 분교를 되살린
              강의·창작 공간. 풍경이 필요한 곳엔 풍경을, 몰입이 필요한 곳엔
              고요를 두었습니다.
            </p>
            <a href="#journal" className="spc-textlink">
              공간 둘러보기 →
            </a>
          </Reveal>
        </div>
      </section>

      {/* 9. JOURNAL */}
      <section className="spc-journal" id="journal">
        <div className="spc-container">
          <Reveal className="spc-journal__head">
            <div>
              <span className="spc-kicker">Journal</span>
              <h2 className="spc-h2">공간에 머문 이야기</h2>
            </div>
            <a href="#connect" className="spc-textlink">
              저널 전체 →
            </a>
          </Reveal>

          <div className="spc-journal__grid">
            {JOURNAL.map((j, i) => (
              <Reveal key={j.title} as="article" delay={i * 0.08}>
                <div className="spc-jcard">
                  <div className="spc-jcard__thumb">
                    {j.video ? (
                      <video
                        src={j.video}
                        poster={j.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                      />
                    ) : (
                      <div className="spc-jcard__placeholder">
                        PHOTO · 신안 촬영물 예정
                      </div>
                    )}
                  </div>
                  <span className="spc-jcard__cat">{j.cat}</span>
                  <h3 className="spc-jcard__title">{j.title}</h3>
                  <p className="spc-jcard__excerpt">{j.excerpt}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONNECT */}
      <section className="spc-connect" id="connect">
        <video
          className="spc-connect__video"
          src={MEDIA.connect.video}
          poster={MEDIA.connect.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="spc-connect__scrim" />
        <div className="spc-container spc-connect__inner">
          <Reveal>
            <span className="spc-kicker">Stay Connected</span>
            <h2 className="spc-connect__h">
              당신의 영감이 머물 자리를
              <br />
              비워두었습니다
            </h2>
            <p className="spc-connect__desc">
              리트릿 예약 · 기업 연수 · 공간 대관 · 멤버십. 새로운 소식을 가장
              먼저 받아보세요.
            </p>
            <ConnectForm />
            <p className="spc-connect__alt">
              바로 문의:{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              {" · "}
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT.instagramHandle}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
