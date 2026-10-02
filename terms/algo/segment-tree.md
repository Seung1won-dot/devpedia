---
id: segment-tree
term: 세그먼트 트리
aliases:
  - Segment Tree
  - 구간 트리
  - 구간 합 트리
  - 세그트리
category: algo
tags:
  - 트리
  - 복잡도
  - 코딩테스트
level: 3
kind: concept
related:
  - tree
  - array
  - heap
  - divide-and-conquer
  - big-o
  - binary-search-tree
see_also:
  - https://cp-algorithms.com/data_structures/segment_tree.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

배열의 **구간 합·최솟값 질문과 값 변경을 둘 다 O(log n)** 에 처리하는 트리.

## 비유

**모둠·반·학년 단위로 합계를 미리 적어 둔 성적 집계표**. 3반부터 7반까지 합은 반별 합 몇 개만 더하면 되고, 학생 한 명 점수가 바뀌면 그가 속한 모둠·반·학년 칸만 고친다.

## 예시

```python
class SegmentTree:                     # 구간 합 + 한 칸 갱신, 둘 다 O(log n)
    def __init__(self, arr):
        self.n = len(arr)
        self.t = [0] * (2 * self.n)
        self.t[self.n:] = arr                               # 잎 = 원본 배열
        for i in range(self.n - 1, 0, -1):
            self.t[i] = self.t[2 * i] + self.t[2 * i + 1]   # 부모 = 두 자식의 합

    def update(self, i, value):                             # arr[i] = value
        i += self.n; self.t[i] = value
        while i > 1:
            i //= 2; self.t[i] = self.t[2 * i] + self.t[2 * i + 1]

    def query(self, l, r):                                  # sum(arr[l:r]), r 미포함
        res, l, r = 0, l + self.n, r + self.n
        while l < r:
            if l & 1: res += self.t[l]; l += 1
            if r & 1: r -= 1; res += self.t[r]
            l //= 2; r //= 2
        return res

hr = [72, 75, 80, 78, 90, 85, 70, 74]  # 1분 간격 심박수
st = SegmentTree(hr)
print(st.query(2, 6))                  # 333 = 80+78+90+85
st.update(4, 120)                      # 센서 오류 값 수정
print(st.query(2, 6))                  # 363
```

`+` 를 `min`/`max` 로 바꾸면 구간 최솟값·최댓값 트리가 된다. 트레이드오프: 값이 안 바뀌면 누적 합(갱신 없이 O(1) 질의)이 훨씬 간단하고, 질의가 합뿐이면 펜윅 트리가 코드가 짧고 메모리가 반이다. 세그먼트 트리는 "갱신과 질의가 섞여 들어오고 연산이 합 말고도 다양할 때" 고른다. 구간 전체에 더하기 같은 **구간 갱신**까지 필요하면 lazy propagation 을 얹는데, 코딩테스트 상급 단골(백준 2042 구간 합 구하기 계열)이다.

## 헷갈리기 쉬운 것

- **누적 합(prefix sum)**: 구간 합은 O(1) 이지만 값 하나를 바꾸면 뒤쪽 누적 합을 전부 O(n) 으로 다시 써야 한다.
- **펜윅 트리(BIT)**: 같은 O(log n) 을 더 짧은 코드로 하지만, 합·XOR 처럼 되돌릴 수 있는 연산에 맞다. 구간 최솟값은 세그먼트 트리가 편하다.
- **힙**: 둘 다 배열에 담긴 완전 이진 트리지만, 힙은 전체에서 최솟값 하나만 꺼내고 세그먼트 트리는 아무 구간이나 묻는다.
- **이진 탐색 트리**: 키 값으로 좌우를 나누고 모양이 데이터에 따라 바뀐다. 세그먼트 트리는 인덱스 구간으로 나누는 고정 모양이다.
