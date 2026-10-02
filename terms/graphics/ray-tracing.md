---
id: ray-tracing
term: 레이 트레이싱
aliases:
  - Ray Tracing
  - 광선 추적
  - RTX
  - 패스 트레이싱
category: graphics
tags:
  - 3D그래픽스
  - GPU
  - 렌더링
level: 3
kind: concept
related:
  - rasterization
  - graphics-pipeline
  - gpu-cuda
  - shader
  - vector
see_also:
  - https://raytracing.github.io/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

픽셀마다 **광선**을 쏘아 부딪힌 물체와 빛을 거꾸로 따라가 색을 정하는 렌더링 방식.

## 비유

눈에서 실을 한 가닥씩 뻗어, 실이 닿은 물체와 거기서 튕겨 나간 실이 닿는 조명까지 따라가 보는 것이다.

## 예시

광선과 구의 교차 판정 — 레이 트레이서의 가장 작은 부품이다.

```python
import math

def hit_sphere(center, radius, origin, direction):
    oc = [o - c for o, c in zip(origin, center)]
    a = sum(d * d for d in direction)
    b = 2 * sum(o * d for o, d in zip(oc, direction))
    c = sum(o * o for o in oc) - radius * radius
    disc = b * b - 4 * a * c
    if disc < 0:
        return None                      # 안 맞음
    return (-b - math.sqrt(disc)) / (2 * a)

print(hit_sphere((0, 0, -3), 1, (0, 0, 0), (0, 0, -1)))  # 2.0 (2만큼 가서 맞음)
```

맞은 지점에서 다시 조명 쪽으로 그림자 광선, 반사 방향으로 반사 광선을 쏘는 식으로 재귀하면 반사·굴절·부드러운 그림자가 물리적으로 자연스럽게 나온다. 대신 픽셀당 광선 수십~수백 개가 필요해 계산량이 크다. 그래서 실시간 게임은 화면 대부분을 래스터화로 그리고 반사·그림자 같은 일부 효과만 RT 코어(RTX 등)로 쏜 뒤 노이즈 제거와 업스케일링으로 보완하는 하이브리드를 쓴다. 영화·건축 시각화처럼 시간이 넉넉하면 전부 광선으로 계산한다.

## 헷갈리기 쉬운 것

- **래스터화**: 삼각형에서 출발해 픽셀을 찾는다(빠름, 근사). 레이 트레이싱은 픽셀에서 출발해 물체를 찾는다(느림, 사실적).
- **패스 트레이싱**은 레이 트레이싱의 한 종류로, 광선을 무작위로 많이 튕겨 간접광까지 계산한다. 정확하지만 노이즈가 줄어들 때까지 샘플이 많이 든다.
