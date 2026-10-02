---
id: subquery
term: 서브쿼리
aliases:
  - Subquery
  - 부질의
  - 하위 쿼리
  - 인라인 뷰
  - 상관 서브쿼리
category: database
tags:
  - SQL
  - 관계형
level: 2
kind: concept
related:
  - sql
  - join
  - group-by-aggregate
  - n-plus-one
  - index
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

SQL 문 안에 **괄호로 넣은 또 하나의 SELECT** 로, 그 결과를 값이나 표처럼 쓰는 것.

## 비유

편지 본문에 "자세한 명단은 **동봉한 쪽지** 참고" 라고 쓰고 쪽지를 끼워 넣는 것. 읽는 사람은 쪽지부터 펼쳐 본 뒤 본문을 이해한다.

## 예시

```sql
-- 1) 스칼라 서브쿼리: 값 하나 — 평균보다 어려운 카드
SELECT id FROM terms
WHERE level > (SELECT AVG(level) FROM terms);

-- 2) 인라인 뷰: FROM 자리에 표처럼 — 카드 10장 이상인 카테고리
SELECT category FROM (
  SELECT category, COUNT(*) AS cards FROM terms GROUP BY category
) t WHERE cards >= 10;

-- 3) 상관 서브쿼리: 바깥 행(u)을 참조 — 아이템이 하나라도 있는 사용자
SELECT email FROM users u
WHERE EXISTS (SELECT 1 FROM items i WHERE i.owner_id = u.id);
```

1·2번은 안쪽이 혼자 먼저 실행되고 끝이다. 3번은 바깥 행마다 안쪽을 다시 평가하는 모양이라 느릴 것 같지만, Postgres 는 `EXISTS`/`IN` 을 대개 JOIN(세미 조인)으로 바꿔 실행한다. 3번은 `JOIN items i ON i.owner_id = u.id` 로도 쓸 수 있는데, 두 표의 열을 같이 뽑아야 하면 JOIN, 한쪽 표를 **조건으로만** 쓰면 EXISTS 가 의도가 분명하다. 면접에서는 "서브쿼리와 JOIN 의 차이, 어느 쪽이 빠른가?" 로 나온다 — 답은 "실행 계획(`EXPLAIN`)을 봐야 안다".

## 헷갈리기 쉬운 것

- **JOIN** 은 두 표를 옆으로 붙여 양쪽 열을 다 쓰고, 짝이 여럿이면 행이 늘어난다. 서브쿼리는 결과를 값·조건·임시 표로만 쓰고 바깥 행 수를 늘리지 않는다.
- **CTE(`WITH ... AS`)** 는 서브쿼리에 이름을 붙여 위로 빼낸 것. 같은 서브쿼리를 두 번 쓰거나 읽기 좋게 만들 때 쓴다.
- **뷰(VIEW)** 는 서브쿼리를 DB 에 저장해 표 이름처럼 부르는 것. 인라인 뷰는 쿼리 안에서 일회용이다.
