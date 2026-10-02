---
id: ecs
term: ECS(엔티티-컴포넌트-시스템)
aliases:
  - Entity Component System
  - 엔티티 컴포넌트 시스템
  - Unity DOTS
  - 데이터 지향 설계
category: graphics
tags:
  - 게임개발
  - 아키텍처패턴
  - 디자인패턴
level: 3
kind: pattern
related:
  - inheritance-polymorphism
  - oop
  - locality
  - cache-memory
  - game-engine
  - game-loop
see_also:
  - https://github.com/SanderMertens/ecs-faq
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

게임 객체를 **ID(엔티티)·데이터(컴포넌트)·로직(시스템)**으로 나눠 조합하는 설계.

## 비유

레고 블록 상자다. "날아다니는 몬스터 클래스" 를 깎아 만드는 대신, 번호표 하나에 "위치" "체력" "날개" 블록을 끼웠다 뺐다 한다.

## 예시

```python
positions  = {1: [0.0, 0.0], 2: [5.0, 0.0]}   # 컴포넌트: 엔티티 id → 데이터
velocities = {1: [1.0, 0.0]}                    # 2번(벽)은 속도 컴포넌트가 없음

def movement_system(dt):
    for eid, vel in velocities.items():         # 위치·속도를 둘 다 가진 엔티티만 처리
        pos = positions[eid]
        pos[0] += vel[0] * dt
        pos[1] += vel[1] * dt

movement_system(0.5)
print(positions)   # {1: [0.5, 0.0], 2: [5.0, 0.0]}
```

엔티티는 번호일 뿐이고, 컴포넌트는 순수 데이터, 시스템은 "이 컴포넌트 조합을 가진 것 전부" 를 한꺼번에 처리하는 함수다. 날개를 떼고 싶으면 상속 구조를 바꾸지 않고 컴포넌트 하나만 지운다. 실제 엔진(Unity DOTS, Rust 의 Bevy)은 같은 컴포넌트를 메모리에 연속 배열로 붙여 두어 캐시 적중률을 높이고, 유닛 수만 개를 한 프레임에 돌린다. 트레이드오프: 객체 수가 적고 객체마다 로직이 제각각인 게임에서는 데이터와 로직이 흩어져 오히려 읽기 어렵고 디버깅도 번거로우니, 일반 컴포넌트 방식이 낫다.

## 헷갈리기 쉬운 것

- **상속 기반 OOP**: `Monster → FlyingMonster → FireFlyingMonster` 처럼 깊어지다 "날 수 있는 상자" 같은 조합에서 막힌다. ECS 는 "상속 대신 조합" 을 극단까지 밀어붙인 형태다.
- Unity 의 **GameObject + MonoBehaviour** 도 컴포넌트를 붙이는 방식이지만, 컴포넌트 안에 데이터와 로직이 같이 들어 있어 엄밀한 ECS 는 아니다.
