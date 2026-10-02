---
id: metaprogramming
term: 메타프로그래밍
aliases:
  - Metaprogramming
  - 메타 프로그래밍
  - 코드를 만드는 코드
  - 메타클래스
  - Metaclass
category: lang
tags:
  - Python
  - TypeScript
  - 타입
level: 3
kind: concept
related:
  - decorator
  - class-instance
  - generics
  - orm
  - validation
  - typescript
see_also:
  - https://docs.python.org/ko/3/reference/datamodel.html#metaclasses
  - https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

코드가 **다른 코드를 읽고 만들고 바꾸는** 프로그래밍으로, 클래스와 타입 자체가 재료가 된다.

## 비유

**붕어빵 틀을 찍어 내는 기계**. 붕어빵(객체)을 굽는 틀이 클래스라면, 메타프로그래밍은 그 틀 자체를 규칙대로 뽑아내는 기계라서 틀 100개를 손으로 깎는 대신 규칙 하나로 끝낸다.

## 예시

```python
# 1) 클래스가 "정의되는 순간" 에 끼어들어 자동 등록 — 플러그인·모델 레지스트리의 기본 뼈대
REGISTRY: dict[str, type] = {}

class Exporter:
    def __init_subclass__(cls, fmt: str, **kw):     # 자식 클래스가 만들어질 때마다 호출된다
        super().__init_subclass__(**kw)
        REGISTRY[fmt] = cls

class CsvExporter(Exporter, fmt="csv"): ...
class FhirExporter(Exporter, fmt="fhir"): ...

print(REGISTRY)      # {'csv': <class '__main__.CsvExporter'>, 'fhir': <class '__main__.FhirExporter'>}

# 2) 클래스를 함수 호출로 찍어 내기 — class 문도 결국 type(이름, 부모들, 속성들) 호출이다
Vital = type("Vital", (), {"fields": ("hr", "spo2")})
print(Vital.fields)  # ('hr', 'spo2')
```

```ts
// 타입 수준 메타프로그래밍 — 기존 타입을 재료로 새 타입을 "계산" 한다
type Patient = { mrn: string; name: string; birth: Date }
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] }
type PatientGetters = Getters<Patient>
// → { getMrn: () => string; getName: () => string; getBirth: () => Date }  — 컴파일러가 만들어 준다
```

매일 쓰는 것들이 이미 메타프로그래밍이다 — `@dataclass` 는 필드 선언을 읽어 `__init__`·`__eq__` 를 써 주고, pydantic·SQLAlchemy 모델은 타입 힌트를 읽어 검증기와 테이블을 만들며, TS 의 `Partial<T>`·`Pick<T, K>` 는 타입을 받아 타입을 돌려주는 함수다. 파이썬에서는 데코레이터 → `__init_subclass__` → 메타클래스(`class Meta(type)`) 순으로 강해지고, 강할수록 "이 코드가 어디서 생겼는지" 가 숨는다. 트레이드오프 — 선언만 하면 동작하는 깔끔한 API 를 만들 수 있지만, 앱 코드에서 남용하면 IDE 점프·디버거·타입 검사기가 길을 잃고 신입이 못 읽는다. 라이브러리를 만들 때 쓰는 도구로 보고, 앱 코드에서는 데코레이터 선에서 멈추는 편이 낫다.

## 헷갈리기 쉬운 것

- **데코레이터**: 메타프로그래밍의 가장 흔하고 가벼운 형태다. 함수·클래스를 받아 바꿔치기하는 것까지는 데코레이터, 클래스가 만들어지는 과정 자체를 바꾸는 것부터가 메타클래스 영역.
- **리플렉션**(`getattr`, `inspect`, Java Reflection): 실행 중에 코드의 구조를 **읽기만** 하는 것. 읽어서 새 코드를 만들거나 고치면 메타프로그래밍이고, 리플렉션은 그 재료다.
- **코드 생성기**(OpenAPI → 클라이언트 코드, protobuf 컴파일러): 빌드 전에 **파일로** 코드를 뽑아 둔다. 산출물이 눈에 보여 디버깅이 쉽고, 메타프로그래밍은 언어 안에서 실행·컴파일 중에 일어나 눈에 안 보인다.
