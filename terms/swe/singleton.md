---
id: singleton
term: 싱글톤 패턴
aliases:
  - Singleton Pattern
  - 싱글턴
  - 싱글톤
  - 단일 인스턴스
category: swe
tags:
  - 디자인패턴
  - OOP
level: 2
kind: pattern
related:
  - design-pattern
  - dependency-injection
  - connection-pool
  - factory-pattern
  - thread
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

클래스의 인스턴스를 **딱 하나만 만들고** 어디서든 그것을 꺼내 쓰게 하는 패턴.

## 비유

건물의 **중앙 보일러**. 방마다 보일러를 놓지 않고 하나만 두고 전 층이 같이 쓰니 관리가 쉽지만, 그게 고장 나면 모든 방이 같이 춥다.

## 예시

```ts
class OllamaClient {
  private static instance?: OllamaClient
  private constructor(readonly baseUrl: string) {}         // 밖에서 new 못 하게 막는다
  static get(): OllamaClient {
    return (this.instance ??= new OllamaClient('http://gpu-server:11434'))  // 처음 한 번만 생성
  }
  ask(prompt: string) { return fetch(`${this.baseUrl}/api/generate`, { method: 'POST', body: prompt }) }
}
OllamaClient.get() === OllamaClient.get()   // true — 어디서 불러도 같은 객체
```

DB 커넥션 풀·설정 객체·로거처럼 **여러 개 있으면 낭비거나 위험한 것**에 쓴다. Spring 은 빈의 기본 스코프가 싱글톤이라 `@Service` 하나당 인스턴스가 하나이고, Python 은 모듈이 한 번만 import 되므로 `config.py` 자체가 싱글톤 노릇을 한다 — 직접 이 코드를 쓸 일은 생각보다 드물다. 단점은 사실상 **전역 상태**라는 것이다. 어디서 값을 바꿨는지 추적이 어렵고 테스트에서 가짜로 갈아끼우기 힘들어서, 요즘은 "인스턴스는 하나로 만들되 DI 로 넣어 준다" 는 절충을 쓴다.

면접에선 "싱글톤의 단점은? 멀티스레드에서 안전하게 만들려면?" 이 단골이다 — 두 스레드가 동시에 처음 `get()` 을 부르면 둘 다 만들 수 있으니 잠금(double-checked locking)이나 클래스 로딩 시 생성(Java 의 enum·static holder)으로 막는다고 답한다.

## 헷갈리기 쉬운 것

- **전역 변수**: 싱글톤은 생성 시점을 늦출 수 있고(lazy) 생성 자체를 클래스가 통제한다는 점만 다르고, 단점은 거의 같다.
- **정적(static) 유틸 클래스**: 상태 없이 함수만 모아 둔 것. 싱글톤은 상태를 갖고 인터페이스 구현·다형성이 가능하다.
- **커넥션 풀**: 싱글톤인 "풀" 하나가 커넥션 여러 개를 관리하는 것. 커넥션 자체가 하나인 건 아니다.
