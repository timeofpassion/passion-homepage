"use client";

import { TALING_URL } from "./links";

/**
 * 전체판(유료 50쪽) 판매 카드.
 *
 * 무료 12쪽 대조표를 받은 직후가 가장 신뢰가 높은 순간이고, 12호(외국인환자 유치)에 걸린
 * 사람은 이미 "해외 채널"을 필요로 하는 사람이라 전체판의 샤오홍슈 파트가 정확히 그 답이다.
 * 그 두 자리에만 세운다 — 아무 데나 붙이면 광고 배너로 읽힌다.
 *
 * 무료와 유료의 경계를 표로 그린다. 안 그리면 "무료로 다 주는 것"으로 읽혀서 살 이유가 없다.
 */
export default function TalingCard({ where }: { where: "pdf-done" | "overseas" | "soldout" }) {
  if (!TALING_URL) return null;

  return (
    <div className="adc-sell">
      <div className="sl-head">
        <span className="sl-eye">전체판 · 유료</span>
        <div className="sl-t">병원마케팅·의료광고 실전가이드 50쪽</div>
        <p className="sl-d">
          {where === "overseas"
            ? "해외 채널을 여실 계획이라면 이 책의 2부가 그 부분입니다. 샤오홍슈 계정정지 사유와 복구 절차, 국내 심의 대상이 아닌 채널의 표기 기준을 실제 사례로 정리했습니다."
            : where === "soldout"
              ? "이 검수 도구가 문장을 걸러내는 기준 그대로입니다. 한도에 걸리지 않고, 원내에서 직접 대조하며 쓰실 수 있습니다."
              : "방금 받으신 12쪽이 '무엇이 걸리는가'라면, 전체판은 '그래서 어떻게 통과시키는가'입니다."}
        </p>
      </div>

      <div className="sl-cols">
        <div className="sl-col">
          <h4>{where === "pdf-done" ? "무료 12쪽 (방금 받으신 것)" : "무료 12쪽"}</h4>
          <ul>
            <li>14개 금지유형 위반 → 수정 대조</li>
            <li>금지어가 있어도 정상인 문장 20선</li>
            <li>게시 전 12문항 체크리스트</li>
          </ul>
        </div>
        <div className="sl-col paid">
          <h4>전체판 50쪽에만 있는 것</h4>
          <ul>
            <li>회색지대 FAQ 10문 — 판단이 갈리는 문장들</li>
            <li>샤오홍슈·해외 채널 계정정지 대응과 복구</li>
            <li>사전심의 신청 실무와 행정처분 사례</li>
          </ul>
        </div>
      </div>

      <div className="sl-act">
        <a
          className="sl-buy"
          href={TALING_URL}
          target="_blank"
          rel="noopener noreferrer"
          // 안 재보면 잘 되는 줄 안다. GA 로 클릭만이라도 남긴다.
          onClick={() => window.gtag?.("event", "taling_click", { placement: where })}
        >
          탈잉에서 전체판 보기
        </a>
        <span className="sl-price">
          <b>49,000원</b> · 전자책(PDF) · 결제 즉시 열람
        </span>
      </div>
      {/* 대표 지시(2026-08-08) — 구매가 "도움이 됐으니 보답"으로 읽히게 하는 한 줄. 이게 없으면 그냥 배너다. */}
      <p className="sl-fund">
        이 검수 도구는 광고 없이, 전체판 판매 수익으로 운영합니다. 한 권이 팔릴 때마다 무료 검수 약 700건이 유지됩니다.
      </p>
    </div>
  );
}
