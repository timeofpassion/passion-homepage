import type { Metadata } from "next";
import Link from "next/link";
import { BIZ } from "../_data/biz";

export const metadata: Metadata = {
  title: "결제 안내 | 열정의사람들",
  description:
    "열정의사람들 서비스 이용요금·결제수단·공급시기·환불 기준 안내. 신용카드 및 계좌이체로 결제하실 수 있습니다.",
  alternates: { canonical: "https://www.timeofpassion.com/people/pay" },
};

// 인트라넷 상품 DB(Product/ProductOption) 기준 판매가 범위. 개별 견적은 계약서·결제화면 금액이 우선.
const PRICES = [
  {
    group: "해외 인플루언서 마케팅",
    item: "일본·중국·대만 올인원 패키지 (월 단위 운영)",
    price: "4,400,000원 ~ 7,150,000원",
  },
  {
    group: "체험단·바이럴",
    item: "체험단·기자단 모집 운영, 카페·커뮤니티 바이럴 (캠페인 단위)",
    price: "55,000원 ~ 2,530,000원",
  },
  {
    group: "영상 제작",
    item: "숏폼·홍보영상 기획·촬영·편집 (편 단위)",
    price: "300,000원 ~ 1,500,000원",
  },
  {
    group: "국내 마케팅",
    item: "병원 브랜드 스토리북 등 콘텐츠 패키지",
    price: "3,000,000원",
  },
  {
    group: "디자인",
    item: "이미지 보정·상세페이지·홈페이지 디자인",
    price: "15,000원 ~ 1,000,000원",
  },
  {
    group: "번역",
    item: "일본어·중국어 번역 (건·장 단위)",
    price: "5,500원 ~ 33,000원",
  },
  {
    group: "통역",
    item: "현장 통역 (기본 2시간)",
    price: "165,000원부터",
  },
];

export default function PayPage() {
  return (
    <section className="ppl-section">
      <div className="ppl-container ppl-doc">
        <header className="ppl-doc__head">
          <h1>결제 안내</h1>
          <p className="ppl-doc__meta">
            {BIZ.companyName}이 제공하는 마케팅 대행 용역의 이용요금, 결제수단,
            공급시기, 취소·환불 기준을 안내합니다.
          </p>
        </header>

        <h2>1. 판매자 정보</h2>
        <div className="ppl-doc__bizcard">
          <dl>
            <dt>상호</dt>
            <dd>{BIZ.companyName}</dd>
            <dt>대표자</dt>
            <dd>{BIZ.ceo}</dd>
            <dt>사업자등록번호</dt>
            <dd>{BIZ.bizNumber}</dd>
            <dt>통신판매업신고번호</dt>
            <dd>{BIZ.mailOrderNumber}</dd>
            <dt>사업장 주소</dt>
            <dd>{BIZ.address}</dd>
            <dt>전화번호</dt>
            <dd>{BIZ.tel}</dd>
            <dt>이메일</dt>
            <dd>{BIZ.email}</dd>
            <dt>개인정보관리책임자</dt>
            <dd>{BIZ.privacyOfficer}</dd>
          </dl>
        </div>

        <h2>2. 판매 서비스 및 이용요금</h2>
        <p>
          당사는 국내·일본·중국·대만 시장을 대상으로 하는 인플루언서 마케팅,
          콘텐츠 제작, 번역·통역, 디자인 용역을 제공합니다. 서비스별 판매가
          범위는 다음과 같습니다.
        </p>
        <div className="ppl-doc__table-wrap">
          <table>
            <thead>
              <tr>
                <th>구분</th>
                <th>서비스 내용</th>
                <th>이용요금</th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map((p) => (
                <tr key={p.group + p.item}>
                  <td>{p.group}</td>
                  <td>{p.item}</td>
                  <td className="ppl-doc__num">{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ppl-doc__note">
          <p>
            위 금액은 표준 상품 기준의 판매가 범위입니다. 실제 결제 금액은 캠페인
            규모·기간·투입 인플루언서 수 등에 따라 달라지며,{" "}
            <strong>
              부가가치세 포함 여부를 포함한 최종 금액은 견적서 및 결제 화면에
              명시
            </strong>
            됩니다. 결제 전 반드시 해당 금액을 확인해 주시기 바랍니다.
          </p>
        </div>

        <h2>3. 결제수단</h2>
        <ul>
          <li>
            <strong>신용카드·체크카드</strong> — 국내 카드사 일시불 및 할부(카드사
            정책에 따름)
          </li>
          <li>
            <strong>계좌이체·무통장입금</strong> — 당사 지정 법인 계좌로 입금
          </li>
        </ul>
        <p>
          카드 결제는 당사가 계약·견적 확정 후 발송하는 <strong>결제 링크</strong>
          를 통해 진행되며, 결제 정보는 전자금융거래 관련 법령에 따라 결제대행사가
          안전하게 처리합니다. 당사는 고객의 카드번호 등 결제수단 정보를 직접
          보관하지 않습니다.
        </p>

        <h2>4. 공급시기 및 이용 방법</h2>
        <ul>
          <li>
            용역 개시일은 계약서 또는 견적서에 기재된 일정을 따르며, 별도 합의가
            없는 경우 <strong>결제 확인일로부터 영업일 기준 3일 이내</strong>{" "}
            착수합니다.
          </li>
          <li>
            월 단위 운영 상품은 착수일로부터 1개월 단위로 용역을 제공하고, 기간
            종료 시 성과 리포트를 제출합니다.
          </li>
          <li>
            제작물(영상·디자인·번역 등)은 합의된 납품일에 이메일 또는 클라우드
            링크로 전달합니다.
          </li>
        </ul>

        <h2>5. 취소 및 환불</h2>
        <p>
          당사가 제공하는 상품은 무형의 용역으로, 용역 착수 이전에는 전액 환불이
          가능하며 착수 이후에는 진행 정도에 따라 정산 후 환불합니다. 자세한 기준은{" "}
          <Link href="/people/refund">취소·환불 규정</Link>을 확인해 주세요.
        </p>

        <h2>6. 문의</h2>
        <p>
          결제·계약·세금계산서 관련 문의는 아래로 연락 주시기 바랍니다.
          <br />
          전화 {BIZ.tel} · 이메일 {BIZ.email}
          <br />
          <a href={BIZ.kakaoUrl} target="_blank" rel="noopener noreferrer">
            카카오톡 채널 상담 바로가기
          </a>
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/people/terms">이용약관</Link> ·{" "}
          <Link href="/people/privacy">개인정보처리방침</Link> ·{" "}
          <Link href="/people/refund">취소·환불 규정</Link>
        </p>
      </div>
    </section>
  );
}
