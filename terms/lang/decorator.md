---
id: decorator
term: 데코레이터
aliases:
  - Decorator
  - 장식자
  - "@ 문법"
  - 파이썬 데코레이터
category: lang
tags:
  - Python
  - 함수형
  - 디자인패턴
level: 2
kind: concept
related:
  - higher-order-function
  - closure
  - metaprogramming
  - middleware
  - design-pattern
see_also:
  - https://docs.python.org/ko/3/glossary.html#term-decorator
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

함수를 **다른 함수로 감싸서** 원래 코드는 안 건드리고 기능을 덧붙이는 `@` 문법.

## 비유

**택배 상자 포장지**. 안의 물건(함수)은 그대로인데 포장지를 씌워 "취급주의" 스티커(로그·시간 측정·권한 확인)를 붙이는 것이고, 포장지는 몇 겹이든 겹쳐 쌀 수 있다.

## 예시

```python
import time, functools

def timed(func):                            # 1) 함수를 받아서
    @functools.wraps(func)                  #    원래 이름·docstring 을 유지 (안 쓰면 전부 'wrapper' 가 된다)
    def wrapper(*args, **kwargs):           # 2) 감싼 함수를 만들고
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__}: {time.perf_counter() - start:.2f}s")
        return result
    return wrapper                          # 3) 그걸 돌려준다

@timed                                      # train = timed(train) 과 완전히 같다
def train(epochs: int):
    time.sleep(0.1 * epochs)

train(3)        # train: 0.30s
```

매일 보는 `@app.get("/patients")`(FastAPI 라우팅), `@pytest.fixture`, `@property`, `@torch.no_grad()`, `@functools.lru_cache` 가 전부 데코레이터다. 공통점은 **함수 본문은 그 함수의 일만 하고**, 등록·캐시·로깅 같은 "곁다리" 를 바깥 한 줄로 밀어낸다는 것. 인자를 받는 데코레이터(`@retry(times=3)`)는 함수를 한 겹 더 감싸서 만든다.

## 헷갈리기 쉬운 것

- **데코레이터 패턴**(GoF): 객체를 같은 인터페이스의 객체로 감싸는 설계 패턴이다. 파이썬 `@` 는 그 아이디어를 함수 수준의 문법으로 넣은 것이라 이름은 같지만 구현 방식은 다르다.
- **TypeScript 데코레이터**: 클래스·메서드에만 붙고(NestJS 의 `@Injectable()`), TS 5.0 부터 표준 제안 문법을 지원하지만 JS 자체의 정식 표준 포함 여부는 확인이 필요하다 [확인 필요].
- **미들웨어**: 요청마다 끼어든다는 점은 같지만, 미들웨어는 프레임워크가 **모든 요청**에 거는 것이고 데코레이터는 **그 함수 하나**에만 붙는다.
