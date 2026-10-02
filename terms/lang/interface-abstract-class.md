---
id: interface-abstract-class
term: 인터페이스/추상 클래스
aliases:
  - Interface / Abstract Class
  - 인터페이스
  - 추상 클래스
  - 추상클래스
  - 인터페이스와 추상 클래스의 차이
category: lang
tags:
  - OOP
  - TypeScript
level: 2
kind: concept
related:
  - abstraction
  - inheritance-polymorphism
  - overloading-overriding
  - typescript
  - dependency-injection
  - strategy-pattern
  - generics
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

**인터페이스**는 구현 없이 메서드 약속만, **추상 클래스**는 공통 구현을 일부 갖고 나머지를 자식에게 맡긴다.

## 비유

**인터페이스**는 USB 단자 규격 — 규격만 맞추면 마우스든 키보드든 꽂힌다. **추상 클래스**는 반쯤 조립된 가구 키트 — 뼈대는 이미 있고 손잡이만 각자 다니, 같은 뼈대를 쓰는 가족끼리만 쓴다.

## 예시

```java
interface Exportable {                                  // "할 수 있다"(can-do) — 약속
    String export();
    default String fileName() { return "card.txt"; }    // Java 8+: 기본 구현도 가능
}
abstract class Card {                                   // "~이다"(is-a) — 상태 + 공통 구현
    protected final String id;                          // 필드와 생성자를 가질 수 있다
    Card(String id) { this.id = id; }
    abstract String body();                             // 자식이 반드시 채울 것
    String render() { return "# " + id + "\n" + body(); }
}
class TermCard extends Card implements Exportable {     // extends 는 하나, implements 는 여럿 가능
    TermCard(String id) { super(id); }
    String body() { return "..."; }
    public String export() { return render(); }
}
```

| | 인터페이스 | 추상 클래스 |
|---|---|---|
| 관계 | 할 수 있다(can-do) — 서로 무관한 클래스에 같은 능력 | ~이다(is-a) — 가까운 계층끼리 코드 공유 |
| 여러 개 | `implements` 여러 개 가능 | `extends` 하나만 |
| 상태(필드)·생성자 | 없음(상수만) | 있음 |
| 구현 | Java 8 부터 `default` 메서드로 일부 가능 | 원래부터 가능 |

Java 8 의 `default` 메서드 이후 "구현이 있냐 없냐" 는 결정적 차이가 아니게 됐고, 남은 차이는 **상태·생성자·단일 상속**이다. TypeScript 의 `interface` 는 컴파일 후 사라지는 타입 검사용이라 객체 리터럴도 모양만 맞으면 통과하고(구조적 타이핑), Python 은 `abc.ABC` 가 추상 클래스, `typing.Protocol` 이 인터페이스에 가깝다.

면접에선 "인터페이스와 추상 클래스의 차이는? 언제 뭘 쓰나?" 로 나온다 — 무관한 클래스들에 공통 능력을 주려면 인터페이스, 밀접한 계층에서 코드를 나눠 쓰려면 추상 클래스라고 답한다.

## 헷갈리기 쉬운 것

- **일반 상속**: 추상 클래스는 `new` 할 수 없고, 미구현 메서드를 자식이 채우도록 강제한다는 점이 다르다.
- **TS 의 `type` 과 `interface`**: 둘 다 객체 모양을 적지만 `interface` 만 `extends` 와 선언 병합이 되고, `type` 은 유니온 같은 조합에 쓴다.
- **다중 상속**: Java 가 클래스 다중 상속을 막고 인터페이스 다중 구현만 허용하는 이유는, 같은 이름의 구현이 둘 있을 때 어느 것을 쓸지 모호해지기 때문이다(다이아몬드 문제).
