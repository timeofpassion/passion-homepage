import { NextResponse } from "next/server";

interface BlogPost {
  title: string;
  link: string;
  thumbnail: string;
  pubDate: string;
}

export async function GET() {
  try {
    const res = await fetch("https://rss.blog.naver.com/mimichelin", {
      next: { revalidate: 3600 }, // 1시간마다 갱신
    });
    const xml = await res.text();

    const posts: BlogPost[] = [];
    const items = xml.split("<item>").slice(1);

    for (const item of items.slice(0, 6)) {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || "";
      const link = item.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>/)?.[1] || "";
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
      const thumbnail = item.match(/<img src="(.*?)"/)?.[1] || "";

      posts.push({ title, link, thumbnail, pubDate });
    }

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("Blog fetch failed:", err);
    return NextResponse.json({ error: "블로그 조회 실패" }, { status: 500 });
  }
}
