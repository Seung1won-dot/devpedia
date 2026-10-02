---
id: hooks
term: 훅(Hooks)
aliases:
  - React Hooks
  - 리액트 훅
  - useState/useEffect
  - 훅스
category: frontend
tags:
  - React
  - JavaScript
level: 2
kind: concept
related:
  - react
  - component-props-state
  - state-management
  - closure
  - promise-async-await
  - debounce-throttle
  - react-memo
see_also:
  - https://ko.react.dev/reference/react/hooks
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

함수 컴포넌트에 **값 기억·화면 밖 작업** 같은 능력을 붙여주는 `use` 로 시작하는 함수들.

## 비유

기본 드릴(함수 컴포넌트)에 갈아 끼우는 **비트**. useState 비트를 끼우면 "기억" 이 되고, useEffect 비트를 끼우면 "다 그린 뒤에 뭔가 하기" 가 된다.

## 예시

```tsx
// Ender Chest: 로그인한 사용자의 아이템을 Supabase 에서 불러오기
const [items, setItems] = useState<Item[]>([])

useEffect(() => {
  supabase.from('items').select('*')
    .then(({ data }) => setItems(data ?? []))
}, [])   // [] → 화면에 처음 뜰 때 한 번만 실행
```

규칙은 두 개뿐이다. 컴포넌트 함수의 **맨 위에서만** 부르고, `if`·`for`·일반 함수 안에서는 부르지 않는다. 순서가 바뀌면 React 가 어느 state 가 어느 것인지 헷갈리기 때문이다.

## 헷갈리기 쉬운 것

- **state 와 useState.** state 는 "기억하는 값" 이고, useState 는 그 값을 만들어 주는 훅.
- **useEffect 와 이벤트 핸들러.** 버튼 클릭처럼 "사용자가 뭘 했을 때" 는 onClick 에, "화면이 그려진 뒤 알아서" 해야 하는 일(데이터 불러오기, 구독, 타이머)은 useEffect 에 넣는다.
