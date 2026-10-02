---
id: distributed-lock
term: 분산 락
aliases:
  - Distributed Lock
  - Redlock
  - 펜싱 토큰
  - Fencing Token
category: distributed
tags:
  - 동기화
  - Redis
  - 분산시스템
level: 3
kind: pattern
related:
  - db-lock
  - redis
  - mutex
  - leader-election
  - clock-skew
  - idempotency
see_also:
  - https://redis.io/docs/latest/develop/use/patterns/distributed-locks/
  - https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

여러 서버의 프로세스가 **같은 자원을 한 번에 하나만 쓰도록** 네트워크 너머에서 잡는 락.

## 비유

공용 회의실 열쇠를 경비실에 맡겨 두고 빌려 가는 것. 다만 빌린 사람이 연락 두절되면 영영 못 쓰니 "1시간 뒤엔 자동 반납" 규칙을 붙인다 — 그 사람이 1시간 넘게 졸다 깨어나 회의실에 들어오는 게 문제다.

## 예시

```bash
# Redis: 키가 없을 때만(NX) 30초 만료(PX)로 락을 잡는다. 값은 내 고유 ID
redis-cli SET lock:emr-export 7f3a-worker2 NX PX 30000
# 성공하면 OK, 이미 누가 잡았으면 (nil)
```

풀 때는 "값이 내 ID 일 때만 삭제" 를 Lua 스크립트로 원자적으로 해야 남의 락을 지우지 않는다. 연구실에서 워커 3대가 같은 EMR 추출 작업을 중복으로 돌리지 않게 막는 정도라면 이것으로 충분하다.

**Redlock 논쟁**: Redis 쪽은 독립 Redis 5대 중 과반에서 락을 잡는 Redlock 을 제안했고, Martin Kleppmann 은 "GC 멈춤이나 시계 점프로 만료 후에도 자기가 락을 가졌다고 믿는 프로세스가 생긴다, 정확성이 필요하면 안전하지 않다" 고 반박했다. 반박의 처방은 **펜싱 토큰** — 락을 줄 때마다 증가하는 번호를 주고, 저장소가 더 작은 번호의 쓰기를 거부하게 하는 것이다. 어느 쪽이 맞는지는 아직 의견이 갈린다 [확인 필요].

**트레이드오프**: 중복 실행이 "비용 낭비" 수준이면 Redis 단일 락으로 충분하다. 중복이 "데이터 손상" 이면 etcd·ZooKeeper 같은 합의 기반 락 + 펜싱 토큰을 쓰거나, 아예 작업을 멱등하게 만들어 락 의존을 줄이는 편이 낫다.

## 헷갈리기 쉬운 것

- **DB 락**(`SELECT ... FOR UPDATE`)은 DB 한 대가 자기 행을 보호하는 것이고, 분산 락은 DB 와 무관한 작업(파일 생성, 외부 API 호출)까지 여러 서버 사이에서 막는다. 같은 PostgreSQL 을 공유한다면 advisory lock 이 가장 간단한 분산 락이다.
- **뮤텍스**는 한 프로세스 안 스레드끼리라 락 주인이 죽으면 OS 가 안다. 분산 락은 주인이 죽었는지 느린지 모르기 때문에 만료 시간이 필수다.
