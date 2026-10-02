---
id: db-lock
term: 락(공유 락/배타 락)
aliases:
  - Lock
  - Shared Lock
  - Exclusive Lock
  - S-lock/X-lock
  - 데이터베이스 락
  - 잠금
  - 행 락
category: database
tags:
  - 트랜잭션
  - 동기화
level: 2
kind: concept
related:
  - deadlock
  - isolation-level
  - optimistic-pessimistic-lock
  - concurrency-control
  - mutex
  - transaction-acid
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

트랜잭션이 행이나 표를 **먼저 찜해 두어** 다른 트랜잭션의 쓰기(또는 읽기)를 잠시 막는 장치.

## 비유

도서관 책에 붙이는 **"열람 중" 꼬리표와 "대출 중" 꼬리표**. 열람 중인 책은 옆에서 같이 볼 수 있지만 빌려 갈 순 없고(공유 락), 대출 중인 책은 볼 수도 빌릴 수도 없다(배타 락).

## 예시

```sql
BEGIN;
-- 재고 행에 배타 락(X): 다른 트랜잭션의 UPDATE / FOR UPDATE 는 COMMIT 까지 대기
SELECT stock FROM products WHERE id = 7 FOR UPDATE;
UPDATE products SET stock = stock - 1 WHERE id = 7;
COMMIT;                                              -- 락 해제

SELECT * FROM products WHERE id = 7 FOR SHARE;       -- 공유 락(S): 읽기는 같이, 쓰기는 막음
LOCK TABLE products IN ACCESS EXCLUSIVE MODE;        -- 표 전체 락 (ALTER TABLE 이 내부적으로 잡는 것)
```

호환표는 간단하다: **S–S 는 같이 가능, S–X 와 X–X 는 대기**. 락은 COMMIT/ROLLBACK 때 풀리므로 트랜잭션이 길면 뒤 요청이 줄줄이 밀린다. Postgres 는 MVCC 라서 **그냥 SELECT 는 락을 잡지 않고** UPDATE 와도 서로 막지 않는다 — 막히는 건 같은 행을 고치려는 쓰기끼리다. 두 트랜잭션이 행 A→B, B→A 순서로 잠그면 데드락이 되고 Postgres 가 한쪽을 강제 취소한다. 면접에서는 "공유 락과 배타 락의 차이는?", "`SELECT ... FOR UPDATE` 는 언제 쓰나?" 로 나온다.

## 헷갈리기 쉬운 것

- **뮤텍스**는 한 프로세스 메모리 안에서 스레드끼리 쓰는 락. DB 락은 커넥션·서버가 달라도 DB 가 중앙에서 관리한다는 점만 다르고 원리는 같다.
- **데드락**은 락 자체가 아니라 락을 서로 기다리다 멈춘 결과. 락을 쓰면 따라오는 위험이고, 잠금 순서를 통일하면 대부분 예방된다.
- **낙관적 락**은 이름과 달리 DB 락을 잡지 않는다. 버전 번호로 충돌을 나중에 감지하는 방식이라 여기서 말하는 락(비관적)과 반대편이다.
