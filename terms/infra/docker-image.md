---
id: docker-image
term: 이미지/컨테이너
aliases:
  - Docker Image
  - 도커 이미지
  - 컨테이너 이미지
  - 이미지와 컨테이너
category: infra
tags:
  - 컨테이너
  - 배포
level: 1
kind: concept
related:
  - docker
  - docker-compose
  - container-registry
  - vm
  - class-instance
  - docker-volume
see_also:
  - https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**이미지**는 실행 환경을 찍어 둔 원본이고, **컨테이너**는 그걸 실제로 켠 것.

## 비유

**붕어빵 틀과 붕어빵**. 틀(이미지) 하나로 붕어빵(컨테이너)을 여러 개 찍어내고, 하나가 타도 틀은 멀쩡하다.

## 예시

```dockerfile
# Dockerfile — 연구실 FastAPI 서버 이미지 레시피
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t lab-api:0.1 .            # 레시피 → 이미지
docker run -d -p 8000:8000 lab-api:0.1   # 이미지 → 컨테이너 (몇 개든)
docker images && docker ps -a            # 이미지 목록 / 컨테이너 목록(멈춘 것 포함)
```

이미지는 `docker build` 로 만들어 레지스트리에 올려 공유하고, 컨테이너는 껐다 지워도 이미지는 남는다.

## 헷갈리기 쉬운 것

- **클래스와 인스턴스** 관계와 같다. 이미지(클래스)는 읽기 전용, 컨테이너(인스턴스)는 실행 중 상태와 바뀐 파일을 가진다.
- **Dockerfile** 은 이미지를 만드는 레시피 텍스트. 이미지 그 자체가 아니다.
