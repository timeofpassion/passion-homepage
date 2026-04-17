import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// ── 노션 Data Source IDs ──
// O2O 클라이언트 관리 DB (병원 선택 + 원장·병원 설정 통합)
const O2O_CLIENT_DS_ID = "eb185937-3802-4dbd-96d1-747a006f9bec";
const TREATMENT_KB_PAGE_ID = "340c37bf15b681288763c1fbdc2894ae";

const ARCHIVE_DS_MAP: Record<string, string> = {
  naver: "65739a01-45bc-4a8f-a56d-34fc956e2681",
  google_kr: "63473360-2469-44ee-a846-b6cfb9c46fc6",
  kakao: "838b8ffa-0e2d-4efa-919e-5434634ec04b",
};

// ── 타입 ──
export interface ClientInfo {
  id: string;
  name: string;
  specialty: string;
  status: string;
}

export interface DoctorSettings {
  hospitalName: string;
  doctorName: string;
  doctorList: string[];
  mainTreatments: string;
  treatmentList: string[];
  specialty: string;
  personaStyle: string;
  naverPreferredLength: string;
  googlePreferredLength: string;
  kakaoPreferredLength: string;
  emphasisKeywords: string;
  forbiddenWords: string;
  notes: string;
  naverUrl: string;
  googleUrl: string;
  kakaoUrl: string;
  memo: string;
}

// ── 헬퍼 ──
/* eslint-disable @typescript-eslint/no-explicit-any */
function text(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title.map((t: any) => t.plain_text).join("");
  if (prop.type === "rich_text") return prop.rich_text.map((t: any) => t.plain_text).join("");
  return "";
}

function parseList(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(/[,、，/\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// ── O2O 클라이언트 목록 조회 (활성 상태만) ──
export async function getActiveClients(): Promise<ClientInfo[]> {
  const res = await (notion as any).dataSources.query({
    data_source_id: O2O_CLIENT_DS_ID,
    filter: {
      property: "활성화",
      select: { equals: "활성" },
    },
    sorts: [{ property: "병원명", direction: "ascending" }],
    page_size: 100,
  });

  return res.results.map((page: any) => {
    const p = page.properties;
    return {
      id: page.id,
      name: text(p["병원명"]),
      specialty: p["진료과목"]?.select?.name ?? "",
      status: p["활성화"]?.select?.name ?? "",
    };
  });
}

// ── 원장·병원 설정 조회 (O2O DB 단일 소스) ──
export async function getDoctorSettings(hospitalName: string): Promise<DoctorSettings | null> {
  const res = await (notion as any).dataSources.query({
    data_source_id: O2O_CLIENT_DS_ID,
    filter: {
      property: "병원명",
      title: { contains: hospitalName },
    },
  });

  const page = res.results[0] as any;
  if (!page) return null;

  const p = page.properties;
  const doctorName = text(p["원장명"]);
  const mainTreatments = text(p["주력_시술"]);

  return {
    hospitalName: text(p["병원명"]),
    doctorName,
    doctorList: parseList(doctorName),
    mainTreatments,
    treatmentList: parseList(mainTreatments),
    specialty: p["진료과목"]?.select?.name ?? "",
    personaStyle: p["O2O_페르소나"]?.select?.name ?? "",
    naverPreferredLength: p["O2O_네이버_선호길이"]?.select?.name ?? "",
    googlePreferredLength: p["O2O_구글_선호길이"]?.select?.name ?? "",
    kakaoPreferredLength: p["O2O_카카오_선호길이"]?.select?.name ?? "",
    emphasisKeywords: text(p["강조_키워드"]),
    forbiddenWords: text(p["금지어"]),
    notes: text(p["O2O_특이사항"]),
    naverUrl: p["네이버_URL"]?.url ?? "",
    googleUrl: p["구글_URL"]?.url ?? "",
    kakaoUrl: p["카카오_URL"]?.url ?? "",
    memo: text(p["병원_메모"]),
  };
}

// ── 플랫폼별 선호 길이 추출 ──
export function getPreferredLengthForPlatform(ds: DoctorSettings | null, platform: string): string {
  if (!ds) return "";
  switch (platform) {
    case "naver":
      return ds.naverPreferredLength;
    case "google_kr":
      return ds.googlePreferredLength;
    case "kakao":
      return ds.kakaoPreferredLength;
    default:
      return "";
  }
}

// ── 피드백을 O2O DB의 O2O_특이사항에 누적 저장 ──
export async function saveFeedback(params: {
  hospitalName: string;
  feedback: string;
  platforms: string[];
}): Promise<void> {
  // 해당 병원 페이지 찾기
  const res = await (notion as any).dataSources.query({
    data_source_id: O2O_CLIENT_DS_ID,
    filter: {
      property: "병원명",
      title: { contains: params.hospitalName },
    },
  });

  const page = res.results[0] as any;
  if (!page) throw new Error(`병원을 찾을 수 없음: ${params.hospitalName}`);

  const existingNotes = text(page.properties["O2O_특이사항"]);

  // 날짜 KST
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const dateStr = kst.toISOString().slice(0, 16).replace("T", " ");

  const platformTag = params.platforms.length === 0 || params.platforms.includes("전체")
    ? "[전체]"
    : `[${params.platforms.join("/")}]`;

  const feedbackEntry = `\n\n[피드백 ${dateStr} ${platformTag}] ${params.feedback.trim()}`;

  // 기존 특이사항이 2000자 근처면 오래된 피드백 제거 (맨 앞부터 삭제)
  let newNotes = existingNotes + feedbackEntry;
  if (newNotes.length > 1800) {
    // 앞부분 잘라내고 공지 추가
    newNotes = "...(이전 피드백 생략)...\n" + newNotes.slice(-1700);
  }

  await (notion as any).pages.update({
    page_id: page.id,
    properties: {
      "O2O_특이사항": {
        rich_text: [{ text: { content: newNotes } }],
      },
    },
  });
}

// ── 최근 생성된 원고 조회 (중복 방지용) ──
export async function getRecentReviews(params: {
  platform: string;
  hospitalName: string;
  limit?: number;
}): Promise<string[]> {
  const dsId = ARCHIVE_DS_MAP[params.platform];
  if (!dsId) return [];
  const limit = params.limit ?? 20;

  try {
    const res = await (notion as any).dataSources.query({
      data_source_id: dsId,
      filter: {
        property: "클라이언트",
        rich_text: { contains: params.hospitalName },
      },
      sorts: [{ property: "생성일", direction: "descending" }],
      page_size: limit,
    });

    return res.results
      .map((page: any) => text(page.properties["원고내용"]))
      .filter((c: string) => c && c.length > 0);
  } catch (e) {
    console.error("최근 원고 조회 실패:", e);
    return [];
  }
}

// ── 생성된 원고 노션 아카이브에 저장 ──
export async function saveReviewToNotion(params: {
  platform: string;
  clientName: string;
  title: string;
  content: string;
  charCount: number;
  emphasisPoints: string[];
}): Promise<string> {
  const dsId = ARCHIVE_DS_MAP[params.platform];
  if (!dsId) throw new Error(`Unknown platform: ${params.platform}`);

  const page = await (notion as any).pages.create({
    parent: { data_source_id: dsId },
    properties: {
      "원고 제목": {
        title: [{ text: { content: params.title } }],
      },
      "원고내용": {
        rich_text: [{ text: { content: params.content.slice(0, 2000) } }],
      },
      "클라이언트": {
        rich_text: [{ text: { content: params.clientName } }],
      },
      "글자수": {
        number: params.charCount,
      },
      "상태": {
        select: { name: "미게시" },
      },
      "강조포인트": {
        multi_select: params.emphasisPoints.map((name) => ({ name })),
      },
    },
  });

  return page.id;
}

// ── 시술 공통 지식 베이스 조회 (5분 메모리 캐시) ──
let kbCache: { content: string; fetchedAt: number } | null = null;
const KB_CACHE_TTL_MS = 5 * 60 * 1000;

function richTextToPlain(richTexts: any[]): string {
  if (!richTexts) return "";
  return richTexts.map((t: any) => t.plain_text ?? "").join("");
}

function blockToText(block: any, indent: number = 0): string {
  const type = block.type;
  const data = block[type];
  if (!data) return "";
  const pad = "  ".repeat(indent);

  switch (type) {
    case "paragraph":
      return pad + richTextToPlain(data.rich_text);
    case "heading_1":
      return `\n# ${richTextToPlain(data.rich_text)}`;
    case "heading_2":
      return `\n## ${richTextToPlain(data.rich_text)}`;
    case "heading_3":
      return `\n### ${richTextToPlain(data.rich_text)}`;
    case "bulleted_list_item":
      return pad + "- " + richTextToPlain(data.rich_text);
    case "numbered_list_item":
      return pad + "1. " + richTextToPlain(data.rich_text);
    case "quote":
      return pad + "> " + richTextToPlain(data.rich_text);
    case "callout":
      return pad + "💡 " + richTextToPlain(data.rich_text);
    case "code":
      return pad + "```\n" + richTextToPlain(data.rich_text) + "\n```";
    case "divider":
      return "---";
    case "table":
      return "";
    case "table_row": {
      const cells = data.cells?.map((cell: any[]) => richTextToPlain(cell)) ?? [];
      return pad + "| " + cells.join(" | ") + " |";
    }
    default:
      return "";
  }
}

async function fetchPageBlocksRecursive(pageId: string, indent: number = 0): Promise<string[]> {
  const lines: string[] = [];
  let cursor: string | undefined;
  do {
    const res: any = await (notion as any).blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    for (const block of res.results as any[]) {
      const line = blockToText(block, indent);
      if (line) lines.push(line);
      if (block.has_children) {
        const childLines = await fetchPageBlocksRecursive(block.id, indent + 1);
        lines.push(...childLines);
      }
    }
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);
  return lines;
}

export async function getTreatmentKnowledgeBase(): Promise<string> {
  if (kbCache && Date.now() - kbCache.fetchedAt < KB_CACHE_TTL_MS) {
    return kbCache.content;
  }

  try {
    const lines = await fetchPageBlocksRecursive(TREATMENT_KB_PAGE_ID);
    const content = lines.join("\n");
    kbCache = { content, fetchedAt: Date.now() };
    return content;
  } catch (e) {
    console.error("지식 베이스 조회 실패:", e);
    return kbCache?.content ?? "";
  }
}
