---
id: two-pointers
term: 투 포인터/슬라이딩 윈도우
aliases:
  - Two Pointers
  - Sliding Window
  - 투포인터
  - 슬라이딩 윈도우
  - 두 포인터
category: algo
tags:
  - 선형구조
  - 코딩테스트
level: 2
kind: concept
related:
  - array
  - deque
  - binary-search
  - sorting
  - hash-table
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

배열 위에 **두 개의 위치 표시를 두고 조건에 따라 한쪽씩만 밀어** 한 번의 순회로 끝내는 기법.

## 비유

**긴 두루마리에서 조건에 맞는 구간 찾기**. 왼손과 오른손으로 양 끝을 잡고 "너무 길면 왼손을 당기고, 부족하면 오른손을 펴며" 한 번만 훑으면, 모든 구간 조합을 일일이 재 보지 않아도 된다.

## 예시

```python
def two_sum_sorted(nums, target):         # 정렬된 배열에서 합이 target 인 두 수
    lo, hi = 0, len(nums) - 1             # 양 끝에서 출발
    while lo < hi:
        s = nums[lo] + nums[hi]
        if s == target: return nums[lo], nums[hi]
        if s < target: lo += 1            # 작으면 왼쪽을 키운다
        else:          hi -= 1            # 크면 오른쪽을 줄인다

def min_window_len(nums, k):              # 부분합 >= k 인 최소 길이 (양수 배열)
    lo, s, best = 0, 0, float("inf")
    for hi, x in enumerate(nums):         # 창 오른쪽 끝을 한 칸씩 늘리고
        s += x
        while s >= k:                     # 조건을 만족하는 동안 왼쪽을 당긴다
            best, s, lo = min(best, hi - lo + 1), s - nums[lo], lo + 1
    return best
```

두 수의 합을 이중 for 문으로 짜면 O(n²) 이지만, 정렬된 배열에서 양 끝 포인터를 안쪽으로만 밀면 O(n) 이다. `lo`, `hi` 가 각각 최대 n 칸만 움직이니 안쪽에 `while` 이 있어도 전체는 O(n) 이라는 게 핵심 논리다. 코딩테스트에선 "연속 부분 수열의 합", "중복 없는 가장 긴 문자열", "용액(합이 0 에 가장 가까운 두 수)" 이 단골이고, 면접에선 "O(n²) 을 O(n) 으로 줄여 본 경험" 을 물을 때 꺼내기 좋다.

## 헷갈리기 쉬운 것

- **투 포인터 vs 슬라이딩 윈도우**: 투 포인터는 두 위치가 양 끝에서 오거나 다른 속도로 가는 것까지 포함하고, 슬라이딩 윈도우는 그중 "연속 구간(창)의 왼쪽·오른쪽 끝" 을 같은 방향으로 미는 특수한 경우다.
- **이진 탐색**: 이진 탐색도 `lo`, `hi` 를 쓰지만 매번 절반을 버려 O(log n) 이고, 투 포인터는 한 칸씩 밀며 O(n) 이다. "정렬된 배열에서 두 수의 합" 은 둘 다 되지만 투 포인터가 더 간단하다.
- **음수가 섞인 부분합**: 슬라이딩 윈도우는 "오른쪽을 늘리면 합이 커진다" 는 단조성이 필요하다. 음수가 있으면 깨지므로 누적합 + 해시로 푼다.
