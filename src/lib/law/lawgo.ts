// 국가법령정보(법제처) OPEN API — 현행 조문 원문 조회
//
// 왜: rules.ts 는 사람이 한 번 정리해둔 정답 데이터라 법이 바뀌면 조용히 낡는다.
// 판정 근거로 쓰는 조문의 "현행 원문·시행일·출처"를 호출 시점에 확인한다.
// 실패하면 null 을 돌려주고 기존 룰베이스가 그대로 돈다 — 도구가 멈추면 안 된다.

const OC = process.env.LAW_OC || "timeofpassion";
const BASE = "https://www.law.go.kr/DRF";
const TTL_MS = 24 * 60 * 60 * 1000;
const TIMEOUT_MS = 8000;

export interface LawArticle {
  /** 법령명 (예: 의료법) */
  law: string;
  /** 조 번호 (예: 56) */
  article: string;
  /** 조문 제목 (예: 의료광고의 금지 등) */
  title: string;
  /** 시행일 YYYYMMDD */
  effDate: string;
  /** 조문 원문 (항·호 포함) */
  text: string;
  /** 법제처 원문 링크 */
  url: string;
}

export interface LawSnapshot {
  articles: LawArticle[];
  /** 법령명 → 현행 시행일 */
  effDates: Record<string, string>;
}

/** 자가검수 판정이 근거로 삼는 조문 */
const TARGETS: { law: string; article: string }[] = [
  { law: "의료법", article: "56" }, // 의료광고의 금지 등
  { law: "의료법", article: "27" }, // 무면허 의료행위 금지(3항 환자 유인)
  { law: "의료법 시행령", article: "23" }, // 의료광고의 금지 기준
];

async function api(path: string, params: Record<string, string>) {
  const qs = new URLSearchParams({ OC, type: "JSON", ...params });
  const res = await fetch(`${BASE}/${path}?${qs}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    // 법령은 자주 안 바뀌므로 플랫폼 캐시도 하루
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`법령API HTTP ${res.status}`);
  const body = await res.text();
  if (!body.trimStart().startsWith("{")) throw new Error("법령API 응답이 JSON 이 아님(OC 승인 상태 확인)");
  return JSON.parse(body);
}

function publicUrl(law: string, article: string) {
  return `https://www.law.go.kr/법령/${encodeURIComponent(law)}/제${article}조`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function renderArticle(u: any): string {
  const out: string[] = [String(u.조문내용 ?? "").trim()];
  for (const h of ([] as any[]).concat(u.항 ?? [])) {
    if (h?.항내용) out.push(String(h.항내용).trim());
    for (const ho of ([] as any[]).concat(h?.호 ?? [])) {
      if (ho?.호내용) out.push("  " + String(ho.호내용).trim());
    }
  }
  return out.filter(Boolean).join("\n");
}

async function fetchArticle(law: string, article: string): Promise<LawArticle | null> {
  const list = await api("lawSearch.do", { target: "law", query: law, display: "100", search: "1" });
  const rows: any[] = list?.LawSearch?.law ?? [];
  const hit = rows.find((r) => r.법령명한글 === law);
  if (!hit) return null;

  const detail = await api("lawService.do", { target: "law", MST: String(hit.법령일련번호) });
  const units: any[] = ([] as any[]).concat(detail?.법령?.조문?.조문단위 ?? []);
  // 조문번호가 같은 단위 중 제목이 있는 것이 실제 조문(제목 없는 건 편·장 머리말)
  const found = units.filter((u) => String(u.조문번호) === article && u.조문제목);
  if (!found.length) return null;

  return {
    law,
    article,
    title: String(found[0].조문제목),
    effDate: String(found[0].조문시행일자 || hit.시행일자 || ""),
    text: found.map(renderArticle).join("\n\n"),
    url: publicUrl(law, article),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

let cache: { at: number; data: LawSnapshot } | null = null;
let inflight: Promise<LawSnapshot | null> | null = null;

/**
 * 의료광고 판정 근거 조문의 현행 원문을 가져온다.
 * 24시간 캐시. 조회 실패 시 null (호출부는 룰베이스로 계속 진행할 것).
 */
export async function getMedicalAdLaw(): Promise<LawSnapshot | null> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const results = await Promise.all(TARGETS.map((t) => fetchArticle(t.law, t.article)));
      const articles = results.filter((a): a is LawArticle => a !== null);
      if (!articles.length) return null;

      const effDates: Record<string, string> = {};
      for (const a of articles) if (a.effDate) effDates[a.law] = a.effDate;

      const data: LawSnapshot = { articles, effDates };
      cache = { at: Date.now(), data };
      return data;
    } catch (err) {
      console.error("[lawgo] 현행 조문 조회 실패, 룰베이스로 진행:", err);
      return cache?.data ?? null; // 만료된 캐시라도 없는 것보다 낫다
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

/** YYYYMMDD → 2026-04-07 */
export function formatEffDate(d: string): string {
  return /^\d{8}$/.test(d) ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}` : d;
}

/** 화면에 내려보내는 근거 메타. 조문 원문은 싣지 않는다(응답 용량). */
export interface LawSource {
  law: string;
  article: string;
  title: string;
  effDate: string;
  url: string;
}

export interface LawMeta {
  sources: LawSource[];
  /** 규칙 사전이 대조한 기준일보다 법이 뒤에 바뀐 항목. 비어 있으면 최신. */
  stale: { law: string; baseline: string; current: string }[];
}

/**
 * 규칙 사전이 대조한 기준 시행일과 현행 시행일을 비교한다.
 * 여기 뭔가 담기면 = 그 사이에 법이 바뀌었고 규칙 사전을 손봐야 한다는 뜻.
 */
export function checkStale(
  snapshot: LawSnapshot,
  baseline: Record<string, string>,
): LawMeta["stale"] {
  const out: LawMeta["stale"] = [];
  for (const [law, base] of Object.entries(baseline)) {
    const current = snapshot.effDates[law];
    if (current && base && current > base) {
      out.push({ law, baseline: formatEffDate(base), current: formatEffDate(current) });
    }
  }
  return out;
}

/** 스냅샷 → 화면용 메타 */
export function toLawMeta(snapshot: LawSnapshot, baseline: Record<string, string>): LawMeta {
  return {
    sources: snapshot.articles.map((a) => ({
      law: a.law,
      article: a.article,
      title: a.title,
      effDate: formatEffDate(a.effDate),
      url: a.url,
    })),
    stale: checkStale(snapshot, baseline),
  };
}
