---
id: page-replacement
term: 페이지 교체(LRU/FIFO)
aliases:
  - Page Replacement Algorithm
  - 페이지 교체 알고리즘
  - LRU
  - FIFO
  - Clock 알고리즘
  - Belady 의 모순
category: os
tags:
  - 메모리관리
  - 캐시
level: 2
kind: concept
related:
  - page-fault
  - virtual-memory
  - locality
  - cache
  - key-value-store
  - hash-table
  - lru-cache
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

RAM 이 꽉 찼을 때 **어느 페이지를 내보낼지 고르는** 규칙.

## 비유

책상이 꽉 찼을 때 어떤 책을 서랍에 넣을지. **가장 먼저 꺼낸 책(FIFO)**, **가장 오랫동안 안 펼친 책(LRU)**, **앞으로 가장 늦게 볼 책(OPT, 미래를 알아야 함)** 중 하나를 고른다.

## 예시

```python
from collections import OrderedDict

class LRU:                                   # 해시 + 순서 = O(1) LRU
    def __init__(self, cap): self.cap, self.d = cap, OrderedDict()
    def get(self, k):
        if k not in self.d: return None      # miss
        self.d.move_to_end(k); return self.d[k]
    def put(self, k, v):
        self.d[k] = v; self.d.move_to_end(k)
        if len(self.d) > self.cap: self.d.popitem(last=False)  # 가장 오래 안 쓴 것 제거
```

```text
# redis.conf — 같은 아이디어를 Redis 가 키 단위로 쓴다
maxmemory 2gb
maxmemory-policy allkeys-lru
```

참조열 `1 2 3 4 1 2 5 1 2 3 4 5` 를 프레임 3개로 돌리면 FIFO 9번, LRU 10번, OPT 7번 폴트가 난다. 프레임을 4개로 늘리면 FIFO 는 오히려 10번으로 **늘어나는데**, 이게 **Belady 의 모순**이고 LRU·OPT 에서는 안 생긴다. 실제 커널은 매 접근마다 시각을 기록할 수 없어 참조 비트 하나로 LRU 를 흉내 내는 **Clock(Second Chance)** 을 쓴다. 면접에서는 "LRU 를 O(1) 로 구현하려면?(해시맵 + 이중 연결 리스트)" 이 코딩 문제로도 나온다.

## 헷갈리기 쉬운 것

- **LRU vs LFU**: LRU 는 "마지막으로 쓴 지 오래된 것", LFU 는 "쓴 횟수가 적은 것" 을 버린다. Redis 는 둘 다 정책으로 제공한다.
- **OPT 는 실제로 못 쓴다**: 미래 참조를 알아야 하므로 다른 알고리즘의 성능 상한선을 재는 기준으로만 쓴다.
- **페이지 교체 vs 캐시 교체**: 층만 다르고 같은 문제다. CPU 캐시·OS 페이지·Redis 키·브라우저 캐시 모두 "꽉 찼을 때 뭘 버리나" 를 푼다.
