---
id: optimistic-pessimistic-lock
term: 낙관적 락/비관적 락
aliases:
  - Optimistic Lock
  - Pessimistic Lock
  - 낙관적 잠금
  - 비관적 잠금
  - 버전 컬럼
  - Optimistic Locking
category: database
tags:
  - 트랜잭션
  - 동기화
  - ORM
level: 3
kind: pattern
related:
  - db-lock
  - isolation-level
  - concurrency-control
  - orm
  - race-condition
  - idempotency
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

충돌을 **먼저 잠가서 막을지(비관적), 저장할 때 버전으로 확인할지(낙관적)** 고르는 동시 수정 전략.

## 비유

공용 회의실을 **미리 예약하고 문을 잠근 뒤 쓰는 것**(비관적)과, 그냥 들어가 쓰다가 나올 때 "그사이 누가 썼나" 확인하고 겹쳤으면 다시 하는 것(낙관적)의 차이다.

## 예시

```sql
-- 낙관적: 락 없음. 읽을 때 본 version 을 조건에 넣어 UPDATE
UPDATE items SET name = '새 이름', version = version + 1
WHERE id = 7 AND version = 3;
-- 영향받은 행이 0 이면 그사이 누가 먼저 고친 것 → 에러 내거나 다시 읽어서 재시도

-- 비관적: 먼저 잠그고(다른 요청은 대기) 고친다
SELECT * FROM items WHERE id = 7 FOR UPDATE;
UPDATE items SET name = '새 이름' WHERE id = 7;
```

JPA 에서는 엔티티에 `@Version Long version;` 한 줄이면 낙관적 락이 자동으로 붙고, 충돌 시 `OptimisticLockException` 이 난다. 비관적은 리포지토리 메서드에 `@Lock(LockModeType.PESSIMISTIC_WRITE)` 를 달면 `FOR UPDATE` 가 나간다. 고르는 기준은 **충돌 빈도**: 자기 프로필 수정처럼 겹칠 일이 드물면 낙관적(기다림 없음, 가끔 재시도), 선착순 재고 차감처럼 수백 명이 같은 행을 노리면 비관적(재시도 폭주 방지). 면접에서는 "낙관적 락과 비관적 락의 차이와 선택 기준은?" 으로 나온다.

## 헷갈리기 쉬운 것

- **낙관적 락은 DB 락이 아니다.** 앱 코드의 약속(버전 열 + 조건부 UPDATE)이라 DB 는 그냥 UPDATE 한 번으로 본다. 그래서 잠금 대기가 없고 데드락도 없다.
- **격리 수준**은 트랜잭션 단위의 설정이고, 락 전략은 특정 행을 고치는 코드마다 고르는 것. Serializable 로 올리는 것도 사실상 DB 가 대신 낙관적으로 충돌을 잡아 주는 방식이다.
- **HTTP 의 ETag/If-Match** 는 같은 아이디어를 REST 에 옮긴 것. "내가 본 버전이 아직 최신이면 저장해라".
