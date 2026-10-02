---
id: bloom-filter
term: 블룸 필터
aliases:
  - Bloom Filter
  - 블룸필터
  - 확률적 자료구조
category: algo
tags:
  - 해시
  - 메모리
  - 성능
  - 분산시스템
level: 3
kind: concept
related:
  - hash-table
  - hash
  - set-map
  - cache
  - redis
  - sensitivity-specificity
see_also:
  - https://www.postgresql.org/docs/current/bloom.html
  - https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

원소가 **"없다" 는 확실히, "있다" 는 가끔 틀리게** 답하는 대신 메모리를 아주 적게 쓰는 집합.

## 비유

**출입 명부 대신 쓰는 도장판**. 사람마다 정해진 칸 몇 개에 도장을 찍어 두면, 빈 칸이 하나라도 있는 사람은 확실히 안 왔고, 다 찍혀 있으면 "아마" 왔다(남들이 우연히 그 칸들을 다 찍었을 수도).

## 예시

```python
import hashlib

class BloomFilter:
    def __init__(self, m=1 << 20, k=5):        # m 비트, 해시 함수 k 개
        self.m, self.k, self.bits = m, k, 0    # 정수 하나를 비트 배열로 쓴다

    def _positions(self, item):                # 시드만 바꿔 해시 k 개를 흉내 낸다
        for i in range(self.k):
            h = hashlib.sha256(f"{i}:{item}".encode()).digest()
            yield int.from_bytes(h[:8], "big") % self.m

    def add(self, item):
        for p in self._positions(item): self.bits |= 1 << p

    def might_contain(self, item):
        return all(self.bits >> p & 1 for p in self._positions(item))

seen = BloomFilter()
for pid in ["P001", "P002", "P003"]: seen.add(pid)
print(seen.might_contain("P002"))   # True  — 실제로 있음
print(seen.might_contain("P999"))   # False — 확실히 없음(거짓 음성은 절대 없다)
```

원소 자체는 저장하지 않아 1% 오탐 기준 원소당 약 9.6비트, ID 100만 개가 1.2MB 면 된다(`set` 이면 수십 MB). 트레이드오프: 삭제가 안 되고, 원소 수를 잘못 잡으면 오탐이 치솟는다. 그래서 "없으면 비싼 조회를 건너뛰는" 자리 — 캐시에 없는 키로 DB 를 두드리기 전, Cassandra·RocksDB 가 디스크 파일을 읽기 전 — 에 쓰고, 정확한 답이나 삭제가 필요하면 그냥 해시 집합을 쓴다. Redis 의 `BF.ADD`/`BF.EXISTS`(Redis 8 부터 기본 포함 [확인 필요]), PostgreSQL 의 `bloom` 확장이 기성품이다.

## 헷갈리기 쉬운 것

- **해시 테이블/set**: 정확하지만 키 자체를 저장해 메모리를 수십 배 쓴다. 블룸 필터는 "뭐가 들어 있나" 는 못 꺼내고 "이게 있나" 만 답한다.
- **거짓 양성 vs 거짓 음성**: 없는데 "있다" 는 거짓 양성만 있고, 있는데 "없다" 는 거짓 음성은 없다. 의료 검사로 치면 민감도 100% 에 특이도가 조금 모자란 선별 검사.
- **HyperLogLog**: 같은 확률적 자료구조지만 "있냐" 가 아니라 "서로 다른 게 몇 개냐" 를 센다(Redis `PFADD`).
- **쿠쿠 필터/카운팅 블룸 필터**: 삭제가 되는 변형. 대신 메모리를 더 쓰거나 구현이 복잡하다.
