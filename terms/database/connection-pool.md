---
id: connection-pool
term: 커넥션 풀
aliases:
  - Connection Pool
  - 커넥션 풀링
  - DB 연결 풀
  - PgBouncer
category: database
tags:
  - 성능
  - 운영
level: 3
kind: pattern
related:
  - serverless
  - baas
  - rdbms
  - tcp-udp
  - process
see_also:
  - https://supabase.com/docs/guides/database/connecting-to-postgres
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

DB 접속을 **미리 여러 개 열어 두고 빌려 썼다 반납**하게 해 접속 비용을 아끼는 장치.

## 비유

손님마다 택시를 새로 부르는 대신 정류장에 **택시 여러 대를 대기**시켜 놓고 타고 내리게 하는 것. 손님이 택시 수보다 많으면 줄 서서 기다린다.

## 예시

```python
# psycopg (Python): 풀에서 빌려 쓰고 with 블록이 끝나면 자동 반납
from psycopg_pool import ConnectionPool
pool = ConnectionPool("postgresql://app@10.0.0.11/enderchest", min_size=2, max_size=10)

with pool.connection() as conn:
    count = conn.execute("SELECT count(*) FROM items").fetchone()[0]
```

Supabase 접속 주소가 두 종류인 이유가 이것이다. 5432 는 Postgres 직결, 6543 은 앞에 **Supavisor(풀러)** 가 있는 주소. 요청마다 새 인스턴스가 뜨는 서버리스/Edge Function 에서 직결하면 연결 수가 금방 바닥나므로 6543 을 쓴다.

## 헷갈리기 쉬운 것

- **캐시**는 조회 결과를 재사용하는 것, 커넥션 풀은 **연결 자체**를 재사용하는 것. 풀이 있어도 쿼리는 매번 DB 에서 돈다.
- 풀 크기를 무작정 키우면 안 된다. Postgres 는 연결마다 프로세스 하나를 띄우므로 `max_connections` 를 넘기면 접속 자체가 거부된다.
