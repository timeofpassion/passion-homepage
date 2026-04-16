import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
const notion = new Client({ auth: process.env.NOTION_API_KEY }) as any;
const BLOG_DS_ID = "d030a946-a3c1-4670-be47-d2b66dfa48ed";

function text(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.map((t: any) => t.plain_text).join("") || "";
  if (prop.type === "rich_text") return prop.rich_text?.map((t: any) => t.plain_text).join("") || "";
  return "";
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

        // 썸네일URL이 비어있으면 링크에서 OG 이미지 자동 추출 시도
        if (!thumbnail && link) {
          try {
            const html = await fetch(link, { signal: AbortSignal.timeout(5000) }).then(r => r.text());
            const ogMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
            if (ogMatch) thumbnail = ogMatch[1];
          } catch {
            // 추출 실패 시 빈 값 유지
          }
        }

        return { title, link, thumbnail };
      })
    );

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("Blog fetch failed:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "블로그 조회 실패", detail: msg }, { status: 500 });
  }
}
