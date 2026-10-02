---
id: lod-culling
term: LOD · 컬링
aliases:
  - Level of Detail
  - Culling
  - 프러스텀 컬링
  - 오클루전 컬링
  - 백페이스 컬링
category: graphics
tags:
  - 3D그래픽스
  - 성능최적화
level: 3
kind: concept
related:
  - mesh-polygon
  - frame-rate
  - graphics-pipeline
  - texture-mapping
  - lazy-loading
  - rasterization
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

먼 것은 **거칠게(LOD)**, 안 보이는 것은 **아예 안 그려(컬링)** 렌더 비용을 줄이는 기법.

## 비유

연극 무대에서 객석 맨 뒤에서만 보일 소품은 대충 만들고, 커튼 뒤에 가려질 곳은 아예 꾸미지 않는 것이다.

## 예시

```js
// LOD: 카메라와의 거리에 따라 같은 바위의 다른 버전을 고른다
function pickLod(distance) {
  if (distance < 10) return "rock_high";  // 삼각형 5,000개
  if (distance < 40) return "rock_mid";   // 800개
  return "rock_low";                      // 100개
}

// 백페이스 컬링: 카메라를 등진 삼각형은 래스터화 전에 버린다 (WebGL)
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
```

컬링은 세 가지가 대표적이다. 카메라 시야(절두체) 밖 물체를 빼는 **프러스텀 컬링**, 다른 물체 뒤에 가려진 걸 빼는 **오클루전 컬링**, 물체의 뒷면 삼각형을 빼는 **백페이스 컬링**. 트레이드오프: LOD 는 모델을 여러 벌 만들어야 해 메모리와 제작 비용이 늘고, 버전이 바뀌는 순간 툭 튀는 현상(popping)이 보일 수 있다. 오클루전 컬링은 "가려졌나?" 판정 자체에 비용이 들어, 가리는 물체가 별로 없는 탁 트인 평지에서는 오히려 손해일 수 있다.

## 헷갈리기 쉬운 것

- **LOD vs 밉맵**: LOD 는 메시(형태)를 거리별로 바꾸고, 밉맵은 텍스처(이미지)를 거리별로 바꾼다. 발상은 같다.
- **컬링 vs 클리핑**: 컬링은 물체·삼각형을 통째로 버리고, 클리핑은 화면 경계에 걸친 삼각형을 경계선에 맞춰 잘라 낸다.
- 웹의 **레이지 로딩**도 "안 보이는 건 나중에" 라는 같은 발상이지만, 그려지는 비용이 아니라 내려받는 비용을 줄인다.
