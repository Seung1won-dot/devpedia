---
id: nosql
term: NoSQL
aliases:
  - Not Only SQL
  - 비관계형 데이터베이스
  - 비관계형 DB
  - 노에스큐엘
category: database
tags:
  - NoSQL
  - 데이터
level: 1
kind: concept
related:
  - rdbms
  - document-db
  - key-value-store
  - vector-db
  - cache
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

표와 고정된 구조 대신 **문서·키-값 같은 다른 모양**으로 데이터를 담는 DB 들의 총칭.

## 비유

서류를 꼭 **칸이 정해진 양식**에만 적는 게 관계형이라면, NoSQL 은 자유 메모지·라벨 붙은 상자·포스트잇처럼 상황에 맞는 통을 고르는 것. 대신 "이 칸엔 꼭 이게 있다" 는 보장은 약해진다.

## 예시

```ts
// MongoDB: 필드가 제각각인 문서를 한 컬렉션에 그대로 저장
db.logs.insertOne({ level: "error", msg: "GPU OOM", gpu: 1 })
db.logs.insertOne({ level: "info", msg: "backup done", size_mb: 812 })
```

종류별 대표: 문서형(MongoDB), 키-값(Redis), 벡터(Chroma, pgvector), 그래프(Neo4j). Ender Chest 처럼 "사용자-아이템" 관계가 뚜렷하면 관계형(Postgres)이 기본이고, NoSQL 은 세션 캐시나 임베딩처럼 필요한 곳에만 곁들인다.

## 헷갈리기 쉬운 것

- **"SQL 을 못 쓴다"** 는 뜻이 아니다. Not Only SQL 의 줄임이고, Postgres 도 `jsonb` 열로 문서형처럼 쓸 수 있어 경계는 흐릿하다.
- **키-값 저장소**·**문서형 DB**·**벡터 DB** 는 NoSQL 이라는 큰 우산 아래의 각 종류이지, NoSQL 과 나란한 개념이 아니다.
