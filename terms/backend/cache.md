---
id: cache
term: 캐시
aliases:
  - Cache
  - 캐시
  - 캐싱
category: backend
tags:
  - 캐시
  - 성능
  - 메모리
  - Redis
level: 2
kind: concept
related:
  - cache-memory
  - key-value-store
  - cdn
  - session-auth
  - rate-limit
  - lru-cache
  - bloom-filter
see_also:
  - https://redis.io/docs/latest/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**자주 쓰는 결과를 빠른 곳에 복사**해 두고 다음엔 거기서 꺼내 쓰는 것.

## 비유

책상 위에 올려 둔 **자주 보는 책 몇 권**. 매번 도서관(DB)까지 가지 않고 책상에서 바로 펴 보되, 개정판이 나오면(데이터 변경) 책상 책도 바꿔야 한다.

## 예시

FastAPI 에서 3초 걸리는 통계 쿼리를 Redis 에 60초 캐싱:

```python
import redis, json
r = redis.Redis(host="redis", port=6379)

@app.get("/stats")
def stats():
    hit = r.get("stats")
    if hit:
        return json.loads(hit)               # 캐시 히트: DB 안 감
    data = compute_heavy_stats()             # 캐시 미스: 느린 쿼리 실행
    r.set("stats", json.dumps(data), ex=60)  # 60초 뒤 자동 만료(TTL)
    return data
```

```bash
docker compose up -d redis     # Compose 에 redis 서비스 한 줄이면 끝
redis-cli GET stats
```

Redis 는 데이터를 메모리에 두는 키-값 저장소라 캐시 말고도 세션 저장, 레이트 리밋 카운터, 간단한 큐로 쓴다. 어려운 건 "언제 지울까"(무효화)이고, TTL 이 가장 단순한 답이다.

## 헷갈리기 쉬운 것

- **캐시 메모리(CPU 캐시)** 는 하드웨어 안의 같은 아이디어. 백엔드에서 "캐시"라 하면 보통 Redis 같은 앱 레벨 캐시.
- **CDN** 은 정적 파일을 사용자 가까운 서버에 두는 캐시. Redis 는 우리 서버 안(또는 옆)에서 API 결과·세션을 두는 캐시.
