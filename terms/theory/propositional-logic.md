---
id: propositional-logic
term: 명제 논리
aliases:
  - Propositional Logic
  - 명제 논리학
  - 드모르간 법칙
  - De Morgan's Laws
category: theory
tags:
  - 이산수학
  - 흔한실수
level: 1
kind: concept
related:
  - boolean-algebra
  - set-relation
  - proof-techniques
  - bitwise
  - null-handling
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

참·거짓이 정해진 문장을 **AND·OR·NOT 으로 엮어** 따지는 논리 체계.

## 비유

**출입 규칙표**. "학생증이 있고(AND) 등록된 사람이거나(OR) 교수님 동행" 같은 조건을 하나씩 참/거짓으로 채워 보면 들어갈 수 있는지가 기계적으로 나온다.

## 예시

```python
# "로그인 안 했거나 권한 없으면 막기"
def blocked(logged_in: bool, has_role: bool) -> bool:
    return not logged_in or not has_role

# 드모르간 법칙: not (A and B) == (not A) or (not B)
for a in (True, False):
    for b in (True, False):
        assert (not (a and b)) == ((not a) or (not b))
        assert (not (a or b)) == ((not a) and (not b))
```

`if not (x > 0 and x < 10)` 를 풀어 쓸 때 `x <= 0 or x >= 10` 처럼 **AND 가 OR 로 뒤집히는** 것을 놓쳐 버그가 나는 일이 흔하다. 또 `A and B` 에서 A 가 거짓이면 B 를 아예 평가하지 않는 **단락 평가** 덕에 `user and user.name` 같은 None 방어 코드가 성립한다.

## 헷갈리기 쉬운 것

- **함의(A → B)** 는 "A 가 거짓이면 무조건 참"이다. "비가 오면 우산을 쓴다"는 맑은 날엔 무슨 행동을 해도 거짓이 아니다.
- **불 대수**는 같은 연산을 0/1 과 식 변형 규칙으로 다루는 쪽, 명제 논리는 문장의 참/거짓 추론 쪽이다.
