# PASSION GROUP 포털 — 설계 문서

- 작성일: 2026-06-03
- 대상 저장소: `passion-homepage` (github.com/timeofpassion/passion-homepage)
- 작업 브랜치: `feat/passion-group-portal`

## 1. 배경 / 목적

`www.timeofpassion.com` 은 현재 **열정의시간(병의원 전문마케팅)** 단일 홈페이지다.
열정의시간을 "열정 그룹"의 한 회사로 재배치하고, 루트 도메인을 **3개 회사로 나눠주는 그룹 포털**로 바꾼다.

- 그룹 마스터 브랜드명: **PASSION GROUP** (영문 표기 — 한글 "열정그룹"의 촌스러움 제거)
- 컨셉: 시간(時間)·사람(人間)·공간(空間) = 모두 '사이 間'으로 끝나는 삼간(三間). "열정으로 시간·사람·공간을 잇다".

### 3개 회사
| 경로 | 회사 | 한 줄 정체성 | 이번 범위 |
|---|---|---|---|
| `/time` | 열정의시간 | 국내/해외 병의원 전문마케팅 | 기존 홈페이지 이전 |
| `/people` | 열정의사람들 | 글로벌마케팅·인플루언서 국내해외 전문마케팅 | 준비중 페이지 |
| `/space` | 열정의공간 | 새로운 공간비즈니스 준비 | 준비중 페이지 |

## 2. 작업 범위 (이번 사이클)

- ✅ 그룹 포털 (루트 `/`)
- ✅ 기존 열정의시간 홈 → `/time` 이전
- ✅ `/people`, `/space` 브랜딩된 준비중(Coming Soon) 페이지
- ✅ 열정의시간 하위 페이지(`/quote`, `/services/:id`, `/review-studio`)도 `/time/` 하위로 이동 (대표 지시, 2026-06-03 범위 확장). 기존 주소는 next.config 301 redirect로 보존.
- ❌ 열정의사람들·열정의공간 풀 콘텐츠 (콘텐츠 준비되면 다음 사이클)
- ❌ `/api/*` 재배치 (내부 엔드포인트, 사용자 비노출 → 루트 `/api` 유지, fetch 경로 보존)

## 3. 라우팅 구조

```
src/app/
├─ layout.tsx        [수정] html 껍데기·폰트·도메인 verification 유지 / 메타·JSON-LD는 그룹 레벨로 교체
├─ page.tsx          [신규] PASSION GROUP 포털 (4분할 패널)
├─ time/
│   ├─ layout.tsx    [신규] 열정의시간 전용 metadata + JSON-LD (기존 root layout에서 이전, url→/time)
│   └─ page.tsx      [이전] 기존 root page.tsx 내용 그대로
├─ people/page.tsx   [신규] 열정의사람들 준비중
├─ space/page.tsx    [신규] 열정의공간 준비중
├─ services/ quote/ review-studio/ api/  [유지]
├─ sitemap.ts        [수정] /time /people /space 추가
└─ robots.ts         [유지]
```

## 4. 핵심 구현 포인트

### 4-1. layout.tsx (루트, 그룹 레벨)
- 유지: `html lang="ko"`, JetBrains Mono 변수, Pretendard CDN link, body, **google/naver verification**(도메인 단위라 루트 고정), metadataBase.
- 교체: `title.default` → `"PASSION GROUP | 열정의시간 · 열정의사람들 · 열정의공간"`, `title.template` → `"%s | PASSION GROUP"`, description→그룹 소개, canonical→루트.
- 교체: JSON-LD → PASSION GROUP `Organization` + `subOrganization`(열정의시간/사람들/공간) + `WebSite`.

### 4-2. time/layout.tsx (신규)
- 기존 root layout의 **열정의시간 metadata 블록 전체**(title/keywords/openGraph/twitter/robots/canonical)를 이쪽으로 이전. `title.template` `"%s | 열정의시간"` 복원, openGraph.url·canonical → `https://www.timeofpassion.com/time`.
- 기존 열정의시간 JSON-LD(Organization/ProfessionalService/WebSite)를 이 레이아웃에서 `<script type="application/ld+json">` 로 렌더. url·@id를 `/time` 기준으로 갱신.

### 4-3. time/page.tsx (이전)
- 기존 root page.tsx의 `Home` 컴포넌트 내용 그대로 이동(SEO 숨김 텍스트 포함).

### 4-4. 내부 링크 /time 보정
- `Header.tsx`: NAV_ITEMS `/#services /#service-teams /#testimonials /#blog` → `/time#...`. 브랜드 Link `/` → `/time`. (`/quote` 유지)
- `Footer.tsx`: `/#services` ×3 → `/time#services`. 그룹 포털로 돌아가는 "PASSION GROUP" 링크(`/`) 1개 추가.
- `services/[id]/page.tsx`: `/#architecture` → `/time#architecture`.
- 상대 앵커(`#services` 등 leading slash 없는 것)는 /time 페이지 내에서 그대로 동작 → 수정 불필요.

### 4-5. 포털 화면 (page.tsx)
- 참고: 세로 분할 패널(레퍼런스 이미지). 첫 칸 그룹 아이덴티티 + 회사 3칸.
- 다크 테마(기존 사이트 팔레트 `#0a0000` 배경, `#cc0000` 레드 accent). 컬러 코딩: 시간=레드(플래그십), 사람=딥블루, 공간=그린/뉴트럴.
- 컨테이너 `position: fixed; inset: 0; overflow-y: auto` — globals.css `body { padding-bottom:100px }`(고정 CTA용)의 영향을 받지 않게 풀스크린 처리.
- 데스크톱: flex 가로 4칼럼, 호버 시 해당 패널 flex-grow 확장. 모바일: 세로 스택, 각 패널 적정 높이로 스크롤.
- `/time`·`/people`·`/space` 모두 클릭 가능. people·space 패널엔 "준비중" 뱃지.
- Pretendard 폰트. 그룹 SEO 보존 위해 화면 하단 sr-only 텍스트에 "열정의시간/사람들/공간" 키워드 포함.

### 4-6. /people, /space 준비중 페이지
- 공통 톤: 다크, 회사명(한+영) + 한 줄 소개 + "곧 만나요(Coming Soon)" + 문의처(ceo@timeofpassion.com / 카카오) + "← PASSION GROUP" 포털 복귀 링크.
- 각 페이지 metadata title 지정(`열정의사람들`, `열정의공간`).

### 4-7. sitemap.ts
- 루트(포털) 1.0, `/time` 1.0, `/quote` 0.8, `/people` 0.5, `/space` 0.5.

## 5. 검증 기준 (CLAUDE.md 9-4)
1. `npm run build` 오류 0.
2. dev 서버 정상 응답.
3. 브라우저로 `/`, `/time`, `/people`, `/space` 4페이지 렌더 확인.
4. 포털 패널 클릭 → 각 페이지 이동 확인, /time 내부 앵커·견적 링크 동작 확인.

## 6. 리스크 / 메모
- SEO: 기존 루트가 "병원마케팅" 키워드 자산. 메타·JSON-LD를 통째로 `/time`으로 이전해 자산 유지. `/`→`/time` 리다이렉트는 하지 않음(포털 유지). 포털에 sr-only 텍스트로 노출 보강.
- NAS 공유 체크아웃: 작업 중 다른 세션 push 가능 → 머지 전 재확인.
