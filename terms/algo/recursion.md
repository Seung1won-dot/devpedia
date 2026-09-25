---
id: recursion
term: 재귀
aliases:
  - Recursion
  - 재귀 호출
  - 재귀 함수
  - 리커전
category: algo
tags:
  - 트리
  - 함수형
level: 1
related:
  - tree
  - dynamic-programming
  - bfs-dfs
  - stack-heap-memory
  - functional-programming
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

함수가 **더 작은 같은 문제로 자기 자신을 다시 부르고**, 가장 작은 경우에서 멈추는 방식.

## 비유

**마트료시카 인형**. 열면 똑같이 생긴 더 작은 인형이 나오고, 더는 못 여는 제일 작은 인형(종료 조건)이 나오면 거기서부터 거꾸로 다시 닫아 나간다.

## 예시

```python
import os

def total_size(path):
    if os.path.isfile(path):                        # 종료 조건: 파일이면 크기 그대로
        return os.path.getsize(path)
    return sum(total_size(os.path.join(path, name))  # 폴더면 자식들의 합 — 자식도 같은 문제
               for name in os.listdir(path))

print(total_size("terms"))   # terms/ 아래 모든 카드 크기 합 — 폴더 깊이가 얼마든 코드는 그대로
```

폴더·트리·JSON 처럼 "안에 같은 구조가 또 있는" 데이터는 재귀가 반복문보다 짧고 자연스럽다. DFS, 병합 정렬, 트리 순회가 대표적.

## 헷갈리기 쉬운 것

- **반복문**: 재귀로 되는 건 전부 반복문(+스택)으로도 된다. 파이썬은 기본 재귀 깊이 제한이 1000이라, 깊이가 깊으면(긴 연결 리스트 등) 반복문으로 바꿔야 한다.
- **동적 프로그래밍**: 재귀가 같은 계산을 여러 번 반복할 때(피보나치) 결과를 저장해 두는 것. 재귀 + 메모 = 톱다운 DP.
- **스택 오버플로**: 종료 조건이 없거나 너무 깊으면 함수 호출 기록이 쌓이는 스택 메모리가 넘친다.
