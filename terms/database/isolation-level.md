---
id: isolation-level
term: 격리 수준
aliases:
  - Isolation Level
  - 트랜잭션 격리 수준
  - Read Committed
  - Repeatable Read
  - Serializable
category: database
tags:
  - 트랜잭션
  - 관계형
  - 동기화
level: 3
kind: concept
related:
  - transaction-acid
  - db-lock
  - optimistic-pessimistic-lock
  - concurrency-control
  - race-condition
  - consistency-models
status: review
created: 2026-09-29
updated: 2026-10-03
---

## 한 줄 정의

동시에 도는 트랜잭션끼리 **서로의 중간 결과를 얼마나 보이게 할지** 정한 4단계.

## 비유

공유 문서를 고치는 동안 남에게 **타이핑 중인 글자까지 보여 줄지, 저장 버튼을 누른 것만 보여 줄지, 내가 끝날 때까지 아예 못 열게 할지**의 차이다. 덜 보여 줄수록 안전하지만 남이 기다리는 시간이 는다.

## 예시

| 수준 | Dirty Read | Non-repeatable Read | Phantom Read |
|---|---|---|---|
| Read Uncommitted | 발생 | 발생 | 발생 |
| Read Committed | 안전 | 발생 | 발생 |
| Repeatable Read | 안전 | 안전 | 발생 (Postgres 는 안전) |
| Serializable | 안전 | 안전 | 안전 |

**Dirty Read** 는 남이 아직 COMMIT 안 한 값을 읽는 것, **Non-repeatable Read** 는 같은 행을 두 번 읽었는데 값이 달라진 것, **Phantom Read** 는 같은 조건으로 두 번 읽었는데 행 수가 달라진 것.

```sql
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT balance FROM accounts WHERE id = 1;   -- 100
-- 이 사이에 다른 세션이 UPDATE 하고 COMMIT 해도
SELECT balance FROM accounts WHERE id = 1;   -- 여전히 100 (첫 SELECT 시점의 스냅샷)
COMMIT;
```

기본값은 **Postgres 가 Read Committed, MySQL(InnoDB) 이 Repeatable Read** 다. Postgres 는 Read Uncommitted 를 골라도 Read Committed 로 동작하고, MVCC 스냅샷 덕분에 Repeatable Read 에서 팬텀도 막힌다. Serializable 은 제일 안전하지만 충돌하면 `could not serialize access` 로 한쪽이 취소되므로 앱이 재시도해야 한다. 면접에서는 "격리 수준 4가지와 각 수준에서 막히는 문제는?", "MySQL 과 Postgres 의 기본값은?" 으로 나온다.

## 헷갈리기 쉬운 것

- **락**은 격리 수준을 구현하는 수단 중 하나. 목표(어디까지 보이게 할지)가 격리 수준이고, 수단은 락이거나 MVCC(버전을 여러 개 두고 스냅샷을 읽기)다.
- **원자성**은 "내 트랜잭션이 전부 되거나 전부 취소" 이고, 격리성은 "남의 트랜잭션과 섞이지 않음". ACID 의 A 와 I 는 다른 약속이다.
- **Serializable 은 한 줄로 세워 실행한다는 뜻이 아니다.** 동시에 돌리되 "차례로 실행한 것과 같은 결과" 만 보장하고, 그럴 수 없으면 에러로 알려 준다.
