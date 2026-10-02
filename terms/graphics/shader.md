---
id: shader
term: 셰이더
aliases:
  - Shader
  - 쉐이더
  - GLSL
  - HLSL
  - 정점 셰이더/프래그먼트 셰이더
category: graphics
tags:
  - 3D그래픽스
  - GPU
level: 2
kind: concept
related:
  - graphics-pipeline
  - graphics-api
  - coordinate-transform
  - texture-mapping
  - gpu-cuda
see_also:
  - https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

GPU 위에서 **정점마다·픽셀마다** 한 번씩 실행되는 작은 프로그램.

## 비유

도장 찍기 공장의 작업 지시서 한 장이다. 지시서는 하나인데 일꾼 수천 명이 각자 맡은 점 하나, 픽셀 하나에 똑같이 적용한다.

## 예시

정점 셰이더(WebGL2, GLSL ES 3.0) — 정점 위치를 화면 좌표로 옮긴다.

```glsl
#version 300 es
in vec3 aPos;
uniform mat4 uMVP;
void main() {
  gl_Position = uMVP * vec4(aPos, 1.0);
}
```

프래그먼트 셰이더 — 각 픽셀의 색을 정한다.

```glsl
#version 300 es
precision mediump float;
out vec4 fragColor;
void main() {
  fragColor = vec4(1.0, 0.5, 0.2, 1.0);
}
```

`uniform` 은 모든 정점이 같이 쓰는 값(MVP 행렬 등), `in` 은 정점마다 다른 값이다. 셰이더 문자열은 실행 중에 GPU 드라이버가 컴파일하므로 오타는 `gl.getShaderInfoLog()` 로 확인한다. WebGL 에서는 `#version` 줄 앞에 빈 줄이 하나라도 있으면 컴파일 에러가 나는 게 흔한 실수다.

## 헷갈리기 쉬운 것

- **GLSL vs HLSL**: GLSL 은 OpenGL·WebGL·Vulkan 쪽, HLSL 은 DirectX 쪽 셰이더 언어다. 문법은 C 와 비슷하고 개념은 같다.
- **CUDA 커널**도 GPU 에서 병렬로 도는 함수지만 그리기와 무관한 범용 계산용이다. 그래픽스 API 안의 **컴퓨트 셰이더**가 그 중간쯤에 있다.
