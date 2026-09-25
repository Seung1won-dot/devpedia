---
id: overfitting
term: 과적합
aliases:
  - Overfitting
  - 오버피팅
  - 과대적합
category: ai
tags:
  - ML기초
  - 학습
level: 2
related:
  - machine-learning
  - training-inference
  - fine-tuning
  - neural-network
  - medical-image-segmentation
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

모델이 **학습 데이터만 외워** 새 데이터에서는 못 맞히는 상태.

## 비유

기출문제 답만 통째로 외운 학생. 기출은 100점인데 숫자만 살짝 바뀐 문제가 나오면 틀린다.

## 예시

```python
model.fit(X_train, y_train, epochs=200)
print(model.score(X_train, y_train))  # 0.99  학습에 쓴 데이터
print(model.score(X_val, y_val))      # 0.61  처음 보는 데이터
```

학습 점수와 검증 점수가 이렇게 벌어지면 과적합. 의료 영상 200장처럼 데이터가 적을 때 자주 생기며, 데이터를 늘리거나 epoch 을 줄이거나 dropout 을 넣어 잡는다.

## 헷갈리기 쉬운 것

- **과소적합(underfitting)** 은 반대. 모델이 너무 단순하거나 덜 학습해서 학습 데이터조차 못 맞힌다.
- **데이터 누수(leakage)** 는 검증 데이터가 학습에 섞여 들어가 점수가 부풀려지는 것. 점수표로는 멀쩡해 보이는데 실전에서 성능이 안 나온다.
