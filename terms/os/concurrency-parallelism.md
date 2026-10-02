---
id: concurrency-parallelism
term: 동시성 vs 병렬성
aliases:
  - Concurrency vs Parallelism
  - 동시성
  - 병렬성
  - Concurrency
  - Parallelism
category: os
tags:
  - 프로세스
  - 스레드
  - 비동기
  - 면접
level: 2
kind: concept
related:
  - multiprocess-multithread
  - thread
  - sync-async
  - event-loop
  - race-condition
  - gil
see_also:
  - https://go.dev/blog/waza-talk
  - https://docs.python.org/3/library/concurrency.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

동시성은 여러 일을 **번갈아 처리해 동시에 하는 것처럼** 보이는 것, 병렬성은 **정말 동시에** 하는 것.

## 비유

바리스타 **한 명이 우유 데우는 사이 다음 주문을 받는 것(동시성)** 과 **두 명이 각자 커피를 만드는 것(병렬성)**. 한 명이어도 손님은 "동시에 처리된다" 고 느끼지만, 커피가 진짜 두 배로 나오려면 사람이 둘이어야 한다.

## 예시

```python
import asyncio, httpx
from concurrent.futures import ProcessPoolExecutor

# 동시성: 스레드 하나. 응답을 기다리는 동안 다른 요청을 보낸다 (I/O 대기가 대부분일 때)
async def fetch_all(urls):
    async with httpx.AsyncClient() as client:
        return await asyncio.gather(*(client.get(u) for u in urls))

# 병렬성: 프로세스 여러 개가 각자 코어에서 진짜 동시에 계산한다 (CPU 작업일 때)
with ProcessPoolExecutor() as pool:
    masks = list(pool.map(segment_slice, ct_slices))
```

```bash
nproc        # 코어 수 — 병렬성의 상한
htop         # 코어 막대가 전부 차면 병렬, 하나만 바쁘면 동시성(또는 그냥 순차)
```

코어가 하나뿐인 컴퓨터도 동시성은 있다 — OS 가 컨텍스트 스위칭으로 프로세스를 아주 빠르게 번갈아 돌리니까. 반면 병렬성은 코어가 여러 개여야만 가능하다. 파이썬 스레드는 GIL 때문에 동시성만 주므로 EMR API 100번 호출처럼 기다리는 일에 쓰고, CT 슬라이스 전처리 같은 계산은 프로세스로 나눠야 코어를 다 쓴다. GPU 학습은 수천 코어가 같은 연산을 하는 병렬성의 극단이다. 면접 단골: "동시성과 병렬성의 차이를 설명하고 각각의 예를 들어 보라."

## 헷갈리기 쉬운 것

- **동기/비동기** 는 "결과를 기다리느냐" 의 문제이고, 비동기는 동시성을 구현하는 수단 중 하나다. 비동기 코드는 스레드 하나로도 동시성을 만들지만 병렬은 아니다.
- **멀티스레드 = 병렬?**: 언어에 따라 다르다. Java·Go·Rust 스레드는 병렬로 돌지만 CPython 스레드는 GIL 때문에 한 번에 하나만 실행된다.
- **동시성이 있으면 병렬이 아니어도 경쟁 상태가 생긴다.** 번갈아 실행되는 사이에 끼어들 수 있기 때문에 코어 하나짜리에서도 락이 필요하다.
- **DB 의 동시성 제어** 는 같은 단어지만 여러 트랜잭션이 같은 행을 건드릴 때의 질서를 말한다.
