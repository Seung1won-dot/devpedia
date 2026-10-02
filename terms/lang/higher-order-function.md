---
id: higher-order-function
term: 고차 함수/람다
aliases:
  - Higher-Order Function
  - 고차함수
  - 람다
  - Lambda
  - 익명 함수
  - map/filter/reduce
category: lang
tags:
  - 함수형
  - Python
  - JavaScript
level: 2
kind: concept
related:
  - functional-programming
  - closure
  - callback
  - immutability
  - hooks
  - decorator
  - generator-iterator
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

**함수를 인자로 받거나 돌려주는** 함수이고, 람다는 그때 넘기는 이름 없는 함수다.

## 비유

마트 직원에게 **"이 기준으로 골라 줘" 하고 쪽지를 건네는 것**. 골라내는 동작(고차 함수)은 늘 같고, "유통기한 3일 이내" 라는 쪽지(람다)만 바꿔 끼운다.

## 예시

```python
cards = [{"id": "deadlock", "level": 2}, {"id": "cpu", "level": 1}, {"id": "rag", "level": 3}]
hard  = list(filter(lambda c: c["level"] >= 2, cards))   # 조건을 함수로 넘긴다
ids   = list(map(lambda c: c["id"], cards))              # 변환 규칙을 함수로 넘긴다
by_lv = sorted(cards, key=lambda c: c["level"])          # 정렬 기준을 함수로 넘긴다
```

```ts
const total = cards.reduce((sum, c) => sum + c.level, 0)   // 누적 규칙을 함수로. 화살표 함수가 JS 의 람다
const byLevel = (n: number) => (c: Card) => c.level === n   // 함수를 돌려주는 고차 함수
cards.filter(byLevel(2))                                    // 돌려받은 함수를 다시 넘긴다
```

Devpedia 의 검색·카테고리 필터·정렬이 전부 이 세 개(`filter`/`map`/`sort`)로 되어 있다. `for` 문으로 쓰면 "어떻게 돌지" 까지 매번 적어야 하지만, 고차 함수는 **무엇을 할지(기준)만** 넘기니 짧고 의도가 드러난다. Python 람다는 식 하나만 쓸 수 있어 여러 줄이면 `def` 로 빼고, JS 는 화살표 함수가 여러 줄도 된다. `useEffect(fn, deps)`, `addEventListener(type, fn)` 도 함수를 받는 고차 함수다.

면접에선 "`map` 과 `forEach` 의 차이는?" 으로 자주 나온다 — `map` 은 새 배열을 돌려주고 `forEach` 는 아무것도 안 돌려준다(부수효과용).

## 헷갈리기 쉬운 것

- **일급 함수**(first-class function): 함수를 변수에 넣고 인자로 주고 반환할 수 있는 "언어의 성질". 고차 함수는 그 성질을 이용해 만든 함수다.
- **클로저**: 돌려준 함수가 바깥 변수를 기억하는 현상. 위의 `byLevel(2)` 가 `n` 을 기억하는 게 클로저다.
- **콜백**: 고차 함수에 "넘겨지는 쪽" 함수를 부르는 이름. 람다는 그 콜백을 이름 없이 그 자리에서 쓴 것이다.
