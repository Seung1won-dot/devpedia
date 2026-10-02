---
id: environments
term: 환경 분리(dev/stage/prod)
aliases:
  - Environments
  - 개발/스테이징/운영 환경
  - 배포 환경
  - 스테이징
category: devops
tags:
  - 배포
  - 운영
level: 2
kind: pattern
related:
  - secrets-management
  - ci-cd
  - blue-green-canary
  - environment-variable
  - iac
  - feature-flag
see_also:
  - https://vercel.com/docs/deployments/environments
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

같은 앱을 **개발용·시험용·실사용자용**으로 따로 띄워 두는 것.

## 비유

요리사의 **시식용 주방과 손님용 주방**. 새 레시피는 시식용에서 먼저 만들어 보고, 확인된 것만 손님 테이블에 나간다.

## 예시

```ini
# .env.development — 내 노트북 (커밋하지 않음)
DATABASE_URL=postgres://localhost:5432/enderchest
SLACK_WEBHOOK_URL=                 # 개발 중엔 알림 끔
# .env.production — 파일로 두지 않고 Vercel 프로젝트 설정에 등록
DATABASE_URL=postgres://db.lab.internal:5432/enderchest
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T000/B000/xxxx
```

Ender Chest 는 Vercel 이 main 브랜치는 Production, 나머지 브랜치는 Preview 로 자동으로 나눠 준다. 코드는 하나이고 환경변수만 다르게 주입하는 것이 핵심이다.

## 헷갈리기 쉬운 것

- **dev vs stage**: dev 는 내 컴퓨터·팀 내부용이라 자주 깨져도 되고, stage 는 prod 와 똑같이 꾸며 놓고 배포 직전에 마지막으로 확인하는 곳.
- **환경 분리 ≠ 브랜치 분리**: 브랜치는 코드의 갈래, 환경은 코드가 도는 장소. 보통 브랜치와 환경을 짝지어 쓴다(main → prod).
