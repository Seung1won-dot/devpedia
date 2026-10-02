---
id: coupling-cohesion
term: 결합도/응집도
aliases:
  - Coupling
  - Cohesion
  - 결합도
  - 응집도
  - 낮은 결합도 높은 응집도
  - Loose Coupling
category: swe
tags:
  - 설계원칙
  - 아키텍처
  - 면접
level: 2
kind: concept
related:
  - solid
  - dependency-injection
  - dependency-inversion
  - layered-architecture
  - microservices
  - code-smell
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

결합도는 모듈이 **서로 얼마나 얽혀 있나**, 응집도는 한 모듈 안이 **얼마나 한 가지 일에 모여 있나**.

## 비유

이사할 때 상자 싸기. 상자 하나에 **부엌 물건만** 들어 있고(응집도 높음), 상자끼리 끈으로 묶여 있지 않아 **하나만 따로 옮길 수 있으면**(결합도 낮음) 잘 싼 것이다.

## 예시

```python
# 결합도 높고 응집도 낮음 — 리포트가 DB 주소·테이블 구조·메일 발송까지 다 안다
class Report:
    def build(self):
        conn = psycopg.connect("postgresql://lab:pw@10.0.0.5/emr")  # 설정이 코드에 박힘
        rows = conn.execute("SELECT * FROM vitals_v3").fetchall()    # 테이블이 바뀌면 여기도 고침
        self.send_email(rows)                                        # 표 만들기와 상관없는 일

# 결합도 낮추고 응집도 높임 — 리포트는 "데이터 → 표" 하나만 책임진다
class Report:
    def __init__(self, repo: VitalsRepository):   # 구체 DB 가 아니라 인터페이스에 의존 (DI)
        self.repo = repo

    def build(self) -> Table:
        return to_table(self.repo.latest())
# DB 접근은 VitalsRepository, 발송은 Notifier 가 각자 맡는다
```

둘은 보통 같이 움직인다 — 한 모듈이 여러 일을 하면(응집도 낮음) 그만큼 많은 곳과 얽힌다(결합도 높음). 결합도를 낮추는 손잡이는 인터페이스에 의존하기, 의존성 주입, 설정 바깥으로 빼기, 직접 호출 대신 이벤트. 가늠자는 **테스트 가능성**이다: `Report` 를 테스트하려고 진짜 PostgreSQL 을 띄워야 한다면 결합도가 높은 것. 다만 결합도를 0 에 가깝게 밀어붙이면 추상 계층만 늘어 코드가 더 어려워지니(YAGNI), 바뀔 가능성이 있는 경계(DB·외부 API·UI)에서만 끊는다. 면접 단골 "좋은 설계란?" 의 모범 답이 "낮은 결합도, 높은 응집도" 다.

## 헷갈리기 쉬운 것

- **응집도 높음 ≠ 한 파일에 다 모으기**: 응집은 **관련된 것끼리** 모으는 것. 관계없는 것까지 한 곳에 몰면 God Object 라는 반대 냄새가 된다.
- **의존성 주입**은 결합도를 낮추는 **기법** 중 하나, 결합도는 그 결과를 재는 **성질**이다.
- **마이크로서비스**는 서비스 단위로 결합도를 낮추려는 아키텍처. 경계를 잘못 자르면 네트워크 너머로 강하게 얽힌 "분산 모놀리스" 가 되어 더 나빠진다.
