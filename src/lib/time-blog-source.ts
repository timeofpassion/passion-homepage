// /time/blog 글 단일 소스 — 인트라넷 공개 API(원본) + 정적 blog.ts(폴백/시드)를 병합한다.
// 인트라넷에서 발행한 글이 우선, 같은 slug 면 인트라넷이 덮어쓴다.
// 인트라넷 API 가 비었거나 불가하면 정적 글만으로도 동작(무중단).

import { blogPosts, type ContentPost } from "@/data/blog";

const API = "https://intranet.timeofpassion.com/api/public/time-blog";

async function fetchRemote(): Promise<ContentPost[]> {
  try {
    const res = await fetch(API, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    // 최소 형태 검증 — body 는 ContentBlock[] 여야 렌더 가능
    return data.filter(
      (p): p is ContentPost =>
        !!p && typeof p.slug === "string" && typeof p.title === "string" && Array.isArray(p.body),
    );
  } catch {
    return [];
  }
}

export async function loadPosts(): Promise<ContentPost[]> {
  const remote = await fetchRemote();
  const map = new Map<string, ContentPost>();
  for (const p of blogPosts) map.set(p.slug, p);
  for (const p of remote) map.set(p.slug, p); // 인트라넷 발행 글 우선
  return [...map.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function loadPostBySlug(slug: string): Promise<ContentPost | undefined> {
  const all = await loadPosts();
  return all.find((p) => p.slug === slug);
}

export async function loadAllSlugs(): Promise<string[]> {
  const all = await loadPosts();
  return all.map((p) => p.slug);
}
