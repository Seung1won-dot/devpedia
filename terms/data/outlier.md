---
id: outlier
term: 이상치
aliases:
  - Outlier
  - 극단값
  - 특이값
  - 아웃라이어
  - IQR 규칙
category: data
tags:
  - 데이터분석
  - 통계
  - 의료데이터
level: 2
kind: concept
related:
  - descriptive-stats
  - missing-data
  - data-validation
  - visualization
  - vital-signs
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

나머지 데이터와 **동떨어진 값**으로, 입력 오류일 수도 진짜 드문 사건일 수도 있는 것.

## 비유

반 평균 키를 재는데 한 명이 농구 선수다. 잘못 쟀을 수도 있고 진짜 클 수도 있다 — 지우기 전에 누군지 확인해야 한다.

## 예시

```python
import pandas as pd
df = pd.read_csv("vitals.csv")
q1, q3 = df["hr"].quantile([0.25, 0.75]); iqr = q3 - q1
fence = (df["hr"] < q1 - 1.5 * iqr) | (df["hr"] > q3 + 1.5 * iqr)        # Tukey 울타리: 후보 찾기
print(df.loc[fence, ["patient_id", "measured_at", "hr", "dept"]].head(20))  # 지우기 전에 눈으로 본다

df.loc[df["hr"] > 300, "hr"] = pd.NA                                       # 사람 심박 300 초과 = 불가능 → 결측으로
df["hr_z"] = (df["hr"] - df["hr"].mean()) / df["hr"].std()                 # z-score, |z| > 3 도 흔한 기준
```

이상치는 두 갈래로 나눠 처리한다. **불가능한 값**(심박 999, 체온 3.7℃, 생년 1800)은 입력·단위·결측 코드 오류이므로 결측으로 바꾸거나 단위를 고친다. **가능한데 드문 값**(심박 180 인 응급실 환자)은 진짜 데이터다 — 지우면 바로 그 "위험 환자" 가 분석에서 사라지므로, 임상적으로 말이 되는 범위를 의사와 함께 정하고 남긴다. 그래서 IQR 이나 z-score 는 후보를 찾는 도구이지 삭제 기준이 아니다. 삭제·대체한 행 수는 반드시 보고서에 적는다. 모델 쪽에서는 이상치가 평균·표준편차·회귀선을 끌어당기므로 중앙값 같은 강건한 통계, 로그 변환, 트리 계열 모델이 덜 흔들린다.

## 헷갈리기 쉬운 것

- **이상치 vs 결측치**: 결측은 값이 없는 것, 이상치는 값은 있는데 튀는 것. 결측 코드 `9999` 가 이상치로 잡히면 결측으로 되돌린다.
- **이상치 vs 이상 탐지(anomaly detection)**: 이상치는 전처리 단계에서 다루는 데이터 포인트, 이상 탐지는 "지금 들어오는 값이 평소와 다르다" 를 실시간으로 잡는 모델·시스템(장비 고장, 환자 악화 경보).
- **IQR 1.5배 vs z-score 3**: IQR 규칙은 분포가 치우쳐도 쓸 수 있고, z-score 는 정규분포에 가깝다는 가정이 깔린다. 혈당·CRP 처럼 꼬리가 긴 값에는 IQR 쪽이 안전하다.
