---
id: redis
term: Redis
aliases:
  - 레디스
  - Remote Dictionary Server
  - redis-cli
  - Valkey
category: database
tags:
  - Redis
  - 캐시
  - NoSQL
  - 메모리
level: 1
kind: tool
related:
  - cache
  - key-value-store
  - session-auth
  - rate-limit
  - message-queue
  - lru-cache
  - distributed-lock
see_also:
  - https://redis.io/docs/latest/develop/data-types/
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

메모리에 **문자열·해시·리스트·집합 같은 자료구조를 키로 저장**하는 아주 빠른 서버.

## 비유

책상 위 **칸 나뉜 정리함**. 칸마다 이름표(키)가 붙어 있고 칸 모양도 한 칸짜리·구획 나뉜 것·줄 세우는 것으로 다양한데, 전부 손 닿는 거리(메모리)라 창고(디스크 DB)보다 훨씬 빨리 꺼낸다.

## 예시

```bash
docker run -d --name redis -p 127.0.0.1:6379:6379 redis:7

redis-cli SET greeting "안녕" EX 60                      # String, 60초 뒤 자동 삭제(TTL)
redis-cli HSET patient:42 name 홍길동 age 51             # Hash: 필드 여러 개를 한 키에
redis-cli LPUSH jobs '{"task":"segment","id":9}'         # List: 작업 큐로
redis-cli SADD online u1 u2 u1                           # Set: 중복이 알아서 빠짐 → 2
redis-cli ZADD leaderboard 93.5 model-a 88.1 model-b     # Sorted Set: 점수순 정렬 유지
redis-cli ZREVRANGE leaderboard 0 1 WITHSCORES
redis-cli TTL greeting                                   # 남은 초
```

전부 메모리에서 돌아 응답이 1ms 안쪽이지만, 그만큼 재시작하면 날아갈 수 있어 필요하면 스냅샷(RDB)·로그(AOF)로 디스크에 남기게 설정한다. 연구실에서는 FastAPI 응답 캐시, 로그인 세션, GPU 작업 큐(Celery/RQ 의 브로커), `PUBLISH`/`SUBSCRIBE` 로 학습 진행률 알림에 쓴다. 라이선스 변경 뒤 갈라져 나온 Valkey 가 명령 호환 대체재다 [확인 필요].

## 헷갈리기 쉬운 것

- **캐시**는 용도, **키-값 저장소**는 분류, Redis 는 그 둘의 대표 제품. Redis 로 큐·세션·랭킹도 만들기 때문에 "Redis = 캐시" 로만 알면 좁다.
- **Memcached** 는 문자열 캐시만 되는 더 단순한 도구. 자료구조·영속화·pub/sub 가 필요하면 Redis.
- **메시지 큐(RabbitMQ/Kafka)**: Redis List/Streams 로 간단한 큐는 되지만, 전달 보장·재처리·대용량 보관이 필요하면 전용 큐를 쓴다.
