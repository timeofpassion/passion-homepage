import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface QuoteEmailParams {
  to: string;
  customerName: string;
  hospitalName: string;
  total: number;
  quoteId: string;
  pdfBuffer: Buffer;
}

export async function sendQuoteEmail(params: QuoteEmailParams) {
  const resend = getResend();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const reviewUrl = `${baseUrl}/quote/${params.quoteId}`;

  const formattedTotal = new Intl.NumberFormat("ko-KR").format(params.total);

  await resend.emails.send({
    from: "열정의시간 <onboarding@resend.dev>", // 실제 도메인 연결 시 변경
    to: params.to,
    subject: `[열정의시간] ${params.hospitalName} 견적서가 도착했습니다`,
    html: `
      <div style="font-family: 'Pretendard', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0a0000; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0;">열정의시간</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin-top: 8px; font-family: monospace;">광고 운영 견적서</p>
        </div>

        <div style="padding: 40px 32px;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            ${params.customerName}님 안녕하세요.
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            요청해 주신 <strong>${params.hospitalName}</strong>의 광고 운영 견적서를 첨부해 드립니다.
          </p>

          <div style="background: #f8f8f8; border: 1px solid #eee; padding: 24px; margin: 24px 0; text-align: center;">
            <p style="color: #666; font-size: 13px; margin: 0 0 8px;">총 견적 금액 (VAT 포함)</p>
            <p style="color: #0a0000; font-size: 32px; font-weight: 900; margin: 0;">${formattedTotal}원</p>
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            상세 내역은 첨부 PDF에서 확인하실 수 있습니다.
            견적 내용을 검토하시고 아래 버튼으로 응답해 주세요:
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${reviewUrl}" style="display: inline-block; background: #0a0000; color: #ffffff; padding: 16px 40px; text-decoration: none; font-weight: 700; font-size: 15px; border: 1px solid #cc0000;">
              견적 검토하고 응답하기 →
            </a>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 32px;">
            <p style="color: #999; font-size: 12px; line-height: 1.6;">
              ✓ <strong>승인:</strong> 견적이 마음에 드시면 즉시 계약서를 발송해 드립니다.<br>
              ✏ <strong>수정 요청:</strong> 조건을 조정하고 싶으시면 새 견적을 자동으로 생성해 드립니다.
            </p>
          </div>
        </div>

        <div style="background: #f5f5f5; padding: 20px 32px; text-align: center;">
          <p style="color: #999; font-size: 11px; margin: 0;">
            감사합니다.<br>열정의시간 드림
          </p>
          <p style="color: #ccc; font-size: 10px; margin-top: 8px;">
            본 견적서는 자동 생성되었으며, 발행일로부터 14일간 유효합니다.
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `열정의시간_견적서_${params.hospitalName}.pdf`,
        content: params.pdfBuffer,
      },
    ],
  });
}
