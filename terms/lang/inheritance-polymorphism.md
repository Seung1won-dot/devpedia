---
id: inheritance-polymorphism
term: 상속/다형성/캡슐화
aliases:
  - Inheritance / Polymorphism / Encapsulation
  - 상속과 다형성
  - 캡슐화
  - OOP 3대 특징
category: lang
tags:
  - OOP
level: 2
related:
  - oop
  - class-instance
  - solid
  - design-pattern
  - typescript
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**상속**은 물려받기, **다형성**은 같은 호출에 다른 반응, **캡슐화**는 속 감추기다.

## 비유

**가전제품의 전원 버튼**. TV 든 에어컨이든 "가전" 이라는 공통 규격을 물려받아(상속) 같은 전원 버튼을 누르면 제품마다 다르게 켜지고(다형성), 내부 회로는 뚜껑으로 가려져 있다(캡슐화).

## 예시

```ts
class Shape {
  #id = Math.random()                        // 캡슐화: 밖에서 접근 불가
  area() { return 0 }
}
class Circle extends Shape {                 // 상속
  constructor(private r: number) { super() }
  area() { return Math.PI * this.r ** 2 }    // 다형성: 이름은 같고 동작은 다름
}
class Square extends Shape {
  constructor(private s: number) { super() }
  area() { return this.s ** 2 }
}
for (const s of [new Circle(1), new Square(2)]) console.log(s.area()) // 3.14.. 4
```

## 헷갈리기 쉬운 것

- **인터페이스**는 "이런 메서드가 있어야 한다" 는 약속만 있고 구현이 없다. 상속은 구현까지 물려받는다.
- **오버로딩**(같은 이름·다른 매개변수)과 **오버라이딩**(부모 메서드 덮어쓰기)은 다르다. 다형성 얘기에서 나오는 건 보통 오버라이딩.
