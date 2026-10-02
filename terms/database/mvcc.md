---
id: mvcc
term: MVCC
aliases:
  - Multi-Version Concurrency Control
  - 다중 버전 동시성 제어
  - 스냅샷 격리
  - VACUUM
category: database
tags:
  - 트랜잭션
  - 동기화
  - 관계형
  - 면접
level: 3
kind: concept
related:
  - isolation-level
  - db-lock
  - transaction-acid
  - concurrency-control
  - optimistic-pessimistic-lock
  - postgresql
see_also:
  - https://www.postgresql.org/docs/current/mvcc-intro.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

행을 고칠 때 덮어쓰지 않고 **새 버전을 옆에 만들어** 읽기와 쓰기가 서로 막지 않게 하는 방식.

## 비유

공유 문서를 고칠 때 원본에 줄을 긋는 대신 **새 판본을 한 장 더 끼워 넣는** 것. 먼저 읽기 시작한 사람은 옛 판본을 끝까지 보고 나중에 온 사람은 새 판본을 보니, 아무도 상대를 기다리지 않는다.

## 예시

```sql
-- 세션 A
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT xmin, xmax, balance FROM accounts WHERE id = 1;   -- xmin=1001 xmax=0 balance=100

-- 세션 B (동시에): 새 버전을 만들 뿐 A 를 막지 않는다
UPDATE accounts SET balance = 50 WHERE id = 1;
COMMIT;

-- 세션 A: 자기 스냅샷의 옛 버전을 그대로 본다
SELECT balance FROM accounts WHERE id = 1;               -- 여전히 100
COMMIT;

-- 아무도 안 보는 옛 버전(죽은 튜플)은 VACUUM 이 치운다
SELECT n_dead_tup FROM pg_stat_user_tables WHERE relname = 'accounts';
VACUUM accounts;
```

PostgreSQL 은 행 버전마다 "만든 트랜잭션(`xmin`)" 과 "지운 트랜잭션(`xmax`)" 번호를 적어 두고, 각 트랜잭션은 자기 시작 시점에 보이는 버전만 골라 읽는다. 그래서 `SELECT` 는 락을 잡지 않고, 충돌하는 건 같은 행을 고치려는 쓰기끼리뿐이다. 대가는 `UPDATE` 가 사실상 `INSERT` + 옛 버전 표시라 죽은 튜플이 쌓인다는 것으로, autovacuum 이 돌아야 하고 오래 열어 둔 트랜잭션은 그 청소를 막아 표를 부풀린다(bloat). 읽기가 많은 서비스에는 유리하지만 같은 행을 초당 수천 번 고치는 카운터에는 버전이 쏟아져 불리하므로, 그런 값은 Redis 같은 곳에 두는 편이 낫다. 면접에서는 "Postgres 에서 SELECT 가 UPDATE 를 안 막는 이유는?", "VACUUM 은 왜 필요한가?" 로 나온다.

## 헷갈리기 쉬운 것

- **락**이 없어지는 게 아니다. MVCC 는 읽기-쓰기 충돌을 버전으로 피할 뿐, 쓰기-쓰기 충돌은 여전히 행 락으로 줄을 세운다.
- **낙관적 락**은 앱이 `version` 열을 두고 직접 비교하는 패턴이고, MVCC 는 DB 엔진이 내부적으로 버전을 관리해 앱에서는 보이지 않는다.
- **격리 수준**은 목표, MVCC 는 수단. Read Committed 는 문장마다 새 스냅샷을 찍고, Repeatable Read 는 트랜잭션 시작 때 한 번만 찍는다. MySQL InnoDB 도 MVCC 지만 옛 버전을 표가 아닌 undo 로그에 둔다.
