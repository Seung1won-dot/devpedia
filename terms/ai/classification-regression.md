---
id: classification-regression
term: 분류/회귀
aliases:
  - Classification / Regression
  - 분류
  - 회귀
  - 분류 문제
  - 회귀 문제
category: ai
tags:
  - ML기초
  - 학습
  - 면접
level: 1
kind: concept
related:
  - learning-paradigms
  - loss-function
  - precision-recall-f1
  - machine-learning
  - medical-image-segmentation
  - sensitivity-specificity
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

지도학습에서 **답이 범주면 분류, 숫자면 회귀**로 나누는 문제 유형.

## 비유

병원 접수창구의 두 질문. 입원인지 외래인지 칸 하나를 고르게 하는 게 분류, 대기 시간이 몇 분쯤일지 숫자를 답하게 하는 게 회귀다.

## 예시

```python
import torch.nn as nn
backbone = nn.Sequential(nn.Flatten(), nn.Linear(256 * 256, 128), nn.ReLU())

# 분류: 흉부 X-ray → 정상/폐렴   (출력 2칸, 크로스엔트로피)
clf = nn.Sequential(backbone, nn.Linear(128, 2))
clf_loss = nn.CrossEntropyLoss()      # 정답은 0 또는 1 (클래스 번호)

# 회귀: 손 X-ray → 골연령(개월)    (출력 1칸, MSE)
reg = nn.Sequential(backbone, nn.Linear(128, 1))
reg_loss = nn.MSELoss()               # 정답은 132.0 같은 실수
```

몸통은 같고 **마지막 층의 출력 개수와 손실 함수만** 바뀐다. 분류는 출력을 softmax 로 확률로 읽어 가장 큰 칸을 고르고 정확도·F1·AUC 로 채점하며, 회귀는 숫자를 그대로 읽고 정답과의 차이(MAE·RMSE)로 채점한다. 연구실 과제로 치면 "결절이 있나 없나"·"어느 병기인가" 는 분류, "종양 지름 몇 mm"·"입원 며칠" 은 회귀다.

면접에서는 "분류와 회귀의 차이를 예와 함께" 로 나온다. 답이 범주냐 연속값이냐 한마디에, 손실 함수가 다르다(크로스엔트로피 vs MSE)까지 붙이면 충분하다.

## 헷갈리기 쉬운 것

- **로지스틱 회귀**는 이름에 회귀가 붙어 있지만 분류 알고리즘이다. 0~1 사이 확률을 회귀하듯 계산한 뒤 0.5 를 기준으로 칸을 가른다.
- **다중 분류 vs 다중 레이블**: 다중 분류는 여러 칸 중 딱 하나(정상/폐렴/결핵), 다중 레이블은 여러 칸을 동시에 체크(기흉도 있고 심비대도 있음). 후자는 `BCEWithLogitsLoss` 를 쓴다.
- **회귀를 분류로 바꾸기**: 골연령을 "0~5세/6~10세" 구간으로 묶으면 분류가 되지만 경계 근처 정보가 사라진다. 숫자 정답이 있으면 보통 회귀가 낫다.
