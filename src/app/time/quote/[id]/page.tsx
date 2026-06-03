"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface QuoteData {
  quoteId: string;
  customerName: string;
  email: string;
  phone: string;
  hospitalName: string;
  memo: string;
  products: string;
  subtotal: number;
  vat: number;
  total: number;
  status: string;
  createdAt: string;
}

interface ProductItem {
  name: string;
  price: number;
}

const format = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

export default function QuoteReviewPage() {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/quote/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.quote) setQuote(data.quote);
        else setError("견적을 찾을 수 없습니다.");
        setLoading(false);
      })
      .catch(() => {
        setError("견적 조회에 실패했습니다.");
        setLoading(false);
      });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa" }}>
        <p style={{ color: "#aaa", fontSize: "0.9rem" }}>견적서 불러오는 중...</p>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", flexDirection: "column", gap: 16 }}>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>{error || "견적을 찾을 수 없습니다."}</p>
        <Link href="/" style={{ color: "#cc0000", fontSize: "0.9rem" }}>홈으로 돌아가기</Link>
      </div>
    );
  }

  let products: ProductItem[] = [];
  try {
    products = JSON.parse(quote.products);
  } catch {
    products = [];
  }

  const createdDate = new Date(quote.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#fafafa", color: "#1a1a1a" }}>
        {/* Header */}
        <div style={{ background: "#0a0000", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>열정의시간</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>광고 운영 견적서</span>
        </div>

        <div ref={printRef} style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
          {/* Title */}
          <h1 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 4 }}>견적 검토</h1>
          <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: 32 }}>
            {quote.hospitalName || quote.customerName} · {createdDate}
          </p>

          {/* Total card */}
          <div style={{ background: "#fff", border: "1px solid #eee", padding: "24px", marginBottom: 32 }}>
            <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: 8 }}>총 견적 금액 (VAT 포함)</div>
            <div style={{ fontSize: "2rem", fontWeight: 900 }}>{format(quote.total)}원</div>
          </div>

          {/* Details */}
          <div style={{ background: "#fff", border: "1px solid #eee", padding: "24px", marginBottom: 32 }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 16 }}>견적 내역</h3>

            {products.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f0f0f0", fontSize: "0.9rem" }}>
                <span style={{ color: "#444" }}>{p.name}</span>
                <span style={{ fontWeight: 600 }}>{format(p.price)}원</span>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 4px", marginTop: 8, fontSize: "0.85rem", color: "#888" }}>
              <span>공급가</span>
              <span style={{ fontWeight: 600, color: "#333" }}>{format(quote.subtotal)}원</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0 14px", fontSize: "0.85rem", color: "#888", borderBottom: "1px solid #f0f0f0" }}>
              <span>부가가치세 (10%)</span>
              <span>{format(quote.vat)}원</span>
            </div>
          </div>

          {/* PDF / Print button */}
          <div className="no-print" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={handlePrint}
              style={{
                width: "100%",
                padding: "16px",
                background: "#1a1a1a",
                color: "#fff",
                border: "none",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              PDF 다운로드 / 인쇄
            </button>

            <a
              href={`mailto:ceo@timeofpassion.com?subject=[견적문의] ${quote.hospitalName || quote.customerName}&body=견적번호: ${quote.quoteId}%0A병원명: ${quote.hospitalName}%0A담당자: ${quote.customerName}%0A%0A문의 내용을 작성해주세요.`}
              style={{
                width: "100%",
                padding: "16px",
                background: "#fff",
                color: "#333",
                border: "1px solid #ddd",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                textAlign: "center",
                display: "block",
                boxSizing: "border-box",
              }}
            >
              이메일로 문의하기
            </a>
          </div>

          <p className="no-print" style={{ textAlign: "center", fontSize: "0.75rem", color: "#bbb", marginTop: 20, lineHeight: 1.6 }}>
            PDF 다운로드: 인쇄 화면에서 &quot;PDF로 저장&quot;을 선택하세요.
          </p>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 40, paddingTop: 20, borderTop: "1px solid #eee" }}>
            <p style={{ fontSize: "0.7rem", color: "#ccc" }}>
              본 견적서는 열정의시간에서 발행하였으며, 발행일로부터 14일간 유효합니다.
            </p>
            <p style={{ fontSize: "0.7rem", color: "#ccc", marginTop: 4 }}>
              문의: ceo@timeofpassion.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
