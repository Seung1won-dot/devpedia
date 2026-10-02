---
id: browser-rendering
term: 브라우저 렌더링 과정
aliases:
  - Critical Rendering Path
  - 렌더링 파이프라인
  - 브라우저 동작 원리
  - 리플로우/리페인트
  - Reflow/Repaint
category: frontend
tags:
  - 브라우저
  - 렌더링
  - 면접
level: 2
kind: concept
related:
  - dom
  - url-to-render
  - web-performance
  - core-web-vitals
  - virtual-dom
  - csr-ssr-ssg
see_also:
  - https://developer.mozilla.org/ko/docs/Web/Performance/Guides/Critical_rendering_path
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

HTML·CSS 를 **DOM·CSSOM → 렌더 트리 → 레이아웃 → 페인트 → 합성** 순서로 그리는 절차.

## 비유

집 짓기와 같아서 설계도를 읽고(파싱) 방 배치를 정하고(레이아웃) 벽지를 바르고(페인트) 층별 사진을 겹쳐 한 장으로 만든다(합성). 벽지만 바꾸는 건 싸지만 방 크기를 바꾸면 처음부터 다시 잰다.

## 예시

```html
<head>
  <link rel="stylesheet" href="app.css">    <!-- CSS 는 렌더 차단: CSSOM 이 될 때까지 안 그린다 -->
  <script defer src="app.js"></script>      <!-- defer: HTML 을 다 읽은 뒤 실행 → 파싱을 안 막는다 -->
</head>
```

```js
// 리플로우(위치·크기 다시 계산) vs 리페인트(색만 다시 칠함)
el.style.width = '300px'                 // 크기 변경 → 리플로우 + 리페인트 (비쌈)
el.style.color = 'red'                   // 색만 변경 → 리페인트
el.style.transform = 'translateX(10px)'  // 합성 단계만 → 가장 싸다(애니메이션에 권장)
```

순서는 HTML 파싱 → **DOM**, CSS 파싱 → **CSSOM**, 둘을 합쳐 보이는 것만 남긴 **렌더 트리**, 각 요소의 위치·크기 계산(**레이아웃, 리플로우**), 픽셀 칠하기(**페인트**), 레이어를 GPU 로 겹치기(**컴포지트**). `script` 를 `head` 에 그냥 두면 만나는 순간 파싱이 멈추고, 아직 DOM 이 없어서 `querySelector` 가 null 을 돌려준다 — 그래서 `body` 끝에 두거나 `defer` 를 쓴다. 면접 단골로, "주소창에 URL 을 치면 무슨 일이 일어나나?" 의 마지막 단계이자 "리플로우와 리페인트의 차이는?" 으로 따로 묻는다.

## 헷갈리기 쉬운 것

- **리플로우 vs 리페인트**: 위치·크기가 바뀌면 리플로우(뒤따라 리페인트까지), 색·배경만 바뀌면 리페인트만. 반복문에서 `offsetWidth` 읽기와 스타일 쓰기를 섞으면 매번 리플로우가 강제된다(레이아웃 스래싱).
- **defer vs async**: 둘 다 내려받기는 파싱과 동시에 하지만, defer 는 파싱이 끝난 뒤 순서대로 실행하고 async 는 내려받는 즉시 순서 없이 실행한다. 내 앱 코드는 defer, 광고·분석 스크립트는 async.
- **가상 DOM**: React 가 실제 DOM 변경을 모아 한 번에 적용하는 최적화. 브라우저 파이프라인 자체가 바뀌는 게 아니라 리플로우 횟수를 줄이는 쪽이다.
