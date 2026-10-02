---
id: crud
term: CRUD
aliases:
  - Create Read Update Delete
  - 크루드
  - 생성·조회·수정·삭제
category: database
tags:
  - SQL
  - REST
  - API설계
level: 1
kind: concept
related:
  - sql
  - rest
  - http-methods
  - orm
  - soft-delete
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/CRUD
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

데이터를 다루는 네 가지 기본 동작 **만들기·읽기·고치기·지우기**의 머리글자.

## 비유

수첩으로 할 수 있는 일은 결국 네 가지뿐이다 — 새 줄 적기, 읽기, 고쳐 쓰기, 줄 긋기. 어떤 앱이든 데이터 쪽 일은 이 네 동작의 조합이다.

## 예시

```sql
INSERT INTO patients (mrn, name) VALUES ('P-001', '홍길동');   -- C: Create
SELECT * FROM patients WHERE mrn = 'P-001';                   -- R: Read
UPDATE patients SET name = '홍길순' WHERE mrn = 'P-001';       -- U: Update
DELETE FROM patients WHERE mrn = 'P-001';                      -- D: Delete
```

REST API 에서는 같은 네 동작이 `POST` / `GET` / `PUT`(또는 `PATCH`) / `DELETE` 메서드로 대응된다. "환자 CRUD API 만들어 줘" 는 FastAPI 에 이 네 엔드포인트를 만들라는 뜻이고, ORM 의 `create()` `get()` `update()` `delete()` 도 결국 위 SQL 네 줄을 대신 써 주는 것이다. 어떤 기능 요구를 받든 "이건 어느 표에 대한 C·R·U·D 인가" 로 쪼개 보면 설계가 시작된다.

## 헷갈리기 쉬운 것

- **REST** 는 CRUD 를 HTTP 로 표현하는 한 가지 규칙. CRUD 는 동작의 분류이고, REST 는 그걸 URL 과 메서드에 어떻게 얹을지 정한 설계 스타일이다.
- **UPSERT** 는 "있으면 U, 없으면 C" 를 한 번에 하는 것. PostgreSQL 에서는 `INSERT ... ON CONFLICT DO UPDATE`.
- 실무의 **D 는 진짜 지우지 않는 경우**가 많다. `deleted_at` 만 찍는 소프트 딜리트는 SQL 로는 UPDATE 지만 사용자에겐 삭제로 보인다.
