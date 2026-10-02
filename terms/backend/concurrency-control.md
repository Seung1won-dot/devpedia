---
id: concurrency-control
term: 동시성 제어
aliases:
  - Concurrency Control
  - 동시성 문제
  - 동시 요청 처리
  - 재고 차감 문제
category: backend
tags:
  - 동기화
  - 트랜잭션
  - 아키텍처
level: 3
kind: concept
related:
  - db-lock
  - optimistic-pessimistic-lock
  - race-condition
  - isolation-level
  - message-queue
  - idempotency
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

여러 요청이 **같은 데이터를 동시에 고칠 때** 결과가 어긋나지 않도록 순서를 잡아 주는 기법.

## 비유

남은 좌석이 1개인 영화표를 **두 창구가 동시에 팔면 두 사람이 같은 자리에** 앉게 된다. 창구를 하나로 줄이거나, 팔기 전에 좌석표에 먼저 도장을 찍게 하는 것이 동시성 제어다.

## 예시

```python
# 위험한 코드: 읽기 → 판단 → 쓰기 사이에 다른 요청이 끼어든다
stock = db.one("SELECT stock FROM products WHERE id = 7")           # 둘 다 1 을 읽음
if stock > 0:
    db.run("UPDATE products SET stock = %s WHERE id = 7", stock - 1)  # 둘 다 0 을 씀 → 주문 2건 성공
```

```sql
-- 1) 원자적 UPDATE: 읽고 판단하고 쓰는 걸 한 문장에. DB 가 행 단위로 줄 세운다
UPDATE products SET stock = stock - 1 WHERE id = 7 AND stock > 0;   -- 영향 행 0 이면 품절
-- 2) 비관적 락: SELECT ... FOR UPDATE 로 먼저 잠그고 확인·차감 (검증 로직이 복잡할 때)
-- 3) 큐 직렬화: 주문을 큐에 넣고 워커 하나가 순서대로 처리 (티켓팅처럼 몰릴 때)
```

1번이 가장 싸고 대부분 충분하다. "재고 1개, 동시 요청 100개" 를 스레드 100개로 쏘고 마지막 재고가 0 인지(음수가 아닌지) 확인하는 테스트가 이 문제를 잡는 표준 방법이다. 서버가 여러 대라도 DB 가 하나면 위 방법이 그대로 통하고, DB 밖 자원(파일, 외부 API)을 지켜야 하면 Redis `SET NX` 로 분산 락을 건다. 면접에서는 "재고 100개에 1,000명이 동시에 주문하면 어떻게 처리하나?" 로 나오고, 락·원자적 UPDATE·큐 중 무엇을 왜 골랐는지가 답이다.

## 헷갈리기 쉬운 것

- **경쟁 상태(race condition)** 는 문제의 이름, 동시성 제어는 해결책의 이름. 위 "위험한 코드" 가 경쟁 상태다.
- **격리 수준**을 Serializable 로 올려도 해결은 되지만 충돌 시 에러가 나서 재시도가 필요하고 전체가 느려진다. 문제 되는 코드만 락이나 원자적 UPDATE 로 고치는 게 보통이다.
- **멱등성**은 **같은** 요청이 두 번 와도 한 번만 반영되게 하는 것(중복 클릭). 동시성 제어는 **다른** 요청들이 한 데이터에 부딪히는 문제다. 결제 API 는 둘 다 필요하다.
