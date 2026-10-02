---
id: graphics-pipeline
term: 그래픽스 파이프라인
aliases:
  - Graphics Pipeline
  - Rendering Pipeline
  - 렌더링 파이프라인(GPU)
  - 3D 파이프라인
category: graphics
tags:
  - 3D그래픽스
  - GPU
  - 렌더링
level: 2
kind: concept
related:
  - shader
  - rasterization
  - coordinate-transform
  - graphics-api
  - browser-rendering
  - gpu-cuda
see_also:
  - https://www.khronos.org/opengl/wiki/Rendering_Pipeline_Overview
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

GPU 가 3D **정점 데이터**를 화면의 **픽셀 색**으로 바꾸는 단계별 처리 흐름.

## 비유

공장 조립 라인과 같다. 뼈대(정점) 위치를 잡는 공정, 뼈대가 덮는 칸을 고르는 공정, 칸마다 색을 칠하는 공정이 컨베이어를 따라 차례로 이어진다.

## 예시

```text
정점 데이터 → [정점 셰이더] → 삼각형 조립 → 클리핑 → [래스터화] → [프래그먼트 셰이더] → 깊이 테스트·블렌딩 → 프레임버퍼(화면)
```

이 중 **정점 셰이더**와 **프래그먼트 셰이더**는 개발자가 직접 코드를 짜서 끼우고, 삼각형 조립·래스터화·깊이 테스트는 GPU 하드웨어가 정해진 방식으로 처리한다. 한 프레임에 삼각형 수십만 개와 픽셀 수백만 개가 이 라인을 동시에 흐르기 때문에, 코어 수천 개를 가진 GPU 가 이 일에 맞는다. 정점 단계에서는 MVP 행렬로 좌표를 옮기고, 픽셀 단계에서는 텍스처와 조명으로 색을 정한다.

## 헷갈리기 쉬운 것

- **브라우저 렌더링 과정**은 HTML·CSS 를 DOM → 레이아웃 → 페인트 → 합성으로 그리는 "문서 배치" 절차다. 그래픽스 파이프라인은 삼각형을 픽셀로 바꾸는 "GPU 내부" 절차로, 브라우저도 마지막 합성이나 WebGL 캔버스에서 이걸 쓴다.
- **레이 트레이싱**은 픽셀에서 광선을 쏘는 방식이라 이 래스터화 파이프라인과 출발점이 반대다. 요즘 GPU 는 둘을 섞어 쓴다.
