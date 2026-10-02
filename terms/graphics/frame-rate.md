---
id: frame-rate
term: 프레임 레이트(FPS)
aliases:
  - Frame Rate
  - FPS
  - Frames Per Second
  - 프레임 타임
  - 주사율
category: graphics
tags:
  - 게임개발
  - 성능
  - 렌더링
level: 1
kind: metric
related:
  - game-loop
  - delta-time
  - core-web-vitals
  - profiling
  - lod-culling
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

화면이 **1초에 몇 번 새로 그려지는지** 나타내는 수치.

## 비유

플립북을 넘기는 속도다. 1초에 넘기는 장 수가 많을수록 움직임이 부드럽고, 중간에 한 번 멈칫하면 바로 티가 난다.

## 예시

```js
let frames = 0;
let start = performance.now();

function tick(now) {
  frames++;
  if (now - start >= 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    start = now;
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
```

60 FPS 를 지키려면 한 프레임의 입력·업데이트·렌더를 1000 ÷ 60 ≈ **16.6ms** 안에 끝내야 한다. 144Hz 모니터라면 약 6.9ms 로 예산이 더 빡빡하다. 체감에는 평균 FPS 보다 **프레임 타임**이 들쭉날쭉한지(스터터)가 더 중요해서, 게임 벤치마크는 하위 1% 프레임(1% low)도 함께 본다. 느리면 프로파일러로 어느 단계가 예산을 먹는지부터 찾는다.

## 헷갈리기 쉬운 것

- **FPS vs 주사율(Hz)**: FPS 는 프로그램이 그려 내는 속도, 주사율은 모니터가 화면을 바꾸는 속도다. 240 FPS 를 뽑아도 60Hz 모니터에선 60장만 보인다.
- **Core Web Vitals** 는 웹 페이지의 로딩·반응·레이아웃 흔들림을 재는 지표이고, FPS 는 애니메이션·게임의 부드러움을 잰다. 웹 스크롤이 버벅이는 문제는 오히려 FPS 쪽 문제다.
