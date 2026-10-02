---
id: react-memo
term: useMemo/useCallback/React.memo
aliases:
  - React 메모이제이션
  - 리액트 메모이제이션
  - memo
  - 리렌더링 최적화
  - React Compiler
category: frontend
tags:
  - React
  - 성능최적화
  - 흔한실수
level: 2
kind: concept
related:
  - memoization
  - hooks
  - virtual-dom
  - component-props-state
  - web-performance
  - immutability
see_also:
  - https://ko.react.dev/reference/react/useMemo
  - https://ko.react.dev/reference/react/memo
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

입력이 같으면 **이전 계산·함수·화면을 재사용**해 불필요한 리렌더를 줄이는 React 도구들.

## 비유

시험 때 **한 번 푼 문제의 답을 여백에 적어 두는 것**. 같은 문제가 또 나오면 다시 풀지 않고 베끼지만, 적어 두는 데도 시간이 들어서 쉬운 문제까지 다 적으면 오히려 느려진다.

## 예시

```tsx
import { memo, useCallback, useMemo, useState } from 'react'

// 377장 카드 중 검색어에 맞는 것 고르기 — 입력(terms, q)이 그대로면 다시 계산하지 않는다
function TermList({ terms, q }: { terms: Term[]; q: string }) {
  const filtered = useMemo(() => terms.filter((t) => t.term.includes(q)), [terms, q])
  const [starred, setStarred] = useState<Set<string>>(new Set())

  // 렌더마다 새 함수를 만들면 아래 memo 가 "props 바뀜" 으로 보고 소용없어진다 → 같은 함수를 유지
  const toggle = useCallback((id: string) => {
    setStarred((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  return <ul>{filtered.map((t) => <Card key={t.id} term={t} on={starred.has(t.id)} onStar={toggle} />)}</ul>
}

// props 가 전과 같으면(얕은 비교) 리렌더를 건너뛴다
const Card = memo(function Card({ term, on, onStar }: { term: Term; on: boolean; onStar: (id: string) => void }) {
  return <li onClick={() => onStar(term.id)}>{on ? '★' : '☆'} {term.term}</li>
})
```

셋은 "**입력이 같으면 전 결과를 돌려준다**" 는 메모이제이션을 React 에 맞춘 것 — `useMemo` 는 값, `useCallback` 은 함수, `memo` 는 컴포넌트 출력. 비교는 `===` 라서 객체·배열·함수를 매 렌더 새로 만들면 "다른 입력" 이 되어 캐시가 전부 빗나간다. 비용도 있다 — 의존성 비교와 이전 값 보관은 공짜가 아니고, 코드도 읽기 어려워진다. **React DevTools 의 Profiler 로 느린 리렌더를 확인한 뒤에만** 쓰고, 습관처럼 도배하지 않는다. React Compiler 는 이 작업을 빌드 때 자동으로 넣어 주는 것을 목표로 한다 [확인 필요].

## 헷갈리기 쉬운 것

- **useMemo vs useCallback**: `useCallback(fn, deps)` 는 `useMemo(() => fn, deps)` 와 같다. 값을 기억하면 useMemo, 함수를 기억하면 useCallback.
- **memo vs useMemo**: `memo` 는 컴포넌트를 감싸 props 가 같으면 **리렌더 자체를 건너뛰고**, `useMemo` 는 컴포넌트 안에서 **특정 계산만** 건너뛴다. memo 가 효과를 보려면 넘기는 함수·객체가 useCallback/useMemo 로 고정돼 있어야 한다.
- **알고리즘의 메모이제이션**(DP 의 캐시)은 모든 입력에 대한 결과를 표로 보관하지만, React 의 셋은 **직전 한 번**의 결과만 기억한다. 입력이 A→B→A 로 바뀌면 A 를 다시 계산한다.
