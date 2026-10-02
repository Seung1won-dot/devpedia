---
id: collision-detection
term: 충돌 판정
aliases:
  - Collision Detection
  - 충돌 감지
  - AABB
  - 히트박스
  - 공간 분할
category: graphics
tags:
  - 게임개발
  - 물리
level: 2
kind: concept
related:
  - physics-engine
  - delta-time
  - game-loop
  - tree
  - big-o
see_also:
  - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

두 물체가 **겹치거나 부딪혔는지** 매 프레임 계산으로 판정하는 일.

## 비유

술래잡기의 "닿았다!" 판정이다. 몸 모양 그대로 비교하기는 번거로우니 각자 투명한 상자를 둘렀다 치고 상자끼리 겹쳤는지만 본다.

## 예시

```js
// AABB: 축에 나란한 사각형끼리 겹치는지
function aabb(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}

const player = { x: 10, y: 10, w: 20, h: 20 };
const enemy  = { x: 25, y: 15, w: 20, h: 20 };
console.log(aabb(player, enemy)); // true
```

**AABB**(Axis-Aligned Bounding Box)는 가로·세로 구간이 둘 다 겹치면 충돌로 본다. 물체가 n개면 모든 쌍을 비교하는 데 O(n²) 이 들어서, 먼저 격자·쿼드트리·BVH 같은 **공간 분할**로 가까운 후보만 추리고(broad phase), 그 후보끼리만 정밀한 모양으로 다시 비교한다(narrow phase). 아주 빠른 총알은 한 프레임 사이에 벽을 건너뛰어 버리는데(터널링), 이동 경로 전체를 검사하는 연속 충돌 판정으로 막는다.

## 헷갈리기 쉬운 것

- **충돌 판정 vs 충돌 반응**: 판정은 "겹쳤나?" 까지, 튕겨 나가고 밀려나는 계산은 반응이며 물리 엔진이 맡는다.
- **해시 충돌**은 서로 다른 키가 같은 해시값을 갖는 것으로, 이름만 같고 전혀 다른 개념이다.
