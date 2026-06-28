// EXP-005 — GEO '통계·수치 슬롯' + 정부 등록 신뢰 근거(외국인환자 유치업 등록증).
// 모든 값은 검증된 사실만 사용. 등록증은 대표 생년월일만 가린 실물 캡처.
const FACTS: { k: string; v: string; strong?: boolean }[] = [
  { k: "외국인환자 유치업 등록", v: "A-2025-01-02-06178호", strong: true },
  { k: "등록 유효기간", v: "2025.07.11 ~ 2028.07.10" },
  { k: "현 사업장 주소", v: "서울 강남구 신사동 524-27, 2층" },
  { k: "법인 설립", v: "2023년 · 대표 병원 마케팅 운영 경력 10년 이상" },
  { k: "운영 마케팅 시장", v: "국내 · 일본 · 중국 · 대만 (4개국)" },
  { k: "협력 의료기관", v: "누적 19곳 (계약 종료 포함)" },
  { k: "채널 · 계정 소유권", v: "100% 클리닉(병원) 귀속" },
];

export default function CompanyFacts() {
  return (
    <section style={{ position: "relative", zIndex: 20, padding: "3rem 0" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 6%" }}>
        {/* Eyebrow */}
        <div
          className="font-mono-sys"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            fontSize: 12,
            letterSpacing: "0.22em",
            color: "#FFD700",
            marginBottom: "1.6rem",
          }}
        >
          <span style={{ width: 28, height: 1, background: "rgba(255,215,0,0.5)" }} />
          OFFICIAL RECORD · 공식 정보
          <span style={{ width: 28, height: 1, background: "rgba(255,215,0,0.5)" }} />
        </div>

        {/* 핵심 신뢰 메시지 */}
        <p
          style={{
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto 2.4rem",
            fontSize: "clamp(1.05rem, 2.2vw, 1.4rem)",
            fontWeight: 700,
            lineHeight: 1.5,
          }}
        >
          열정의시간은{" "}
          <span style={{ color: "#ff5a5a" }}>
            정부에 정식 등록된 합법 외국인환자 유치업체
          </span>
          입니다.
          <span
            style={{
              display: "block",
              marginTop: 10,
              fontSize: "0.8rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
            }}
          >
            「의료 해외진출 및 외국인환자 유치 지원에 관한 법률」(보건복지부 소관)에 따라
            외국인환자 유치업자로 등록 · 서울특별시 발급
          </span>
        </p>

        {/* 등록증 + 팩트 */}
        <div
          className="glass-card"
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            padding: "1.6rem",
            alignItems: "stretch",
          }}
        >
          <div className="tech-border" style={{ position: "absolute", inset: 0 }} />

          {/* 등록증 이미지 (클릭 시 원본) */}
          <a
            href="/time/foreign-patient-cert.png"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: "0 0 auto",
              width: 280,
              maxWidth: "100%",
              margin: "0 auto",
              position: "relative",
              zIndex: 10,
              display: "block",
            }}
          >
            <img
              src="/time/foreign-patient-cert.png"
              alt="열정의시간 외국인환자 유치업자 등록증 (등록번호 A-2025-01-02-06178호, 서울특별시 발급)"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                background: "#fff",
                padding: 8,
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 14px 36px -14px rgba(0,0,0,0.7)",
              }}
            />
            <span
              className="font-mono-sys"
              style={{
                display: "block",
                marginTop: 8,
                textAlign: "center",
                fontSize: 10,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              외국인환자 유치업자 등록증 · 클릭 시 원본
            </span>
          </a>

          {/* 팩트 목록 */}
          <dl
            style={{
              flex: "1 1 360px",
              position: "relative",
              zIndex: 10,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {FACTS.map((f, i) => (
              <div
                key={f.k}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.3rem 1rem",
                  alignItems: "baseline",
                  padding: "0.8rem 0.2rem",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <dt
                  style={{
                    flex: "0 0 auto",
                    minWidth: 140,
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {f.k}
                </dt>
                <dd
                  className={f.strong ? "font-mono-sys" : undefined}
                  style={{
                    flex: "1 1 180px",
                    margin: 0,
                    fontSize: f.strong ? "1rem" : "0.95rem",
                    fontWeight: f.strong ? 800 : 600,
                    color: f.strong ? "#ff5a5a" : "#fff",
                  }}
                >
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
