import type { Metadata } from "next";
import Link from "next/link";
import { BIZ } from "../_data/biz";

export const metadata: Metadata = {
  title: "취소·환불 규정 | 열정의사람들",
  description:
    "주식회사 열정의사람들 마케팅 대행 서비스의 청약철회, 계약 해지, 환불 기준 안내.",
  alternates: { canonical: "https://www.timeofpassion.com/people/refund" },
};

const REFUND_ROWS = [
  {
    when: "용역 착수 전",
    rate: "결제금액 100% 환불",
    note: "기획·섭외 등 어떠한 작업도 개시되지 않은 상태",
  },
  {
    when: "용역 착수 후 ~ 진행률 30% 미만",
    rate: "결제금액의 70% 환불",
    note: "기획안 작성, 인플루언서 섭외 착수 등",
  },
  {
    when: "진행률 30% 이상 ~ 70% 미만",
    rate: "결제금액의 40% 환불",
    note: "콘텐츠 제작·촬영 진행, 섭외 확정 등",
  },
  {
    when: "진행률 70% 이상",
    rate: "환불 불가",
    note: "콘텐츠 발행·납품이 임박하거나 완료된 단계",
  },
];

export default function RefundPage() {
  return (
    <section className="ppl-section">
      <div className="ppl-container ppl-doc">
        <header className="ppl-doc__head">
          <h1>취소·환불 규정</h1>
          <p className="ppl-doc__meta">시행일 {BIZ.effectiveDate}</p>
        </header>

        <h2>1. 기본 원칙</h2>
        <p>
          {BIZ.companyName}(이하 &ldquo;회사&rdquo;)가 제공하는 서비스는 인플루언서
          섭외, 콘텐츠 기획·제작 등 <strong>무형의 용역</strong>으로, 용역이
          개시되면 원상회복이 어려운 비용(인플루언서 섭외비, 제작 인건비, 외주비
          등)이 즉시 발생합니다. 이에 따라 환불은 아래 기준에 따라 진행 정도를
          정산한 후 이루어집니다.
        </p>

        <h2>2. 청약철회</h2>
        <ol>
          <li>
            이용자는 계약 체결일 또는 결제일로부터 <strong>7일 이내</strong>이고
            아직 용역이 개시되지 않은 경우, 별도의 위약금 없이 청약을 철회할 수
            있습니다.
          </li>
          <li>
            회사가 이용자의 요청에 따라 이미 용역을 개시한 경우에는 아래 3항의
            환불 기준이 적용됩니다.
          </li>
          <li>
            이용자의 요청에 따라 개별적으로 기획·제작되어 재판매가 불가능한
            맞춤 산출물의 경우, 제작이 개시된 이후에는 청약철회가 제한될 수
            있습니다. 회사는 계약 전 이 사실을 이용자에게 고지합니다.
          </li>
        </ol>

        <h2>3. 진행 단계별 환불 기준</h2>
        <div className="ppl-doc__table-wrap">
          <table>
            <thead>
              <tr>
                <th>취소 요청 시점</th>
                <th>환불 금액</th>
                <th>해당 단계</th>
              </tr>
            </thead>
            <tbody>
              {REFUND_ROWS.map((r) => (
                <tr key={r.when}>
                  <td>{r.when}</td>
                  <td className="ppl-doc__num">{r.rate}</td>
                  <td>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ppl-doc__note">
          <p>
            월 단위 운영 상품(해외 인플루언서 마케팅 등)의 경우, 해지 요청일이
            속한 월의 용역은 정상 제공되며 <strong>익월분부터 해지</strong>가
            적용됩니다. 이미 발행된 콘텐츠와 지급이 완료된 인플루언서 대가는
            환불 대상에서 제외됩니다.
          </p>
        </div>

        <h2>4. 회사 귀책에 의한 환불</h2>
        <p>
          회사의 귀책사유로 계약 내용대로 용역이 제공되지 않은 경우, 이용자는 해당
          부분에 대하여 <strong>전액 환불</strong>을 요구할 수 있습니다. 이 경우
          위 3항의 진행 단계별 공제는 적용되지 않습니다.
        </p>

        <h2>5. 환불 절차 및 기간</h2>
        <ol>
          <li>
            환불 요청은 이메일({BIZ.email}) 또는 전화({BIZ.tel})로 접수합니다.
          </li>
          <li>
            회사는 요청 접수일로부터 <strong>영업일 기준 3일 이내</strong>에
            진행률과 환불 금액을 산정하여 이용자에게 통지합니다.
          </li>
          <li>
            환불 금액 확정 후 <strong>영업일 기준 3일 이내</strong>에 환불을
            처리합니다.
          </li>
          <li>
            신용카드로 결제한 경우 카드 결제 취소로 처리되며, 카드사 사정에 따라
            승인 취소 반영까지 추가로 3~5영업일이 소요될 수 있습니다. 부분 환불의
            경우 전체 승인 취소 후 차액을 재결제하거나 계좌로 환급합니다.
          </li>
          <li>
            계좌이체로 결제한 경우 이용자가 지정한 계좌로 입금하며, 송금 수수료는
            회사가 부담합니다.
          </li>
        </ol>

        <h2>6. 세금계산서 및 증빙</h2>
        <p>
          환불이 이루어진 경우 회사는 해당 금액에 대하여 수정세금계산서를 발행하며,
          카드 결제 건은 결제 취소 내역이 증빙을 대신합니다.
        </p>

        <h2>7. 문의</h2>
        <p>
          {BIZ.companyName} · 대표 {BIZ.ceo}
          <br />
          {BIZ.address}
          <br />
          전화 {BIZ.tel} · 이메일 {BIZ.email}
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/people/terms">이용약관</Link> ·{" "}
          <Link href="/people/privacy">개인정보처리방침</Link> ·{" "}
          <Link href="/people/pay">결제 안내</Link>
        </p>
      </div>
    </section>
  );
}
