# 동작 방식 · 배포

[README](../README.md)에서 옮겨 온 상세 설명입니다.

## 데이터 흐름

```
terms/**/*.md ──validate(zod)──▶ scripts/build-terms.ts ──▶ public/terms.json       (인덱스: 목록·검색·카드 헤더, ~135KB)
                                                          └─▶ public/terms-body.json  (본문 HTML + 본문 검색 텍스트, ~600KB)
                                                                     │ ① 인덱스 → 목록 즉시   ② 본문 → 상세·본문 검색
브라우저 / PWA ◀── vite build (index.html + app.js + sw.js + manifest) ◀──┘
  MiniSearch 메모리 인덱스 · 해시 라우팅 · localStorage(별표·테마) · Service Worker 가 둘 다 프리캐시
```

- **서버 없음.** JSON 두 개를 내려 클라이언트에서 검색한다. 인덱스가 먼저 와서 화면이 뜨고, 본문은 필요할 때(용어 페이지·미리보기·검색) 또는 한가할 때 받는다(도착 전엔 상세가 스켈레톤, 검색은 제목·정의·태그만). 검색 인덱스도 첫 검색 때 만든다. GitHub Pages 는 gzip 으로 보내므로 실제 전송량은 760장 기준 인덱스·본문 합쳐 수백 KB (비압축 terms.json 491KB · terms-body.json 2744KB).
- **콘텐츠와 코드 분리.** `terms/` 만 만지면 사이트가 갱신된다. 마크다운은 빌드 때 한 번만 렌더한다.
- **검증이 곧 품질.** `scripts/lib/validate.ts` 가 아래 [카드 규칙](cards.md#카드-형식)을 검사한다. CI 에서 실패하면 배포되지 않는다.

## 딥링크

| 해시 | 화면 |
| :-- | :-- |
| `#/` | 홈 |
| `#/c/network` | 분야 (`?p=dns` 는 데스크톱 미리보기 패널) |
| `#/t/ssh` | 용어 하나 (공유용) |
| `#/starred` | 별표 목록 |
| `#/stats` | 통계 |

예전 주소 `#ssh` `#/ssh` `#c/network` `#starred` `#stats` 는 방문 기록을 쌓지 않고 새 주소로 바뀐다. 없는 주소는 404 화면(비슷한 용어 추천).

## 검색

`term` > `aliases` > 정의 > 태그 > 본문 순으로 가중치. 토큰 접두 매칭, 4글자 이상은 오타 1~2자 허용, 여러 단어는 AND.
초성만 입력하면(`ㄹㅂㅅ`) 초성 필드로 검색하고, 토큰 중간 문자열(`록시`)은 term/aliases 부분 일치로 보완한다.

## 콘텐츠 신뢰 경계

카드 본문 HTML 은 **이 저장소의 Markdown 을 빌드 때 우리가 렌더한 것**만 화면에 넣는다(`dangerouslySetInnerHTML`). 사용자 입력이나 외부 데이터가 HTML 로 들어오는 경로는 없다. 그리고 **빌드가 막는다**: 본문(코드 펜스·인라인 코드 밖)에 raw HTML 태그, `javascript:`/`data:` 링크가 있으면 `validate` 가 error 를 내고, `see_also` 는 http(s) URL 만 받는다. 그래서 PR 로 카드를 받아도 마크다운 이외의 것은 배포되지 않는다.


## 배포 (GitHub Pages)

저장소: <https://github.com/Seung1won-dot/devpedia> · 사이트: <https://seung1won-dot.github.io/devpedia/>

1. GitHub 저장소 **Settings → Pages → Source: GitHub Actions** (처음 한 번).
2. `main` 에 push 하면 `.github/workflows/ci.yml` 이 validate → typecheck → test → build → Lighthouse(경고만) → Pages 배포를 돈다.
3. 하위 경로 `/devpedia/` 는 CI 가 저장소 이름으로 `BASE_PATH` 를 넣는다. 저장소 이름을 바꾸면 주소도 따라간다. 커스텀 도메인이면 `BASE_PATH=/` 로 바꾼다.
4. 카드 하단 "GitHub에서 편집" 링크는 `src/config.ts` 의 `REPO_URL` 을 쓴다.
5. 빌드가 `dist/404.html` 을 만든다. 해시 없이 붙여 넣은 주소(`/devpedia/t/ssh`)나 오타 경로를 `/devpedia/#/t/ssh` 로 옮겨 앱 안의 화면(용어·분야·찾을 수 없음)으로 보낸다. 서비스 워커의 오프라인 대체(`index.html`)는 앱 루트에만 걸려 있어 이 흐름을 가로채지 않는다.
6. 공유 미리보기(Open Graph) 주소는 `index.html` 에 배포 주소로 적혀 있다. 주소가 바뀌면 `og:url`·`og:image` 도 고친다.

Vercel/Cloudflare Pages 에서는 빌드 명령 `npm run build`, 출력 `dist`, `BASE_PATH` 없이 그대로 된다.
