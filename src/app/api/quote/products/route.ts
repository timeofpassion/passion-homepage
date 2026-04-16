import { NextResponse } from "next/server";
import { getActiveProducts } from "@/lib/notion-quote";

export async function GET() {
  try {
    const products = await getActiveProducts();
    return NextResponse.json({ products });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "상품 조회 실패", detail: message }, { status: 500 });
  }
}
