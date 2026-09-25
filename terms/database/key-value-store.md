---
id: key-value-store
term: 키-값 저장소
aliases:
  - Key-Value Store
  - 키밸류 스토어
  - KV 스토어
  - Redis
category: database
tags:
  - NoSQL
  - 캐시
level: 2
related:
  - nosql
  - cache
  - hash-table
  - session-auth
  - rate-limit
see_also:
  - https://redis.io/docs/latest/develop/data-types/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**키 하나에 값 하나**를 짝지어 넣고, 키로만 꺼내는 가장 단순한 형태의 DB.

## 비유

번호표 붙은 **코인 로커**. 번호(키)만 대면 안에 든 것(값)을 바로 꺼내지만, "빨간 가방 든 로커 찾아줘" 같은 내용 검색은 안 된다.

## 예시

```bash
# Redis: 로그인 세션을 30분짜리로 저장
redis-cli SET session:9f3a '{"user_id":42}' EX 1800
redis-cli GET session:9f3a          # → {"user_id":42}
redis-cli INCR ratelimit:10.0.0.7   # 요청 횟수 카운트, 레이트 리밋에 씀
```

메모리에 올려 두고 돌아서 매우 빠르다. 세션·캐시·카운터처럼 "키를 정확히 알고 있는" 데이터에 맞고, Postgres 같은 본 DB 옆에 보조로 붙이는 게 보통이다.

## 헷갈리기 쉬운 것

- **캐시(Redis)** 는 키-값 저장소의 대표적인 **용도**. Redis 는 도구이고 캐시는 그걸로 하는 일이라, Redis 로 큐나 세션 저장도 한다.
- **해시 테이블**은 프로그램 안 메모리의 자료구조. 키-값 저장소는 그걸 별도 서버로 띄워 여러 프로세스가 공유하고 재시작해도 남게 한 것.
