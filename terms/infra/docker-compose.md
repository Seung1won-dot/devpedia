---
id: docker-compose
term: Docker Compose
aliases:
  - 도커 컴포즈
  - compose.yaml
  - 컴포즈
category: infra
tags:
  - 컨테이너
  - 배포
  - 연구실
level: 2
kind: tool
related:
  - docker
  - docker-image
  - caddy
  - reverse-proxy
  - environment-variable
  - task-runner
  - devcontainer
see_also:
  - https://docs.docker.com/compose/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

여러 컨테이너를 **YAML 파일 하나로 정의해 한 번에** 띄우고 내리는 도구.

## 비유

코스 요리 **주문서 한 장**. 전채·메인·후식(웹·API·DB)을 따로 시키지 않고 주문서 한 장 내밀면 한꺼번에 나온다.

## 예시

```yaml
# compose.yaml — 연구실 논문 검색 서비스 (API + 벡터 DB)
services:
  api:
    build: .
    ports: ["8000:8000"]
    env_file: .env
    depends_on: [qdrant]
  qdrant:
    image: qdrant/qdrant
```

```bash
docker compose up -d       # 전부 띄우기 (백그라운드)
docker compose logs -f api
docker compose down        # 전부 내리기
```

서비스끼리는 `qdrant:6333` 처럼 이름으로 통신하고, 새 서버로 옮길 때도 이 파일과 `.env` 만 복사하면 된다.

## 헷갈리기 쉬운 것

- **docker run** 은 컨테이너 하나를 명령줄 옵션으로 띄운다. Compose 는 그 옵션들을 파일에 적어 여러 개를 묶는다.
- **쿠버네티스**도 여러 컨테이너를 관리하지만 서버 여러 대에 걸쳐 자동 복구·확장까지 한다. 서버 한 대면 Compose 로 충분하다.
