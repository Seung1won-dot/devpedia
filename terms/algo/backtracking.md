---
id: backtracking
term: 백트래킹
aliases:
  - Backtracking
  - 되추적
  - 퇴각 검색
  - 가지치기
category: algo
tags:
  - 탐색
  - 코딩테스트
level: 2
kind: concept
related:
  - recursion
  - bfs-dfs
  - dynamic-programming
  - stack-queue
  - coding-test-topics
  - combinatorics
status: review
created: 2026-09-29
updated: 2026-10-03
---

## 한 줄 정의

답이 될 가능성이 없어진 순간 **한 걸음 되돌아가 다른 길을 시도**하는 탐색.

## 비유

**미로에서 막다른 골목**을 만나면 마지막 갈림길까지 되돌아가 안 가 본 쪽으로 간다. 갈림길에 "이쪽은 벽" 표시를 해 두면 같은 골목에 다시 들어가지 않는다.

## 예시

```python
def n_queens(n):
    cols, diag1, diag2, out = set(), set(), set(), []
    def place(row, board):
        if row == n:                                   # 퀸 n 개 다 놓음 = 답 하나
            out.append(board); return
        for c in range(n):
            if c in cols or row - c in diag1 or row + c in diag2:
                continue                               # 가지치기: 공격받는 칸은 안 감
            cols.add(c); diag1.add(row - c); diag2.add(row + c)      # 선택
            place(row + 1, board + [c])                              # 재귀
            cols.remove(c); diag1.remove(row - c); diag2.remove(row + c)   # 선택 취소
    place(0, [])
    return out

len(n_queens(8))        # 92
```

핵심은 "선택 → 재귀 → 선택 취소" 세 줄이 항상 짝으로 있다는 것이다. 8-Queen 을 순수 완전탐색으로 하면 8^8(약 1,600만) 가지를 다 보지만, 놓자마자 충돌을 검사해 잘라내면 수천 번 안에 끝난다. 코딩테스트의 순열·조합·부분집합 생성, 스도쿠, "N 과 M" 시리즈가 전부 이 틀이고, 면접에선 "완전탐색과 백트래킹의 차이는?", "DFS 와는 뭐가 다른가?" 로 나온다.

## 헷갈리기 쉬운 것

- **완전탐색(브루트 포스)**: 모든 경우를 끝까지 다 만들어 본다. 백트래킹은 만들다가 "이미 글렀다" 싶으면 그 아래를 통째로 건너뛴다(가지치기). 최악의 경우엔 같은 시간이 든다.
- **DFS**: 백트래킹은 DFS 로 구현하지만, 그래프의 정점을 방문하는 게 아니라 "결정의 나무" 를 내려가며 상태를 만들고 되돌린다는 점이 다르다.
- **동적 프로그래밍**: DP 는 겹치는 부분 문제의 답을 저장하고, 백트래킹은 저장 없이 경로를 되짚는다. 답을 "전부 나열" 해야 하면 백트래킹, "개수나 최댓값 하나" 면 DP 가 먼저 떠올라야 한다.
