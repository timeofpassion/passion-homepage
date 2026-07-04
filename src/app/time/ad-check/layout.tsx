import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "의료광고 자가검수 | 열정의시간",
  description:
    "블로그·이벤트·SNS 문구를 붙여넣으면 의료법 저촉 문장을 신호등으로 판정하고 근거 조항과 수정문안을 제시하는 무료 자가검수 도구.",
  // 조용한 테스트 단계 — 반응 확인 후 색인·메뉴 노출로 전환
  robots: { index: false, follow: false },
};

export default function AdCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
