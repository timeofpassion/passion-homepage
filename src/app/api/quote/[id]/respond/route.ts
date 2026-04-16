import { NextResponse } from "next/server";
import { getQuoteByQuoteId, updateQuoteStatus } from "@/lib/notion-quote";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { action } = await request.json();

    if (!["승인", "수정 요청"].includes(action)) {
      return NextResponse.json({ error: "잘못된 액션" }, { status: 400 });
    }

    const quote = await getQuoteByQuoteId(id);
    if (!quote) {
      return NextResponse.json({ error: "견적을 찾을 수 없습니다." }, { status: 404 });
    }

    await updateQuoteStatus(quote.id, action);

    return NextResponse.json({ success: true, status: action });
  } catch (err) {
    console.error("Quote respond failed:", err);
    return NextResponse.json({ error: "처리 실패" }, { status: 500 });
  }
}
