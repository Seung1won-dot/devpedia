---
id: data-augmentation
term: 데이터 증강
aliases:
  - Data Augmentation
  - 어그멘테이션
  - 증강
  - albumentations
category: ai
tags:
  - 딥러닝
  - 학습
  - 의료영상
  - 의료AI
level: 2
kind: concept
related:
  - overfitting
  - labeling
  - transfer-learning
  - cnn
  - medical-image-segmentation
  - train-validation-test
see_also:
  - https://pytorch.org/vision/stable/transforms.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

있는 데이터를 **뒤집고 돌리고 밝기를 바꿔** 학습 데이터를 여러 배로 불리는 기법.

## 비유

같은 문제를 숫자만 바꿔 여러 번 풀게 하는 선생님. 문제의 원리는 그대로인데 겉모습이 매번 달라져서, 답을 외우는 대신 푸는 법을 익히게 된다.

## 예시

```python
from torchvision import transforms as T
train_tf = T.Compose([
    T.RandomRotation(10),                          # ±10도: 촬영 자세 차이
    T.RandomResizedCrop(224, scale=(0.85, 1.0)),   # 살짝 확대·이동
    T.ColorJitter(brightness=0.2, contrast=0.2),   # 장비마다 다른 밝기·대비
    T.ToTensor(),
])
val_tf = T.Compose([T.Resize(224), T.CenterCrop(224), T.ToTensor()])   # 검증·테스트에는 증강 없음
```

매 에폭마다 같은 X-ray 가 조금씩 다른 모습으로 들어가므로 외우기(과적합)가 어려워진다. 의료 영상에서는 변환이 **해부학적으로 말이 되는지**가 핵심이다 — 흉부 X-ray 를 좌우로 뒤집으면 심장이 오른쪽에 있는 환자(우심증)가 되어 버리므로 수평 뒤집기는 빼고, 세그멘테이션은 영상과 정답 마스크(어노테이션)에 **똑같은 변환**을 걸어야 한다(albumentations 는 이걸 자동으로 맞춰 준다). 증강은 학습 데이터에만 건다 — 검증·테스트에 걸면 점수가 흔들린다. 전문의 어노테이션이 비싸 데이터가 수백 장에 머무는 의료 과제에서는 거의 필수지만, 증강은 다양성을 흉내 내는 것이지 새 환자가 아니라서 300장을 "3만 장으로 만들었다" 고 생각하면 안 된다.

## 헷갈리기 쉬운 것

- **합성 데이터(synthetic data)**: GAN·디퓨전으로 없던 영상을 새로 만드는 것. 증강은 있는 영상을 변형할 뿐이다.
- **오버샘플링(SMOTE)**: 소수 클래스를 복제·보간해 클래스 비율을 맞추는 것. 증강과 같이 쓰기도 하지만 목적이 불균형 해소다.
- **전처리(리사이즈·정규화)**: 모든 데이터에 똑같이, 매번 같은 결과로 적용한다. 증강은 학습 데이터에만 무작위로.
