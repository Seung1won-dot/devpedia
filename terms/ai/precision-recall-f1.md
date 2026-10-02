---
id: precision-recall-f1
term: 정확도/정밀도/재현율/F1
aliases:
  - Accuracy / Precision / Recall / F1 Score
  - 혼동 행렬
  - Confusion Matrix
  - 정밀도
  - 재현율
  - F1 스코어
category: ai
tags:
  - ML기초
  - 면접
  - 의료AI
level: 2
kind: metric
related:
  - train-validation-test
  - machine-learning
  - learning-paradigms
  - overfitting
  - cdss
  - outlier
  - sensitivity-specificity
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

맞힌 개수만 세는 **정확도** 대신 **놓친 것과 헛짚은 것**을 따로 재는 채점 지표.

## 비유

금속 탐지기. 정밀도는 "삐 울렸을 때 진짜 금속일 확률", 재현율은 "땅속 금속 중 실제로 찾아낸 비율" 이라서, 감도를 최대로 올리면 다 찾지만(재현율 높음) 돌멩이에도 울린다(정밀도 낮음).

## 예시

|           | 실제 양성   | 실제 음성   |
|-----------|-------------|-------------|
| 예측 양성 | TP          | FP (헛짚음) |
| 예측 음성 | FN (놓침)   | TN          |

- 정확도 = (TP + TN) / 전체
- 정밀도 = TP / (TP + FP) — 양성이라고 한 것 중 진짜
- 재현율 = TP / (TP + FN) — 진짜 양성 중 잡아낸 것
- F1 = 2 × 정밀도 × 재현율 / (정밀도 + 재현율) — 둘의 조화평균

```python
from sklearn.metrics import confusion_matrix, recall_score
y_true = [1] * 10 + [0] * 990     # 환자 1000명 중 암 10명
y_pred = [0] * 1000               # 전부 "정상" 이라고 찍는 엉터리 모델
print(confusion_matrix(y_true, y_pred))   # [[990   0]
                                          #  [ 10   0]]  ← TP 가 0
print(recall_score(y_true, y_pred))       # 0.0   (정확도는 0.99)
```

정확도 99% 인데 암 환자를 한 명도 못 잡는다 — 한쪽 클래스가 드문 불균형 데이터에서 정확도만 보면 안 되는 이유다. 암 진단처럼 놓치면 큰일인 문제는 재현율을, 스팸 필터처럼 헛짚으면(정상 메일이 스팸함으로) 곤란한 문제는 정밀도를 우선한다. 둘은 임계값을 움직이면 한쪽이 오르고 한쪽이 내리는 관계라 F1 로 묶어 본다.

면접 단골이다. "정밀도와 재현율의 차이를 예를 들어 설명하고, 어느 경우에 어느 쪽을 중시하나?" — 위의 암 진단 vs 스팸 필터로 답하면 된다.

## 헷갈리기 쉬운 것

- **민감도 / 특이도**: 의료 논문의 민감도(sensitivity)는 재현율과 같은 값. 특이도는 음성 쪽 재현율(TN / (TN + FP)).
- **F1 vs 정확도**: F1 은 양성 클래스만 본다. 클래스 비율이 비슷하면 정확도로도 충분하다.
- **AUC-ROC**: 임계값 하나를 정하지 않고 모든 임계값에서의 성능을 한 숫자로 요약한 것. 정밀도·재현율은 임계값을 하나 정한 뒤의 값이다.
