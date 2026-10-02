---
id: constraint
term: 제약조건
aliases:
  - Constraint
  - NOT NULL
  - UNIQUE
  - CHECK
  - 무결성 제약
category: database
tags:
  - 관계형
  - SQL
  - 데이터
level: 1
kind: concept
related:
  - primary-foreign-key
  - schema
  - validation
  - data-validation
  - rdbms
  - trigger-procedure
see_also:
  - https://www.postgresql.org/docs/current/ddl-constraints.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

표에 들어오는 값이 지켜야 할 **규칙을 DB 가 직접 검사**하게 하는 선언.

## 비유

서류 양식의 **"필수 항목(*)", "중복 불가", "0 이상만"** 같은 칸 옆 메모. 창구 직원(DB)이 접수할 때 그 자리에서 걸러 주니 잘못된 서류가 서랍에 들어가지 않는다.

## 예시

```sql
CREATE TABLE patients (
  id    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mrn   text NOT NULL UNIQUE,                     -- 비면 안 되고 중복도 안 됨
  sex   char(1) CHECK (sex IN ('M', 'F')),
  birth date CHECK (birth <= current_date)        -- 미래 생일 금지
);

INSERT INTO patients (mrn, sex) VALUES ('P-001', 'X');
-- ERROR:  new row for relation "patients" violates check constraint "patients_sex_check"
```

종류는 다섯 가지면 거의 다다: `NOT NULL`(비면 안 됨) · `UNIQUE`(중복 금지) · `PRIMARY KEY`(둘 다 + 표당 하나) · `REFERENCES`(다른 표에 있는 값만) · `CHECK`(임의 조건). FastAPI 쪽에서 pydantic 으로 검사하더라도 DB 에 한 번 더 거는 이유는, 앱이 여럿이거나 누군가 `psql` 로 직접 넣을 때도 마지막 방어선이 되기 때문이다. 에러 메시지에 찍히는 제약 이름이 어떤 규칙에 걸렸는지 바로 알려 준다.

## 헷갈리기 쉬운 것

- **유효성 검사(앱 레벨)** 는 요청이 들어올 때 코드(pydantic/zod)가 걸러 친절한 에러를 돌려준다. 제약조건은 DB 가 마지막에 거는 것으로 메시지가 투박하다. 둘 다 둔다.
- **인덱스**는 속도 장치, 제약조건은 규칙. `UNIQUE` 제약이 내부적으로 유니크 인덱스를 만들긴 하지만, 보통 인덱스는 아무것도 금지하지 않는다.
- **트리거**로도 규칙을 강제할 수 있지만, `CHECK` 한 줄로 되는 것을 트리거로 짜면 느리고 숨어 있어 찾기 어렵다.
