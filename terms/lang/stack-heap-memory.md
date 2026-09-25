---
id: stack-heap-memory
term: 스택/힙 메모리
aliases:
  - Stack / Heap Memory
  - 스택 메모리와 힙 메모리
  - 콜 스택
  - 힙 영역
category: lang
tags:
  - 메모리관리
  - 메모리
level: 2
related:
  - garbage-collection
  - ram
  - recursion
  - process
  - virtual-memory
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**스택**은 함수 호출마다 쌓였다 사라지는 자동 영역, **힙**은 필요할 때 빌려 쓰는 자유 영역이다.

## 비유

스택은 **식판 쌓기** — 위에 올린 것부터 빼고, 밥 다 먹으면 자동으로 치운다. 힙은 **창고** — 큰 짐을 원하는 만큼 넣어 두고 번호표(주소)로 찾아가며, 다 쓰면 누군가 치워야 한다.

## 예시

```ts
function greet() {
  const n = 3                          // 스택: greet 가 끝나면 자동 소멸
  const items = new Array(1_000_000)   // 힙: 배열의 실제 내용은 힙에, 스택엔 주소만
  return items.length + n
}
greet()

// 스택이 넘치면:
function forever(): number { return forever() + 1 }
forever()   // RangeError: Maximum call stack size exceeded
```

## 헷갈리기 쉬운 것

- 자료구조 **힙(heap)** 과 이름만 같다. 메모리 힙은 우선순위 큐와 아무 관계 없는 "자유 영역" 이라는 뜻.
- **스택 오버플로**는 스택이 꽉 찬 것(보통 끝없는 재귀), **메모리 누수**는 힙에 쓰레기가 쌓이는 것.
