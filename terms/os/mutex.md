---
id: mutex
term: 뮤텍스/세마포어
aliases:
  - Mutex
  - Semaphore
  - 뮤텍스
  - 세마포어
category: os
tags:
  - 동기화
  - 스레드
level: 2
related:
  - thread
  - deadlock
  - process
  - connection-pool
  - rate-limit
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

여럿이 같은 자원을 건드릴 때 **한 번에 한 명(또는 N 명)만 들어가게** 막는 자물쇠.

## 비유

뮤텍스는 **화장실 한 칸의 잠금장치**, 한 명이 쓰는 동안 나머지는 밖에서 기다린다. 세마포어는 **주차장 입구의 남은 자리 표시판**, N 대까지 들어가고 꽉 차면 나올 때까지 대기한다.

## 예시

```python
import asyncio, httpx

sem = asyncio.Semaphore(4)   # 로컬 Ollama 에 동시 요청 4개까지만

async def ask(prompt: str) -> str:
    async with sem:          # 5번째부터는 자리 날 때까지 대기
        async with httpx.AsyncClient(timeout=120) as c:
            r = await c.post("http://localhost:11434/api/generate",
                             json={"model": "qwen3:8b", "prompt": prompt, "stream": False})
            return r.json()["response"]
```

```python
import threading
lock = threading.Lock()      # 뮤텍스: 로그 파일에 한 스레드씩만 쓰기
with lock:
    f.write(line)
```

GPU 가 하나인데 요청을 무제한으로 던지면 VRAM 이 터지므로, 세마포어로 동시 개수를 묶는 게 연구실 API 서버의 기본 패턴이다.

## 헷갈리기 쉬운 것

- **뮤텍스 vs 세마포어**: 뮤텍스는 정원 1명이고 잠근 사람만 풀 수 있다. 세마포어는 정원 N명이고 누구나 카운트를 올릴 수 있다.
- **레이트 리밋**은 "1분에 몇 번" 처럼 시간당 횟수 제한. 세마포어는 "지금 동시에 몇 개" 제한. 둘 다 걸어야 할 때가 많다.
