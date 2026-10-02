---
id: coordinate-transform
term: 좌표 변환(MVP 행렬)
aliases:
  - Coordinate Transformation
  - MVP Matrix
  - Model-View-Projection
  - 모델 뷰 투영 행렬
  - 원근 투영
category: graphics
tags:
  - 3D그래픽스
  - 선형대수
level: 3
kind: concept
related:
  - matrix
  - linear-transformation
  - vector
  - shader
  - graphics-pipeline
see_also:
  - https://learnopengl.com/Getting-started/Coordinate-Systems
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

정점을 **모델→월드→카메라→화면** 좌표로 차례로 옮기는 행렬 곱의 연쇄.

## 비유

같은 점의 주소를 기준만 바꿔 다시 적는 일이다. "책상 위 왼쪽" → "3층 연구실 창가" → "내 눈에서 오른쪽 앞" → "사진 속 (120, 80)" 처럼.

## 예시

```js
import { mat4 } from "gl-matrix";

const model = mat4.create();
mat4.rotateY(model, model, Math.PI / 4);              // M: 물체를 45도 회전

const view = mat4.create();
mat4.lookAt(view, [0, 2, 5], [0, 0, 0], [0, 1, 0]);   // V: 카메라 위치·바라볼 점·위쪽

const proj = mat4.create();
mat4.perspective(proj, Math.PI / 3, 16 / 9, 0.1, 100); // P: 시야각 60도, 원근

const mvp = mat4.create();
mat4.multiply(mvp, proj, view);
mat4.multiply(mvp, mvp, model);                       // MVP = P × V × M
```

이렇게 만든 `mvp` 를 셰이더의 `uniform mat4` 로 넘기면 `gl_Position = uMVP * vec4(pos, 1.0)` 한 줄로 변환이 끝난다. 이동까지 곱셈 하나로 처리하려고 3D 점을 (x, y, z, **1**) 4차원 **동차 좌표**로 쓰고 4×4 행렬을 쓴다. 원근 투영 뒤에는 GPU 가 w 로 나눠 멀리 있는 것을 작게 만든다. 행렬 곱은 순서를 바꾸면 결과가 달라서 "회전 후 이동" 과 "이동 후 회전" 은 다른 위치가 된다. 트레이드오프: CPU 에서 MVP 를 미리 하나로 곱해 보내면 셰이더 연산이 줄지만, 조명 계산처럼 월드 좌표가 따로 필요하면 M·V·P 를 나눠 보내야 한다.

## 헷갈리기 쉬운 것

- **P×V×M vs M×V×P**: OpenGL·gl-matrix 는 열 벡터 기준이라 오른쪽(M)부터 적용된다. DirectX 예제는 행 벡터 기준이라 곱셈 순서가 반대로 적혀 있어 섞어 보면 헷갈린다.
- **원근 투영 vs 직교 투영**: 원근은 멀수록 작게(게임·3D 뷰어), 직교는 거리와 무관하게 같은 크기(CAD·2D 게임·의료 영상 MPR 뷰).
