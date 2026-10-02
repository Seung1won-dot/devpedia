---
id: load-balancer
term: 로드 밸런서
aliases:
  - Load Balancer
  - 부하 분산기
  - LB
  - 로드밸런싱
category: network
tags:
  - 서버운영
  - 네트워크
  - 아키텍처
level: 2
kind: concept
related:
  - reverse-proxy
  - healthcheck
  - caddy
  - cdn
  - kubernetes
  - scale-up-out
  - nginx
see_also:
  - https://caddyserver.com/docs/caddyfile/directives/reverse_proxy
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

들어오는 요청을 **같은 일을 하는 서버 여러 대에 골고루 나눠 주는** 장치.

## 비유

은행 창구의 **번호표 기계**. 손님이 몰려도 비어 있는 창구로 순서대로 보내고, 어떤 창구가 자리를 비우면(장애) 그쪽으로는 안 보낸다.

## 예시

```caddyfile
# Ollama 를 GPU 서버 2대에서 띄우고 요청을 번갈아 보내기
llm.lab.example.com {
    reverse_proxy gpu1:11434 gpu2:11434 {
        lb_policy round_robin
        health_uri /api/tags
    }
}
```

한 대가 죽으면 헬스체크가 실패해 자동으로 빠지고, 살아나면 다시 들어온다. 클라우드에서는 AWS ALB, GCP Load Balancer 가 이 역할.

## 헷갈리기 쉬운 것

- **리버스 프록시**는 "대신 받아서 넘겨 주는 것" 전반이고, 로드 밸런서는 그중 "같은 서버 여러 대에 나누기"에 집중한 것. Caddy·Nginx 는 둘 다 한다.
- **CDN** 도 부하를 나누지만 방향이 다르다. LB 는 한 곳에 모인 서버들 사이에서, CDN 은 전 세계 곳곳에 복사본을 두고 가까운 데서 준다.
