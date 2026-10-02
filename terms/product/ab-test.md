---
id: ab-test
term: A/B 테스트
aliases:
  - A/B Testing
  - 에이비 테스트
  - Split Test
  - 온라인 실험
category: product
tags:
  - 실험
  - 통계
  - 그로스
level: 2
kind: concept
related:
  - hypothesis-test
  - feature-flag
  - funnel
  - law-of-large-numbers
  - blue-green-canary
  - growth-hacking
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

사용자를 무작위로 나눠 **두 버전 중 어느 쪽이 지표가 좋은지** 실험으로 가리는 방법.

## 비유

빵집이 손님을 **번갈아 다른 진열대**로 안내해 본다. 같은 날 같은 손님층이니, 판매량 차이는 진열 방식 탓이라고 말할 수 있다.

## 예시

가입 버튼 문구를 바꿔 각 5,000명에게 보여 줬다.

| 그룹 | 노출 | 가입 | 전환율 |
| :-- | --: | --: | --: |
| A (기존) | 5,000 | 400 | 8.0% |
| B (새 문구) | 5,000 | 460 | 9.2% |

```python
from statsmodels.stats.proportion import proportions_ztest
z, p = proportions_ztest([460, 400], [5000, 5000])
print(round(z, 2), round(p, 3))  # 2.14 0.032
```

p 가 0.05 보다 작으니 "우연이라고 보기 어렵다"고 판단한다. 그룹 나누기는 보통 **피처 플래그**로 구현하고, 사용자 ID 해시로 배정해 같은 사람이 매번 같은 버전을 보게 한다.

## 헷갈리기 쉬운 것

- **카나리 배포**도 일부 사용자에게 먼저 내보내지만 목적이 "안 터지나" 확인이다. A/B 테스트는 "어느 쪽이 나은가"를 통계로 비교한다.
- 결과를 매일 들여다보다 유의해진 순간 멈추는 **엿보기(peeking)** 는 가짜 승리를 만든다. 표본 크기를 미리 정하고 끝까지 돌린다.
