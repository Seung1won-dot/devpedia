---
id: devcontainer
term: Dev Container
aliases:
  - devcontainer
  - devcontainer.json
  - 개발 컨테이너
  - 데브 컨테이너
  - GitHub Codespaces
category: devops
tags:
  - 컨테이너
  - 개발도구
  - 협업
  - 연구
level: 2
kind: tool
related:
  - docker
  - docker-compose
  - docker-image
  - lockfile
  - virtualenv
  - dotfiles
see_also:
  - https://containers.dev/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

개발 환경 전체를 **컨테이너로 정의**해 누가 열어도 같은 도구·버전이 뜨게 하는 설정.

## 비유

실험실의 **공용 실험 키트**. 각자 집에서 시약을 따로 모으는 대신, 같은 상자를 열면 같은 피펫과 같은 농도의 시약이 들어 있다.

## 예시

```jsonc
// .devcontainer/devcontainer.json
{
  "name": "eclab-rag",
  "image": "mcr.microsoft.com/devcontainers/python:3.12",
  "features": {
    "ghcr.io/devcontainers/features/node:1": { "version": "22" }
  },
  "postCreateCommand": "pip install -r requirements.txt",
  "customizations": {
    "vscode": {
      "extensions": ["ms-python.python", "charliermarsh.ruff"]
    }
  },
  "forwardPorts": [8000]
}
```

VS Code 에서 "Reopen in Container" 를 누르면 이미지를 받고, 확장을 깔고, `postCreateCommand` 를 돌린 뒤 그 안에서 터미널이 뜬다. 신입이 Windows 노트북에서 clone 해도 Python 버전·ruff 설정·Node 가 선배와 똑같다. GPU 를 쓰려면 `"runArgs": ["--gpus", "all"]` 을 더하는데, 호스트에 NVIDIA 드라이버와 Container Toolkit 이 있어야 한다. GitHub Codespaces 는 같은 파일을 클라우드 VM 에서 열어 주는 서비스다.

## 헷갈리기 쉬운 것

- **Docker Compose** 는 "서비스를 돌리는" 컨테이너 묶음, Dev Container 는 "코드를 짜는" 컨테이너. `devcontainer.json` 이 compose 파일을 가리켜 DB 컨테이너까지 같이 띄울 수도 있다.
- **venv** 는 Python 패키지만 격리한다. CUDA·libpq 같은 시스템 라이브러리, Node, 에디터 확장까지 맞추려면 OS 레벨부터 담는 Dev Container 가 필요하다.
- **배포용 Dockerfile** 은 실행에 필요한 것만 최소로 담지만, 개발 컨테이너는 디버거·린터·git 까지 들어가 더 무겁다.
