import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../medical-tourism.css";
import { activeClinics } from "../_data/clinics";
import Directory from "../_components/Directory";

const SUPPORTED = ["ko"]; // Phase 1: 한국어. P2에서 ja/zh-CN/zh-TW/en 확장.

export function generateStaticParams() {
  return SUPPORTED.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!SUPPORTED.includes(lang)) return {};
  const title = "한국 의료관광 협력병원 | 열정의시간";
  const description =
    "한국인이 다니는 병원에, 한국인과 같은 기준·같은 가격으로. 보건복지부 외국인환자 유치업 등록기관 열정의시간이 엄선한 협력병원과 전담 컨시어지.";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://www.timeofpassion.com/time/hospital/${lang}` },
    openGraph: {
      title,
      description,
      url: `https://www.timeofpassion.com/time/hospital/${lang}`,
      siteName: "열정의시간",
      type: "website",
    },
  };
}

export default async function HospitalDirectoryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED.includes(lang)) notFound();
  return (
    <div id="mt">
      <Directory lang={lang} clinics={activeClinics()} />
    </div>
  );
}
