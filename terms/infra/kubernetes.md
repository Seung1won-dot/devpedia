---
id: kubernetes
term: 쿠버네티스
aliases:
  - Kubernetes
  - k8s
  - 쿠베
  - 큐버네티스
category: infra
tags:
  - 컨테이너
  - 클라우드
  - 배포
level: 3
related:
  - docker
  - docker-compose
  - load-balancer
  - healthcheck
  - microservices
see_also:
  - https://kubernetes.io/docs/concepts/overview/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

서버 여러 대에 걸쳐 컨테이너를 **자동으로 배치·복구·확장**하는 관리 시스템.

## 비유

대형 물류창고의 **자동 배차 시스템**. 트럭(컨테이너)이 고장 나면 새 트럭을 알아서 보내고, 주문이 몰리면 트럭 수를 늘리고, 어느 기사(서버)에게 맡길지도 알아서 정한다.

## 예시

```yaml
# deployment.yaml — API 컨테이너를 항상 3개로 유지, 죽으면 자동 재생성
apiVersion: apps/v1
kind: Deployment
metadata: { name: lab-api }
spec:
  replicas: 3
  selector: { matchLabels: { app: lab-api } }
  template:
    metadata: { labels: { app: lab-api } }
    spec:
      containers: [{ name: api, image: ghcr.io/eclab/lab-api:0.1 }]
```

```bash
kubectl apply -f deployment.yaml
kubectl get pods              # 3개가 Running 인지
kubectl delete pod <하나>     # 지워도 곧바로 새로 뜬다
```

연구실 서버 한두 대면 굳이 필요 없고 서비스가 서버 여러 대로 퍼져야 할 때 Compose 대신 쓴다 — 배우려면 `k3s` 나 `kind` 로 노트북에 작은 클러스터를 만들어 보면 된다.

## 헷갈리기 쉬운 것

- **Docker Compose** 는 서버 한 대 안에서 컨테이너 묶음을 띄우는 것. 쿠버네티스는 여러 대 + 자동 복구·확장이라 훨씬 무겁고 배울 것도 많다.
- **Docker Swarm** 은 Docker 에 내장된 간단한 대안이지만, 요즘 새로 시작하는 곳은 거의 쿠버네티스로 간다.
