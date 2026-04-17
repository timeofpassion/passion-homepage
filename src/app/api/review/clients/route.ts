import { NextResponse } from "next/server";
import { getActiveClients } from "@/lib/notion-review";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const clients = await getActiveClients();
    return NextResponse.json({ clients });
  } catch (error) {
    const err = error as { message?: string; status?: number; code?: string };
    const detail =
      err?.code === "object_not_found"
        ? "노션 인테그레이션이 클라이언트 DB에 접근 권한이 없습니다. 노션 → [TOP] 클라이언트 관리 DB → ··· → Connections에 인테그레이션 추가 필요"
        : err?.code === "unauthorized"
        ? "NOTION_API_KEY가 유효하지 않습니다. Vercel 환경변수를 확인해주세요"
        : err?.message || "알 수 없는 오류";

    console.error("[clients API] 실패:", err);
    return NextResponse.json(
      { error: "클라이언트 목록 조회 실패", detail, code: err?.code },
      { status: 500 }
    );
  }
}
