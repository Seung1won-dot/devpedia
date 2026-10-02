---
id: garbage-collection
term: 가비지 컬렉션
aliases:
  - Garbage Collection
  - 쓰레기 수집
  - GC
  - 자동 메모리 관리
category: lang
tags:
  - 메모리관리
  - 면접
level: 2
kind: concept
related:
  - stack-heap-memory
  - ram
  - closure
  - virtual-memory
  - process
  - memory-leak
  - bytecode-vm
see_also:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management
status: review
created: 2026-09-25
updated: 2026-10-03
---

## 한 줄 정의

더 이상 **아무도 참조하지 않는 메모리**를 언어 런타임이 알아서 회수하는 것.

## 비유

식당의 **빈 그릇 치우는 직원**. 손님(코드)이 다 먹고 자리를 뜨면(참조가 끊기면) 알아서 치워 주니, 손님이 직접 설거지(메모리 해제)를 안 해도 된다.

## 예시

```python
import gc

data = [0] * 10_000_000   # 큰 리스트 (약 80MB)
data = None               # 참조를 끊음 → 이제 "쓰레기"
gc.collect()              # 보통은 자동. 대용량 데이터 스크립트에서 가끔 강제로 부른다
```

```ts
// JS: 참조를 끊어도 "언제" 회수될지는 엔진(V8) 마음
let cache: Record<string, string[]> = { a: ['...'] }
cache = {}   // 이전 객체는 아무도 안 가리키니 GC 대상
```

## 헷갈리기 쉬운 것

- **메모리 누수**는 GC 가 있어도 생긴다. 전역 배열·이벤트 리스너·클로저가 계속 붙잡고 있으면 "아직 쓰는 중" 으로 보여 안 지운다.
- C/C++/Rust 에는 GC 가 없다. C 는 `free()` 를 직접 부르고, Rust 는 소유권 규칙으로 컴파일 때 해제 시점을 정한다.
