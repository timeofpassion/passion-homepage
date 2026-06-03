import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "열정의공간",
  description:
    "열정의공간 — 새로운 공간비즈니스를 준비하고 있는 기업. 홈페이지 준비 중입니다.",
  alternates: { canonical: "https://www.timeofpassion.com/space" },
};

export default function SpacePage() {
  return (
    <ComingSoon
      num="03 / 空間"
      name="열정의공간"
      en="SPACE"
      desc="새로운 공간비즈니스를 준비하고 있는 기업"
      modifier="space"
    />
  );
}
