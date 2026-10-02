---
id: turing-machine
term: 튜링 기계
aliases:
  - Turing Machine
  - 튜링 머신
  - 튜링 완전
  - Turing Complete
category: theory
tags:
  - 계산이론
  - 컴퓨터구조
level: 2
kind: concept
related:
  - finite-automata
  - halting-problem
  - von-neumann
  - p-vs-np
  - context-free-grammar
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

무한한 테이프에 **읽고·쓰고·한 칸 이동**만 하는, 계산의 표준이 되는 가상 기계.

## 비유

**끝없는 공책과 규칙표를 가진 성실한 학생**. 지금 칸의 글자와 자기 기분(상태)을 보고 "지우고 1 쓰고 오른쪽으로" 같은 규칙을 기계적으로 따르는데, 이것만으로 어떤 계산이든 해낸다.

## 예시

```python
# 이진수에 1 더하기: 오른쪽 끝에서 왼쪽으로 가며 올림 처리
def tm_increment(tape: str) -> str:
    t, head, state = list(tape), len(tape) - 1, "carry"
    while state == "carry":
        if head < 0:
            t.insert(0, "1"); state = "done"
        elif t[head] == "1":
            t[head] = "0"; head -= 1      # 쓰고 왼쪽 이동
        else:
            t[head] = "1"; state = "done"
    return "".join(t)

print(tm_increment("1011"))  # 1100
```

"이 언어는 **튜링 완전**하다"는 말은 튜링 기계가 할 수 있는 모든 계산을 그 언어로도 할 수 있다는 뜻이다. Python·C·SQL(재귀 CTE 포함)·엑셀 수식까지 튜링 완전하다고 알려져 있다 [확인 필요]. 반대로 튜링 기계로도 못 푸는 문제(정지 문제)는 어떤 컴퓨터로도 못 푼다.

## 헷갈리기 쉬운 것

- **유한 오토마타**와의 차이는 메모리. 오토마타는 상태만, 튜링 기계는 무한 테이프에 쓰고 되돌아가 읽을 수 있다.
- **튜링 테스트**(기계가 사람처럼 대화하나)와는 전혀 다른 개념이다. 이름만 같은 사람이 만들었다.
