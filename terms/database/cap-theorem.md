---
id: cap-theorem
term: CAP 이론
aliases:
  - CAP Theorem
  - CAP 정리
  - 브루어의 정리
  - Brewer's Theorem
  - PACELC
category: database
tags:
  - 분산시스템
  - NoSQL
level: 3
kind: concept
related:
  - sharding
  - replication
  - nosql
  - transaction-acid
  - event-driven-architecture
  - microservices
  - distributed-system
status: review
created: 2026-09-29
updated: 2026-10-03
---

## 한 줄 정의

여러 대로 나뉜 DB 는 네트워크가 끊겼을 때 **일관성과 가용성 중 하나를 포기**해야 한다는 원리.

## 비유

본점과 지점이 **전화가 끊긴 채 마지막 재고 1개**를 팔아야 할 때. 틀리게 팔 위험을 감수하고 계속 팔거나(가용성), 전화가 될 때까지 판매를 멈추거나(일관성) 둘 중 하나지 둘 다는 못 한다.

## 예시

- **C(일관성)**: 어느 서버에 물어도 같은 최신 값이 나온다.
- **A(가용성)**: 살아 있는 서버는 항상 응답한다(에러 말고 답을 준다).
- **P(분할 내성)**: 서버끼리 연결이 끊겨도 시스템이 계속 동작한다.

네트워크 단절은 언젠가 반드시 일어나므로 P 는 선택이 아니다. 실제 질문은 **"끊긴 동안 C 와 A 중 무엇을 지킬까"** 다.

```sql
-- Postgres 동기 복제: 사본이 확인할 때까지 COMMIT 을 기다림
ALTER SYSTEM SET synchronous_standby_names = 'replica1';
-- 사본과 끊기면 쓰기가 멈춘다 → 틀린 값을 주느니 안 준다 (CP)

ALTER SYSTEM SET synchronous_commit = 'local';
-- 원본만 확정하고 진행 → 쓰기는 계속되지만 사본이 잠시 뒤처진다 (AP 쪽)
```

은행 잔액은 CP(잠시 거절해도 틀리면 안 됨), SNS 좋아요 수는 AP(몇 초 어긋나도 보여 주는 게 낫다). 시스템으로는 etcd·ZooKeeper 가 CP, Cassandra·DynamoDB 가 AP 쪽이다. **PACELC** 는 한 줄 보강이다: 단절(P)이면 A vs C, 평소(Else)에도 지연(L) vs C 를 고른다 — 동기 복제는 평소에도 느리다. 면접에서는 "CAP 에서 왜 둘만 고르나, 실제로는?" 으로 나오고, 답은 "P 는 필수라 CP 냐 AP 냐의 문제고, 시스템 전체가 아니라 기능 단위로 고른다" 다.

## 헷갈리기 쉬운 것

- **ACID 의 C** 는 "제약 조건을 어긴 상태로 끝나지 않음" 이고, **CAP 의 C** 는 "모든 서버가 같은 최신 값" 이다. 글자만 같다.
- **CA 시스템**은 분산이 아니라는 뜻이다. Postgres 한 대는 CAP 을 논할 대상이 아니고, 복제를 붙이는 순간 P 가 생긴다.
- **가용성(A)** 은 "응답을 준다" 는 뜻이지 "서비스가 잘 안 죽는다"(고가용성, HA) 와 같은 말이 아니다. CP 시스템도 HA 구성은 얼마든지 한다.
