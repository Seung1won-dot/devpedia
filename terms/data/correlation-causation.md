---
id: correlation-causation
term: 상관 vs 인과
aliases:
  - Correlation vs Causation
  - 상관관계
  - 인과관계
  - 교란 변수
  - Confounder
  - 상관계수
category: data
tags:
  - 통계
  - 임상연구
  - 데이터분석
  - 흔한실수
level: 2
kind: concept
related:
  - hypothesis-test
  - descriptive-stats
  - visualization
  - clinical-trial
  - data-leakage
  - probability-basics
  - growth-hacking
see_also:
  - https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.pearsonr.html
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

두 값이 **같이 움직인다**(상관)고 해서 하나가 다른 하나를 **일으킨다**(인과)는 뜻은 아니라는 것.

## 비유

아이스크림 판매량과 익사 사고가 같은 달에 함께 는다. 아이스크림이 익사를 부르는 게 아니라 "여름" 이 둘 다 끌어올리는 것 — 뒤에 숨은 세 번째 변수다.

## 예시

```python
import pandas as pd
from scipy import stats
df = pd.read_csv("emr_extract.csv")              # 열: age, n_visits, hba1c, on_statin, ...
r, p = stats.pearsonr(df["n_visits"], df["hba1c"])
print(f"r={r:.2f}, p={p:.3g}")                    # 외래를 자주 올수록 당화혈색소가 높다?
print(df.groupby("on_statin")["hba1c"].mean())   # 스타틴 복용군이 혈당이 더 높다?
```

두 결과 모두 "상관" 일 뿐이다. 외래를 자주 오는 환자의 혈당이 높은 건 방문이 혈당을 올려서가 아니라 **중증일수록 자주 오고 혈당도 높아서**(교란 변수: 중증도)이고, 스타틴 군의 혈당이 높은 건 약 때문이라기보다 **당뇨·고지혈증 환자에게 처방되기 때문**(처방에 의한 교란)이다. 후향적 EMR 데이터로 인과를 말하려면 교란 변수를 보정(다변량 회귀, 성향 점수 매칭)하거나, 애초에 무작위 배정 임상시험으로 설계해야 한다. 연구실 과제에서 "A 를 하면 B 가 좋아진다" 라고 쓰기 전에 "A 를 한 사람과 안 한 사람이 애초에 다른 사람은 아닌가" 를 먼저 묻는 습관이 이 카드의 전부다. 예측 모델은 상관만으로도 잘 맞힐 수 있지만, "그러니 A 를 바꾸자" 는 개입은 인과가 있어야 통한다.

## 헷갈리기 쉬운 것

- **상관계수 r vs p-value**: r 은 관계의 크기와 방향(-1~1), p 는 그 관계가 우연일 가능성. n 이 수만 명이면 r=0.05 짜리 미미한 상관도 p 는 아주 작게 나온다.
- **피어슨 vs 스피어만**: 피어슨은 직선 관계를 재고, 스피어만은 순위로 재서 꼬리가 긴 값이나 "커질수록 커지지만 직선은 아닌" 관계에 안전하다.
- **교란 변수 vs 매개 변수**: 교란은 A 와 B 둘 다를 일으키는 제3의 원인(보정해야 한다), 매개는 A→M→B 처럼 중간 다리(보정하면 효과가 사라져 보인다).
