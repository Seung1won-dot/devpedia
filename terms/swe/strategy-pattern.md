---
id: strategy-pattern
term: 전략 패턴
aliases:
  - Strategy Pattern
  - 스트래티지 패턴
  - 전략 객체
  - 정책 패턴
  - Policy Pattern
category: swe
tags:
  - 디자인패턴
  - 설계원칙
level: 2
kind: pattern
related:
  - design-pattern
  - solid
  - factory-pattern
  - higher-order-function
  - dependency-injection
  - interface-abstract-class
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

하는 일은 같고 **방법만 다른 알고리즘들**을 갈아 끼울 수 있게 각각 객체로 떼어 둔 패턴.

## 비유

**내비게이션의 "최단 거리 / 최소 시간 / 무료 도로" 옵션**. 길 찾기는 같은데 계산 규칙만 다르고, 새 옵션이 생겨도 내비 본체를 뜯어고치지 않고 규칙 하나를 추가한다.

## 예시

```ts
// before — 정책이 늘 때마다 이 함수를 고친다 (OCP 위반)
function price(total: number, member: string) {
  if (member === 'student') return total * 0.9
  if (member === 'staff') return total * 0.8
  return total
}
// after — 정책을 객체(여기선 함수)로 떼어 내고 갈아 끼운다
type Discount = (total: number) => number
const discounts: Record<string, Discount> = {
  student: (t) => t * 0.9,
  staff:   (t) => t * 0.8,
  none:    (t) => t,
}
const checkout = (total: number, apply: Discount) => apply(total)
checkout(10000, discounts.student)   // 새 정책은 discounts 에 한 줄 추가로 끝
```

`checkout` 은 정책이 몇 개인지 모른다. 새 할인을 붙일 때 `checkout` 을 안 건드리니 **확장에는 열려 있고 수정에는 닫혀 있다**(SOLID 의 O). 정렬 기준(`sort(compareFn)`), 결제 수단(카드·카카오페이·계좌이체), 로그인 방식(Passport 의 strategy), 압축 알고리즘 — 전부 같은 모양이다. 클래스 언어에선 `interface DiscountPolicy` 와 구현 클래스 여럿으로 쓰고, 함수가 일급인 언어에선 함수 하나가 곧 전략이다.

면접에선 "전략 패턴을 써 본 적 있나? if-else 덩어리를 어떻게 없앴나?" 로 나온다 — 조건문의 각 가지를 같은 시그니처의 객체(함수)로 빼고 골라 넣었다고 답한다.

## 헷갈리기 쉬운 것

- **상태 패턴**: 구조가 똑같지만 객체가 **스스로** 현재 상태에 따라 전략을 바꾼다. 전략 패턴은 밖에서 골라 준다.
- **템플릿 메서드**: 뼈대는 부모가 갖고 일부 단계만 자식이 오버라이딩하는 상속 기반. 전략은 주입(합성) 기반이라 실행 중에도 바꿀 수 있다.
- **팩토리**: 어떤 전략 객체를 "만들지" 고르는 쪽. `discounts[member]` 조회가 초소형 팩토리다.
