import { NextResponse } from "next/server";

const INTRANET_URL = process.env.INTRANET_API_URL ?? "https://intranet.timeofpassion.com";

type ListItem = { id: string } & Record<string, unknown>;

// 목록 API엔 포트폴리오 이미지·옵션이 없다 → 상세를 서버에서 병렬로 붙여 카드를 한 번에 그린다.
// ponytail: 상품 수만큼 상세 호출(현재 15개, 1분 캐시). 수백 개가 되면 인트라넷 목록 API에 필드를 추가.
export async function GET() {
  try {
    const res = await fetch(`${INTRANET_URL}/api/public/quote/products`, { next: { revalidate: 60 } });
    // 인트라넷 연결 실패 시 빈 배열 반환 (장애 허용)
    if (!res.ok) return NextResponse.json({ products: [] });
    const { products = [] } = (await res.json()) as { products: ListItem[] };

    const enriched = await Promise.all(
      products.map(async (p) => {
        try {
          const d = await fetch(`${INTRANET_URL}/api/public/quote/products/${p.id}`, { next: { revalidate: 60 } });
          if (!d.ok) return p;
          const detail = await d.json();
          return { ...p, images: detail.detailImages ?? [], options: detail.options ?? [] };
        } catch {
          return p;
        }
      }),
    );
    return NextResponse.json({ products: enriched });
  } catch {
    return NextResponse.json({ products: [] });
  }
}
