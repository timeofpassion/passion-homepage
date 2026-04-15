import { NextResponse } from "next/server";
import { getDoctorSettings } from "@/lib/notion-review";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hospitalName = searchParams.get("hospital");

  if (!hospitalName) {
    return NextResponse.json({ error: "hospital 파라미터 필요" }, { status: 400 });
  }

  try {
    const settings = await getDoctorSettings(hospitalName);
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Failed to fetch doctor settings:", error);
    return NextResponse.json({ error: "원장 설정 조회 실패" }, { status: 500 });
  }
}
