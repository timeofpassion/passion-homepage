import { NextResponse } from "next/server";
import { getActiveProducts } from "@/lib/notion-quote";

export async function GET() {
  try {
    const products = await getActiveProducts();
    return NextResponse.json({ products });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json({ error: "상품 조회 실패" }, { status: 500 });
  }
}
