---
id: primary-foreign-key
term: 기본키/외래키
aliases:
  - Primary Key / Foreign Key
  - PK/FK
  - 주키
  - 참조키
category: database
tags:
  - 관계형
  - SQL
level: 1
kind: concept
related:
  - rdbms
  - join
  - erd
  - index
  - normalization
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

기본키는 **행 하나를 유일하게 구분하는 값**, 외래키는 **다른 표의 기본키를 가리키는 값**.

## 비유

기본키는 **주민등록번호**, 외래키는 다른 서류의 "보호자 주민번호" 칸. 그 번호를 따라가면 어느 사람인지 정확히 한 명이 나온다.

## 예시

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);
CREATE TABLE items (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
```

`REFERENCES` 가 외래키다. 없는 사용자 id 로 아이템을 넣으려 하면 DB 가 거절하고, 사용자를 지우면 아이템도 같이 지워진다(`ON DELETE CASCADE`). Supabase 에서는 `auth.users(id)` 를 가리키게 두는 게 보통이다.

## 헷갈리기 쉬운 것

- **UNIQUE 제약**은 "중복 금지" 만. 기본키는 UNIQUE + NOT NULL 이고 표당 하나뿐이다.
- **인덱스**는 빨리 찾기 위한 장치. 기본키엔 자동으로 인덱스가 붙지만, 외래키엔 Postgres 가 자동으로 붙여 주지 않아 직접 만들어야 한다.
