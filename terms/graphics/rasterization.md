---
id: rasterization
term: 래스터화
aliases:
  - Rasterization
  - 래스터라이제이션
  - 스캔 변환
category: graphics
tags:
  - 3D그래픽스
  - 렌더링
level: 2
kind: concept
related:
  - graphics-pipeline
  - ray-tracing
  - mesh-polygon
  - shader
  - texture-mapping
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

화면에 투영된 **삼각형**이 덮는 **픽셀**을 골라내는 단계.

## 비유

모눈종이 위에 삼각형을 그려 놓고, 선 안쪽에 들어간 칸만 "여기 색칠" 하고 체크하는 일이다.

## 예시

```python
def edge(ax, ay, bx, by, px, py):
    return (bx - ax) * (py - ay) - (by - ay) * (px - ax)

def covered(tri, px, py):
    (ax, ay), (bx, by), (cx, cy) = tri
    w0 = edge(bx, by, cx, cy, px, py)
    w1 = edge(cx, cy, ax, ay, px, py)
    w2 = edge(ax, ay, bx, by, px, py)
    return (w0 >= 0 and w1 >= 0 and w2 >= 0) or (w0 <= 0 and w1 <= 0 and w2 <= 0)

tri = [(1, 1), (8, 2), (3, 7)]
for y in range(9):
    print("".join("#" if covered(tri, x + 0.5, y + 0.5) else "." for x in range(10)))
```

각 픽셀 **중심점**이 삼각형의 세 변 모두 같은 쪽에 있으면 그 픽셀을 칠한다(엣지 함수 판정). 실행하면 터미널에 `#` 으로 삼각형이 찍힌다. 이때 구한 w0~w2 비율로 정점의 색·UV 를 픽셀마다 섞어(보간) 프래그먼트 셰이더에 넘긴다. 칸 단위로 자르다 보니 경계가 계단처럼 보이는데, 이를 줄이는 게 MSAA 같은 안티에일리어싱이다.

## 헷갈리기 쉬운 것

- **레이 트레이싱**은 반대 방향이다. 래스터화는 "삼각형 → 어느 픽셀?", 레이 트레이싱은 "픽셀 → 어느 물체?" 를 묻는다. 래스터화가 훨씬 빨라 실시간 게임의 기본이다.
- **래스터 이미지 vs 벡터 이미지**: PNG 는 이미 픽셀(래스터)이고 SVG 는 도형(벡터)이라, SVG 를 화면에 띄울 때도 결국 래스터화가 일어난다.
