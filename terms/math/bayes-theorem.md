---
id: bayes-theorem
term: 베이즈 정리
aliases:
  - Bayes' Theorem
  - Bayes Rule
  - 베이즈 정리
  - 사후 확률
category: math
tags:
  - 확률통계
  - 의료AI
  - 면접
level: 2
kind: concept
related:
  - sensitivity-specificity
  - probability-basics
  - precision-recall-f1
  - mle
  - hypothesis-test
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

결과를 보고 **원인의 확률을 거꾸로 계산**하게 해 주는 조건부 확률 공식.

## 비유

화재경보가 울렸다고 진짜 불일 확률이 높은 건 아니다. 경보기가 아무리 좋아도 **애초에 불이 나는 날이 드물면**, 울린 경보 대부분은 토스트 연기다.

## 예시

```python
prevalence = 0.01    # 유병률 1%
sens = 0.90          # 민감도: 환자면 90% 양성
spec = 0.95          # 특이도: 정상이면 95% 음성

p_pos = sens * prevalence + (1 - spec) * (1 - prevalence)
ppv = sens * prevalence / p_pos
print(round(ppv, 3))   # 0.154 → 양성이어도 실제 환자일 확률 약 15%
```

공식은 `P(질환|양성) = P(양성|질환)·P(질환) / P(양성)`. 검사 성능(민감도·특이도)이 좋아도 유병률이 낮은 선별검사에서는 양성 예측도(PPV)가 뚝 떨어진다. 연구실에서 만든 AI 모델을 외래 전체 환자에 적용할 때, 학습셋(환자 50%)에서 본 정밀도가 실제 현장(환자 1%)에서는 크게 낮아지는 이유도 이것이다.

## 헷갈리기 쉬운 것

- **민감도 vs 양성 예측도**: 민감도는 `P(양성|질환)`, PPV 는 `P(질환|양성)`. 방향이 반대다. ML 용어로 PPV 가 정밀도(precision), 민감도가 재현율(recall)이다.
- **사전 확률(prior) vs 사후 확률(posterior)**: 검사 전 믿음(유병률)과 검사 결과를 본 뒤 갱신된 믿음. 사전 확률을 무시하는 실수를 "기저율 무시" 라 한다.
- **베이즈 정리 vs 베이즈 통계**: 공식 자체는 누구나 쓰는 확률 규칙이고, 베이즈 통계는 파라미터 자체를 확률로 다루는 접근 전체를 말한다.
