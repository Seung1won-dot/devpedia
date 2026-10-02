---
id: proof-techniques
term: 증명 기법(귀류법·대우)
aliases:
  - Proof Techniques
  - 귀류법
  - Proof by Contradiction
  - 대우 증명
  - 반례
category: theory
tags:
  - 이산수학
  - 면접
level: 2
kind: concept
related:
  - propositional-logic
  - proof-by-induction
  - halting-problem
  - greedy
  - pigeonhole-principle
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**귀류법·대우·반례** 처럼 명제가 참이나 거짓임을 보이는 표준적인 논증 방식들.

## 비유

**추리 소설 탐정의 수법**. "범인이 아니라고 치면 알리바이가 모순"(귀류법), "현장에 없었다면 흙이 안 묻었을 것"(대우), "목격자 한 명만 있으면 끝"(반례).

## 예시

- **대우**: "A 이면 B" 대신 "B 가 아니면 A 가 아니다"를 증명한다. "n² 이 짝수면 n 도 짝수" → "n 이 홀수면 n² 도 홀수"가 훨씬 쉽다.
- **귀류법**: 결론이 거짓이라고 가정해 모순을 끌어낸다. 그리디 알고리즘의 정당성을 "최적해가 그리디 선택과 다르다고 하자, 그러면 바꿔치기해서 더 좋은 해가 나와 모순" 식으로 보인다. 정지 문제의 증명도 귀류법이다.
- **반례**: "모든 경우 참" 을 깨는 데는 예 하나면 된다. 코테에서 그리디 풀이가 틀렸는지 의심되면 작은 입력을 완전탐색과 비교해 반례를 찾는다.

```python
# 반례 찾기: 동전 [1, 3, 4] 로 6원 만들 때 그리디(큰 동전 먼저)는 최적인가?
def greedy(n, coins=(4, 3, 1)):
    cnt = 0
    for c in coins:
        cnt += n // c; n %= c
    return cnt
print(greedy(6))  # 3 (4+1+1) — 실제 최적은 2 (3+3), 반례 발견
```

## 헷갈리기 쉬운 것

- **대우 vs 역**: "A→B" 의 대우 "¬B→¬A" 는 항상 같은 뜻이지만, 역 "B→A" 는 참이라는 보장이 없다.
- 예시 여러 개가 맞는다고 증명이 되진 않는다. 반대로 반례는 하나로 충분하다.
