---
id: set-relation
term: 집합과 관계
aliases:
  - Set and Relation
  - 집합론
  - 합집합·교집합
  - 관계와 함수
category: theory
tags:
  - 이산수학
  - SQL
level: 1
kind: concept
related:
  - join
  - set-map
  - propositional-logic
  - rdbms
  - pigeonhole-principle
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

원소들의 묶음(**집합**)과 두 집합 원소 사이의 짝짓기(**관계**)를 다루는 기초 개념.

## 비유

**동아리 명단**. 두 동아리 명단을 합치면 합집합, 양쪽 다 있는 사람만 뽑으면 교집합이고, "누가 어느 동아리에 가입했다"는 줄 긋기가 관계다.

## 예시

```python
ai_lab = {"민수", "지연", "하늘"}
web_lab = {"지연", "도윤"}
print(ai_lab | web_lab)   # 합집합
print(ai_lab & web_lab)   # 교집합 {'지연'}
print(ai_lab - web_lab)   # 차집합 {'민수', '하늘'}

# 관계 = 순서쌍의 집합, 함수 = 왼쪽 원소마다 오른쪽이 딱 하나인 관계
advisor = {("민수", "김교수"), ("지연", "박교수")}
```

관계형 DB 의 "관계(relation)"가 바로 이 뜻이다. 테이블은 행(튜플)의 집합이고, `UNION`·`INTERSECT`·`EXCEPT` 는 합·교·차집합, `JOIN` 은 두 관계를 조건으로 엮는 연산이다. 그래서 SQL 결과에는 원래 순서가 없다.

## 헷갈리기 쉬운 것

- **관계 vs 함수**: 한 학생이 지도교수 둘이면 관계지만 함수는 아니다. 함수는 입력 하나에 출력이 하나.
- 수학의 집합은 중복이 없지만 SQL 테이블은 중복 행을 허용한다(`DISTINCT`, `UNION` vs `UNION ALL` 차이).
