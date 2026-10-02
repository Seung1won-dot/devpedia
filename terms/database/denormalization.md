---
id: denormalization
term: 반정규화
aliases:
  - Denormalization
  - 역정규화
  - 비정규화
  - 디노멀라이제이션
category: database
tags:
  - 관계형
  - 성능
  - 설계원칙
level: 2
kind: concept
related:
  - normalization
  - join
  - index
  - cache
  - n-plus-one
  - erd
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

조회를 빠르게 하려고 **일부러 중복을 허용**해 조인을 줄이는 설계상의 타협.

## 비유

주문서에 고객 번호만 적던 걸, 배달 기사가 매번 고객 카드를 뒤지지 않도록 **주소를 주문서에 다시 적어 두는 것**. 빨리 나가지만 고객이 이사하면 두 군데를 다 고쳐야 한다.

## 예시

```sql
-- 정규화 상태: 카테고리별 카드 수를 볼 때마다 JOIN + COUNT
SELECT c.name, COUNT(t.id)
FROM categories c LEFT JOIN terms t ON t.category = c.id
GROUP BY c.name;

-- 반정규화: 카테고리 표에 개수 열을 미리 둔다
ALTER TABLE categories ADD COLUMN term_count int NOT NULL DEFAULT 0;
SELECT name, term_count FROM categories;            -- 조인 없이 즉시

-- 대가: 카드를 넣을 때마다 두 표를 같이 고쳐야 한다 (빼먹으면 숫자가 어긋난다)
INSERT INTO terms (id, category) VALUES ('sharding', 'database');
UPDATE categories SET term_count = term_count + 1 WHERE id = 'database';
```

읽기는 빨라지고 쓰기는 느려지며, 두 번째 UPDATE 를 빼먹는 순간 **갱신 이상**이 생긴다. 그래서 순서는 "정규화로 설계 → 느린 쿼리를 측정 → 인덱스·캐시로 안 되면 그때 반정규화" 다. Postgres 라면 트리거나 `MATERIALIZED VIEW` 로 중복 관리를 DB 에 맡길 수 있다. 면접에서는 "정규화와 반정규화의 트레이드오프를 설명해 보라" 로 나온다 — 중복 없음(정합성) vs 조인 없음(속도).

## 헷갈리기 쉬운 것

- **정규화를 안 한 것**과 다르다. 반정규화는 정규화된 설계를 이해한 뒤 특정 조회를 위해 **의도적으로** 되돌리는 것이고, 어디가 중복인지 기록해 둔다.
- **캐시**는 앱이나 Redis 에 조회 결과를 잠시 두는 것이고, 반정규화는 DB 스키마 자체를 바꾸는 것. 캐시가 더 되돌리기 쉬워 보통 먼저 시도한다.
- **머티리얼라이즈드 뷰**는 조인 결과를 표로 저장해 두는 Postgres 기능. 반정규화의 한 형태지만 `REFRESH` 전까지는 옛 값이다.
