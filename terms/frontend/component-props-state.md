---
id: component-props-state
term: 컴포넌트/props/state
aliases:
  - Component
  - 컴포넌트
  - 프롭스와 스테이트
  - props/state
category: frontend
tags:
  - React
  - 렌더링
level: 1
related:
  - react
  - hooks
  - state-management
  - virtual-dom
see_also:
  - https://ko.react.dev/learn/passing-props-to-a-component
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**컴포넌트**는 화면 부품, **props** 는 밖에서 받는 값, **state** 는 부품이 스스로 기억하는 값.

## 비유

**자판기**(컴포넌트)에 넣는 동전과 누른 버튼이 props 라면, 자판기 안에 남은 음료 개수는 state 다. 동전은 밖(사용자)에서 오고, 재고는 자판기가 스스로 세고 있다.

## 예시

```tsx
import { useState } from 'react'

// Ender Chest 아이템 카드. name 은 부모가 주는 props, 즐겨찾기 여부는 자기 state
function ItemCard({ name }: { name: string }) {
  const [starred, setStarred] = useState(false)
  return (
    <button onClick={() => setStarred(!starred)}>
      {starred ? '★' : '☆'} {name}
    </button>
  )
}
```

`<ItemCard name="철괴" />` 처럼 부르면 name 이 props 로 들어간다. 버튼을 누르면 `setStarred` 가 state 를 바꾸고, React 가 그 카드만 다시 그린다.

## 헷갈리기 쉬운 것

- **props 는 읽기 전용.** 부모가 준 값이라 컴포넌트 안에서 바꾸면 안 되고, 바꾸고 싶은 값은 state 로 만든다.
- **일반 변수(let) vs state.** `let count = 0; count++` 은 값은 바뀌어도 화면이 안 바뀐다. 화면에 반영되려면 `useState` 로 만든 state 여야 한다.
