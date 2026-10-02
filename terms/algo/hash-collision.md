---
id: hash-collision
term: 해시 충돌(체이닝/개방 주소법)
aliases:
  - Hash Collision
  - 해시 충돌
  - 체이닝
  - 개방 주소법
  - Open Addressing
  - 로드 팩터
category: algo
tags:
  - 해시
  - 면접
level: 2
kind: concept
related:
  - hash-table
  - hash
  - linked-list
  - big-o
  - balanced-tree
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

서로 다른 키가 **같은 칸 번호**로 계산되어 부딪히는 일과 그 처리법.

## 비유

**우편함이 100칸인 아파트에 101세대**가 살면 누군가는 같은 칸을 써야 한다. 한 칸에 봉투를 여러 장 겹쳐 두는 게 체이닝, 옆의 빈 칸을 찾아 넣는 게 개방 주소법이다.

## 예시

```python
class ChainedDict:                      # 체이닝: 칸마다 리스트
    def __init__(self, size=8):
        self.buckets = [[] for _ in range(size)]

    def put(self, key, val):
        b = self.buckets[hash(key) % len(self.buckets)]
        for pair in b:
            if pair[0] == key:
                pair[1] = val; return
        b.append([key, val])            # 같은 칸이면 그냥 덧붙인다

    def get(self, key):
        b = self.buckets[hash(key) % len(self.buckets)]
        return next((v for k, v in b if k == key), None)
```

개방 주소법(선형 탐사)은 `idx = (hash(key) + i) % size` 로 i 를 1씩 늘리며 빈 칸을 찾는다. 어느 쪽이든 **로드 팩터(저장 개수 ÷ 칸 수)** 가 커지면 충돌이 늘어 O(1) 이 무너지므로, 파이썬 dict 은 2/3, Java HashMap 은 0.75 를 넘으면 칸을 2배로 늘리고 전부 다시 넣는다(리해싱). Java 8 부터는 한 칸의 체인이 8개를 넘으면 리스트 대신 레드-블랙 트리로 바꿔 최악을 O(log n) 으로 막는다. 면접 단골은 "체이닝과 개방 주소법의 차이와 장단점은?", "로드 팩터가 뭐고 왜 0.75 인가?" 다.

## 헷갈리기 쉬운 것

- **체이닝 vs 개방 주소법**: 체이닝은 칸 밖에 리스트를 달아 로드 팩터가 1 을 넘어도 동작하고 삭제가 쉽다. 개방 주소법은 배열 안에서만 해결해 캐시 친화적이지만, 삭제 시 "지운 자리" 표시(tombstone)가 필요하고 뭉침(clustering)이 생긴다.
- **암호학적 해시 충돌**: SHA-256 같은 해시에서 충돌은 보안 사고다. 해시 테이블의 충돌은 정상적인 일이고 처리법이 정해져 있다.
- **해시 함수가 나쁜 것**: 충돌은 좋은 해시로도 피할 수 없다(비둘기집 원리). 다만 나쁜 해시는 충돌을 한 칸에 몰아 O(n) 으로 만든다.
