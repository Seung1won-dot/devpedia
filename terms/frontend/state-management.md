---
id: state-management
term: 상태 관리
aliases:
  - State Management
  - 전역 상태
  - Zustand/Redux
  - 스테이트 관리
category: frontend
tags:
  - React
  - 렌더링
level: 2
kind: concept
related:
  - component-props-state
  - hooks
  - react
  - local-storage
  - cache
  - react-query
see_also:
  - https://ko.react.dev/learn/managing-state
status: review
created: 2026-09-25
updated: 2026-09-29
---

## 한 줄 정의

여러 컴포넌트가 **같이 쓰는 데이터를 한곳에 두고** 바뀌면 다 같이 갱신되게 하는 방법.

## 비유

가족 냉장고 문에 붙인 **공용 메모판**. 각자 방(컴포넌트)에 따로 메모를 두면 서로 안 맞는데, 한 판에 적으면 누가 고쳐도 모두가 같은 걸 본다.

## 예시

```ts
// Ender Chest: 로그인 사용자를 어느 컴포넌트에서든 읽고 바꾸는 저장소 (Zustand)
import { create } from 'zustand'

type AuthStore = { user: User | null; setUser: (u: User | null) => void }

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

// 헤더에서: const user = useAuth((s) => s.user)   → 로그인하면 헤더·사이드바가 같이 바뀐다
```

React 에 기본으로 있는 `useContext` 로도 되고, 규모가 커지면 Zustand·Redux·Jotai 같은 라이브러리를 쓴다. Devpedia 처럼 작은 앱은 최상위 컴포넌트의 `useState` 를 props 로 내려주는 것만으로 충분하다.

## 헷갈리기 쉬운 것

- **state(useState)** 는 컴포넌트 하나의 기억, **상태 관리** 는 여러 컴포넌트가 나눠 쓰는 기억. 부모→자식→손자로 props 를 계속 넘기게 되면(prop drilling) 상태 관리 도구를 고려할 때다.
- **서버에서 받은 데이터**(API 응답)는 TanStack Query 같은 캐시 도구가 더 맞고, Zustand/Redux 는 "어느 탭이 열렸나" 같은 화면 쪽 상태에 어울린다.
