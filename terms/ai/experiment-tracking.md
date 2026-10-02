---
id: experiment-tracking
term: 실험 관리(W&B/MLflow)
aliases:
  - Experiment Tracking
  - 실험 추적
  - MLflow
  - Weights & Biases
  - W&B
  - wandb
category: ai
tags:
  - 연구
  - 학습
  - 개발도구
level: 2
kind: tool
related:
  - reproducibility
  - hyperparameter
  - checkpoint
  - overfitting
  - monitoring
  - git
see_also:
  - https://mlflow.org/docs/latest/
  - https://docs.wandb.ai/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

학습마다 **설정·지표·결과물을 자동 기록**해 실험들을 비교할 수 있게 하는 도구.

## 비유

실험 노트를 대신 써 주는 기계. 손으로 쓰면 빠뜨리고 어느 노트에 적었는지도 잊지만, 기계는 매 실험의 조건과 측정값을 빠짐없이 적어 두고 표와 그래프로 나란히 보여 준다.

## 예시

```python
import mlflow
mlflow.set_tracking_uri("http://gpu-server:5000")     # 연구실 서버에 띄운 MLflow (폐쇄망 OK)
mlflow.set_experiment("ecg-arrhythmia")
with mlflow.start_run(run_name="resnet18-lr1e-3-seed42"):
    mlflow.log_params({"lr": 1e-3, "batch": 64, "seed": 42, "model": "resnet18"})
    for epoch in range(epochs):
        train_loss, val_auc = train_one_epoch()
        mlflow.log_metrics({"train_loss": train_loss, "val_auc": val_auc}, step=epoch)
    mlflow.log_artifact("best.pt")                     # 체크포인트도 같은 run 에
```

서버 쪽은 `mlflow server --host 0.0.0.0 --port 5000` 한 줄(Docker Compose 로 올려 두면 편하다). 기록하는 것은 하이퍼파라미터, 에폭별 지표 곡선, git 커밋 해시, 환경(패키지 버전), 체크포인트. 이게 없으면 "지난주 AUC 0.91 나왔던 그 설정이 뭐였지" 에 아무도 답을 못 한다. W&B 는 SaaS 라 그래프와 공유가 편한 대신 지표가 외부 서버로 나가므로, 의료 데이터처럼 폐쇄망에서 하는 연구는 셀프호스팅이 기본인 MLflow 쪽이 맞다 [확인 필요].

## 헷갈리기 쉬운 것

- **TensorBoard** 는 한 실험의 로그 파일을 그래프로 보여 주는 뷰어. 실험 관리 도구는 수십 개 실험을 표로 비교·검색하고 파라미터·결과물까지 묶어 둔다.
- **모니터링(Prometheus/Grafana)** 은 운영 중인 서비스의 지표, 실험 관리는 학습 결과의 기록. 그래프가 비슷해 보여도 쓰는 시점이 다르다.
- **Git** 은 코드 버전만 남긴다. 실험 관리는 "그 코드 버전 + 그 데이터 + 그 설정 → 이 결과" 를 묶어 두는 것이라 둘 다 필요하고, run 마다 커밋 해시를 기록하는 이유가 그것.
