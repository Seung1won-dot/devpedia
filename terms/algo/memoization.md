---
id: memoization
term: 메모이제이션
aliases:
  - Memoization
  - 메모화
  - "@cache"
  - 함수 결과 캐싱
category: algo
tags:
  - DP
  - 캐시
  - 코딩테스트
level: 2
kind: concept
related:
  - dynamic-programming
  - lru-cache
  - react-memo
  - recursion
  - cache
  - hash-table
see_also:
  - "https://docs.python.org/3/library/functools.html#functools.cache"
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

**함수에 같은 입력이 또 오면** 저장해 둔 결과를 바로 돌려주는 기법.

## 비유

**한 번 푼 문제의 답을 책 귀퉁이에 적어 두기**. 다음에 같은 문제가 나오면 다시 풀지 않고 귀퉁이를 본다.

## 예시

```python
from functools import cache        # Python 3.9+. 그 이하는 lru_cache(maxsize=None)

calls = 0
def fib(n):                        # 그냥 재귀: 같은 fib(k) 를 수십만 번 다시 푼다
    global calls; calls += 1
    return n if n < 2 else fib(n - 1) + fib(n - 2)

@cache                             # 입력 n → 결과 를 dict 에 저장
def fib_memo(n):
    return n if n < 2 else fib_memo(n - 1) + fib_memo(n - 2)

fib(30); print(calls)                        # 2692537
print(fib_memo(30), fib_memo.cache_info())   # 832040 CacheInfo(hits=28, misses=31, ...)
```

호출 269만 번이 31번으로 줄었다. 재귀에 메모이제이션을 붙인 것이 바로 톱다운 DP 이고, 코딩테스트에서 "재귀로 짰더니 시간 초과" 의 첫 번째 처방이다. 조건은 둘 — 같은 입력이면 항상 같은 출력이어야 하고(부작용 없는 함수), 인자가 dict 키가 될 수 있어야 한다(list 는 tuple 로 바꿔서). 연구실에서는 RAG 파이프라인에서 같은 청크의 임베딩을 두 번 계산하지 않게 하는 데 같은 아이디어를 쓴다.

## 헷갈리기 쉬운 것

- **동적 프로그래밍**: 메모이제이션은 DP 를 구현하는 방법 중 하나(톱다운). 작은 것부터 표를 채우는 보텀업 DP 는 재귀도 메모이제이션도 없이 같은 일을 한다.
- **캐시(Redis 등)**: 메모이제이션은 "함수 하나의 입력→출력" 을 프로세스 안에 저장한다. 서버 캐시는 데이터 단위로 다른 프로세스와 공유하고 만료·무효화를 신경 써야 한다.
- **LRU 캐시**: 메모 저장소가 커질 때 뭘 버릴지 정하는 규칙. `lru_cache(maxsize=128)` 처럼 둘을 합쳐 쓴다.
- **useMemo/React.memo**: 같은 생각을 렌더링에 적용한 것 — 의존성이 같으면 다시 계산·렌더하지 않는다.
