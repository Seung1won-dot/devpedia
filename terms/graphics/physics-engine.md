---
id: physics-engine
term: 물리 엔진
aliases:
  - Physics Engine
  - Rigidbody
  - 강체 시뮬레이션
  - PhysX
  - Box2D
category: graphics
tags:
  - 물리
  - 게임개발
level: 2
kind: tool
related:
  - collision-detection
  - delta-time
  - game-engine
  - game-loop
  - learning-paradigms
see_also:
  - https://box2d.org/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

중력·충돌·마찰 같은 **물리 법칙을 근사 계산**해 물체의 움직임을 만들어 주는 라이브러리.

## 비유

장난감 세계의 자연법칙 담당이다. 공을 허공에 놓기만 하면 알아서 떨어지고 튀고 굴러가게 해 준다.

## 예시

Unity 에서 스페이스바로 점프시키는 스크립트다(물체에 Rigidbody 컴포넌트가 붙어 있어야 한다).

```csharp
using UnityEngine;

public class Jump : MonoBehaviour {
    Rigidbody rb;

    void Start() {
        rb = GetComponent<Rigidbody>();
    }

    void Update() {
        if (Input.GetKeyDown(KeyCode.Space))
            rb.AddForce(Vector3.up * 5f, ForceMode.Impulse);
    }
}
```

위치를 직접 바꾸지 않고 **힘**만 주면, 엔진이 고정 간격(Unity 의 `FixedUpdate`)마다 속도·위치를 적분하고 충돌을 판정해 튕겨 낸다. 대표적으로 PhysX(Unity 3D 기본), Box2D(2D), Bullet, Jolt 가 있고, Unreal 5 는 자체 Chaos 를 쓴다 [확인 필요]. MuJoCo 같은 엔진은 로봇 제어·강화학습 환경으로도 많이 쓰인다. 게임 물리는 정확도보다 "안 터지고 그럴듯한 것" 을 우선하므로, 쌓아 둔 상자가 미세하게 떨리거나 빠른 물체가 벽을 뚫는 일이 생긴다.

## 헷갈리기 쉬운 것

- **물리 엔진 vs 충돌 판정**: 충돌 판정은 물리 엔진의 한 부품이다. 겹침만 알면 되는 게임(퍼즐·슈팅 판정)은 물리 엔진 없이 판정만 직접 짜기도 한다.
- **게임 물리 vs 과학 시뮬레이션**: 게임은 1/50초 안에 끝나는 근사, 유체·구조 해석 같은 공학 시뮬레이션은 정확도를 위해 몇 시간씩 계산한다.
