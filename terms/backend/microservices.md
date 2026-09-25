---
id: microservices
term: 마이크로서비스/모놀리식
aliases:
  - Microservices
  - MSA
  - 모놀리식 아키텍처
  - 마이크로서비스 아키텍처
category: backend
tags:
  - 아키텍처
  - 아키텍처패턴
  - 컨테이너
level: 3
related:
  - message-queue
  - docker-compose
  - kubernetes
  - api
  - reverse-proxy
see_also:
  - https://martinfowler.com/articles/microservices.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

앱을 **한 덩어리(모놀리식)로 만들지, 작은 서비스 여럿**으로 쪼갤지의 구조 선택.

## 비유

**한 명이 다 하는 동네 식당**과 **주방·홀·배달을 따로 둔 프랜차이즈**. 혼자 하면 소통은 쉽지만 한 명이 아프면 가게가 서고, 나누면 각자 바꾸기 쉽지만 손발 맞추는 비용이 든다.

## 예시

모놀리식 — FastAPI 하나에 인증·업로드·임베딩·검색이 전부 들어 있다:

```bash
uvicorn app.main:app --port 8000     # 프로세스 1개, 배포 1번, DB 1개
```

마이크로서비스 — 같은 기능을 서비스별로 쪼개 Docker Compose 로 띄운다:

```yaml
services:
  auth:   { build: ./auth }
  upload: { build: ./upload }
  embed:  { build: ./embed }      # GPU 서버 쪽으로만 따로 배포
  search: { build: ./search }
  caddy:  { image: caddy, ports: ["443:443"] }   # /auth/* → auth, /search/* → search
```

서비스끼리는 HTTP API 나 메시지 큐로 대화한다. 임베딩 서비스만 GPU 서버에 두거나, 검색 서비스만 3개로 늘리는 식이 가능해진다. 대신 로그 4곳, 배포 4번, 장애 지점 4개 — **연구실 규모(1~3명)면 모놀리식이 거의 항상 정답**이고, 쪼갤 이유(GPU 분리, 팀 분리)가 생겼을 때 하나씩 떼어낸다.

## 헷갈리기 쉬운 것

- **모듈화**와 다르다. 모놀리식도 코드 안에서 폴더·모듈로 잘 나눌 수 있다(모듈러 모놀리스). 마이크로서비스는 "따로 배포되는 프로세스"로 나누는 것.
- **쿠버네티스**는 마이크로서비스를 굴리는 도구이지 전제 조건이 아니다. Docker Compose 한 장으로도 서비스 여럿을 띄울 수 있다.
