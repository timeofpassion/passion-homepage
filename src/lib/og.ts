import type { Metadata } from "next";

const BASE = "https://www.timeofpassion.com";

/**
 * 요청 쿼리스트링을 og:url 에 그대로 반영한다.
 * 카카오 등 일부 메신저는 og:url 값을 기준으로 미리보기 카드를 캐시하기 때문에,
 * 링크 뒤에 ?v=3 같은 파라미터를 붙여 보내면 og:url 이 달라져 캐시를 우회하고
 * 새 카드를 다시 긁어오게 된다(개발자도구 로그인 없이 강제 갱신용).
 * 파라미터가 없는 평소 주소는 기존과 동일한 깔끔한 URL 을 그대로 사용한다.
 */
export function ogUrl(
  path: string,
  searchParams: Record<string, string | string[] | undefined>,
): string {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value == null) continue;
    if (Array.isArray(value)) value.forEach((v) => usp.append(key, v));
    else usp.append(key, value);
  }
  const qs = usp.toString();
  return `${BASE}${path}${qs ? `?${qs}` : ""}`;
}

type OG = NonNullable<Metadata["openGraph"]>;
type SP = Record<string, string | string[] | undefined>;

/**
 * 페이지 openGraph 베이스(url 은 생략)에 동적 url 을 결합해 완성된 openGraph 를 만든다.
 * base 의 url 은 무시되고 항상 요청 주소 기반 url 로 덮어쓴다.
 */
export function buildOpenGraph(base: OG, path: string, searchParams: SP): OG {
  return { ...base, url: ogUrl(path, searchParams) };
}
