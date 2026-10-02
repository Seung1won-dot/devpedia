---
id: sharding
term: 샤딩
aliases:
  - Sharding
  - 샤드
  - 수평 분할
  - Horizontal Partitioning
  - 데이터베이스 샤딩
category: database
tags:
  - 분산시스템
  - 성능
  - 운영
level: 3
kind: pattern
related:
  - replication
  - scale-up-out
  - cap-theorem
  - index
  - load-balancer
  - primary-foreign-key
  - multi-tenancy
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

한 표의 행을 **키 기준으로 여러 DB 서버에 나눠** 담아 용량과 쓰기 부하를 쪼개는 것.

## 비유

한 권으로 감당이 안 되는 전화번호부를 **성씨별로 여러 권에 나눠 다른 책상에** 두는 것. 김씨를 찾으려면 어느 책상인지(샤드 키)만 알면 되지만, "김씨와 이씨 중 같은 동네 사람" 을 찾으려면 책상을 다 뒤져야 한다.

## 예시

```python
import zlib
SHARDS = ["pg-shard-0", "pg-shard-1", "pg-shard-2"]     # Postgres 3대

def shard_for(user_id: str) -> str:                    # 샤드 키 = user_id
    return SHARDS[zlib.crc32(user_id.encode()) % len(SHARDS)]

conn = connect(shard_for(uid))                          # 한 대만 찌른다
conn.execute("SELECT * FROM items WHERE owner_id = %s", (uid,))
```

`owner_id` 로 찾는 쿼리는 한 대만 보면 되지만, `WHERE name LIKE '%GPU%'` 처럼 **샤드 키가 없는 조회는 3대에 다 물어봐서 합쳐야** 한다. 샤드가 다른 두 사용자의 데이터를 JOIN 하거나 한 트랜잭션으로 묶는 건 사실상 못 하므로, 같이 쓰일 데이터는 같은 키로 같은 샤드에 모은다. 샤드를 4대로 늘리면 `% 3` 이 `% 4` 로 바뀌어 데이터를 대거 옮겨야 하니 실무는 일관된 해싱(consistent hashing)이나 Citus(Postgres)·Vitess(MySQL)·MongoDB 같은 샤딩 내장 도구를 쓴다. 순서는 인덱스 → 읽기 사본 → 서버 증설 → 캐시 → **그래도 안 되면 샤딩**이다. 면접에서는 "샤딩과 레플리케이션의 차이는?", "샤드 키는 어떻게 정하나?" 로 나온다.

## 헷갈리기 쉬운 것

- **레플리케이션**은 **같은** 데이터를 여러 대에 복사(읽기 분산·장애 대비), 샤딩은 **다른** 데이터를 여러 대에 분산(쓰기·용량 분산). 보통 샤드마다 다시 레플리카를 둔다.
- **파티셔닝**은 한 서버 안에서 표를 조각내는 것(Postgres `PARTITION BY RANGE (created_at)`). 샤딩은 그 조각을 서버 여러 대에 흩는 것이라 조인·트랜잭션 제약이 생긴다.
- **수직 분할**은 열이나 표를 기능별로 다른 DB 에 두는 것(사용자 DB·주문 DB). 샤딩은 같은 표의 **행**을 나누는 수평 분할이다.
