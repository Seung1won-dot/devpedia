---
id: schema
term: 스키마
aliases:
  - Schema
  - DB 스키마
  - 데이터베이스 스키마
  - 테이블 설계
category: database
tags:
  - 관계형
  - SQL
  - 설계원칙
level: 1
kind: concept
related:
  - rdbms
  - erd
  - migration
  - constraint
  - normalization
  - primary-foreign-key
see_also:
  - https://www.postgresql.org/docs/current/ddl.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

어떤 표에 어떤 열이 어떤 타입으로 들어가는지 미리 정해 둔 **데이터의 설계도**.

## 비유

엑셀 시트를 만들기 전에 **첫 줄 머리글과 각 칸에 뭐가 들어갈지** 정해 둔 양식. 양식이 있으면 누가 채워도 모양이 같다.

## 예시

```sql
CREATE TABLE vitals (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  patient_id  uuid        NOT NULL REFERENCES patients(id),
  sbp         integer,                          -- 수축기 혈압
  measured_at timestamptz NOT NULL DEFAULT now()
);
```

```bash
psql -c '\d vitals'      # 표의 스키마(열·타입·제약·인덱스) 확인
```

이 `CREATE TABLE` 문 전체가 스키마다. 정해 두면 `sbp` 에 글자를 넣으려는 실수를 DB 가 들어오기 전에 막아 주고, 팀원 누구나 `\d` 한 번으로 표 모양을 안다. 스키마를 바꾸는 일(열 추가·타입 변경)은 `ALTER TABLE` 인데, 운영 중인 DB 에서는 그 변경을 번호 붙은 마이그레이션 파일로 남긴다.

## 헷갈리기 쉬운 것

- **PostgreSQL 의 "스키마"** 는 뜻이 하나 더 있다. 표들을 묶는 폴더 같은 이름 공간으로, `public.patients` 의 `public` 이 그것이다. 문맥에 따라 "표 설계" 인지 "폴더" 인지 구분해야 한다.
- **ERD** 는 스키마를 그림으로 그린 것. 스키마가 원본(SQL)이고 ERD 는 그 도면이다.
- **스키마리스(NoSQL)** 는 스키마가 없다는 뜻이 아니다. DB 가 강제하지 않을 뿐, 어떤 필드가 있는지는 앱 코드가 암묵적으로 알고 있어야 한다.
