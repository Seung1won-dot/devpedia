---
id: factory-pattern
term: 팩토리 패턴
aliases:
  - Factory Pattern
  - 팩토리 메서드
  - Factory Method
  - 추상 팩토리
  - Abstract Factory
  - 팩터리 패턴
category: swe
tags:
  - 디자인패턴
  - OOP
level: 2
kind: pattern
related:
  - design-pattern
  - singleton
  - strategy-pattern
  - dependency-injection
  - abstraction
  - interface-abstract-class
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

객체를 **`new` 로 직접 만들지 않고** 만들어 주는 함수나 클래스에 맡기는 패턴.

## 비유

**"오늘의 메뉴" 주문**. 손님이 재료를 골라 직접 조리하지 않고 이름만 대면 주방이 알아서 만들어 주니, 레시피가 바뀌어도 손님 쪽은 그대로다.

## 예시

```ts
interface LlmClient { ask(prompt: string): Promise<string> }
class OllamaClient implements LlmClient { /* 로컬 Qwen */ }
class OpenAiClient implements LlmClient { /* 외부 API */ }

// 팩토리 — new 가 이 한 곳에만 있다
export function createLlm(kind = process.env.LLM ?? 'ollama'): LlmClient {
  switch (kind) {
    case 'ollama': return new OllamaClient('http://gpu-server:11434')
    case 'openai': return new OpenAiClient(process.env.OPENAI_KEY!)
    default: throw new Error(`unknown LLM: ${kind}`)
  }
}
const llm = createLlm()   // 호출자는 어느 구현인지 모른다 — 인터페이스만 쓴다
```

`new OllamaClient(url)` 이 코드 스무 군데에 흩어져 있으면 생성자 인자 하나 바뀔 때 스무 군데를 고친다. 팩토리에 모아 두면 **한 곳만 고치고**, 환경 변수 하나로 구현을 통째로 갈아끼운다. Java 의 `List.of()`, `LocalDate.of()` 같은 정적 팩토리 메서드도 같은 정신이다 — 이름으로 의도를 드러내고, 캐시해 둔 객체나 하위 타입을 돌려줄 수 있다. 종류는 둘로 나눈다. **팩토리 메서드**는 부모가 `create()` 를 추상으로 두고 자식이 무엇을 만들지 정하는 것(제품 한 종류), **추상 팩토리**는 서로 어울리는 객체 여러 개(버튼 + 창 + 메뉴)를 한 세트로 만드는 팩토리 인터페이스다.

면접에선 "팩토리 메서드와 추상 팩토리의 차이는?" 으로 나온다 — 하나를 만드느냐, 짝이 맞는 제품군을 만드느냐로 답한다.

## 헷갈리기 쉬운 것

- **빌더 패턴**: 인자가 많은 객체를 `.name().level().build()` 처럼 단계별로 채운다. 팩토리는 "어떤 클래스를" 고르는 데, 빌더는 "어떻게 채울지" 에 관심이 있다.
- **DI 컨테이너**: 팩토리 역할을 프레임워크가 대신하는 것. Spring 의 `@Bean` 메서드는 사실상 팩토리 메서드다.
- **전략 패턴**: 만들어진 객체를 "골라 쓰는" 쪽. 팩토리가 만들고 전략으로 쓴다 — 둘은 자주 짝을 이룬다.
