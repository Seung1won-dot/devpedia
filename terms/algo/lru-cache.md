---
id: lru-cache
term: LRU 캐시
aliases:
  - LRU Cache
  - Least Recently Used
  - 최근 최소 사용 캐시
  - functools.lru_cache
category: algo
tags:
  - 캐시
  - 해시
  - 선형구조
  - 코딩테스트
level: 2
kind: pattern
related:
  - page-replacement
  - cache
  - hash-table
  - linked-list
  - memoization
  - redis
see_also:
  - "https://docs.python.org/3/library/functools.html#functools.lru_cache"
  - "https://docs.python.org/3/library/collections.html#collections.OrderedDict"
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

자리가 꽉 차면 **가장 오래 안 쓴 항목부터 버리는** 캐시 규칙.

## 비유

**옷장 정리**. 자리가 없으면 가장 오랫동안 안 입은 옷부터 치우고, 어제 입은 옷은 손 닿는 앞자리에 걸어 둔다.

## 예시

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap, self.d = capacity, OrderedDict()   # 해시 + 순서 → get/put 모두 O(1)

    def get(self, key):
        if key not in self.d: return -1
        self.d.move_to_end(key)                      # 방금 썼으니 맨 뒤(최신)로
        return self.d[key]

    def put(self, key, value):
        self.d[key] = value
        self.d.move_to_end(key)
        if len(self.d) > self.cap:
            self.d.popitem(last=False)               # 맨 앞 = 가장 오래 안 쓴 것 제거

c = LRUCache(2)
c.put("P001", "홍길동"); c.put("P002", "김철수")
c.get("P001")                                        # P001 이 최신이 됨
c.put("P003", "이영희")                              # 꽉 참 → P002 가 쫓겨남
print(c.get("P002"))                                 # -1
```

LeetCode 146 "LRU Cache" 가 정확히 이 코드이고, 면접의 "O(1) 로 구현하려면?" 정답은 해시맵 + 이중 연결 리스트(`OrderedDict` 의 속이 그것) 다. 실무에서는 직접 짜기보다 `@functools.lru_cache(maxsize=128)` 을 함수에 붙이거나, Redis 에 `maxmemory-policy allkeys-lru` 를 켜서 환자 조회 API 결과 같은 걸 담아 둔다.

## 헷갈리기 쉬운 것

- **FIFO**: 들어온 순서로만 버린다. 자주 쓰는 항목도 오래됐다는 이유로 쫓겨난다. LRU 는 쓸 때마다 뒤로 보내 살려 둔다.
- **LFU**: "몇 번 썼나" 로 버린다. 옛날에 많이 쓰고 지금은 안 쓰는 항목이 오래 남는 단점이 있어 LRU 가 기본값인 경우가 많다.
- **메모이제이션**: "결과를 저장한다" 는 쪽. LRU 는 그 저장소가 꽉 찼을 때 "뭘 버릴지" 정하는 규칙이다. `lru_cache(maxsize=None)` 은 안 버리는 순수 메모이제이션.
- **TTL(만료 시간)**: 시간이 지나면 버린다. LRU 는 공간 기준이라 둘을 같이 쓰는 경우(Redis)가 흔하다.
