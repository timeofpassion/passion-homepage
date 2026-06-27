import Link from "next/link";
import type { ContentPost } from "@/data/blog";

// 카테고리별 자동 썸네일(이미지 없이 코드로 — 브랜드 비주얼). 커버 이미지가 있으면 그걸 우선.
const THUMB: Record<string, { grad: string; han: string }> = {
  중국마케팅: { grad: "linear-gradient(135deg,#7a0d0d,#cc0000 55%,#ff5252)", han: "中" },
  일본마케팅: { grad: "linear-gradient(135deg,#1a1f4b,#3949ab 55%,#7986cb)", han: "日" },
  대만마케팅: { grad: "linear-gradient(135deg,#0d3b34,#0f8b7a 55%,#4dd0c4)", han: "台" },
  해외마케팅: { grad: "linear-gradient(135deg,#5a4500,#caa200 55%,#ffd740)", han: "外" },
  국내마케팅: { grad: "linear-gradient(135deg,#0d3b1f,#1b7a44 55%,#4dd07a)", han: "韓" },
};
const DEFAULT_THUMB = { grad: "linear-gradient(135deg,#3a0000,#cc0000)", han: "★" };

const chipStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 2,
  background: "rgba(0,0,0,.38)",
  backdropFilter: "blur(4px)",
  border: "1px solid rgba(255,255,255,.25)",
  color: "#fff",
  fontSize: ".72rem",
  fontWeight: 700,
  padding: ".32rem .7rem",
  borderRadius: 99,
  letterSpacing: ".04em",
};

// 카테고리별 실사 커버 풀 — 인트라넷에서 커버 미지정 글에 slug 해시로 자동 분배(무배포 자동화).
// 같은 카테고리 글이 여러 편이어도 카드 썸네일이 겹치지 않게 풀에서 결정적으로 골라준다.
const CATEGORY_COVER_POOL: Record<string, string[]> = {
  중국마케팅: [
    "/time/blog/hospital-china-marketing.webp",
    "/time/blog/china-xiaohongshu-guide.webp",
    "/time/blog/xiaohongshu-marketing-playbook.webp",
  ],
  일본마케팅: [
    "/time/blog/hospital-japan-marketing.webp",
    "/time/blog/japan-line-marketing.webp",
  ],
  대만마케팅: [
    "/time/blog/hospital-taiwan-marketing.webp",
    "/time/blog/taiwan-multichannel.webp",
  ],
  해외마케팅: [
    "/time/blog/foreign-patient-attraction-guide.webp",
    "/time/blog/overseas-medical-2.webp",
    "/time/blog/overseas-medical-3.webp",
    "/time/blog/overseas-medical-4.webp",
  ],
};

// slug 문자열을 풀 인덱스로 — 결정적(같은 글은 항상 같은 썸네일)·균등 분배
function pickFromPool(pool: string[], slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

export function BlogThumb({
  category,
  coverImageUrl,
  slug,
}: {
  category: string;
  coverImageUrl?: string;
  slug?: string;
}) {
  const pool = CATEGORY_COVER_POOL[category];
  const fallback = pool ? pickFromPool(pool, slug || category) : undefined;
  const cover = coverImageUrl || fallback;
  if (cover) {
    return (
      <div
        style={{
          position: "relative",
          height: 178,
          backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.5),rgba(0,0,0,.08)),url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          padding: "1rem",
        }}
      >
        <span style={chipStyle}>{category}</span>
      </div>
    );
  }
  const t = THUMB[category] ?? DEFAULT_THUMB;
  return (
    <div
      style={{
        position: "relative",
        height: 178,
        overflow: "hidden",
        background: t.grad,
        display: "flex",
        alignItems: "flex-end",
        padding: "1rem",
      }}
    >
      <span
        style={{
          position: "absolute",
          right: -8,
          top: -26,
          fontSize: "11rem",
          fontWeight: 900,
          lineHeight: 1,
          opacity: 0.16,
          color: "#fff",
          userSelect: "none",
        }}
      >
        {t.han}
      </span>
      <span
        style={{
          position: "absolute",
          left: "1rem",
          top: ".9rem",
          zIndex: 2,
          fontWeight: 900,
          fontSize: ".74rem",
          color: "#fff",
          opacity: 0.85,
        }}
      >
        열정의시간
      </span>
      <span style={chipStyle}>{category}</span>
    </div>
  );
}

function Card({ post }: { post: ContentPost }) {
  return (
    <Link
      href={`/time/blog/${post.slug}`}
      style={{
        width: "100%",
        height: "100%",
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 16,
        overflow: "hidden",
        textDecoration: "none",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BlogThumb category={post.category} coverImageUrl={post.coverImageUrl} slug={post.slug} />
      <div style={{ padding: "1.15rem 1.2rem 1.4rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            color: "#FFD700",
            fontSize: ".72rem",
            fontWeight: 800,
            letterSpacing: ".08em",
            marginBottom: ".5rem",
          }}
        >
          {post.category}
        </div>
        <h3
          style={{
            fontSize: "1.06rem",
            fontWeight: 800,
            lineHeight: 1.45,
            marginBottom: ".6rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.42)",
            fontSize: ".86rem",
            lineHeight: 1.6,
            fontWeight: 300,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>
        <div style={{ marginTop: "1.1rem", color: "rgba(255,255,255,0.42)", fontSize: ".76rem" }}>
          {post.date}
        </div>
      </div>
    </Link>
  );
}

// 가로 캐러셀 — /time 메인과 /time/blog 상단에서 재사용
export function TimeBlogCarousel({ posts }: { posts: ContentPost[] }) {
  if (!posts.length) return null;
  return (
    <div
      style={{
        display: "flex",
        gap: "1.25rem",
        overflowX: "auto",
        padding: ".4rem .2rem 1.6rem",
        scrollSnapType: "x mandatory",
      }}
    >
      {posts.map((p) => (
        <div
          key={p.slug}
          style={{ flex: "0 0 330px", maxWidth: 330, scrollSnapAlign: "start" }}
        >
          <Card post={p} />
        </div>
      ))}
    </div>
  );
}

// 반응형 그리드 — /time/blog 전체 목록
export function TimeBlogGrid({ posts }: { posts: ContentPost[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.25rem",
      }}
    >
      {posts.map((p) => (
        <Card key={p.slug} post={p} />
      ))}
    </div>
  );
}
