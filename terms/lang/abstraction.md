---
id: abstraction
term: 추상화
aliases:
  - Abstraction
  - 추상화 (OOP)
  - OOP 4대 특징
  - 데이터 추상화
category: lang
tags:
  - OOP
  - 설계원칙
level: 2
kind: concept
related:
  - inheritance-polymorphism
  - interface-abstract-class
  - oop
  - solid
  - api
  - generics
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

대상에서 **필요한 특징만 뽑아** '무엇을 하는지'로 나타내고 '어떻게'는 숨기는 것.

## 비유

자동차의 **운전대와 페달**. 엔진이 가솔린이든 전기든 운전자는 "밟으면 간다" 만 알면 되고, 지하철 노선도가 실제 선로 모양을 지우고 역과 순서만 남긴 것도 같은 추상화다.

## 예시

```python
from abc import ABC, abstractmethod

class CardStore(ABC):                     # 무엇을 하는지만 — 읽고 저장한다
    @abstractmethod
    def get(self, id: str) -> dict: ...
    @abstractmethod
    def save(self, card: dict) -> None: ...
class FileStore(CardStore):               # 어떻게 1 — terms/*.md 파일
    def get(self, id): ...
    def save(self, card): ...
class SupabaseStore(CardStore):           # 어떻게 2 — Postgres 테이블
    def get(self, id): ...
    def save(self, card): ...
def publish(store: CardStore, id: str):   # 호출자는 어느 쪽인지 모른다
    card = store.get(id); card["status"] = "published"; store.save(card)
```

`publish` 는 파일이든 DB 든 모르고 `get`/`save` 만 안다. 저장소를 Supabase 로 바꿔도 `publish` 는 한 글자도 안 고치는 것이 추상화의 이득이다. 클래스 문법이 없어도 추상화는 있다 — `readFile` 위에 `loadCard`, 그 위에 `publish` 처럼 **함수 이름 한 층이 곧 추상화 한 층**이고, REST API 가 DB 스키마 대신 `/terms/{id}` 만 보여 주는 것도 같다. 상속·다형성·캡슐화와 함께 OOP 4대 특징으로 묶인다.

면접에선 "추상화와 캡슐화의 차이는?" 이 단골이다 — 추상화는 **무엇을 드러낼지 고르는 설계** 관점, 캡슐화는 **내부를 못 만지게 막는 구현** 관점이라고 답한다.

## 헷갈리기 쉬운 것

- **캡슐화**: 데이터를 `private` 으로 감추고 메서드로만 다루게 하는 것. 추상화가 "필요한 것만 보여 주자" 는 결정이면, 캡슐화는 그 결정을 지키게 하는 수단이다.
- **추상 클래스/인터페이스**: 추상화를 언어 문법으로 적는 도구 중 하나일 뿐이다. 잘 지은 함수 이름, API 문서도 추상화다.
- **일반화(상속)**: 공통점을 부모 클래스로 끌어올리는 것. 추상화는 부모 클래스 없이도 할 수 있다.
