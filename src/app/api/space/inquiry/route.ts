import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * 열정의공간 Connect 섹션 — 방문 안내·뉴스레터 구독 문의 수신.
 * RESEND_API_KEY 가 설정돼 있으면 대표 메일로 알림을 보낸다.
 * 키가 없거나 발송이 실패해도 사용자에게는 성공으로 응답한다(접수 자체는 유효).
 */

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_TO = process.env.SPACE_INQUIRY_TO ?? "ceo@timeofpassion.com";

export async function POST(request: Request) {
  let name = "";
  let email = "";
  try {
    const body = await request.json();
    name = String(body?.name ?? "").trim();
    email = String(body?.email ?? "").trim();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { error: "올바른 이메일을 입력해 주세요." },
      { status: 400 }
    );
  }

  if (resend) {
    try {
      await resend.emails.send({
        from: "열정의공간 <noreply@timeofpassion.com>",
        to: [NOTIFY_TO],
        replyTo: email,
        subject: `[열정의공간] 새 방문/구독 문의 — ${name || email}`,
        html: `
          <div style="font-family:'Pretendard',-apple-system,sans-serif;max-width:560px;margin:0 auto;">
            <div style="background:#16160f;padding:28px 32px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.28em;color:#d9b066;">PASSION SPACE</p>
              <h1 style="margin:8px 0 0;font-size:20px;font-weight:300;color:#fff;">새 방문 · 구독 문의</h1>
            </div>
            <div style="padding:32px;background:#f4f1ea;color:#23221e;">
              <p style="margin:0 0 14px;font-size:15px;"><b>이름</b> : ${name || "(미입력)"}</p>
              <p style="margin:0 0 14px;font-size:15px;"><b>이메일</b> : <a href="mailto:${email}" style="color:#9c7b3f;">${email}</a></p>
              <p style="margin:24px 0 0;font-size:13px;color:#6f6a60;">열정의공간 홈페이지 Connect 섹션을 통해 접수되었습니다.</p>
            </div>
          </div>`,
      });
    } catch (err) {
      // 발송 실패는 접수 성공에 영향을 주지 않는다.
      console.error("space inquiry email failed:", err);
    }
  } else {
    console.log("[space inquiry] (RESEND 미설정) 접수:", { name, email });
  }

  return NextResponse.json({ success: true });
}
