---
id: functional-programming
term: 함수형 프로그래밍
aliases:
  - Functional Programming
  - 함수형
  - FP
  - 순수 함수
category: lang
tags:
  - 함수형
level: 2
related:
  - oop
  - closure
  - hooks
  - state-management
  - recursion
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

상태를 바꾸지 않고, **입력만으로 출력이 정해지는 함수**를 조립해 프로그램을 짜는 방식.

## 비유

**자판기 vs 계산기**. 자판기는 안에 재고(상태)가 있어 같은 버튼을 눌러도 품절이 날 수 있지만, 계산기는 2+3 을 언제 누르든 5 라서 믿고 쓸 수 있다.

## 예시

```ts
// 나쁜 예: 바깥 배열을 직접 바꾼다 → 같은 입력인데 결과가 매번 달라짐
const cart: string[] = []
function addBad(item: string) { cart.push(item); return cart }

// 함수형: 입력을 안 건드리고 새 배열을 돌려준다
function add(cart: readonly string[], item: string) { return [...cart, item] }

const a = add([], 'Bread')
const b = add(a, 'Apple')   // a 는 그대로 ['Bread'], b 는 ['Bread', 'Apple']
// React 의 setItems(prev => [...prev, item]) 가 딱 이 패턴
```

## 헷갈리기 쉬운 것

- **순수 함수**는 함수형의 부품(같은 입력→같은 출력, 부수효과 없음). 함수형 프로그래밍은 그 부품으로 짜는 전체 스타일이다.
- `map`/`filter` 나 **클로저**를 쓴다고 곧 함수형은 아니다. 핵심은 "바꾸지 않기(불변성)".
