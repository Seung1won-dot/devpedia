---
id: delta-time
term: 델타 타임
aliases:
  - Delta Time
  - dt
  - Time.deltaTime
  - 고정 타임스텝
category: graphics
tags:
  - 게임개발
  - 물리
level: 2
kind: concept
related:
  - game-loop
  - frame-rate
  - physics-engine
  - game-engine
  - collision-detection
see_also:
  - https://docs.unity3d.com/ScriptReference/Time-deltaTime.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

직전 프레임 이후 **흐른 시간**으로, 이동량에 곱해 속도를 FPS 와 무관하게 만드는 값.

## 비유

걸음 수가 아니라 걸은 시간으로 거리를 재는 것이다. 종종걸음이든 성큼성큼이든 "초속 1m × 걸은 시간" 이면 같은 곳에 도착한다.

## 예시

```python
import time

speed = 5.0                  # 초당 5 유닛
x = 0.0
last = time.perf_counter()

while x < 10:
    now = time.perf_counter()
    dt = now - last
    last = now
    x += speed * dt          # 프레임마다 +1 이 아니라 speed × dt
    time.sleep(0.016)        # 렌더링 대신 약 16ms 대기

print(f"{x:.2f}")            # 약 2초 뒤 10 을 조금 넘긴 값
```

Unity 에서는 같은 일을 한 줄로 한다.

```csharp
void Update() {
    transform.Translate(Vector3.forward * speed * Time.deltaTime);
}
```

dt 없이 `x += 1` 로 쓰면 144Hz 모니터에서는 60Hz 보다 2.4배 빨리 움직인다. 창을 드래그하는 동안 멈췄다가 dt 가 갑자기 1초쯤 들어오면 캐릭터가 벽을 뚫고 순간이동하므로, dt 에 상한(예: 0.1초)을 거는 경우가 많다.

## 헷갈리기 쉬운 것

- **가변 dt vs 고정 타임스텝**: 화면 움직임은 프레임마다 달라지는 dt 로, 물리 계산은 결과가 흔들리지 않게 0.02초 같은 고정 간격으로 돌린다. Unity 의 `Update()` / `FixedUpdate()` 가 이 구분이다.
- **델타 타임 vs 지연시간(latency)**: 델타 타임은 프레임 사이 간격, 지연시간은 입력부터 화면에 반영될 때까지 걸린 시간이다.
