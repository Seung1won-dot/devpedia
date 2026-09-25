---
id: greedy
term: 그리디
aliases:
  - Greedy Algorithm
  - 탐욕 알고리즘
  - 탐욕법
  - 그리디 알고리즘
category: algo
tags:
  - 탐색
  - 정렬
level: 2
related:
  - dynamic-programming
  - dijkstra
  - sorting
  - heap
  - scheduler
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

매 순간 **지금 가장 좋아 보이는 선택**만 하고 되돌리지 않는 문제 풀이 방식.

## 비유

**거스름돈 주기**. 500원·100원·50원·10원이면 큰 동전부터 되는 만큼 주는 게 항상 최소 개수지만, 동전이 400원·300원·100원이면 이 방법이 틀린다(700원은 400+300 두 개인데 400+100+100+100 네 개를 준다).

## 예시

```python
# GPU 서버 예약: 겹치지 않게 최대한 많은 실험을 넣기 → "가장 빨리 끝나는 것부터" 고르면 최적
requests = [(9, 12, "실험A"), (10, 11, "실험B"), (11, 13, "실험C"), (13, 15, "실험D")]

chosen, last_end = [], 0
for start, end, name in sorted(requests, key=lambda r: r[1]):   # 끝나는 시각순 정렬
    if start >= last_end:                                        # 앞 것과 안 겹치면 바로 선택
        chosen.append(name); last_end = end

print(chosen)   # ['실험B', '실험C', '실험D'] — 실험A 를 먼저 고르면 2개밖에 못 넣음
```

다익스트라, 허프만 압축, OS 의 최단 작업 우선(SJF) 스케줄링이 그리디다. 그리디는 보통 "정렬 한 번 + 한 번 훑기" 라 빠르다.

## 헷갈리기 쉬운 것

- **동적 프로그래밍**: DP 는 모든 경우를 (저장해 가며) 다 보니 항상 맞지만 느리고, 그리디는 빠르지만 "지금 최선이 전체 최선" 이 성립하는 문제에서만 맞다. 확신이 없으면 반례를 찾아보거나 DP 로.
- **휴리스틱**: 그리디를 "최적은 보장 못 해도 괜찮은 답을 빨리" 얻는 용도로 쓰기도 한다. 그때는 틀려도 되는 상황인지가 중요.
