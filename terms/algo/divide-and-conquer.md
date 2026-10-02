---
id: divide-and-conquer
term: 분할 정복
aliases:
  - Divide and Conquer
  - 분할정복
  - 분할 정복법
category: algo
tags:
  - 복잡도
  - 정렬
  - 탐색
level: 2
kind: concept
related:
  - recursion
  - sorting
  - binary-search
  - dynamic-programming
  - stable-sort
  - segment-tree
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

문제를 **같은 모양의 작은 문제로 쪼개 각각 풀고**, 답을 합쳐 원래 문제를 푸는 방법.

## 비유

**시험지 1만 장 채점**. 혼자 다 보지 않고 반씩 나눠 두 사람에게, 그들은 또 반씩 나눠 주고, 다 된 점수표를 거꾸로 합치면 끝이다.

## 예시

```python
def merge_sort(arr):
    if len(arr) <= 1:                       # 기저 조건: 더 못 쪼개면 그대로 답
        return arr
    mid = len(arr) // 2
    left, right = merge_sort(arr[:mid]), merge_sort(arr[mid:])   # 분할 + 정복
    return merge(left, right)                                     # 결합

def merge(a, b):
    out, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]: out.append(a[i]); i += 1   # <= 라서 안정 정렬
        else:            out.append(b[j]); j += 1
    return out + a[i:] + b[j:]
```

절반씩 쪼개면 깊이가 log n 이고 층마다 합치는 데 n 이 들어 O(n log n) 이다. 병합 정렬·퀵 정렬·이진 탐색(한쪽 절반만 남기니 O(log n))·빠른 거듭제곱이 전부 이 틀이고, 재귀 함수에 "기저 조건 → 쪼개기 → 합치기" 세 부분이 보이면 분할 정복이다. 코딩테스트에선 "Z 모양 순회", "색종이 만들기(쿼드트리)" 처럼 격자를 4등분하는 문제가 단골이고, 면접에선 "분할 정복과 DP 의 차이는?" 이 나온다.

## 헷갈리기 쉬운 것

- **동적 프로그래밍**: 둘 다 쪼개서 풀지만, DP 는 **부분 문제가 겹쳐서** 한 번 푼 답을 저장해 재사용한다. 병합 정렬의 왼쪽 절반과 오른쪽 절반은 서로 겹치지 않으니 저장할 게 없다.
- **재귀**: 재귀는 함수가 자기를 부르는 코딩 기법이고, 분할 정복은 문제를 푸는 전략이다. 분할 정복은 보통 재귀로 짜지만 반복문으로도 된다(상향식 병합 정렬).
- **그리디**: 그리디는 쪼개지 않고 매 순간 최선을 골라 앞으로만 간다. 분할 정복은 부분 답을 모두 구한 뒤 합친다.
