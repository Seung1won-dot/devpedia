---
id: n-plus-one
term: N+1 문제
aliases:
  - N+1 Query Problem
  - N+1 쿼리 문제
  - 엔 플러스 원
  - N+1 쿼리
category: database
tags:
  - 성능
  - ORM
  - 흔한실수
level: 2
kind: concept
related:
  - orm
  - join
  - sql
  - index
  - latency-bandwidth
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

목록 1번 조회 후 **항목마다 쿼리를 N번 더 날려** 총 N+1번 DB 를 부르는 성능 실수.

## 비유

반 학생 30명 명단을 받은 뒤 학생 **한 명씩 교무실에 전화해서** 전공을 묻는 것. 처음부터 "전공 포함 명단 주세요" 하면 전화 한 통이면 된다.

## 예시

```ts
// 나쁜 예: 사용자 목록 1번 + 사용자마다 아이템 조회 N번 = N+1
const users = await prisma.user.findMany()
for (const u of users) {
  const items = await prisma.item.findMany({ where: { ownerId: u.id } })
}

// 좋은 예: include 로 한 번에 (Prisma 가 JOIN 또는 IN 쿼리 2번으로 처리)
const usersWithItems = await prisma.user.findMany({ include: { items: true } })
```

사용자가 1,000명이면 쿼리 1,001번. 개발 중엔 데이터가 적어 안 느껴지다가 배포 후에 터진다. Supabase JS 는 `.select('*, items(*)')` 처럼 중첩 select 로 같은 문제를 피한다.

## 헷갈리기 쉬운 것

- **인덱스 부재**와는 다른 문제. N+1 은 쿼리 하나하나는 빨라도 **횟수**가 문제라, 인덱스를 붙여도 왕복 지연은 그대로 쌓인다.
- **Eager loading**(`include`, `joinedload`)이 해결책이지만, 목록이 크면 한 번에 너무 많이 가져오는 반대 문제가 생기니 필요한 것만 고른다.
