// URL 본문 추출 — 원장이 이미 올린 블로그·홈페이지 링크를 넣으면 서버가 페이지를 열어 본문 텍스트를 뽑는다.
// 네이버 블로그(iframe) 처리 + SSRF 가드(내부/사설 호스트 차단).

export interface ExtractResult {
  ok: boolean;
  text: string;
  title?: string;
  finalUrl?: string;
  error?: string;
}

// 사설·내부 대상 차단 (SSRF 방지)
function isBlockedHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (h === "metadata.google.internal") return true;
  if (h === "169.254.169.254") return true;
  if (h === "::1" || h === "0.0.0.0") return true;
  // IPv4 사설/루프백 대역
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
  }
  return false;
}

export async function fetchAndExtract(rawUrl: string): Promise<ExtractResult> {
  let input = (rawUrl ?? "").trim();
  if (!input) return { ok: false, text: "", error: "URL을 입력해 주세요." };
  if (!/^https?:\/\//i.test(input)) input = "https://" + input;

  let target: URL;
  try {
    target = new URL(input);
  } catch {
    return { ok: false, text: "", error: "올바른 URL 형식이 아닙니다." };
  }
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return { ok: false, text: "", error: "http/https 주소만 검수할 수 있습니다." };
  }
  if (isBlockedHost(target.hostname)) {
    return { ok: false, text: "", error: "이 주소는 검수할 수 없습니다." };
  }

  // 네이버 블로그: /{blogId}/{logNo} → PostView.naver (iframe 본문)
  let fetchUrl = target.toString();
  if (/(^|\.)blog\.naver\.com$/i.test(target.hostname)) {
    const parts = target.pathname.split("/").filter(Boolean);
    if (parts.length >= 2 && /^\d+$/.test(parts[1])) {
      fetchUrl = `https://blog.naver.com/PostView.naver?blogId=${encodeURIComponent(parts[0])}&logNo=${encodeURIComponent(parts[1])}&redirect=Dlog&widgetTypeCall=true&directAccess=false`;
    }
  }

  let res: Response;
  try {
    res = await fetch(fetchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "ko,en;q=0.8",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return { ok: false, text: "", error: "페이지를 불러오지 못했습니다. 접근이 막혀 있거나 응답이 느립니다. 본문을 직접 붙여넣어 주세요." };
  }

  if (!res.ok) {
    return { ok: false, text: "", error: `페이지 응답 오류(${res.status}). 본문을 직접 붙여넣어 주세요.` };
  }
  const ctype = res.headers.get("content-type") ?? "";
  if (!/text\/html|application\/xhtml/i.test(ctype)) {
    return { ok: false, text: "", error: "HTML 페이지가 아니라 본문을 읽을 수 없습니다." };
  }

  const html = (await res.text()).slice(0, 600000);
  const title = decodeEntities((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim());
  const text = htmlToText(html);

  if (text.replace(/\s/g, "").length < 30) {
    return {
      ok: false,
      text: "",
      title,
      finalUrl: fetchUrl,
      error: "본문 텍스트를 충분히 추출하지 못했습니다(자바스크립트로 렌더되는 페이지일 수 있습니다). 본문을 직접 붙여넣어 주세요.",
    };
  }

  return { ok: true, text, title, finalUrl: fetchUrl };
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => {
      const code = Number(n);
      return code > 0 && code < 0x10ffff ? String.fromCodePoint(code) : "";
    });
}

function htmlToText(html: string): string {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  s = s.replace(/<!--[\s\S]*?-->/g, " ");
  s = s.replace(/<(nav|header|footer|aside|form)[\s\S]*?<\/\1>/gi, " ");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/(p|div|li|h[1-6]|section|article|tr|td)>/gi, "\n");
  s = s.replace(/<[^>]+>/g, " ");
  s = decodeEntities(s);
  s = s
    .replace(/[ \t\f\v ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return s.slice(0, 12000);
}
