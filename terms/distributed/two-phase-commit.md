---
id: two-phase-commit
term: 2단계 커밋(2PC)
aliases:
  - Two-Phase Commit
  - 2PC
  - XA 트랜잭션
  - 분산 트랜잭션
category: distributed
tags:
  - 트랜잭션
  - 분산시스템
  - 합의
level: 3
kind: protocol
related:
  - saga
  - transaction-acid
  - consensus
  - microservices
  - paxos
see_also:
  - https://www.postgresql.org/docs/current/sql-prepare-transaction.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

여러 DB 에 걸친 트랜잭션을 **전원이 준비됐을 때만 다 같이 커밋**하는 조정 프로토콜.

## 비유

결혼식 주례가 신랑과 신부 모두에게 동의를 물은 뒤에야 성혼을 선언하는 것. 한 명이라도 "아니요" 면 없던 일이 되고, 주례가 대답 사이에 쓰러지면 두 사람은 결혼한 건지 아닌지 모른 채 서 있어야 한다.

## 예시

PostgreSQL 은 참여자 쪽 기능을 직접 제공한다(`max_prepared_transactions` 가 0 보다 커야 함).

```sql
-- 1단계(Prepare): 각 DB 에서 커밋할 준비만 하고 디스크에 고정
BEGIN;
UPDATE stock SET qty = qty - 1 WHERE item_id = 42;
PREPARE TRANSACTION 'order-1001';

-- 2단계(Commit): 조정자가 모든 DB 의 "준비됨" 을 확인한 뒤
COMMIT PREPARED 'order-1001';
-- 하나라도 실패했으면 대신 ROLLBACK PREPARED 'order-1001';
```

준비된 트랜잭션은 커밋이나 롤백이 올 때까지 락을 쥔 채 남는다. 조정자가 2단계 직전에 죽으면 참여자들은 스스로 결정할 수 없어 **막힌다**(blocking) — 이게 2PC 의 가장 큰 약점이다.

**트레이드오프**: 여러 저장소에 걸쳐 진짜 원자성(ACID)을 주지만, 가장 느린 참여자만큼 느리고 조정자 장애 시 락이 오래 잡힌다. 같은 회사 DB 몇 개 사이처럼 참여자가 적고 신뢰할 수 있을 때는 쓰고, 마이크로서비스 여러 개나 외부 API 가 끼면 사가로 간다.

## 헷갈리기 쉬운 것

- **사가**는 각 단계를 바로 커밋하고 실패하면 보상 동작(환불 등)으로 되돌린다. 락을 오래 안 잡지만 중간 상태가 잠깐 남에게 보인다. 2PC 는 반대로 중간 상태를 숨기는 대신 막힐 수 있다.
- **Paxos·Raft** 는 과반만 있으면 진행하고, 2PC 는 전원이 있어야 한다. 실제 분산 DB(Spanner 등)는 각 샤드를 합의로 복제한 위에 2PC 를 얹어 막힘 문제를 줄인다 [확인 필요].
