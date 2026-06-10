import { NextResponse } from "next/server"

// 홈페이지 → 인트라넷 공개 문의 API 프록시 (quote 연동 패턴 동일).
const BASE = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "bad request" }, { status: 400 })
  }
  try {
    const res = await fetch(`${BASE}/api/public/hospital-inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: "upstream unavailable" }, { status: 502 })
  }
}
