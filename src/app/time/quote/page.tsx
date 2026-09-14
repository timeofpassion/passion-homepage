"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface Option {
  tier: string;
  optionTitle: string;
  price: number;
  minQuantity: number | null;
  unit: string;
  description: string;
  features: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  topCategory?: string; // 대분류(마케팅은 국가별). 없으면 category 로 폴백
  category2?: string;
  price: number;
  minQty: number;
  description: string;
  images?: string[];
  options?: Option[];
}

interface ProductDetail {
  id: string;
  name: string;
  category: string;
  category2: string;
  summary: string;
  descriptionText: string;
  detailImages: string[];
  videoUrl: string;
  features: string[];
  options: Option[];
}

// 대분류 표시 순서(해외 마케팅 우선)
const TOP_ORDER = ["국내마케팅", "일본마케팅", "대만마케팅", "중국마케팅", "영상·사진·음향", "홈페이지 제작", "디자인", "번역·통역"];
const KAKAO_URL = "https://pf.kakao.com/_RgYcxj/chat";
const RED = "#E63329";
const LINE = "1px solid rgba(255,255,255,0.1)";

const format = (n: number) => new Intl.NumberFormat("ko-KR").format(n);
const won = (n: number) => (n >= 10000 && n % 10000 === 0 ? `${format(n / 10000)}만 원` : `${format(n)}원`);

// 옵션 1개의 청구 금액 = 단가 × 최소수량
const optionTotal = (o: Option) => o.price * (o.minQuantity || 1);
const productOptions = (p: Product): Option[] =>
  p.options?.length
    ? p.options
    : [{ tier: "SINGLE", optionTitle: "기본", price: p.price, minQuantity: p.minQty, unit: "", description: "", features: [] }];

// 상품명 "이름 — 후킹 문구" → 표지에 후킹을 크게, 이름은 작게
function splitTitle(title: string) {
  const i = title.indexOf(" — ");
  return i < 0 ? { name: title, hook: title } : { name: title.slice(0, i), hook: title.slice(i + 3) };
}

// 후킹 문구 안의 숫자(가격·건수)만 주조색으로
function Hook({ text }: { text: string }) {
  const parts = text.split(/(\d[\d,]*\s*(?:만\s*원|원|건|편|명|개|%)?)/g);
  return (
    <>
      {parts.map((s, i) =>
        /^\d/.test(s) ? (
          <span key={i} style={{ color: RED }}>
            {s}
          </span>
        ) : (
          s
        ),
      )}
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "rgba(255,255,255,0.03)",
  border: LINE,
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
  boxSizing: "border-box",
  borderRadius: 4,
  fontFamily: "inherit",
};
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginBottom: 6 };

// 표지 — 포트폴리오 사진이 있으면 깔고, 없으면 분류명을 큰 워터마크로. 후킹 문구가 주인공.
function Cover({ p, price, large = false }: { p: Pick<Product, "name" | "topCategory" | "category" | "images">; price?: string; large?: boolean }) {
  const { hook } = splitTitle(p.name);
  const img = p.images?.[0];
  const area = p.topCategory || p.category;
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: large ? "16 / 7" : "16 / 10",
        overflow: "hidden",
        background: "#140404",
        borderRadius: large ? "8px 8px 0 0" : 4,
      }}
    >
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
      ) : (
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "-0.05em",
            bottom: "-0.22em",
            fontSize: large ? "7rem" : "4.6rem",
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(255,255,255,0.04)",
            whiteSpace: "nowrap",
            letterSpacing: "-0.05em",
          }}
        >
          {area}
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(10,0,0,0.92) 0%, rgba(10,0,0,0.55) 70%, rgba(10,0,0,0.3) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, padding: large ? "2rem" : "1.1rem 1.2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 18, height: 2, background: RED }} />
          <span style={{ fontSize: large ? "0.8rem" : "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.02em" }}>{area}</span>
        </div>
        <div
          style={{
            fontSize: large ? "clamp(1.6rem, 4.4vw, 2.5rem)" : "clamp(1.15rem, 2.1vw, 1.4rem)",
            fontWeight: 900,
            lineHeight: 1.25,
            letterSpacing: "-0.03em",
            color: "#fff",
            wordBreak: "keep-all",
            maxWidth: "92%",
          }}
        >
          <Hook text={hook} />
        </div>
      </div>
      {price && (
        <div style={{ position: "absolute", top: large ? "1.6rem" : "0.9rem", right: large ? "4rem" : "1rem", background: "#fff", color: "#0a0000", fontWeight: 900, fontSize: large ? "1rem" : "0.82rem", padding: large ? "6px 12px" : "4px 9px", borderRadius: 3, letterSpacing: "-0.02em" }}>
          {price}
        </div>
      )}
    </div>
  );
}

export default function QuotePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // 담은 상품: id → 고른 옵션 번호
  const [cart, setCart] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ reviewUrl: string; total: number; emailSent: boolean } | null>(null);
  const [form, setForm] = useState({ customerName: "", phone: "", email: "", hospitalName: "", memo: "" });

  const [search, setSearch] = useState("");
  const [activeTop, setActiveTop] = useState("");

  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [pickedOption, setPickedOption] = useState(0);

  useEffect(() => {
    fetch("/api/quote/products")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setLoading(false));
  }, []);

  const byId = useMemo(() => Object.fromEntries(products.map((p) => [p.id, p])), [products]);

  const openDetail = async (id: string) => {
    setDetail(null);
    setPickedOption(cart[id] ?? 0);
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/quote/products/${id}`);
      const d = await res.json();
      if (res.ok && d?.id) setDetail(d as ProductDetail);
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

  const removeFromCart = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const lines = Object.entries(cart)
    .filter(([id]) => byId[id])
    .map(([id, idx]) => {
      const p = byId[id];
      const o = productOptions(p)[idx] ?? productOptions(p)[0];
      const title = productOptions(p).length > 1 ? `${splitTitle(p.name).name} · ${o.optionTitle}` : splitTitle(p.name).name;
      return { id, name: title, price: optionTotal(o) };
    });
  const subtotal = lines.reduce((s, l) => s + l.price, 0);
  const vat = Math.round(subtotal * 0.1);
  const total = subtotal + vat;

  const topOf = (p: Product) => p.topCategory || p.category || "기타";
  const topCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[topOf(p)] = (acc[topOf(p)] || 0) + 1;
    return acc;
  }, {});
  const rank = (t: string) => (TOP_ORDER.indexOf(t) < 0 ? 99 : TOP_ORDER.indexOf(t));
  const topList = Object.keys(topCounts).sort((a, b) => rank(a) - rank(b));

  const q = search.trim().toLowerCase();
  const visible = products
    .filter(
      (p) =>
        (!activeTop || topOf(p) === activeTop) &&
        (!q || [p.name, p.description, p.category, p.category2].some((s) => (s || "").toLowerCase().includes(q))),
    )
    .sort((a, b) => rank(topOf(a)) - rank(topOf(b)));

  const scrollToForm = () => document.getElementById("quote-contact")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = async () => {
    if (lines.length === 0) return alert("서비스를 1개 이상 담아주세요.");
    if (!form.customerName.trim() || !form.phone.trim() || !form.email.trim()) return alert("성함·연락처·이메일을 입력해 주세요.");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return alert("이메일 주소를 확인해 주세요.");
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, selectedProducts: lines }),
      });
      const data = await res.json();
      if (data.success) setSuccess(data);
      else alert(data.error || "오류가 발생했습니다.");
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0000", color: "#fff", padding: "2rem 1rem" }}>
        <div style={{ maxWidth: 480, width: "100%" }}>
          <div style={{ width: 40, height: 3, background: RED, marginBottom: 24 }} />
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontWeight: 900, lineHeight: 1.25, marginBottom: 14, letterSpacing: "-0.03em", wordBreak: "keep-all" }}>
            견적서를 보내드렸습니다
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 6, wordBreak: "keep-all" }}>
            {success.emailSent
              ? "입력하신 이메일로 견적서가 발송됐습니다. 담당자가 확인 후 남겨주신 연락처로 연락드립니다."
              : "견적 의뢰가 접수됐습니다. 담당자가 확인 후 남겨주신 연락처로 연락드립니다."}
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", marginBottom: 32 }}>
            총 {format(success.total)}원 (VAT 포함)
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            <Link href={success.reviewUrl} style={{ display: "block", textAlign: "center", padding: "15px", background: RED, color: "#fff", textDecoration: "none", fontWeight: 700, borderRadius: 4 }}>
              견적서 확인하기
            </Link>
            <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", background: "#FEE500", color: "#3C1E1E", textDecoration: "none", fontWeight: 700, borderRadius: 4 }}>
              <KakaoIcon /> 카카오톡으로 바로 상담
            </a>
            <Link href="/" style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", textDecoration: "none", marginTop: 8 }}>
              홈으로
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0000", color: "#fff", wordBreak: "keep-all" }}>
      <style>{`@media (max-width: 640px){.quote-filter{flex-wrap:nowrap!important;overflow-x:auto;scrollbar-width:none}.quote-filter>*{flex-shrink:0}}`}</style>
      <div style={{ padding: "1.5rem clamp(1rem, 4vw, 2rem)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff", textDecoration: "none" }}>
          열정의시간
        </Link>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem) 9rem" }}>
        {/* Hero */}
        <div style={{ padding: "clamp(2rem, 6vw, 4.5rem) 0 clamp(2rem, 5vw, 3.5rem)" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.04em", margin: 0, maxWidth: 760 }}>
            필요한 서비스를 고르면,
            <br />
            견적서가 <span style={{ color: RED }}>메일로 바로</span> 갑니다
          </h1>
          <ol style={{ listStyle: "none", padding: 0, margin: "1.6rem 0 0", display: "flex", flexWrap: "wrap", gap: "8px 24px", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
            <li>1. 서비스 담기</li>
            <li>2. 옵션 고르기</li>
            <li>3. 연락처 남기기</li>
          </ol>
        </div>

        {/* 필터 */}
        {!loading && products.length > 0 && (
          <div style={{ position: "sticky", top: 0, zIndex: 20, background: "#0a0000", padding: "12px 0", borderBottom: LINE, marginBottom: 24 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }} className="quote-filter">
              {[["", `전체 ${products.length}`] as const, ...topList.map((c) => [c, `${c.replace("마케팅", "")} ${topCounts[c]}`] as const)].map(([val, label]) => {
                const active = activeTop === val;
                return (
                  <button
                    key={val || "all"}
                    type="button"
                    onClick={() => setActiveTop(val)}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      padding: "8px 14px",
                      borderRadius: 4,
                      cursor: "pointer",
                      background: active ? "#fff" : "transparent",
                      color: active ? "#0a0000" : "rgba(255,255,255,0.65)",
                      border: `1px solid ${active ? "#fff" : "rgba(255,255,255,0.15)"}`,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="검색 (예: 영상, 일본, 홈페이지)"
                aria-label="서비스 검색"
                style={{ ...inputStyle, width: "auto", flex: "1 1 200px", minWidth: 180, padding: "8px 12px", fontSize: "0.9rem" }}
              />
            </div>
          </div>
        )}

        {/* 01 서비스 카드 */}
        {loading ? (
          <p style={{ padding: "4rem 0", color: "rgba(255,255,255,0.4)" }}>서비스를 불러오는 중…</p>
        ) : visible.length === 0 ? (
          <p style={{ padding: "3rem 0", color: "rgba(255,255,255,0.5)" }}>
            찾는 서비스가 없나요?{" "}
            <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#FEE500" }}>
              카카오톡으로 물어보세요
            </a>
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "28px 20px" }}>
            {visible.map((p) => {
              const opts = productOptions(p);
              const prices = opts.map(optionTotal).filter((n) => n > 0);
              const min = prices.length ? Math.min(...prices) : 0;
              const inCart = p.id in cart;
              return (
                <article key={p.id} style={{ display: "flex", flexDirection: "column" }}>
                  <button type="button" onClick={() => openDetail(p.id)} aria-label={`${p.name} 상세 보기`} style={{ all: "unset", cursor: "pointer", display: "block", outline: inCart ? `2px solid ${RED}` : "none", outlineOffset: 2, borderRadius: 4 }}>
                    <Cover p={p} price={min ? `${won(min)}${prices.length > 1 ? "~" : ""}` : undefined} />
                  </button>
                  <div style={{ padding: "12px 2px 0", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.4 }}>{splitTitle(p.name).name}</div>
                    <div style={{ marginTop: 4, fontSize: "0.9rem", color: "rgba(255,255,255,0.55)" }}>
                      {min ? (
                        <>
                          <b style={{ color: "#fff", fontWeight: 800 }}>{won(min)}</b>
                          {prices.length > 1 ? " ~" : ""}
                        </>
                      ) : (
                        "별도 문의"
                      )}
                      {opts.length > 1 && <span> · 옵션 {opts.length}개</span>}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button type="button" onClick={() => openDetail(p.id)} style={{ flex: 1, padding: "10px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", borderRadius: 4 }}>
                        자세히 보기
                      </button>
                      {inCart ? (
                        <button type="button" onClick={() => removeFromCart(p.id)} style={{ flex: 1, padding: "10px", background: "rgba(230,51,41,0.14)", border: `1px solid ${RED}`, color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", borderRadius: 4 }}>
                          담김 ✓ 빼기
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => (opts.length > 1 ? openDetail(p.id) : setCart((prev) => ({ ...prev, [p.id]: 0 })))}
                          style={{ flex: 1, padding: "10px", background: RED, border: `1px solid ${RED}`, color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", borderRadius: 4 }}
                        >
                          {opts.length > 1 ? "옵션 골라 담기" : "담기"}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* 02 연락처 */}
        <section id="quote-contact" style={{ marginTop: "clamp(4rem, 10vw, 7rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "2rem 3rem", alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 1rem" }}>담은 서비스</h2>
            {lines.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                아직 담은 서비스가 없습니다.
                <br />
                위에서 카드를 눌러 담아주세요.
              </p>
            ) : (
              <div>
                {lines.map((l) => (
                  <div key={l.id} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "12px 0", borderBottom: LINE }}>
                    <span style={{ flex: 1, color: "rgba(255,255,255,0.8)", fontSize: "0.92rem" }}>{l.name}</span>
                    <span style={{ whiteSpace: "nowrap", fontWeight: 700 }}>{format(l.price)}원</span>
                    <button type="button" onClick={() => removeFromCart(l.id)} aria-label="빼기" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "0.85rem" }}>
                      ✕
                    </button>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                  <span>공급가 {format(subtotal)}원 + 부가세 {format(vat)}원</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 8 }}>
                  <span style={{ fontWeight: 700 }}>총 견적</span>
                  <span style={{ fontSize: "1.6rem", fontWeight: 900, color: RED }}>{format(total)}원</span>
                </div>
                <p style={{ marginTop: 12, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                  광고 집행비·의료광고 심의 수수료는 별도입니다. 최종 금액은 상담 후 확정됩니다.
                </p>
              </div>
            )}
          </div>

          <div style={{ border: LINE, padding: "clamp(1.2rem, 3vw, 2rem)", borderRadius: 6, background: "rgba(255,255,255,0.02)" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 4px" }}>연락처 남기기</h2>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>견적서는 이메일로 바로 가고, 담당자가 전화로 한 번 더 설명드립니다.</p>
            <div style={{ display: "grid", gap: 14 }}>
              {(
                [
                  ["customerName", "성함 *", "text", "홍길동", "name"],
                  ["phone", "연락처 *", "tel", "010-0000-0000", "tel"],
                  ["email", "이메일 * (견적서 받을 곳)", "email", "example@hospital.com", "email"],
                  ["hospitalName", "병원·회사명", "text", "OO피부과", "organization"],
                ] as const
              ).map(([key, label, type, ph, ac]) => (
                <div key={key}>
                  <label htmlFor={`f-${key}`} style={labelStyle}>
                    {label}
                  </label>
                  <input id={`f-${key}`} type={type} autoComplete={ac} placeholder={ph} value={form[key]} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} style={inputStyle} />
                </div>
              ))}
              <div>
                <label htmlFor="f-memo" style={labelStyle}>
                  궁금한 점 (선택)
                </label>
                <textarea id="f-memo" rows={3} placeholder="예: 다음 달 개원이라 빨리 시작하고 싶어요" value={form.memo} onChange={(e) => setForm((prev) => ({ ...prev, memo: e.target.value }))} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                style={{ marginTop: 6, padding: "17px", background: RED, border: "none", color: "#fff", fontSize: "1.05rem", fontWeight: 800, cursor: submitting ? "wait" : "pointer", opacity: lines.length === 0 || submitting ? 0.45 : 1, borderRadius: 4 }}
              >
                {submitting ? "보내는 중…" : lines.length ? `견적서 받기 · ${format(total)}원` : "견적서 받기"}
              </button>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>남겨주신 정보는 견적 안내에만 사용합니다.</p>
            </div>
          </div>
        </section>
      </div>

      {/* 하단 고정 바 — 담은 게 있을 때만 */}
      {lines.length > 0 && !detail && (
        <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40, background: "rgba(10,0,0,0.96)", borderTop: `1px solid rgba(230,51,41,0.5)` }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "12px clamp(1rem, 4vw, 2rem)", paddingRight: "clamp(5.5rem, 12vw, 9rem)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)" }}>{lines.length}개 담음 · VAT 포함</div>
              <div style={{ fontSize: "1.15rem", fontWeight: 900 }}>{format(total)}원</div>
            </div>
            <button type="button" onClick={scrollToForm} style={{ padding: "13px 22px", background: RED, border: "none", color: "#fff", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", borderRadius: 4, whiteSpace: "nowrap" }}>
              견적서 받기 →
            </button>
          </div>
        </div>
      )}

      {/* 카카오톡 플로팅 */}
      <a
        href={KAKAO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 채널로 상담하기"
        style={{
          position: "fixed",
          right: "clamp(12px, 3vw, 28px)",
          bottom: lines.length > 0 && !detail ? 84 : "clamp(16px, 4vw, 32px)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          background: "#FEE500",
          color: "#3C1E1E",
          textDecoration: "none",
          fontWeight: 800,
          fontSize: "0.9rem",
          borderRadius: 999,
          boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
          transition: "bottom 0.2s ease",
        }}
      >
        <KakaoIcon />
        <span>카톡 상담</span>
      </a>

      {/* 상세 모달 */}
      {(detailLoading || detail) && (
        <div role="dialog" aria-modal="true" onClick={closeDetail} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "3vh 0.75rem" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#120404", border: LINE, borderRadius: 8, maxWidth: 760, width: "100%", marginBottom: "4vh", position: "relative" }}>
            <button type="button" onClick={closeDetail} aria-label="닫기" style={{ position: "absolute", top: 12, right: 12, zIndex: 2, width: 36, height: 36, borderRadius: 999, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", fontSize: 15 }}>
              ✕
            </button>
            {!detail ? (
              <p style={{ padding: "4rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>불러오는 중…</p>
            ) : (
              <DetailBody
                d={detail}
                area={byId[detail.id]?.topCategory}
                picked={pickedOption}
                onPick={setPickedOption}
                inCart={detail.id in cart}
                onAdd={() => {
                  setCart((prev) => ({ ...prev, [detail.id]: pickedOption }));
                  closeDetail();
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailBody({ d, area, picked, onPick, inCart, onAdd }: { d: ProductDetail; area?: string; picked: number; onPick: (i: number) => void; inCart: boolean; onAdd: () => void }) {
  const opts = d.options.length ? d.options : [];
  const chosen = opts[picked] ?? opts[0];
  const { name } = splitTitle(d.name);
  return (
    <div>
      <Cover p={{ name: d.name, topCategory: area, category: d.category, images: d.detailImages }} large />
      <div style={{ padding: "clamp(1.2rem, 4vw, 2rem)" }}>
        <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, lineHeight: 1.35 }}>{name}</h3>
        {d.features.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "grid", gap: 8 }}>
            {d.features.map((f, i) => (
              <li key={i} style={{ display: "flex", gap: 10, fontSize: "0.95rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>
                <span style={{ color: RED, fontWeight: 900 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {opts.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: 10 }}>{opts.length > 1 ? "옵션 고르기" : "구성"}</div>
            <div role="radiogroup" style={{ display: "grid", gap: 10 }}>
              {opts.map((o, i) => {
                const on = i === picked;
                return (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => onPick(i)}
                    style={{ all: "unset", cursor: "pointer", display: "block", border: `1px solid ${on ? RED : "rgba(255,255,255,0.12)"}`, background: on ? "rgba(230,51,41,0.08)" : "rgba(255,255,255,0.02)", borderRadius: 6, padding: "14px 16px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", display: "flex", gap: 10, alignItems: "center" }}>
                        <span aria-hidden style={{ width: 14, height: 14, flexShrink: 0, borderRadius: 999, border: `2px solid ${on ? RED : "rgba(255,255,255,0.35)"}`, background: on ? `radial-gradient(${RED} 45%, transparent 50%)` : "none" }} />
                        {o.optionTitle || "기본"}
                      </div>
                      <div style={{ fontWeight: 900, fontSize: "1.05rem", whiteSpace: "nowrap" }}>
                        {o.price ? `${format(optionTotal(o))}원` : "별도 문의"}
                        {o.unit === "월" && <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}> /월</span>}
                      </div>
                    </div>
                    {(o.minQuantity || 1) > 1 && (
                      <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginTop: 4, paddingLeft: 24 }}>
                        {format(o.price)}원 × {o.minQuantity}
                        {o.unit}
                      </div>
                    )}
                    {on && o.description && <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", margin: "8px 0 0", paddingLeft: 24, lineHeight: 1.6 }}>{o.description}</p>}
                    {on && o.features.length > 0 && (
                      <ul style={{ margin: "8px 0 0", paddingLeft: 24, listStyle: "none", display: "grid", gap: 4 }}>
                        {o.features.map((f, j) => (
                          <li key={j} style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
                            · {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {d.detailImages.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: 10 }}>작업 사례</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
              {d.detailImages.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img} alt={`작업 사례 ${i + 1}`} style={{ width: "100%", aspectRatio: "16 / 10", objectFit: "cover", borderRadius: 4, display: "block" }} />
              ))}
            </div>
            {d.videoUrl && (
              <a href={d.videoUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 12, fontSize: "0.88rem", color: "#fff", fontWeight: 700 }}>
                ▶ 영상으로 보기
              </a>
            )}
          </div>
        )}

        {d.descriptionText && (
          <details style={{ marginTop: 24, borderTop: LINE, paddingTop: 16 }}>
            <summary style={{ cursor: "pointer", fontSize: "0.92rem", fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>상세 설명·계약 조건 펼치기</summary>
            <Description text={d.descriptionText} />
          </details>
        )}

        <div style={{ position: "sticky", bottom: 0, background: "#120404", margin: "24px -4px 0", padding: "14px 4px 4px", display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{chosen?.optionTitle || name}</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 900 }}>{chosen?.price ? `${format(optionTotal(chosen))}원` : "별도 문의"}</div>
          </div>
          <button type="button" onClick={onAdd} style={{ padding: "14px 22px", background: RED, border: "none", color: "#fff", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", borderRadius: 4, whiteSpace: "nowrap" }}>
            {inCart ? "이 옵션으로 바꾸기" : "담기"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 인트라넷 상세 설명(평문) — "■ 제목"은 소제목, "· 항목"은 목록으로
function Description({ text }: { text: string }) {
  return (
    <div style={{ marginTop: 12, display: "grid", gap: 4 }}>
      {text.split("\n").map((raw, i) => {
        const line = raw.trim();
        if (!line) return <div key={i} style={{ height: 6 }} />;
        if (line.startsWith("■"))
          return (
            <div key={i} style={{ fontWeight: 800, fontSize: "0.92rem", marginTop: 10, color: "#fff" }}>
              {line.replace(/^■\s*/, "")}
            </div>
          );
        return (
          <p key={i} style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.65 }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#3C1E1E" style={{ flexShrink: 0 }} aria-hidden>
      <path d="M12 3c-5.523 0-10 3.538-10 7.9 0 2.85 1.848 5.347 4.636 6.74l-1.185 4.316c-.056.205.18.366.353.243l5.06-3.327c.373.048.755.074 1.146.074 5.523 0 10-3.538 10-7.9S17.523 3 12 3z" />
    </svg>
  );
}
