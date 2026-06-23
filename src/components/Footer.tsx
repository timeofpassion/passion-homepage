import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__col">
          <div className="site-footer__brand">열정의시간</div>
          <p>
            13년의 노하우.
            <br />
            병원의 실질적 매출을 만드는
            <br />
            &lsquo;수익 구조&rsquo; 자체를 설계합니다.
          </p>
        </div>

        <div className="site-footer__col">
          <h4>SERVICES</h4>
          <p>
            <span style={{ display: "block" }}>
              <Link href="/time#services">국내 통합 마케팅</Link>
            </span>
            <span style={{ display: "block" }}>
              <Link href="/time#services">해외 마케팅</Link>
            </span>
            <span style={{ display: "block" }}>
              <Link href="/time#services">해외환자 유치 풀 프로세스</Link>
            </span>
            <span style={{ display: "block" }}>
              <Link href="/time/blog">마케팅 인사이트</Link>
            </span>
            <span style={{ display: "block" }}>
              <Link href="/time/quote">견적 의뢰</Link>
            </span>
            <span style={{ display: "block" }}>
              <Link href="/">PASSION GROUP 포털</Link>
            </span>
          </p>
        </div>

        <div className="site-footer__col">
          <h4>CONTACT</h4>
          <p>
            <a href="mailto:ceo@timeofpassion.com">ceo@timeofpassion.com</a>
            <br />
            카카오톡 채널{" "}
            <a
              href="https://pf.kakao.com/_timfofpassion"
              target="_blank"
              rel="noopener noreferrer"
            >
              @timfofpassion
            </a>
          </p>
        </div>
      </div>

      <div className="site-footer__bottom">
        © 2026 열정의시간. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
