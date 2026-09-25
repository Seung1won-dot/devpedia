---
id: normalization
term: 정규화
aliases:
  - Normalization
  - 데이터베이스 정규화
  - 제3정규형
  - 1NF/2NF/3NF
category: database
tags:
  - 관계형
  - 설계원칙
level: 2
related:
  - rdbms
  - primary-foreign-key
  - join
  - erd
  - dry-kiss-yagni
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

같은 정보가 여러 곳에 **중복 저장되지 않도록** 표를 쪼개고 키로 잇는 설계 원칙.

## 비유

주문서마다 고객 주소를 다 적지 않고, **고객 카드에 한 번만 적고 주문서엔 고객 번호만** 적는 것. 고객이 이사를 가도 카드 한 장만 고치면 된다.

## 예시

```sql
-- 정규화 전: 아이템마다 주인 정보를 통째로 복사
CREATE TABLE items (id serial, name text, owner_email text, owner_nickname text);

-- 정규화 후: 사용자 정보는 users 에 한 번만, items 는 id 로만 가리킴
CREATE TABLE users (id uuid PRIMARY KEY, email text, nickname text);
CREATE TABLE items (id serial, name text, owner_id uuid REFERENCES users(id));
```

닉네임을 바꿀 때 전자는 그 사람 아이템 수만큼 UPDATE 해야 하고 하나라도 빠지면 데이터가 어긋난다. 후자는 한 줄이면 끝.

## 헷갈리기 쉬운 것

- **반정규화(denormalization)** 는 조회 속도를 위해 일부러 중복을 다시 허용하는 것. JOIN 이 너무 많아 느릴 때 쓰는 의도적 타협이지, 정규화가 틀렸다는 뜻이 아니다.
- **1NF/2NF/3NF** 는 정규화의 단계 이름. 실무에서는 대개 3NF 정도까지만 맞추면 충분하다.
