---
id: dependency-inversion
term: 의존성 역전(DIP)
aliases:
  - Dependency Inversion Principle
  - DIP
  - 의존성 역전 원칙
  - 의존 관계 역전
category: swe
tags:
  - 설계원칙
  - OOP
  - 아키텍처패턴
  - 테스트
level: 3
kind: concept
related:
  - solid
  - dependency-injection
  - interface-abstract-class
  - clean-architecture
  - layered-architecture
  - coupling-cohesion
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

중요한 코드가 세부 구현을 직접 부르지 않고 **스스로 정한 인터페이스**만 보게 하는 원칙.

## 비유

**벽의 콘센트 규격**. 집이 특정 회사 세탁기에 맞춰 배선을 바꾸는 게 아니라 집이 220V 규격을 정해 두고 세탁기 회사가 거기에 맞추니, 세탁기를 바꿔도 벽을 뜯지 않는다.

## 예시

```python
from typing import Protocol

# 업무 규칙(위층)이 "내게 필요한 건 이것뿐" 하고 인터페이스를 정한다
class PatientRepo(Protocol):
    def find(self, mrn: str) -> dict: ...

class DischargeSummary:                       # 위층 — 이 파일에 PostgreSQL 이란 단어가 없다
    def __init__(self, repo: PatientRepo):
        self.repo = repo
    def build(self, mrn: str) -> str:
        return f"{self.repo.find(mrn)['name']} 님 퇴원 요약"

# 세부 구현(아래층)이 위층이 정한 규격에 맞춘다 — 의존 화살표가 뒤집혔다
class PostgresPatientRepo:
    def find(self, mrn: str) -> dict: ...     # psycopg 로 SELECT
class CsvPatientRepo:                         # 폐쇄망 밖에서 테스트할 때
    def find(self, mrn: str) -> dict: ...
```

보통은 `DischargeSummary` 가 `PostgresPatientRepo` 를 import 한다 — 위가 아래를 안다. DIP 는 인터페이스를 **위층 쪽에 두어** 아래층이 위층을 바라보게 만든다. 그래서 "역전"이다. 얻는 것: 업무 규칙을 DB 없이 테스트하고, DB 를 바꿔도 위층은 손대지 않는다. 내주는 것: 파일과 추상이 하나 더 생기고, 코드를 읽을 때 점프가 한 번 늘어난다. 트레이드오프: 구현이 하나뿐이고 바뀔 일도 없다면(pandas 로 끝나는 분석 스크립트) 인터페이스는 YAGNI 다 — DB·외부 API·LLM 공급자처럼 **바뀔 가능성이 있는 경계**에만 건다.

## 헷갈리기 쉬운 것

- **의존성 주입(DI)** 은 기법, DIP 는 원칙. DIP 가 "추상에 의존하라"고 하면, DI 는 그 추상 자리에 실제 객체를 밖에서 넣어 주는 방법이다. DIP 없이 DI 만 하면 구체 클래스를 밖에서 넣는 것일 뿐이다.
- **제어의 역전(IoC)** 은 "내 코드가 프레임워크를 부르는 게 아니라 프레임워크가 내 코드를 부른다"는 흐름의 역전. DIP 는 import 방향의 역전이다.
- **레이어드 아키텍처**는 의존이 위에서 아래로 흐른다. 여기에 DIP 를 적용해 아래층이 위층 인터페이스를 구현하게 만든 것이 클린 아키텍처다.
