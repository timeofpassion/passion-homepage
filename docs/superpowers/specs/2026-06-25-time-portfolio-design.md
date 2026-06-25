# /time 포트폴리오 — 설계 문서

> 2026-06-25 · passion-homepage (`hp/열정의시간 홈페이지`) · `/time` 사이트
> 대표 지시: "포트폴리오 창을 만들어서 그 안에 홈페이지를 귀속시키고 프리뷰로 보여줘.
> 계속 쌓을 거고, 누르면 그 홈페이지로 가고, 만료된 건 이미지로 대체."

## 1. 목적
열정의시간이 실제 제작한 홈페이지들을 한 곳(포트폴리오 창)에 모아 프리뷰로 보여주고,
잠재 클라이언트가 작품 → 라이브 사이트로 바로 이동하게 한다.
향후 영상·SNS 포트폴리오로 카테고리만 추가해 확장한다.

## 2. 정보구조 (2단)

### 1단 — `/time` 메인 진입 섹션 (`PortfolioSection`)
- 위치: `ClientsSection`(로고 마키) 바로 아래.
- 홈페이지 프리뷰 썸네일 6~8개를 보여주고, "포트폴리오 전체 보기 →" 버튼 → `/time/portfolio`.
- 시선 끄는 진입점 역할. 전체 목록은 서브 페이지에서.

### 2단 — `/time/portfolio` 포트폴리오 창 (전용 페이지)
- 상단 카테고리 탭: `[홈페이지]`(활성) · `[영상]`·`[SNS/카드뉴스]`(준비중·비활성 회색).
- 홈페이지 탭: 프리뷰 카드 그리드(반응형 1/2/3열).
- 카드 = 캡처 썸네일 + 제목 + 한 줄 설명 + 태그.
- 클릭 동작:
  - `liveUrl` 있고 `expired=false` → 새 탭으로 라이브 사이트.
  - `expired=true` 또는 `liveUrl` 없음 → 이미지 라이트박스(확대 보기), 이동 없음. "운영 종료" 배지.

## 3. 데이터 모델 — `src/data/portfolio.ts` (단일 소스, 계속 추가)
```ts
export type PortfolioCategory = "homepage" | "video" | "sns";

export type PortfolioItem = {
  id: string;             // kebab, 고유
  category: PortfolioCategory;
  title: string;          // "멜로우피부과 신사점"
  summary: string;        // 한 줄 설명
  thumbnail: string;      // /portfolio/<id>.webp  (캡처 프리뷰)
  liveUrl?: string;       // 있으면 클릭 시 새 탭 이동
  expired?: boolean;      // true면 라이브 대신 이미지 라이트박스
  tags?: string[];        // "반응형","의료","일본어" 등
  featured?: boolean;     // 메인 섹션에 노출할지
};

export const portfolioItems: PortfolioItem[] = [ /* 계속 쌓음 */ ];
```
- 메인 섹션: `featured===true` 또는 상위 N개.
- 카테고리 탭 카운트: `category`별 집계. 준비중 카테고리는 0건이면 비활성.

## 4. 프리뷰(썸네일) 확보 방침
- 정적 캡처 이미지로 통일(iframe 라이브 임베드는 X-Frame-Options 차단·성능 문제로 미사용).
- 라이브 사이트 → Playwright 풀상단 캡처 후 카드 비율(예: 1280×800)로 리사이즈, `.webp` 저장.
- repo 내부 산출물(html/Next) → 라이브 URL 캡처, 없으면 로컬 서빙 후 캡처.
- 음식점 등 PDF만 있는 건 → PDF 대표 페이지를 이미지로 변환, `expired`/라이브없음 처리.
- 라이브 URL 미확보·운영 종료 작품 → 우아한 폴백(브랜드 그라데이션 + 사이트명) 또는 캡처 이미지, `expired=true`.
- 저장 위치: `public/portfolio/<id>.webp`.

## 5. 대상 작품 (1차 — 계속 추가)
멜로우(신사/천호/JP), 올라라의원, SM성형외과 JP, 임페투스, 오스텔로마레,
beautyculize, 의료관광 통합, 열정의공간, 음식점(PDF·만료형) 등 ~10건.
라이브 URL은 각 repo/메모리에서 확인해 채운다(없으면 expired 이미지).

## 6. 컴포넌트
- `src/components/PortfolioSection.tsx` — 메인 진입 섹션(featured 프리뷰 + CTA).
- `src/app/time/portfolio/page.tsx` — 포트폴리오 창(탭 + 그리드).
- `src/app/time/portfolio/_components/PortfolioGrid.tsx` — 카드 그리드.
- `src/app/time/portfolio/_components/PortfolioCard.tsx` — 카드(클릭/라이트박스 분기).
- `src/app/time/portfolio/_components/CategoryTabs.tsx` — 카테고리 탭.
- `src/app/time/portfolio/_components/Lightbox.tsx` — 만료 작품 이미지 확대.

## 7. 디자인 가이드 (브랜드 일관)
- 폰트: Pretendard(기존). 브랜드 레드 `#E63329` 포인트.
- 모바일 퍼스트, 과한 애니메이션 지양. hover 시 썸네일 살짝 확대 + 그림자.
- 기존 `/time` 섹션들의 톤(섹션 헤더 라벨 + 큰 제목)을 따른다.

## 8. 배포
- 별도 브랜치(`feat/time-portfolio`)에서 작업 → 로컬 빌드(`npm run build`) 통과 + 브라우저 스크린샷 검증 → master 기준 정합 후 배포(Vercel 자동).
- NAS 동시세션 충돌 회피: 필요 시 `origin/master` fresh clone(C:\temp) 빌드.

## 9. 비범위 (YAGNI)
- 영상/SNS 실제 콘텐츠 — 카테고리 탭 자리만 만들고 데이터는 나중.
- 작품 상세 전용 페이지 — 1차는 라이브 이동/이미지 라이트박스로 충분.
- CMS/관리자 입력 — 데이터는 `portfolio.ts` 코드로 관리(대표 요청 "계속 쌓을게"에 부합).
