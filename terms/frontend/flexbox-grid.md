---
id: flexbox-grid
term: Flexbox/Grid
aliases:
  - CSS Flexbox
  - CSS Grid
  - 플렉스박스
  - 그리드 레이아웃
  - flex
  - CSS 레이아웃
category: frontend
tags:
  - CSS
level: 1
kind: concept
related:
  - responsive-design
  - html-css-js
  - semantic-html
  - browser-rendering
  - dom
  - tailwind
  - media-query
see_also:
  - https://developer.mozilla.org/ko/docs/Learn_web_development/Core/CSS_layout
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

Flexbox 는 **한 줄(1차원) 정렬**, Grid 는 **행과 열(2차원) 배치**용 CSS 레이아웃.

## 비유

Flexbox 는 **책장 한 칸에 책을 왼쪽부터 밀어 넣거나 간격을 고르게 벌리는 것**, Grid 는 **바둑판을 먼저 그려 놓고 칸마다 무엇을 놓을지 정하는 것**.

## 예시

```css
/* Devpedia 카드 목록: 240px 이상 카드가 화면 폭에 맞춰 알아서 여러 열로 */
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

/* 카드 머리 한 줄: 용어명은 왼쪽, 별표 버튼은 오른쪽 끝, 세로는 가운데 */
.card-header {
  display: flex;
  justify-content: space-between;   /* 주축(가로) 분배 */
  align-items: center;              /* 교차축(세로) 정렬 */
}
```

고르는 기준은 "내용이 흐름을 정하나(Flex), 틀이 흐름을 정하나(Grid)" 다. 버튼 줄·내비게이션·카드 안쪽 정렬처럼 한 방향으로 늘어놓는 건 Flex, 페이지 전체 뼈대나 카드 목록처럼 행과 열을 동시에 맞추는 건 Grid 다. `justify-*` 는 주축, `align-*` 은 교차축이고, Flex 는 `flex-direction` 에 따라 주축이 바뀐다. 면접에서는 "Flexbox 와 Grid 는 언제 뭘 쓰나요?", "가운데 정렬 방법 세 가지는?" 으로 나온다.

## 헷갈리기 쉬운 것

- **justify-content vs align-items**: 전자는 주축(기본 가로), 후자는 교차축(기본 세로). `flex-direction: column` 이면 둘의 방향이 뒤바뀐다. 이걸 모르면 세로 가운데 정렬이 안 된다.
- **둘 중 하나만 쓰는 게 아니다**: Grid 로 큰 틀을 잡고 각 칸 안은 Flex 로 정렬하는 조합이 기본이다.
- **float / table 레이아웃**: 옛 방식. 레거시 코드에서 만나면 읽을 줄은 알아야 하지만 새로 쓰진 않는다.
