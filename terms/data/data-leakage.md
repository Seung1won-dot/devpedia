---
id: data-leakage
term: 데이터 누수(leakage)
aliases:
  - Data Leakage
  - Target Leakage
  - Train-Test Contamination
  - 데이터 리키지
  - 정보 누출
category: data
tags:
  - ML기초
  - 흔한실수
  - 데이터분석
  - 학습
level: 2
kind: concept
related:
  - train-validation-test
  - overfitting
  - feature-engineering
  - missing-data
  - precision-recall-f1
see_also:
  - https://scikit-learn.org/stable/common_pitfalls.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

학습 때는 쓸 수 있지만 **실제 예측 시점엔 알 수 없는 정보**가 모델에 새어 들어가는 것.

## 비유

시험 전날 답안지를 슬쩍 본 학생. 모의고사 점수는 만점인데 진짜 시험장에서는 평소 실력 그대로 — 점수가 거짓이었던 것이다.

## 예시

```python
from sklearn.model_selection import GroupShuffleSplit
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# (1) 환자 단위로 가른다 — 같은 환자의 기록이 양쪽에 들어가면 그 자체가 누수
tr, te = next(GroupShuffleSplit(test_size=0.2, random_state=0)
              .split(X, y, groups=df["patient_id"]))
# (2) 표준화·대치는 파이프라인 안에서 → 평균·중앙값이 학습 몫으로만 계산된다
clf = make_pipeline(StandardScaler(), LogisticRegression()).fit(X.iloc[tr], y.iloc[tr])
print(clf.score(X.iloc[te], y.iloc[te]))
```

연구실에서 실제로 겪는 누수는 세 가지다. ① **미래 정보**: "패혈증 발생 예측" 모델의 입력에 항생제 처방 여부나 퇴원 진단 코드가 들어가면, 그건 결과를 알고 난 뒤 기록된 것이라 성능이 비현실적으로 좋게 나온다 — 예측 시점 이전에 실제로 존재하는 열만 쓴다. ② **환자 섞임**: 한 환자의 바이탈 수백 행이 무작위로 학습/테스트에 나뉘면 사실상 같은 사람을 외워서 맞힌다. ③ **전처리 누수**: 전체 데이터로 `StandardScaler().fit()` 을 하고 나서 나누면 테스트 분포가 학습에 스며든다. 증상은 공통이다 — 검증 점수는 눈부신데 실제 병동에 올리면 안 맞는다. 점수가 너무 좋으면 기뻐하기 전에 의심한다.

## 헷갈리기 쉬운 것

- **과적합**: 모델이 학습 데이터를 외워서 검증 점수가 *떨어지는* 것 — 점수표에 드러난다. 누수는 검증 점수까지 *좋게* 나와서 점수표로는 보이지 않는다.
- **개인정보 유출**: 같은 "leak" 이지만 환자 정보가 밖으로 새는 보안 사고. 데이터 누수는 정답이 모델 안으로 새는 방법론 문제다.
- **학습/검증/테스트 분할**: 나눴다고 누수가 없는 게 아니다 — 환자 단위로, 시간 순서대로 갈라야 하고 전처리의 `fit` 도 분할 뒤에 학습 몫으로만 한다.
