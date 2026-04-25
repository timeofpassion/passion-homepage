import { NextResponse } from "next/server";

const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";

export async function GET() {
  try {
    const res = await fetch(`${INTRANET_URL}/api/public/quote/products`, {
      next: { revalidate: 60 }, // 1분 캐시
    });

    if (!res.ok) {
      // 인트라넷 연결 실패 시 빈 배열 반환 (장애 허용)
      return NextResponse.json({ products: [] });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ products: [] });
  }
}
