import { NextResponse } from "next/server";

const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetch(`${INTRANET_URL}/api/public/quote/${id}`);

    if (!res.ok) {
      return NextResponse.json({ error: "견적을 찾을 수 없습니다." }, { status: 404 });
    }

    const data = await res.json();
    // 공개 사이트 호환 포맷으로 변환
    const req = data.quote;
    const products = Array.isArray(req.products) ? req.products : [];

    return NextResponse.json({
      quote: {
        id: req.id,
        quoteId: req.id,
        customerName: req.customerName,
        email: req.email,
        phone: req.phone ?? "",
        hospitalName: req.hospitalName ?? "",
        memo: req.memo ?? "",
        products: JSON.stringify(products),
        subtotal: req.subtotal,
        vat: req.vat,
        total: req.total,
        status: req.status === "NEW" ? "대기" : req.status === "WON" ? "계약완료" : req.status,
        createdAt: req.createdAt,
      }
    });
  } catch {
    return NextResponse.json({ error: "견적 조회 실패" }, { status: 500 });
  }
}
