---
id: machine-learning
term: 머신러닝
aliases:
  - Machine Learning
  - 기계학습
  - ML
category: ai
tags:
  - ML기초
  - 학습
  - 데이터
level: 1
related:
  - training-inference
  - neural-network
  - overfitting
  - llm
  - cdss
see_also:
  - https://scikit-learn.org/stable/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

규칙을 사람이 짜는 대신 **데이터에서 패턴을 스스로 찾게** 하는 방법.

## 비유

아이에게 고양이 사진 수백 장을 보여주며 "이게 고양이야" 하고 알려주는 것. 규칙("귀가 뾰족하고 수염이…")을 말로 설명하지 않아도 아이가 알아서 구별하게 된다.

## 예시

```python
from sklearn.linear_model import LinearRegression
X = [[1], [2], [3], [4]]          # 임베딩 작업 시간(h)
y = [10, 20, 30, 40]              # 처리한 연구실 문서 수
model = LinearRegression().fit(X, y)
print(model.predict([[5]]))       # 약 [50.]
```

규칙(y = 10x)을 직접 쓰지 않았는데, 데이터 4개만 보고 모델이 관계를 찾아 "5시간이면 50개" 라고 예측한다.

## 헷갈리기 쉬운 것

- **딥러닝**은 머신러닝의 한 갈래. 신경망을 아주 깊게 쌓은 방식이고, LLM 도 여기서 나왔다.
- **인공지능(AI)** 은 더 넓은 말. 규칙을 손으로 짠 옛날 프로그램(if-else 로 만든 체스)도 AI 라고 불렀다.
