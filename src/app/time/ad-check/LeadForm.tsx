"use client";

import { useState } from "react";

/**
 * 검수 결과 직후에 붙는 리드 폼.
 *
 * 이 도구는 지금까지 "봉사"였다 — 검수해주고 카카오 링크만 걸어놨으니
 * 쓴 사람이 누구인지, 뭐가 걸렸는지 우리 쪽에 남는 게 하나도 없었다.
 * 여기서 이메일을 받고, 받은 값으로 12쪽 대조표를 보내면서 대화를 연다.
 *
 * 원문 취급 규칙 ★
 * 페이지에 "입력한 문구는 저장되지 않습니다"라고 써 붙여놨다. 그 약속을 깨면 안 된다.
 * - pdf 변형: 판정 요약(위험도·건수·조항)만 보낸다. 원문은 절대 안 붙인다.
 * - review 변형: 사용자가 "내 문구를 봐달라"고 직접 누른 경우다. 그래도 체크박스로 한 번 더 받는다.
 */

export type LeadVariant = "pdf" | "review" | "overseas";

interface Props {
  variant: LeadVariant;
  /** 판정 요약 — 원문이 아니라 결과 메타만 */
  summary: {
    media: string;
    risk: string;
    riskLabel: string;
    violationCount: number;
    articles: string[];
  };
  /** review 변형에서 동의 시에만 첨부되는 원문 */
  sourceText?: string;
}

const COPY: Record<
  LeadVariant,
  { eye: string; title: string; desc: string; cta: string; done: string }
> = {
  pdf: {
    eye: "무료 자료",
    title: "위반문구 대조표 12쪽, 이메일로 보내드립니다",
    desc: "이 검수 도구가 판정하는 기준 그대로입니다. 14개 금지유형 위반→수정 대조, 금지어가 들어 있어도 정상인 문장 20선, 게시 전 12문항 체크리스트. 인쇄해서 원내 승인 서식으로 쓰셔도 됩니다.",
    cta: "대조표 받기",
    done: "메일함을 확인해 주세요. 몇 분 안에 도착합니다.",
  },
  review: {
    eye: "사람이 봅니다",
    title: "이 문구, 사람이 직접 보고 고쳐드릴까요?",
    desc: "AI 판정은 참고 결과입니다. 실제로 게시하실 원고라면 담당자가 문장 단위로 다시 쓰고, 심의 대상 여부와 필요 절차까지 정리해 회신드립니다. 1건은 비용 없이 봐드립니다.",
    cta: "교정 요청하기",
    done: "접수됐습니다. 영업일 기준 1~2일 안에 회신드립니다.",
  },
  overseas: {
    eye: "해외 채널",
    title: "해외 채널 운영 상담을 받아보시겠습니까?",
    desc: "샤오홍슈·LINE·일본 인스타그램·대만 유튜브는 국내 의료광고 심의 대상이 아니라 각국 별도 규정을 따릅니다. 어느 채널이 맞는지, 무엇부터 준비해야 하는지 정리해 회신드립니다.",
    cta: "해외 채널 상담 신청",
    done: "접수됐습니다. 담당자가 회신드립니다.",
  },
};

export default function LeadForm({ variant, summary, sourceText }: Props) {
  const copy = COPY[variant];
  const [open, setOpen] = useState(variant === "pdf");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [phone, setPhone] = useState("");
  const [shareText, setShareText] = useState(variant === "review");
  const [agree, setAgree] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");

  const needsContact = variant !== "pdf";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr("이메일 주소를 정확히 입력해 주세요.");
      return;
    }
    if (!agree) {
      setErr("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    setErr("");
    setState("sending");
    try {
      const res = await fetch("/api/ad-check/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant,
          email: email.trim(),
          name: name.trim(),
          org: org.trim(),
          phone: phone.trim(),
          summary,
          // 동의한 경우에만 원문이 실린다. 기본값은 보내지 않는 것이다.
          sourceText: shareText && sourceText ? sourceText : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErr(json.error || "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        setState("idle");
        return;
      }
      setState("done");
    } catch {
      setErr("네트워크 오류로 전송에 실패했습니다.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className={`adc-lead v-${variant} is-done`}>
        <div className="ld-done">
          <span className="ck" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 12.5l5.5 5.5L20 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <b>{copy.done}</b>
            {variant === "pdf" && (
              <p>
                오지 않으면 스팸함을 확인해 주세요.{" "}
                <a href="/downloads/medical-ad-check-guide-2026.pdf" download>
                  여기서 바로 내려받기
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`adc-lead v-${variant}`}>
      <div className="ld-head">
        <span className="ld-eye">{copy.eye}</span>
        <div className="ld-t">{copy.title}</div>
        <p className="ld-d">{copy.desc}</p>
      </div>

      {!open ? (
        <button type="button" className="adc-btn ld-open" onClick={() => setOpen(true)}>
          {copy.cta}
        </button>
      ) : (
        <form className="ld-form" onSubmit={submit}>
          <div className="ld-row">
            <label className="ld-f ld-grow">
              <span>이메일 *</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@clinic.co.kr"
                autoComplete="email"
                required
              />
            </label>
            <label className="ld-f">
              <span>성함</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                autoComplete="name"
              />
            </label>
          </div>

          {needsContact && (
            <div className="ld-row">
              <label className="ld-f ld-grow">
                <span>병원·기관명</span>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="OO의원"
                  autoComplete="organization"
                />
              </label>
              <label className="ld-f">
                <span>연락처</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  autoComplete="tel"
                />
              </label>
            </div>
          )}

          {variant === "review" && sourceText && (
            <label className="ld-chk">
              <input
                type="checkbox"
                checked={shareText}
                onChange={(e) => setShareText(e.target.checked)}
              />
              <span>
                검수한 문구 원문을 함께 전달합니다. <i>끄시면 판정 결과만 전달되어 교정이 어려울 수 있습니다.</i>
              </span>
            </label>
          )}

          <label className="ld-chk">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>
              자료 발송·상담 회신 목적의 개인정보 수집·이용에 동의합니다. <i>목적 달성 후 파기하며, 거부하실 수 있으나 이 경우 발송이 어렵습니다.</i>
            </span>
          </label>

          {err && <div className="adc-err">{err}</div>}

          <div className="ld-act">
            <button className="adc-btn" type="submit" disabled={state === "sending"}>
              {state === "sending" ? (
                <>
                  <span className="spin" /> 보내는 중...
                </>
              ) : (
                copy.cta
              )}
            </button>
            <span className="adc-hint">
              {variant === "pdf"
                ? "광고 메일을 보내지 않습니다. 자료 1건만 발송됩니다."
                : "영업일 기준 1~2일 안에 회신드립니다."}
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
