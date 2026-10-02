---
id: jit
term: JIT
aliases:
  - Just-In-Time Compilation
  - JIT 컴파일
  - 실행 시점 컴파일
  - 적시 컴파일
category: lang
tags:
  - 컴파일
  - 성능
  - JavaScript
  - Python
level: 3
kind: concept
related:
  - compiler-interpreter
  - type-inference
  - profiling
  - pytorch
  - pandas-numpy
see_also:
  - https://numba.readthedocs.io/en/stable/user/5minguide.html
  - https://peps.python.org/pep-0744/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

프로그램을 **실행하는 도중에** 자주 도는 부분만 골라 기계어로 바꾸는 컴파일.

## 비유

회의 통역사가 **같은 문장이 자꾸 반복되는 걸 눈치채고** 그 부분만 미리 번역문을 써 두는 것. 처음 몇 번은 느리게 통역하지만, 반복될수록 출판된 번역본을 읽는 속도에 가까워진다.

## 예시

```python
import numpy as np
from numba import njit                      # pip install numba

def moving_avg(x, w):                       # 순수 파이썬 이중 루프 — 인터프리터가 한 줄씩 돈다
    out = np.empty(len(x) - w + 1)
    for i in range(len(out)):
        s = 0.0
        for j in range(w):
            s += x[i + j]
        out[i] = s / w
    return out

moving_avg_jit = njit(moving_avg)           # 같은 함수에 JIT 만 씌운다 — 보통은 @njit 로 붙인다

ecg = np.random.randn(2_000_000)            # 2백만 샘플짜리 심전도라고 치자
moving_avg_jit(ecg, 50)                     # 첫 호출: 타입을 보고 기계어로 컴파일 — 느리다
moving_avg_jit(ecg, 50)                     # 두 번째부터는 컴파일된 코드가 바로 돈다
```

첫 호출이 느린 건 Numba 가 그때 들어온 인자 타입(`float64` 배열, `int`)을 보고 기계어를 만들기 때문이고, 두 번째부터는 순수 파이썬 루프보다 수십 배 이상 빨라진다 [확인 필요]. 이게 JIT 의 핵심이다 — 실행 전에는 알 수 없는 **실제 타입과 자주 타는 경로**를 본 뒤에 컴파일하니, 미리 다 컴파일하는 방식보다 공격적으로 최적화할 수 있다. Node·브라우저의 V8, Java 의 HotSpot, PyPy, PyTorch 2 의 `torch.compile` 이 모두 이 방식이고, CPython 도 3.13 부터 실험적 JIT 를 빌드 옵션으로 넣었다 [확인 필요]. 트레이드오프는 **워밍업**이다 — 컴파일 시간과 메모리가 들어 금방 끝나는 스크립트나 서버리스 콜드 스타트에는 오히려 손해고, 오래 도는 서버나 같은 루프를 수백만 번 도는 수치 계산에서만 이득이다.

## 헷갈리기 쉬운 것

- **AOT 컴파일**(gcc, rustc, Go): 실행 **전**에 전부 기계어로 만들어 두는 것. 시작이 빠르고 성능이 예측 가능하지만 실행 중 정보(실제 타입, 분기 빈도)는 못 쓴다.
- **인터프리터**: JIT 는 인터프리터를 대체하는 게 아니라 그 위에 얹는다. 모든 JIT 엔진은 먼저 인터프리터로 돌리며 어디가 뜨거운지 재고, 그 부분만 컴파일한다.
- **바이트코드 컴파일**(`.pyc`, Java `.class`): 소스를 중간 코드로 바꾸는 것뿐 기계어가 아니다. CPython 은 늘 바이트코드로 컴파일하지만 그것만으로 JIT 라고 부르지 않는다.
