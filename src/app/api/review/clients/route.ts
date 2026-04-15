import { NextResponse } from "next/server";
import { getActiveClients } from "@/lib/notion-review";

export async function GET() {
  try {
    const clients = await getActiveClients();
    return NextResponse.json({ clients });
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return NextResponse.json({ error: "클라이언트 목록 조회 실패" }, { status: 500 });
  }
}
