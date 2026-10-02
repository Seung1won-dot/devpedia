---
id: missing-data
term: 결측치 처리
aliases:
  - Missing Data
  - Missing Value
  - NaN
  - 결측값
  - 대치(imputation)
  - 임퓨테이션
category: data
tags:
  - 데이터분석
  - 통계
  - 의료데이터
level: 1
kind: concept
related:
  - pandas-numpy
  - descriptive-stats
  - data-validation
  - outlier
  - data-leakage
  - emr-ehr
see_also:
  - https://pandas.pydata.org/docs/user_guide/missing_data.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

값이 **비어 있는 칸**을 찾아 지우거나 채우거나 표시해 분석이 왜곡되지 않게 하는 일.

## 비유

설문지 몇 칸이 빈칸으로 돌아온 상황. 그 사람을 통째로 빼느냐, 평균값으로 채워 넣느냐, "안 적음" 자체를 정보로 보느냐를 정해야 한다.

## 예시

```python
import pandas as pd
df = pd.read_csv("vitals.csv", na_values=["", "NA", "-", "9999"])   # 추출본마다 다른 결측 표기를 NaN 으로 통일
print(df.isna().mean().sort_values(ascending=False))                 # 열별 결측 비율
df = df.dropna(subset=["patient_id", "measured_at"])                 # 키가 없는 행은 쓸 수 없으니 버린다
df["spo2_missing"] = df["spo2"].isna().astype(int)                   # "비어 있었다" 는 사실을 피처로 남긴다
df["spo2"] = df["spo2"].fillna(df["spo2"].median())                  # 수치형은 중앙값으로 대치
```

결측은 "왜 비었나" 부터 묻는다. 외래 환자의 산소포화도가 비어 있는 건 애초에 안 잰 것이고, 중환자실 기록이 비어 있으면 장비 전송 오류일 가능성이 크다 — 전자는 결측 자체가 "외래였다" 는 정보라서 플래그 열을 남긴다. 중앙값 대치는 가장 손쉽지만 값의 퍼짐을 줄여 분포를 왜곡하므로, 절반 넘게 빈 열은 채우기보다 열을 빼거나 그 사실을 보고하는 쪽이 정직하다. 대치에 쓰는 중앙값은 학습 데이터로만 계산해야 한다 — 전체로 계산하면 데이터 누수다. 삭제·대치한 행과 열의 수는 논문의 환자 선정 흐름도에 그대로 들어간다.

## 헷갈리기 쉬운 것

- **결측치 vs 0**: 혈당 0 은 "측정 결과 0" 이라는 값이고 결측은 "모름". 결측을 0 으로 채우면 평균이 뚝 떨어지고 "저혈당 환자" 가 수백 명 생긴다.
- **MCAR / MAR / MNAR**: 완전 무작위로 빈 것 / 다른 열에 따라 비는 것(외래라서 안 잼) / 값 자체 때문에 비는 것(너무 위중해서 못 잼). 뒤로 갈수록 단순 대치가 위험하다.
- **이상치**: 값은 있는데 범위를 벗어난 것. `9999` 같은 결측 코드가 이상치로 둔갑하기 쉬우니 읽는 단계에서 `na_values` 로 잡는다.
