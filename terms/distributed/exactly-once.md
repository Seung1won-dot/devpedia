---
id: exactly-once
term: 정확히 한 번 전달
aliases:
  - Exactly-Once Delivery
  - Exactly-Once Semantics
  - At-Least-Once
  - At-Most-Once
  - 전달 보장
category: distributed
tags:
  - 메시지큐
  - 분산시스템
  - 장애허용
  - 면접
level: 3
kind: concept
related:
  - idempotency
  - message-queue
  - retry-backoff
  - two-phase-commit
  - event-driven-architecture
  - saga
see_also:
  - https://kafka.apache.org/documentation/#semantics
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

메시지가 유실도 중복도 없이 **결과에 딱 한 번만 반영**되도록 하는 전달 보장 수준.

## 비유

택배 기사가 문 앞에 놓고 "받으셨나요?" 문자에 답이 없으면 한 번 더 보낸다. 두 상자를 받아도 송장 번호를 보고 하나는 돌려보내면, 결과적으로 정확히 한 번 받은 셈이 된다.

## 예시

전달 보장은 세 단계다.

- **최대 한 번(at-most-once)**: 보내고 끝. 유실 가능, 중복 없음.
- **최소 한 번(at-least-once)**: 확인 응답이 올 때까지 재전송. 유실 없음, 중복 가능.
- **정확히 한 번(exactly-once)**: 유실도 중복도 없음.

네트워크만으로는 "확인 응답이 사라진 건지 메시지가 사라진 건지" 몰라서 순수한 정확히 한 번 **전달**은 불가능하다. 실제로는 **최소 한 번 + 멱등 처리 = 정확히 한 번 효과** 로 만든다.

```properties
# Kafka 프로듀서: 재전송해도 브로커가 시퀀스 번호로 중복 제거
enable.idempotence=true
acks=all
# 여러 파티션 쓰기 + 오프셋 커밋을 한 트랜잭션으로
transactional.id=emr-etl-1
# 컨슈머: 커밋된 트랜잭션 메시지만 읽기
isolation.level=read_committed
```

Kafka 의 정확히 한 번은 **Kafka 안에서 읽고 Kafka 로 쓰는** 범위에서만 성립한다. 컨슈머가 결과를 PostgreSQL 에 넣거나 이메일을 보내면, 그 쪽은 직접 멱등하게(메시지 ID 를 유니크 키로 저장 등) 만들어야 한다.

**트레이드오프**: 트랜잭션·중복 제거 비용으로 처리량이 줄고 지연이 늘어난다. 로그 수집처럼 약간의 중복이 무해하면 최소 한 번이 낫고, 결제·처방 전송처럼 중복이 치명적인 곳에만 투자한다.

## 헷갈리기 쉬운 것

- **멱등성**은 "같은 요청을 여러 번 해도 결과가 같다" 는 성질이고, 정확히 한 번은 그 성질을 이용해 얻는 시스템 수준의 보장이다.
- "Kafka 는 정확히 한 번을 지원한다" 를 "내 파이프라인 전체가 정확히 한 번" 으로 읽는 것이 흔한 실수다. 바깥 시스템과의 경계는 언제나 직접 챙겨야 한다.
