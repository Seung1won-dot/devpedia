---
id: sensitivity-specificity
term: 민감도/특이도/AUC
aliases:
  - Sensitivity / Specificity / AUC
  - 민감도
  - 특이도
  - ROC 곡선
  - AUROC
category: medical
tags:
  - 의료AI
  - 평가
  - 통계
  - 면접
level: 2
kind: metric
related:
  - precision-recall-f1
  - cdss
  - classification-regression
  - hypothesis-test
  - mfds-approval
  - train-validation-test
see_also:
  - https://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc_auc_score.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

진단 검사가 **환자를 얼마나 잘 잡고(민감도) 정상을 얼마나 잘 걸러내는지(특이도)** 재는 지표.

## 비유

공항 **금속 탐지기의 감도 조절**. 감도를 올리면 흉기는 다 잡지만(민감도↑) 허리띠 버클에도 울리고(특이도↓), 내리면 줄은 빨라지지만 뭔가를 놓친다.

## 예시

```python
from sklearn.metrics import confusion_matrix, roc_auc_score, roc_curve
tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
sensitivity = tp / (tp + fn)          # 환자 중 양성으로 잡은 비율 (= 재현율)
specificity = tn / (tn + fp)          # 정상 중 음성으로 맞춘 비율
auc = roc_auc_score(y_true, y_score)  # 임계값 전부를 훑은 종합 점수 (0.5 = 동전 던지기, 1.0 = 완벽)
fpr, tpr, thr = roc_curve(y_true, y_score)   # ROC 곡선: x = 1 - 특이도, y = 민감도
```

핵심은 임상적 의미다. **선별(screening)** 은 환자를 놓치면 치료 시기를 잃으니 민감도를 우선한다 — 건강검진 CT 판독 보조 AI 는 의심되면 일단 표시하고, 거짓 양성은 다음 단계 검사가 걸러 준다. **확진(confirmation)** 은 "암입니다" 라고 말하는 순간 수술·항암이 뒤따르므로 특이도를 우선한다. 같은 모델도 임계값에 따라 선별용이 되기도 확진용이 되기도 하고, AUC 는 임계값과 무관하게 모델의 변별력 자체를 비교할 때 쓴다. 논문·식약처 임상 성능 자료는 정확도보다 민감도·특이도와 95% 신뢰구간을 요구하는 것이 보통이다 [확인 필요].

## 헷갈리기 쉬운 것

- **재현율(recall)** 은 민감도와 **같은 수식**(TP/(TP+FN)) — ML 논문은 재현율, 의학 논문은 민감도라 부른다. **정밀도(precision)** 는 특이도가 아니라 양성 예측도(PPV)에 해당하고, 유병률이 낮으면 특이도 99% 여도 PPV 는 낮을 수 있다.
- **AUC vs 정확도**: AUC 는 임계값을 정하기 전 모델의 순위 매기기 능력, 정확도·민감도·특이도는 임계값 하나를 정한 뒤의 값. 임상에 붙일 때는 결국 임계값을 골라야 한다.
- **AUROC vs AUPRC**: 양성이 드문 데이터에서는 ROC 가 낙관적으로 보여 정밀도-재현율 곡선(AUPRC)을 함께 본다.
