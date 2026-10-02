---
id: docker
term: Docker
aliases:
  - 도커
  - Docker Engine
  - 도커 컨테이너
category: infra
tags:
  - 컨테이너
  - 배포
level: 1
kind: tool
related:
  - docker-image
  - docker-compose
  - lxc
  - vm
  - container-registry
  - devcontainer
  - port-mapping
see_also:
  - https://docs.docker.com/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

앱과 그 실행 환경을 **한 상자(컨테이너)에 담아** 어디서나 똑같이 띄우는 도구.

## 비유

요리를 재료·양념·냄비까지 통째로 **밀키트**로 포장하는 것. 어느 집 주방(서버)에서 열어도 똑같은 요리가 나온다.

## 예시

```bash
# 연구실 VM 에 Docker 설치 후, 로컬 LLM 서버(Ollama)를 한 줄로 띄우기
curl -fsSL https://get.docker.com | sh
docker run -d --name ollama --gpus all -p 11434:11434 -v ollama:/root/.ollama ollama/ollama
docker ps                    # 돌고 있는 컨테이너
docker logs -f ollama        # 로그 실시간
docker exec -it ollama ollama run qwen2.5:7b
```

파이썬 버전이나 CUDA 라이브러리 충돌을 걱정하지 않고 `docker run` 한 줄로 서비스가 뜨고, `docker rm` 하면 흔적 없이 사라진다 (`--gpus all` 은 nvidia-container-toolkit 이 깔려 있어야 한다).

## 헷갈리기 쉬운 것

- **VM** 은 OS 까지 통째로 올린다. Docker 컨테이너는 호스트 커널을 빌려 쓰니 시작이 1초, 용량은 수십 MB.
- **LXC** 도 컨테이너지만 "OS 한 대" 느낌으로 쓴다. Docker 는 "앱 하나 = 컨테이너 하나" 로 쓰고, 이미지를 레지스트리로 나누는 생태계가 핵심이다.
