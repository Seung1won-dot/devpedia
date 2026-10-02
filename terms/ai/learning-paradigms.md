---
id: learning-paradigms
term: 지도/비지도/강화 학습
aliases:
  - Supervised / Unsupervised / Reinforcement Learning
  - 지도학습
  - 비지도학습
  - 강화학습
  - 자기지도학습
  - Self-supervised Learning
category: ai
tags:
  - ML기초
  - 학습
level: 1
kind: concept
related:
  - machine-learning
  - precision-recall-f1
  - train-validation-test
  - fine-tuning
  - llm
  - rlhf
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

데이터에 **정답이 있느냐, 없느냐, 보상만 있느냐**로 나눈 머신러닝의 세 갈래.

## 비유

지도학습은 답안지를 보며 문제집을 푸는 공부, 비지도학습은 답 없이 비슷한 것끼리 묶어 보는 정리, 강화학습은 게임을 하며 점수로만 배우는 것. 셋 다 "배운다" 지만 배우는 재료가 다르다.

## 예시

```python
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans

# 지도: 정답(y)이 있다 — 검사 수치로 당뇨 여부 맞히기 (분류)
clf = LogisticRegression().fit(X_lab, y_diabetes)

# 비지도: 정답이 없다 — 환자를 비슷한 3그룹으로 묶기 (군집)
group = KMeans(n_clusters=3).fit_predict(X_lab)

# 강화: 정답 대신 보상 — 행동하고 점수를 받아 점수가 오르는 쪽으로 정책을 고친다
obs, reward, done, _ = env.step(action)      # 게임 점수. RLHF 는 "사람이 매긴 선호" 가 보상
```

지도학습은 답이 범주면 분류(당뇨/정상), 숫자면 회귀(공복 혈당 예측)로 나뉘고, 비지도학습에는 군집 말고도 차원 축소(PCA 로 검사 항목 100개를 2차원 그림으로)가 있다. 강화학습은 알파고, 그리고 ChatGPT 를 사람 취향에 맞추는 RLHF 단계(답변 둘 중 사람이 고른 쪽을 보상으로)에 쓰인다. LLM 사전학습은 자기지도학습인데, "다음 단어를 가리고 맞히기" 처럼 정답을 데이터 자체에서 만들어 내므로 라벨링 없이 인터넷 규모 텍스트를 쓸 수 있다.

면접에서는 "지도와 비지도의 차이를 예와 함께 설명하라" 로 나온다. 분류·회귀 / 군집·차원 축소를 하나씩 대고, 강화학습은 "정답 대신 뒤늦게 오는 보상" 한마디면 된다.

## 헷갈리기 쉬운 것

- **분류 vs 회귀**: 둘 다 지도학습. 답이 범주(양성/음성)면 분류, 연속된 숫자(혈당 수치)면 회귀.
- **자기지도 vs 비지도**: 자기지도는 라벨을 데이터에서 자동으로 만들어 지도학습처럼 배운다. 비지도는 정답 개념 없이 구조만 찾는다.
- **강화 vs 지도**: 지도는 입력마다 정답을 바로 알려 주지만, 강화는 한참 뒤에 결과 점수만 온다(바둑은 한 판이 끝나야 승패를 안다).
