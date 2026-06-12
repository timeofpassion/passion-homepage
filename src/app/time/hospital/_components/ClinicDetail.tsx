import Link from "next/link";
import type { Clinic } from "../_data/clinics";
import { CATEGORY_LABEL } from "../_data/clinics";

export default function ClinicDetail({
  lang,
  clinic,
}: {
  lang: string;
  clinic: Clinic;
}) {
  const lt = clinic.localTrust;
  const areaShort = clinic.location.areaHint.replace(/^서울 강남 · /, "");
  return (
    <>
      <header className="mt-head">
        <div className="hd-in in">
          <div className="logo">
            열정의시간<i>.</i>
            <span>MEDICAL CONCIERGE</span>
          </div>
          <Link
            href={`/time/hospital/${lang}`}
            className="back"
            aria-label="목록으로"
          >
            ←
          </Link>
        </div>
      </header>

      <div className="d-grid">
        {/* 좌측 요약 (데스크탑 sticky) */}
        <aside className="d-aside">
          <div className="d-hero">
            <div className="bg" style={{ backgroundColor: clinic.tone }}>
              <div className="mono">{clinic.mono}</div>
            </div>
            <div className="hero-tag">
              {CATEGORY_LABEL[clinic.category]} · {areaShort}
            </div>
          </div>

          <div className="head-card">
            <div className="hc-cat">{clinic.catEn}</div>
            <div className="hc-sig">{clinic.signature}</div>
            <div className="hc-name">
              {clinic.name}
              {clinic.nameEn ? ` · ${clinic.nameEn}` : ""}
            </div>
            <div className="hc-badges">
              {clinic.badges.koreanPatients && (
                <div className="bdg g">✓ 한국인 환자 다수</div>
              )}
              {clinic.badges.foreignRegistered && (
                <div className="bdg">외국인환자 수용 등록</div>
              )}
              {clinic.badges.interpreter && <div className="bdg">통역 동행</div>}
            </div>
          </div>

          <div className="one-price">
            <div className="op-ic">
              ONE
              <br />
              PRICE
            </div>
            <div>
              <b>한국인 환자와 동일 수가 보증</b>
              <span>외국인 추가요금 없음 · 열정의시간 협력 기준</span>
            </div>
          </div>
        </aside>

        {/* 우측 본문 */}
        <div className="d-content">
          {/* 원장 */}
          <section>
            <div className="sec-k">Doctor</div>
            <div className="sec-title">원장님 소개</div>
            <div className="doc-card">
              <div className="doc-name">
                {clinic.doctor.name}
                <span>{clinic.doctor.title}</span>
              </div>
              <div className="doc-quote">“{clinic.doctor.quote}”</div>
              <div className="doc-tags">
                {clinic.doctor.tags.map((t) => (
                  <div className="dtag" key={t}>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 시그니처 시술 */}
          <section>
            <div className="sec-k">Signature</div>
            <div className="sec-title">이 병원이 잘하는 것</div>
            <div className="tx-list">
              {clinic.treatments.map((t, i) => (
                <div className="tx" key={i}>
                  <div className="tx-top">
                    <div className="tx-no">{i + 1}</div>
                    <b>{t.name}</b>
                  </div>
                  <p>{t.desc}</p>
                  <div className="tx-why">{t.why}</div>
                  {(t.downtime || t.duration) && (
                    <div className="tx-meta">
                      {t.downtime && <span className="tmeta">{t.downtime}</span>}
                      {t.duration && <span className="tmeta">{t.duration}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Before & After */}
          <section>
            <div className="sec-k">Before &amp; After</div>
            <div className="sec-title">시술 전후 케이스</div>
            <div className="ba-pending">
              병원이 제공한 <b>동의 받은 실제 전후 사진</b>을 준비 중입니다.
              <br />
              개인에 따라 결과는 다를 수 있습니다.
            </div>
          </section>

          {/* Local Trust */}
          {lt && (lt.naverRating || lt.koreanReviews || lt.revisitRate) && (
            <section style={{ paddingTop: 14 }}>
              <div className="trust">
                <div className="sec-k">Local Trust</div>
                <div className="sec-title">한국인은 이렇게 평가합니다</div>
                <div className="sec-sub">
                  외국인 전용 병원이 아니라는 가장 확실한 증거.
                </div>
                <div className="score-row">
                  {lt.naverRating != null && (
                    <div className="score">
                      <b>{lt.naverRating}</b>
                      <span>네이버 평점</span>
                    </div>
                  )}
                  {lt.koreanReviews != null && (
                    <div className="score">
                      <b>{lt.koreanReviews.toLocaleString()}+</b>
                      <span>한국인 리뷰</span>
                    </div>
                  )}
                  {lt.revisitRate != null && (
                    <div className="score">
                      <b>{lt.revisitRate}%</b>
                      <span>재방문율</span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* 위치 */}
          <section>
            <div className="sec-k">Visit</div>
            <div className="sec-title">위치 · 내원 안내</div>
            <div className="loc-card">
              <b>{clinic.location.areaHint}</b>
              <div className="ln">
                지하철역 도보권 · {clinic.location.fromAirport}
              </div>
              <div className="muted">
                정확한 위치는 컨시어지 예약 확정 시 안내되며, 통역 매니저가
                현장에서 동행합니다.
              </div>
            </div>
          </section>

          <div className="foot">
            본 병원의 모든 예약·상담·안내는 열정의시간 컨시어지를 통해서만
            진행됩니다.
            <br />
            열정의시간 · 보건복지부 외국인환자 유치업 등록기관
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-bar">
        <div className="cta-in in">
          <div className="cta-note">
            컨시어지 <b>무료</b> · 한국인과 동일 수가 · 보건복지부 등록기관
          </div>
          <button className="cta-btn" type="button">
            카카오톡으로 무료 상담하기 <span className="sub">KakaoTalk</span>
          </button>
        </div>
      </div>
    </>
  );
}
