---
id: graphics-api
term: 그래픽스 API(OpenGL/Vulkan/WebGL)
aliases:
  - Graphics API
  - OpenGL
  - Vulkan
  - WebGL
  - DirectX
  - Metal
  - WebGPU
category: graphics
tags:
  - 3D그래픽스
  - GPU
level: 2
kind: tool
related:
  - gpu-cuda
  - shader
  - graphics-pipeline
  - game-engine
  - browser-rendering
see_also:
  - https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
  - https://www.vulkan.org/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

프로그램이 GPU 에 **그리기 명령**을 내릴 때 쓰는 표준 인터페이스.

## 비유

GPU 라는 주방에 넣는 주문서 양식이다. 양식이 간단하면(OpenGL) 쓰기 쉽고, 칸이 세세하면(Vulkan) 귀찮지만 원하는 대로 정확히 시킬 수 있다.

## 예시

브라우저 개발자 도구 콘솔에서 바로 돌려 볼 수 있는 WebGL2 최소 코드다.

```js
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl2");
gl.clearColor(0.2, 0.4, 0.8, 1.0);   // 지울 색: 파랑
gl.clear(gl.COLOR_BUFFER_BIT);       // GPU 에 "화면을 그 색으로 지워라" 명령
```

실제로 삼각형 하나를 그리려면 정점 버퍼 업로드 → 셰이더 컴파일·링크 → `gl.drawArrays()` 까지 수십 줄이 필요하다. 종류는 크게 **OpenGL**(오래된 크로스 플랫폼), **Vulkan**(저수준·명시적, 크로스 플랫폼), **DirectX 12**(Windows·Xbox), **Metal**(Apple), 브라우저용 **WebGL / WebGPU** 로 나뉜다. Apple 은 macOS 에서 OpenGL 을 지원 중단(deprecated) 상태로 두고 Metal 을 권한다.

## 헷갈리기 쉬운 것

- **CUDA** 는 NVIDIA GPU 로 행렬 계산 같은 범용 연산을 하는 플랫폼이고, 그래픽스 API 는 화면에 그리는 게 본업이다. 그래픽스 API 의 컴퓨트 셰이더로도 계산은 할 수 있다.
- **게임 엔진**(Unity·Unreal)은 이 API 들 위에 올라가 플랫폼별 차이를 숨겨 준다. 엔진을 쓰면 API 를 직접 부를 일이 거의 없다.
