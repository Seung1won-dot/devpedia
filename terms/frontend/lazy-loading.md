---
id: lazy-loading
term: 레이지 로딩
aliases:
  - Lazy Loading
  - 지연 로딩
  - 게으른 로딩
  - React.lazy
  - 코드 스플리팅
category: frontend
tags:
  - 성능최적화
  - React
  - 브라우저
level: 1
kind: pattern
related:
  - web-performance
  - bundler
  - react
  - core-web-vitals
  - spa-mpa
  - pagination
  - asset-optimization
see_also:
  - https://ko.react.dev/reference/react/lazy
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

처음부터 다 내려받지 않고 **실제로 필요해질 때 불러오는** 방식.

## 비유

뷔페에서 음식을 한 번에 다 담지 않고 **먹을 때마다 가서 가져오는 것**. 자리에 앉기까지가 빠르고, 안 먹을 음식은 아예 가져오지 않는다.

## 예시

```tsx
import { lazy, Suspense } from 'react'

// 라우트 단위 코드 스플리팅: 통계 페이지의 JS 는 그 URL 로 갈 때만 내려받는다
const StatsPage = lazy(() => import('./pages/StatsPage'))

<Suspense fallback={<p>불러오는 중</p>}>
  <Route path="/stats" element={<StatsPage />} />
</Suspense>
```

```html
<!-- 이미지: 화면에 가까워질 때 내려받기 (브라우저 내장, JS 불필요) -->
<img src="deadlock.png" loading="lazy" width="640" height="360" alt="데드락 그림">
```

`lazy(() => import(...))` 를 만나면 Vite 가 그 파일을 별도 chunk 로 잘라 두고, `Suspense` 가 내려받는 동안 대신 보여 줄 것을 정한다. 이미지는 `loading="lazy"` 한 속성이면 되는데, `width`/`height` 를 같이 적어야 자리가 미리 잡혀 화면이 밀리지 않는다(CLS). Devpedia 가 인덱스(`terms.json`)를 먼저 받고 본문(`terms-body.json`)을 그 뒤에 받는 것도 데이터 레이지 로딩이다. 면접에서는 "초기 로딩을 어떻게 줄였나요?" 에 코드 스플리팅과 함께 나오는 답이다.

## 헷갈리기 쉬운 것

- **첫 화면에 보이는 것엔 쓰지 않는다**: 히어로 이미지나 헤더를 lazy 로 하면 오히려 LCP 가 늦어진다. 스크롤 아래에 있는 것만 대상이다.
- **프리로드/프리페치**: 반대 방향. 곧 쓸 게 확실하면 미리 받아 둔다(`<link rel="preload">`, 메뉴에 마우스를 올렸을 때 `import()` 를 미리 호출).
- **Suspense 는 로딩 UI 담당**: 코드를 자르는 건 `lazy`/`import()`, 기다리는 동안 무엇을 보여 줄지는 `Suspense`. 세트로 쓰지만 역할이 다르다.
