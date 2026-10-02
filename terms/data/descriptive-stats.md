---
id: descriptive-stats
term: 기술 통계/분포
aliases:
  - Descriptive Statistics
  - 요약 통계
  - 평균/중앙값/표준편차
  - 사분위수
  - 분포
  - describe
category: data
tags:
  - 통계
  - 데이터분석
  - 임상연구
level: 1
kind: concept
related:
  - pandas-numpy
  - visualization
  - outlier
  - hypothesis-test
  - missing-data
see_also:
  - https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

데이터 묶음을 **평균·중앙값·퍼짐·분포 모양** 몇 개 숫자로 요약해 설명하는 것.

## 비유

반 전체 성적표를 한 줄로 말하기 — "평균 72점, 중간 아이는 75점, 대부분 60~85점 사이". 전교생 이름을 다 안 불러도 반의 느낌이 전해진다.

## 예시

```python
import pandas as pd
df = pd.read_csv("labs.csv")                      # 열: patient_id, sex, glucose, los_days
print(df["glucose"].describe())                   # count, mean, std, min, 25%, 50%(중앙값), 75%, max
print(df["glucose"].skew())                       # 0 이면 좌우 대칭, 양수면 오른쪽으로 긴 꼬리
print(df.groupby("sex")["glucose"].agg(["mean", "median", "std", "count"]))
q1, q3 = df["glucose"].quantile([0.25, 0.75]); print("IQR", q3 - q1)   # 가운데 50% 의 폭
```

논문의 "Table 1" 이 바로 기술 통계다 — 환자군의 나이 평균±표준편차, 성별 n(%), 재원 일수 중앙값[사분위 범위]. 핵심은 어느 숫자를 고르느냐. 혈당·재원 일수·CRP 처럼 오른쪽으로 긴 꼬리가 있는 값은 평균이 소수의 큰 값에 끌려가므로 중앙값과 IQR 로 요약하고, 키·혈압처럼 대칭에 가까운 값은 평균±표준편차로 요약한다. 그래서 `describe()` 와 히스토그램을 먼저 본다 — 이때 min 이 0 이거나 max 가 9999 인 결측 코드, 단위가 다른 행도 함께 드러난다.

## 헷갈리기 쉬운 것

- **평균 vs 중앙값**: 평균은 다 더해 나눈 값, 중앙값은 줄 세웠을 때 가운데 값. 극단값 하나에 평균은 흔들리고 중앙값은 안 흔들린다.
- **표준편차 vs 표준오차**: 표준편차는 데이터가 퍼진 정도, 표준오차는 "평균 추정값" 의 불확실성(표준편차/√n). Table 1 의 ± 는 보통 표준편차다.
- **기술 통계 vs 추론 통계**: 기술 통계는 가진 데이터를 그대로 요약하는 것, 추론 통계(가설 검정)는 그 표본으로 모집단에 대해 결론을 내리는 것.
