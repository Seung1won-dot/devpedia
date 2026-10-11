# SK하이닉스 AI 해커톤 2026 사이트 디자인 분석 → Devpedia 적용 계획

- 분석 대상: https://skhynix-hackathon.com/ai-2026 (2026-10-11, 데스크톱 1204px 뷰포트)
- 측정 방법: 브라우저에서 `getComputedStyle` 로 글꼴·크기·색·반경·간격을 직접 뽑고 스크린샷으로 확인
- 목적: "깔끔하다"고 느껴지는 이유를 수치로 분해하고, Devpedia 토큰(`src/styles/tokens.css`)에 맞춰 옮기는 작업 순서를 정한다

---

## 1. 측정 결과 (저쪽 사이트)

### 1-1. 기술 스택

| 항목 | 값 |
| :-- | :-- |
| 프레임워크 | Next.js + Tailwind (유틸 클래스 `flex gap-5 rounded-lg border-white/20 ...`), 일부 Mantine 토큰 잔존 |
| 본문 글꼴 | **Pretendard Variable** (서브셋 woff2 자체 호스팅) |
| 디스플레이 글꼴 | **HiKR** ExtraBold(SK하이닉스 전용 서체, 비공개) → 히어로 H1·섹션 H2·타임라인 제목 |
| 보조 글꼴 | SUIT Variable, Oswald Bold(날짜 숫자 `26.09.21`), Gotham |
| 배경 | 히어로에 `<video>` 1개(불꽃 입자), 섹션은 단색 |

### 1-2. 색 (실측 rgb → hex)

| 역할 | 값 | 비고 |
| :-- | :-- | :-- |
| 페이지 배경 | `#070709` | 거의 순흑. 섹션마다 `#080809` / `#080808` / `#0f0f10` 으로 1~2단계만 밝아짐 |
| 카드 배경 (일정) | `#181819` | 배경 대비 +16 정도의 아주 낮은 단차 |
| 카드 배경 (가치·혜택) | 투명 + `border 1px rgba(255,255,255,.2)` + `backdrop-filter: blur(20px)` + 아주 약한 `bg-gradient-to-br from-white/5` | 유리판 느낌 |
| 경계선 | `rgba(255,255,255,.1)` (기본), `.2` (강조 카드) | 그림자 없음. 전부 hairline |
| 본문 텍스트 | `#ffffff` (제목), `rgba(255,255,255,.7)` (본문·설명) | 흰색을 **불투명도**로만 단계화 |
| 보조 텍스트 | `#d4d4d4`, `#b5b8cc`, `#8a8a85` | 탭·칩·메타 |
| 포인트(오렌지) | **`#ff8e20`** (실제 렌더), 디자인 토큰은 `#F47725` / `#FF6000` | 섹션 라벨, 활성 탭 밑줄, 아이콘, 강조 단어 |
| 포인트 배경 | `rgba(255,142,32,.1)` | 라벨 뱃지, 활성 카드 배경 |
| 강조 그라데이션 | `linear-gradient(#fff 12%, #ffa248 218%)` → `background-clip: text` | H1·H2 에서 흰색 아래쪽이 살짝 주황으로 물듦 |
| 보조 포인트 | `#ff2750` (빨강, 날짜 시작일) | 한 군데만 |

핵심: **색은 사실상 3개**다. 검정 계열 배경, 흰색(불투명도 100/70/50), 오렌지 하나. 카테고리별 색이나 파랑·초록 같은 두 번째 색이 없다.

### 1-3. 타이포 스케일 (실측)

| 용도 | 크기 / 행간 | 굵기 | 자간 | 글꼴 |
| :-- | :-- | :-- | :-- | :-- |
| 히어로 H1 | 74px / 1.05 | 800 | **-0.03em** (-2.22px) | HiKR |
| 섹션 H2 | 36~40px / 1.3 | 700~800 | -0.02em~-0.036em | Pretendard 700 또는 HiKR 800 |
| 카드 H3 | 24px / 1.35 | 600 | -0.02em | Pretendard |
| 섹션 라벨(eyebrow) | 16px / 1.5 | 600 | -0.015em | 오렌지 |
| 카드 라벨(영문) | 15px | 800 | -0.01em | 오렌지, 대문자 |
| 본문 | 15~16px / 1.5 | 400~500 | 0 | `rgba(255,255,255,.7)` |
| 탭·버튼 | 13px | 400 / 활성 700 | 0 | |
| 메타 | 11~12px | 400~700 | +0.04em | |

규칙으로 정리하면:
- **제목은 크고 타이트하게**(자간 음수, 행간 1.05~1.3), **본문은 작고 성글게**(15~16px, 행간 1.5). 이 대비 폭이 "깔끔함"의 절반이다.
- 모든 섹션이 `라벨(오렌지, 16px) → 제목(36px, 흰색, 마지막 단어만 오렌지) → 설명(16px, 70% 흰색)` 3단 구조를 똑같이 반복한다.
- 제목 안에서 **딱 한 단어**만 오렌지로 칠한다(`결과로 증명하세요`, `핵심 가치`, `여정`).

### 1-4. 레이아웃·간격

| 항목 | 값 |
| :-- | :-- |
| 콘텐츠 최대 폭 | **512px** (섹션 본문), 600px(인트로), 1060px(히어로 상단), 1440px(전체 한도) |
| 섹션 세로 패딩 | **80px** 위아래 (`py-20`) |
| 좌우 거터 | 16px (모바일 기준 레이아웃을 데스크톱에도 그대로 씀) |
| 카드 패딩 | 28px (가치), 32px (혜택), 37px×25px (일정) |
| 카드 간격 | 20~24px |
| 카드 반경 | **8px** (기본), 12px (강조), 4px (칩) |
| 버튼 반경 | 8px (외곽선 버튼), 4px (필터 칩) |
| 간격 토큰 | 4px 배수: 4·8·12·16·20·24·32·40·48·64·80·100 |

핵심: 데스크톱에서도 **한 컬럼 512px** 로 좁게 세로로 흐른다. 넓은 화면을 꽉 채우지 않는 것이 밀도를 낮추고 "여백이 많다"는 인상을 만든다. 다만 이건 랜딩 페이지라 가능한 선택이고, 사전처럼 목록이 많은 앱에 그대로 쓰면 스크롤이 너무 길어진다.

### 1-5. 컴포넌트 패턴

- **스티키 탭 내비**: 높이 48px, 5개 탭 균등 분할, 활성 탭만 `border-bottom: 2px solid #ff8e20` + 글자색 오렌지 + 700. 배경은 검정 불투명, 그림자 없음.
- **외곽선 버튼**(헤더 우상단): 투명 배경, `1px solid #d4d4d4`, 반경 8px, 13px/600, 패딩 0 14px.
- **유리 카드**: 투명 배경 + 20% 흰 경계 + blur + 좌상→우하 5% 흰 그라데이션. 내부는 `아이콘(오렌지, 48px) → 영문 라벨(오렌지 15px 800) → 제목(24px 600) → 본문(16px, 70%)` 세로 스택, gap 20px.
- **타임라인 카드**: `#181819` 면 + 10% 경계, 활성 카드는 오렌지 경계 + `rgba(255,142,32,.1)` 배경으로 바뀜(`transition 0.5s`). 카드 사이는 ▼ 오렌지 삼각형 하나.
- **FAQ 아코디언**: 카드 없음. 항목마다 아래 `1px solid rgba(255,255,255,.1)` 구분선, 질문은 16px/400, 패딩 20px 8px, 번호 `Q.01` 접두. 펼침은 `grid-template-rows 0.3s` 로 애니메이션.
- **모션**: 섹션이 뷰포트에 들어올 때 `opacity 0.45~0.7s` 페이드인, 히어로 뒤 `glow_spin` 회전 발광, 색 전환은 전부 `cubic-bezier(0,0,.2,1)`. 호버 시 크기 변화나 그림자는 없다.

---

## 2. Devpedia 현재 상태와 비교

이미 같은 것:
- Pretendard Variable 자체 호스팅, 다크 기본, 앰버 포인트 하나, hairline 경계·그림자 없음, 4px 간격 그리드. 뼈대는 거의 같다.

다른 것(= 저쪽이 더 "깔끔해" 보이는 이유):

| 항목 | 해커톤 | Devpedia 지금 | 체감 차이 |
| :-- | :-- | :-- | :-- |
| 배경 명도 | `#070709` 거의 순흑 | `#0e0f11` 약간 회색 | 저쪽이 대비가 세고 또렷함 |
| 면 단차 | 배경↔카드 +16 | `#0e0f11`→`#15161a` +7 | 비슷하지만 Devpedia 카드가 더 묻힘 |
| 포인트 색 | `#ff8e20` 채도 높은 오렌지 | `#f2b84b` 노란빛 앰버 | 앰버는 부드럽고 오렌지는 선명함. 취향 문제 |
| 본문 텍스트 | 흰색 70% 불투명 | `#b0b2b9` 고정 회색 | 저쪽이 배경 위에서 더 일관되게 섞임 |
| 제목 자간 | -0.03em, 행간 1.05 | -0.03em, 행간 1.08 | 같음 |
| 섹션 구조 | 라벨→제목→설명 3단 고정 | 홈 히어로만 eyebrow 있음, 나머지 섹션은 제목+카운트 | 반복 리듬이 약함 |
| 제목 강조 | 한 단어만 오렌지 | 없음 | 포인트가 들어갈 자리가 없음 |
| 카드 | 경계 20% 또는 면 `#181819`, 반경 8px, 패딩 28~32px | 경계 7%, 반경 14px, 패딩 작음 | Devpedia 카드가 더 둥글고 경계가 흐림 |
| 콘텐츠 폭 | 512px 1열 | 1200px 2열 그리드 | 사전은 2열이 맞음. 폭은 유지 |
| 탭 | 2px 밑줄 + 오렌지 글자 | 칩(pill) | 필터바를 탭 스타일로 바꿀 여지 |
| 모션 | 섹션 페이드인, 0.5s 색 전환 | 150~200ms 호버만 | 저쪽이 더 "부드러운" 인상 |

---

## 3. 적용 계획 (작업 순서대로)

원칙: Devpedia 는 **읽는 도구**이므로 랜딩의 폭·여백은 가져오지 않고, **색·타이포 위계·카드·섹션 헤더·모션**만 가져온다. 라이트 테마와 WCAG 대비(docs/redesign/contrast.md)는 유지한다.

### Step 1. 토큰 교체 — `src/styles/tokens.css` (반나절)

```css
/* 다크 */
--bg: #09090b;            /* 0e0f11 → 거의 순흑 */
--surface-1: #121214;     /* 카드 */
--surface-2: #181819;     /* hover·입력창 — 해커톤 일정 카드와 같은 값 */
--surface-3: #1f1f22;
--line: rgb(255 255 255 / 0.10);         /* 0.07 → 0.10 */
--line-strong: rgb(255 255 255 / 0.20);  /* 0.13 → 0.20 */
--line-focus: rgb(255 255 255 / 0.30);

--text: #ffffff;
--text-2: rgb(255 255 255 / 0.70);  /* 고정 회색 → 불투명도 */
--text-3: rgb(255 255 255 / 0.50);

/* 포인트: 앰버 유지 vs 오렌지 전환 중 택1 */
--accent: #ff8e20;           /* 오렌지로 갈 경우 */
--accent-strong: #ffa248;
--accent-soft: rgb(255 142 32 / 0.10);
--accent-line: rgb(255 142 32 / 0.45);
--on-accent: #121212;

/* 반경: 더 각지게 */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;

/* 모션: 색 전환은 느리게, 호버는 빠르게 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--dur-color: 500ms;
```

- 라이트 테마는 같은 구조로 `--text-2: rgb(23 23 25 / 0.70)` 식으로 맞춘다.
- `--accent` 를 오렌지로 바꾸면 라이트 테마 대비가 깨진다(흰 배경 위 `#ff8e20` 은 2.3:1). 라이트는 `#c25a00` 정도로 내려야 하며, contrast.md 재측정이 필요하다. **앰버를 유지하면 이 작업이 없다.** 먼저 다크만 오렌지로 바꿔보고 결정할 것.

### Step 2. 섹션 헤더 컴포넌트 통일 (반나절)

홈의 `오늘의 용어`, `분야`, 카테고리 페이지 상단, 통계 페이지에 같은 3단 헤더를 쓴다.

```tsx
<SectionHead
  eyebrow="분야"                 // 16px / 600 / accent
  title={<>24개 분야를 <em>한 화면에</em></>}   // 36px / 700 / -0.02em, <em> 만 accent
  lead="CS 기초부터 의료 IT까지"  // 16px / text-2
  aside="760개 용어"             // 우측 메타 (선택)
/>
```

```css
.sechead__eyebrow { color: var(--accent); font-size: 16px; font-weight: 600; letter-spacing: -0.015em; }
.sechead__title   { margin-top: 16px; font-size: clamp(28px, 4vw, 36px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.3; }
.sechead__title em { font-style: normal; color: var(--accent); }
.sechead__lead    { margin-top: 12px; color: var(--text-2); font-size: 16px; line-height: 1.5; }
```

### Step 3. 히어로 (1시간)

- `.hero__title` 에 그라데이션 텍스트 적용. 흰색이 아래로 갈수록 살짝 오렌지:
  ```css
  background: linear-gradient(#fff 12%, var(--accent-strong) 218%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  ```
- `.hero__eyebrow` 를 13px → 16px/600 으로 키워 섹션 헤더와 같은 규칙으로.
- 배경의 radial-gradient 는 유지하되 중심을 오렌지 10% 로: `radial-gradient(ellipse 60% 80% at 50% 0%, var(--accent-soft), transparent 70%)`.
- 영상·입자 배경은 넣지 않는다(PWA 용량·Lighthouse 점수).

### Step 4. 카드 두 종류로 정리 (반나절)

- **면 카드**(기본, 용어 카드·분야 타일): `background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 28px;`
  - hover: `border-color: var(--accent-line); background: var(--accent-soft);` 를 `transition: var(--dur-color) var(--ease-out)` 으로. 크기·그림자 변화 없음.
- **유리 카드**(강조, 오늘의 용어·통계 숫자): `background: linear-gradient(135deg, rgb(255 255 255 / 0.05), transparent); border: 1px solid var(--line-strong); backdrop-filter: blur(20px);`
- 카드 내부 위계는 `라벨(오렌지 15px 800 대문자) → 제목(24px 600) → 본문(16px text-2)` 세로 스택, `gap: 20px`. 지금 `.cattile` 의 레벨 미터·예시 용어 줄은 그대로 두되 색만 `--text-3` 로.

### Step 5. 필터바를 탭으로 (1시간)

카테고리 페이지 `.filterbar` 의 난이도·정렬 칩을 밑줄 탭으로:

```css
.tabs { display: flex; border-bottom: 1px solid var(--line); }
.tab  { height: 48px; padding: 0 16px; font-size: 13px; color: var(--text-2);
        border-bottom: 2px solid transparent; margin-bottom: -1px;
        transition: color var(--dur-fast), border-color var(--dur-fast); }
.tab[aria-selected='true'] { color: var(--accent); font-weight: 700; border-bottom-color: var(--accent); }
```

태그 필터(개수가 많은 것)는 칩으로 남기되 반경을 `4px`, 경계 `--line` 으로.

### Step 6. 모션 (1시간)

- 섹션 진입 페이드인: `IntersectionObserver` 훅 하나 + `.reveal { opacity: 0; transform: translateY(8px); transition: opacity .45s var(--ease-out), transform .45s var(--ease-out); } .reveal.is-in { opacity: 1; transform: none; }`
- `prefers-reduced-motion: reduce` 에서는 전부 0ms (이미 토큰에 있음).
- 아코디언(용어 페이지 접힘 섹션이 있다면) `grid-template-rows 0fr → 1fr` 0.3s.

### Step 7. 검증

- `npm run check` (validate → typecheck → test → build)
- Lighthouse (`lighthouserc.json`) 접근성 점수 유지
- docs/redesign/contrast.md 에 새 조합 대비 추가: `#fff/0.70 on #09090b`, `#ff8e20 on #09090b`, `#121212 on #ff8e20`
- 스크린샷을 docs/redesign/screenshots 에 before/after 로

---

## 4. 가져오지 말아야 할 것

- **HiKR 서체**: SK하이닉스 전용이라 쓸 수 없다. 대신 Pretendard 800 + 자간 -0.03em 으로 충분히 비슷한 무게가 난다. 더 강한 디스플레이 서체가 필요하면 오픈 라이선스인 **SUIT Variable**(저쪽도 보조로 씀) 이나 **Paperlogy** 를 제목에만.
- **512px 1열 레이아웃**: 랜딩 전용. 사전은 1200px 2열 유지.
- **영상 배경·발광 회전 애니메이션**: PWA 용량과 성능 점수를 깎는다.
- **Tailwind 전환**: 지금 토큰 CSS 구조가 더 일관되다. 값만 바꾸면 된다.

## 5. 결정이 필요한 것 (본인 답변 대기)

1. 포인트 색: 앰버 `#f2b84b` 유지 vs 오렌지 `#ff8e20` 전환. 오렌지면 라이트 테마 대비 재측정이 따라온다.
2. 섹션 제목에 한 단어 오렌지 강조를 쓸지(카피를 다시 써야 함).
3. 섹션 페이드인 모션을 넣을지(사전은 빠른 탐색이 목적이라 안 넣는 쪽도 합리적).
