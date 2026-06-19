import Link from "next/link";
import Image from "next/image";
import type { Clinic } from "../_data/clinics";
import { CATEGORY_LABEL } from "../_data/clinics";

const KAKAO = "https://pf.kakao.com/_timfofpassion";

const CHANNELS = [
  { d: "L", bg: "#06c755", fg: "#fff", label: "일본·대만 — LINE" },
  { d: "W", bg: "#09b83e", fg: "#fff", label: "중국 — WeChat" },
  { d: "W", bg: "#25d366", fg: "#fff", label: "영어권 — WhatsApp" },
  { d: "K", bg: "#fae100", fg: "#3a1d1d", label: "한국 — 카카오" },
];

export default function ClinicDetail({
  lang,
  clinic,
}: {
  lang: string;
  clinic: Clinic;
}) {
  const sigLines = clinic.signature.split("\n");
  const brand = clinic.nameEn?.split(" ")[0] ?? clinic.name;
  const enArea = clinic.catEn.split("·").pop()?.trim() ?? "";
  const areaShort =
    clinic.location.areaHint.split("·").pop()?.trim() ??
    clinic.location.areaHint;
  const reviews = clinic.localTrust?.reviews ?? [];

  return (
    <div className="clx">
      {/* TOPBAR */}
      <header className="top">
        <div className="wrap">
          <Link
            href={`/time/hospital/${lang}`}
            className="brand"
            aria-label="협력병원 목록으로"
          >
            <span className="m">{brand}</span>
            {enArea && (
              <span className="s">
                {areaShort} · {enArea}
              </span>
            )}
          </Link>
          <nav className="tnav">
            <div className="langsw" aria-hidden="true">
              <span>
                <b>KO</b>
              </span>
              <span>日本語</span>
              <span>中文</span>
              <span>EN</span>
            </div>
            <a className="tbtn" href={KAKAO} target="_blank" rel="noopener">
              상담 문의
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hcopy">
            <div className="hbadge r d1">
              <span className="dot" />
              {clinic.badges.foreignRegistered
                ? "보건복지부 외국인환자 유치 등록 의료기관"
                : `${CATEGORY_LABEL[clinic.category]} · ${areaShort}`}
            </div>
            <h1 className="h1 r d2">
              {sigLines.map((line, i) => (
                <span key={i}>
                  {i === sigLines.length - 1 ? (
                    <span className="accent">{line}</span>
                  ) : (
                    line
                  )}
                  {i < sigLines.length - 1 && <br />}
                </span>
              ))}
              {clinic.nameEn && <span className="small">{clinic.nameEn}</span>}
            </h1>
            <p className="hsub r d3">
              {clinic.name} — 한국인과 동일 수가, 통역 동행. 본연의 변화를
              열정의시간 의료 컨시어지가 처음부터 끝까지 함께 설계합니다.
            </p>
            <div className="htrust r d4">
              <span>
                <i className="ck">✓</i>
                {clinic.badges.foreignRegistered
                  ? "외국인환자 유치 등록 의료기관"
                  : "외국인환자 안내 가능"}
              </span>
              {clinic.badges.interpreter && (
                <span>
                  <i className="ck">✓</i>4개 언어 통역 지원
                </span>
              )}
              <span>
                <i className="ck">✓</i>One Price 동일 수가
              </span>
            </div>
            <div className="hcta r d5">
              <a className="btn-p" href={KAKAO} target="_blank" rel="noopener">
                열정의시간 컨시어지 상담
              </a>
              <a className="btn-g" href="#signature">
                시그니처 진료 보기
              </a>
            </div>
          </div>
          <div className="hvis r d3">
            <div
              className="frame"
              style={{
                background: `linear-gradient(155deg, #e7d6c0, #caa06b 42%, ${clinic.tone} 125%)`,
              }}
            >
              {clinic.photos?.hero ? (
                <Image
                  src={clinic.photos.hero}
                  alt={`${clinic.name} 내부`}
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              ) : (
                <div className="cap">실제 시설 · 분위기 이미지 영역</div>
              )}
            </div>
            <div className="fcard1">
              <div className="k">Since · {enArea}</div>
              <div className="v">{clinic.doctor.tags[0] ?? "정품 · 정량"}</div>
            </div>
            {clinic.badges.interpreter && (
              <div className="fcard2">
                <div className="k">Interpretation</div>
                <div className="flags">🇯🇵 🇨🇳 🇹🇼 🇬🇧</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="strip">
        <div className="wrap">
          <div className="it">
            <div className="k">Registered</div>
            <div className="v">
              {clinic.badges.foreignRegistered ? (
                <>
                  외국인환자 유치
                  <br />
                  등록 의료기관
                </>
              ) : (
                <>
                  외국인환자 유치
                  <br />
                  등록 준비 중
                </>
              )}
            </div>
          </div>
          <div className="it">
            <div className="k">Language</div>
            <div className="v">
              일·중·대·영
              <br />
              전 과정 통역 동행
            </div>
          </div>
          <div className="it">
            <div className="k">One Price</div>
            <div className="v">
              내국인·외국인
              <br />
              동일 수가 원칙
            </div>
          </div>
          <div className="it">
            <div className="k">Location</div>
            <div className="v">
              {areaShort}
              <br />
              {clinic.location.fromAirport}
            </div>
          </div>
        </div>
      </section>

      {/* 원장 */}
      <section className="sec doctor">
        <div className="wrap">
          <div className="portrait r d1">
            {clinic.photos?.doctor && (
              <Image
                src={clinic.photos.doctor}
                alt={clinic.doctor.name}
                fill
                sizes="(max-width: 900px) 100vw, 35vw"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            )}
            <div className="pcap">Doctor</div>
            <div className="pc">
              <div className="n">{clinic.doctor.name}</div>
              <div className="t">{clinic.doctor.title}</div>
            </div>
          </div>
          <div className="r d2">
            <div className="eyebrow">01 — 원장 소개</div>
            <p className="dquote">“{clinic.doctor.quote}”</p>
            <div className="dtags">
              {clinic.doctor.tags.map((t) => (
                <i key={t}>{t}</i>
              ))}
            </div>
            {!clinic.photos?.doctor && (
              <p className="note-i">
                ※ 원장 사진은 병원이 제공한 실제 이미지로 교체됩니다.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 시그니처 */}
      <section className="sec sig" id="signature">
        <span className="bignum">02</span>
        <div className="wrap">
          <div className="head">
            <div>
              <div className="eyebrow">02 — Signature Care</div>
              <h2 className="stitle" style={{ marginTop: 18 }}>
                {clinic.name.replace(/( 신사점| 청담점| 영등포점)$/, "")}이
                <br />
                가장 잘하는 진료
              </h2>
            </div>
            <p className="lead">
              시술별 <b className="accent">과정·다운타임</b>을 미리
              안내드립니다. 해외에서 오시는 일정, 처음부터 함께 계획합니다.
            </p>
          </div>
          <div className="grid4">
            {clinic.treatments.map((t, i) => (
              <div className={`scard r d${(i % 4) + 1}`} key={i}>
                <div className="no">{String(i + 1).padStart(2, "0")}</div>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
                <div className="why">{t.why}</div>
                {(t.downtime || t.duration) && (
                  <div className="tags">
                    {t.downtime && <i>{t.downtime}</i>}
                    {t.duration && <i>{t.duration}</i>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONE PRICE */}
      <section className="sec oneprice">
        <div className="wrap">
          <div className="eyebrow ey">03 — One Price</div>
          <h2>
            내국인과 외국인,
            <br />
            <em>같은 가격</em>입니다.
          </h2>
          <p>
            해외에서 오셨다는 이유로 더 받지 않습니다. 동일 수가 원칙, 외국인
            추가요금 없음 — 정확한 견적은 열정의시간 컨시어지가 상담 단계에서
            투명하게 안내드립니다.
          </p>
          <div className="rule" />
        </div>
      </section>

      {/* 결과(프라이버시) */}
      <section className="sec result">
        <div className="wrap">
          <div className="lockbox r d1">
            <div className="blur" />
            <div className="ico">
              <div className="lk">🔒</div>
              <div className="tx">Private · 1:1 Consultation</div>
            </div>
          </div>
          <div className="r d2">
            <div className="eyebrow">04 — 시술 결과</div>
            <h2>
              결과 사례는
              <br />
              1:1 상담에서만 보여드립니다.
            </h2>
            <div className="warn">
              의료광고법과 환자 개인정보 보호를 위해, 시술 전·후 사례는
              홈페이지에 공개하지 않습니다. 동의된 실제 사례는{" "}
              <b className="accent">열정의시간 컨시어지 1:1 상담</b>에서만
              안내드립니다. 개인에 따라 결과는 다를 수 있습니다.
            </div>
          </div>
        </div>
      </section>

      {/* 공간 */}
      <section className="sec space">
        <span className="bignum">05</span>
        <div className="wrap">
          <div className="eyebrow">05 — The Space</div>
          <h2 className="stitle" style={{ marginTop: 18 }}>
            머무는 동안, 편안하도록
          </h2>
          <div className="gal">
            {clinic.photos?.space?.length ? (
              clinic.photos.space.map((s, i) => (
                <div
                  className={`g r d${(i % 3) + 1}${i === 0 ? " big" : ""}`}
                  key={i}
                >
                  <Image
                    src={s.src}
                    alt={`${clinic.name} ${s.label}`}
                    fill
                    sizes={i === 0 ? "(max-width: 900px) 100vw, 70vw" : "(max-width: 900px) 50vw, 24vw"}
                    style={{ objectFit: "cover" }}
                  />
                  <span className="lab">{s.label}</span>
                </div>
              ))
            ) : (
              <>
                <div className="g g1 big r d1">
                  <span className="lab">리셉션 · 라운지</span>
                </div>
                <div className="g g2 r d2">
                  <span className="lab">상담실</span>
                </div>
                <div className="g g3 r d3">
                  <span className="lab">시술실</span>
                </div>
                <div className="g g4 r d2">
                  <span className="lab">회복실</span>
                </div>
              </>
            )}
          </div>
          {!clinic.photos?.space?.length && (
            <p className="note-i" style={{ marginTop: 18 }}>
              ※ 실제 병원 시설 사진으로 교체됩니다.
            </p>
          )}
        </div>
      </section>

      {/* 위치 */}
      <section className="sec loc">
        <div className="wrap">
          <div className="mapbox r d1">
            <div className="grid" />
            <div className="pin">
              <div className="p" />
              <div className="lb">
                {clinic.name} · {areaShort}
              </div>
            </div>
          </div>
          <div className="r d2">
            <div className="eyebrow">06 — 위치 · 접근성</div>
            <h2 className="stitle" style={{ marginTop: 18, fontSize: 34 }}>
              찾아오시기 쉽게,
              <br />
              모셔다 드리기 편하게
            </h2>
            <div className="locitems">
              <div className="li">
                <div className="ic">🚇</div>
                <div>
                  <div className="tt">{clinic.location.areaHint}</div>
                  <div className="ds">
                    지하철역 도보권 (정확한 위치는 컨시어지가 안내)
                  </div>
                </div>
              </div>
              <div className="li">
                <div className="ic">✈️</div>
                <div>
                  <div className="tt">{clinic.location.fromAirport}</div>
                  <div className="ds">
                    공항 픽업·이동 동선을 컨시어지가 함께 설계
                  </div>
                </div>
              </div>
              <div className="li">
                <div className="ic">🤝</div>
                <div>
                  <div className="tt">컨시어지 동행</div>
                  <div className="ds">
                    방문·통역·일정까지 열정의시간이 동행합니다
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 통역 */}
      {clinic.badges.interpreter && (
        <section className="sec lang" style={{ background: "var(--paper2)" }}>
          <div className="wrap">
            <div className="eyebrow">07 — Language Support</div>
            <h2 className="stitle" style={{ marginTop: 18 }}>
              당신의 언어로, 처음부터 끝까지
            </h2>
            <div className="grid">
              <div className="langc r d1">
                <div className="fl">🇯🇵</div>
                <div className="nm">日本語</div>
                <div className="ds">상담·시술·사후 통역 동행</div>
              </div>
              <div className="langc r d2">
                <div className="fl">🇨🇳</div>
                <div className="nm">简体中文</div>
                <div className="ds">위챗 상담 · 통역 동행</div>
              </div>
              <div className="langc r d3">
                <div className="fl">🇹🇼</div>
                <div className="nm">繁體中文</div>
                <div className="ds">라인 상담 · 통역 동행</div>
              </div>
              <div className="langc r d4">
                <div className="fl">🇬🇧</div>
                <div className="nm">English</div>
                <div className="ds">WhatsApp · 통역 동행</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 후기 */}
      <section className="sec rev">
        <span className="bignum">08</span>
        <div className="wrap">
          <div className="eyebrow">08 — Voices</div>
          <h2 className="stitle" style={{ marginTop: 18 }}>
            먼저 다녀간 분들의 이야기
          </h2>
          {reviews.length > 0 ? (
            <>
              <div className="grid">
                {reviews.map((rv, i) => (
                  <div className={`revc r d${(i % 3) + 1}`} key={i}>
                    <div className="q">“</div>
                    <p>{rv.text}</p>
                    <div className="who">
                      <div className="av" />
                      <div>
                        <div className="lo">{rv.meta}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="cap">
                ※ 동의·검증된 실제 해외환자 후기만 게재합니다.
              </p>
            </>
          ) : (
            <div className="rev-pending">
              동의·검증된 <b>실제 해외환자 후기</b>를 준비 중입니다.
              <br />
              먼저 다녀간 분들의 이야기는 곧 이곳에서 만나보실 수 있습니다.
            </div>
          )}
        </div>
      </section>

      {/* 안전 */}
      <section className="sec safe">
        <div className="wrap">
          <div className="r d1">
            <div className="eyebrow">09 — Safety &amp; After-care</div>
            <h2 className="stitle" style={{ marginTop: 18 }}>
              귀국 후에도,
              <br />
              끝까지 곁에 있습니다
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              해외 환자가 가장 걱정하는 것은 ‘다녀온 뒤’입니다. 병원과
              열정의시간이 사후관리까지 책임집니다.
            </p>
          </div>
          <div className="safelist r d2">
            <div className="s">
              <div className="n">01</div>
              <div className="c">
                <h4>부작용 대응 프로토콜</h4>
                <p>
                  이상 반응 시 즉시 연결되는 대응 체계. 통역과 함께 빠르게
                  안내합니다.
                </p>
              </div>
            </div>
            <div className="s">
              <div className="n">02</div>
              <div className="c">
                <h4>귀국 후 비대면 팔로업</h4>
                <p>
                  돌아가신 뒤에도 컨시어지를 통해 경과를 확인하고 관리를
                  안내합니다.
                </p>
              </div>
            </div>
            <div className="s">
              <div className="n">03</div>
              <div className="c">
                <h4>정품·정량 투명성</h4>
                <p>
                  사용 제품과 처치를 투명하게. 과하지 않은 정량의 원칙을
                  지킵니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 컨시어지 */}
      <section className="sec conc">
        <div className="wrap">
          <div className="eyebrow">10 — Concierge by 열정의시간</div>
          <h2 className="stitle" style={{ marginTop: 18 }}>
            처음 문의부터 사후관리까지,
            <br />
            한 번에 케어합니다
          </h2>
          <div className="steps">
            {[
              ["1", "문의", "선호 언어 채널로 편하게 연락"],
              ["2", "상담", "통역과 함께 1:1 맞춤 상담"],
              ["3", "견적", "동일 수가 기준 투명 견적"],
              ["4", "방한", "일정·이동·통역 동행 설계"],
              ["5", "시술", "전 과정 통역과 함께"],
              ["6", "사후", "귀국 후 비대면 팔로업"],
            ].map(([n, t, d]) => (
              <div className="step r d2" key={n}>
                <div className="dot">{n}</div>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec faq">
        <div className="wrap">
          <div className="eyebrow">11 — FAQ</div>
          <h2 className="stitle" style={{ marginTop: 18, marginBottom: 20 }}>
            자주 묻는 질문
          </h2>
          {[
            [
              "비자나 체류 기간은 어떻게 준비하나요?",
              "시술과 회복 일정에 맞춰 권장 체류일을 미리 안내드리고, 필요한 서류 준비도 컨시어지가 함께 챙깁니다.",
            ],
            [
              "결제는 어떤 방식이 가능한가요?",
              "가능한 결제 수단과 절차를 상담 단계에서 투명하게 안내합니다. 동일 수가 원칙, 숨은 비용은 없습니다.",
            ],
            [
              "통역은 따로 구해야 하나요?",
              "아니요. 일본어·중국어·대만(번체)·영어 통역이 상담부터 시술, 사후관리까지 동행합니다.",
            ],
            [
              "귀국 후 문제가 생기면 어떻게 하나요?",
              "컨시어지를 통한 비대면 팔로업으로 경과를 확인하고, 필요한 대응을 신속히 안내합니다.",
            ],
          ].map(([q, a], i) => (
            <div className={`faqitem r d${(i % 4) + 1}`} key={i}>
              <div className="l">
                <div className="q">{q}</div>
                <div className="a">{a}</div>
              </div>
              <span className="plus">+</span>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sec final" id="cta">
        <div className="wrap">
          <h2>
            지금, <em>열정의시간</em>과
            <br />
            이야기 나누세요
          </h2>
          <p>
            병원에 직접 연락하지 않으셔도 됩니다. 상담·예약·일정·통역까지 —
            열정의시간이 1:1로 안내합니다.
          </p>
          <div className="chs">
            {CHANNELS.map((c, i) => (
              <div className="ch" key={i}>
                <span className="d" style={{ background: c.bg, color: c.fg }}>
                  {c.d}
                </span>
                {c.label}
              </div>
            ))}
          </div>
          <a className="big" href={KAKAO} target="_blank" rel="noopener">
            열정의시간 컨시어지 상담 시작
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <div className="b">열정의시간 · MEDICAL CONCIERGE</div>
          <div className="t">
            본 페이지는{" "}
            <b>열정의시간(보건복지부 외국인환자 유치업 등록기관)</b>이 운영하는
            협력병원 안내 페이지입니다. 모든 상담·예약은 열정의시간 컨시어지를
            통해 진행되며, 병원 직접 연락처·가격은 표시하지 않습니다. © Time of
            Passion
          </div>
        </div>
      </footer>

      {/* FLOATING CONCIERGE (데스크탑) */}
      <aside className="float">
        <div className="pin">📌 스크롤 내내 고정</div>
        <div className="card">
          <h4>
            예약·상담은
            <br />
            열정의시간이 1:1로
          </h4>
          <div className="en">Ask Time of Passion</div>
          {CHANNELS.map((c, i) => (
            <div className="ch" key={i}>
              <span className="d" style={{ background: c.bg, color: c.fg }}>
                {c.d}
              </span>
              {c.label}
            </div>
          ))}
          <a className="go" href={KAKAO} target="_blank" rel="noopener">
            1:1 문의하기
          </a>
        </div>
      </aside>

      {/* MOBILE BOTTOM BAR */}
      <div className="mobbar">
        <div className="lab">
          예약·상담은 <b>열정의시간</b>이 1:1로 안내합니다
        </div>
        <a className="go" href={KAKAO} target="_blank" rel="noopener">
          문의하기
        </a>
      </div>
    </div>
  );
}
