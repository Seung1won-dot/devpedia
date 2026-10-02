---
id: batch-epoch
term: 배치/에폭
aliases:
  - Batch / Epoch
  - 배치 크기
  - Batch Size
  - 에포크
  - 미니배치
  - 이터레이션
category: ai
tags:
  - 딥러닝
  - 학습
  - ML기초
level: 1
kind: concept
related:
  - gradient-descent
  - hyperparameter
  - vram
  - pytorch
  - checkpoint
  - overfitting
see_also:
  - https://pytorch.org/tutorials/beginner/basics/data_tutorial.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

배치는 **한 번에 넣는 데이터 묶음**, 에폭은 **전체 데이터를 한 바퀴** 다 본 횟수.

## 비유

문제집 한 권을 푸는데 열 문제씩 풀고 채점한 뒤 다음 열 문제로 넘어가는 것이 배치, 그렇게 한 권을 끝까지 다 푼 것이 1 에폭이다. 같은 문제집을 스무 번 반복해 풀면 20 에폭.

## 예시

```python
from torch.utils.data import DataLoader
loader = DataLoader(xray_dataset, batch_size=32, shuffle=True)   # 3,200장 → 배치 100개
print(len(loader))                      # 100 : 1 에폭 = 가중치 갱신 100번

for epoch in range(20):                 # 전체를 20바퀴
    for images, labels in loader:       # 한 번 돌 때마다 32장 (= 1 iteration)
        loss = loss_fn(model(images.cuda()), labels.cuda())
        opt.zero_grad(); loss.backward(); opt.step()
```

3,200장을 32장씩 나누면 1 에폭에 가중치가 100번 바뀐다. 배치 크기는 사실상 **VRAM 이 정한다** — `CUDA out of memory` 가 나면 가장 먼저 줄이는 값이고, 크면 GPU 가 한 번에 많이 계산해 빠르고 기울기가 안정적이지만 작으면 흔들림이 오히려 규제 역할을 해 일반화가 나아지기도 한다. 에폭은 많을수록 학습 데이터에는 잘 맞지만 어느 순간 검증 손실이 다시 오르기 시작하므로(과적합), 그 지점을 보고 멈춘다(early stopping). 수백 장짜리 의료 영상은 수십~수백 에폭, LLM 파인튜닝은 1~3 에폭이 보통이다.

## 헷갈리기 쉬운 것

- **이터레이션(step) vs 에폭**: 이터레이션은 배치 하나 처리 = 가중치 1번 갱신, 에폭은 데이터 전체 한 바퀴. 위 예시에서 1 에폭 = 100 이터레이션이고, 논문의 "10k steps" 는 이터레이션 수다.
- **배치 크기와 학습률**: 배치를 키우면 한 걸음에 쓰는 정보가 많아져 학습률도 함께 키우는 관행이 있다. 배치만 바꿨는데 결과가 달라졌다면 이것 때문일 수 있다.
- **배치 정규화(BatchNorm)**: 이름에 배치가 있지만 별개 — 배치 안의 값을 평균 0·분산 1 로 맞추는 층이다. 배치가 1~2개로 너무 작으면 통계가 불안정해 잘 안 돈다.
