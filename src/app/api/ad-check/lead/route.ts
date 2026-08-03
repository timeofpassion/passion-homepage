import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.timeofpassion.com";
const LEAD_INBOX = process.env.AD_CHECK_LEAD_INBOX ?? "ceo@timeofpassion.com";
const PDF_PATH = "/downloads/medical-ad-check-guide-2026.pdf";
const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";

/**
 * 자가검수 리드 접수.
 *
 * ★자료 전달은 메일에 기대지 않는다.
 * 이 프로젝트엔 RESEND_API_KEY 가 아예 없다(견적서 메일도 그래서 안 나가고 있었다).
 * 그래서 PDF는 폼 제출 직후 화면에서 바로 내려받게 하고, 메일은 키가 생기면
 * 자동으로 켜지는 덤으로만 둔다. 메일이 없다고 접수를 실패시키지 않는다.
 *
 * 리드는 인트라넷 QuoteRequest 로 넣는다. 스키마를 건드리지 않고 기존 리드함의
 * 담당자 배정·상태관리·회신노트를 그대로 쓰기 위해서다.
 * 서버가 source 를 "web" 으로 고정하므로, 구분은 memo 머리표와 products 로 한다.
 */

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string): boolean {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || now - cur.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  cur.n += 1;
  return cur.n > 5;
}

const VARIANT_LABEL: Record<string, string> = {
  pdf: "자료 신청",
  review: "원고 교정 요청",
  overseas: "해외 채널 상담",
};

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

interface Summary {
  media: string;
  risk: string;
  riskLabel: string;
  violationCount: number;
  articles: string[];
}

/** 인트라넷 리드함에서 한눈에 읽히도록 메모를 조립한다. */
function buildMemo(p: {
  variant: string;
  summary: Summary;
  org: string;
  sourceText?: string;
}) {
  const lines = [
    `[의료광고 자가검수] ${VARIANT_LABEL[p.variant]}`,
    "",
    `게시 매체: ${p.summary.media}`,
    `판정: ${p.summary.riskLabel} · 지적 ${p.summary.violationCount}건`,
    `걸린 조항: ${p.summary.articles.length ? p.summary.articles.join(", ") : "없음"}`,
  ];
  if (p.org) lines.push(`병원·기관: ${p.org}`);
  if (p.sourceText) {
    lines.push("", "── 검수한 원문 (본인 동의 후 전달됨) ──", p.sourceText);
  } else {
    lines.push("", "원문 미첨부 — 자가검수 도구는 입력 문구를 저장하지 않습니다.");
  }
  return lines.join("\n");
}

function buildUserEmail(name: string, variant: string) {
  const hello = name ? `${esc(name)}님, 안녕하세요.` : "안녕하세요.";
  const body =
    variant === "pdf"
      ? `<p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#3d3630;">
           의료광고 자가검수 도구에서 신청하신 <b style="color:#1a1512;">위반문구 대조표 12쪽</b>입니다.
           검수 도구가 판정하는 기준 그대로이고, 인쇄해서 원내 게시 승인 서식으로 쓰셔도 됩니다.
         </p>`
      : `<p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#3d3630;">
           요청 주신 내용 접수했습니다. 담당자가 확인 후 <b style="color:#1a1512;">영업일 기준 1~2일 안에</b> 회신드리겠습니다.
           기다리시는 동안 참고하실 수 있도록 <b style="color:#1a1512;">위반문구 대조표 12쪽</b>을 함께 보내드립니다.
         </p>`;

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;">
<tr><td align="center" style="padding:36px 16px;">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#fffdf9;border:1px solid #e6ded3;">
  <tr><td style="background:#140b09;padding:26px 32px;">
    <p style="margin:0;font-size:10.5px;letter-spacing:.24em;color:#E63329;font-weight:700;">MEDICAL AD COMPLIANCE</p>
    <h1 style="margin:9px 0 0;font-size:21px;font-weight:800;color:#fff;letter-spacing:-.02em;">의료광고 위반문구 대조표</h1>
    <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,.45);">열정의시간 · 12쪽 요약 발췌본</p>
  </td></tr>
  <tr><td style="padding:32px;">
    <p style="margin:0 0 14px;font-size:15px;color:#1a1512;font-weight:700;">${hello}</p>
    ${body}
    <table cellpadding="0" cellspacing="0"><tr><td style="background:#E63329;">
      <a href="${BASE_URL}${PDF_PATH}" style="display:inline-block;padding:15px 34px;color:#fff;text-decoration:none;font-weight:700;font-size:15px;">대조표 PDF 내려받기 →</a>
    </td></tr></table>
    <p style="margin:16px 0 0;font-size:12px;color:#8a8078;line-height:1.7;">
      버튼이 안 눌리면 아래 주소를 복사해 주세요.<br><span style="color:#544c44;">${BASE_URL}${PDF_PATH}</span>
    </p>
  </td></tr>
  <tr><td style="padding:22px 32px;border-top:1px solid #e6ded3;background:#fff;">
    <p style="margin:0 0 8px;font-size:13.5px;color:#1a1512;font-weight:700;">문장을 고치는 것까지는 이 표로 됩니다.</p>
    <p style="margin:0 0 14px;font-size:13px;color:#544c44;line-height:1.7;">
      고친 문장으로 환자가 오게 하는 건 다른 일입니다. 열정의시간은 국내와 해외(중국·일본·대만)에서
      병원 마케팅을 직접 운영합니다.
    </p>
    <a href="${KAKAO_URL}" style="display:inline-block;padding:10px 20px;background:#FEE500;color:#191600;text-decoration:none;font-weight:700;font-size:13px;">카카오톡으로 물어보기</a>
  </td></tr>
  <tr><td style="padding:18px 32px;background:#f5f0e8;">
    <p style="margin:0;font-size:11px;color:#a89e94;line-height:1.7;">
      본 자료는 의료법 제56조·제57조 및 시행령 제23조를 근거로 한 참고 자료이며 법적 효력이 없습니다.
      최종 판단·게시 책임은 게시자에게 있습니다.<br>열정의시간 · www.timeofpassion.com
    </p>
  </td></tr>
</table></td></tr></table></body></html>`;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";
    if (limited(ip)) {
      return NextResponse.json(
        { error: "요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const variant: string = body?.variant ?? "pdf";
    const email: string = String(body?.email ?? "").trim();
    const name: string = String(body?.name ?? "").trim().slice(0, 40);
    const org: string = String(body?.org ?? "").trim().slice(0, 60);
    const phone: string = String(body?.phone ?? "").trim().slice(0, 30);
    const sourceText: string | undefined = body?.sourceText
      ? String(body.sourceText).slice(0, 12000)
      : undefined;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "이메일 주소를 확인해 주세요." }, { status: 400 });
    }
    if (!VARIANT_LABEL[variant]) {
      return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
    }

    const s = body?.summary ?? {};
    const summary: Summary = {
      media: String(s.media ?? "-").slice(0, 20),
      risk: String(s.risk ?? "-").slice(0, 12),
      riskLabel: String(s.riskLabel ?? "-").slice(0, 20),
      violationCount: Number.isFinite(s.violationCount) ? Number(s.violationCount) : 0,
      articles: Array.isArray(s.articles) ? s.articles.slice(0, 20).map(String) : [],
    };

    // ── 리드 저장 (본체) ── 인트라넷 QuoteRequest. 여기가 실패하면 접수 실패다.
    const intranetRes = await fetch(`${INTRANET_URL}/api/public/quote/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // customerName 이 필수라 비면 이메일 아이디로 채운다.
        customerName: name || org || email.split("@")[0],
        email,
        phone: phone || null,
        hospitalName: org || null,
        memo: buildMemo({ variant, summary, org, sourceText }),
        selectedProducts: [
          {
            name: `의료광고 자가검수 · ${VARIANT_LABEL[variant]}`,
            price: 0,
            media: summary.media,
            risk: summary.riskLabel,
            violationCount: summary.violationCount,
            articles: summary.articles,
          },
        ],
      }),
    }).catch(() => null);

    if (!intranetRes || !intranetRes.ok) {
      console.error("ad-check lead: 인트라넷 저장 실패", intranetRes?.status);
      return NextResponse.json(
        { error: "접수 처리에 실패했습니다. 카카오톡 채널로 문의해 주세요." },
        { status: 502 }
      );
    }

    // ── 메일 (덤) ── 키가 없으면 조용히 건너뛴다. 자료는 화면에서 이미 받는다.
    let emailSent = false;
    if (resend) {
      try {
        const { error } = await resend.emails.send({
          from: "열정의시간 <noreply@timeofpassion.com>",
          to: [email],
          replyTo: LEAD_INBOX,
          subject:
            variant === "pdf"
              ? "[열정의시간] 의료광고 위반문구 대조표 12쪽"
              : "[열정의시간] 요청하신 내용을 접수했습니다",
          html: buildUserEmail(name, variant),
        });
        emailSent = !error;
      } catch (e) {
        console.error("ad-check lead: 자료 메일 발송 실패", e);
      }
    }

    return NextResponse.json({ success: true, emailSent, downloadUrl: PDF_PATH });
  } catch (err) {
    console.error("ad-check lead failed:", err);
    return NextResponse.json({ error: "처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
