// @ts-nocheck
"use client";
// 진단형 견적 — 병원 찾기 → 채널 확인 → 설문 → 진단 리포트 → PDF 메일
// 설계 정본 = passion-vault/_공통/인트라넷-기능카탈로그/feat-진단형견적.md · 규칙 = src/lib/diagnosis/engine.ts

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { QUESTIONS, GETS, recommend, prefillDoing } from "@/lib/diagnosis/engine";

const KAKAO = "https://pf.kakao.com/_RgYcxj/chat";
const KEYS = ["hospital", "channels", "openWhen", "countries", "pains", "openPains", "concerns", "ready", "doing", "budget", "memo"];
const CASES = { jp: ["1 → 77건", "한 성형외과 · 일본 LINE 신규 문의(5개월)"], cn: ["14 → 23건", "한 피부과 · 샤오홍슈 광고 노트 3건 뒤 주말 문의"] };
const BUDGET_LABEL = Object.fromEntries(QUESTIONS.budget.options);
const COUNTRY_LABEL = Object.fromEntries(QUESTIONS.countries.options);
const won = (n) => `${n.toLocaleString()}만`;

export default function DiagnosisPage() {
  const [st, setSt] = useState({ query: "", hospital: null, opening: false, openWhen: null, channels: null, countries: [], pains: [], openPains: [], concerns: [], ready: [], doing: [], budget: null, other: {}, memo: "" });
  const [i, setI] = useState(0);
  const [cands, setCands] = useState(null);
  const [checking, setChecking] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [contact, setContact] = useState({ phone: "", email: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);
  const scrRef = useRef(null);
  const set = (patch) => setSt((s) => ({ ...s, ...patch }));

  const keys = useMemo(
    () => KEYS.filter((k) => k === "hospital" || k === "memo" || (k === "channels" ? st.hospital && !st.opening : QUESTIONS[k] && (!QUESTIONS[k].when || QUESTIONS[k].when(st)))),
    [st],
  );
  const done = i >= keys.length;
  const k = keys[i];
  useEffect(() => { scrRef.current?.scrollTo(0, 0); }, [i]);

  // 병원 후보 검색 (입력 멈춘 뒤 0.35초)
  useEffect(() => {
    const q = st.query.trim();
    if (q.length < 2) { setCands(null); return; }
    const t = setTimeout(async () => {
      const d = await fetch(`/api/diagnosis/hospitals?q=${encodeURIComponent(q)}`).then((r) => r.json()).catch(() => ({ hospitals: [] }));
      setCands(d.hospitals ?? []);
    }, 350);
    return () => clearTimeout(t);
  }, [st.query]);

  async function runCheck(homepage, name) {
    setChecking(true);
    const d = await fetch(`/api/diagnosis/check?url=${encodeURIComponent(homepage || "")}&name=${encodeURIComponent(name || "")}`).then((r) => r.json()).catch(() => ({}));
    setSt((s) => ({ ...s, channels: { homepage, place: s.hospital?.address, quick: d.quick ?? null, blogMentions30d: d.blogMentions30d ?? null, instagram: s.channels?.instagram ?? "", youtube: s.channels?.youtube ?? "", kakao: s.channels?.kakao ?? "" } }));
    setChecking(false);
  }

  const next = () => {
    if (k === "hospital" && st.hospital && !st.opening && !st.channels) runCheck(st.hospital.homepage, st.hospital.name);
    if (k === "channels" && !st.doing.length && st.channels) {
      const ch = { ...st.channels, instagram: st.channels.instagram || st.channels.quick?.instagram, youtube: st.channels.youtube || st.channels.quick?.youtube };
      const d = prefillDoing(ch);
      if (st.channels.kakao) d.push("kakao");
      set({ doing: [...new Set(d)] });
    }
    setI((n) => n + 1);
  };
  const prev = () => setI((n) => Math.max(0, n - 1));

  const toggle = (key, v, multi) => set({ [key]: multi ? (st[key].includes(v) ? st[key].filter((x) => x !== v) : [...st[key], v]) : v });
  const canNext =
    k === "hospital" ? !!st.hospital || st.opening :
    k === "countries" ? st.countries.length > 0 || !!(st.other.countries || "").trim() :
    k === "budget" ? !!st.budget : k === "openWhen" ? !!st.openWhen : k === "channels" ? !checking : true;

  const r = done ? recommend(st) : null;

  async function submit() {
    setSending(true);
    const res = await fetch("/api/diagnosis/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hospital: { name: st.hospital?.name || st.query || "개원 예정 병원", address: st.hospital?.address || "", homepage: st.channels?.homepage || "" },
        contact,
        answers: { ...st, query: undefined, hospital: undefined },
      }),
    }).then((x) => x.json()).catch(() => ({ error: "네트워크 오류가 발생했습니다." }));
    setSending(false);
    if (res.success) { setSent(res); setSheet(false); } else alert(res.error || "잠시 후 다시 시도해 주세요.");
  }

  const steps = (
    <>
      <div className="brand"><Link href="/time/quote">열정의시간</Link><small>{Math.min(i + 1, keys.length)}/{keys.length}</small></div>
      <div className="steps">{keys.map((_, j) => <i key={j} className={j <= i ? "on" : ""} />)}</div>
      {i > 0 && <button type="button" className="back" onClick={prev}>← 이전</button>}
    </>
  );

  const renderOptions = (qk) => {
    const Q = QUESTIONS[qk];
    const val = st[qk];
    return (
      <>
        {Q.options.map(([v, t, , g], n) => (
          <div key={v}>
            {g && g !== (Q.options[n - 1] || [])[3] && <div className="grp">{g}</div>}
            <button type="button" className={`opt ${Q.multi ? "" : "radio"} ${(Q.multi ? val.includes(v) : val === v) ? "on" : ""}`} onClick={() => toggle(qk, v, Q.multi)} aria-pressed={Q.multi ? val.includes(v) : val === v}>
              <i aria-hidden>✓</i><span>{t}</span>
            </button>
          </div>
        ))}
        {Q.multi && val.length > 0 && <p className="picked">{val.length}개 선택됨</p>}
        {qk === "doing" && st.channels && <p className="qs note">확인된 채널은 미리 선택해 두었습니다. 필요한 항목만 수정해 주세요</p>}
        {Q.other && (
          <input id={`other-${qk}`} className={`other ${st.other[qk] ? "on" : ""}`} placeholder={Q.other} value={st.other[qk] || ""} onChange={(e) => set({ other: { ...st.other, [qk]: e.target.value } })} />
        )}
      </>
    );
  };

  let body;
  if (sent) {
    body = (
      <div className="sent">
        <div className="r-eyebrow">접수 완료</div>
        <p className="q">{contact.email}로<br />진단 리포트를 보냈습니다</p>
        <p className="qs">{sent.emailSent ? "메일함을 확인해 주세요. 담당자가 병원 상황을 확인한 뒤 맞춤 제안서와 견적서를 이어서 보내드립니다." : "접수는 완료됐지만 메일 발송이 지연되고 있습니다. 담당자가 확인 후 연락드리겠습니다."}</p>
        <a className="btn kakao" href={KAKAO} target="_blank" rel="noopener noreferrer">카카오톡으로 바로 상담</a>
        <Link className="later" href="/time/quote">서비스 직접 둘러보기 →</Link>
      </div>
    );
  } else if (!done && k === "hospital") {
    body = (
      <>
        {steps}
        <p className="q">병원명을 입력해 주세요</p>
        <p className="qs">네이버에 등록된 병원 중 주소를 확인해 선택해 주세요</p>
        <input id="hospital-query" className="other on" placeholder="병원명 입력" value={st.query} autoComplete="off" onChange={(e) => set({ query: e.target.value, hospital: null, channels: null, doing: [] })} />
        <div className="list">
          {cands === null ? null : cands.length ? cands.map((c, n) => (
            <button key={n} type="button" className={`opt radio ${st.hospital?.name === c.name && st.hospital?.address === c.address ? "on" : ""}`} onClick={() => set({ hospital: c, opening: false, channels: null, doing: [] })}>
              <i aria-hidden>✓</i><span>{c.name}<small>{c.address}{c.category ? ` · ${c.category}` : ""}</small></span>
            </button>
          )) : <p className="qs">검색 결과가 없습니다. 아래 「검색 결과에 없습니다」를 선택해 주세요</p>}
        </div>
        <div className="alt2">
          <button type="button" className={`opt ${st.opening ? "on" : ""}`} onClick={() => set({ opening: !st.opening, hospital: null, channels: null })}><i aria-hidden>✓</i><span>개원 예정입니다</span></button>
          <button type="button" className={`opt ${st.hospital?.manual ? "on" : ""}`} onClick={() => set({ hospital: st.hospital?.manual ? null : { name: st.query.trim() || "", address: "", homepage: "", manual: true }, opening: false, channels: null })}><i aria-hidden>✓</i><span>검색 결과에 없습니다</span></button>
        </div>
      </>
    );
  } else if (!done && k === "channels") {
    const ch = st.channels;
    const q = ch?.quick;
    const row = (label, value, state, field) => (
      <div className={`chrow ${state}`} key={label}>
        <div>
          <small>{label}</small>
          {state === "ask" ? (
            <input id={`ch-${field}`} className="other" placeholder="계정 또는 주소 (선택)" value={ch?.[field] || ""} onChange={(e) => set({ channels: { ...ch, [field]: e.target.value } })} />
          ) : <b>{value}</b>}
        </div>
        <span>{state === "found" ? "확인됨" : state === "wait" ? "확인 중" : state === "none" ? "확인 못 함" : "선택 입력"}</span>
      </div>
    );
    body = (
      <>
        {steps}
        <p className="q">{st.hospital?.name}<br />채널 정보를 확인해 주세요</p>
        <p className="qs">확인된 정보는 미리 입력했습니다. 다르거나 비어 있는 항목만 수정해 주세요</p>
        {checking || !ch ? row("홈페이지", "확인 중입니다…", "wait") : (
          <div className={`chrow ${q ? "found" : "ask"}`}>
            <div>
              <small>홈페이지</small>
              {q ? <b>{q.url}</b> : (
                <div className="inline">
                  <input id="ch-homepage" className="other" placeholder="홈페이지 주소 (선택)" value={ch.homepageInput ?? ch.homepage ?? ""} onChange={(e) => set({ channels: { ...ch, homepageInput: e.target.value } })} />
                  <button type="button" className="mini" onClick={() => runCheck(ch.homepageInput, st.hospital?.name)}>확인</button>
                </div>
              )}
            </div>
            <span>{q ? "확인됨" : "선택 입력"}</span>
          </div>
        )}
        {st.hospital?.address && row("네이버 플레이스", st.hospital.address, "found")}
        {!checking && ch && row("블로그 언급 (최근 30일)", typeof ch.blogMentions30d === "number" ? `${ch.blogMentions30d}건` : "", typeof ch.blogMentions30d === "number" ? "found" : "none")}
        {!checking && ch && row("인스타그램", "홈페이지에 연결됨", q?.instagram ? "found" : "ask", "instagram")}
        {!checking && ch && row("유튜브", "홈페이지에 연결됨", q?.youtube ? "found" : "ask", "youtube")}
        {!checking && ch && row("카카오톡 채널", "홈페이지에 연결됨", q?.kakao ? "found" : "ask", "kakao")}
        {q && <p className="qs note">홈페이지 첫 화면에서 외국어 페이지·예약·측정 도구 설치 여부를 확인했습니다</p>}
      </>
    );
  } else if (!done && k === "memo") {
    body = (
      <>
        {steps}
        <p className="q">추가로 전달하실 내용이 있으신가요?</p>
        <p className="qs">주력 시술, 희망 시작 시기, 이전 대행사 이용 시 아쉬웠던 점 등을 적어 주세요 (선택)</p>
        <textarea id="memo" className="other" placeholder="예: 신규 리프팅 장비를 11월 전에 알리고 싶습니다. 이전 대행사는 성과 보고가 부족했습니다." value={st.memo} onChange={(e) => set({ memo: e.target.value })} />
      </>
    );
  } else if (!done) {
    const Q = QUESTIONS[k];
    body = (
      <>
        {steps}
        <p className="q">{Q.q}</p>
        <p className="qs">{Q.hint || (Q.multi ? "해당하는 항목을 모두 선택해 주세요" : "하나를 선택해 주세요")}</p>
        {renderOptions(k)}
      </>
    );
  } else {
    const first = r.oneTime + r.monthly;
    const countries = [...st.countries.map((c) => COUNTRY_LABEL[c]), ...(st.other.countries ? [st.other.countries] : [])];
    const caseKey = st.countries.find((c) => CASES[c]);
    const setups = r.notes.filter((n) => /세팅|이어받|유치기관|개원/.test(n));
    const rest = r.notes.filter((n) => !setups.includes(n) && !/뒤로 미룬/.test(n));
    const card = (x, unit) => {
      const gets = GETS[x.key] || [];
      return (
        <div className="pc" key={x.key + x.name}>
          <div className="top"><b>{x.name}</b><em>{won(x.price)}<small> {unit}</small></em></div>
          <p className="why">{x.why}</p>
          {gets.length > 0 && <details><summary>{unit === "1회" ? "만들어 드리는 것" : unit === "월" ? "매달 받는 것" : "받는 것"} {gets.length}가지</summary><ul>{gets.map((g) => <li key={g}>{g}</li>)}</ul></details>}
        </div>
      );
    };
    body = (
      <>
        <button type="button" className="back" onClick={() => setI(0)}>← 다시 선택하기</button>
        <div className="r-eyebrow">{st.hospital?.name ? `${st.hospital.name} · ` : st.opening ? "개원 예정 · " : ""}답변과 공개 정보로 만든 진단</div>
        <h1 className="r-title">{st.opening ? "개원과 함께 여는 순서" : st.countries.includes("kr") && countries.length > 1 ? "국내와 해외를 함께 여는 순서" : st.countries.includes("kr") ? "국내 환자를 늘리는 순서" : "해외 환자 유치를 시작하는 순서"}</h1>
        <div className="chips">{countries.map((c) => <span key={c}>{c}</span>)}<span>{BUDGET_LABEL[st.budget]}</span></div>

        {st.opening ? (
          <><h4>개원 전, 이제 만들 곳</h4><p className="weakline">아직 문을 열기 전이라 세 곳 모두 <b>처음부터</b> 만듭니다. 순서는 아래 도입 순서를 따릅니다.</p></>
        ) : (
          <>
            <h4>지금 상태<small>답변·공개 정보 기준</small></h4>
            <p className="weakline">가장 먼저 채울 곳은 <b>{r.diagnosis.weakest}</b>입니다.</p>
            <div className="axes">
              {r.diagnosis.axes.map((a) => (
                <div key={a.key} className={`ax ${a.name === r.diagnosis.weakest ? "weak" : ""}`}>
                  <div className="row"><span>{a.name} <small>{a.desc}</small></span><span className="lv">{a.score < 40 ? "약함" : a.score < 65 ? "보통" : "좋음"}</span></div>
                  <div className="bar2"><i style={{ width: `${a.score}%` }} /></div>
                  <p>{a.why}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {r.evidence.length > 0 && (
          <>
            <h4>홈페이지에서 확인한 것<small>{st.channels?.quick?.url}</small></h4>
            <div className="ev">{r.evidence.map(([n, v]) => <div key={n}><span>{n}</span><b className={v ? "y" : "n"}>{v ? "있음" : "없음"}</b></div>)}</div>
            {typeof r.blogMentions30d === "number" && <p className="later">최근 30일 병원 이름이 들어간 네이버 블로그 글 {r.blogMentions30d}건</p>}
          </>
        )}

        <h4>예상 금액</h4>
        <div className="money"><div className="first"><small>첫 달 총액</small><b>{first.toLocaleString()}<u>만 원</u></b></div><div><small>2개월차부터 매달</small><b>{r.monthly.toLocaleString()}<u>만 원</u></b></div></div>
        <p className="later">VAT 별도 · 광고 집행비·의료광고 심의 수수료 별도</p>

        {r.coverage.length > 0 && (
          <>
            <h4>선택하신 고민, 이렇게 해결합니다<small>{r.coverage.filter((c) => c.covered).length}/{r.coverage.length}</small></h4>
            <div className="cov">{r.coverage.map((c) => <div key={c.pain} className={c.covered ? "" : "no"}><i>{c.covered ? "✓" : "…"}</i><p>{c.label}<span>{c.covered ? `${c.by.join(" · ")}에서 해결` : "선택하신 예산 범위에서는 어려워 상담에서 방법을 제안드립니다"}</span></p></div>)}</div>
          </>
        )}

        {r.faq.length > 0 && (
          <>
            <h4>확인하고 싶으셨던 내용</h4>
            <div className="faq">{r.faq.map((f, n) => <details key={f.q} open={n === 0}><summary>{f.q}</summary><p>{f.a}</p>{f.src && <small>출처: {f.src}</small>}</details>)}</div>
          </>
        )}

        {caseKey && (
          <><h4>비슷한 병원 사례</h4><div className="case"><b>{CASES[caseKey][0]}</b><p>{CASES[caseKey][1]}</p><small>실제 운영 사례(병원명 비공개) · 특정 성과를 보장하지 않습니다</small></div></>
        )}

        <h4>도입 순서</h4>
        <div className="tl">
          <div className="stage"><div className="when">1개월차</div><div className="what">한 번 만들고, 매달 운영을 함께 시작합니다</div>{r.foundation.map((x) => card(x, "1회"))}{setups.map((n) => <div className="setup" key={n}>{n}</div>)}</div>
          <div className="stage"><div className="when">매달</div><div className="what">매달 받는 것이 정해져 있고, 월간 보고로 확인합니다</div>{r.engine.map((x) => card(x, "월"))}</div>
          {r.amplify.length > 0 && <div className="stage"><div className="when">3개월차부터</div><div className="what">반응을 보고 더합니다</div>{r.amplify.map((x) => card(x, x.key === "landing" ? "건" : "회"))}</div>}
        </div>

        {r.others.length > 0 && (<><h4>직접 적어주신 내용</h4>{r.others.map((o) => <div className="quote" key={o.q + o.text}><small>{o.q}</small><p>{o.text}</p></div>)}<p className="later">담당자가 제안서에 반영해 답변드립니다.</p></>)}
        {r.cut.length > 0 && (<><h4>예산 범위에 맞춰 다음으로 미룬 것</h4><p className="later">{r.cut.map((x) => `${x.name} (${won(x.price)})`).join(" · ")}</p></>)}
        {rest.length > 0 && (<><h4>참고</h4>{rest.map((n) => <p className="later" key={n}>· {n}</p>)}</>)}
      </>
    );
  }

  return (
    <div className="dx">
      <style>{CSS}</style>
      <main className="scr" ref={scrRef}>{body}</main>
      {!sent && (
        <div className="bar">
          {!done ? (
            <button type="button" className="btn" disabled={!canNext} onClick={next}>
              {k === "hospital" ? (st.opening ? "다음" : st.hospital?.manual ? "입력한 병원명으로 계속" : "선택한 병원으로 계속") : k === "channels" ? (checking ? "확인 중입니다…" : "확인했습니다") : i === keys.length - 1 ? "진단 리포트 보기" : k === "memo" && !st.memo ? "건너뛰기" : "다음"}
            </button>
          ) : (
            <>
              <button type="button" className="btn" onClick={() => setSheet(true)}>진단 리포트 PDF 받기</button>
              <a className="btn kakao sm" href={KAKAO} target="_blank" rel="noopener noreferrer">카톡</a>
            </>
          )}
        </div>
      )}
      {sheet && (
        <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
          <h3 id="sheet-title">진단 리포트 PDF 받기</h3>
          <p>지금 보신 리포트를 PDF로 바로 보내드리고, 담당자가 병원 상황을 확인한 맞춤 제안서를 이어서 보내드립니다.</p>
          <label htmlFor="c-phone">연락처</label>
          <input id="c-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          <label htmlFor="c-email">이메일 (PDF 받을 곳)</label>
          <input id="c-email" type="email" autoComplete="email" placeholder="example@hospital.com" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
          <button type="button" className="btn" disabled={sending} onClick={submit}>{sending ? "보내는 중…" : "PDF 받기"}</button>
          <button type="button" className="btn ghost" onClick={() => setSheet(false)}>닫기</button>
          <p className="fine">입력하신 정보는 진단 리포트 발송과 상담 안내에만 사용합니다.</p>
        </div>
      )}
    </div>
  );
}

const CSS = `
.dx{--red:#E63329;--bg:#0a0000;--line:rgba(255,255,255,.1);--sub:rgba(255,255,255,.58);--card:#140606;min-height:100dvh;background:var(--bg);color:#fff;word-break:keep-all;letter-spacing:-.02em;position:relative}
.dx .scr{max-width:520px;margin:0 auto;padding:22px 18px 130px}
.dx .brand{font-weight:800;font-size:14px;margin-bottom:14px;display:flex;justify-content:space-between}.dx .brand a{color:#fff;text-decoration:none}.dx .brand small{color:var(--sub);font-weight:600;font-size:12px}
.dx .steps{display:flex;gap:4px;margin-bottom:18px}.dx .steps i{flex:1;height:3px;background:rgba(255,255,255,.14);border-radius:2px}.dx .steps i.on{background:var(--red)}
.dx .back{background:none;border:0;color:var(--sub);font:inherit;font-size:13px;padding:0;margin-bottom:10px;cursor:pointer}
.dx .q{font-size:24px;font-weight:850;line-height:1.3;letter-spacing:-.04em;margin:0 0 6px;text-wrap:balance}.dx .qs{font-size:13.5px;color:var(--sub);margin:0 0 16px;line-height:1.5}
.dx .qs.note{margin:10px 0 12px;color:#ff8a82}
.dx .opt{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid var(--line);color:#fff;border-radius:10px;padding:13px 14px;margin-bottom:8px;font:inherit;font-size:15px;font-weight:700;cursor:pointer}
.dx .opt:focus-visible{outline:2px solid var(--red);outline-offset:2px}
.dx .opt i{width:20px;height:20px;border-radius:5px;border:2px solid rgba(255,255,255,.35);flex-shrink:0;display:grid;place-items:center;font-style:normal;font-size:12px;color:transparent}
.dx .opt.radio i{border-radius:999px}.dx .opt.on{border-color:var(--red);background:rgba(230,51,41,.1)}.dx .opt.on i{background:var(--red);border-color:var(--red);color:#fff}
.dx .opt span{display:block;line-height:1.35}.dx .opt small{display:block;font-size:12px;font-weight:500;color:var(--sub);margin-top:3px}
.dx .grp{font-size:11px;font-weight:800;letter-spacing:.06em;color:var(--sub);margin:14px 0 6px}
.dx .picked{font-size:12px;color:#ff8a82;font-weight:700;margin:6px 0 0}
.dx .other{width:100%;background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.22);color:#fff;border-radius:10px;padding:13px 14px;font:inherit;font-size:16px;outline:none;margin-top:4px}
.dx .other:focus,.dx .other.on{border-style:solid;border-color:var(--red)}
.dx textarea.other{min-height:140px;resize:vertical;line-height:1.55}
.dx .list{margin-top:10px}
.dx .alt2{margin-top:16px;padding-top:14px;border-top:1px solid var(--line)}.dx .alt2 .opt{border-style:dashed}
.dx .chrow{display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin-bottom:7px}
.dx .chrow>div{flex:1;min-width:0}.dx .chrow small{display:block;font-size:11px;color:var(--sub)}.dx .chrow b{font-size:14px;word-break:break-all}
.dx .chrow>span{font-size:11px;font-weight:800;padding:3px 8px;border-radius:999px;white-space:nowrap;background:rgba(255,255,255,.08);color:var(--sub)}
.dx .chrow.found>span{background:rgba(110,231,160,.15);color:#6ee7a0}.dx .chrow.ask{border-style:dashed}
.dx .chrow .other{padding:8px 10px;font-size:15px}.dx .inline{display:flex;gap:6px}.dx .mini{border:0;border-radius:8px;background:var(--red);color:#fff;font:inherit;font-weight:800;padding:0 12px;margin-top:4px;cursor:pointer}
.dx .bar{position:fixed;left:0;right:0;bottom:0;padding:12px 14px calc(14px + env(safe-area-inset-bottom));background:linear-gradient(transparent,var(--bg) 30%);display:flex;gap:8px;justify-content:center}
.dx .bar .btn{max-width:492px}
.dx .btn{flex:1;border:0;border-radius:10px;padding:15px;font:inherit;font-weight:800;font-size:15px;cursor:pointer;background:var(--red);color:#fff;text-align:center;text-decoration:none;display:block}
.dx .btn:disabled{opacity:.35;cursor:default}.dx .btn.kakao{background:#FEE500;color:#3C1E1E}.dx .btn.sm{flex:0 0 auto;padding:15px 16px}.dx .btn.ghost{background:rgba(255,255,255,.08);margin-top:8px}
.dx .r-eyebrow{font-size:11.5px;font-weight:700;color:var(--red);letter-spacing:.02em}
.dx .r-title{font-size:26px;font-weight:880;line-height:1.25;letter-spacing:-.045em;margin:6px 0 12px;text-wrap:balance}
.dx .chips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}.dx .chips span{font-size:12px;padding:5px 9px;border-radius:999px;background:rgba(255,255,255,.07);color:rgba(255,255,255,.82)}
.dx h4{font-size:15.5px;margin:24px 0 10px;display:flex;align-items:baseline;gap:6px}.dx h4 small{font-size:11.5px;color:var(--sub);font-weight:600}
.dx .weakline{font-size:13.5px;margin:0 0 10px;line-height:1.55}.dx .weakline b{color:var(--red)}
.dx .axes{display:grid;gap:10px;border:1px solid var(--line);border-radius:14px;padding:14px}
.dx .ax .row{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:14px;font-weight:800}.dx .ax .row small{font-size:11px;color:var(--sub);font-weight:600}
.dx .ax .bar2{height:8px;border-radius:4px;background:rgba(255,255,255,.08);margin:6px 0 4px;overflow:hidden}.dx .ax .bar2 i{display:block;height:100%;border-radius:4px;background:rgba(255,255,255,.45)}
.dx .ax.weak .bar2 i{background:var(--red)}.dx .ax p{margin:0;font-size:12px;color:var(--sub)}
.dx .ax .lv{font-size:11px;font-weight:800;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,.08);white-space:nowrap}.dx .ax.weak .lv{background:var(--red)}
.dx .ev{display:grid;grid-template-columns:1fr 1fr;gap:6px}.dx .ev div{display:flex;justify-content:space-between;gap:6px;background:rgba(255,255,255,.04);border-radius:8px;padding:8px 10px;font-size:12px}
.dx .ev b.y{color:#6ee7a0}.dx .ev b.n{color:#ff8a82}
.dx .money{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line);border-radius:14px;overflow:hidden}
.dx .money div{padding:13px 14px}.dx .money div+div{border-left:1px solid var(--line)}.dx .money .first{background:rgba(230,51,41,.12)}
.dx .money small{display:block;font-size:11px;color:var(--sub)}.dx .money b{font-size:22px;font-weight:900;letter-spacing:-.03em;font-variant-numeric:tabular-nums}.dx .money u{text-decoration:none;font-size:12px;color:var(--sub);margin-left:2px}
.dx .cov{border:1px solid var(--line);border-radius:12px;overflow:hidden}
.dx .cov>div{display:grid;grid-template-columns:22px 1fr;gap:8px;padding:11px 12px;font-size:13.5px;line-height:1.4}.dx .cov>div+div{border-top:1px solid var(--line)}
.dx .cov i{font-style:normal;width:20px;height:20px;border-radius:999px;display:grid;place-items:center;font-size:11px;font-weight:900;background:var(--red)}
.dx .cov .no i{background:transparent;border:1.5px dashed rgba(255,255,255,.35);color:var(--sub)}.dx .cov p{margin:0}.dx .cov span{display:block;font-size:11.5px;color:var(--sub);margin-top:2px}
.dx .faq details{border:1px solid var(--line);border-radius:12px;padding:11px 13px;margin-bottom:8px;background:var(--card)}
.dx .faq summary{font-size:13.5px;font-weight:800;cursor:pointer}.dx .faq p{margin:8px 0 0;font-size:12.5px;line-height:1.6;color:rgba(255,255,255,.82)}.dx .faq small{display:block;margin-top:6px;font-size:10.5px;color:var(--sub)}
.dx .case{border-radius:12px;padding:14px;background:linear-gradient(135deg,rgba(230,51,41,.22),rgba(230,51,41,.04));border:1px solid rgba(230,51,41,.4)}
.dx .case b{font-size:28px;font-weight:900;letter-spacing:-.04em}.dx .case p{margin:2px 0 0;font-size:12px;color:rgba(255,255,255,.75)}.dx .case small{display:block;margin-top:6px;font-size:10px;color:var(--sub)}
.dx .tl{position:relative;padding-left:22px}.dx .tl:before{content:"";position:absolute;left:6px;top:8px;bottom:8px;width:2px;background:linear-gradient(var(--red),rgba(230,51,41,.15))}
.dx .stage{position:relative;margin-bottom:16px}.dx .stage:before{content:"";position:absolute;left:-21px;top:4px;width:12px;height:12px;border-radius:999px;background:var(--bg);border:3px solid var(--red)}
.dx .stage .when{font-size:12px;font-weight:800;color:var(--red)}.dx .stage .what{font-size:12px;color:var(--sub);margin:1px 0 8px}
.dx .pc{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 13px;margin-bottom:8px}
.dx .pc .top{display:flex;justify-content:space-between;gap:10px;align-items:baseline}.dx .pc b{font-size:14.5px;line-height:1.35}
.dx .pc em{font-style:normal;font-weight:900;font-size:15px;white-space:nowrap}.dx .pc em small{font-size:10.5px;color:var(--sub);font-weight:600}
.dx .pc .why{font-size:12px;color:rgba(255,255,255,.64);margin:5px 0 0;line-height:1.45}
.dx .pc details{margin-top:8px;border-top:1px solid var(--line);padding-top:7px}.dx .pc summary{font-size:12px;cursor:pointer;font-weight:700}
.dx .pc ul{margin:6px 0 0;padding-left:16px;display:grid;gap:3px}.dx .pc li{font-size:12px;color:rgba(255,255,255,.78)}
.dx .setup{font-size:12px;color:rgba(255,255,255,.74);border:1px dashed var(--line);border-radius:10px;padding:9px 11px;margin-bottom:8px;line-height:1.5}
.dx .quote{border-left:3px solid var(--red);padding:8px 12px;background:rgba(255,255,255,.03);border-radius:0 10px 10px 0;margin-bottom:8px}.dx .quote small{display:block;font-size:10.5px;color:var(--sub)}.dx .quote p{margin:2px 0 0;font-size:13.5px}
.dx .later{font-size:12.5px;color:var(--sub);line-height:1.6;display:block;margin-top:8px}
.dx .sheet{position:fixed;left:0;right:0;bottom:0;max-width:520px;margin:0 auto;background:#170606;border-top:1px solid var(--line);border-radius:18px 18px 0 0;padding:20px 18px calc(18px + env(safe-area-inset-bottom));z-index:10;box-shadow:0 -10px 30px rgba(0,0,0,.5)}
.dx .sheet h3{margin:0 0 4px;font-size:18px}.dx .sheet p{margin:0 0 12px;font-size:13px;color:var(--sub);line-height:1.5}
.dx .sheet label{display:block;font-size:12px;color:var(--sub);margin:8px 0 4px}
.dx .sheet input{width:100%;padding:14px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:#fff;font:inherit;font-size:16px;margin-bottom:4px}
.dx .sheet .btn{margin-top:10px;width:100%;flex:none}.dx .sheet .fine{font-size:11px;margin:10px 0 0}
.dx .sent{padding-top:40px}.dx .sent .btn{margin:20px 0 12px}
@media (prefers-reduced-motion: reduce){.dx *{scroll-behavior:auto!important}}
`;
