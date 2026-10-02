---
id: join
term: JOIN
aliases:
  - 조인
  - 테이블 조인
  - INNER JOIN
  - LEFT JOIN
category: database
tags:
  - SQL
  - 관계형
level: 1
kind: concept
related:
  - sql
  - primary-foreign-key
  - rdbms
  - n-plus-one
  - index
  - set-relation
status: review
created: 2026-09-25
updated: 2026-10-03
---

## 한 줄 정의

두 표를 **공통 열(보통 키)** 기준으로 옆으로 이어 붙여 한 번에 조회하는 SQL 문법.

## 비유

학생 명단과 수강 신청서를 **학번으로 맞춰 나란히 놓고** 보는 것. "이 학생이 무슨 과목 듣지?" 를 한눈에 본다.

## 예시

```sql
-- 아이템과 주인의 이메일을 함께 (짝이 있는 행만)
SELECT i.name, u.email
FROM items i
JOIN users u ON u.id = i.owner_id;

-- 아이템이 하나도 없는 사용자도 남기려면 LEFT JOIN
SELECT u.email, i.name
FROM users u
LEFT JOIN items i ON i.owner_id = u.id;
```

Supabase JS 에서는 `.select('name, users(email)')` 처럼 쓰면 외래키를 보고 JOIN 을 대신 만들어 준다.

## 헷갈리기 쉬운 것

- **INNER JOIN** 은 양쪽 다 짝이 있는 행만, **LEFT JOIN** 은 왼쪽 표의 행은 짝이 없어도 다 남긴다(빈칸은 NULL).
- **UNION** 은 옆으로가 아니라 **아래로** 이어 붙이는 것. 같은 열 구조의 결과 두 개를 한 목록으로 합친다.
