import PDFDocument from "pdfkit";
import type { QuoteRequest } from "./notion-quote";

export async function generateQuotePDF(
  quoteId: string,
  req: QuoteRequest,
  createdAt: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      info: {
        Title: `열정의시간 견적서 - ${req.hospitalName}`,
        Author: "열정의시간",
      },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const W = doc.page.width - 100; // content width
    const format = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

    // ── Header ──
    doc.rect(0, 0, doc.page.width, 80).fill("#0a0000");
    doc.fontSize(18).fill("#ffffff").text("열정의시간", 50, 28, { align: "left" });
    doc.fontSize(9).fill("rgba(255,255,255,0.5)").text("PASSION TIME // QUOTE DOCUMENT", 50, 52, { align: "left" });

    // ── Title section ──
    doc.fill("#1a1a1a");
    doc.moveDown(2);
    doc.y = 110;
    doc.fontSize(22).font("Helvetica-Bold").text("광고 운영 견적서", 50);
    doc.moveDown(0.5);

    // ── Meta info ──
    doc.fontSize(9).fill("#888").font("Helvetica");
    doc.text(`발행일: ${createdAt}`, 50);
    doc.text(`유효기간: 발행일로부터 14일`, 50);
    doc.text(`견적번호: ${quoteId.toUpperCase()}`, 50);
    doc.text(`고객사: ${req.hospitalName}`, 50);
    doc.moveDown(1.5);

    // ── Divider ──
    const divY = doc.y;
    doc.moveTo(50, divY).lineTo(50 + W, divY).stroke("#cc0000");
    doc.moveDown(1);

    // ── Campaign info ──
    doc.fontSize(11).fill("#333").font("Helvetica-Bold").text("캠페인 개요", 50);
    doc.moveDown(0.5);

    const infoY = doc.y;
    doc.fontSize(9).fill("#666").font("Helvetica");
    doc.text("고객명", 60, infoY);
    doc.text(req.customerName, 200, infoY);
    doc.text("병원명", 60, infoY + 18);
    doc.text(req.hospitalName, 200, infoY + 18);
    doc.text("이메일", 60, infoY + 36);
    doc.text(req.email, 200, infoY + 36);
    doc.text("연락처", 60, infoY + 54);
    doc.text(req.phone, 200, infoY + 54);
    doc.y = infoY + 80;
    doc.moveDown(1);

    // ── Table header ──
    doc.fontSize(11).fill("#333").font("Helvetica-Bold").text("견적 상세", 50);
    doc.moveDown(0.5);

    const tableTop = doc.y;
    doc.rect(50, tableTop, W, 28).fill("#f5f5f5");
    doc.fontSize(9).fill("#333").font("Helvetica-Bold");
    doc.text("서비스명", 60, tableTop + 8);
    doc.text("금액", 420, tableTop + 8, { width: 100, align: "right" });

    // ── Table rows ──
    let rowY = tableTop + 28;
    doc.font("Helvetica").fill("#444");
    req.selectedProducts.forEach((p, i) => {
      if (i % 2 === 0) {
        doc.rect(50, rowY, W, 24).fill("#fafafa");
      }
      doc.fill("#444").fontSize(9);
      doc.text(p.name, 60, rowY + 7);
      doc.text(`${format(p.price)} 원`, 420, rowY + 7, { width: 100, align: "right" });
      rowY += 24;
    });

    // ── Subtotal section ──
    rowY += 8;
    doc.moveTo(50, rowY).lineTo(50 + W, rowY).stroke("#ddd");
    rowY += 12;

    doc.fontSize(10).fill("#333").font("Helvetica");
    doc.text("공급가", 300, rowY, { width: 120, align: "right" });
    doc.font("Helvetica-Bold").text(`${format(req.subtotal)} 원`, 420, rowY, { width: 100, align: "right" });
    rowY += 22;

    doc.font("Helvetica").fill("#666");
    doc.text("부가가치세 (10%)", 300, rowY, { width: 120, align: "right" });
    doc.text(`${format(req.vat)} 원`, 420, rowY, { width: 100, align: "right" });
    rowY += 28;

    // ── Total ──
    doc.rect(50, rowY, W, 36).fill("#0a0000");
    doc.fontSize(12).fill("#ffffff").font("Helvetica-Bold");
    doc.text("총 견적 금액 (VAT 포함)", 60, rowY + 10);
    doc.text(`${format(req.total)} 원`, 380, rowY + 10, { width: 140, align: "right" });

    // ── Footer notes ──
    rowY += 56;
    if (req.memo) {
      doc.fontSize(9).fill("#666").font("Helvetica");
      doc.text(`추가 요청사항: ${req.memo}`, 50, rowY, { width: W });
      rowY += 30;
    }

    doc.fontSize(8).fill("#999");
    doc.text("본 견적서는 자동 생성되었으며, 발행일로부터 14일간 유효합니다.", 50, rowY);
    doc.text("견적 내용에 대해 궁금하신 점이 있으시면 부담 없이 문의 주세요.", 50, rowY + 14);

    // ── Bottom bar ──
    const footerY = doc.page.height - 50;
    doc.rect(0, footerY, doc.page.width, 50).fill("#f5f5f5");
    doc.fontSize(8).fill("#aaa");
    doc.text("열정의시간 | 문의: contact@passiontime.kr", 50, footerY + 18);

    doc.end();
  });
}
