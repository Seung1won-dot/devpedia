---
id: generator-iterator
term: 제너레이터/이터레이터
aliases:
  - Generator / Iterator
  - 제너레이터
  - 이터레이터
  - yield
  - 반복자
  - 지연 평가
category: lang
tags:
  - Python
  - 메모리관리
  - 함수형
level: 2
kind: concept
related:
  - streaming-response
  - pytorch
  - pandas-numpy
  - higher-order-function
  - etl-pipeline
see_also:
  - https://docs.python.org/ko/3/howto/functional.html#generators
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

**이터레이터**는 값을 하나씩 꺼내 주는 물건, **제너레이터**는 `yield` 로 그걸 쉽게 만드는 함수.

## 비유

**영화 스트리밍**. 두 시간짜리 영화를 통째로 내려받고 보는 게 아니라 지금 볼 장면만 조금씩 받아 보니 저장 공간이 거의 안 들고, 중간에 끄면 뒷부분은 아예 받지 않는다.

## 예시

```python
def read_hl7_messages(path):
    with open(path, encoding="utf-8") as f:
        buf = []
        for line in f:                        # 파일을 한 줄씩만 메모리에 올린다
            if line.startswith("MSH") and buf:
                yield "".join(buf)            # 메시지 하나 완성될 때마다 내보내고 여기서 멈춘다
                buf = []
            buf.append(line)
        if buf:
            yield "".join(buf)

for msg in read_hl7_messages("emr_dump.hl7"):     # 수십 GB 파일도 메모리 몇 MB 로 처리
    process(msg)

squares = (n * n for n in range(10**9))   # 제너레이터 표현식 — 아직 아무것도 계산하지 않았다
next(squares)                             # 0 — 이제 첫 값 하나만 계산
```

`for` 문은 사실 `iter()` 로 이터레이터를 얻고 `next()` 를 `StopIteration` 이 날 때까지 부르는 것이다. 제너레이터 함수는 호출해도 본문이 실행되지 않고, `next()` 가 불릴 때마다 다음 `yield` 까지만 진행한다. 그래서 전체를 리스트로 만들면 터질 데이터를 **한 번에 하나씩** 다룰 수 있고, PyTorch `DataLoader`, `pd.read_csv(chunksize=...)`, FastAPI 의 `StreamingResponse`(LLM 토큰 흘려보내기)가 모두 이 원리다. 단, 한 번 끝까지 돌면 비어서 두 번째 `for` 는 아무것도 안 나온다 — 다시 돌리려면 새로 만든다.

## 헷갈리기 쉬운 것

- **이터러블 vs 이터레이터**: 리스트는 이터러블(`iter()` 로 이터레이터를 **만들 수 있는** 것)이지 이터레이터가 아니라, 몇 번이고 다시 돌 수 있다. 제너레이터는 이터러블이면서 이터레이터라 한 번만 돈다.
- **리스트 컴프리헨션 `[...]` vs 제너레이터 표현식 `(...)`**: 대괄호는 지금 전부 만들고, 소괄호는 꺼낼 때 만든다. `sum(x for x in big)` 처럼 한 번만 훑을 땐 소괄호가 메모리를 아낀다.
- **비동기 제너레이터**(`async def` + `yield`): 네트워크·LLM 응답처럼 기다림이 끼는 스트림용이고 `async for` 로 돈다. JS 의 `function*`/`async function*` 도 같은 개념이다.
