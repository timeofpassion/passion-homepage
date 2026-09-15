import { NextResponse } from "next/server";

const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";

// 진단형 견적 — 병원 후보 (네이버 검색 키는 인트라넷에만 있어 중계한다)
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  try {
    const res = await fetch(`${INTRANET_URL}/api/public/diagnosis/hospitals?q=${encodeURIComponent(q)}`, { next: { revalidate: 300 } });
    if (!res.ok) return NextResponse.json({ hospitals: [], unavailable: true });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ hospitals: [], unavailable: true });
  }
}
