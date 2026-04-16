import { NextResponse } from "next/server";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
}

export async function GET() {
  try {
    const res = await fetch("https://rss.blog.naver.com/mimichelin", {
      next: { revalidate: 3600 }, // 1시간 캐시
    });
    const xml = await res.text();

    const posts: BlogPost[] = [];
    const items = xml.split("<item>").slice(1);

    for (const item of items.slice(0, 6)) {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || "";
      const link = item.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>/)?.[1] || "";
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
      const thumbnail = item.match(/<img src="(.*?)"/)?.[1] || "";

      posts.push({ title, link, pubDate, thumbnail });
    }

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("Blog fetch failed:", err);
    return NextResponse.json({ error: "블로그 조회 실패" }, { status: 500 });
  }
}
