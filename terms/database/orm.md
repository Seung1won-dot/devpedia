---
id: orm
term: ORM
aliases:
  - Object-Relational Mapping
  - 객체 관계 매핑
  - 오알엠
  - Prisma/SQLAlchemy
category: database
tags:
  - ORM
  - SQL
level: 2
related:
  - sql
  - n-plus-one
  - migration
  - oop
  - class-instance
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

DB 표를 **코드의 클래스·객체처럼 다루게** 해 주고 SQL 은 대신 만들어 주는 라이브러리.

## 비유

외국 식당에서 **통역사**를 끼고 주문하는 것. 나는 한국어(코드)로 말하고 통역사가 현지어(SQL)로 바꿔 주지만, 까다로운 주문은 통역이 어색해져 직접 말해야 할 때가 있다.

## 예시

```ts
// Prisma: SQL 없이 TypeScript 로 조회
const items = await prisma.item.findMany({
  where: { ownerId: user.id },
  orderBy: { createdAt: 'desc' },
  take: 20,
})
// → SELECT ... FROM "Item" WHERE "ownerId" = $1 ORDER BY "createdAt" DESC LIMIT 20
```

Python 이면 SQLAlchemy 나 Django ORM 이 같은 역할. Supabase 의 `supabase-js` 도 `from('items').select()` 처럼 SQL 을 감싸 주지만, 엄밀히는 ORM 이 아니라 PostgREST 라는 REST API 를 부르는 클라이언트다.

## 헷갈리기 쉬운 것

- **쿼리 빌더**(Knex, Kysely)는 SQL 을 코드로 조립만 해 주고 객체 매핑은 안 한다. ORM 은 그 위에 "표 ↔ 클래스" 대응까지 해 준다.
- ORM 을 써도 SQL 을 몰라도 되는 건 아니다. 느린 쿼리(**N+1 문제** 등)는 결국 생성된 SQL 을 봐야 잡힌다.
