"use client";

import { useEffect, useState } from "react";
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
  const [responding, setResponding] = useState(false);
  const [responded, setResponded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleRespond = async (action: string) => {
    setResponding(true);
    try {
      const res = await fetch(`/api/quote/${id}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) setResponded(action);
      else alert(data.error);
    } catch {
      alert("처리 중 오류가 발생했습니다.");
    } finally {
      setResponding(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa" }}>
        <div className="font-mono-sys" style={{ color: "#aaa", fontSize: 12 }}>LOADING_QUOTE...</div>
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

  // Responded screen
  if (responded) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", padding: "2rem" }}>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: responded === "승인" ? "#e8f5e9" : "#fff3e0", border: `2px solid ${responded === "승인" ? "#4caf50" : "#ff9800"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28 }}>
            {responded === "승인" ? "✓" : "✏"}
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>
            {responded === "승인" ? "견적이 승인되었습니다" : "수정 요청이 접수되었습니다"}
          </h2>
          <p style={{ color: "#888", lineHeight: 1.7 }}>
            {responded === "승인"
              ? "승인 시 광고주 정보를 입력하신 후 표준 계약서를 발송해 드립니다."
              : "조건을 조정하고 싶으시면 새 견적을 자동으로 생성해 드립니다."}
          </p>
          <p style={{ color: "#aaa", fontSize: "0.8rem", marginTop: 20 }}>
            문의: ceo@timeofpassion.com
          </p>
        </div>
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

  // ── Main review page (AIMTOP style - light theme) ──
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", color: "#1a1a1a" }}>
      {/* Header */}
      <div style={{ background: "#0a0000", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>열정의시간</span>
        <span className="font-mono-sys" style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>광고 운영 견적서</span>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        {/* Title */}
        <h1 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 4 }}>견적 검토 및 응답</h1>
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
              <span style={{ fontWeight: 600 }}>{format(p.price)}<span style={{ color: "#aaa", fontWeight: 400 }}>만 원</span></span>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 4px", marginTop: 8, fontSize: "0.85rem", color: "#888" }}>
            <span>공급가</span>
            <span style={{ fontWeight: 600, color: "#333" }}>{format(quote.subtotal)}<span style={{ color: "#aaa", fontWeight: 400 }}>만 원</span></span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0 14px", fontSize: "0.85rem", color: "#888", borderBottom: "1px solid #f0f0f0" }}>
            <span>부가가치세 (10%)</span>
            <span>{format(quote.vat)}<span style={{ color: "#aaa" }}>만 원</span></span>
          </div>
        </div>

        {/* Action buttons */}
        <button
          onClick={() => handleRespond("승인")}
          disabled={responding}
          style={{
            width: "100%",
            padding: "18px",
            background: "#1a1a1a",
            color: "#fff",
            border: "none",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          ✓ 견적 승인하고 계약서 받기
        </button>

        <button
          onClick={() => handleRespond("수정 요청")}
          disabled={responding}
          style={{
            width: "100%",
            padding: "16px",
            background: "#fff",
            color: "#333",
            border: "1px solid #ddd",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ✏ 조건 수정 요청
        </button>

        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#bbb", marginTop: 20, lineHeight: 1.6 }}>
          승인 시 광고주 정보를 입력하신 후 표준 계약서를 발송해 드립니다.
        </p>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 40, paddingTop: 20, borderTop: "1px solid #eee" }}>
          <p style={{ fontSize: "0.7rem", color: "#ccc" }}>
            본 페이지는 열정의시간에서 발송한 견적에 응답하기 위한 페이지입니다.
          </p>
          <p style={{ fontSize: "0.7rem", color: "#ccc", marginTop: 4 }}>
            문의: ceo@timeofpassion.com
          </p>
        </div>
      </div>
    </div>
  );
}
