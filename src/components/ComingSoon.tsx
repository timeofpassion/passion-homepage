import Link from "next/link";

type ComingSoonProps = {
  num: string;
  name: string;
  en: string;
  desc: string;
  modifier: "people" | "space";
};

export default function ComingSoon({
  num,
  name,
  en,
  desc,
  modifier,
}: ComingSoonProps) {
  return (
    <main className={`coming coming--${modifier}`}>
      <div className="coming__inner">
        <span className="coming__num">{num}</span>
        <h1 className="coming__name">{name}</h1>
        <span className="coming__en">{en}</span>
        <p className="coming__desc">{desc}</p>
        <p className="coming__soon">홈페이지를 준비하고 있습니다. 곧 만나요.</p>

        <p className="coming__contact">
          제휴·문의{" "}
          <a href="mailto:ceo@timeofpassion.com">ceo@timeofpassion.com</a>
          <br />
          카카오톡 채널{" "}
          <a
            href="https://pf.kakao.com/_RgYcxj/chat"
            target="_blank"
            rel="noopener noreferrer"
          >
            열정의시간 채널
          </a>
        </p>

        <Link href="/" className="coming__back">
          ← PASSION GROUP
        </Link>
      </div>
    </main>
  );
}
