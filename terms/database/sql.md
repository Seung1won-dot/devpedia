---
id: sql
term: SQL
aliases:
  - Structured Query Language
  - 구조적 질의 언어
  - 에스큐엘
  - 시퀄
category: database
tags:
  - SQL
  - 관계형
level: 1
kind: concept
related:
  - rdbms
  - join
  - index
  - sql-injection
  - orm
  - group-by-aggregate
  - query-plan
see_also:
  - https://www.postgresql.org/docs/current/sql.html
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

관계형 DB 에 데이터를 **넣고·찾고·고치고·지우라고** 지시하는 표준 언어.

## 비유

도서관 사서에게 건네는 **정해진 양식의 요청서**. "2020년 이후 나온 AI 책 제목만 주세요" 를 누구나 같은 형식으로 적으면 어느 도서관이든 알아듣는다.

## 예시

```sql
-- Ender Chest: 특정 사용자의 아이템을 최근 순으로 20개
SELECT name, created_at
FROM items
WHERE owner_id = 'a1b2c3d4-...'
ORDER BY created_at DESC
LIMIT 20;
```

Supabase 대시보드의 SQL Editor 나 터미널의 `psql` 에 그대로 붙여 넣으면 실행된다. 네 동사만 알면 시작할 수 있다: `SELECT`(찾기) `INSERT`(넣기) `UPDATE`(고치기) `DELETE`(지우기).

## 헷갈리기 쉬운 것

- **NoSQL** 은 "SQL 을 안 쓴다" 가 아니라 표 형태가 아닌 DB 의 통칭. 일부 NoSQL 은 SQL 과 닮은 질의 언어를 따로 가진다(Cassandra 의 CQL).
- **ORM** 은 SQL 을 직접 안 쓰고 코드(객체)로 DB 를 다루게 해 주는 도구. 뒤에서는 결국 SQL 을 만들어 보낸다.
