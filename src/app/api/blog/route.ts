import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
const notion = new Client({ auth: process.env.NOTION_API_KEY }) as any;
const BLOG_DS_ID = "d030a946-a3c1-4670-be47-d2b66dfa48ed";

function text(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.map((t: any) => t.plain_text).join("") || "";
  return "";
}

async function fetchOgImage(url: string): Promise<string> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const html = await res.text();
    const match = html.match(/property="og:image"\s+content="([^"]+)"/);
    return match ? match[1] : "";
  } catch {
    return "";
  }
}

export async function GET() {
  try {
    const res = await notion.dataSources.query({
      data_source_id: BLOG_DS_ID,
      filter: {
        property: "노출여부",
        checkbox: { equals: true },
      },
      sorts: [{ property: "순서", direction: "ascending" }],
    });

    const posts = await Promise.all(
      res.results.map(async (page: any) => {
        const props = page.properties;
        const title = text(props["제목"]);
        const link = props["링크"]?.url || "";
        let thumbnail = props["썸네일URL"]?.url || "";

        // 썸네일 비어있으면 블로그에서 자동 추출
        if (!thumbnail && link) {
          thumbnail = await fetchOgImage(link);
        }

        return { title, link, thumbnail };
      })
    );

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("Blog fetch failed:", err);
    return NextResponse.json({ error: "블로그 조회 실패" }, { status: 500 });
  }
}
