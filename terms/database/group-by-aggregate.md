---
id: group-by-aggregate
term: GROUP BY/집계 함수
aliases:
  - GROUP BY
  - Aggregate Function
  - 집계 함수
  - 그룹바이
  - HAVING
category: database
tags:
  - SQL
  - 관계형
level: 1
kind: concept
related:
  - sql
  - join
  - subquery
  - index
  - sqld
  - descriptive-stats
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

행을 **기준 열로 묶고** 묶음마다 개수·합계·평균 같은 **값 하나**를 뽑는 SQL 문법.

## 비유

시험지를 **반별로 쌓아 놓고 더미마다 평균 점수 하나씩** 적는 것. 학생 한 명 한 명이 아니라 "1반은 82점, 2반은 79점" 처럼 더미 단위의 답이 나온다.

## 예시

Devpedia 의 terms.json 을 Postgres 표 `terms(id, category, level, status)` 에 넣었다고 치자:

```sql
SELECT category,
       COUNT(*)             AS cards,       -- 묶음 안의 행 수
       ROUND(AVG(level), 1) AS avg_level    -- 묶음 안의 평균
FROM terms
WHERE status = 'review'                     -- 1) 묶기 전에 행을 거른다
GROUP BY category                           -- 2) 카테고리별로 묶는다
HAVING COUNT(*) >= 10                       -- 3) 묶은 뒤 묶음을 거른다
ORDER BY cards DESC;
```

결과는 카테고리마다 한 행씩 — `database | 26 | 2.1` 같은 식이다. 실행 순서가 WHERE → GROUP BY → HAVING 이라서 `WHERE COUNT(*) >= 10` 은 에러다(아직 안 묶였으니 셀 수가 없다). 반대로 `HAVING status = 'review'` 는 되긴 해도 묶은 뒤에 거르니 손해다. Postgres 는 SELECT 에 쓴 열이 GROUP BY 에도 없으면 `must appear in the GROUP BY clause` 에러를 낸다. 면접에서는 "WHERE 와 HAVING 의 차이는?" 으로 거의 그대로 나온다.

## 헷갈리기 쉬운 것

- **WHERE vs HAVING**: WHERE 는 행 하나를 보고 거르고(집계 함수 못 씀), HAVING 은 묶음을 보고 거른다(집계 함수 씀).
- **`COUNT(*)` vs `COUNT(열)`**: 전자는 행 수, 후자는 그 열이 NULL 이 아닌 행 수. `COUNT(DISTINCT 열)` 은 서로 다른 값의 수.
- **DISTINCT** 는 중복 행만 지우는 것이고 집계는 못 한다. "카테고리 목록" 은 DISTINCT, "카테고리별 개수" 는 GROUP BY.
