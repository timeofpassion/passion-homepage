import { chromium } from "playwright"
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
await p.goto("http://localhost:3100/guide/partner", { waitUntil: "networkidle" })
const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
await p.screenshot({ path: "shot-guide.png", fullPage: true })
console.log("가로넘침(px):", overflow)
await b.close()
