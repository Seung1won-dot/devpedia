---
id: web-performance
term: 웹 성능 최적화
aliases:
  - Web Performance
  - 프론트엔드 성능 최적화
  - 번들 최적화
  - 코드 스플리팅/트리 셰이킹
  - Lighthouse
category: frontend
tags:
  - 성능최적화
  - 번들링
  - 브라우저
level: 2
kind: concept
related:
  - bundler
  - lazy-loading
  - core-web-vitals
  - browser-rendering
  - cdn
  - cache
  - tree-shaking
see_also:
  - https://web.dev/learn/performance
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

페이지가 **더 빨리 뜨고 더 부드럽게 움직이게** 내려받는 양과 그리는 일을 줄이는 작업.

## 비유

이사할 때 **안 쓰는 짐은 버리고(트리 셰이킹), 당장 필요한 상자만 먼저 옮기고(코드 스플리팅), 사진첩은 압축해 가는 것(이미지 최적화)**. 트럭 한 대에 다 실어 한 번에 옮기려 하면 오히려 늦는다.

## 예시

```ts
// Devpedia 실제 구조(src/hooks/useBundle.ts 요약): 가벼운 인덱스를 먼저 받아 목록·검색부터 띄우고,
// 600KB 짜리 본문 파일은 그 뒤에 받는다. 첫 화면이 본문 크기에 발목 잡히지 않는다
const bundle = await fetchJson<Bundle>(bundleUrl(base))        // terms.json — id·term·정의 (작다)
setState({ state: 'ready', bundle, bodies: null })             // 여기서 이미 화면이 뜬다
const body = await fetchJson<BodyBundle>(bodiesUrl(base))      // terms-body.json — 본문 HTML (크다)
setState((prev) => ({ ...prev, bodies: new Map(Object.entries(body.bodies)) }))
```

```bash
npm run build          # Vite 가 chunk 별 크기를 출력 — 500KB 넘는 게 있으면 경고
# Chrome 개발자 도구 → Lighthouse 탭 → Performance 점수와 "개선 항목" 목록
```

순서는 **재기 → 큰 것부터 줄이기 → 다시 재기**다. Lighthouse 와 Network 탭에서 무엇이 크고 느린지 본 뒤, 번들은 코드 스플리팅(라우트별 `React.lazy`)·트리 셰이킹(안 쓰는 export 를 빌드가 빼도록 named import)·무거운 의존성 교체, 이미지는 WebP/AVIF 변환과 `srcset`·`loading="lazy"`, 네트워크는 CDN 과 캐시 헤더(파일명 해시 + `Cache-Control`) 순으로 손댄다. 면접에서는 "성능 개선 경험은?" 으로 나오며, "몇 초에서 몇 초로, 무엇을 해서" 를 숫자와 함께 말한다.

## 헷갈리기 쉬운 것

- **코드 스플리팅 vs 트리 셰이킹**: 스플리팅은 쓰는 코드를 여러 조각으로 나눠 필요할 때 받는 것, 셰이킹은 안 쓰는 코드를 아예 빼는 것. 둘 다 Vite(Rollup)가 해 주지만 스플리팅 지점(`import()`)은 내가 정한다.
- **로딩 성능 vs 런타임 성능**: 처음 뜨는 속도(번들·이미지·서버 응답)와 뜬 뒤의 부드러움(리렌더링·리플로우·긴 JS 작업)은 다른 문제. Lighthouse 는 주로 전자, React DevTools Profiler 는 후자를 본다.
- **재지 않고 최적화하지 않기**: `useMemo` 를 도배하는 건 성능이 아니라 복잡도만 올린다. 병목을 재고 큰 것부터 줄인다.
