---
id: rdbms
term: RDBMS
aliases:
  - Relational Database Management System
  - 관계형 데이터베이스
  - 관계형 DB
category: database
tags:
  - 관계형
  - SQL
level: 1
related:
  - sql
  - primary-foreign-key
  - join
  - nosql
  - erd
see_also:
  - https://www.postgresql.org/docs/current/tutorial-concepts.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

데이터를 **행과 열로 된 표(테이블)** 에 담고 표끼리 **관계**로 잇는 데이터베이스.

## 비유

엑셀 시트 여러 장이 서로 연결된 **장부**. 학생 명단 시트와 수강 시트를 학번으로 이어 붙여서 보는 식이다.

## 예시

Ender Chest 가 쓰는 Supabase 의 속은 PostgreSQL 이라는 RDBMS 다.

```sql
CREATE TABLE users (id uuid PRIMARY KEY, email text NOT NULL);
CREATE TABLE items (id serial PRIMARY KEY, owner_id uuid REFERENCES users(id), name text);

-- 두 표를 관계(owner_id)로 이어서 한 번에 조회
SELECT u.email, i.name FROM items i JOIN users u ON u.id = i.owner_id;
```

대표 제품: PostgreSQL, MySQL, SQLite, Oracle. 셋 다 같은 SQL 을 알아듣는다.

## 헷갈리기 쉬운 것

- **SQL** 은 RDBMS 에게 말을 거는 언어, RDBMS 는 그 언어를 알아듣고 실행하는 프로그램(Postgres, MySQL).
- **NoSQL** 은 표·관계 대신 문서·키-값 등 다른 모양으로 담는 DB 들의 총칭. "SQL 을 못 쓴다" 는 뜻이 아니다.
