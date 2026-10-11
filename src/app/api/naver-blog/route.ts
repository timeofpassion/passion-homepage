import { NextResponse } from "next/server";

// 네이버 블로그 공개 RSS → 플로팅 버튼용 최신 글.
// 회사 전용 블로그(passionmarketing)라 분류 거르지 않고 최신 3개.
const RSS = "https://rss.blog.naver.com/passionmarketing.xml";

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
      }))
      .slice(0, 3);
    return NextResponse.json({ posts });
  } catch {
    // 네이버 응답 실패 시 버튼은 블로그 바로가기로만 동작
    return NextResponse.json({ posts: [] });
  }
}
