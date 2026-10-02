---
id: debugger
term: 디버거/브레이크포인트
aliases:
  - Debugger
  - Breakpoint
  - 디버거
  - 중단점
  - 브레이크포인트
  - 단계 실행
category: devops
tags:
  - 개발도구
  - 품질
level: 1
kind: tool
related:
  - exception
  - logging
  - stack-heap-memory
  - curl-postman
  - testing-levels
  - ai-coding-assistant
  - debugging
see_also:
  - https://code.visualstudio.com/docs/debugtest/debugging
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

프로그램을 **원하는 줄에서 멈춰 세우고** 변수 값과 호출 경로를 들여다보는 도구.

## 비유

영상의 **일시정지와 한 프레임씩 넘기기**. 빠르게 지나가는 장면을 멈춰 세우고, 그 순간 화면 구석에 뭐가 있는지 살펴본다.

## 예시

```jsonc
// .vscode/launch.json — Devpedia 빌드 스크립트를 디버거로 실행 (F5)
{
  "configurations": [{
    "name": "build-terms",
    "type": "node",
    "request": "launch",
    "runtimeExecutable": "npx",
    "runtimeArgs": ["tsx", "scripts/build-terms.ts"]
  }]
}
```

`scripts/build-terms.ts` 에서 의심 가는 줄 번호 왼쪽을 클릭해 빨간 점(브레이크포인트)을 찍고 F5 를 누르면 그 줄에서 멈춘다. 멈춘 자리에서 **Step Over(F10)** 는 다음 줄로, **Step Into(F11)** 는 호출된 함수 안으로 들어가고, Variables 패널에서 지금 값들을, Call Stack 에서 "여기까지 누가 불렀는지" 를 본다. 조건부 브레이크포인트(`id === 'deadlock'`)를 걸면 카드 수백 장 반복 중 문제 있는 한 장에서만 멈춘다. IntelliJ·PyCharm 도 같은 개념이고 단축키만 다르며, 면접에서 "디버깅은 어떻게 하나요?" 에 print 만 답하면 약하다.

## 헷갈리기 쉬운 것

- **print 디버깅**: 넣고 지우는 데 시간이 들고 안 찍은 변수는 못 본다. 디버거는 멈춘 순간의 모든 변수를 볼 수 있지만, 원격 서버나 운영 환경에서는 로그가 현실적이다.
- **Step Over vs Step Into**: Over 는 함수 호출을 한 줄로 취급해 건너뛰고, Into 는 그 안으로 들어간다. 내 코드가 아닌 라이브러리 함수는 Over 로 넘긴다.
- **Watch vs Variables**: Variables 는 현재 스코프의 변수 전부, Watch 는 내가 적어 둔 식(`terms.length`)만 계속 추적한다.
