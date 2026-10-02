---
id: debounce-throttle
term: 디바운스/스로틀
aliases:
  - Debounce
  - Throttle
  - 디바운싱
  - 스로틀링
  - 입력 지연 처리
category: frontend
tags:
  - JavaScript
  - 성능최적화
  - 비동기
level: 2
kind: pattern
related:
  - rate-limit
  - hooks
  - event-loop
  - callback
  - web-performance
  - fetch
see_also:
  - https://developer.mozilla.org/ko/docs/Glossary/Debounce
  - https://developer.mozilla.org/ko/docs/Glossary/Throttle
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

연달아 오는 이벤트를 **멈춘 뒤 한 번(디바운스)** 또는 **간격마다 한 번(스로틀)** 만 처리하는 기법.

## 비유

디바운스는 **엘리베이터 문** — 사람이 계속 타는 동안은 안 닫히다가 아무도 안 들어온 지 몇 초가 지나야 닫힌다. 스로틀은 **놀이기구 입장** — 줄이 아무리 길어도 5분에 한 번씩만 태운다.

## 예시

```ts
// 검색창: 타이핑이 300ms 멈췄을 때만 서버에 묻는다(디바운스)
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, ms = 300): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(id)   // 다음 글자가 오면 이전 타이머 취소 → 멈출 때까지 계속 미뤄진다
  }, [value, ms])
  return debounced
}
// 사용: const q = useDebounce(input); useEffect(() => { fetch(`/api/search?q=${q}`) }, [q])
```

```ts
// 스크롤 위치 저장: 아무리 자주 스크롤해도 200ms 에 한 번만(스로틀)
function throttle<A extends unknown[]>(fn: (...args: A) => void, ms: number) {
  let last = 0
  return (...args: A) => {
    const now = Date.now()
    if (now - last >= ms) { last = now; fn(...args) }
  }
}
window.addEventListener('scroll', throttle(() => sessionStorage.setItem('y', String(scrollY)), 200))
```

고르는 기준은 "**마지막 값만 중요하면 디바운스, 중간 과정도 보여야 하면 스로틀**". 검색어 자동완성·창 크기 조절 뒤 레이아웃 계산은 디바운스, 스크롤 위치 표시·드래그 중 좌표 갱신은 스로틀이다. 직접 쓰기 귀찮으면 lodash 의 `debounce`/`throttle` 을 쓴다. 클라이언트가 호출을 줄여도 서버는 여전히 레이트 리밋으로 자기 방어를 해야 한다 — 클라이언트 코드는 누구나 우회할 수 있기 때문.

## 헷갈리기 쉬운 것

- **디바운스 vs 스로틀**: 디바운스는 멈출 때까지 **아예 실행하지 않아** 계속 입력하면 영원히 미뤄질 수 있고, 스로틀은 **최소한 간격마다 한 번은** 실행된다.
- **레이트 리밋(서버)** 은 같은 "요청 빈도 줄이기" 지만 서버가 거절(429)하는 쪽이고, 디바운스/스로틀은 클라이언트가 스스로 덜 보내는 쪽. 둘은 대체재가 아니라 같이 쓴다.
- **setTimeout 으로 그냥 지연**: 모든 호출이 다 늦게 실행될 뿐 횟수는 줄지 않는다. 디바운스의 핵심은 이전 타이머를 **취소**하는 데 있다.
