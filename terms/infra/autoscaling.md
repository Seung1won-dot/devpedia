---
id: autoscaling
term: 오토스케일링
aliases:
  - Autoscaling
  - Auto Scaling
  - 자동 확장
  - HPA
  - Auto Scaling Group
category: infra
tags:
  - 클라우드
  - 성능
  - 분산시스템
  - 서버운영
level: 2
kind: concept
related:
  - scale-up-out
  - load-balancer
  - kubernetes
  - cloud-pricing
  - healthcheck
  - monitoring
see_also:
  - https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

트래픽·부하 지표에 따라 **서버나 컨테이너 수를 자동으로 늘렸다 줄이는** 기능.

## 비유

손님 수에 따라 **계산대를 열고 닫는 마트**. 줄이 길어지면 닫혀 있던 계산대를 열고, 한산해지면 직원을 다시 창고 일로 보낸다.

## 예시

```yaml
# hpa.yaml — CPU 평균 70% 를 넘으면 Pod 를 늘리고, 식으면 줄인다 (최소 2, 최대 10)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: lab-api }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: lab-api }
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }
```

```bash
kubectl apply -f hpa.yaml
kubectl get hpa lab-api --watch     # TARGETS 85%/70% 가 되면 REPLICAS 2 → 4 로 바뀐다
```

전제는 **무상태** 서버, 늘어난 서버에 요청을 나눠 줄 **로드 밸런서**, 새 서버가 준비됐는지 볼 **헬스체크** 세 가지다. 늘어나는 데 수십 초(컨테이너)~몇 분(VM)이 걸려 갑작스런 폭주에는 늦으므로 최소 대수에 여유를 두고, 상한 없이 켜 두면 트래픽 공격 한 번에 요금이 폭발한다. GPU 추론처럼 모델 로딩에 몇 분 걸리는 서비스는 0 까지 줄이면 첫 요청이 한참 걸리는 콜드 스타트를 겪는다. 연구실 Proxmox 는 호스트 자원이 고정이라 자동으로 늘릴 곳이 없다 — `docker compose up --scale api=3` 처럼 손으로 늘리면 충분하다.

## 헷갈리기 쉬운 것

- **스케일 아웃**은 대수를 늘리는 행위, 오토스케일링은 그걸 지표를 보고 자동으로 하는 장치다.
- **로드 밸런서**는 요청을 나눌 뿐 대수를 바꾸지 않는다. 오토스케일링이 늘린 서버를 LB 에 등록해 줘야 트래픽이 간다.
- **서버리스**는 오토스케일링을 플랫폼이 0 부터 알아서 해 주는 극단형이다.
