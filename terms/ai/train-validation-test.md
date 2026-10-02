---
id: train-validation-test
term: 학습/검증/테스트 데이터
aliases:
  - Train / Validation / Test Split
  - 훈련 데이터
  - 검증 데이터
  - 테스트 데이터
  - 데이터 분할
  - 홀드아웃
category: ai
tags:
  - ML기초
  - 학습
  - 데이터
level: 1
kind: concept
related:
  - overfitting
  - machine-learning
  - precision-recall-f1
  - training-inference
  - medical-image-segmentation
  - data-leakage
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

데이터를 **배우는 몫·고르는 몫·마지막 채점 몫** 셋으로 나눠 쓰는 규칙.

## 비유

학습 데이터는 교과서, 검증 데이터는 모의고사, 테스트 데이터는 수능. 모의고사는 여러 번 봐도 되지만 수능 문제로 공부해 버리면 수능 점수가 실력을 말해 주지 못한다.

## 예시

```python
from sklearn.model_selection import train_test_split

# 1) 테스트 몫을 먼저 떼어 둔다 (마지막에 딱 한 번만 쓴다)
X_tmp, X_test, y_tmp, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)
# 2) 남은 것에서 검증 몫을 뗀다 → 학습 60 / 검증 20 / 테스트 20
X_train, X_val, y_train, y_val = train_test_split(
    X_tmp, y_tmp, test_size=0.25, random_state=42, stratify=y_tmp)
```

검증 데이터로는 학습률·epoch 수·모델 종류 같은 하이퍼파라미터를 여러 번 바꿔 가며 고르고, 다 정한 뒤 테스트 데이터로 딱 한 번 채점해 보고한다. 테스트 점수를 보고 다시 모델을 고치기 시작하면 테스트가 검증으로 변질되어 "처음 보는 데이터" 가 사라진다. 의료 데이터는 환자 단위로 나눠야 한다 — 한 환자의 CT 슬라이스 30장이 학습과 테스트에 섞여 들어가면 사실상 같은 데이터로 채점하는 데이터 누수가 되므로, `GroupShuffleSplit(groups=patient_id)` 처럼 환자 ID 를 기준으로 가른다.

면접에서는 "검증 데이터와 테스트 데이터는 왜 따로 두나?" 로 나온다. "검증은 고르는 데 쓰니까 이미 모델이 거기에 맞춰졌다, 그래서 안 본 테스트가 하나 더 필요하다" 가 답이다.

## 헷갈리기 쉬운 것

- **검증 vs 테스트**: 검증은 모델을 고르는 데 여러 번 쓰고, 테스트는 최종 성능 보고용으로 한 번. 둘을 합쳐 쓰면 점수가 실전보다 좋게 나온다.
- **교차 검증(k-fold)**: 데이터가 적을 때 검증 몫을 k 번 돌려가며 뽑아 평균 내는 방법. 검증을 대신하는 것이지 테스트를 대신하지 않는다.
- **데이터 누수(leakage)**: 정규화 평균을 전체 데이터로 계산하거나, 같은 환자가 양쪽에 들어가는 것. 코드는 멀쩡한데 실전 성능이 안 나오는 원인 1순위.
