---
id: service-mesh
term: 서비스 메시
aliases:
  - Service Mesh
  - 서비스 매시
  - Istio/Linkerd
  - 사이드카 프록시
category: infra
tags:
  - 아키텍처
  - 분산시스템
  - 컨테이너
  - 보안통신
level: 3
kind: concept
related:
  - microservices
  - kubernetes
  - reverse-proxy
  - tracing
  - circuit-breaker
  - tls
see_also:
  - https://istio.io/latest/docs/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

서비스마다 옆에 붙인 프록시가 **통신의 암호화·재시도·추적을 대신 맡는** 계층.

## 비유

모든 직원에게 **개인 비서**를 한 명씩 붙여 전화를 대신 받고 걸게 하는 것. 암호 전화·안 받으면 다시 걸기·통화 기록은 비서들이 알아서 하고, 직원(앱 코드)은 그런 걸 몰라도 된다.

## 예시

```bash
# Istio 설치 뒤, 네임스페이스에 "사이드카 자동 주입" 라벨만 붙이면 끝
istioctl install --set profile=demo -y
kubectl label namespace lab istio-injection=enabled
kubectl rollout restart deployment -n lab      # 다시 뜨는 Pod 마다 Envoy 프록시가 옆에 붙는다
kubectl get pods -n lab                        # READY 2/2 — 앱 1 + 프록시 1
```

```yaml
# 앱 코드 한 줄 안 바꾸고: 서비스 간 통신 전부 mTLS 강제 + search 호출은 2회 재시도
apiVersion: security.istio.io/v1
kind: PeerAuthentication
metadata: { name: default, namespace: lab }
spec: { mtls: { mode: STRICT } }
---
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata: { name: search, namespace: lab }
spec:
  hosts: [search]
  http:
    - route: [{ destination: { host: search } }]
      retries: { attempts: 2, perTryTimeout: 2s }
```

얻는 것은 코드 수정 없는 서비스 간 mTLS, 재시도·타임아웃·서킷 브레이커, 트레이싱 헤더 전파, 카나리용 트래픽 분할. 치르는 것은 Pod 마다 프록시 하나(메모리 수십~수백 MB, 요청마다 약간의 지연 [확인 필요])와 쿠버네티스 위에 또 한 층의 디버깅·운영 대상. **서버 세 대·서비스 서너 개·팀 하나인 연구실은 쓰면 안 된다** — FastAPI·Postgres·Ollama 가 Compose 네트워크 안에서 도는 수준이면 메시가 푸는 문제(수십 개 서비스 사이의 보안·관측·트래픽 제어)가 애초에 없고, Caddy 와 앱 라이브러리 재시도(tenacity)로 충분하다. 서비스가 수십 개, 팀이 여럿, 규제상 서비스 간 암호화 증빙이 필요할 때가 도입 시점이다.

## 헷갈리기 쉬운 것

- **리버스 프록시/API 게이트웨이**는 바깥→안(남북) 입구 하나. 서비스 메시는 안↔안(동서) 통신 전부를 서비스마다 붙은 프록시로 처리한다.
- **쿠버네티스 Service** 는 이름으로 찾아가고 부하를 나눌 뿐, 암호화·재시도는 해 주지 않는다.
- **라이브러리 방식**(tenacity, Resilience4j)은 같은 재시도·서킷을 코드에 넣는 것. 언어마다 따로 구현하지만 메시보다 훨씬 가볍다.
