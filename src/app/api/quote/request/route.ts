import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { saveQuote, type QuoteRequest } from "@/lib/notion-quote";
import { sendQuoteEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      email,
      phone,
      hospitalName,
      memo,
      selectedProducts,
    } = body;

    // 유효성 검사
    if (!customerName || !email || !selectedProducts?.length) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 금액 계산
    const subtotal = selectedProducts.reduce(
      (sum: number, p: { price: number }) => sum + p.price,
      0
    );
    const vat = Math.round(subtotal * 0.1);
    const total = subtotal + vat;

    const quoteId = nanoid(10);

    const quoteRequest: QuoteRequest = {
      customerName,
      email,
      phone: phone || "",
      hospitalName: hospitalName || "",
      memo: memo || "",
      selectedProducts,
      subtotal,
      vat,
      total,
    };

    // 1) 노션에 저장
    await saveQuote(quoteId, quoteRequest);

    // 2) 이메일 발송 (Resend API 키가 있을 때만, PDF 없이)
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        await sendQuoteEmail({
          to: email,
          customerName,
          hospitalName: hospitalName || customerName,
          total,
          quoteId,
        });
        emailSent = true;
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    return NextResponse.json({
      success: true,
      quoteId,
      reviewUrl: `${baseUrl}/quote/${quoteId}`,
      total,
      emailSent,
    });
  } catch (err) {
    console.error("Quote request failed:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "견적 요청 처리 중 오류가 발생했습니다.", detail: msg },
      { status: 500 }
    );
  }
}
