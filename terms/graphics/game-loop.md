---
id: game-loop
term: 게임 루프
aliases:
  - Game Loop
  - 메인 루프
  - requestAnimationFrame
category: graphics
tags:
  - 게임개발
level: 1
kind: pattern
related:
  - delta-time
  - frame-rate
  - game-engine
  - event-loop
  - physics-engine
see_also:
  - https://gameprogrammingpatterns.com/game-loop.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**입력 처리 → 상태 업데이트 → 화면 그리기**를 게임이 끝날 때까지 반복하는 구조.

## 비유

플립북 애니메이션 만들기다. 한 장마다 "무슨 일이 있었나 보고, 그림을 조금 옮기고, 새 장에 그린다" 를 계속 되풀이한다.

## 예시

```js
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let last = performance.now();
let x = 0;

function frame(now) {
  const dt = (now - last) / 1000;  // 지난 프레임 이후 흐른 초
  last = now;

  // 1) 입력 (여기선 생략)  2) 업데이트
  x = (x + 100 * dt) % canvas.width;  // 초당 100px 이동

  // 3) 렌더
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, 50, 20, 20);

  requestAnimationFrame(frame);    // 다음 화면 갱신 때 다시 호출
}
requestAnimationFrame(frame);
```

브라우저 콘솔에 붙여 넣으면 네모가 오른쪽으로 계속 흘러간다. 브라우저에서 `while (true)` 로 루프를 돌리면 화면이 멈추므로, 모니터 갱신 주기에 맞춰 불러 주는 `requestAnimationFrame` 에 한 바퀴씩 맡긴다. Unity 같은 엔진은 이 루프를 엔진이 돌리고 개발자는 `Update()` 안만 채운다.

## 헷갈리기 쉬운 것

- **이벤트 루프**는 JS 런타임이 작업 큐를 꺼내 처리하는 구조이고, 게임 루프는 그 위에서 매 프레임 상태를 갱신하는 앱 수준의 반복이다. 브라우저 게임 루프는 이벤트 루프 위에 얹혀 돈다.
- **가변 타임스텝 vs 고정 타임스텝**: 위 코드처럼 프레임마다 흐른 시간만큼 움직이는 게 가변, 물리는 0.02초 같은 고정 간격으로 따로 돌리는 게 보통이다(델타 타임 카드 참고).
