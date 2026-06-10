import { redirect } from "next/navigation"

// 무-locale 진입은 기본 한국어 포털로.
export default function HospitalsRedirect() {
  redirect("/ko/hospitals")
}
