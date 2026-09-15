import { NextResponse } from "next/server";

// 네이버 블로그 공개 RSS → 플로팅 버튼용 최신 글.
// 블로그에 후기·일상 글이 섞여 있어 회사 글 분류만 노출한다(분류 추가 시 CATEGORIES 만 수정).
const RSS = "https://rss.blog.naver.com/mimichelin.xml";
const CATEGORIES = ["마케팅 인사이트"];

export const revalidate = 3600;

function pick(s: string, tag: string) {
  const start = s.indexOf(`<${tag}>`);
  const end = s.indexOf(`</${tag}>`);
  if (start < 0 || end < 0) return "";
  return s.slice(start + tag.length + 2, end).replace("<![CDATA[", "").replace("]]>", "").trim();
}

export async function GET() {
  try {
    const xml = await (await fetch(RSS, { next: { revalidate } })).text();
    const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, it]) => ({
        title: pick(it, "title"),
        link: pick(it, "link").split("?")[0],
        date: new Date(pick(it, "pubDate")).toISOString().slice(0, 10),
        category: pick(it, "category"),
      }))
      .filter((p) => CATEGORIES.includes(p.category))
      .slice(0, 3);
    return NextResponse.json({ posts });
  } catch {
    // 네이버 응답 실패 시 버튼은 블로그 바로가기로만 동작
    return NextResponse.json({ posts: [] });
  }
}
