"use client";

import { useState, type ReactNode } from "react";
import type { ScanResult, ScanSpan } from "@/lib/ad-review/engine";
import "./ad-check.css";

interface AiFinding {
  sentence: string;
  article: string;
  reason: string;
  fix: string;
  risk: "high" | "medium" | "low";
}
interface CheckResponse {
  rule: ScanResult;
  ai: { findings: AiFinding[]; comment: string } | null;
  error?: string;
}

const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";

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
  const [submitted, setSubmitted] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CheckResponse | null>(null);
  const [error, setError] = useState("");

  async function handleCheck() {
    const value = text.trim();
    if (!value) {
      setError("검수할 문구를 입력해 주세요.");
      return;
    }
    setError("");
    setLoading(true);
    setData(null);
    try {
      const res = await fetch("/api/ad-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value }),
      });
      const json = (await res.json()) as CheckResponse;
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
  const ai = data?.ai;

  return (
    <div className="adc-root">
      {/* HERO */}
      <div className="adc-top">
        <div className="adc-wrap">
          <div className="adc-brand">
            <span className="dot" /> 열정의시간
            <span className="muted">· 의료광고 자가검수</span>
          </div>
          <h1 className="adc-title">
            게시 전 30초, 의료광고 위반을 <span className="em">문장 단위</span>로 잡아냅니다
          </h1>
          <p className="adc-lede">
            블로그 원고·이벤트 문구·SNS 스크립트를 붙여넣으면 — 어느 문장이 왜 걸리는지, 어떤 조항에 저촉되는지,
            그리고 <b>바로 바꿔 쓸 수 있는 수정문안</b>까지 나옵니다. 로그인 없이 바로.
          </p>
          <div className="adc-legend">
            <span className="adc-chip"><span className="k k-red" /> 위험 · 게시 시 처벌 위험</span>
            <span className="adc-chip"><span className="k k-amber" /> 주의 · 조건 충족 시 통과</span>
            <span className="adc-chip"><span className="k k-green" /> 안전 · 명백한 위반 없음</span>
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
            <div className="adc-actions">
              <button className="adc-btn" onClick={handleCheck} disabled={loading}>
                {loading ? <><span className="spin" /> 검수 중...</> : "검수하기"}
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
          </div>

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
                    위반 추정 {rule.violations.length}건
                    {rule.counts.high > 0 && ` · 위험 ${rule.counts.high}`}
                    {rule.counts.medium > 0 && ` · 주의 ${rule.counts.medium}`}
                    {rule.counts.gray > 0 && ` · 조건부 ${rule.counts.gray}`}
                  </small>
                </div>
                <div className="adc-score">
                  <div className="n">{rule.violations.length}</div>
                  <small>지적 건</small>
                </div>
              </div>

              {rule.violations.length > 0 ? (
                <>
                  <div className="adc-sechead">
                    <span className="idx">1단</span>
                    <h3>룰베이스 검수 — 명백한 위반</h3>
                    <span className="tail">붉은 표시 위험 · 노란 표시 조건부</span>
                  </div>
                  {submitted && (
                    <div className="adc-echo">{highlight(submitted, rule.spans)}</div>
                  )}
                  <div className="adc-cards" style={{ marginTop: 12 }}>
                    {rule.violations.map((v) => (
                      <div key={v.id} className={`adc-vcard r-${v.risk}`}>
                        <div className="vtop">
                          <span className="art">{v.article}</span>
                          <span className="lbl">{v.label}</span>
                          <span className="rtag">{riskWord(v.risk)}</span>
                        </div>
                        {v.matches.length > 0 ? (
                          <div className="quote">
                            {v.matches.map((m, i) => (
                              <span key={i}>
                                {i > 0 && " · "}
                                <em>{m}</em>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="reason">{v.reason}</div>
                        )}
                        {v.matches.length > 0 && <div className="reason">{v.reason}</div>}
                        {v.allowCond && <div className="cond">통과 조건: {v.allowCond}</div>}
                        <div className="fix">
                          <div className="fl"><span className="d" /> 수정문안</div>
                          <div className="ftx">{v.fix}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="adc-empty">명백한 금지 표현은 발견되지 않았습니다. 아래 AI 문맥 판정도 함께 확인하세요.</div>
              )}

              {/* 2단 — AI 문맥판정 */}
              {ai && (
                <>
                  <div className="adc-sechead">
                    <span className="idx">2단</span>
                    <h3>AI 문맥 판정 — 회색지대</h3>
                    <span className="tail">문맥이 필요한 후기·명칭·은근한 과장</span>
                  </div>
                  <div className="adc-ai">
                    <div className="adc-ai-head">
                      <span className="g" />
                      <b>AI 문맥 검토</b>
                      <small>법 기준에 대조한 결과</small>
                    </div>
                    <div className="adc-ai-body">
                      {ai.comment && <div className="comment">{ai.comment}</div>}
                      {ai.findings.length > 0 ? (
                        <div className="adc-cards">
                          {ai.findings.map((f, i) => (
                            <div key={i} className={`adc-vcard r-${f.risk === "low" ? "gray" : f.risk}`}>
                              <div className="vtop">
                                {f.article && <span className="art">{f.article}</span>}
                                <span className="lbl">{riskWord(f.risk)}</span>
                              </div>
                              <div className="quote"><em>{f.sentence}</em></div>
                              {f.reason && <div className="reason">{f.reason}</div>}
                              {f.fix && (
                                <div className="fix">
                                  <div className="fl"><span className="d" /> 수정문안</div>
                                  <div className="ftx">{f.fix}</div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="adc-ai-none">문맥상 추가로 발견된 위반은 없습니다.</div>
                      )}
                    </div>
                  </div>
                </>
              )}

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
                <a className="adc-kakao" href={KAKAO_URL} target="_blank" rel="noopener noreferrer">
                  카카오톡 채널로 문의하기
                </a>
                <a className="adc-home" href="/time">열정의시간 홈페이지</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="adc-foot">
        <div className="adc-wrap">
          <div className="co">열정의<span>시간</span></div>
          <div className="fine">
            의료광고 자가검수 도구는 의료법 제56조·제27조·제57조 및 보건복지부 가이드를 근거로 AI 기반 참고 결과를 제공합니다.
            법적 효력은 없으며 최종 판단·게시 책임은 게시자에게 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
