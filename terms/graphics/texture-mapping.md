---
id: texture-mapping
term: 텍스처 매핑 · UV
aliases:
  - Texture Mapping
  - UV Mapping
  - UV 좌표
  - 밉맵
category: graphics
tags:
  - 3D그래픽스
  - 렌더링
level: 2
kind: concept
related:
  - mesh-polygon
  - shader
  - rasterization
  - graphics-pipeline
  - lod-culling
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

메시 표면에 **2D 이미지**를 입히려고 정점마다 **UV 좌표**를 붙여 대응시키는 기법.

## 비유

선물 상자 포장이다. 펼친 포장지(텍스처)의 어느 지점이 상자 어느 모서리에 올지 미리 표시(UV)해 두고 그대로 감싼다.

## 예시

```glsl
#version 300 es
precision mediump float;
in vec2 vUV;              // 정점 셰이더가 넘긴 UV (래스터화 때 픽셀마다 보간됨)
uniform sampler2D uTex;   // 입힐 이미지
out vec4 fragColor;
void main() {
  fragColor = texture(uTex, vUV);
}
```

UV 는 이미지 크기와 상관없이 가로(U)·세로(V) 모두 0~1 범위로 적는다. 정점 세 개에만 UV 가 있고, 그 사이 픽셀의 UV 는 래스터화가 섞어서 채운다. 3D 툴에서 모델 겉면을 평면으로 펼치는 작업을 "UV 펼치기(언랩)" 라고 한다. 멀리 있는 면에 큰 이미지를 그대로 쓰면 지글거리므로 미리 줄여 둔 작은 이미지(**밉맵**)를 골라 쓴다.

## 헷갈리기 쉬운 것

- **UV vs XY**: XY(Z) 는 3D 공간 위치, UV 는 이미지 위 위치다. 글자를 다르게 쓰는 이유가 이 구분이다.
- **텍스처 vs 머티리얼**: 텍스처는 이미지 한 장, 머티리얼은 텍스처 여러 장(색·거칠기·노멀맵)과 셰이더 설정을 묶은 "재질" 이다.
