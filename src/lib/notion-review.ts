import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// ── 노션 DB IDs ──
const CLIENT_DB_ID = "316c37bf15b680bf8c71f76e0d7038fb";
const DOCTOR_DB_ID = "10384b0f76da4f4292ff3d719ef49122";

const ARCHIVE_DB_MAP: Record<string, string> = {
  naver: "6c687b90289e45cfbb51fdbebbecdddf",
  google_kr: "1ef71edefc9848eca14407cfd7a781c4",
  google_en: "1ef71edefc9848eca14407cfd7a781c4",
  kakao: "6b4fb58ad4d543bd89116a96fa8f4733",
};

// ── 타입 ──
export interface ClientInfo {
  id: string;
  name: string;
  category: string;
  importance: string;
  status: string;
}

export interface DoctorSettings {
  hospitalName: string;
  doctorName: string;
  preferredLength: string;
  personaStyle: string;
  emphasisKeywords: string;
  forbiddenWords: string;
  mainTreatments: string;
  specialty: string;
  notes: string;
}

// ── 헬퍼 ──
/* eslint-disable @typescript-eslint/no-explicit-any */
function text(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title.map((t: any) => t.plain_text).join("");
  if (prop.type === "rich_text") return prop.rich_text.map((t: any) => t.plain_text).join("");
  return "";
}

// ── 클라이언트 목록 조회 (계약 중만) ──
export async function getActiveClients(): Promise<ClientInfo[]> {
  const res = await (notion as any).databases.query({
    database_id: CLIENT_DB_ID,
    filter: {
      property: "업무상태",
      select: { equals: "계약 중" },
    },
    sorts: [{ property: "이름", direction: "ascending" }],
  });

  return res.results.map((page: any) => {
    const p = page.properties;
    return {
      id: page.id,
      name: text(p["이름"]),
      category: p["선택"]?.select?.name ?? "",
      importance: p["중요도"]?.select?.name ?? "",
      status: p["업무상태"]?.select?.name ?? "",
    };
  });
}

// ── 원장·병원 설정 조회 ──
export async function getDoctorSettings(hospitalName: string): Promise<DoctorSettings | null> {
  const res = await (notion as any).databases.query({
    database_id: DOCTOR_DB_ID,
    filter: {
      property: "병원명",
      title: { contains: hospitalName },
    },
  });

  const page = res.results[0] as any;
  if (!page) return null;

  const p = page.properties;
  return {
    hospitalName: text(p["병원명"]),
    doctorName: text(p["원장명"]),
    preferredLength: p["리뷰_선호길이"]?.select?.name ?? "",
    personaStyle: p["페르소나_스타일"]?.select?.name ?? "",
    emphasisKeywords: text(p["강조_키워드"]),
    forbiddenWords: text(p["금지어"]),
    mainTreatments: text(p["주력_시술"]),
    specialty: p["진료과목"]?.select?.name ?? "",
    notes: text(p["병원_특이사항"]),
  };
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
  const dbId = ARCHIVE_DB_MAP[params.platform];
  if (!dbId) throw new Error(`Unknown platform: ${params.platform}`);

  const page = await (notion as any).pages.create({
    parent: { database_id: dbId },
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
