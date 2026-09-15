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
  proposalUrl?: string | null;
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
  proposalUrl?: string;
  features: string[];
  options: Option[];
}

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
// 구글 슬라이드 공개 링크 → 목록 썸네일(비공개면 이미지가 안 떠서 숨긴다)
const slideThumb = (url?: string | null) => {
  const m = url?.match(/\/d\/([\w-]{20,})/);
  return m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w640` : "";
};
const firstSentence = (t: string) => (t.split(/[.。]\s|\n/)[0] || "").slice(0, 60);

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

export default function QuotePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // 담은 상품: id → 고른 옵션 번호
  const [cart, setCart] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ reviewUrl: string; total: number; emailSent: boolean } | null>(null);
  const [form, setForm] = useState({ customerName: "", phone: "", email: "", hospitalName: "", memo: "" });


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

  // 분야별 묶음 — 국내 월정기는 주력이라 따로 크게
  const GROUPS: [string, string, string[]][] = [
    ["overseas", "해외 환자 유치", ["일본마케팅", "대만마케팅", "중국마케팅"]],
    ["video", "영상", ["영상·사진·음향"]],
    ["web", "홈페이지", ["홈페이지 제작"]],
    ["design", "디자인", ["디자인"]],
  ];
  const topOf = (p: Product) => p.topCategory || p.category || "기타";
  const featured = products.find((p) => topOf(p) === "국내마케팅" && productOptions(p).length > 1);
  const grouped = GROUPS.map(([key, label, tops]) => ({ key, label, items: products.filter((p) => p !== featured && tops.includes(topOf(p))) }))
    .concat([{ key: "etc", label: "그 밖의 서비스", items: products.filter((p) => p !== featured && !GROUPS.some(([, , t]) => t.includes(topOf(p)))) }])
    .filter((g) => g.items.length);

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

  const cartPanel = (
    <div>
      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>내 견적</div>
      {lines.length === 0 ? (
        <p style={{ margin: 0, color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", lineHeight: 1.6 }}>
          서비스 옆 <b style={{ color: "#fff" }}>+</b> 를 누르면
          <br />
          금액이 여기에 바로 쌓입니다.
        </p>
      ) : (
        <>
          {lines.map((l) => (
            <div key={l.id} style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "9px 0", borderBottom: LINE, fontSize: "0.86rem" }}>
              <span style={{ flex: 1, color: "rgba(255,255,255,0.78)", lineHeight: 1.4 }}>{l.name}</span>
              <span style={{ whiteSpace: "nowrap", fontWeight: 700 }}>{format(l.price)}</span>
              <button type="button" onClick={() => removeFromCart(l.id)} aria-label={`${l.name} 빼기`} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", padding: 0 }}>
                ✕
              </button>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 14 }}>
            <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>VAT 포함</span>
            <span style={{ fontSize: "1.7rem", fontWeight: 900, letterSpacing: "-0.03em" }}>{format(total)}원</span>
          </div>
        </>
      )}
      <button
        type="button"
        onClick={scrollToForm}
        disabled={lines.length === 0}
        style={{ width: "100%", marginTop: 16, padding: "14px", background: lines.length ? RED : "rgba(255,255,255,0.06)", border: "none", color: lines.length ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: 800, fontSize: "0.95rem", cursor: lines.length ? "pointer" : "default", borderRadius: 4 }}
      >
        견적서 받기
      </button>
      <p style={{ margin: "10px 0 0", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>광고 집행비·의료광고 심의 수수료 별도</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0000", color: "#fff", wordBreak: "keep-all" }}>
      <style>{`
        .q-wrap{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:56px;align-items:start}
        .q-side{position:sticky;top:24px}
        .q-mbar{display:none}
        .q-row:hover{background:rgba(255,255,255,0.03)}
        .q-door:hover{border-color:#E63329!important}
        @media (max-width: 900px){.q-wrap{grid-template-columns:1fr}.q-side{display:none}.q-mbar{display:flex}}
      `}</style>
      <div style={{ padding: "1.5rem clamp(1rem, 4vw, 2rem)" }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff", textDecoration: "none" }}>
          열정의시간
        </Link>
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem) 8rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 900, lineHeight: 1.18, letterSpacing: "-0.04em", margin: "clamp(1.5rem, 5vw, 3.5rem) 0 clamp(2.5rem, 6vw, 4rem)" }}>
          어떤 병원이세요?
          <br />
          맞는 구성과 금액이 <span style={{ color: RED }}>바로</span> 나옵니다
        </h1>
        <Link href="/time/diagnosis" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", border: "1px solid rgba(230,51,41,0.55)", background: "rgba(230,51,41,0.08)", borderRadius: 10, padding: "18px 20px", margin: "0 0 20px", color: "#fff", textDecoration: "none" }}>
          <span><b style={{ fontSize: "1.1rem" }}>병원 맞춤 진단 받기</b><span style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>병원명과 몇 가지 선택으로 필요한 구성과 예상 금액을 확인하고, 진단 리포트를 PDF로 받아보세요</span></span>
          <span style={{ background: "#E63329", padding: "10px 16px", borderRadius: 6, fontWeight: 800, whiteSpace: "nowrap" }}>진단 시작 →</span>
        </Link>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12, margin: "0 0 clamp(3rem, 7vw, 5rem)" }}>
          {(
            [
              ["door-domestic", "국내 환자를 늘리고 싶다", "네이버 검색·리뷰·영상까지 한 팀으로, 월 400만 원부터"],
              ["door-overseas", "해외 환자를 받고 싶다", "일본·중국·대만 — 현지 플랫폼과 인플루언서"],
              ["door-make", "만들 것만 필요하다", "홈페이지·영상·디자인 단건 제작"],
            ] as const
          ).map(([id, t, d]) => (
            <button
              key={id}
              type="button"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="q-door"
              style={{ textAlign: "left", cursor: "pointer", padding: "20px 20px 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.02)", color: "#fff" }}
            >
              <div style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.02em" }}>{t} →</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginTop: 6, lineHeight: 1.5 }}>{d}</div>
            </button>
          ))}
        </div>

        <div className="q-wrap">
          <main>
            {loading ? (
              <p style={{ color: "rgba(255,255,255,0.4)" }}>서비스를 불러오는 중…</p>
            ) : (
              <>
                <div id="door-domestic" style={{ scrollMarginTop: 24 }} />
                {featured && <FeaturedPackage p={featured} picked={cart[featured.id]} onPick={(i) => setCart((prev) => ({ ...prev, [featured.id]: i }))} onRemove={() => removeFromCart(featured.id)} onDetail={() => openDetail(featured.id)} />}

                {grouped.map((g) => (
                  <section key={g.key} id={g.key === "overseas" ? "door-overseas" : g.key === "video" ? "door-make" : undefined} style={{ marginTop: "clamp(3rem, 7vw, 4.5rem)", scrollMarginTop: 24 }}>
                    <h2 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 6px", color: "rgba(255,255,255,0.9)" }}>{g.label}</h2>
                    {g.key === "overseas" && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 10, margin: "10px 0 16px" }}>
                        {(
                          [
                            ["14 → 23건", "한 피부과 · 샤오홍슈 광고 노트 3건(약 7만 원) 뒤 주말 문의"],
                            ["1 → 77건", "한 성형외과 · 일본 LINE 신규 문의(5개월)"],
                          ] as const
                        ).map(([n, t]) => (
                          <div key={n} style={{ border: LINE, borderRadius: 6, padding: "14px 16px" }}>
                            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: RED, letterSpacing: "-0.03em" }}>{n}</div>
                            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{t}</div>
                          </div>
                        ))}
                        <div style={{ gridColumn: "1 / -1", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>실제 운영 사례(병원명 비공개)이며 특정 성과를 보장하는 수치가 아닙니다.</div>
                      </div>
                    )}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}>
                      {g.items.map((p) => {
                        const opts = productOptions(p);
                        const prices = opts.map(optionTotal).filter((n) => n > 0);
                        const min = prices.length ? Math.min(...prices) : 0;
                        const inCart = p.id in cart;
                        const { name, hook } = splitTitle(p.name);
                        const sub = hook === name ? firstSentence(p.description || "") : name;
                        const thumb = p.images?.[0] || slideThumb(p.proposalUrl);
                        return (
                          <div key={p.id} className="q-row" style={{ display: "flex", alignItems: "center", gap: 16, borderBottom: LINE, padding: "14px 4px" }}>
                            {thumb ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={thumb} alt="" onClick={() => openDetail(p.id)} onError={(e) => (e.currentTarget.style.visibility = "hidden")} style={{ width: 88, height: 56, objectFit: "cover", borderRadius: 4, flexShrink: 0, cursor: "pointer", background: "#1a0a0a" }} />
                            ) : (
                              <div style={{ width: 88, height: 56, borderRadius: 4, flexShrink: 0, background: "rgba(255,255,255,0.03)" }} />
                            )}
                            <button type="button" onClick={() => openDetail(p.id)} style={{ all: "unset", cursor: "pointer", flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.4 }}>{hook}</div>
                              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", marginTop: 3 }}>
                                {sub}{p.proposalUrl ? " · 제안서 있음" : ""}
                                {opts.length > 1 ? ` · 옵션 ${opts.length}` : ""}
                              </div>
                            </button>
                            <div style={{ textAlign: "right", whiteSpace: "nowrap", fontSize: "0.95rem", fontWeight: 700 }}>
                              {inCart ? won(optionTotal(opts[cart[p.id]] ?? opts[0])) : min ? `${won(min)}${prices.length > 1 ? "~" : ""}` : "문의"}
                            </div>
                            <button
                              type="button"
                              aria-label={inCart ? `${name} 빼기` : `${name} 담기`}
                              onClick={() => (inCart ? removeFromCart(p.id) : opts.length > 1 ? openDetail(p.id) : setCart((prev) => ({ ...prev, [p.id]: 0 })))}
                              style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 999, cursor: "pointer", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1, border: `1px solid ${inCart ? RED : "rgba(255,255,255,0.3)"}`, background: inCart ? RED : "transparent", color: "#fff" }}
                            >
                              {inCart ? "✓" : "+"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </>
            )}

            {/* 연락처 */}
            <section id="quote-contact" style={{ marginTop: "clamp(4rem, 9vw, 6rem)", maxWidth: 560 }}>
              <h2 style={{ fontSize: "clamp(1.4rem, 3.4vw, 1.9rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 6px" }}>견적서 받을 곳</h2>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", margin: "0 0 22px" }}>이메일로 견적서가 바로 가고, 담당자가 전화로 한 번 더 설명드립니다.</p>
              <div style={{ display: "grid", gap: 14 }}>
                {(
                  [
                    ["customerName", "성함 *", "text", "홍길동", "name"],
                    ["phone", "연락처 *", "tel", "010-0000-0000", "tel"],
                    ["email", "이메일 *", "email", "example@hospital.com", "email"],
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
                  {submitting ? "보내는 중…" : lines.length ? `견적서 받기 · ${format(total)}원` : "서비스를 먼저 담아주세요"}
                </button>
              </div>
            </section>
          </main>

          <aside className="q-side" style={{ border: LINE, borderRadius: 6, padding: "20px", background: "rgba(255,255,255,0.02)" }}>
            {cartPanel}
          </aside>
        </div>
      </div>

      {/* 모바일 하단 바 */}
      {lines.length > 0 && !detail && (
        <div className="q-mbar" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40, background: "rgba(10,0,0,0.97)", borderTop: "1px solid rgba(230,51,41,0.5)", padding: "12px 16px", paddingRight: 128, alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>{lines.length}개 · VAT 포함</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900 }}>{format(total)}원</div>
          </div>
          <button type="button" onClick={scrollToForm} style={{ padding: "12px 16px", background: RED, border: "none", color: "#fff", fontWeight: 800, fontSize: "0.9rem", borderRadius: 4, whiteSpace: "nowrap" }}>
            견적서 받기
          </button>
        </div>
      )}

      {/* 카카오톡 플로팅 */}
      <a
        href={KAKAO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 채널로 상담하기"
        style={{ position: "fixed", right: 16, bottom: 16, zIndex: 50, display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#FEE500", color: "#3C1E1E", textDecoration: "none", fontWeight: 800, fontSize: "0.9rem", borderRadius: 999, boxShadow: "0 6px 18px rgba(0,0,0,0.35)" }}
      >
        <KakaoIcon />
        <span>카톡 상담</span>
      </a>

      {/* 상세 모달 */}
      {(detailLoading || detail) && (
        <div role="dialog" aria-modal="true" onClick={closeDetail} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "3vh 0.75rem" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#120404", border: LINE, borderRadius: 8, maxWidth: 720, width: "100%", marginBottom: "4vh", position: "relative" }}>
            <button type="button" onClick={closeDetail} aria-label="닫기" style={{ position: "absolute", top: 14, right: 14, zIndex: 2, width: 36, height: 36, borderRadius: 999, background: "transparent", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", fontSize: 15 }}>
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

// 주력 상품 — 단계를 누르면 그 자리에서 담기고 금액이 바뀐다
function FeaturedPackage({ p, picked, onPick, onRemove, onDetail }: { p: Product; picked?: number; onPick: (i: number) => void; onRemove: () => void; onDetail: () => void }) {
  const opts = productOptions(p);
  const { name, hook } = splitTitle(p.name);
  const show = opts[picked ?? 1] ?? opts[0];
  return (
    <section style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8, padding: "clamp(1.4rem, 4vw, 2.2rem)" }}>
      <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>{name} · 가장 많이 찾는 구성</div>
      <h2 style={{ fontSize: "clamp(1.5rem, 3.6vw, 2.2rem)", fontWeight: 900, lineHeight: 1.28, letterSpacing: "-0.03em", margin: "10px 0 24px" }}>{hook}</h2>
      <div role="radiogroup" aria-label="단계 선택" style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`, gap: 8 }}>
        {opts.map((o, i) => {
          const on = picked === i;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => (on ? onRemove() : onPick(i))}
              style={{ cursor: "pointer", textAlign: "left", padding: "14px 14px 12px", borderRadius: 6, border: `1px solid ${on ? RED : "rgba(255,255,255,0.14)"}`, background: on ? "rgba(230,51,41,0.12)" : "transparent", color: "#fff" }}
            >
              <div style={{ fontSize: "0.8rem", color: on ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: 600 }}>{o.optionTitle.split(" — ")[0]}</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 900, letterSpacing: "-0.03em", marginTop: 2 }}>
                {won(optionTotal(o))}
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "6px 24px" }}>
        {show.features.slice(0, 6).map((f, i) => (
          <div key={i} style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
            · {f}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.85rem", color: picked === undefined ? "rgba(255,255,255,0.5)" : "#fff" }}>
          {picked === undefined ? "단계를 누르면 견적에 담깁니다" : `${show.optionTitle.split(" — ")[0]} 담김 — 다시 누르면 빠집니다`}
        </span>
        <button type="button" onClick={onDetail} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", textDecoration: "underline", cursor: "pointer", fontSize: "0.85rem", padding: 0 }}>
          단계별 전체 구성 보기
        </button>
      </div>
    </section>
  );
}

function DetailBody({ d, area, picked, onPick, inCart, onAdd }: { d: ProductDetail; area?: string; picked: number; onPick: (i: number) => void; inCart: boolean; onAdd: () => void }) {
  const opts = d.options.length ? d.options : [];
  const chosen = opts[picked] ?? opts[0];
  const { name } = splitTitle(d.name);
  return (
    <div>
      <div style={{ padding: "clamp(1.4rem, 4vw, 2.2rem)" }}>
        <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginBottom: 8, paddingRight: 40 }}>{area || d.category} · {name}</div>
        <h3 style={{ fontSize: "clamp(1.4rem, 3.6vw, 1.9rem)", fontWeight: 900, margin: 0, lineHeight: 1.3, letterSpacing: "-0.03em", paddingRight: 40 }}>
          <Hook text={splitTitle(d.name).hook} />
        </h3>
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

        {d.proposalUrl && <ProposalGate d={d} />}

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

// 제안서 전체 보기 — 병원명·연락처를 받고 연다. 받은 정보는 견적 접수함에 「문의」로 쌓이고 메일로도 링크가 간다.
function ProposalGate({ d }: { d: ProductDetail }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ hospitalName: "", customerName: "", phone: "", email: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const opt = d.options[0];
  const submit = async () => {
    if (!f.hospitalName.trim() || !f.customerName.trim() || !f.phone.trim() || !/^\S+@\S+\.\S+$/.test(f.email.trim())) {
      alert("병원명·성함·연락처·이메일을 확인해 주세요.");
      return;
    }
    // 팝업 차단을 피하려고 클릭 순간에 창을 먼저 연다
    const win = window.open("", "_blank");
    setBusy(true);
    try {
      const res = await fetch("/api/quote/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          purpose: "proposal",
          proposalUrl: d.proposalUrl,
          memo: `[제안서 열람] ${d.name}`,
          selectedProducts: [{ id: d.id, name: d.name, price: opt ? opt.price * (opt.minQuantity || 1) : 0 }],
        }),
      });
      const data = await res.json();
      if (!data.success) {
        win?.close();
        alert(data.error || "잠시 후 다시 시도해 주세요.");
        return;
      }
      setDone(true);
      if (win && d.proposalUrl) win.location.href = d.proposalUrl;
    } catch {
      win?.close();
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div style={{ marginTop: 24, border: "1px solid rgba(230,51,41,0.45)", borderRadius: 8, padding: "18px 18px 16px", background: "rgba(230,51,41,0.06)" }}>
      <div style={{ fontWeight: 800, fontSize: "1rem" }}>이 서비스의 제안서 전체 보기</div>
      <div style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>실제 운영 화면·사례·단계별 구성이 담긴 제안서입니다. 이메일로도 링크를 보내드립니다.</div>
      {done ? (
        <p style={{ margin: "12px 0 0", fontSize: "0.88rem" }}>
          새 창에서 열렸습니다. 안 열리면{" "}
          <a href={d.proposalUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontWeight: 700 }}>
            여기
          </a>
          를 눌러주세요.
        </p>
      ) : !open ? (
        <button type="button" onClick={() => setOpen(true)} style={{ marginTop: 12, padding: "12px 18px", background: "#fff", color: "#0a0000", border: "none", borderRadius: 4, fontWeight: 800, cursor: "pointer" }}>
          제안서 받아보기
        </button>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 8, marginTop: 12 }}>
          {(
            [
              ["hospitalName", "병원명", "text", "organization"],
              ["customerName", "성함", "text", "name"],
              ["phone", "연락처", "tel", "tel"],
              ["email", "이메일", "email", "email"],
            ] as const
          ).map(([k, ph, type, ac]) => (
            <input key={k} type={type} autoComplete={ac} aria-label={ph} placeholder={ph} value={f[k]} onChange={(e) => setF((p) => ({ ...p, [k]: e.target.value }))} style={{ ...inputStyle, padding: "11px 12px", fontSize: "0.92rem" }} />
          ))}
          <button type="button" disabled={busy} onClick={submit} style={{ gridColumn: "1 / -1", padding: "13px", background: RED, color: "#fff", border: "none", borderRadius: 4, fontWeight: 800, cursor: busy ? "wait" : "pointer" }}>
            {busy ? "여는 중…" : "제안서 열기"}
          </button>
        </div>
      )}
    </div>
  );
}
