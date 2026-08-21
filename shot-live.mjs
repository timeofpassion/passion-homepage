import { chromium } from "playwright"
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 })
await p.goto("https://www.timeofpassion.com/time/ad-check", { waitUntil: "networkidle" })
await p.screenshot({ path: process.argv[4] })
for (let i = 0; i < 3; i++) {
  await p.locator("textarea").first().fill("울쎄라 리프팅 300샷 39만원. 전후 사진과 실제 환자 후기 사진 첨부. 부작용 없이 100% 안전, 누적 12,000건.")
  await p.getByRole("button", { name: "검수하기" }).click()
  try { await p.locator(".adc-docs").waitFor({ state: "visible", timeout: 120000 }); break }
  catch { console.log("시도", i + 1, "실패 — 재시도") }
}
const n = await p.locator(".adc-docs .di").count()
console.log("서류 항목수:", n)
if (n > 0) {
  await p.locator(".adc-docs").screenshot({ path: process.argv[2] })
  await p.screenshot({ path: process.argv[3], fullPage: true })
}
await b.close()
