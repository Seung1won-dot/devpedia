---
id: gil
term: GIL
aliases:
  - Global Interpreter Lock
  - 전역 인터프리터 락
  - 글로벌 인터프리터 락
  - 파이썬 GIL
category: lang
tags:
  - Python
  - 스레드
  - 성능
  - 면접
level: 3
kind: concept
related:
  - multiprocess-multithread
  - thread
  - concurrency-parallelism
  - mutex
  - race-condition
  - garbage-collection
see_also:
  - https://docs.python.org/ko/3/glossary.html#term-global-interpreter-lock
  - https://peps.python.org/pep-0703/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

파이썬 코드를 **한 번에 스레드 하나만** 실행하도록 인터프리터가 거는 자물쇠.

## 비유

창구 직원은 여럿인데 **도장이 하나뿐인 관공서**. 서류에 도장 찍는 일(파이썬 코드 실행)은 도장을 쥔 한 사람만 하고, 나머지는 민원인이 서류 가져오길 기다리는 일(네트워크·디스크 대기)만 동시에 할 수 있다.

## 예시

```python
import time
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def cpu_work(n: int) -> int:               # 순수 계산 — 도는 내내 GIL 을 쥔다
    return sum(i * i for i in range(n))

def run(executor_cls) -> float:
    t = time.perf_counter()
    with executor_cls(max_workers=4) as pool:
        list(pool.map(cpu_work, [3_000_000] * 4))
    return round(time.perf_counter() - t, 2)

if __name__ == "__main__":                 # 프로세스 풀은 Windows 에서 이 가드가 꼭 필요하다
    print("threads  :", run(ThreadPoolExecutor), "s")    # 스레드 1개로 돌릴 때와 거의 같다
    print("processes:", run(ProcessPoolExecutor), "s")   # 코어 수만큼 빨라진다
```

스레드 4개를 띄워도 계산이 빨라지지 않는 이유가 GIL 이다. CPython 은 객체마다 참조 횟수를 세어 메모리를 관리하는데, 여러 스레드가 그 숫자를 동시에 고치면 깨지므로 인터프리터 전체에 자물쇠 하나를 걸어 버린 것이다(대신 단일 스레드가 빠르고 C 확장 쓰기가 쉽다). 트레이드오프 — 네트워크·파일을 **기다리는 동안엔 GIL 을 내려놓으므로** API 호출 20개나 DB 조회는 스레드로 충분하고, DICOM 수천 장 전처리 같은 순수 계산만 프로세스로 쪼갠다(프로세스는 생성·복사 비용이 있어 작은 작업엔 오히려 느리다). NumPy·PyTorch 는 무거운 계산을 C 로 내려보낼 때 대부분 GIL 을 풀기 때문에 학습 루프는 거의 영향이 없다. Python 3.13 부터 GIL 을 끈 free-threaded 빌드(`python3.13t`)가 실험적으로 들어왔고, 기본 빌드가 되는 시점은 정해지지 않았다 [확인 필요].

## 헷갈리기 쉬운 것

- **뮤텍스/Lock**: GIL 도 뮤텍스지만 내 코드가 아니라 인터프리터가 내부적으로 거는 것이다. GIL 이 있다고 `count += 1` 이 안전해지진 않는다 — 읽기·더하기·쓰기 사이에 스레드가 바뀔 수 있어 `threading.Lock` 은 여전히 필요하다.
- **동시성 vs 병렬성**: GIL 이 막는 건 **병렬**(여러 코어가 동시에 파이썬 코드 실행)이지 동시성이 아니다. 스레드끼리 번갈아 도는 것, 기다리는 동안 다른 일을 하는 것은 멀쩡히 된다.
- **파이썬 언어 vs CPython**: GIL 은 언어 명세가 아니라 CPython 구현의 선택이다. PyPy 도 GIL 이 있고 Jython 은 없다.
