import { NextResponse } from "next/server";

const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";

// 진단형 견적 — 홈페이지 빠른 확인 + 블로그 언급 30일 (인트라넷 공개 API 중계)
export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const qs = new URLSearchParams({ url: sp.get("url") ?? "", name: sp.get("name") ?? "" });
  try {
    const res = await fetch(`${INTRANET_URL}/api/public/diagnosis/check?${qs}`, { next: { revalidate: 600 } });
    if (!res.ok) return NextResponse.json({ quick: null, blogMentions30d: null });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ quick: null, blogMentions30d: null });
  }
}
