---
id: synchronization
term: 동기화
aliases:
  - Synchronization
  - 스레드 동기화
  - 프로세스 동기화
  - 동기화 기법
  - 모니터
category: os
tags:
  - 동기화
  - 스레드
level: 2
kind: concept
related:
  - mutex
  - race-condition
  - critical-section
  - deadlock
  - thread
  - db-lock
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

여러 스레드가 공유 자원을 건드릴 때 **순서와 접근을 조율**해 결과를 지키는 것.

## 비유

공용 화이트보드에 여럿이 동시에 쓰면 글자가 뒤섞인다. **"펜은 하나만, 다 쓰면 넘겨주기"** 같은 규칙을 정해 두는 게 동기화다.

## 예시

```python
import threading, queue

lock = threading.Lock()                 # 뮤텍스: 한 번에 한 스레드
cond = threading.Condition(lock)        # 조건 변수: "준비될 때까지 기다려"
q = queue.Queue(maxsize=8)              # 내부에 락+조건 변수가 든 안전한 큐

def producer(paths):
    for p in paths:
        q.put(p)                        # 꽉 차면 소비자가 빼 갈 때까지 블록
    q.put(None)                         # 끝 신호

def consumer():
    while (p := q.get()) is not None:
        embed(p)                        # 로컬 Qwen 임베딩 호출
```

파일 목록을 읽는 스레드와 임베딩을 요청하는 스레드가 리스트 하나를 직접 공유하면 순서가 꼬이지만, `queue.Queue` 를 사이에 두면 안에서 락과 조건 변수가 알아서 동기화한다. 직접 락을 잡는 건 최후의 수단이고, 이미 동기화된 자료구조를 쓰는 게 실무의 기본이다. 면접에서는 "동기화 기법 종류(뮤텍스·세마포어·모니터)와 차이는?" 이 정석 질문이다.

### 도구 한눈에

| 도구 | 역할 |
|---|---|
| 뮤텍스 | 정원 1명 자물쇠, 잠근 스레드만 풀 수 있음 |
| 세마포어 | 정원 N명 카운터 |
| 조건 변수 | 조건이 될 때까지 재웠다가 깨움 (뮤텍스와 짝) |
| 모니터 | 락+조건 변수를 객체 하나에 묶은 것 (Java `synchronized`) |

## 헷갈리기 쉬운 것

- **동기(sync)/비동기(async)** 와는 다른 말이다. 그쪽은 "결과를 기다리느냐" 의 문제, 동기화는 "여럿이 같은 것을 건드릴 때 질서" 의 문제.
- **락을 걸면 병렬성이 줄어든다**: 임계 구역이 길수록 스레드를 늘려도 빨라지지 않는다(암달의 법칙). 락 범위는 최소로.
