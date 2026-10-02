---
id: np-complete
term: NP-완전 · 환원
aliases:
  - NP-Complete
  - NP-Hard
  - NP-난해
  - Reduction
  - 다항 시간 환원
category: theory
tags:
  - 계산이론
  - 복잡도
  - 코딩테스트
level: 3
kind: concept
related:
  - p-vs-np
  - dynamic-programming
  - greedy
  - backtracking
  - big-o
  - combinatorics
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

NP 문제 전부를 **변환(환원)해 넣을 수 있는**, NP 안에서 가장 어려운 문제들의 묶음.

## 비유

**만능 열쇠 구멍**. 외판원 문제 하나만 빠르게 푸는 법을 찾으면 다른 NP 문제 전부를 그 모양으로 바꿔 풀 수 있으니, 하나가 뚫리면 전부 뚫린다.

## 예시

대표 NP-완전 문제: **SAT**(논리식 참 만들기), **배낭 문제**(결정 버전), **그래프 색칠**, **외판원 문제(TSP)** 결정 버전, 부분집합 합. 연구실 실무에서 "학회 일정 겹치지 않게 GPU 예약 배치", "여러 병동 순회 최단 경로"가 이런 모양이다.

```python
# 0/1 배낭: 정확해는 O(n·W) DP — W 가 작을 때만 빠른 '의사 다항' 시간
def knapsack(items, W):            # items = [(무게, 가치), ...]
    dp = [0] * (W + 1)
    for w, v in items:
        for c in range(W, w - 1, -1):
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[W]
print(knapsack([(3, 4), (4, 5), (2, 3)], 6))  # 8
```

**환원**은 "문제 A 를 B 로 바꿔 푸는 것"이다. 이미 NP-완전인 문제를 내 문제로 환원할 수 있으면 내 문제도 그만큼 어렵다는 증명이 된다. 트레이드오프: 입력이 작으면(N ≤ 20 정도) 백트래킹·비트마스크 DP 로 정확해, 크면 그리디·지역 탐색·OR-Tools 같은 솔버로 **충분히 좋은 근사해**를 택한다. 문제가 NP-완전임을 알아보는 것만으로 "더 빠른 정확 알고리즘 찾기"에 시간을 버리지 않게 된다.

## 헷갈리기 쉬운 것

- **NP-완전 vs NP-난해**: NP-난해는 "최소한 NP-완전만큼 어렵다"로, NP 안에 없어도 된다(최적화 버전 TSP, 정지 문제).
- 코테에 나오는 배낭 문제가 풀리는 이유는 W 가 작아서다. W 가 10^18 이면 같은 DP 는 못 쓴다.
