---
id: deadlock
term: 데드락
aliases:
  - Deadlock
  - 교착 상태
  - 교착상태
  - 데드록
category: os
tags:
  - 동기화
  - 프로세스
  - 면접
level: 2
kind: concept
related:
  - mutex
  - thread
  - transaction-acid
  - process
  - connection-pool
  - race-condition
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

둘 이상이 **서로가 가진 것을 기다리며** 아무도 못 움직이는 상태.

## 비유

좁은 외길에서 마주 선 두 자동차. 각자 "네가 먼저 비켜야 내가 간다" 고 버티면 **둘 다 영원히 못 간다**.

## 예시

```python
import threading
a, b = threading.Lock(), threading.Lock()

def worker1():
    with a:            # 1) a 잡음
        with b:        # 3) b 기다림 (worker2 가 들고 있음)
            ...

def worker2():
    with b:            # 2) b 잡음
        with a:        # 4) a 기다림 (worker1 이 들고 있음) → 영원히 멈춤
            ...
```

연구실에서 실제로 마주치는 건 DB 쪽이 많다. Supabase(Postgres) 에서 두 트랜잭션이 같은 두 행을 반대 순서로 UPDATE 하면 `deadlock detected` 로 한쪽이 강제 취소된다. **잠금 순서를 항상 같게** 하는 게 제일 쉬운 예방법.

## 헷갈리기 쉬운 것

- **무한 루프**는 혼자 계속 도는 것, 데드락은 여럿이 서로 기다리느라 아무도 안 도는 것. CPU 사용률이 0% 에 가깝다면 데드락 쪽.
- **라이브락**은 서로 양보하느라 계속 움직이는데 진전이 없는 상태. 외길에서 둘 다 동시에 좌우로 피하기만 반복하는 것.
