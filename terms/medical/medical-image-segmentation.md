---
id: medical-image-segmentation
term: 의료 영상 세그멘테이션
aliases:
  - Medical Image Segmentation
  - 의료 영상 분할
  - 장기/병변 분할
  - 세그멘테이션
category: medical
tags:
  - 의료AI
  - 의료영상
  - 딥러닝
level: 2
related:
  - dicom
  - neural-network
  - gpu-cuda
  - training-inference
  - cdss
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

CT·MRI 의 **픽셀 하나하나에 장기·종양·배경 라벨을 붙여** 영역을 나누는 일.

## 비유

색칠공부 책에서 **간은 빨강, 종양은 노랑으로 선 안을 정확히 칠하는 것**. "이 그림에 간이 있다"(분류)가 아니라 "간이 정확히 여기까지"(경계)를 찍는다.

## 예시

```python
import torch, monai
model = monai.networks.nets.UNet(spatial_dims=3, in_channels=1, out_channels=3,
                                 channels=(16, 32, 64, 128), strides=(2, 2, 2))
x = torch.randn(1, 1, 96, 96, 96)   # (batch, channel, D, H, W) — CT 볼륨 패치
y = model(x)                         # (1, 3, 96, 96, 96): 배경/간/종양 확률 맵
```

전형적 연구실 파이프라인: PACS 에서 DICOM 반출 → 가명화 → NIfTI 변환 → 의사가 그린 정답 마스크(라벨링) → 폐쇄망 GPU 서버에서 U-Net/nnU-Net 학습 → Dice 계수로 평가. 3D 볼륨이라 VRAM 을 많이 먹어서 패치 단위로 자르고, 라벨링 비용 때문에 데이터가 수백 케이스 수준인 게 보통이라 과적합을 늘 의심해야 한다.

## 헷갈리기 쉬운 것

- **분류(classification)** 는 영상 한 장에 라벨 하나("기흉 있음"), **검출(detection)** 은 박스, **세그멘테이션** 은 픽셀 단위 마스크. 병변 부피 측정·수술 계획은 세그멘테이션이 필요하다.
- **시맨틱 / 인스턴스**: 시맨틱은 "종양 픽셀" 만 구분, 인스턴스는 종양 1번·2번을 따로 센다. 의료 영상은 대부분 시맨틱.
