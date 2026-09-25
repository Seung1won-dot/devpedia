# 📖 Devpedia — 카테고리별 IT 용어 사전

> SSH 가 뭐고 Proxmox 가 뭐고 RAG 가 뭔지, **한 화면에서 카테고리별로 훑어보고 검색**하는 나만의 용어 사전.
> 용어 하나 = "한 줄 정의 + 비유 + 예시 + 관련 용어" 카드 하나 = Markdown 파일 하나. 서버 없음, 전부 Git.

컴공 3학년까지 배운 것 + 연구실에서 마주치는 것(서버·인프라·LLM·의료 IT)을 13개 카테고리에 담는다.
설계 문서: [`docs/superpowers/specs/2026-09-25-devpedia-design.md`](docs/superpowers/specs/2026-09-25-devpedia-design.md)

## 지금 상태 (v1 seed)

| 지표 | 값 |
| :-- | :-- |
| 등록 용어 (K1) | **238** — 13개 카테고리 모두 16~23장 (K2 13/13) |
| 관계 밀도 (K7) | 용어당 평균 related **4.97**, 고아 용어 0 |
| 상태 | published 3 · review 235 · draft 0 |
| 성능 (K5) | Lighthouse 데스크톱 **100** · LCP 0.7s · CLS 0 / 모바일(저속 4G 에뮬, gzip 없는 로컬 서버) 89 · LCP 3.2s · CLS 0 / 접근성 100 |

시드 카드 235장은 스펙 9장 워크플로대로 LLM 초안이며 **전부 `status: review`** 다. 한 장씩 읽고 고쳐서 `published` 로 바꾸는 것이 이 프로젝트의 학습 과정이다. 카드 안의 `[확인 필요]` 는 초안 작성자가 확신하지 못한 사실 표시다.

## 기능

- **카테고리 탭 13개** — 용어가 어느 층에 사는지 먼저 보인다. 기초→심화 정렬, 레벨·태그 필터
- **즉시 검색** — 한글·영문·약어·**초성(ㄹㅂㅅ → 리버스 프록시)**, 오타 허용, 결과 하이라이트. 300장 기준 1ms 안팎
- **카드 상세** — 한 줄 정의(60자)·비유·예시(실행되는 명령/코드)·헷갈리기 쉬운 것·관련 용어 칩·역링크
- **딥링크** — `#ssh` 처럼 카드 하나를 바로 여는 공유 링크
- **별표** — 복습할 용어 표시(이 기기의 localStorage)
- **다크/라이트** — 시스템 설정 따름 + 토글
- **PWA** — 홈 화면 설치, 오프라인에서도 사전 전체 열람, 새 버전 안내
- **통계** — 카테고리별 카드 수, 난이도·상태 분포, 최근 갱신, K 지표
- **빌드 시 검증** — 필드·60자·관계·중복·고아·태그를 검사해 잘못된 카드는 배포되지 않는다
- 키보드: `/` 검색, `Esc` 검색 지우기/상세 닫기, 목록에서 `↑` `↓` `Enter`

## 빠른 시작

```bash
npm install
npm run dev        # terms/ → public/terms.json (lenient) 후 http://localhost:5173
```

| 명령 | 하는 일 |
| :-- | :-- |
| `npm run validate` | 카드 규칙 검사 (`-- --lenient` 로 없는 related id 를 경고로 낮춤) |
| `npm run build:terms` | 검증 + `public/terms.json` 생성 |
| `npm run build` | 검증 + JSON + Vite 정적 빌드 → `dist/` |
| `npm run preview` | `dist/` 미리보기 (PWA·오프라인 확인은 여기서) |
| `npm test` / `npm run typecheck` | vitest / tsc |
| `npm run check` | validate → typecheck → test → build (CI 와 동일) |
| `npm run new -- <category> <id> "<표시 이름>"` | 카드 파일 스캐폴드 |
| `npm run icons` | `public/icon.svg` → PWA PNG 아이콘 |

## 용어 추가하기

용어 하나 = `terms/<category>/<id>.md` 하나. 세 가지 방법:

1. **스캐폴드** — `npm run new -- infra ssh "SSH"` → 생긴 파일의 4 섹션을 채운다.
2. **복사** — `terms/infra/reverse-proxy.md` 를 복사해 고친다 (스펙 부록 B 예시).
3. **LLM 초안** — [`docs/llm-draft-prompt.md`](docs/llm-draft-prompt.md) 의 프롬프트로 초안을 받아 **반드시 읽고 고친 뒤** `status: review` 로. 초안 그대로 발행하지 않는 것이 규칙.

모르는 용어를 만난 순간에는 [`terms/_inbox.md`](terms/_inbox.md) 에 한 줄만 적어 둔다(0초 규칙). 주 1회 10개씩 카드로 옮긴다.

### 카드 형식

```markdown
---
id: ssh                      # URL 슬러그. 영문 소문자·숫자·하이픈. 변경 금지
term: SSH                    # 표시 이름
aliases:                     # 검색용 별칭 — 한글 표기·풀네임 필수
  - Secure Shell
  - 시큐어 셸
category: infra              # 13개 코드 중 하나 (아래 표)
tags: [원격접속, 리눅스운영]   # taxonomy/tags.yml 에 있는 것만
level: 1                     # 1 기초 · 2 중급 · 3 심화
related: [port, firewall, public-key-cryptography, vpn, scp-rsync]  # 존재하는 id 만, 3~5개 권장
see_also:                    # 선택
  - https://www.openssh.com/manual.html
status: published            # draft | review | published
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의
60자 이내, 문장 하나. 핵심어는 **굵게**.

## 비유
일상 사물로 2문장 이내.

## 예시
실제로 돌아가는 명령·코드·문장. 가능하면 내 환경 맥락.

## 헷갈리기 쉬운 것
(선택) 비슷한 용어와의 차이.
```

| 규칙 | 어기면 |
| :-- | :-- |
| `id`·`term`·`aliases`·`category`·`level`·`created` 필수, 알 수 없는 키 금지 | 빌드 실패 |
| 파일 경로가 `terms/<category>/<id>.md` 와 일치 | 빌드 실패 |
| `tags` 는 `taxonomy/tags.yml` 에 정의된 것만 | 빌드 실패 |
| `related` 는 존재하는 id 만, 자기 자신·중복 금지 | 빌드 실패 |
| 본문에 raw HTML 태그·`javascript:` 링크 (코드 펜스 밖) | 빌드 실패 |
| 한 줄 정의 60자 이내(마크다운 기호 제외)·문장 하나 | review/published 는 실패, draft 는 경고 |
| `## 한 줄 정의` `## 비유` `## 예시` 필수, 그 외 섹션 금지 | review/published 는 실패, draft 는 경고 |
| `id` 가 `c` `starred` `stats` `all` 또는 카테고리 코드와 같음 | 빌드 실패 (해시 라우트 예약어) |
| related 3개 미만 / 역링크 없음 / 카테고리 10장 미만 / 비유 3문장 이상 / aliases 에 한글 없음 | 경고 |

`draft` 는 본문이 비어 있어도 커밋할 수 있다 — 완벽주의 금지. 다 채우면 `review` → 검토 후 `published`.

### 카테고리

| 코드 | 이름 | 다루는 것 |
| :-- | :-- | :-- |
| `os` | 🧠 컴퓨터 구조 & 운영체제 | CPU·메모리·프로세스·파일시스템·리눅스 |
| `network` | 🌐 네트워크 | IP·포트·TCP/HTTP·DNS·TLS·VPN |
| `algo` | 🧩 자료구조 & 알고리즘 | 선형 구조·트리/그래프·정렬/탐색·복잡도·DP |
| `lang` | 💬 프로그래밍 언어 & 패러다임 | 타입·OOP·함수형·메모리·비동기 |
| `frontend` | 🖥️ 프론트엔드 | HTML/CSS/JS·React·렌더링·PWA |
| `backend` | ⚙️ 백엔드 & API | REST·인증/인가·세션·캐시·큐 |
| `database` | 🗄️ 데이터베이스 | SQL·인덱스·트랜잭션·NoSQL·ORM |
| `infra` | 🖧 서버 & 인프라 & 클라우드 | Proxmox/VM·Docker·SSH·클라우드 |
| `devops` | 🔧 DevOps & 개발 도구 | Git·CI/CD·모니터링·크론 |
| `security` | 🔒 보안 | 암호화·인증 공격·웹 취약점·키 관리 |
| `ai` | 🤖 AI / ML / LLM | ML 기초·LLM·RAG·에이전트/MCP·서빙 |
| `medical` | 🏥 의료 IT | HL7/FHIR/DICOM·EMR/PACS·규제·의료 AI |
| `swe` | 📐 소프트웨어 공학 & 협업 | 방법론·설계 원칙·테스트·문서화 |

카테고리는 13개로 고정, 소분류는 `tags` 로. 새 태그는 `taxonomy/tags.yml` 에 먼저 추가한다.

## 어떻게 동작하나

```
terms/**/*.md ──validate(zod)──▶ scripts/build-terms.ts ──▶ public/terms.json       (인덱스: 목록·검색·카드 헤더, ~135KB)
                                                          └─▶ public/terms-body.json  (본문 HTML + 본문 검색 텍스트, ~600KB)
                                                                     │ ① 인덱스 → 목록 즉시   ② 본문 → 상세·본문 검색
브라우저 / PWA ◀── vite build (index.html + app.js + sw.js + manifest) ◀──┘
  MiniSearch 메모리 인덱스 · 해시 라우팅 · localStorage(별표·테마) · Service Worker 가 둘 다 프리캐시
```

- **서버 없음.** JSON 두 개를 내려 클라이언트에서 검색한다. 인덱스가 먼저 와서 목록이 뜨고, 본문은 그 뒤에 온다(도착 전엔 상세가 스켈레톤, 검색은 제목·정의·태그만). GitHub Pages 는 gzip 으로 보내므로 실제 전송량은 238장 기준 인덱스 ~40KB, 본문 ~140KB.
- **콘텐츠와 코드 분리.** `terms/` 만 만지면 사이트가 갱신된다. 마크다운은 빌드 때 한 번만 렌더한다.
- **검증이 곧 품질.** `scripts/lib/validate.ts` 가 위 규칙을 검사한다. CI 에서 실패하면 배포되지 않는다.

### 딥링크

| 해시 | 화면 |
| :-- | :-- |
| `#/` | 전체 목록 |
| `#c/network` | 카테고리 |
| `#ssh` | 카드 하나 (공유용) |
| `#starred` | 별표 목록 |
| `#stats` | 통계 |

### 검색

`term` > `aliases` > 정의 > 태그 > 본문 순으로 가중치. 토큰 접두 매칭, 4글자 이상은 오타 1~2자 허용, 여러 단어는 AND.
초성만 입력하면(`ㄹㅂㅅ`) 초성 필드로 검색하고, 토큰 중간 문자열(`록시`)은 term/aliases 부분 일치로 보완한다.

### 콘텐츠 신뢰 경계

카드 본문 HTML 은 **이 저장소의 Markdown 을 빌드 때 우리가 렌더한 것**만 화면에 넣는다(`dangerouslySetInnerHTML`). 사용자 입력이나 외부 데이터가 HTML 로 들어오는 경로는 없다. 그리고 **빌드가 막는다**: 본문(코드 펜스·인라인 코드 밖)에 raw HTML 태그, `javascript:`/`data:` 링크가 있으면 `validate` 가 error 를 내고, `see_also` 는 http(s) URL 만 받는다. 그래서 PR 로 카드를 받아도 마크다운 이외의 것은 배포되지 않는다.

## 배포 (GitHub Pages)

1. 저장소를 GitHub 에 올린다. **Settings → Pages → Source: GitHub Actions**.
2. `main` 에 push 하면 `.github/workflows/ci.yml` 이 validate → typecheck → test → build → Lighthouse(경고만) → Pages 배포를 돈다.
3. 주소는 `https://<id>.github.io/<repo>/`. 하위 경로는 CI 가 `BASE_PATH=/<repo>/` 로 넣는다. 커스텀 도메인이면 `BASE_PATH=/` 로 바꾼다.
4. 카드 하단 "GitHub에서 편집" 링크를 켜려면 `src/config.ts` 의 `REPO_URL` 에 저장소 주소를 넣는다.

Vercel/Cloudflare Pages 에서는 빌드 명령 `npm run build`, 출력 `dist`, `BASE_PATH` 없이 그대로 된다.

## 프로젝트 구조

```
taxonomy/   categories.yml(13개 대분류) · tags.yml(허용 태그)
terms/      <category>/<id>.md 카드 · _inbox.md 수집함
scripts/    validate.ts · build-terms.ts · new-term.ts · make-icons.mjs · lib/(parse·schema·validate·render·bundle)
src/        App.tsx · components/ · hooks/ · lib/(search·hangul·route·stars·theme·terms) · styles/global.css · types.ts
docs/       설계 스펙 · 구현 계획 · 시드 목록 · LLM 프롬프트
.github/    CI 워크플로 · PR 템플릿
```

## 로드맵 (v2, 스펙 7-2)

관계 그래프 뷰 · 플래시카드/간격 반복 학습 모드 · "오늘의 용어" 알림 · 랜덤 퀴즈 · PR 기여 워크플로 · 카드 수정 이력 표시 · 로컬 LLM 초안 생성기 · 용어 비교 카드 · 영문 모드

## 라이선스

코드는 MIT, 용어 카드 콘텐츠는 CC BY 4.0. 기여 전 [CONTRIBUTING.md](CONTRIBUTING.md) 를 읽어 주세요.
