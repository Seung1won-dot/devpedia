---
id: cnn
term: CNN
aliases:
  - Convolutional Neural Network
  - 합성곱 신경망
  - 컨볼루션 신경망
  - 씨엔엔
  - 합성곱
category: ai
tags:
  - 딥러닝
  - 의료영상
  - 의료AI
level: 2
kind: concept
related:
  - neural-network
  - medical-image-segmentation
  - transformer
  - pytorch
  - rnn
  - dicom
  - ecg
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

작은 **필터를 이미지 위에 밀어 가며** 지역 패턴을 찾는, 이미지용 신경망.

## 비유

돋보기를 사진 위에서 조금씩 옮겨 가며 "여기 모서리가 있나, 동그라미가 있나" 만 확인하는 것. 같은 돋보기 하나로 사진 전체를 훑으니 고양이가 왼쪽에 있든 오른쪽에 있든 똑같이 찾아낸다.

## 예시

```python
import torch.nn as nn
model = nn.Sequential(
    nn.Conv2d(1, 16, kernel_size=3, padding=1), nn.ReLU(),  # 3x3 필터 16장: 선·모서리
    nn.MaxPool2d(2),                                         # 256 → 128 로 줄임
    nn.Conv2d(16, 32, kernel_size=3, padding=1), nn.ReLU(),  # 필터 조합: 결절·늑골 모양
    nn.MaxPool2d(2),                                         # 128 → 64
    nn.AdaptiveAvgPool2d(1), nn.Flatten(),
    nn.Linear(32, 2),                                        # 정상 / 폐렴
)
# 입력 (batch, 1채널 흑백, 256, 256) 흉부 X-ray → 출력 (batch, 2)
```

3×3 필터 하나의 파라미터는 9개뿐이고 그걸 이미지 모든 위치에서 공유하므로, 256×256 이미지를 완전연결층으로 다루면 수백만 개일 가중치가 합성곱층 두 개로는 5천 개 남짓이다. 앞층은 선·모서리, 뒷층은 그 조합을 보게 되고, 풀링은 크기를 줄여 위치가 조금 어긋나도 같은 특징으로 본다. 연구실의 흉부 X-ray 분류, CT 세그멘테이션(U-Net 은 CNN 을 U 자로 쌓은 것)이 다 CNN 이고, 이미지를 패치로 잘라 Transformer 에 넣는 ViT 는 데이터가 많을 때 CNN 을 앞서지만 수백 장짜리 의료 데이터에선 CNN 이 여전히 잘 버틴다.

면접에서는 "CNN 이 왜 이미지에 잘 맞나?" 로 나온다. 지역 패턴(local pattern)과 파라미터 공유(위치가 바뀌어도 같은 필터) 두 가지로 답한다.

## 헷갈리기 쉬운 것

- **완전연결층(MLP)** 은 모든 픽셀을 모든 뉴런에 연결한다. 위치 관계를 버리고 파라미터가 폭발한다.
- **ViT(Vision Transformer)**: 이미지를 16×16 패치로 잘라 단어처럼 취급하는 Transformer. 데이터가 아주 많으면 CNN 보다 낫고, 적으면 CNN 이 유리한 경우가 많다.
- **RNN** 은 시간 방향으로 같은 가중치를 공유하고, **CNN** 은 공간 방향으로 공유한다. "가중치 공유" 라는 아이디어는 같다.
