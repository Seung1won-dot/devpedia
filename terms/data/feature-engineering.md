---
id: feature-engineering
term: 피처 엔지니어링
aliases:
  - Feature Engineering
  - 특성 공학
  - 파생 변수
  - 변수 생성
  - 인코딩
  - 정규화/표준화
category: data
tags:
  - ML기초
  - 데이터분석
  - 학습
level: 2
kind: concept
related:
  - pandas-numpy
  - data-leakage
  - missing-data
  - outlier
  - machine-learning
  - classification-regression
  - vector-norm
see_also:
  - https://scikit-learn.org/stable/modules/preprocessing.html
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

원본 열을 **모델이 배우기 좋은 숫자 입력**(피처)으로 고치고 새로 만드는 작업.

## 비유

요리 전 손질. 생닭을 통째로 주는 대신 손질하고 간을 해 두면 같은 조리법으로도 결과가 확 달라진다.

## 예시

```python
import numpy as np, pandas as pd
df = pd.read_csv("emr_extract.csv", parse_dates=["admit_dt", "birth_dt"])
df["age"] = (df["admit_dt"] - df["birth_dt"]).dt.days // 365        # 생년월일 → 나이
df["bmi"] = df["weight_kg"] / (df["height_cm"] / 100) ** 2           # 두 열을 조합
df["night_admit"] = df["admit_dt"].dt.hour.between(22, 23) | (df["admit_dt"].dt.hour < 6)
df["log_crp"] = np.log1p(df["crp"])                                   # 꼬리 긴 값 펴기
df = pd.get_dummies(df, columns=["dept"], drop_first=True)            # 범주 → 0/1 열(원-핫)
vit = (pd.read_csv("vitals.csv").groupby("encounter_id")["hr"]
         .agg(hr_max="max", hr_std="std"))                            # 시계열 → 요약 피처
df = df.merge(vit, on="encounter_id", how="left")
```

모델은 "키 170, 몸무게 80" 보다 "BMI 27.7" 을 바로 쓰는 게 쉽고, 생년월일 자체는 의미가 없지만 나이는 거의 모든 임상 모델의 1순위 피처다. 표 형식 의료 데이터에서는 알고리즘을 바꾸는 것보다 좋은 피처 하나(예: 최근 24시간 심박 변동)를 더하는 쪽이 성능을 더 올리는 일이 흔하다. 주의할 것 셋 — ① 예측 시점 이후의 정보로 피처를 만들면 데이터 누수, ② 표준화 평균이나 원-핫 범주 목록은 학습 데이터로만 `fit`(sklearn 의 `OneHotEncoder`·`StandardScaler` 를 파이프라인에), ③ 진료과·ICD 코드 같은 범주를 1, 2, 3 숫자로 두면 모델이 순서가 있다고 오해한다. 딥러닝은 이미지·텍스트에서 이 손질을 스스로 하지만, 표 데이터에서는 여전히 사람 몫이다.

## 헷갈리기 쉬운 것

- **피처 엔지니어링 vs 피처 선택**: 만드는 것과 고르는 것. 100개 만들고 중요도 낮은 70개를 빼는 게 선택이다.
- **정규화(min-max) vs 표준화(z-score)**: 0~1 로 눌러 넣기 vs 평균 0·표준편차 1 로 맞추기. 이상치가 있으면 min-max 가 쉽게 망가지고, 트리 계열 모델은 둘 다 필요 없다.
- **레이블 인코딩 vs 원-핫 인코딩**: 범주를 정수 하나로 vs 범주마다 0/1 열로. 순서 없는 범주(진료과)에 레이블 인코딩을 쓰면 "내과 < 외과" 같은 가짜 순서가 생긴다.
