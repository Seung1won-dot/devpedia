---
id: linear-transformation
term: 선형 변환
aliases:
  - Linear Transformation
  - Linear Map
  - 선형 사상
  - 선형 변환
category: math
tags:
  - 선형대수
  - 3D그래픽스
  - 딥러닝
level: 2
kind: concept
related:
  - matrix
  - vector
  - eigenvalue
  - coordinate-transform
  - neural-network
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

원점은 그대로, 직선은 직선으로 보내는 **공간 변형**으로, 행렬 하나로 표현된다.

## 비유

모눈종이를 **늘리고 돌리고 비스듬히 미는** 것. 모눈 칸이 찌그러질 수는 있어도 격자 선은 여전히 곧고 평행하게 남는다.

## 예시

```python
import numpy as np

R = np.array([[0, -1],
              [1,  0]])      # 반시계 90도 회전
S = np.array([[2, 0],
              [0, 1]])       # x 방향으로 2배 늘리기

p = np.array([1, 0])
print(R @ p)                 # [0 1]
print(S @ R @ p)             # [0 1] 회전 후 늘리기 = 행렬 곱 한 번으로 합성
```

변환 여러 개를 이어 붙이는 것이 행렬 곱으로 하나가 된다는 게 핵심이다. 3D 그래픽스에서 모델→월드→카메라→화면 좌표 변환을 행렬 하나로 미리 곱해 두는 것도, 신경망 한 층의 `W @ x` 도 모두 선형 변환이다.

## 헷갈리기 쉬운 것

- **평행 이동은 선형 변환이 아니다**: 원점이 움직이기 때문. 그래픽스는 좌표에 1을 하나 더 붙인 **동차 좌표**(4×4 행렬)로 이동까지 행렬 곱에 넣는다(아핀 변환).
- **활성화 함수가 필요한 이유**: 선형 변환을 몇 번 겹쳐도 결국 선형 변환 하나와 같다. ReLU 같은 비선형 함수를 사이에 넣어야 층을 쌓는 의미가 생긴다.
- 통계의 **선형 회귀**의 "선형"은 파라미터에 대해 선형이라는 뜻으로, 이 카드의 공간 변환과는 관점이 다르다.
