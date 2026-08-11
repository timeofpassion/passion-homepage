import type { Metadata } from "next";
import Link from "next/link";
import { BIZ } from "../_data/biz";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 열정의사람들",
  description:
    "주식회사 열정의사람들의 개인정보 수집·이용·보관·파기 기준과 정보주체의 권리 안내.",
  alternates: { canonical: "https://www.timeofpassion.com/people/privacy" },
};

const KEEP_ROWS = [
  {
    what: "상담·견적 문의 정보 (이름, 연락처, 이메일, 회사명, 문의내용)",
    why: "상담 응대 및 견적 제공",
    how: "문의 처리 완료 후 3년",
  },
  {
    what: "계약·결제 정보 (담당자명, 연락처, 이메일, 사업자정보, 결제내역)",
    why: "계약 이행, 대금 결제 및 정산, 세금계산서 발행",
    how: "「전자상거래법」에 따라 5년",
  },
  {
    what: "결제·환불 기록",
    why: "대금결제 및 재화 공급에 관한 기록 보존",
    how: "「전자상거래법」에 따라 5년",
  },
  {
    what: "소비자 불만·분쟁처리 기록",
    why: "분쟁 대응",
    how: "「전자상거래법」에 따라 3년",
  },
  {
    what: "웹사이트 접속기록",
    why: "서비스 이용 통계 및 부정이용 방지",
    how: "「통신비밀보호법」에 따라 3개월",
  },
];

export default function PrivacyPage() {
  return (
    <section className="ppl-section">
      <div className="ppl-container ppl-doc">
        <header className="ppl-doc__head">
          <h1>개인정보처리방침</h1>
          <p className="ppl-doc__meta">시행일 {BIZ.effectiveDate}</p>
        </header>

        <p>
          {BIZ.companyName}(이하 &ldquo;회사&rdquo;)는 「개인정보 보호법」 등 관련
          법령을 준수하며, 정보주체의 개인정보를 보호하고 권익을 보장하기 위하여
          다음과 같이 개인정보처리방침을 수립·공개합니다.
        </p>

        <h2>1. 개인정보의 수집 항목 및 수집 방법</h2>
        <p>회사는 다음의 개인정보를 수집합니다.</p>
        <ul>
          <li>
            <strong>상담·견적 문의 시</strong> — 이름, 연락처, 이메일, 회사명(또는
            기관명), 문의 내용
          </li>
          <li>
            <strong>계약 및 결제 시</strong> — 담당자 이름, 연락처, 이메일,
            사업자등록번호 및 사업자정보, 결제수단 정보, 결제·환불 내역
          </li>
          <li>
            <strong>자동 수집</strong> — 접속 IP, 접속 일시, 서비스 이용기록,
            브라우저 및 기기 정보, 쿠키
          </li>
        </ul>
        <p>
          수집 방법은 웹사이트 문의 양식, 카카오톡 채널 상담, 이메일·전화 상담,
          계약서 작성, 결제 과정에서의 자동 수집입니다.
        </p>
        <div className="ppl-doc__note">
          <p>
            회사는 <strong>신용카드번호, 비밀번호 등 결제수단 정보를 직접 수집·보관하지 않습니다.</strong>{" "}
            해당 정보는 전자결제대행사가 관련 법령에 따라 직접 처리합니다.
          </p>
        </div>

        <h2>2. 개인정보의 처리 목적</h2>
        <ul>
          <li>상담 응대, 견적 제공 및 계약 체결</li>
          <li>마케팅 대행 용역의 제공 및 결과 보고</li>
          <li>대금 결제, 환불, 세금계산서 발행 등 정산 처리</li>
          <li>고객 문의 및 분쟁 처리, 공지사항 전달</li>
          <li>서비스 이용 통계 분석 및 품질 개선</li>
        </ul>

        <h2>3. 개인정보의 보유 및 이용 기간</h2>
        <p>
          회사는 처리 목적이 달성되면 개인정보를 지체 없이 파기합니다. 다만 관련
          법령에서 보존 기간을 정한 경우 해당 기간 동안 보관합니다.
        </p>
        <div className="ppl-doc__table-wrap">
          <table>
            <thead>
              <tr>
                <th>보유 항목</th>
                <th>보유 근거·목적</th>
                <th>보유 기간</th>
              </tr>
            </thead>
            <tbody>
              {KEEP_ROWS.map((r) => (
                <tr key={r.what}>
                  <td>{r.what}</td>
                  <td>{r.why}</td>
                  <td className="ppl-doc__num">{r.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>4. 개인정보의 제3자 제공</h2>
        <p>
          회사는 정보주체의 개인정보를 제1항에서 명시한 범위를 초과하여 이용하거나
          제3자에게 제공하지 않습니다. 다만 다음의 경우는 예외로 합니다.
        </p>
        <ul>
          <li>정보주체로부터 별도의 동의를 받은 경우</li>
          <li>법령에 특별한 규정이 있는 경우</li>
          <li>
            수사기관이 법령에 정한 절차와 방법에 따라 수사 목적으로 요구한 경우
          </li>
        </ul>

        <h2>5. 개인정보 처리의 위탁</h2>
        <p>
          회사는 원활한 서비스 제공을 위하여 아래와 같이 개인정보 처리업무를
          위탁하고 있으며, 위탁계약 시 개인정보의 안전한 관리를 위한 사항을
          규정하고 이를 감독합니다.
        </p>
        <div className="ppl-doc__table-wrap">
          <table>
            <thead>
              <tr>
                <th>수탁자</th>
                <th>위탁업무 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>전자결제대행사(회사가 계약한 PG사)</td>
                <td>신용카드 등 결제 승인·취소 및 정산 처리</td>
              </tr>
              <tr>
                <td>클라우드 인프라 제공사</td>
                <td>웹사이트 및 업무시스템 운영을 위한 데이터 보관</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>6. 정보주체의 권리와 행사 방법</h2>
        <ol>
          <li>
            정보주체는 언제든지 개인정보의 열람, 정정, 삭제, 처리정지를 요구할 수
            있습니다.
          </li>
          <li>
            권리 행사는 이메일({BIZ.email}) 또는 전화({BIZ.tel})로 요청할 수 있으며,
            회사는 지체 없이 조치합니다.
          </li>
          <li>
            정보주체가 개인정보의 오류에 대한 정정을 요청한 경우, 회사는 정정을
            완료하기 전까지 해당 개인정보를 이용하거나 제공하지 않습니다.
          </li>
        </ol>

        <h2>7. 개인정보의 파기 절차 및 방법</h2>
        <ul>
          <li>
            전자적 파일 형태의 정보는 복구할 수 없는 기술적 방법으로 영구 삭제합니다.
          </li>
          <li>종이 문서는 분쇄하거나 소각하여 파기합니다.</li>
          <li>
            보존 기간이 경과한 개인정보는 사유 발생일로부터 5일 이내에 파기합니다.
          </li>
        </ul>

        <h2>8. 개인정보의 안전성 확보 조치</h2>
        <ul>
          <li>개인정보 취급자를 최소한으로 지정하고 접근 권한을 관리합니다.</li>
          <li>
            개인정보가 저장되는 시스템에 대한 접근통제 및 접속기록 보관·점검을
            시행합니다.
          </li>
          <li>중요 정보는 암호화하여 저장·전송합니다.</li>
          <li>내부관리계획 수립·시행 및 취급자 교육을 정기적으로 실시합니다.</li>
        </ul>

        <h2>9. 쿠키의 운용</h2>
        <p>
          회사는 이용자 편의 제공 및 이용 통계 분석을 위해 쿠키를 사용할 수
          있습니다. 이용자는 웹브라우저 설정에서 쿠키 저장을 거부할 수 있으며, 이
          경우 일부 기능 이용에 제한이 있을 수 있습니다.
        </p>

        <h2>10. 개인정보 보호책임자</h2>
        <div className="ppl-doc__bizcard">
          <dl>
            <dt>개인정보 보호책임자</dt>
            <dd>{BIZ.privacyOfficer} (대표)</dd>
            <dt>연락처</dt>
            <dd>{BIZ.tel}</dd>
            <dt>이메일</dt>
            <dd>{BIZ.email}</dd>
            <dt>주소</dt>
            <dd>{BIZ.address}</dd>
          </dl>
        </div>
        <p>
          개인정보 침해에 대한 신고·상담이 필요한 경우 아래 기관에 문의하실 수
          있습니다.
        </p>
        <ul>
          <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
          <li>개인정보 분쟁조정위원회 (kopico.go.kr / 1833-6972)</li>
          <li>대검찰청 사이버수사과 (spo.go.kr / 1301)</li>
          <li>경찰청 사이버수사국 (ecrm.police.go.kr / 182)</li>
        </ul>

        <h2>11. 개인정보처리방침의 변경</h2>
        <p>
          본 방침의 내용에 추가, 삭제 및 수정이 있을 경우 시행 7일 전부터 웹사이트를
          통해 고지합니다.
        </p>

        <p>시행일: {BIZ.effectiveDate}</p>

        <p style={{ marginTop: 32 }}>
          <Link href="/people/terms">이용약관</Link> ·{" "}
          <Link href="/people/refund">취소·환불 규정</Link> ·{" "}
          <Link href="/people/pay">결제 안내</Link>
        </p>
      </div>
    </section>
  );
}
