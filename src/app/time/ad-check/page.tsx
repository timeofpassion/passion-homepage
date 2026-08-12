"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { ScanResult, ScanSpan } from "@/lib/ad-review/engine";
import LeadForm from "./LeadForm";
import TalingCard from "./TalingCard";
import { KAKAO_URL, BOOKING_URL, TALING_URL } from "./links";
import "./ad-check.css";

interface CheckResponse {
  rule: ScanResult;
  error?: string;
}

/** 매체 — 사전심의 대상 판정(11호)에 쓰인다. 문구만으로는 판정 불가한 절차 조항이라 매체로 본다. */
const MEDIA = ["블로그", "인스타", "홈페이지", "이벤트배너", "유튜브", "현수막전단"] as const;

// ai-tells-ignore — 의료광고법 위반 예시 문구. 상투어가 들어 있어야 검수 데모가 성립한다.
const SAMPLE = `강남 최고의 리프팅! 단 한 번 시술로 100% 완벽한 리프팅 효과, 부작용 없이 5년 이상 유지됩니다. 이번 달 선착순 20명 50% 파격 할인 이벤트! 실제 시술받은 후기 보고 결정하세요.`;

function riskWord(r: "high" | "medium" | "gray" | "low"): string {
  if (r === "high") return "위험";
  if (r === "low") return "안전";
  return "주의";
}

function highlight(text: string, spans: ScanSpan[]): ReactNode {
  if (!spans || spans.length === 0) return text;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  spans.forEach((s, i) => {
    if (s.start < cursor) return; // 겹치는 구간은 건너뛴다
    if (s.start > cursor) nodes.push(text.slice(cursor, s.start));
    const cls = s.risk === "high" ? "h" : s.risk === "medium" ? "m" : "g";
    nodes.push(
      <mark key={i} className={cls}>
        {text.slice(s.start, s.end)}
      </mark>,
    );
    cursor = Math.max(cursor, s.end);
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export default function AdCheckPage() {
  const [text, setText] = useState("");
  const [media, setMedia] = useState<string>("블로그");
  const [submitted, setSubmitted] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CheckResponse | null>(null);
  const [error, setError] = useState("");
  // 이 도구는 검수 1건마다 실제 AI 비용이 나간다. 그걸 숨기지 않고 남은 횟수로 보여준다.
  const [quota, setQuota] = useState<{ remaining: number; cap: number } | null>(null);
  const [soldOut, setSoldOut] = useState(false);

  useEffect(() => {
    fetch("/api/ad-check")
      .then((r) => r.json())
      .then((q) => {
        setQuota(q);
        if (q.remaining <= 0) setSoldOut(true);
      })
      .catch(() => {}); // 표시용이라 실패해도 조용히 넘어간다
  }, []);

  async function handleCheck() {
    const value = text.trim();
    if (value.length < 5) {
      setError("검수할 문구를 5자 이상 입력해 주세요.");
      return;
    }
    setError("");
    setLoading(true);
    setData(null);
    try {
      const res = await fetch("/api/ad-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value, media }),
      });
      const json = (await res.json()) as CheckResponse & {
        remaining?: number;
        cap?: number;
        soldOut?: boolean;
      };
      if (typeof json.remaining === "number" && typeof json.cap === "number") {
        setQuota({ remaining: json.remaining, cap: json.cap });
      }
      if (json.soldOut) {
        setSoldOut(true);
        return;
      }
      if (!res.ok || json.error) {
        setError(json.error || "검수 처리 중 오류가 발생했습니다.");
        return;
      }
      setSubmitted(value);
      setData(json);
    } catch {
      setError("네트워크 오류로 검수에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  const rule = data?.rule;
  // 12호(외국인환자 국내유치)에 걸렸다면 = 해외 환자를 받고 싶은 원장님이다.
  // 국내 매체엔 못 쓰지만 해외 채널은 별도 규정이고, 그건 우리가 하는 일이다. 차단이 아니라 경로 안내.
  const hasOverseas = !!rule?.violations.some((v) => v.article === "56-2-12");

  // 리드 폼에 실어 보내는 값 — 원문이 아니라 판정 메타만이다.
  // 페이지에 "입력한 문구는 저장되지 않습니다"라고 써놨고, 그 약속을 여기서 깨지 않는다.
  const leadSummary = rule
    ? {
        media,
        risk: rule.overallRisk,
        riskLabel: rule.riskLabel,
        violationCount: rule.violations.length,
        articles: rule.violations.map((v) => v.law),
      }
    : null;

  return (
    <div className="adc-root">
      {/* HERO */}
      <div className="adc-top">
        <div className="adc-wrap">
          <div className="adc-brand">
            <span className="dot">열</span> 열정의시간
            <span className="muted">의료광고 자가검수</span>
          </div>
          {/* 후킹은 "이걸 안 보면 뭘 잃는가"에서 나온다. 기능 설명(문장 단위 검수)은 그 아래로 내린다. */}
          <span className="adc-eyeb">의료법 제56조 제2항 · 14개 금지유형</span>
          <h1 className="adc-title">
            문구 하나로 <span className="em">업무정지 1~2개월</span>, 사진 한 장으로 계정정지.
            <span className="sm">게시 전 30초, 어느 문장이 왜 걸리는지 · 어떻게 고쳐 쓰면 되는지까지 나옵니다.</span>
          </h1>
          <div className="adc-proof">
            <span>정답지 <b>100건</b> 실측 정확도 <b>90%</b></span>
            {/* "무료"라고만 쓰면 공짜인 줄 안다. 하루치가 정해져 있다는 걸 숫자로 보여준다. */}
            <span>
              {quota
                ? <>오늘 남은 무료 검수 <b>{quota.remaining}/{quota.cap}회</b></>
                : <>로그인 없이 <b>무료</b></>}
            </span>
            <span>입력 문구 <b>저장 안 함</b></span>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="adc-main">
        <div className="adc-wrap">
          <div className="adc-panel">
            <div className="adc-panel-head">
              <h2>검수할 문구를 붙여넣으세요</h2>
              <span className="cnt">{text.length.toLocaleString()}자</span>
            </div>
            <textarea
              className="adc-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="예) 강남 최고의 리프팅! 100% 완벽한 효과, 부작용 없이 5년 유지. 선착순 50% 할인 이벤트..."
              maxLength={12000}
            />
            <div className="adc-media">
              <span className="lb">게시할 매체</span>
              {MEDIA.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`adc-mchip ${media === m ? "on" : ""}`}
                  onClick={() => setMedia(m)}
                  disabled={loading}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="adc-actions">
              {/* 소진 상태에서 버튼이 살아 있으면 눌러도 아무 일이 안 일어나 먹통으로 읽힌다 */}
              <button className="adc-btn" onClick={handleCheck} disabled={loading || soldOut}>
                {loading ? <><span className="spin" /> 검수 중...</> : soldOut ? "오늘 몫 소진 — 자정에 열립니다" : "검수하기"}
              </button>
              <button
                className="adc-ghostbtn"
                onClick={() => { setText(""); setData(null); setError(""); }}
                disabled={loading}
              >
                지우기
              </button>
              <span className="adc-hint">입력한 문구는 저장되지 않습니다.</span>
            </div>
            <div className="adc-samples">
              <span className="lb">예시로 해보기</span>
              <button onClick={() => { setText(SAMPLE); setData(null); setError(""); }}>미용의료 블로그 문구 넣기</button>
            </div>
            {error && <div className="adc-err">{error}</div>}
            {/* 검수하면 자료도 드린다는 걸 처음부터 알려둔다. 결과 화면에서 처음 보면 갑작스럽다. */}
            <p className="adc-bait">
              검수를 마치면 <b>의료광고 위반문구 대조표 12쪽</b>을 무료로 드립니다 —
              14개 금지유형 위반→수정 대조, 금지어가 들어 있어도 정상인 문장 20선, 게시 전 체크리스트.
            </p>
            {/* 대표 지시(2026-08-08) — 공짜가 아니라는 걸 원장님께 담백하게 알린다.
                구걸이 아니라 사실 고지다. 이 문장이 있어야 전체판 구매가 "보답"으로 읽힌다. */}
            <p className="adc-cost">
              이 검수는 문구 1건마다 AI 판독 비용이 실제로 발생합니다.
              하루 <b>{quota?.cap ?? 66}건</b>까지 열정의시간이 부담하고, 소진되면 자정에 다시 열립니다.
            </p>
          </div>

          {/* 소진 화면 — 빈 에러로 돌려보내지 않는다. 지금 답이 급한 사람에게 전체판이 답이다. */}
          {soldOut && (
            <div className="adc-soldout">
              <div className="so-eye">오늘 몫 소진</div>
              <h3>오늘 무료 검수 {quota?.cap ?? 66}회가 모두 사용됐습니다</h3>
              <p>
                검수 1건마다 나가는 AI 비용을 열정의시간이 부담하고 있어, 하루 한도를 두고 운영합니다.
                <b> 한국시간 자정에 다시 열립니다.</b>
              </p>
              <p>
                지금 확인이 급하시다면 — 이 도구가 쓰는 판단 기준 그대로가 전체판 50쪽에 문장으로 정리돼 있습니다.
                순서를 기다리지 않고 직접 대조하실 수 있습니다.
              </p>
              <TalingCard where="soldout" />
              <p className="so-alt">내일 다시 오실 생각이라면, 무료 대조표 12쪽부터 받아두세요.</p>
              <LeadForm
                variant="pdf"
                summary={{ media, risk: "none", riskLabel: "검수 전", violationCount: 0, articles: [] }}
              />
            </div>
          )}

          {/* RESULT */}
          {rule && (
            <div className="adc-result">
              <div className={`adc-light ${rule.overallRisk}`}>
                <div className="adc-lamp">
                  <i className={rule.overallRisk === "high" ? "on red" : ""} />
                  <i className={rule.overallRisk === "medium" ? "on amber" : ""} />
                  <i className={rule.overallRisk === "low" ? "on green" : ""} />
                </div>
                <div className="adc-verdict">
                  <b>{rule.riskLabel} — {rule.verdict}</b>
                  <small>
                    지적 {rule.violations.length}건
                    {rule.counts.high > 0 && ` · 위험 ${rule.counts.high}`}
                    {rule.counts.medium > 0 && ` · 주의 ${rule.counts.medium}`}
                  </small>
                </div>
                <div className="adc-score">
                  <div className="n">{rule.violations.length}</div>
                  <small>지적 건</small>
                </div>
              </div>

              {/* 색 기준표 — 히어로에 있으면 아직 볼 게 없어 자리만 차지한다. 실제로 색이 나온 뒤에 보여준다. */}
              <div className="adc-legend" style={{ margin: "0 0 14px" }}>
                <span className="adc-chip"><span className="k k-red" /> 위험 · 게시 시 처벌 위험</span>
                <span className="adc-chip"><span className="k k-amber" /> 주의 · 조건 충족 시 통과</span>
                <span className="adc-chip"><span className="k k-green" /> 안전 · 명백한 위반 없음</span>
              </div>

              {/* 매체 기반 사전심의 판정 — 11호는 문구가 아니라 매체로 본다 */}
              <div className={`adc-media-note ${rule.reviewRequired ? "req" : ""}`}>
                <b>{media}</b> · {rule.mediaNote}
              </div>

              {rule.violations.length > 0 ? (
                <>
                  <div className="adc-sechead">
                    <h3>걸린 문장과 수정문안</h3>
                    <span className="tail">붉은 표시 위험 · 노란 표시 조건부</span>
                  </div>
                  {submitted && (
                    <div className="adc-echo">{highlight(submitted, rule.spans)}</div>
                  )}
                  <div className="adc-cards" style={{ marginTop: 12 }}>
                    {rule.violations.map((v) => (
                      <div key={v.id} className={`adc-vcard r-${v.risk}`}>
                        <div className="vtop">
                          <span className="art">{v.law}</span>
                          <span className="lbl">{v.label}</span>
                          <span className="rtag">{riskWord(v.risk)}</span>
                        </div>
                        {v.matches.length > 0 && (
                          <div className="quote">
                            {v.matches.map((m, i) => (
                              <span key={i}>
                                {i > 0 && " · "}
                                <em>{m}</em>
                              </span>
                            ))}
                          </div>
                        )}
                        {v.reason && <div className="reason">{v.reason}</div>}
                        {v.allowCond && <div className="cond">통과 조건: {v.allowCond}</div>}
                        {v.fix && (
                          <div className="fix">
                            <div className="fl"><span className="d" /> 수정문안</div>
                            <div className="ftx">{v.fix}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="adc-empty">
                  의료법 제56조 제2항 위반 요소가 발견되지 않았습니다. 다만 최종 판단은 자율심의기구·전문가 확인이 필요합니다.
                </div>
              )}

              {/* 회색지대 — 차단이 아니라 통과조건 안내 */}
              {rule.grayNotes.length > 0 && (
                <div className="adc-gray">
                  <div className="gh">이렇게 하면 게시할 수 있습니다</div>
                  {rule.grayNotes.map((g, i) => (
                    <div key={i} className="gi">{g}</div>
                  ))}
                </div>
              )}

              {rule.missingDisclaimer && (
                <div className="adc-gray">
                  <div className="gh">부작용 고지문을 함께 넣으세요</div>
                  <div className="gi">{rule.standardDisclaimer}</div>
                </div>
              )}

              {/* 12호 — 차단이 아니라 해외 채널로 경로를 열어준다 */}
              {hasOverseas && (
                <div className="adc-overseas">
                  <div className="oh">국내 매체에는 쓸 수 없지만, 해외 채널은 다릅니다</div>
                  <p>
                    외국인 환자 유치 광고는 <b>국내 매체</b>에 게시할 수 없습니다(제56조 2항 12호).
                    다만 <b>샤오홍슈·LINE·일본 인스타그램·대만 유튜브 등 해외 채널은 국내 의료광고 심의 대상이 아니라 별도 규정</b>을 따릅니다.
                    열정의시간은 중국·일본·대만에서 이 채널들을 직접 운영합니다.
                  </p>
                  {/* 12호에 걸렸다 = 해외 환자를 받고 싶다 = 전체판 2부(샤오홍슈)가 정확히 그 답이다.
                      상담은 시간이 걸리지만 책은 지금 당장 답이 된다. 그래서 책을 먼저 둔다. */}
                  <TalingCard where="overseas" />
                  {leadSummary && (
                    <LeadForm variant="overseas" summary={leadSummary} />
                  )}
                  <div className="adc-cta" style={{ marginTop: 12 }}>
                    {BOOKING_URL && (
                      <a className="adc-book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                        30분 무료 상담 시간 잡기
                      </a>
                    )}
                    <a className="adc-kakao" href={KAKAO_URL} target="_blank" rel="noopener noreferrer">
                      카카오톡으로 바로 물어보기
                    </a>
                  </div>
                </div>
              )}

              {/* ① 마찰이 가장 낮은 손내밀기 — 위험도와 무관하게 항상 연다.
                  검수만 해주고 보내면 이 사람이 누구였는지 우리에겐 아무것도 안 남는다. */}
              {leadSummary && (
                <LeadForm variant="pdf" summary={leadSummary} />
              )}

              {/* ② 결과 직후 = 가장 뜨거운 순간. 여기에 문의를 붙인다. */}
              <div className="adc-hot">
                <div className="ht">
                  {rule.overallRisk === "high"
                    ? "이 문장, 심의 통과되게 다시 써드릴까요?"
                    : rule.overallRisk === "medium"
                      ? "조건을 어떻게 맞춰야 할지 애매하신가요?"
                      : "이 원고, 실제로 성과가 나게 다듬어 드릴까요?"}
                </div>
                <p>통과되는 원고 작성부터 병원 콘텐츠 운영까지 열정의시간이 대행합니다.</p>
                {/* 12호가 걸렸으면 바로 위에 해외 채널 상담 폼이 이미 떠 있다.
                    폼을 세 개 연달아 세우면 아무것도 안 채운다. 하나만 남긴다. */}
                {leadSummary && !hasOverseas && (
                  <LeadForm variant="review" summary={leadSummary} sourceText={submitted} />
                )}
                <div className="adc-cta" style={{ marginTop: 12 }}>
                  {/* 예약 링크가 있으면 그게 1순위다. 카톡은 "언젠가 답장"이고 예약은 시간이 잡힌다. */}
                  {BOOKING_URL && (
                    <a className="adc-book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                      30분 무료 상담 시간 잡기
                    </a>
                  )}
                  <a className="adc-kakao" href={KAKAO_URL} target="_blank" rel="noopener noreferrer">
                    카카오톡으로 문의하기
                  </a>
                  {!BOOKING_URL && <a className="adc-home" href="/time">열정의시간 둘러보기</a>}
                </div>
              </div>

              <div className="adc-disc">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8v5M12 16.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {rule.disclaimer}
              </div>
            </div>
          )}

          {/* 담백한 마무리 — 회사소개 + 카톡 */}
          <div className="adc-close">
            <div className="in">
              <div className="eye">MADE BY 열정의시간</div>
              <h3>이 검수 도구는 열정의시간이 만들었습니다</h3>
              <p>
                국내와 해외(중국·일본·대만)에서 병원 마케팅을 함께 운영하는 파트너입니다.
                검수 결과가 궁금하시거나 심의를 통과하는 콘텐츠 운영이 필요하시면 편하게 문의 주세요.
              </p>
              <div className="adc-cta">
                {BOOKING_URL && (
                  <a className="adc-book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    30분 무료 상담 시간 잡기
                  </a>
                )}
                <a className="adc-kakao" href={KAKAO_URL} target="_blank" rel="noopener noreferrer">
                  카카오톡 채널로 문의하기
                </a>
                <a className="adc-home" href="/time">열정의시간 홈페이지</a>
              </div>
              {/* 전체판은 유료다. 무료 12쪽을 받아본 사람에게만 조용히 알린다. */}
              {TALING_URL && (
                <p className="adc-book-note">
                  더 깊이 보시려면 —{" "}
                  <a href={TALING_URL} target="_blank" rel="noopener noreferrer">
                    병원마케팅·의료광고 실전가이드 전체 50쪽
                  </a>
                  {" "}(회색지대 FAQ 10문, 샤오홍슈 계정정지 대응, 심의 신청 실무 포함)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="adc-foot">
        <div className="adc-wrap">
          <div className="co">열정의<span>시간</span></div>
          <div className="fine">
            의료광고 자가검수 도구는 의료법 제56조·제27조·제57조 및 시행령 제23조를 근거로 AI 기반 참고 결과를 제공합니다.
            법적 효력은 없으며 최종 판단·게시 책임은 게시자에게 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
