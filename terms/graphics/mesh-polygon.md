---
id: mesh-polygon
term: 메시 · 폴리곤
aliases:
  - Mesh
  - Polygon
  - 폴리곤 메시
  - 정점(Vertex)
  - 폴리 카운트
category: graphics
tags:
  - 3D그래픽스
level: 1
kind: concept
related:
  - rasterization
  - texture-mapping
  - graphics-pipeline
  - lod-culling
  - medical-image-segmentation
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

3D 물체의 겉면을 **삼각형 같은 다각형 조각**을 이어 붙여 표현한 데이터.

## 비유

종이 공예와 같다. 납작한 삼각형 종이를 많이 이어 붙이면 둥근 공처럼 보이고, 조각이 많을수록 더 매끈해진다.

## 예시

```text
# 정사각형 한 면 = 삼각형 2개 (Wavefront OBJ 형식)
v 0 0 0
v 1 0 0
v 1 1 0
v 0 1 0
f 1 2 3
f 1 3 4
```

`v` 는 **정점**(꼭짓점) 좌표, `f` 는 몇 번 정점을 이어 **면**(폴리곤)을 만들지 적은 줄이다(번호는 1부터). 이 텍스트를 `square.obj` 로 저장하면 Blender 에서 바로 열린다. GPU 는 삼각형만 다루는데, 세 점은 항상 한 평면 위에 있어 계산이 단순하기 때문이다. 연구실에서는 CT 세그멘테이션 결과를 STL 메시로 바꿔 3D 프린팅하거나 웹 뷰어에 띄우는 일이 있다.

## 헷갈리기 쉬운 것

- **정점·폴리곤·메시**: 정점은 점, 폴리곤은 점 3~4개로 만든 면 하나, 메시는 면들을 모은 물체 하나다.
- **복셀**(CT 같은 3D 격자)은 속까지 채운 작은 정육면체들이고, 메시는 속이 빈 겉껍질이다. 의료 영상은 복셀로 찍히고, 보여 줄 때 메시로 바꾸는 경우가 많다.
