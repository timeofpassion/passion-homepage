// 의료광고 자가검수 — 룰베이스 검수 엔진
//
// runRuleScan(text): 입력 문구를 AD_RULES 사전에 대조해 위반 추정 문장·근거조항·수정문안을 도출.
// 순수 함수(외부 의존 없음) → 브라우저·서버·다른 도구에서 공통 재사용 가능.

import {
  AD_RULES,
  TREATMENT_HINTS,
  DISCLAIMER_HINTS,
  STANDARD_DISCLAIMER,
  RESULT_DISCLAIMER,
  type RiskLevel,
} from "./rules";

export interface Violation {
  id: string;
  article: string;
  law: string;
  label: string;
  risk: RiskLevel;
  reason: string;
  allowCond?: string;
  fix: string;
  /** 원문에서 실제로 걸린 표현들 (중복 제거) */
  matches: string[];
  /** 첫 등장 위치 (정렬용) */
  index: number;
}

export interface ScanSpan {
  start: number;
  end: number;
  risk: RiskLevel;
}

export interface ScanResult {
  overallRisk: "high" | "medium" | "low";
  riskLabel: string; // 위험 / 주의 / 안전
  verdict: string; // 한 줄 판정 메시지
  violations: Violation[];
  spans: ScanSpan[];
  missingDisclaimer: boolean;
  standardDisclaimer: string;
  disclaimer: string;
  counts: { high: number; medium: number; gray: number };
}

interface RawMatch {
  ruleId: string;
  risk: RiskLevel;
  start: number;
  end: number;
  text: string;
}

function findKeyword(haystackLower: string, original: string, keyword: string): RawMatch[] {
  const out: RawMatch[] = [];
  const needle = keyword.toLowerCase();
  if (!needle) return out;
  let from = 0;
  while (true) {
    const idx = haystackLower.indexOf(needle, from);
    if (idx === -1) break;
    out.push({ ruleId: "", risk: "gray", start: idx, end: idx + keyword.length, text: original.slice(idx, idx + keyword.length) });
    from = idx + needle.length;
  }
  return out;
}

function findPattern(original: string, source: string): RawMatch[] {
  const out: RawMatch[] = [];
  let re: RegExp;
  try {
    re = new RegExp(source, "gi");
  } catch {
    return out;
  }
  let m: RegExpExecArray | null;
  let guard = 0;
  while ((m = re.exec(original)) !== null && guard < 500) {
    guard++;
    if (m[0].length === 0) {
      re.lastIndex++;
      continue;
    }
    out.push({ ruleId: "", risk: "gray", start: m.index, end: m.index + m[0].length, text: m[0] });
  }
  return out;
}

const RISK_ORDER: Record<RiskLevel, number> = { gray: 1, medium: 2, high: 3 };

export function runRuleScan(input: string): ScanResult {
  const text = (input ?? "").slice(0, 12000);
  const lower = text.toLowerCase();

  const perRule = new Map<string, { rule: (typeof AD_RULES)[number]; matches: RawMatch[] }>();
  const allSpans: ScanSpan[] = [];

  for (const rule of AD_RULES) {
    const hits: RawMatch[] = [];
    for (const kw of rule.keywords) {
      for (const h of findKeyword(lower, text, kw)) {
        h.ruleId = rule.id;
        h.risk = rule.risk;
        hits.push(h);
      }
    }
    for (const p of rule.patterns ?? []) {
      for (const h of findPattern(text, p)) {
        h.ruleId = rule.id;
        h.risk = rule.risk;
        hits.push(h);
      }
    }
    if (hits.length > 0) {
      perRule.set(rule.id, { rule, matches: hits });
      for (const h of hits) allSpans.push({ start: h.start, end: h.end, risk: rule.risk });
    }
  }

  // 7호 — 부작용/중요정보 누락: 시술 언급은 있는데 부작용 고지가 전혀 없을 때
  const mentionsTreatment = TREATMENT_HINTS.some((t) => lower.includes(t.toLowerCase()));
  const hasDisclaimer = DISCLAIMER_HINTS.some((d) => lower.includes(d.toLowerCase()));
  const missingDisclaimer = mentionsTreatment && !hasDisclaimer && text.trim().length > 0;

  // 위반 카드 구성
  const violations: Violation[] = [];
  for (const { rule, matches } of perRule.values()) {
    const uniqTexts = Array.from(new Set(matches.map((m) => m.text.trim()).filter(Boolean)));
    const firstIndex = matches.reduce((min, m) => Math.min(min, m.start), Number.MAX_SAFE_INTEGER);
    violations.push({
      id: rule.id,
      article: rule.article,
      law: rule.law,
      label: rule.label,
      risk: rule.risk,
      reason: rule.reason,
      allowCond: rule.allowCond,
      fix: rule.fix,
      matches: uniqTexts,
      index: firstIndex,
    });
  }

  if (missingDisclaimer) {
    violations.push({
      id: "missing-7",
      article: "56-2-7",
      law: "의료법 제56조 2항 7호",
      label: "부작용 등 중요정보 누락",
      risk: "medium",
      reason: "시술을 다루면서 부작용·주의사항 고지 문구가 없어 중요정보 누락에 해당할 수 있음",
      fix: `표준 고지문 삽입 권장: "${STANDARD_DISCLAIMER}"`,
      matches: [],
      index: Number.MAX_SAFE_INTEGER,
    });
  }

  violations.sort((a, b) => a.index - b.index || RISK_ORDER[b.risk] - RISK_ORDER[a.risk]);

  const counts = {
    high: violations.filter((v) => v.risk === "high").length,
    medium: violations.filter((v) => v.risk === "medium").length,
    gray: violations.filter((v) => v.risk === "gray").length,
  };

  // 겹치는 하이라이트 병합 (높은 위험 우선)
  const spans = mergeSpans(allSpans);

  let overallRisk: "high" | "medium" | "low" = "low";
  if (counts.high > 0) overallRisk = "high";
  else if (counts.medium > 0 || counts.gray > 0) overallRisk = "medium";

  const riskLabel = overallRisk === "high" ? "위험" : overallRisk === "medium" ? "주의" : "안전";
  const verdict =
    overallRisk === "high"
      ? "게시 시 행정처분·형사처벌 위험이 있습니다"
      : overallRisk === "medium"
      ? "수정을 권장합니다"
      : "명백한 위반 표현은 발견되지 않았습니다 (참고용)";

  return {
    overallRisk,
    riskLabel,
    verdict,
    violations,
    spans,
    missingDisclaimer,
    standardDisclaimer: STANDARD_DISCLAIMER,
    disclaimer: RESULT_DISCLAIMER,
    counts,
  };
}

function mergeSpans(spans: ScanSpan[]): ScanSpan[] {
  if (spans.length === 0) return [];
  const sorted = [...spans].sort((a, b) => a.start - b.start || b.end - a.end);
  const merged: ScanSpan[] = [];
  for (const s of sorted) {
    const last = merged[merged.length - 1];
    if (last && s.start <= last.end) {
      last.end = Math.max(last.end, s.end);
      if (RISK_ORDER[s.risk] > RISK_ORDER[last.risk]) last.risk = s.risk;
    } else {
      merged.push({ ...s });
    }
  }
  return merged;
}
