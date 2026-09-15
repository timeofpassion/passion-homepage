// @ts-nocheck
// 진단 리포트 PDF — 설문 답변 + 홈페이지 빠른 확인 → A4 PDF (브라우저·AI 없음, 0.3초대)
// ★pdfkit 은 woff2 를 못 읽는다 → Pretendard 정적 OTF(public/fonts/pdf). 서버리스 파일시스템엔 public 이 없어서
//   자기 사이트 주소로 받아 메모리에 한 번만 담는다.
import PDFDocument from "pdfkit"
import { recommend } from "./engine"

const RED = "#E63329", INK = "#0f172a", SUB = "#475569", LINE = "#e7dcda"
const BASE = process.env.DIAGNOSIS_FONT_BASE ?? process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.timeofpassion.com"
let fonts: Record<string, Buffer> | null = null

async function loadFonts() {
  if (fonts) return fonts
  const get = async (n: string) => Buffer.from(await (await fetch(`${BASE}/fonts/pdf/Pretendard-${n}.otf`)).arrayBuffer())
  const [R, B, X] = await Promise.all([get("Regular"), get("Bold"), get("ExtraBold")])
  fonts = { R, B, X }
  return fonts
}

export async function buildReportPdf({ hospital, answers }): Promise<{ buffer: Buffer; result: ReturnType<typeof recommend> }> {
  const f = await loadFonts()
  const r = recommend(answers)
  const doc = new PDFDocument({ size: "A4", margins: { top: 40, bottom: 40, left: 48, right: 48 }, info: { Title: `${hospital.name} 마케팅 진단 리포트`, Author: "열정의시간" } })
  const chunks: Buffer[] = []
  doc.on("data", (c) => chunks.push(c))
  const done = new Promise<Buffer>((res) => doc.on("end", () => res(Buffer.concat(chunks))))
  doc.registerFont("R", f.R)
  doc.registerFont("B", f.B)
  doc.registerFont("X", f.X)
  const W = doc.page.width - 96
  const F = (w) => doc.font(w)

  doc.rect(0, 0, doc.page.width, 6).fill(RED)
  F("B").fontSize(9).fillColor(RED).text("열정의시간 · 병원 마케팅 진단 리포트", 48, 40)
  F("X").fontSize(24).fillColor(INK).text(hospital.name, 48, 58, { width: W })
  F("R").fontSize(9.5).fillColor(SUB).text([hospital.address, new Date().toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" }), answers.opening ? "개원 예정" : "원장님 답변 + 공개 정보 자동 확인"].filter(Boolean).join(" · "), 48, doc.y + 4, { width: W })

  const h2 = (t, sub?) => {
    doc.moveDown(1.2)
    if (doc.y > doc.page.height - 140) doc.addPage()
    F("X").fontSize(14).fillColor(INK).text(t, 48)
    if (sub) F("R").fontSize(9).fillColor(SUB).text(sub, 48)
    doc.moveDown(0.4)
  }

  // 지금 상태
  if (answers.opening) {
    h2("개원 전, 이제 만들 곳", "아직 문을 열기 전이라 세 곳 모두 처음부터 만듭니다")
  } else {
    h2("지금 상태", `가장 먼저 채울 곳: ${r.diagnosis.weakest}`)
    for (const a of r.diagnosis.axes) {
      const y = doc.y
      F("B").fontSize(11).fillColor(INK).text(a.name, 48, y, { width: 70 })
      doc.roundedRect(120, y + 3, 250, 8, 4).fill("#f1e9e8")
      doc.roundedRect(120, y + 3, (250 * a.score) / 100, 8, 4).fill(a.name === r.diagnosis.weakest ? RED : "#94a3b8")
      F("R").fontSize(9).fillColor(SUB).text(a.why, 382, y, { width: W - 334 })
      doc.y = Math.max(doc.y, y + 22)
    }
  }

  // 홈페이지 확인
  if (r.evidence.length) {
    h2("홈페이지에서 확인한 것", `${answers.channels?.quick?.url ?? ""} · 첫 화면 자동 확인`)
    const col = (W - 12) / 2
    r.evidence.forEach(([k, v], idx) => {
      const x = 48 + (idx % 2) * (col + 12)
      const y = idx % 2 === 0 ? doc.y : doc.y - 18
      doc.rect(x, y, col, 18).fill(Math.floor(idx / 2) % 2 ? "#ffffff" : "#fbf6f5")
      F("R").fontSize(9.5).fillColor(INK).text(k, x + 8, y + 4, { width: col - 60 })
      F("B").fontSize(9.5).fillColor(v ? "#15803d" : RED).text(v ? "있음" : "없음", x + col - 50, y + 4, { width: 42, align: "right" })
      if (idx % 2 === 1 || idx === r.evidence.length - 1) doc.y = y + 20
    })
    if (typeof r.blogMentions30d === "number") F("R").fontSize(9.5).fillColor(INK).text(`최근 30일 병원 이름이 들어간 네이버 블로그 글: ${r.blogMentions30d}건`, 48, doc.y + 4)
  }

  // 고민 해결표
  if (r.coverage.length) {
    h2("답하신 고민, 이렇게 채웁니다", `${r.coverage.filter((c) => c.covered).length}/${r.coverage.length}`)
    for (const c of r.coverage) {
      F("B").fontSize(10).fillColor(c.covered ? RED : SUB).text(c.covered ? "✓ " : "· ", 48, doc.y, { continued: true, width: W })
      F("R").fillColor(INK).text(`${c.label}  `, { continued: true })
      F("R").fontSize(9).fillColor(SUB).text(c.covered ? `→ ${c.by.join(" · ")}` : "→ 상담에서 방법 제안")
    }
  }

  // 도입 순서·금액
  h2("도입 순서와 예상 금액", `첫 달 ${(r.oneTime + r.monthly).toLocaleString()}만 원 · 2개월차부터 매달 ${r.monthly.toLocaleString()}만 원 (VAT 별도)`)
  const stage = (title, items, unit) => {
    if (!items.length) return
    F("B").fontSize(10).fillColor(RED).text(title, 48)
    for (const x of items) {
      if (doc.y > doc.page.height - 90) doc.addPage()
      const y = doc.y + 2
      F("B").fontSize(10.5).fillColor(INK).text(x.name, 60, y, { width: W - 110 })
      F("X").fontSize(10.5).fillColor(INK).text(`${x.price.toLocaleString()}만${unit ? " " + unit : ""}`, 48 + W - 90, y, { width: 90, align: "right" })
      F("R").fontSize(9).fillColor(SUB).text(x.why, 60, doc.y, { width: W - 20 })
      doc.moveDown(0.3)
    }
  }
  stage("1개월차 · 한 번 만드는 것", r.foundation, "1회")
  stage("매달 · 운영", r.engine, "월")
  stage("3개월차부터 · 반응을 보고 더하는 것", r.amplify, "")

  if (r.faq.length) {
    h2("확인하고 싶으셨던 내용")
    for (const q of r.faq) {
      F("B").fontSize(10).fillColor(INK).text(q.q, 48)
      F("R").fontSize(9.5).fillColor("#334155").text(q.a, 48, doc.y, { width: W, lineGap: 2 })
      if (q.src) F("R").fontSize(8).fillColor(SUB).text(`출처: ${q.src}`, 48)
      doc.moveDown(0.4)
    }
  }
  if (r.others.length) {
    h2("직접 적어주신 내용")
    r.others.forEach((o) => F("R").fontSize(9.5).fillColor("#334155").text(`· ${o.text}`, 48, doc.y, { width: W }))
  }
  if (r.notes.length) {
    h2("참고")
    r.notes.forEach((n) => F("R").fontSize(9.5).fillColor("#334155").text(`· ${n}`, 48, doc.y, { width: W, lineGap: 1.5 }))
  }
  doc.moveDown(1)
  doc.moveTo(48, doc.y).lineTo(48 + W, doc.y).strokeColor(LINE).stroke()
  F("R").fontSize(8.5).fillColor(SUB).text("원장님 답변과 공개된 홈페이지 정보를 자동으로 정리한 리포트입니다. 담당자가 병원 상황을 확인한 뒤 맞춤 제안서와 견적서를 보내드립니다. 광고 집행비·의료광고 심의 수수료는 별도이며, 사례 수치는 특정 성과를 보장하지 않습니다. 문의: 카카오톡 채널 「열정의시간」", 48, doc.y + 6, { width: W, lineGap: 1.5 })
  doc.end()
  return { buffer: await done, result: r }
}
