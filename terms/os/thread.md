---
id: thread
term: 스레드
aliases:
  - Thread
  - 쓰레드
  - 실행 흐름
  - 멀티스레딩
category: os
tags:
  - 스레드
  - 프로세스
level: 1
related:
  - process
  - cpu
  - mutex
  - context-switching
  - event-loop
see_also:
  - https://docs.python.org/3/library/threading.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

한 프로세스 안에서 **메모리를 같이 쓰며 나란히 일하는** 실행 흐름.

## 비유

한 조리대(프로세스)에서 같은 재료를 나눠 쓰며 일하는 **보조 요리사들**. 손이 늘어 빨라지지만, 둘이 같은 냄비를 동시에 잡으면 사고가 난다.

## 예시

```python
from concurrent.futures import ThreadPoolExecutor
import requests

urls = [f"https://api.lab.example.com/items/{i}" for i in range(20)]

# 네트워크 대기가 긴 작업은 스레드 8개로 동시에 던지면 훨씬 빠르다
with ThreadPoolExecutor(max_workers=8) as pool:
    codes = list(pool.map(lambda u: requests.get(u).status_code, urls))
```

반대로 순수 계산(행렬 곱 등)은 파이썬에서 스레드로 잘 안 빨라진다(GIL). 그때는 `ProcessPoolExecutor` 나 NumPy/GPU 로.

## 헷갈리기 쉬운 것

- **프로세스**는 메모리를 따로 갖고, 스레드는 프로세스 안에서 메모리를 공유. 그래서 스레드가 가볍지만 뮤텍스 같은 안전장치가 필요하다.
- **비동기(async)** 는 스레드 하나로 기다리는 시간에 다른 일을 하는 것. 스레드는 실제로 여러 손이 생기는 것.
