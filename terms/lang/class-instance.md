---
id: class-instance
term: 클래스/인스턴스
aliases:
  - Class / Instance
  - 클래스와 인스턴스
  - 인스턴스화
  - 객체 생성
category: lang
tags:
  - OOP
level: 1
related:
  - oop
  - inheritance-polymorphism
  - stack-heap-memory
  - variable-type
  - orm
see_also:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**클래스**는 객체의 설계도, **인스턴스**는 그 설계도로 실제 만든 객체다.

## 비유

**붕어빵 틀과 붕어빵**. 틀(클래스)은 하나지만 붕어빵(인스턴스)은 찍을 때마다 새로 나오고, 팥·슈크림처럼 속(값)은 각각 다를 수 있다.

## 예시

```ts
class Item {
  constructor(public name: string, public qty = 1) {}
  add(n: number) { this.qty += n }
}

const sword = new Item('Diamond Sword')   // 인스턴스 1
const bread = new Item('Bread', 16)       // 인스턴스 2 — 같은 틀, 다른 값
sword.add(1)
console.log(sword.qty, bread.qty)         // 2 16 — 서로 영향 없음
```

## 헷갈리기 쉬운 것

- **객체(object)** 는 인스턴스와 거의 같은 말. 다만 JS 에서는 `{ a: 1 }` 처럼 클래스 없이 만든 것도 객체라 부른다.
- **static 멤버**는 인스턴스가 아니라 클래스 자체에 붙는 것. `Math.max()` 처럼 `new` 없이 바로 쓴다.
