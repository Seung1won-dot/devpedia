---
id: transfer-learning
term: 전이학습
aliases:
  - Transfer Learning
  - 전이 학습
  - 사전학습 모델
  - Pretrained Model
  - 백본 동결
category: ai
tags:
  - 딥러닝
  - 학습
  - 의료영상
  - 의료AI
level: 2
kind: concept
related:
  - fine-tuning
  - cnn
  - huggingface
  - data-augmentation
  - overfitting
  - medical-image-segmentation
see_also:
  - https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

**다른 일을 하며 배운 모델의 지식**을 재사용해 적은 데이터로 새 과제를 푸는 방법.

## 비유

피아노를 치던 사람이 오르간을 배우는 것. 악보 읽기와 손가락 움직임은 이미 몸에 있으니 건반 차이만 익히면 되어, 처음 배우는 사람보다 훨씬 적은 연습으로 된다.

## 예시

```python
import torch.nn as nn, torchvision
model = torchvision.models.resnet50(weights="IMAGENET1K_V2")   # 자연 사진 120만 장으로 배운 가중치
for p in model.parameters():
    p.requires_grad = False                    # 1단계: 몸통 동결 — 선·질감 보는 눈은 그대로
model.fc = nn.Linear(model.fc.in_features, 2)  # 머리만 교체: 1000 클래스 → 정상/폐렴
# 흉부 X-ray 600장으로 fc 만 학습 → 2단계: 동결을 풀고 작은 학습률(1e-5)로 전체 미세조정
```

앞쪽 층이 배운 "선·모서리·질감" 은 고양이 사진이든 X-ray 든 통하므로, 수백 장짜리 의료 데이터로 처음부터 학습하는 것보다 훨씬 잘 되고 빨리 수렴한다. 흑백 X-ray 는 채널을 3개로 복제해 넣는다. 보통 두 단계로 간다 — 머리만 학습(feature extraction) 뒤 전체를 작은 학습률로 미세조정(fine-tuning). 사전학습 데이터와 내 데이터가 많이 다를수록(병리 WSI, 초음파) 자연 영상 사전학습의 이점은 줄어서, RadImageNet·MedSAM 같은 의료 영상 사전학습 모델을 찾아보는 편이 낫다. LLM 의 "사전학습 → 파인튜닝" 도 같은 원리다.

## 헷갈리기 쉬운 것

- **파인튜닝**: 전이학습을 실행하는 방법 중 하나(가중치를 더 학습). 전이학습은 "남의 지식을 가져다 쓴다" 는 큰 개념이고, 몸통을 동결한 채 머리만 바꾸는 것도 전이학습이다.
- **처음부터 학습(from scratch)**: 가중치를 무작위에서 시작. 데이터가 수십만 장이 아니면 의료 영상에서는 거의 안 한다.
- **도메인 적응(domain adaptation)**: 과제는 같은데 데이터 분포만 다를 때(A 병원 CT 로 배운 모델을 B 병원 CT 에). 전이학습의 한 갈래.
