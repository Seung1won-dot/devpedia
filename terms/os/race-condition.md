---
id: race-condition
term: 경쟁 상태
aliases:
  - Race Condition
  - 레이스 컨디션
  - 경쟁 조건
  - 데이터 레이스
category: os
tags:
  - 동기화
  - 스레드
  - 흔한실수
level: 2
kind: concept
related:
  - critical-section
  - synchronization
  - mutex
  - thread
  - optimistic-pessimistic-lock
  - transaction-acid
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

여러 실행 흐름이 같은 데이터를 건드려 **실행 순서에 따라 결과가 달라지는** 버그.

## 비유

부부가 각자 통장 잔고 10만 원을 보고 동시에 3만 원씩 썼는데 **둘 다 "10 - 3 = 7" 로 적어서** 잔고가 4만 원이 아니라 7만 원이 되는 것. 누가 먼저 적느냐에 따라 결과가 매번 달라진다.

## 예시

```python
import threading
counter = 0

def work():
    global counter
    for _ in range(100_000):
        counter += 1          # 읽기 → +1 → 쓰기, 세 단계

threads = [threading.Thread(target=work) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()
print(counter)                # 400000 이 아닐 수 있다
```

`counter += 1` 은 한 줄이지만 CPU 입장에선 **읽기 → 더하기 → 쓰기** 세 동작이다. 스레드 A 가 읽고 아직 안 썼는데 B 가 같은 값을 읽으면 둘 다 같은 결과를 쓰고 한 번은 사라진다. Supabase 에서 "재고 조회 후 UPDATE" 를 두 요청이 동시에 하면 같은 문제가 나며, `UPDATE ... SET stock = stock - 1` 처럼 DB 가 한 번에 처리하게 하거나 락을 건다. 면접에서는 "경쟁 상태가 뭐고 어떻게 막나?" 뒤에 "락 없이 해결하는 방법은?"(원자적 연산, CAS)이 따라온다.

## 헷갈리기 쉬운 것

- **데드락**은 서로 기다리다 아무도 안 움직이는 것, 경쟁 상태는 다 움직이는데 결과가 틀리는 것. 경쟁 상태를 막으려고 락을 걸다가 데드락이 생기기도 한다.
- **원자적(atomic) 연산**은 중간에 끼어들 수 없는 한 동작. `counter += 1` 은 원자적이지 않고, 락으로 감싸거나 원자 연산을 써야 한다.
- **재현이 안 된다**: 테스트에서 100번 통과해도 운영에서 터지는 게 경쟁 상태의 특징. "가끔 값이 하나 빈다" 는 버그 리포트면 이걸 먼저 의심한다.
