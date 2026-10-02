---
id: dependency-injection
term: 의존성 주입(DI)
aliases:
  - Dependency Injection
  - DI
  - 의존성 주입
  - 제어의 역전
  - IoC
  - Inversion of Control
category: swe
tags:
  - 설계원칙
  - 테스트
  - 아키텍처패턴
level: 2
kind: pattern
related:
  - solid
  - testing-levels
  - singleton
  - interface-abstract-class
  - strategy-pattern
  - web-framework
  - coupling-cohesion
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

객체가 필요한 부품을 **안에서 직접 만들지 않고 밖에서 넣어 받는** 방식.

## 비유

**배터리를 끼워 쓰는 전자제품**. 배터리를 안에 납땜해 버리면 다른 배터리로 못 바꾸지만, 배터리 칸을 만들어 두면 알카라인이든 충전지든 밖에서 끼워 준다.

## 예시

```python
class ReportService:
    def __init__(self, store, llm):        # 생성자 주입 — 밖에서 넣어 준다
        self.store, self.llm = store, llm  # 안에서 SupabaseStore() 를 만들지 않는다
    def summarize(self, id):
        return self.llm.ask(f"요약해줘: {self.store.get(id)['body']}")

# 운영 — 진짜 부품을 조립해서 넣는다 (이 조립을 대신 해 주는 게 IoC 컨테이너)
svc = ReportService(SupabaseStore(url), OllamaClient("qwen3:8b"))

# 테스트 — DB 도 GPU 도 없이 가짜를 넣는다
class FakeStore:  get = lambda self, id: {"body": "데드락은 ..."}
class FakeLLM:    ask = lambda self, p: "요약문"
assert ReportService(FakeStore(), FakeLLM()).summarize("deadlock") == "요약문"
```

`ReportService` 안에서 `SupabaseStore()` 를 직접 만들면 그 클래스에 묶여서, 테스트 한 번 돌리려 해도 DB 가 떠 있어야 한다. 밖에서 넣어 주면 **교체와 테스트가 쉬워지고 결합도가 내려간다** — SOLID 의 D(의존성 역전)를 실천하는 가장 손쉬운 방법이다. Spring 은 이 "조립" 을 컨테이너가 대신한다. `@Service` 로 등록된 빈들을 생성자 매개변수 타입을 보고 자동으로 넣어 주며, NestJS 의 프로바이더나 FastAPI 의 `Depends()` 도 같은 생각이다.

면접에선 "DI 가 뭐고 왜 쓰나? IoC 와는 무슨 관계인가?" 로 나온다 — 테스트 용이성과 결합도를 먼저 말하고, 생성자 주입을 권장하는 이유(필수 의존성이 드러나고 불변으로 만들 수 있음)까지 붙이면 좋다.

## 헷갈리기 쉬운 것

- **IoC(제어의 역전)**: "객체를 만들고 조립하는 주도권이 내 코드에서 프레임워크로 넘어간다" 는 더 큰 원칙. DI 는 그것을 실현하는 대표 기법이다.
- **DIP(의존성 역전 원칙)**: 구체 클래스가 아니라 추상(인터페이스)에 의존하라는 SOLID 원칙. DI 는 그 추상 자리에 실제 객체를 넣어 주는 방법이다.
- **서비스 로케이터**: 객체가 스스로 "저장소 주세요" 하고 전역 저장소에서 꺼내 오는 방식. 의존이 시그니처에 안 드러나 DI 보다 테스트가 어렵다.
