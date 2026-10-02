---
id: query-plan
term: EXPLAIN/쿼리 플랜
aliases:
  - Query Plan
  - 실행 계획
  - EXPLAIN ANALYZE
  - 쿼리 플래너
  - Seq Scan/Index Scan
category: database
tags:
  - SQL
  - 인덱스
  - 성능
  - 면접
level: 2
kind: concept
related:
  - index
  - sql
  - join
  - n-plus-one
  - b-tree
  - profiling
see_also:
  - https://www.postgresql.org/docs/current/using-explain.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

DB 가 쿼리를 **어떤 순서와 방법으로 실행할지** 세운 계획과 그것을 보는 명령.

## 비유

내비게이션의 **경로 안내 화면**. 출발 전에 "고속도로로 몇 분" 을 예상해 주고(EXPLAIN), 실제로 달린 기록(ANALYZE)과 비교하면 어디서 막혔는지 보인다.

## 예시

```sql
EXPLAIN ANALYZE
SELECT * FROM vitals
WHERE patient_id = '7c9e6679-7425-40de-944b-e07fc1f90ae7'
  AND measured_at > now() - interval '7 days';
```

```text
Seq Scan on vitals  (cost=0.00..21845.00 rows=12 width=48) (actual time=0.21..312.50 rows=10 loops=1)
  Filter: ((patient_id = '7c9e...'::uuid) AND (measured_at > ...))
  Rows Removed by Filter: 999990
Execution Time: 312.6 ms
```

`Seq Scan` 은 표를 처음부터 끝까지 훑었다는 뜻이고, 100만 행을 읽어 10행을 건졌다. `CREATE INDEX ON vitals (patient_id, measured_at);` 뒤에 다시 돌리면 `Index Scan` 으로 바뀌며 0.3ms 대로 떨어진다. 읽는 법은 들여쓰기가 깊은 안쪽 노드부터, `cost` 는 추정, `actual time` 은 실측이다. 추정 `rows` 와 실제 `rows` 가 열 배 이상 다르면 통계가 낡은 것이니 `ANALYZE vitals;` 로 다시 모은다. 느린 쿼리를 받으면 인덱스를 추측해서 붙이지 말고 EXPLAIN 부터 보는 습관이 면접에서도 좋은 답이 된다.

## 헷갈리기 쉬운 것

- **EXPLAIN vs EXPLAIN ANALYZE**: 앞은 계획만 보여 주고 실행하지 않는다. 뒤는 실제로 실행하므로 `UPDATE`/`DELETE` 를 볼 때는 `BEGIN; ... ROLLBACK;` 안에서 돌린다.
- **단독 `ANALYZE`** 는 표의 통계를 다시 모으는 다른 명령이다. `EXPLAIN ANALYZE` 의 ANALYZE 와 이름만 같다.
- **Seq Scan 이 늘 나쁜 건 아니다.** 작은 표나 대부분의 행을 읽는 쿼리는 전부 훑는 게 더 빠르다. 인덱스가 있는데 안 탄다면 플래너가 그렇게 판단한 이유(통계·선택도)를 먼저 본다.
