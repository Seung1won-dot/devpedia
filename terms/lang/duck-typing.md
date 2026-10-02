---
id: duck-typing
term: 덕 타이핑
aliases:
  - Duck Typing
  - 오리 타이핑
  - typing.Protocol
  - 프로토콜(Python)
  - 오리처럼 걸으면 오리
category: lang
tags:
  - 타입
  - Python
  - OOP
level: 2
kind: concept
related:
  - interface-abstract-class
  - structural-typing
  - static-dynamic-typing
  - type-hint
  - inheritance-polymorphism
see_also:
  - https://docs.python.org/ko/3/glossary.html#term-duck-typing
  - https://docs.python.org/ko/3/library/typing.html#typing.Protocol
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

어떤 클래스인지 묻지 않고 **필요한 메서드만 갖추고 있으면** 그 타입으로 쳐주는 방식.

## 비유

"**오리처럼 걷고 오리처럼 꽥꽥거리면 오리다**"라는 말에서 온 이름. 혈통서(어느 클래스를 상속했나)를 보는 대신 "그 일을 할 줄 아나"만 보고 자리를 주는 채용이다.

## 예시

```python
from typing import Protocol

class RowSource(Protocol):                  # "상속하라" 가 아니라 "이 모양이면 된다" 는 약속
    def read_rows(self) -> list[dict]: ...

class CsvSource:                            # RowSource 를 상속하지 않았다
    def __init__(self, path: str) -> None:
        self.path = path
    def read_rows(self) -> list[dict]:
        import csv
        with open(self.path, newline="", encoding="utf-8") as f:
            return list(csv.DictReader(f))

class FhirSource:                           # 역시 상속 없음 — 메서드 이름과 시그니처만 같다
    def read_rows(self) -> list[dict]:
        return [{"mrn": "A001", "hr": 72}]

def count_rows(src: RowSource) -> int:      # 둘 다 들어가고, pyright 도 통과시킨다
    return len(src.read_rows())

print(count_rows(FhirSource()))             # 1
```

파이썬은 원래 이렇게 돈다 — `len(x)` 는 `x` 에 `__len__` 만 있으면 되고, `for` 문은 `__iter__` 만 있으면 리스트든 DataFrame 이든 내 클래스든 가리지 않는다. 문제는 메서드가 없을 때 **실행해 봐야** `AttributeError` 로 터진다는 것인데, `Protocol` 은 그 "오리의 조건" 을 타입 힌트로 적어 두어 pyright/mypy 가 실행 전에 걸러 주게 한다. 상속 선언이 없으니 pandas 의 DataFrame 처럼 **내가 못 고치는 외부 클래스**도 모양만 맞으면 그대로 끼울 수 있다.

## 헷갈리기 쉬운 것

- **인터페이스/추상 클래스**(`abc.ABC`): 자식이 `class Csv(Base)` 처럼 **명시적으로 상속**해야 하고, 추상 메서드를 안 채우면 인스턴스를 만들 때 막힌다. 덕 타이핑은 선언 없이 모양만 보는 대신 "이 클래스는 이 역할용" 이라는 의도가 코드에 안 남는다.
- **구조적 타이핑**: 같은 생각을 **컴파일 시점**에 검사기가 하는 것. TypeScript 가 그렇고, 파이썬의 `Protocol` 은 덕 타이핑 위에 구조적 검사를 얹은 셈이다.
- **동적 타입**: 덕 타이핑은 동적 언어에서 자연스럽지만 같은 말은 아니다 — Go 는 정적 언어인데도 인터페이스를 `implements` 없이 모양만으로 만족시킨다.
