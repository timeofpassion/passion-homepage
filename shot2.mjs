import { chromium } from "playwright"
const b = await chromium.launch()
for (const [w, name] of [[390, "phone"], [1440, "desktop"]]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 })
  await p.goto("http://localhost:3101/guide/zzpreview", { waitUntil: "networkidle" })
  const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  await p.screenshot({ path: `shot-${name}.png`, fullPage: true })
  console.log(name, "가로넘침:", over)
  await p.close()
}
await b.close()
