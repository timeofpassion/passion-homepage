import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllHospitals } from "@/lib/hospital-portal"
import HospitalCatalog from "./HospitalCatalog"
import { HOSPITAL_PORTAL_PUBLIC } from "./_visibility"
import "../[lang]/hospitals/hospitals.css"
import "./hospital.css"

export const revalidate = 300

export const metadata: Metadata = {
  title: "협력병원 | 열정의시간",
  description:
    "열정의시간이 함께하는 협력병원을 소개합니다. 각 병원의 강점·대표 시술·원장을 한국어·영어·일본어·중국어·대만어로 확인하세요.",
  robots: HOSPITAL_PORTAL_PUBLIC ? undefined : { index: false, follow: false },
  alternates: { canonical: "https://www.timeofpassion.com/hospital" },
  openGraph: {
    title: "협력병원 | 열정의시간",
    description: "열정의시간이 함께하는 협력병원 — 강점·대표 시술·원장 소개",
    url: "https://www.timeofpassion.com/hospital",
    siteName: "열정의시간",
    type: "website",
  },
}

export default async function HospitalPage() {
  if (!HOSPITAL_PORTAL_PUBLIC) notFound()
  const { hospitals } = await getAllHospitals()
  return <HospitalCatalog hospitals={hospitals} />
}
