---
id: transaction-acid
term: 트랜잭션/ACID
aliases:
  - Transaction
  - ACID
  - 트랜잭션
  - 원자성
category: database
tags:
  - 트랜잭션
  - 관계형
level: 2
related:
  - rdbms
  - sql
  - idempotency
  - deadlock
  - migration
see_also:
  - https://www.postgresql.org/docs/current/tutorial-transactions.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

여러 SQL 을 **한 덩어리로 묶어 전부 성공하거나 전부 취소**되게 하는 실행 단위.

## 비유

계좌 이체는 "내 통장에서 빼기" 와 "상대 통장에 넣기" 가 **둘 다 되거나 둘 다 안 되어야** 한다. 중간에 정전이 나도 돈이 허공으로 사라지지 않게 해 주는 게 트랜잭션이다.

## 예시

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;   -- 둘 다 확정. 중간에 에러가 나면 ROLLBACK 으로 원상복구
```

ACID 는 트랜잭션이 지켜야 할 네 가지 약속: **원자성**(전부 아니면 전무) · **일관성**(규칙을 어긴 상태로 끝나지 않음) · **격리성**(동시에 돌아도 서로 안 섞임) · **지속성**(COMMIT 되면 정전이 나도 남음). Supabase 에서 표 여러 개를 한 번에 바꿔야 하면 SQL 함수로 묶어 `rpc()` 로 부르면 한 트랜잭션에서 돈다.

## 헷갈리기 쉬운 것

- **멱등성**은 "같은 요청을 두 번 보내도 결과가 같다" 는 성질. 트랜잭션은 "한 요청 안의 여러 작업이 같이 성공/실패" 하는 것이라 다른 문제다.
- **락(lock)** 은 격리성을 구현하는 수단 중 하나. 트랜잭션 둘이 서로의 락을 기다리며 멈추면 **데드락**.
