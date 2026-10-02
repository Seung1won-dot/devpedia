---
id: hyperparameter
term: 하이퍼파라미터
aliases:
  - Hyperparameter
  - 하이퍼파라미터 튜닝
  - Hyperparameter Tuning
  - 그리드 서치
  - Optuna
category: ai
tags:
  - 딥러닝
  - 학습
  - ML기초
  - 연구
level: 1
kind: concept
related:
  - gradient-descent
  - batch-epoch
  - model-parameters
  - train-validation-test
  - overfitting
  - experiment-tracking
see_also:
  - https://optuna.readthedocs.io/en/stable/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

학습률·배치 크기·에폭처럼 **모델이 배우지 않고 사람이 미리 정하는** 설정값.

## 비유

오븐의 온도와 시간 다이얼. 반죽이 빵이 되는 과정은 오븐이 알아서 하지만, 몇 도에서 몇 분 구울지는 요리사가 정하고 몇 번 구워 보며 맞춘다.

## 예시

```python
import optuna

def objective(trial):
    lr = trial.suggest_float("lr", 1e-5, 1e-2, log=True)          # 학습률: 로그 스케일로 탐색
    batch = trial.suggest_categorical("batch_size", [16, 32, 64])
    drop = trial.suggest_float("dropout", 0.1, 0.5)
    return train_and_eval(lr, batch, drop)      # 직접 쓴 함수: 학습 후 검증 F1 반환

study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=30)          # 30번 학습해 보고 가장 좋은 조합
print(study.best_params)
```

어떤 값이 좋은지는 데이터마다 달라 **검증 데이터로 골라야** 하고, 테스트 데이터로 고르면 테스트가 더 이상 "처음 보는 데이터" 가 아니게 된다. 손으로 하나씩 → 격자(grid search) → 무작위(random search) → 이전 결과를 보고 다음 후보를 고르는 Optuna 순으로 자동화한다. 영향이 가장 큰 것은 학습률이고(크고 작을 때 무슨 일이 나는지는 경사하강법 카드에), 그다음이 배치 크기·에폭 수·드롭아웃·weight decay 다. 연구실에서는 설정을 YAML 로 저장하고 결과와 함께 기록해 둬야 "지난주 그 결과가 어떤 설정이었지" 를 재현할 수 있다.

## 헷갈리기 쉬운 것

- **파라미터 vs 하이퍼파라미터**: 파라미터(가중치)는 학습이 데이터에서 찾아내는 값이고 "7B" 가 그 개수다. 하이퍼파라미터는 그 학습을 어떻게 할지 사람이 정하는 값이라 모델 파일 안에 들어 있지 않다.
- **학습률 스케줄러**: 학습률을 에폭마다 바꾸는 규칙(cosine, step). 스케줄러 종류와 초기값 역시 하이퍼파라미터다.
- **LLM 의 temperature·top_p**: 학습이 아니라 추론 때 정하는 값. "생성 하이퍼파라미터" 라고도 부르지만 학습 하이퍼파라미터와는 다른 층위다.
