---
id: multiprocess-multithread
term: 멀티프로세스/멀티스레드
aliases:
  - Multiprocess vs Multithread
  - 멀티프로세싱
  - 멀티스레딩
  - 멀티 프로세스
  - 멀티 스레드
category: os
tags:
  - 프로세스
  - 스레드
  - 면접
level: 2
kind: concept
related:
  - process
  - thread
  - context-switching
  - synchronization
  - race-condition
  - event-loop
  - gil
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

일을 여러 개로 나눌 때 **메모리를 따로 쓸지(프로세스) 같이 쓸지(스레드)** 고르는 문제.

## 비유

식당을 키울 때 **주방을 하나 더 차리느냐, 한 주방에 요리사를 더 뽑느냐**. 주방을 따로 두면 한 곳에 불이 나도 다른 곳은 멀쩡하지만 재료를 옮기려면 카트가 필요하고, 요리사를 늘리면 재료를 바로 나눠 쓰지만 같은 냄비를 두고 부딪친다.

## 예시

```python
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
import requests

def fetch(url):            # 네트워크 대기가 대부분 → 스레드
    return requests.get(url).status_code

def resize(path):          # 순수 CPU 계산 → 프로세스 (GIL 우회)
    ...

with ThreadPoolExecutor(8) as pool:
    codes = list(pool.map(fetch, urls))
with ProcessPoolExecutor(4) as pool:
    done = list(pool.map(resize, dicom_paths))
```

파이썬은 GIL 때문에 스레드가 한 번에 하나씩만 바이트코드를 실행해서, CT 슬라이스 수천 장 전처리 같은 계산은 프로세스로 나눠야 코어를 다 쓴다. 반대로 API 20개 호출처럼 기다리는 일은 스레드로 충분하다. Chrome 이 탭마다 프로세스를 따로 띄우는 것도 같은 선택으로, 탭 하나가 죽어도 브라우저 전체가 안 죽는 대신 메모리를 더 쓴다. 면접에서는 "둘의 차이와 각각 언제 쓰나?" 로 거의 항상 나온다.

## 헷갈리기 쉬운 것

- **안정성 vs 비용**: 프로세스는 메모리가 격리돼 하나가 죽어도 남은 건 살지만 생성·전환·통신(IPC)이 무겁다. 스레드는 가볍고 데이터 공유가 공짜지만 하나가 죽으면 프로세스 전체가 죽고 동기화가 필요하다.
- **비동기(async)** 는 스레드 하나로 기다리는 시간을 재활용하는 것. 둘 다 "동시에 여러 일" 처럼 보이지만 손이 늘어나는 건 아니다.
- **IPC**: 프로세스끼리는 메모리를 안 나누므로 파이프·소켓·공유 메모리 같은 별도 통로로 대화한다. 스레드는 변수 하나면 끝.
