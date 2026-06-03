import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "열정의사람들",
  description:
    "열정의사람들 — 글로벌마케팅과 인플루언서 국내해외 전문마케팅 기업. 홈페이지 준비 중입니다.",
  alternates: { canonical: "https://www.timeofpassion.com/people" },
};

export default function PeoplePage() {
  return (
    <ComingSoon
      num="02 / 人間"
      name="열정의사람들"
      en="PEOPLE"
      desc="글로벌마케팅과 인플루언서, 국내·해외를 잇는 전문마케팅 기업"
      modifier="people"
    />
  );
}
