/**
 * 의료광고 위반문구 대조표(12쪽) PDF 빌드.
 *
 *   node scripts/ad-check-guide/build.mjs
 *
 * 예약·판매 주소가 나오면 환경변수만 넣고 다시 돌리면 된다. 원고를 다시 손댈 일이 없다.
 *   BOOKING_URL=https://cal.com/... TALING_URL=https://taling.me/... node scripts/ad-check-guide/build.mjs
 *
 * Word COM 은 헤드리스에서 못 쓰고, wkhtmltopdf 는 가변폰트를 못 먹는다.
 * Edge 의 --headless=new --print-to-pdf 가 Pretendard Variable 을 그대로 임베드하는 유일한 경로다.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");
const OUT_DIR = join(ROOT, "public", "downloads");
const OUT = join(OUT_DIR, "medical-ad-check-guide-2026.pdf");
const FONT = join(ROOT, "public", "fonts", "PretendardVariable.woff2");

const BOOKING_URL = (process.env.BOOKING_URL ?? "").trim();
const TALING_URL = (process.env.TALING_URL ?? "").trim();

const EDGE_CANDIDATES = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const edge = EDGE_CANDIDATES.find(existsSync);
if (!edge) {
  console.error("Microsoft Edge 를 찾지 못했습니다. 경로를 EDGE_CANDIDATES 에 추가하세요.");
  process.exit(1);
}
if (!existsSync(FONT)) {
  console.error(`폰트가 없습니다: ${FONT}`);
  process.exit(1);
}

const taling = TALING_URL
  ? `전체 50쪽은 <b>탈잉</b>에서 보실 수 있습니다. <span style="color:#E63329">${TALING_URL}</span>`
  : `<b>탈잉</b>에서 “병원마케팅, 의료광고 위반문구와 샤오홍슈 계정정지 해결법”으로 검색하시면 받아보실 수 있습니다.`;

const html = readFileSync(join(HERE, "guide.html"), "utf8")
  .replaceAll("__FONT_URL__", pathToFileURL(FONT).href)
  .replaceAll("__BOOK_LABEL__", BOOKING_URL ? "30분 무료 상담 예약" : "상담 · 카카오톡 채널")
  .replaceAll("__BOOK_VALUE__", BOOKING_URL || "열정의시간")
  .replaceAll("__TALING_LINE__", taling);

const stage = join(tmpdir(), `adcheck-guide-${process.pid}`);
mkdirSync(stage, { recursive: true });
const stagedHtml = join(stage, "guide.html");
writeFileSync(stagedHtml, html, "utf8");
mkdirSync(OUT_DIR, { recursive: true });

try {
  execFileSync(
    edge,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      `--user-data-dir=${join(stage, "profile")}`,
      "--allow-file-access-from-files",
      "--virtual-time-budget=20000",
      "--print-to-pdf-no-header",
      `--print-to-pdf=${OUT}`,
      pathToFileURL(stagedHtml).href,
    ],
    { stdio: "ignore" }
  );
} finally {
  rmSync(stage, { recursive: true, force: true });
}

if (!existsSync(OUT)) {
  console.error("PDF 가 생성되지 않았습니다.");
  process.exit(1);
}
console.log(
  `생성 완료 · ${OUT} · ${(statSync(OUT).size / 1024 / 1024).toFixed(2)}MB` +
    `\n  예약 링크 ${BOOKING_URL || "(미설정 — 카카오톡 채널로 표기됨)"}` +
    `\n  탈잉 링크 ${TALING_URL || "(미설정 — 검색 안내로 표기됨)"}`
);
