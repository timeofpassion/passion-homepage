"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  topCategory?: string; // 대분류(마케팅은 국가별). 없으면 category 로 폴백
  category2?: string; // 세부 카테고리
  price: number;
  minQty: number;
  description: string;
  notionUrl: string;
}

// 대분류 표시 순서(해외 마케팅 우선)
const TOP_ORDER = ["일본마케팅", "대만마케팅", "중국마케팅", "국내마케팅", "디자인", "영상·사진·음향", "번역·통역"];

interface DetailOption {
  tier: string;
  optionTitle: string;
  price: number;
  workDays: number | null;
  workHours: number | null;
  revisions: number | null;
  sampleCount: number | null;
  minQuantity: number | null;
  unit: string;
  description: string;
  features: string[];
}
interface ProductDetail {
  id: string;
  name: string;
  category: string;
  category2: string;
  summary: string;
  descriptionText: string;
  thumbnailUrl: string;
  detailImages: string[];
  videoUrl: string;
  features: string[];
  pricingMode: string;
  priceMin: number | null;
  priceMax: number | null;
  options: DetailOption[];
}
const TIER_LABEL: Record<string, string> = { SINGLE: "", STANDARD: "STANDARD", DELUXE: "DELUXE", PREMIUM: "PREMIUM" };

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
}

interface AssistItem {
  id: string;
  name: string;
  category: string;
  price: number;
  minQty: number;
  lineTotal: number;
  reason: string;
}
interface AssistResult {
  items: AssistItem[];
  suggestions: { id: string; name: string; price: number; minQty: number; lineTotal: number; reason: string }[];
  excluded: { name: string; reason: string }[];
  note: string;
  subtotal: number;
  vat: number;
  total: number;
  needsConsult: boolean;
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

  // 주관식 AI 견적 어시스턴트
  const [assistText, setAssistText] = useState("");
  const [assisting, setAssisting] = useState(false);
  const [assistResult, setAssistResult] = useState<AssistResult | null>(null);

  // 서비스 직접 선택 — 검색 + 카테고리 필터
  const [search, setSearch] = useState("");
  const [activeTop, setActiveTop] = useState("");
  const [activeSub, setActiveSub] = useState("");

  // 상품 상세 모달
  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

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

  // 상품 상세 열기(모달)
  const openDetail = async (id: string) => {
    setDetail(null);
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/quote/products/${id}`);
      const d = await res.json();
      if (res.ok && d && d.id) setDetail(d as ProductDetail);
      else alert("상세 정보를 불러오지 못했습니다.");
    } catch {
      alert("상세 정보를 불러오지 못했습니다.");
    } finally {
      setDetailLoading(false);
    }
  };
  const closeDetail = () => {
    setDetail(null);
    setDetailLoading(false);
  };

  // 주관식 → AI 견적 조합 → 실제 선택(장바구니)에 자동 반영
  const askAssistant = async () => {
    const t = assistText.trim();
    if (!t) return;
    setAssisting(true);
    try {
      const res = await fetch("/api/quote/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: t }),
      });
      const data = await res.json();
      if (!data.ok) {
        alert(data.error || "AI 견적 조합에 실패했습니다.");
        return;
      }
      setAssistResult(data as AssistResult);
      setSelected(new Set((data.items as AssistItem[]).map((it) => it.id)));
      setTimeout(
        () => document.getElementById("quote-services")?.scrollIntoView({ behavior: "smooth", block: "start" }),
        180,
      );
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setAssisting(false);
    }
  };

  const addSuggestion = (id: string) => setSelected((prev) => new Set(prev).add(id));

  const selectedProducts: SelectedProduct[] = products
    .filter((p) => selected.has(p.id))
    .map((p) => ({ id: p.id, name: p.name, price: p.price * (p.minQty || 1) }));

  const subtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const vat = Math.round(subtotal * 0.1);
  const total = subtotal + vat;

  // 2단계 카테고리: 대분류(topCategory) → 세부(category2). 없으면 category(대분류)로 폴백.
  const topOf = (p: Product) => p.topCategory || p.category || "기타";
  const subOf = (p: Product) => p.category2 || p.category || "기타";

  // 대분류 목록(선호 순서 정렬) + 건수
  const topCounts = products.reduce<Record<string, number>>((acc, p) => {
    const t = topOf(p);
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});
  const topList = Object.keys(topCounts).sort(
    (a, b) => (TOP_ORDER.indexOf(a) < 0 ? 99 : TOP_ORDER.indexOf(a)) - (TOP_ORDER.indexOf(b) < 0 ? 99 : TOP_ORDER.indexOf(b)),
  );

  // 선택된 대분류의 세부 카테고리 목록(검색·세부필터 무시, 대분류만 기준) — 2단계 칩용
  const subCounts = products
    .filter((p) => !activeTop || topOf(p) === activeTop)
    .reduce<Record<string, number>>((acc, p) => {
      const s = subOf(p);
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
  const subList = Object.keys(subCounts);

  const q = search.trim().toLowerCase();
  const matchP = (p: Product) =>
    (!activeTop || topOf(p) === activeTop) &&
    (!activeSub || subOf(p) === activeSub) &&
    (!q ||
      p.name.toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q) ||
      (p.category2 || "").toLowerCase().includes(q));
  const visibleProducts = products.filter(matchP);
  // 표시 그룹핑: 세부 카테고리(category2) 기준 헤더
  const visibleGrouped = visibleProducts.reduce<Record<string, Product[]>>((acc, p) => {
    const g = subOf(p);
    if (!acc[g]) acc[g] = [];
    acc[g].push(p);
    return acc;
  }, {});

  // 대분류 변경 시 세부 선택 초기화
  const selectTop = (t: string) => {
    setActiveTop(t);
    setActiveSub("");
  };

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

        {/* AI 견적 어시스턴트 (주관식) */}
        <div
          style={{
            marginBottom: "2.4rem",
            border: "1px solid rgba(204,0,0,0.4)",
            background: "linear-gradient(180deg, rgba(204,0,0,0.09), rgba(255,255,255,0.02))",
            padding: "1.6rem",
          }}
        >
          <div className="font-mono-sys" style={{ fontSize: 10, letterSpacing: "0.15em", color: "#ff5c5c", marginBottom: 10 }}>
            AI QUOTE ASSISTANT
          </div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 6 }}>뭘 골라야 할지 모르겠다면, 말로 적어주세요</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: 14 }}>
            지금 필요한 걸 편하게 적으면, 실제 서비스로 딱 맞는 견적을 조합해 드립니다.
          </p>
          <textarea
            value={assistText}
            onChange={(e) => setAssistText(e.target.value)}
            placeholder="예: 일본에서 환자를 유치하고 싶어요. 인스타랑 라인 문의 응대까지 됐으면 좋겠고, 처음엔 크지 않게 시작하고 싶어요."
            rows={3}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "10px 0 14px" }}>
            {[
              "일본·대만 환자를 늘리고 싶어요",
              "인스타 관리가 안 돼요. 콘텐츠가 필요해요",
              "개원 준비 중이에요. 명함·홍보물이 필요해요",
              "중국 샤오홍슈로 홍보하고 싶어요",
            ].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setAssistText(ex)}
                style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 10px", borderRadius: 999, cursor: "pointer" }}
              >
                {ex}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={askAssistant}
            disabled={assisting || !assistText.trim()}
            style={{ background: "#cc0000", color: "#fff", border: "none", padding: "12px 24px", fontWeight: 800, fontSize: "0.9rem", cursor: assisting || !assistText.trim() ? "default" : "pointer", opacity: assisting || !assistText.trim() ? 0.5 : 1 }}
          >
            {assisting ? "AI가 견적 짜는 중…" : "✦ AI 견적 받기"}
          </button>

          {assistResult && (
            <div style={{ marginTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
              {assistResult.needsConsult ? (
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                  딱 맞는 조합을 찾기 어려워요. 아래에서 직접 골라보시거나, 상담을 신청해 주시면 맞춤 견적을 제안해 드리겠습니다.
                </p>
              ) : (
                <>
                  <div className="font-mono-sys" style={{ fontSize: 10, color: "#ff5c5c", marginBottom: 10 }}>AI 추천 견적 · 초안 (아래에 자동 선택됨)</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {assistResult.items.map((it, i) => (
                      <div key={it.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#cc0000", fontWeight: 800, fontSize: "0.8rem", marginTop: 2 }}>{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{it.name}</div>
                          {it.reason && <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", marginTop: 2 }}>{it.reason}</div>}
                        </div>
                        <div style={{ fontWeight: 800, fontSize: "0.85rem", whiteSpace: "nowrap" }}>{it.price ? format(it.lineTotal) + "원" : "별도문의"}</div>
                      </div>
                    ))}
                  </div>
                  {assistResult.excluded.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      {assistResult.excluded.map((e, i) => (
                        <div key={i} style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                          · <b style={{ color: "rgba(255,255,255,0.6)" }}>{e.name}</b> 제외 — {e.reason}
                        </div>
                      ))}
                    </div>
                  )}
                  {assistResult.suggestions.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      {assistResult.suggestions.map((s) => (
                        <div key={s.id} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
                          <span style={{ flex: 1 }}>필요시 추가 · <b style={{ color: "#fff" }}>{s.name}</b> ({s.price ? format(s.lineTotal) + "원" : "별도문의"}) — {s.reason}</span>
                          <button type="button" onClick={() => addSuggestion(s.id)} style={{ fontSize: "0.72rem", color: "#ff8a8a", border: "1px solid rgba(204,0,0,0.4)", background: "rgba(204,0,0,0.1)", padding: "3px 9px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap" }}>담기</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {assistResult.note && (
                    <p style={{ marginTop: 14, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                      <b style={{ color: "rgba(255,255,255,0.7)" }}>AI 메모:</b> {assistResult.note}
                    </p>
                  )}
                  <p style={{ marginTop: 12, fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>
                    ↓ 아래 &apos;서비스 선택&apos;에 자동 반영됐습니다. 항목을 더하거나 빼서 조정한 뒤 상담을 신청하세요.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="font-mono-sys" style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", letterSpacing: "0.1em", marginBottom: 20 }}>
          — 또는 직접 선택 —
        </div>

        {/* 01 Service selection */}
        <div id="quote-services" style={{ marginBottom: "3rem" }}>
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

          {!loading && products.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              {/* 검색 */}
              <div style={{ position: "relative", marginBottom: 12 }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: 15, pointerEvents: "none" }}>⌕</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="서비스 검색 (예: 인스타, 명함, 일본, 통역...)"
                  style={{ ...inputStyle, paddingLeft: 38, paddingRight: 36 }}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 13 }}
                  >
                    ✕
                  </button>
                )}
              </div>
              {/* 대분류 필터 칩 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {([["", `전체 ${products.length}`]] as [string, string][])
                  .concat(topList.map((c) => [c, `${c} ${topCounts[c]}`] as [string, string]))
                  .map(([val, label]) => {
                    const active = activeTop === val;
                    return (
                      <button
                        key={val || "all"}
                        type="button"
                        onClick={() => selectTop(val)}
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          padding: "7px 14px",
                          borderRadius: 999,
                          cursor: "pointer",
                          background: active ? "#cc0000" : "rgba(255,255,255,0.03)",
                          color: active ? "#fff" : "rgba(255,255,255,0.6)",
                          border: `1px solid ${active ? "#cc0000" : "rgba(255,255,255,0.12)"}`,
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
              </div>
              {/* 세부 카테고리 칩 (대분류 선택 + 세부 2개 이상일 때) */}
              {activeTop && subList.length > 1 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, paddingLeft: 2 }}>
                  {([["", `${activeTop} 전체`]] as [string, string][])
                    .concat(subList.map((c) => [c, `${c} ${subCounts[c]}`] as [string, string]))
                    .map(([val, label]) => {
                      const active = activeSub === val;
                      return (
                        <button
                          key={val || "suball"}
                          type="button"
                          onClick={() => setActiveSub(val)}
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            padding: "5px 11px",
                            borderRadius: 999,
                            cursor: "pointer",
                            background: active ? "rgba(204,0,0,0.85)" : "rgba(255,255,255,0.02)",
                            color: active ? "#fff" : "rgba(255,255,255,0.5)",
                            border: `1px solid ${active ? "rgba(204,0,0,0.6)" : "rgba(255,255,255,0.09)"}`,
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                </div>
              )}
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginTop: 10 }}>
                {visibleProducts.length}개 서비스{selected.size > 0 ? ` · ${selected.size}개 담김` : ""}
              </div>
            </div>
          )}

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
          ) : visibleProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "2.5rem",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <p style={{ marginBottom: 6 }}>검색 결과가 없어요.</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
                검색어를 바꾸거나, 위 &apos;말로 적어주세요&apos;로 물어보시면 딱 맞는 걸 골라 드립니다.
              </p>
            </div>
          ) : (
            Object.entries(visibleGrouped).map(([category, items]) => (
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
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openDetail(p.id);
                          }}
                          style={{
                            display: "inline-block",
                            marginTop: 7,
                            fontSize: "0.75rem",
                            color: "#ff8a8a",
                            background: "none",
                            border: "none",
                            borderBottom: "1px solid rgba(204,0,0,0.4)",
                            padding: "0 0 1px",
                            cursor: "pointer",
                          }}
                        >
                          상세 · 옵션 보기 →
                        </button>
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

      {/* 상품 상세 모달 */}
      {(detailLoading || detail) && (
        <div
          onClick={closeDetail}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.78)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "3vh 1rem" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#150606", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, maxWidth: 720, width: "100%", marginBottom: "4vh", position: "relative" }}
          >
            <button
              type="button"
              onClick={closeDetail}
              style={{ position: "absolute", top: 12, right: 12, zIndex: 2, width: 32, height: 32, borderRadius: 999, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", fontSize: 14 }}
            >
              ✕
            </button>
            {detailLoading && !detail ? (
              <div className="font-mono-sys" style={{ padding: "4rem", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>LOADING...</div>
            ) : detail ? (
              <div>
                {detail.thumbnailUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={detail.thumbnailUrl} alt={detail.name} style={{ width: "100%", borderRadius: "8px 8px 0 0", display: "block" }} />
                )}
                <div style={{ padding: "1.6rem 1.6rem 1.8rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                    {detail.category}
                    {detail.category2 ? " · " + detail.category2 : ""}
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>{detail.name}</h3>
                  {detail.summary && <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.92rem", lineHeight: 1.6 }}>{detail.summary}</p>}

                  {detail.features.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                      {detail.features.map((f, i) => (
                        <span key={i} style={{ fontSize: "0.72rem", fontWeight: 600, color: "#ff8a8a", background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.3)", padding: "4px 10px", borderRadius: 999 }}>{f}</span>
                      ))}
                    </div>
                  )}

                  {detail.options.length > 0 && (
                    <div style={{ marginTop: 22 }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 10 }}>옵션 · 가격</div>
                      <div style={{ display: "grid", gap: 10 }}>
                        {detail.options.map((o, i) => (
                          <div key={i} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "14px 16px", background: "rgba(255,255,255,0.02)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                              <div style={{ fontWeight: 700, fontSize: "0.92rem" }}>
                                {TIER_LABEL[o.tier] ? <span style={{ color: "#ff8a8a", marginRight: 6 }}>{TIER_LABEL[o.tier]}</span> : null}
                                {o.optionTitle || "기본"}
                              </div>
                              <div style={{ fontWeight: 800, fontSize: "1rem", whiteSpace: "nowrap" }}>{o.price ? format(o.price) + "원" : "별도문의"}</div>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginTop: 6, fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
                              {(o.workDays != null || o.workHours != null) && <span>작업 {o.workHours != null ? o.workHours + "시간" : o.workDays + "일"}</span>}
                              {o.revisions != null && <span>수정 {o.revisions}회</span>}
                              {o.sampleCount != null && <span>시안 {o.sampleCount}개</span>}
                              {o.minQuantity != null && <span>최소 {o.minQuantity}{o.unit || ""}</span>}
                            </div>
                            {o.description && <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: 6 }}>{o.description}</p>}
                            {o.features.length > 0 && (
                              <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 3 }}>
                                {o.features.map((f, j) => (
                                  <li key={j} style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.6)" }}>· {f}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {detail.descriptionText && (
                    <div style={{ marginTop: 22 }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 8 }}>상세 설명</div>
                      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{detail.descriptionText}</p>
                    </div>
                  )}

                  {detail.detailImages.length > 0 && (
                    <div style={{ marginTop: 22 }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 10 }}>포트폴리오</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
                        {detail.detailImages.map((img, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={i} src={img} alt={`포트폴리오 ${i + 1}`} style={{ width: "100%", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)", display: "block" }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {detail.videoUrl && (
                    <a href={detail.videoUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 18, fontSize: "0.82rem", color: "#ff8a8a", textDecoration: "underline" }}>▶ 영상 보기</a>
                  )}

                  <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
                    <button
                      type="button"
                      onClick={() => { setSelected((prev) => new Set(prev).add(detail.id)); closeDetail(); }}
                      style={{ flex: 1, padding: "13px", background: "#cc0000", border: "none", color: "#fff", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", borderRadius: 4 }}
                    >
                      이 서비스 담기
                    </button>
                    <button type="button" onClick={closeDetail} style={{ padding: "13px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: "0.92rem", cursor: "pointer", borderRadius: 4 }}>닫기</button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
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
