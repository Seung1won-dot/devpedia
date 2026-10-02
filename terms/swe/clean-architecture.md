---
id: clean-architecture
term: 클린 아키텍처
aliases:
  - Clean Architecture
  - 헥사고날 아키텍처
  - Hexagonal Architecture
  - 포트와 어댑터
  - 어니언 아키텍처
category: swe
tags:
  - 아키텍처패턴
  - 설계원칙
  - 테스트
  - 아키텍처
level: 3
kind: pattern
related:
  - layered-architecture
  - dependency-inversion
  - ddd
  - dependency-injection
  - clean-code
  - testing-levels
see_also:
  - https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

업무 규칙을 한가운데 두고 **DB·웹·화면이 바깥에서 안쪽만 바라보게** 쌓는 구조.

## 비유

**양파**. 가운데 알맹이(업무 규칙)는 바깥 껍질이 뭔지 모르고 껍질(DB·화면)이 알맹이에 맞춰 붙기 때문에, 껍질을 바꿔도 알맹이는 그대로다.

## 예시

```text
src/
  domain/      # 엔티티·규칙: Patient, "퇴원 후 30일 내 재입원" 판정      — import 없음
  usecase/     # 흐름: ReadmissionReport(repo: PatientRepo)             — domain 만 import
  adapter/     # 바깥: FastAPI 라우터, PostgresPatientRepo, CsvPatientRepo — usecase 의 인터페이스를 구현
  main.py      # 조립: ReadmissionReport(PostgresPatientRepo(dsn))       — 전부를 아는 유일한 곳
```

```bash
# 규칙은 하나: import 는 바깥에서 안쪽으로만. 이 명령의 결과가 비어 있어야 한다
grep -rn "fastapi\|psycopg\|sqlalchemy" src/domain src/usecase
```

얻는 것: 재입원 판정 규칙을 DB·웹 서버 없이 바로 테스트하고, pgvector 를 Chroma 로 바꿔도 adapter 하나만 갈아 끼운다. 내주는 것: 파일 수가 두세 배, 단순 CRUD 하나에도 네 파일, 층 사이에서 같은 데이터를 다른 객체로 옮기는 변환 코드. **3명이 6개월 하는 연구실 과제라면 쓰지 말 것** — 레이어드로 충분하고, 과한 구조는 신입이 코드 찾는 시간만 늘린다. 쓸 때는 규칙이 복잡하고 오래 살아야 하며(의료기기 소프트웨어처럼), EMR 연동 방식이나 LLM 공급자가 바뀔 것이 확실할 때다.

## 헷갈리기 쉬운 것

- **레이어드 아키텍처**는 Service 가 Repository 구체 클래스를 직접 안다. 클린은 인터페이스를 안쪽에 두어 방향을 뒤집은 것 — 레이어드에 DIP 하나를 더한 구조라고 봐도 된다.
- **헥사고날·어니언**은 그림만 다를 뿐 같은 생각(의존은 안쪽으로). 포트가 인터페이스, 어댑터가 구현이다.
- **클린 코드**는 함수·이름 수준의 읽기 좋은 코드, 클린 아키텍처는 폴더·의존 방향 수준. 같은 저자의 책 제목이라 자주 섞인다.
- **DDD** 는 domain 폴더에 무엇을 담을지(모델링), 클린 아키텍처는 그 domain 을 어디 두고 어떻게 보호할지(구조).
