// 페이지 주소로 검수하기 — 원장님은 문구를 복사해 오지 않는다. 이미 올려둔 페이지 주소를 준다.
// 서버가 그 페이지를 대신 열어 본문 글자만 뽑아 검수 엔진에 넣는다.

/** 서버가 대신 열어주는 기능이라, 우리 내부망을 향한 주소는 반드시 막는다(SSRF). */
function isPublicHttpUrl(u: URL): boolean {
  if (u.protocol !== "http:" && u.protocol !== "https:") return false;
  const h = u.hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".internal")) return false;
  if (h === "metadata.google.internal") return false;
  // IPv6 리터럴 — 루프백·링크로컬·유니크로컬
  if (h.startsWith("[")) return !/^\[(::1|fe80:|fc|fd)/i.test(h);
  const v4 = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!v4) return true; // 도메인은 통과 (DNS 리바인딩까지는 막지 않는다)
  const [a, b] = [Number(v4[1]), Number(v4[2])];
  if (a === 10 || a === 127 || a === 0) return false;
  if (a === 172 && b >= 16 && b <= 31) return false;
  if (a === 192 && b === 168) return false;
  if (a === 169 && b === 254) return false; // 클라우드 메타데이터
  return true;
}

/** 태그를 걷어내고 사람이 읽는 글자만 남긴다. 스크립트·스타일은 통째로 버린다. */
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style|noscript|svg|nav|footer)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<br\s*\/?>|<\/(p|div|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** 주소를 열어 본문 글자를 돌려준다. 리다이렉트는 매 홉마다 다시 검사한다. */
export async function fetchPageText(input: string, limit = 12000): Promise<string> {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    throw new Error("URL_INVALID");
  }

  let res: Response | null = null;
  for (let hop = 0; hop < 4; hop++) {
    if (!isPublicHttpUrl(url)) throw new Error("URL_BLOCKED");
    res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(15_000),
      headers: {
        // 봇 차단으로 빈 페이지가 오는 걸 줄인다
        "User-Agent": "Mozilla/5.0 (compatible; TimeOfPassion-AdCheck/1.0)",
        Accept: "text/html,*/*",
      },
    }).catch(() => {
      throw new Error("URL_FETCH_FAILED");
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) break;
      url = new URL(loc, url);
      continue;
    }
    break;
  }
  if (!res || !res.ok) throw new Error("URL_FETCH_FAILED");

  const text = htmlToText(await res.text());
  if (text.length < 5) throw new Error("URL_EMPTY");
  return text.slice(0, limit);
}
