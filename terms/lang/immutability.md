---
id: immutability
term: 불변성
aliases:
  - Immutability
  - Immutable
  - 불변 객체
  - 이뮤터블
  - 불변 데이터
category: lang
tags:
  - 함수형
  - React
  - Python
level: 2
kind: concept
related:
  - functional-programming
  - state-management
  - hooks
  - call-by-value-reference
  - virtual-dom
  - shallow-deep-copy
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

한 번 만든 데이터는 **고치지 않고**, 바꿀 일이 있으면 **새로 만들어** 쓰는 원칙.

## 비유

**수정 테이프 대신 새 종이**. 계약서를 고칠 때 원본에 덧칠하지 않고 새 판을 찍어 날짜를 붙이면, 뭐가 바뀌었는지 비교가 되고 남이 들고 있던 옛 사본도 멀쩡하다.

## 예시

```ts
// React — state 객체를 직접 고치면 "바뀐 줄" 모른다 (참조가 같아서 리렌더 안 됨)
starred.add(id); setStarred(starred)             // 잘못: 같은 Set 객체를 다시 넘김
setStarred(prev => new Set(prev).add(id))        // 맞음: 새 Set 을 만들어 넘김

const next = { ...card, level: 3 }               // 스프레드 복사 — card 는 그대로
const cards2 = cards.map(c => (c.id === id ? { ...c, level: 3 } : c))
```

```python
point = (3, 4)                                   # 튜플 — 요소를 못 바꾼다
from dataclasses import dataclass
@dataclass(frozen=True)
class Config: host: str; port: int               # 필드에 대입하면 FrozenInstanceError
frozenset({"a", "b"})                            # 불변 집합 — 딕셔너리 키로 쓸 수 있다
```

React 는 이전 값과 새 값을 `Object.is` 로 비교해서 다를 때만 다시 그린다. 같은 객체를 안에서 고치면 참조가 같으니 "안 바뀌었다" 고 판단해 리렌더도 `useEffect` 의존성 감지도 안 된다 — 그래서 **항상 새 객체를 만들어 넘긴다**. 불변이면 이전 값이 남아 있어 실행 취소(undo)·시간 여행 디버깅이 쉽고, 여러 스레드가 공유해도 잠금이 필요 없다. Python 의 문자열·튜플·숫자는 원래 불변이고 리스트·딕셔너리는 가변이라, 딕셔너리 키나 집합 원소로는 불변인 것만 쓸 수 있다.

면접에선 "React 에서 state 를 직접 수정하면 왜 안 되나?" 로 나온다 — 참조 비교로 변경을 감지하기 때문이라고 답하면 된다.

## 헷갈리기 쉬운 것

- **`const`**: 변수에 다시 대입하는 것만 막는다. `const arr = []` 에 `arr.push(1)` 은 된다. `Object.freeze` 도 한 겹만 얼린다.
- **얕은 복사**: 스프레드(`...`)는 한 겹만 새로 만든다. 중첩된 객체를 바꾸려면 안쪽도 따로 복사하거나 Immer 같은 도구를 쓴다.
- **성능 걱정**: 매번 새로 만들면 느릴 것 같지만, "바뀌었나" 비교가 참조 하나로 끝나서 오히려 빠른 경우가 많다.
