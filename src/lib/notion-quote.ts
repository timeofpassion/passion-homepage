import { Client } from "@notionhq/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
const notion = new Client({ auth: process.env.NOTION_API_KEY }) as any;

// 노션 DB IDs
const PRODUCT_DS_ID = "33bc37bf-15b6-80ac-b030-000b7b5870ab"; // 상품기획 data source
const QUOTE_DB_ID = "6f6e5c3230574ac887cd332cd925a4f4"; // 견적 내역 database
const QUOTE_DS_ID = "50c437a1-8720-4201-9db2-bcd845291ad3"; // 견적 내역 data source

// ── 타입 ──
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  minQty: number;
  cost: number;
  description: string;
  team: string;
}

export interface QuoteRequest {
  customerName: string;
  email: string;
  phone: string;
  hospitalName: string;
  memo: string;
  selectedProducts: { id: string; name: string; price: number }[];
  subtotal: number;
  vat: number;
  total: number;
}

export interface QuoteRecord {
  id: string;
  quoteId: string;
  customerName: string;
  email: string;
  phone: string;
  hospitalName: string;
  memo: string;
  products: string; // JSON
  subtotal: number;
  vat: number;
  total: number;
  status: string;
  createdAt: string;
}

// ── 헬퍼 ──
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function text(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.map((t: { plain_text: string }) => t.plain_text).join("") || "";
  if (prop.type === "rich_text") return prop.rich_text?.map((t: { plain_text: string }) => t.plain_text).join("") || "";
  return "";
}

// ── "판매 중" 상품 조회 ──
export async function getActiveProducts(): Promise<Product[]> {
  const res = await notion.dataSources.query({
    data_source_id: PRODUCT_DS_ID,
    filter: {
      property: "기획 상태",
      status: { equals: "판매 중" },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return res.results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      name: text(props["상품명"]),
      category: props["상품 카테고리"]?.select?.name || "기타",
      price: props["판매 단가"]?.number || 0,
      minQty: props["최소수량"]?.number || 1,
      cost: props["예상 원가"]?.number || 0,
      description: text(props["상품 설명"]),
      team: props["담당 팀"]?.select?.name || "",
    };
  });
}

// ── 견적 저장 ──
export async function saveQuote(quoteId: string, req: QuoteRequest): Promise<string> {
  const page = await notion.pages.create({
    parent: { database_id: QUOTE_DB_ID },
    properties: {
      "견적 제목": {
        title: [{ text: { content: `${req.hospitalName} - ${req.customerName}` } }],
      },
      "견적ID": {
        rich_text: [{ text: { content: quoteId } }],
      },
      "고객명": {
        rich_text: [{ text: { content: req.customerName } }],
      },
      "이메일": { email: req.email },
      "전화번호": { phone_number: req.phone },
      "병원명": {
        rich_text: [{ text: { content: req.hospitalName } }],
      },
      "메모": {
        rich_text: [{ text: { content: req.memo || "" } }],
      },
      "선택 상품": {
        rich_text: [{ text: { content: JSON.stringify(req.selectedProducts) } }],
      },
      "공급가": { number: req.subtotal },
      "부가세": { number: req.vat },
      "총 금액": { number: req.total },
      "상태": { select: { name: "대기" } },
    },
  });

  return page.id;
}

// ── 견적 조회 ──
export async function getQuoteByQuoteId(quoteId: string): Promise<QuoteRecord | null> {
  const res = await notion.dataSources.query({
    data_source_id: QUOTE_DS_ID,
    filter: {
      property: "견적ID",
      rich_text: { equals: quoteId },
    },
  });

  if (res.results.length === 0) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = res.results[0] as any;
  const props = page.properties;

  return {
    id: page.id,
    quoteId: text(props["견적ID"]),
    customerName: text(props["고객명"]),
    email: props["이메일"]?.email || "",
    phone: props["전화번호"]?.phone_number || "",
    hospitalName: text(props["병원명"]),
    memo: text(props["메모"]),
    products: text(props["선택 상품"]),
    subtotal: props["공급가"]?.number || 0,
    vat: props["부가세"]?.number || 0,
    total: props["총 금액"]?.number || 0,
    status: props["상태"]?.select?.name || "대기",
    createdAt: page.created_time,
  };
}

// ── 견적 상태 업데이트 ──
export async function updateQuoteStatus(pageId: string, status: string): Promise<void> {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      "상태": { select: { name: status } },
    },
  });
}
