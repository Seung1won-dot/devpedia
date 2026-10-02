---
id: consistent-hashing
term: 일관된 해싱
aliases:
  - Consistent Hashing
  - 해시 링
  - Hash Ring
  - 가상 노드
category: distributed
tags:
  - 해시
  - 분산시스템
  - 캐시
level: 3
kind: concept
related:
  - sharding
  - cache
  - hash-table
  - load-balancer
  - redis
  - replication
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

서버가 늘거나 줄 때 **일부 키만 자리를 옮기도록** 키와 서버를 원형 해시 공간에 배치하는 방법.

## 비유

원형 테이블에 손님(키)과 웨이터(서버)를 함께 앉히고, 손님은 시계 방향으로 가장 가까운 웨이터가 맡는다. 웨이터 한 명이 빠지면 그 사람 손님만 옆 웨이터에게 넘어가고 나머지는 그대로다.

## 예시

```python
import bisect, hashlib

def h(s: str) -> int:
    return int(hashlib.md5(s.encode()).hexdigest(), 16)

class Ring:
    def __init__(self, nodes, vnodes=100):
        self.ring = sorted((h(f"{n}#{i}"), n) for n in nodes for i in range(vnodes))
        self.keys = [k for k, _ in self.ring]

    def get(self, key: str) -> str:
        i = bisect.bisect(self.keys, h(key)) % len(self.keys)
        return self.ring[i][1]

before = Ring(["cache-a", "cache-b", "cache-c"])
after = Ring(["cache-a", "cache-b", "cache-c", "cache-d"])
keys = [f"patient:{i}" for i in range(10000)]
moved = sum(before.get(k) != after.get(k) for k in keys)
print(f"{moved / len(keys):.0%} 이동")   # 대략 25% 근처
```

단순히 `hash(key) % N` 으로 나누면 서버를 3대에서 4대로 늘릴 때 키의 약 75% 가 다른 서버로 가서 캐시가 한꺼번에 비어 DB 가 몰매를 맞는다. 링에서는 새 서버가 맡을 몫(약 1/4)만 옮긴다. `vnodes`(가상 노드)는 서버 하나를 링 위 여러 점에 뿌려 쏠림을 줄이는 장치다.

**트레이드오프**: 노드 추가·제거가 잦은 캐시, 키-값 저장소(Cassandra, DynamoDB 계열)에 잘 맞는다. 노드가 고정이거나 범위 조회(날짜 구간)가 중요하면 범위 기반 샤딩이 낫다. Redis Cluster 는 링 대신 16384개 고정 슬롯을 나눠 갖는 방식을 쓴다.

## 헷갈리기 쉬운 것

- **해시 테이블**의 `% 크기` 는 한 프로세스 안이라 리해싱해도 메모리 안에서 끝난다. 분산 환경에서는 그 리해싱이 네트워크로 대량 데이터를 옮기는 일이라 비싸다.
- **로드 밸런서**의 라운드 로빈은 요청을 아무 서버에나 보내도 될 때 쓰고, 일관된 해싱은 "같은 키는 늘 같은 서버로" 가 필요할 때(캐시 적중, 세션 고정) 쓴다.
