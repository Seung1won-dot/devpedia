---
id: replication
term: 레플리케이션
aliases:
  - Replication
  - 데이터베이스 복제
  - 복제
  - 리플리케이션
category: database
tags:
  - 운영
  - 성능
level: 3
kind: concept
related:
  - backup-restore
  - load-balancer
  - transaction-acid
  - healthcheck
  - rdbms
  - sharding
  - cqrs
see_also:
  - https://www.postgresql.org/docs/current/high-availability.html
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

한 DB 의 변경을 **다른 서버에 실시간으로 똑같이 복사**해 사본을 유지하는 것.

## 비유

원본 장부를 쓰는 사람 옆에 **받아쓰기하는 서기**가 앉아 있는 것. 원본이 불에 타도 서기 장부가 남고, 조회하러 온 손님은 서기 장부를 봐도 되니 원본 담당은 쓰기에만 집중한다.

## 예시

```sql
-- primary(원본) 에서: 복제 전용 계정
CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD '...';
```

```bash
# replica(사본) 서버에서: 원본을 통째로 받아 대기(standby) 모드로 시작
pg_basebackup -h 10.0.0.11 -U replicator -D /var/lib/postgresql/data -R
```

이후 원본에 들어오는 쓰기는 WAL(변경 기록)로 사본에 계속 흘러간다. 읽기 요청은 사본으로 돌려 부하를 나누고, 원본이 죽으면 사본을 승격시켜 서비스를 잇는다. Supabase 의 Read Replica 기능이 이것이다. [확인 필요: 제공 플랜·리전 조건]

## 헷갈리기 쉬운 것

- **백업**은 특정 시점의 사본을 따로 떠 두는 것. 레플리케이션은 실시간 따라쓰기라 원본에서 `DROP TABLE` 을 실수하면 사본에도 즉시 반영되므로 백업을 대체하지 못한다.
- **샤딩**은 데이터를 **나눠** 여러 서버에 담는 것, 레플리케이션은 **같은** 데이터를 여러 서버에 두는 것.
