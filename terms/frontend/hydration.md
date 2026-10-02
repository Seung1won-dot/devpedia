---
id: hydration
term: 하이드레이션
aliases:
  - Hydration
  - 하이드레이트
  - hydrateRoot
  - Hydration Mismatch
  - 수화
category: frontend
tags:
  - React
  - 렌더링
  - 브라우저
level: 3
kind: concept
related:
  - csr-ssr-ssg
  - server-components
  - nextjs
  - virtual-dom
  - core-web-vitals
  - react
see_also:
  - https://ko.react.dev/reference/react-dom/client/hydrateRoot
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

서버가 보낸 **완성된 HTML 에 JS 가 붙어 이벤트가 작동하게** 만드는 과정.

## 비유

**마네킹에 생명을 불어넣는 것**. 서버가 보낸 HTML 은 옷까지 다 입은 마네킹이라 보기엔 완성품이지만, JS 가 도착해 안에 들어가야 비로소 버튼이 눌리고 움직인다.

## 예시

```tsx
// 서버(Node): 컴포넌트를 HTML 문자열로 만들어 보낸다 — 화면은 즉시 보이지만 아직 클릭은 안 된다
import { renderToString } from 'react-dom/server'
const html = renderToString(<App />)

// 브라우저: 이미 있는 HTML 을 지우고 다시 그리는 게 아니라, 그 위에 React 를 '붙인다'
import { hydrateRoot } from 'react-dom/client'
hydrateRoot(document.getElementById('root')!, <App />)
// createRoot(el).render(<App />) 였다면 서버 HTML 을 버리고 처음부터 그린다(CSR)
```

```tsx
// 흔한 사고: 서버와 브라우저의 결과가 다르면 "Hydration failed" 경고
function Clock() {
  return <p>{new Date().toLocaleTimeString()}</p>   // 서버 시각 ≠ 브라우저 시각
}
// 해결: 브라우저 전용 값(시각·window·localStorage)은 useEffect 안에서 넣는다
```

SSR/SSG 가 "첫 화면이 빨리 보인다" 는 장점을 주는 대신 치르는 비용이 하이드레이션이다. HTML 은 왔는데 JS 는 아직인 구간에 **보이지만 안 눌리는** 상태가 생기고(Core Web Vitals 의 INP 에 잡힌다), 서버 결과와 브라우저 결과가 다르면 **mismatch** 경고와 함께 React 가 그 부분을 다시 그린다. 트레이드오프: 상호작용이 거의 없는 블로그·문서 사이트는 하이드레이션 비용 자체를 없애는 쪽(Astro 의 아일랜드, 서버 컴포넌트)이 낫고, 로그인 뒤 대시보드처럼 어차피 JS 가 다 필요한 앱은 CSR 로 가도 손해가 적다. 그 사이를 노리는 것이 `Suspense` 로 조각마다 따로 붙이는 **선택적 하이드레이션**이다.

## 헷갈리기 쉬운 것

- **SSR vs 하이드레이션**: SSR 은 서버가 HTML 을 만드는 단계, 하이드레이션은 그 HTML 을 브라우저에서 React 가 넘겨받는 단계. SSR 만 하고 하이드레이션을 안 하면 보기만 되는 정적 페이지다.
- **CSR 의 첫 렌더**: `createRoot().render()` 는 빈 div 에 처음부터 그린다. 하이드레이션은 이미 있는 DOM 과 가상 DOM 을 **맞춰 보며** 이벤트만 붙이므로 둘이 같아야 한다.
- **서버 컴포넌트(RSC)** 는 브라우저로 JS 를 아예 안 보내는 컴포넌트라 하이드레이션 대상이 아니다. 하이드레이션은 `'use client'` 컴포넌트에만 일어난다.
