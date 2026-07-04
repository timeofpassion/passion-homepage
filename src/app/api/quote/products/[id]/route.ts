import { NextResponse } from "next/server";

// 상품 상세 프록시 → 인트라넷 공개 상세 API.
const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const res = await fetch(`${INTRANET_URL}/api/public/quote/products/${encodeURIComponent(id)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "not found" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 502 });
  }
}
