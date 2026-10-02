---
id: game-engine
term: 게임 엔진(Unity/Unreal/Godot)
aliases:
  - Game Engine
  - Unity
  - Unreal Engine
  - Godot
  - 유니티
  - 언리얼
category: graphics
tags:
  - 게임개발
  - 개발도구
level: 1
kind: tool
related:
  - game-loop
  - graphics-api
  - physics-engine
  - ecs
  - web-framework
see_also:
  - https://docs.unity3d.com/Manual/index.html
  - https://godotengine.org/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

렌더링·물리·입력·사운드·에디터를 묶어 게임을 만들게 해 주는 **개발 도구 세트**.

## 비유

무대·조명·음향이 다 갖춰진 공연장 대관이다. 배우와 대본(게임 로직과 그림·소리)만 가져오면 공연을 올릴 수 있다.

## 예시

Unity 에서 방향키로 캐릭터를 좌우로 움직이는 스크립트 전체다.

```csharp
using UnityEngine;

public class Player : MonoBehaviour {
    public float speed = 5f;

    void Update() {
        float h = Input.GetAxis("Horizontal");   // ←/→ 또는 A/D: -1 ~ 1
        transform.Translate(Vector3.right * h * speed * Time.deltaTime);
    }
}
```

게임 루프, 그래픽스 API 호출, 충돌 처리는 엔진이 하고 개발자는 `Update()` 같은 빈칸만 채운다. 대표 엔진은 **Unity**(C#, 모바일·인디·VR 에 많음), **Unreal**(C++·블루프린트, 고품질 3D), **Godot**(MIT 오픈소스, GDScript)다. 게임 말고도 수술 시뮬레이션·재활 훈련 VR·디지털 트윈 같은 의료 연구에서 쓰인다. 상용 엔진의 라이선스와 수익 분배 조건은 자주 바뀌니 시작 전에 최신 약관을 확인한다 [확인 필요].

## 헷갈리기 쉬운 것

- **게임 엔진 vs 그래픽스 API**: OpenGL·Vulkan 은 "삼각형을 그려라" 수준의 명령이고, 엔진은 그 위에 씬 편집기·물리·애셋 관리까지 얹은 완제품이다.
- **게임 엔진 vs 라이브러리**: three.js(웹 3D 렌더링)나 pygame 은 필요한 부분만 가져다 쓰는 라이브러리라, 루프와 구조는 내가 짠다. 웹 프레임워크와 라이브러리의 차이와 같은 관계다.
