import { NextResponse } from "next/server";

const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { customerName, email, phone, hospitalName, memo, selectedProducts } = body;

    if (!customerName || !email || !selectedProducts?.length) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 인트라넷에 저장
    const res = await fetch(`${INTRANET_URL}/api/public/quote/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName, email, phone, hospitalName, memo, selectedProducts }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error ?? "처리 오류" },
        { status: res.status }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.timeofpassion.com";

    return NextResponse.json({
      success: true,
      quoteId: data.requestId,
      reviewUrl: `${baseUrl}/quote/${data.requestId}`,
      total: data.total,
      emailSent: false,
    });
  } catch (err) {
    console.error("Quote request failed:", err);
    return NextResponse.json(
      { error: "견적 요청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
