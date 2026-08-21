import { chromium } from "playwright"
const U = "https://passion-homepage-onf5u6pv4-ceo-9842s-projects.vercel.app"
const SHARE = "?_vercel_share=dHKt1OiHCKYeJCutyxktIWMxBspFQlJv"
const OUT = process.argv[2]
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 })
await p.goto(U + "/" + SHARE, { waitUntil: "domcontentloaded" })
await p.goto(U + "/time/ad-check", { waitUntil: "networkidle" })
const ta = p.locator("textarea").first()
await ta.fill("울쎄라 리프팅 300샷 39만원. 전후 사진과 실제 환자 후기 사진 첨부. 부작용 없이 100% 안전, 누적 12,000건.")
await p.getByRole("button", { name: /검수|확인|검사/ }).first().click()
await p.locator(".adc-docs").waitFor({ timeout: 120000 })
const n = await p.locator(".adc-docs .di").count()
console.log("서류 카드 항목수:", n)
console.log("제목:", await p.locator(".adc-docs .dh").innerText())
await p.locator(".adc-docs").screenshot({ path: OUT })
await b.close()
