"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  CATEGORY_TAGS,
  type Clinic,
  type ClinicCategory,
} from "../_data/clinics";

const HERO_SLIDES = [
  {
    eyebrow: "Korea Medical Concierge",
    title: (
      <>
        한국인이 다니는 병원에,
        <br />
        <b>한국인과 같은 기준</b>으로.
      </>
    ),
    desc: "외국인 전용 병원이 아닌, 한국인 환자가 선택하는 병원만 엄선합니다.",
  },
  {
    eyebrow: "Private Concierge",
    title: (
      <>
        문의부터 귀국 후까지,
        <br />
        전담 매니저가 <b>동행</b>합니다.
      </>
    ),
    desc: "모국어 상담, 통역 동행, 사후관리. 컨시어지 비용은 무료입니다.",
  },
  {
    eyebrow: "One Price Policy",
    title: (
      <>
        국내와 해외, 수가가 다른 병원과는
        <br />
        <b>일하지 않습니다.</b>
      </>
    ),
    desc: "모든 협력병원은 한국인 환자와 같은 가격으로 진료합니다.",
  },
];

const CRITERIA = [
  ["I", "국내·해외 동일 수가", "외국인 추가요금이 있는 병원은 제외 — 예외 없음"],
  ["II", "외국인환자 수용 의료기관 등록", "한국 정부 공식 등록 기관만"],
  ["III", "한국인 환자 비중", "현지인이 실제로 선택하고 재방문하는 병원"],
  ["IV", "의료진 전문 경력", "해당 분야 시술 경력과 건수를 직접 확인"],
  ["V", "마케팅 파트너로서의 내부 검증", "함께 일하며 실력을 확인한 병원만"],
];

const STEPS = [
  ["01", "채팅으로 문의", "LINE · WeChat · WhatsApp · 카카오톡 — 모국어로 상담"],
  ["02", "병원 매칭 · 견적", "고민에 맞는 병원 1–3곳, 한국인 동일 가격으로"],
  ["03", "예약 확정", "일정 · 통역 · 이동까지 한 번에"],
  ["04", "내원 동행", "전담 통역이 진료 전 과정 동행"],
  ["05", "사후관리", "귀국 후에도 채팅으로 경과 케어"],
];

const HERO_DUR = 5400;

export default function Directory({
  lang,
  clinics,
}: {
  lang: string;
  clinics: Clinic[];
}) {
  const [slide, setSlide] = useState(0);
  const [prog, setProg] = useState(0);
  const startRef = useRef<number>(0);

  // 히어로 자동 롤링 + 진행 바
  useEffect(() => {
    let raf = 0;
    startRef.current = performance.now();
    const tick = (now: number) => {
      const el = Math.min((now - startRef.current) / HERO_DUR, 1);
      setProg(el * 100);
      if (el >= 1) {
        setSlide((s) => (s + 1) % HERO_SLIDES.length);
        startRef.current = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 등장 카테고리(빈 카테고리 탭 숨김)
  const categories = useMemo(() => {
    const present = new Set(clinics.map((c) => c.category));
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, [clinics]);

  const [cat, setCat] = useState<ClinicCategory | "all">("all");
  const [tag, setTag] = useState<string | null>(null);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: clinics.length };
    clinics.forEach((c) => (m[c.category] = (m[c.category] || 0) + 1));
    return m;
  }, [clinics]);

  const tagOptions = cat === "all" ? [] : CATEGORY_TAGS[cat];

  const visible = clinics.filter(
    (c) =>
      (cat === "all" || c.category === cat) && (!tag || c.tags.includes(tag)),
  );

  const pickCat = (c: ClinicCategory | "all") => {
    setCat(c);
    setTag(null);
  };

  return (
    <>
      <header className="mt-head">
        <div className="hd-in">
          <div className="logo">
            열정의시간<i>.</i>
            <span>MEDICAL CONCIERGE</span>
          </div>
          <div className="hd-lang">한국어</div>
        </div>
      </header>

      <div className="wrap">
        {/* 히어로 롤링 */}
        <div className="hero">
          {HERO_SLIDES.map((s, i) => (
            <div className={`slide ${i === slide ? "on" : ""}`} key={i}>
              <div
                className="bgimg"
                style={{
                  backgroundColor: ["#14352c", "#0e4a3f", "#13302a"][i],
                }}
              />
              <div className="eyebrow">{s.eyebrow}</div>
              <h1>{s.title}</h1>
              <p>{s.desc}</p>
            </div>
          ))}
          <div className="hero-rule" />
          <div className="hero-prog" style={{ width: `${prog}%` }} />
          <div className="hero-foot">
            <span>보건복지부 유치업 등록기관</span>
            <span>
              {String(slide + 1).padStart(2, "0")} — 0{HERO_SLIDES.length}
            </span>
          </div>
        </div>

        {/* 신뢰 스트립 */}
        <div className="trust-strip">
          <div className="ts-in">
            <div className="ts">
              <b>13년</b>의료 마케팅
            </div>
            <div className="ts">
              <b>50+</b>파트너 병원 경험
            </div>
            <div className="ts">
              <b>4개국</b>전담 컨시어지
            </div>
          </div>
        </div>

        {/* 회사 소개 + One Price 서약 */}
        <section className="story">
          <div className="sec-k">About Us</div>
          <div className="story-quote">
            우리는 병원을 소개하는 회사가 아니라,
            <br />
            병원과 <b>함께 일해 온</b> 회사입니다.
          </div>
          <p>
            열정의시간은 13년간 한국 병원들의 마케팅을 만들어 온 회사입니다. 누가
            어떤 시술을 잘하는지, 어떤 병원에 한국인 환자가 돌아오는지 — 광고가
            아니라 데이터로 알고 있습니다.
          </p>

          <div className="pledge">
            <div className="pledge-k">Our One Price Pledge</div>
            <div className="pledge-t">
              국내와 해외 환자의 수가가 다른 병원은
              <br />
              <b>선택하지 않습니다.</b>
            </div>
            <div className="pledge-p">
              외국인이라는 이유로 더 내는 가격은 없습니다.
              <br />
              한국인 환자와 동일한 수가를 약속하는 병원만
              <br />
              열정의시간의 협력병원이 됩니다.
            </div>
          </div>

          <div className="criteria">
            {CRITERIA.map(([n, t, s]) => (
              <div className="cri" key={n}>
                <div className="cri-n">{n}.</div>
                <div>
                  <b>{t}</b>
                  <span>{s}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="story-sign">
            <span>
              <b>한동남</b> · 열정의시간 대표
            </span>
            <span>Time of Passion</span>
          </div>
        </section>

        {/* 정식 등록기관 */}
        <section className="cert-sec">
          <div className="sec-k">Government Licensed</div>
          <div className="sec-title">
            보건복지부가 승인한
            <br />
            정식 유치기관입니다
          </div>
          <div className="sec-sub">
            대한민국에서 외국인 환자 유치는 정부에 등록된 기관만 할 수 있습니다.
            열정의시간은 의료해외진출법에 따라 등록을 마친 합법 유치업자입니다.
          </div>

          <div className="cert">
            <div className="cert-gov">대한민국 보건복지부</div>
            <div className="cert-title">외국인환자 유치업 등록증</div>
            <div className="cert-no">등록번호 제 ○○○○-○○ 호</div>
            <div className="cert-body">
              <div className="cert-row">
                <b>상호</b>
                <span>열정의시간 (Time of Passion)</span>
              </div>
              <div className="cert-row">
                <b>대표자</b>
                <span>한동남</span>
              </div>
              <div className="cert-row">
                <b>등록구분</b>
                <span>외국인환자 유치업자</span>
              </div>
              <div className="cert-row">
                <b>근거법령</b>
                <span>의료 해외진출 및 외국인환자 유치 지원에 관한 법률</span>
              </div>
            </div>
            <div className="cert-ph">실제 등록증 스캔 이미지로 교체 예정</div>
          </div>

          <div className="cert-legal">
            등록 유치기관을 통한 진료만이 법의 보호를 받습니다. 무등록 브로커를
            통한 유치는 한국에서 <b>불법</b>이며, 문제 발생 시 구제가 어렵습니다.
          </div>
          <div className="cert-points">
            <div>
              <span className="cp-n">01</span>
              <span>
                등록번호는 보건복지부 메디컬코리아에서 직접 조회하실 수 있습니다
              </span>
            </div>
            <div>
              <span className="cp-n">02</span>
              <span>
                등록기관은 배상책임보험 가입 등 법정 요건을 갖추고 있습니다
              </span>
            </div>
            <div>
              <span className="cp-n">03</span>
              <span>모든 협력병원 또한 외국인환자 수용 등록 의료기관입니다</span>
            </div>
          </div>
        </section>

        {/* 병원 찾기 */}
        <div className="finder">
          <div className="finder-head">
            <div className="sec-k">Find Your Clinic</div>
            <div className="sec-title">엄선 협력병원</div>
            <div className="sec-sub">
              다섯 가지 기준을 통과한 병원만 이 페이지에 올라옵니다.
            </div>
          </div>

          <div className="cat-bar">
            <div className="cat-scroll">
              <button
                className={`ctab ${cat === "all" ? "on" : ""}`}
                onClick={() => pickCat("all")}
              >
                전체<span className="n">{counts.all}</span>
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  className={`ctab ${cat === c ? "on" : ""}`}
                  onClick={() => pickCat(c)}
                >
                  {CATEGORY_LABEL[c]}
                  <span className="n">{counts[c] || 0}</span>
                </button>
              ))}
            </div>
          </div>

          {tagOptions.length > 0 && (
            <div className="tag-zone">
              <div className="tag-scroll">
                {tagOptions.map((t) => (
                  <button
                    key={t}
                    className={`ttag ${tag === t ? "on" : ""}`}
                    onClick={() => setTag(tag === t ? null : t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="result-row">
            <b>
              협력병원 <em>{visible.length}</em>
            </b>
            {(cat !== "all" || tag) && (
              <button className="reset" onClick={() => pickCat("all")}>
                초기화
              </button>
            )}
          </div>

          {visible.length > 0 ? (
            <div className="cards">
              {visible.map((c) => (
                <Link
                  key={c.slug}
                  href={`/time/hospital/${lang}/${c.slug}`}
                  className="card"
                >
                  <div
                    className="card-img"
                    style={{ backgroundColor: c.tone }}
                  >
                    <div className="mono">{c.mono}</div>
                  </div>
                  <div className="card-cat">{c.catEn}</div>
                  <div className="sig">{c.signature}</div>
                  <div className="clinic-name">{c.name}</div>
                  <div className="card-tags">
                    <b>{c.mainTag}</b> · {c.tags.slice(0, 2).join(" · ")}
                  </div>
                  <div className="card-foot">{c.cardFoot}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty">
              조건에 맞는 병원이 아직 없습니다.
              <br />
              컨시어지에 문의하시면 직접 찾아드립니다.
            </div>
          )}
        </div>

        {/* 후기 */}
        <section className="reviews-sec">
          <div className="sec-k">Patient Stories</div>
          <div className="sec-title">다녀간 분들의 이야기</div>
          <div className="rv-scroll">
            {[
              [
                "일본에서 LINE으로 상담하고 도착하니 통역 매니저가 병원까지 함께해줬어요. 한국 친구가 다니는 병원이라 더 안심됐습니다.",
                "Yuki · 도쿄 · 피부과",
                "2026.03",
              ],
              [
                "여행 일정 안에 진료가 끝났어요. 가격도 안내받은 그대로, 추가 비용이 전혀 없었습니다.",
                "Chia-ling · 타이베이",
                "2026.02",
              ],
              [
                "위챗으로 모든 일정이 정리됐고, 진료 당일 통역이 함께했습니다. 귀국 후 케어까지 받았어요.",
                "Wang · 상하이",
                "2026.04",
              ],
            ].map(([q, who, date], i) => (
              <div className="rv" key={i}>
                <p className="rv-q">{q}</p>
                <div className="rv-meta">
                  <span>{who}</span>
                  <span>{date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 프로세스 */}
        <section>
          <div className="sec-k">How It Works</div>
          <div className="sec-title">컨시어지 이용 방법</div>
          <div className="steps">
            {STEPS.map(([n, t, s]) => (
              <div className="step" key={n}>
                <div className="step-n">{n}</div>
                <div>
                  <b>{t}</b>
                  <span>{s}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="note">
            컨시어지 비용은 <b>무료</b>입니다. 병원에 직접 예약해도 더 저렴해지지
            않으며, 통역 동행과 사후관리는 컨시어지 예약 고객에게만 제공됩니다.
          </div>
        </section>

        <div className="foot">
          열정의시간 · 보건복지부 외국인환자 유치업 등록기관
          <br />
          본 페이지의 모든 예약과 상담은 열정의시간 컨시어지를 통해 진행됩니다.
        </div>
      </div>

      <div className="cta-bar">
        <div className="cta-in">
          <div className="cta-note">
            컨시어지 비용 <b>무료</b> · 한국인과 동일 수가 · 보건복지부 등록기관
          </div>
          <button className="cta-btn" type="button">
            카카오톡으로 무료 상담하기 <span className="sub">KakaoTalk</span>
          </button>
        </div>
      </div>
    </>
  );
}
