"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  minQty: number;
  description: string;
  notionUrl: string;
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
}

const format = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

const BUDGET_OPTIONS = [
  { value: "100-300", label: "100 – 300만원 / 월" },
  { value: "300-600", label: "300 – 600만원 / 월" },
  { value: "600-1000", label: "600 – 1,000만원 / 월" },
  { value: "1000-2000", label: "1,000 – 2,000만원 / 월" },
  { value: "2000+", label: "2,000만원 이상 / 월" },
];

const KAKAO_URL = "http://pf.kakao.com/_RgYcxj/chat";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  color: "rgba(255,255,255,0.5)",
  marginBottom: 6,
};

export default function QuotePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    quoteId: string;
    reviewUrl: string;
    total: number;
    emailSent: boolean;
  } | null>(null);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    hospitalName: "",
    budget: "",
    memo: "",
  });

  useEffect(() => {
    fetch("/api/quote/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleProduct = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedProducts: SelectedProduct[] = products
    .filter((p) => selected.has(p.id))
    .map((p) => ({ id: p.id, name: p.name, price: p.price * (p.minQty || 1) }));

  const subtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const vat = Math.round(subtotal * 0.1);
  const total = subtotal + vat;

  const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
    const cat = p.category || "기타";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const handleSubmit = async () => {
    if (!form.customerName || !form.email || selectedProducts.length === 0) {
      alert("이름, 이메일, 서비스 선택은 필수입니다.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, selectedProducts }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data);
      } else {
        alert(data.error || "오류가 발생했습니다.");
      }
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──
  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0000",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(204,0,0,0.1)",
              border: "2px solid #cc0000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 28,
              color: "#cc0000",
            }}
          >
            ✓
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 12 }}>
            견적 의뢰가 접수되었습니다
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              marginBottom: 8,
            }}
          >
            {success.emailSent
              ? "입력해 주신 이메일로 견적서가 발송되었습니다."
              : "견적 의뢰가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다."}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.85rem",
              marginBottom: 32,
            }}
          >
            총 금액:{" "}
            <strong style={{ color: "#fff" }}>{format(success.total)}원</strong>{" "}
            (VAT 포함)
          </p>
          <Link
            href={success.reviewUrl}
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "#1a0000",
              border: "1px solid rgba(204,0,0,0.4)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
            }}
          >
            견적서 확인하기 →
          </Link>
          <div style={{ marginTop: 16 }}>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "#FEE500",
                color: "#3C1E1E",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginTop: 8,
              }}
            >
              <KakaoIcon />
              카카오톡으로 직접 문의하기
            </a>
          </div>
          <div style={{ marginTop: 20 }}>
            <Link
              href="/"
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ──
  return (
    <div style={{ minHeight: "100vh", background: "#0a0000", color: "#fff" }}>
      {/* Header */}
      <div
        style={{
          padding: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          열정의시간
        </Link>
        <span
          className="font-mono-sys"
          style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}
        >
          QUOTE_REQUEST // ACTIVE
        </span>
      </div>

      <div
        style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem 6rem" }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            className="font-mono-sys"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#cc0000",
              marginBottom: 16,
            }}
          >
            QUOTE REQUEST
          </div>
          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 900,
              marginBottom: 12,
            }}
          >
            견적 의뢰하기
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontWeight: 300,
              fontSize: "0.95rem",
            }}
          >
            원하시는 서비스를 선택하시면 자동으로 견적서가 발송됩니다.
          </p>
        </div>

        {/* 01 Service selection */}
        <div style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "#cc0000" }}>01</span> 서비스 선택
          </h2>

          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              <div className="font-mono-sys" style={{ fontSize: 12 }}>
                LOADING_PRODUCTS...
              </div>
            </div>
          ) : products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <p style={{ marginBottom: 8 }}>현재 견적 가능한 상품이 없습니다.</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
                노션 상품기획 DB에서 상품 상태를 &quot;판매 중&quot;으로
                변경해주세요.
              </p>
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} style={{ marginBottom: 24 }}>
                <div
                  className="font-mono-sys"
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.1em",
                    marginBottom: 10,
                    textTransform: "uppercase",
                  }}
                >
                  {category}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {items.map((p) => (
                    <label
                      key={p.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "14px 18px",
                        background: selected.has(p.id)
                          ? "rgba(204,0,0,0.08)"
                          : "rgba(255,255,255,0.02)",
                        border: `1px solid ${
                          selected.has(p.id)
                            ? "rgba(204,0,0,0.3)"
                            : "rgba(255,255,255,0.08)"
                        }`,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selected.has(p.id)}
                        onChange={() => toggleProduct(p.id)}
                        style={{ accentColor: "#cc0000", width: 16, height: 16 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                          {p.name}
                        </div>
                        {p.description && (
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "rgba(255,255,255,0.4)",
                              marginTop: 2,
                            }}
                          >
                            {p.description}
                          </div>
                        )}
                        {p.notionUrl && (
                          <a
                            href={p.notionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              display: "inline-block",
                              marginTop: 6,
                              fontSize: "0.75rem",
                              color: "#cc0000",
                              textDecoration: "none",
                              borderBottom: "1px solid rgba(204,0,0,0.3)",
                              paddingBottom: 1,
                            }}
                          >
                            세부내역 보러가기 →
                          </a>
                        )}
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: selected.has(p.id)
                            ? "#fff"
                            : "rgba(255,255,255,0.6)",
                          whiteSpace: "nowrap",
                          textAlign: "right",
                        }}
                      >
                        {p.price > 0 ? (
                          <>
                            <div>{format(p.price * (p.minQty || 1))}원</div>
                            {(p.minQty || 1) > 1 && (
                              <div
                                style={{
                                  fontSize: "0.7rem",
                                  color: "rgba(255,255,255,0.35)",
                                  fontWeight: 400,
                                }}
                              >
                                @{format(p.price)}원 × {p.minQty}건
                              </div>
                            )}
                          </>
                        ) : (
                          "별도 문의"
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Inline quote summary (visible when items selected) */}
        {selectedProducts.length > 0 && (
          <div
            style={{
              padding: "1.5rem 2rem",
              background: "rgba(204,0,0,0.04)",
              border: "1px solid rgba(204,0,0,0.2)",
              marginBottom: "3rem",
            }}
          >
            <div
              className="font-mono-sys"
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
                marginBottom: 16,
              }}
            >
              QUOTE_SUMMARY
            </div>
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{p.name}</span>
                <span>{format(p.price)}원</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0 4px",
                marginTop: 8,
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span>공급가</span>
              <span>{format(subtotal)}원</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span>부가세 (10%)</span>
              <span>{format(vat)}원</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 0 0",
                marginTop: 8,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                fontSize: "1.2rem",
                fontWeight: 800,
              }}
            >
              <span>총 견적 금액</span>
              <span style={{ color: "#cc0000" }}>{format(total)}원</span>
            </div>
          </div>
        )}

        {/* 02 Customer info */}
        <div style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "#cc0000" }}>02</span> 고객 정보
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* 담당자 성함 */}
            <div>
              <label style={labelStyle}>담당자 성함 *</label>
              <input
                type="text"
                placeholder="홍길동"
                value={form.customerName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, customerName: e.target.value }))
                }
                style={inputStyle}
              />
            </div>

            {/* 이메일 */}
            <div>
              <label style={labelStyle}>이메일 *</label>
              <input
                type="email"
                placeholder="example@hospital.com"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                style={inputStyle}
              />
            </div>

            {/* 연락처 */}
            <div>
              <label style={labelStyle}>연락처</label>
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                style={inputStyle}
              />
            </div>

            {/* 클라이언트명 */}
            <div>
              <label style={labelStyle}>클라이언트명</label>
              <input
                type="text"
                placeholder="고객사명 (예: OO병원, OO클리닉)"
                value={form.hospitalName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, hospitalName: e.target.value }))
                }
                style={inputStyle}
              />
            </div>

            {/* 월 예산 */}
            <div>
              <label style={labelStyle}>월 예산</label>
              <select
                value={form.budget}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, budget: e.target.value }))
                }
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  paddingRight: 40,
                }}
              >
                <option value="" style={{ background: "#1a0000" }}>
                  선택해 주세요
                </option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    style={{ background: "#1a0000" }}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 추가 요청사항 */}
            <div>
              <label style={labelStyle}>추가 요청사항</label>
              <textarea
                rows={3}
                placeholder="궁금한 점이나 요청사항을 자유롭게 적어주세요."
                value={form.memo}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, memo: e.target.value }))
                }
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting || selectedProducts.length === 0}
          style={{
            width: "100%",
            padding: "18px",
            background: submitting ? "rgba(204,0,0,0.3)" : "#cc0000",
            border: "none",
            color: "#fff",
            fontSize: "1.05rem",
            fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: selectedProducts.length === 0 ? 0.3 : 1,
            transition: "all 0.3s ease",
            marginBottom: 12,
          }}
        >
          {submitting ? "견적서 생성 중..." : "견적서 발송 요청하기"}
        </button>

        {/* KakaoTalk CTA */}
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            padding: "16px",
            background: "#FEE500",
            color: "#3C1E1E",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1rem",
            boxSizing: "border-box",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.opacity = "0.85")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.opacity = "1")
          }
        >
          <KakaoIcon />
          카카오톡으로 견적 직접 문의하기
        </a>

        <p
          className="font-mono-sys"
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
            marginTop: 16,
          }}
        >
          견적서는 입력하신 이메일로 자동 발송됩니다.
        </p>
      </div>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="#3C1E1E"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 3c-5.523 0-10 3.538-10 7.9 0 2.85 1.848 5.347 4.636 6.74l-1.185 4.316c-.056.205.18.366.353.243l5.06-3.327c.373.048.755.074 1.146.074 5.523 0 10-3.538 10-7.9S17.523 3 12 3z" />
    </svg>
  );
}
