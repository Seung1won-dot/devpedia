---
id: overloading-overriding
term: 오버로딩/오버라이딩
aliases:
  - Overloading / Overriding
  - 오버로드
  - 오버라이드
  - 메서드 오버로딩
  - 메서드 오버라이딩
  - 중복 정의/재정의
category: lang
tags:
  - OOP
  - 면접
level: 2
kind: concept
related:
  - inheritance-polymorphism
  - interface-abstract-class
  - static-dynamic-typing
  - class-instance
  - compiler-interpreter
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

**오버로딩**은 같은 이름·다른 매개변수로 여러 개 두기, **오버라이딩**은 부모 메서드를 자식이 다시 정의하기.

## 비유

**오버로딩**은 "주문" 이라는 같은 말을 "커피 한 잔" 이든 "커피, 사이즈 L" 이든 다 받아 주는 카운터. **오버라이딩**은 본점 매뉴얼을 물려받은 분점이 "인사말" 항목만 우리 동네식으로 고쳐 쓰는 것.

## 예시

```java
class Printer {
    void print(String s)        { System.out.println(s); }               // 오버로딩: 이름은 같고
    void print(String s, int n) { for (int i = 0; i < n; i++) print(s); } // 매개변수가 다르다
    String greet()              { return "hello"; }
}
class KoreanPrinter extends Printer {
    @Override String greet()    { return "안녕"; }                        // 오버라이딩: 부모 것을 재정의
}
Printer p = new KoreanPrinter();
p.print("x", 2);   // 어느 print 인지는 컴파일 시점에 인자 개수·타입으로 결정
p.greet();         // "안녕" — 변수 타입(Printer)이 아니라 실제 객체 기준으로 런타임에 결정
```

오버로딩은 **컴파일 시점**에 시그니처(이름 + 매개변수 목록)로 골라지고, 오버라이딩은 **런타임**에 실제 객체 타입으로 골라진다 — 그래서 다형성 얘기에 나오는 건 오버라이딩이다. Python 은 오버로딩이 없다. 같은 이름으로 두 번 정의하면 마지막 것이 덮어쓰므로, 기본 인자(`def show(s, n=1)`)나 `*args` 로 대신한다. TypeScript 는 시그니처만 여러 개 선언하고 구현은 하나만 쓰는 방식이다.

면접에선 "오버로딩과 오버라이딩의 차이는? 어느 쪽이 다형성인가?" 로 나온다 — 결정 시점(컴파일/런타임)과 관계(같은 클래스 안/부모-자식)를 짝지어 답한다.

## 헷갈리기 쉬운 것

- **오버라이딩 조건**: 이름·매개변수가 같아야 하고, 반환 타입은 같거나 하위 타입, 접근 제어자는 부모보다 좁힐 수 없다. `@Override` 를 붙이면 오타를 컴파일러가 잡아 준다.
- **반환 타입만 다른 오버로딩**은 안 된다. 호출 문장만 봐서는 어느 것을 골라야 할지 정할 수 없기 때문이다.
- **하이딩**: `static` 메서드나 필드를 자식이 같은 이름으로 만들면 오버라이딩이 아니라 가려지는 것이라, 변수 타입 기준으로 골라진다.
