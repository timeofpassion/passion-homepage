import { NextResponse } from "next/server";
import { getQuoteByQuoteId } from "@/lib/notion-quote";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quote = await getQuoteByQuoteId(id);

    if (!quote) {
      return NextResponse.json({ error: "견적을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ quote });
  } catch (err) {
    console.error("Quote fetch failed:", err);
    return NextResponse.json({ error: "견적 조회 실패" }, { status: 500 });
  }
}
