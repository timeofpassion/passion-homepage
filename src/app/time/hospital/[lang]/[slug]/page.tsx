import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../medical-tourism.css";
import { activeClinics, getClinic } from "../../_data/clinics";
import ClinicDetail from "../../_components/ClinicDetail";

const SUPPORTED = ["ko"];

export function generateStaticParams() {
  return SUPPORTED.flatMap((lang) =>
    activeClinics().map((c) => ({ lang, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const clinic = getClinic(slug);
  if (!SUPPORTED.includes(lang) || !clinic) return {};
  const flat = clinic.signature.replace(/\n/g, " ");
  const title = `${clinic.name} | 열정의시간 협력병원`;
  const description = `${flat} — ${clinic.name}. 한국인과 동일 수가, 통역 동행. 열정의시간 의료 컨시어지.`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://www.timeofpassion.com/time/hospital/${lang}/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.timeofpassion.com/time/hospital/${lang}/${slug}`,
      siteName: "열정의시간",
      type: "website",
    },
  };
}

export default async function ClinicDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!SUPPORTED.includes(lang)) notFound();
  const clinic = getClinic(slug);
  if (!clinic) notFound();
  return (
    <div id="mt">
      <ClinicDetail lang={lang} clinic={clinic} />
    </div>
  );
}
