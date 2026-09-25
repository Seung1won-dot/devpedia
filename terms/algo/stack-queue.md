---
id: stack-queue
term: 스택/큐
aliases:
  - Stack/Queue
  - 스택
  - 큐
  - LIFO/FIFO
category: algo
tags:
  - 선형구조
level: 1
related:
  - array
  - recursion
  - bfs-dfs
  - message-queue
  - stack-heap-memory
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**스택**은 나중에 넣은 것을 먼저, **큐**는 먼저 넣은 것을 먼저 꺼내는 한 줄짜리 자료구조.

## 비유

스택은 **쌓아 둔 접시** — 맨 위에 올린 접시를 맨 먼저 집는다. 큐는 **식당 줄** — 먼저 온 사람이 먼저 들어간다.

## 예시

```python
from collections import deque

stack = []                            # 스택: 브라우저 '뒤로 가기'
stack.append("/c/algo"); stack.append("/t/heap")
print(stack.pop())                    # "/t/heap" — 마지막에 간 페이지부터 되돌아감

queue = deque()                       # 큐: GPU 서버 학습 작업 대기열
queue.append("exp-01"); queue.append("exp-02")
print(queue.popleft())                # "exp-01" — 먼저 제출한 작업부터 실행
```

함수 호출 기록(콜 스택), 괄호 짝 검사, 실행 취소(Ctrl+Z)는 스택. 프린터 대기열, BFS 의 방문 순서, 서버 사이 작업 전달은 큐.

## 헷갈리기 쉬운 것

- **힙**: 이름이 비슷하지만 "가장 작은(큰) 것" 을 먼저 꺼내는 우선순위 큐다. 넣은 순서가 아니라 값의 크기가 기준.
- **메시지 큐**(RabbitMQ 등): 큐라는 개념을 서버 사이 통신에 적용한 시스템. 자료구조로서의 큐가 프로세스·네트워크를 넘어 커진 것.
- **스택 메모리**: 함수 호출 기록을 스택 구조로 쌓아 두는 메모리 영역. 재귀가 너무 깊으면 이게 넘쳐 스택 오버플로가 난다.
