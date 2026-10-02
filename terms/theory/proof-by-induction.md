---
id: proof-by-induction
term: 수학적 귀납법
aliases:
  - Mathematical Induction
  - Proof by Induction
  - 귀납적 증명
  - 루프 불변식
category: theory
tags:
  - 이산수학
  - 면접
level: 2
kind: concept
related:
  - recursion
  - recurrence-relation
  - proof-techniques
  - dynamic-programming
  - binary-search
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**첫 경우가 참**이고 n 이 참이면 n+1 도 참임을 보여 모든 n 에서 참임을 증명하는 방법.

## 비유

**도미노 쓰러뜨리기**. 첫 도미노가 넘어지고, 어떤 도미노든 넘어지면 다음 것을 밀게 놓여 있다면 끝까지 다 넘어진다.

## 예시

```python
def total(n: int) -> int:
    if n == 0:          # 기저: 0까지 합은 0 (참)
        return 0
    return total(n - 1) + n   # 가정: total(n-1) 이 맞으면 +n 으로 n까지 합도 맞다
```

재귀 함수가 맞는지 따지는 방법이 그대로 귀납법이다. 기저 사례가 맞고, "작은 입력이 맞다고 믿으면 이번 단계도 맞다"가 성립하면 모든 입력에서 맞다. 반복문에서는 **루프 불변식**("매 반복 시작 때 `lo..hi` 안에 답이 있다")을 귀납으로 지켜서 이진 탐색이나 DP 점화식의 정확성을 설명한다. 기술면접에서 "이 알고리즘이 왜 맞나요?" 질문의 정석 답이다.

## 헷갈리기 쉬운 것

- **귀납 추론**(사례 몇 개 보고 일반화)과 다르다. 수학적 귀납법은 사례 관찰이 아니라 엄밀한 연역 증명이다.
- 기저 사례를 빠뜨리면 증명이 무너진다. 재귀에서 기저 조건이 없으면 무한 재귀가 나는 것과 같은 이유.
