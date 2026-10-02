---
id: hypothesis-test
term: 가설 검정/p-value
aliases:
  - Hypothesis Test
  - Statistical Significance
  - p값
  - 귀무가설
  - 유의수준
  - t-검정
  - 카이제곱 검정
category: data
tags:
  - 통계
  - 임상연구
  - 데이터분석
level: 2
kind: concept
related:
  - descriptive-stats
  - correlation-causation
  - clinical-trial
  - pandas-numpy
  - sensitivity-specificity
  - law-of-large-numbers
  - ab-test
see_also:
  - https://docs.scipy.org/doc/scipy/reference/stats.html
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

관찰한 차이가 **우연으로 생길 확률**(p-value)을 계산해 주장을 받아들일지 정하는 절차.

## 비유

동전을 10번 던져 9번 앞면. "공정한 동전이라면 이런 일이 얼마나 드문가" 를 계산해 1% 면 "이 동전, 수상하다" 고 말하는 것 — 그 1% 가 p-value 다.

## 예시

```python
import pandas as pd
from scipy import stats
df = pd.read_csv("emr_extract.csv")                  # 열: group(A/B), los_days(재원 일수), readmit(재입원 여부)
a = df.loc[df["group"] == "A", "los_days"]
b = df.loc[df["group"] == "B", "los_days"]

t, p_t = stats.ttest_ind(a, b, equal_var=False)      # 두 군 평균 비교 (Welch t-검정)
u, p_u = stats.mannwhitneyu(a, b)                    # 치우친 분포면 순위 기반 검정
chi2, p_c, _, _ = stats.chi2_contingency(pd.crosstab(df["group"], df["readmit"]))  # 비율 비교
print(f"t-test p={p_t:.4f}  Mann-Whitney p={p_u:.4f}  chi2 p={p_c:.4f}")
print(f"평균 차이 {a.mean() - b.mean():.1f}일")        # 효과 크기를 반드시 같이 적는다
```

연구실의 임상 질문 — "새 프로토콜을 쓴 B 병동은 재원 일수가 짧았나?" — 가 코드로는 이 몇 줄이 된다. 절차는 ① "차이 없다" 는 귀무가설을 세우고 ② 데이터에 맞는 검정을 고르고(대칭인 수치 → t-검정, 치우친 수치 → Mann-Whitney, 비율 → 카이제곱) ③ p 가 미리 정한 유의수준(보통 0.05)보다 작으면 "차이 없다고 보기 어렵다" 고 말한다. p 는 "귀무가설이 참일 때 이만큼 극단적인 결과가 나올 확률" 이지 "내 가설이 맞을 확률" 이 아니고, p<0.05 가 임상적으로 의미 있는 크기라는 뜻도 아니다 — 평균 차이와 신뢰구간을 함께 쓴다. 검정을 20개 돌리면 하나쯤은 우연히 0.05 아래로 나오므로(다중 비교), 가설은 데이터를 보기 전에 정한다.

## 헷갈리기 쉬운 것

- **p-value vs 효과 크기**: p 는 "우연인가", 효과 크기는 "얼마나 큰가". 환자 수만 명짜리 EMR 에서는 0.1일 차이도 p<0.001 이 나온다.
- **유의하지 않음 ≠ 차이 없음**: p=0.3 은 "차이가 있다고 말할 근거가 부족하다" 이지 "같다" 가 아니다. 표본이 작아서일 수 있다.
- **1종 오류 vs 2종 오류**: 없는 차이를 있다고 하는 것(α, 거짓 양성) / 있는 차이를 놓치는 것(β, 거짓 음성). 검정력(1-β)으로 필요한 표본 수를 미리 계산하는 것이 임상시험 설계의 첫 단계다.
