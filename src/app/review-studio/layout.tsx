import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Studio - 리뷰 원고 생성",
  robots: { index: false, follow: false },
};

export default function ReviewStudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
