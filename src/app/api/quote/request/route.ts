import { NextResponse } from "next/server";
import { Resend } from "resend";

const INTRANET_URL =
  process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.timeofpassion.com";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const format = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

function buildQuoteEmail(params: {
  requestNum: string;
  customerName: string;
  hospitalName: string;
  budget: string;
  products: Array<{ name: string; price: number }>;
  subtotal: number;
  vat: number;
  total: number;
  reviewUrl: string;
}) {
  const { requestNum, customerName, hospitalName, budget, products, subtotal, vat, total, reviewUrl } = params;

  const budgetLabel: Record<string, string> = {
    "100-300": "100 – 300만원 / 월",
    "300-600": "300 – 600만원 / 월",
    "600-1000": "600 – 1,000만원 / 월",
    "1000-2000": "1,000 – 2,000만원 / 월",
    "2000+": "2,000만원 이상 / 월",
  };

  const rows = products
    .map(
      (p) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #2a0000;color:#ccc;font-size:14px;">${p.name}</td>
        <td style="padding:10px 0;border-bottom:1px solid #2a0000;text-align:right;color:#fff;font-size:14px;white-space:nowrap;">${format(p.price)}원</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0000;font-family:'Apple SD Gothic Neo',Malgun Gothic,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0000;">
    <tr><td align="center" style="padding:40px 20px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#110000;border:1px solid #2a0000;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#cc0000;padding:28px 36px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.6);">QUOTE REQUEST</p>
            <h1 style="margin:8px 0 0;font-size:24px;font-weight:900;color:#fff;">견적서</h1>
          </td>
        </tr>

        <!-- Meta -->
        <tr>
          <td style="padding:24px 36px;border-bottom:1px solid #2a0000;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:rgba(255,255,255,0.4);font-size:12px;padding-bottom:6px;">견적 번호</td>
                <td style="color:#fff;font-size:12px;text-align:right;padding-bottom:6px;">${requestNum}</td>
              </tr>
              <tr>
                <td style="color:rgba(255,255,255,0.4);font-size:12px;padding-bottom:6px;">담당자</td>
                <td style="color:#fff;font-size:12px;text-align:right;padding-bottom:6px;">${customerName}</td>
              </tr>
              ${hospitalName ? `<tr>
                <td style="color:rgba(255,255,255,0.4);font-size:12px;padding-bottom:6px;">클라이언트명</td>
                <td style="color:#fff;font-size:12px;text-align:right;padding-bottom:6px;">${hospitalName}</td>
              </tr>` : ""}
              ${budget ? `<tr>
                <td style="color:rgba(255,255,255,0.4);font-size:12px;padding-bottom:6px;">월 예산</td>
                <td style="color:#fff;font-size:12px;text-align:right;padding-bottom:6px;">${budgetLabel[budget] ?? budget}</td>
              </tr>` : ""}
            </table>
          </td>
        </tr>

        <!-- Products -->
        <tr>
          <td style="padding:24px 36px;border-bottom:1px solid #2a0000;">
            <p style="margin:0 0 16px;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;">선택 서비스</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- Totals -->
        <tr>
          <td style="padding:24px 36px;border-bottom:1px solid #2a0000;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:rgba(255,255,255,0.5);font-size:13px;padding-bottom:8px;">공급가</td>
                <td style="color:rgba(255,255,255,0.5);font-size:13px;text-align:right;padding-bottom:8px;">${format(subtotal)}원</td>
              </tr>
              <tr>
                <td style="color:rgba(255,255,255,0.5);font-size:13px;padding-bottom:8px;">부가세 (10%)</td>
                <td style="color:rgba(255,255,255,0.5);font-size:13px;text-align:right;padding-bottom:8px;">${format(vat)}원</td>
              </tr>
              <tr>
                <td style="color:#fff;font-size:18px;font-weight:900;padding-top:12px;border-top:1px solid #3a0000;">총 견적 금액</td>
                <td style="color:#cc0000;font-size:18px;font-weight:900;text-align:right;padding-top:12px;border-top:1px solid #3a0000;">${format(total)}원</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:28px 36px;text-align:center;">
            <a href="${reviewUrl}" style="display:inline-block;padding:14px 32px;background:#cc0000;color:#fff;text-decoration:none;font-weight:700;font-size:15px;">
              견적서 온라인으로 확인하기 →
            </a>
            <p style="margin:20px 0 0;font-size:12px;color:rgba(255,255,255,0.3);">
              견적 관련 문의는 카카오톡 채널로 연락 주세요.<br>
              <a href="http://pf.kakao.com/_RgYcxj/chat" style="color:#FEE500;text-decoration:none;">열정의시간 카카오톡 채널 바로가기</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;background:#0a0000;border-top:1px solid #2a0000;">
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);text-align:center;">
              열정의시간 · www.timeofpassion.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, hospitalName, budget, memo, selectedProducts } = body;

    if (!customerName || !email || !selectedProducts?.length) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 예산 정보를 메모 앞에 추가
    const budgetLabel: Record<string, string> = {
      "100-300": "100 – 300만원/월",
      "300-600": "300 – 600만원/월",
      "600-1000": "600 – 1,000만원/월",
      "1000-2000": "1,000 – 2,000만원/월",
      "2000+": "2,000만원 이상/월",
    };
    const budgetNote = budget ? `[월 예산: ${budgetLabel[budget] ?? budget}]` : "";
    const enrichedMemo = [budgetNote, memo].filter(Boolean).join("\n");

    // 인트라넷에 저장
    const res = await fetch(`${INTRANET_URL}/api/public/quote/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        email,
        phone,
        hospitalName,
        memo: enrichedMemo,
        selectedProducts,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error ?? "처리 오류" },
        { status: res.status }
      );
    }

    const reviewUrl = `${BASE_URL}/quote/${data.requestId}`;

    // 견적 금액 계산
    const subtotal = selectedProducts.reduce(
      (s: number, p: { price: number }) => s + p.price,
      0
    );
    const vat = Math.round(subtotal * 0.1);
    const total = subtotal + vat;

    // Resend 이메일 발송
    let emailSent = false;
    if (resend) {
      try {
        const { error: emailError } = await resend.emails.send({
          from: "열정의시간 견적 <noreply@timeofpassion.com>",
          to: [email],
          subject: `견적서 ${data.requestNum} – 열정의시간`,
          html: buildQuoteEmail({
            requestNum: data.requestNum,
            customerName,
            hospitalName: hospitalName ?? "",
            budget: budget ?? "",
            products: selectedProducts,
            subtotal,
            vat,
            total,
            reviewUrl,
          }),
        });
        if (!emailError) emailSent = true;
      } catch {
        // 이메일 실패해도 견적 요청 자체는 성공 처리
      }
    }

    return NextResponse.json({
      success: true,
      quoteId: data.requestId,
      reviewUrl,
      total: data.total,
      emailSent,
    });
  } catch (err) {
    console.error("Quote request failed:", err);
    return NextResponse.json(
      { error: "견적 요청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
