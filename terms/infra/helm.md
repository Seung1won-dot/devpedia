---
id: helm
term: Helm
aliases:
  - 헬름
  - Helm Chart
  - 헬름 차트
  - 쿠버네티스 패키지 매니저
category: infra
tags:
  - 컨테이너
  - 배포
  - IaC
level: 3
kind: tool
related:
  - kubernetes
  - docker-compose
  - container-registry
  - package-manager
  - iac
  - rollback
see_also:
  - https://helm.sh/docs/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

쿠버네티스 앱을 **설정값만 바꿔 설치·업그레이드하는 패키지 매니저**와 그 묶음(차트).

## 비유

쿠버네티스용 **앱스토어 + 설치 마법사**. "Grafana 설치" 를 누르고 비밀번호·저장 용량 몇 칸만 채우면, 안에서 필요한 설정 파일 수십 장이 알아서 만들어진다.

## 예시

```bash
# Grafana 를 Helm 으로 — YAML 수십 장 대신 values 몇 줄
helm repo add grafana https://grafana.github.io/helm-charts && helm repo update
helm install grafana grafana/grafana -n monitoring --create-namespace \
  --set adminPassword='change-me' --set persistence.enabled=true --set persistence.size=10Gi
helm list -n monitoring                                  # 설치된 릴리스·차트 버전·리비전
helm upgrade grafana grafana/grafana -n monitoring --set persistence.size=20Gi
helm rollback grafana 1 -n monitoring                    # 업그레이드가 망하면 리비전 1 로
helm template grafana grafana/grafana --set persistence.enabled=true | less   # 실제 생성될 YAML 미리 보기
```

차트는 YAML 템플릿 묶음이고, `values.yaml` 로 빈칸을 채워 렌더링한 결과를 "릴리스" 로 기억하기 때문에 롤백이 된다. 남이 만든 소프트웨어(Grafana, Prometheus, ingress-nginx)를 클러스터에 깔 때는 사실상 표준이다. 반대로 **우리 앱 하나**를 위해 자체 차트를 만들면 Go 템플릿 문법이 원래 YAML 보다 복잡해지고 수백 줄 values 에서 뭘 바꿀지 찾는 비용이 든다 — 서비스 한두 개면 평범한 YAML 이나 Kustomize 가 낫고, 쿠버네티스 자체가 없는(Compose 로 충분한) 연구실엔 Helm 도 필요 없다.

## 헷갈리기 쉬운 것

- **kubectl apply -f** 는 YAML 을 그대로 적용, Helm 은 템플릿 + values 로 YAML 을 생성하고 리비전을 기억해 롤백할 수 있다.
- **Kustomize** 는 템플릿 없이 기본 YAML 에 환경별 덮어쓰기(patch)를 얹는 방식. 자기 앱은 Kustomize, 남의 앱은 Helm 이 흔한 조합이다.
- **Docker Compose** 는 서버 한 대용 `compose.yml` 하나, Helm 차트는 그 역할을 쿠버네티스에서 한다.
