---
id: reverse-proxy
term: 리버스 프록시
aliases: [Reverse Proxy, 역방향 프록시, Nginx 프록시, 리버스프록시]
category: infra
tags: [서버운영, 네트워크, HTTPS]
level: 2
kind: concept
related:
  - caddy
  - load-balancer
  - https
  - port
  - docker-compose
  - proxy
  - nginx
status: published
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

외부 요청을 **대신 받아** 뒤에 있는 여러 서버로 나눠 전달하는 중간 서버.

## 비유

건물 1층 **안내 데스크**. 손님(요청)은 데스크만 알고 오고, 데스크가 "그건 3층 B팀" 하고 안내하니 각 팀(서버)의 방 번호(포트)는 손님이 몰라도 된다.

## 예시

Proxmox 에 VM 이 3개(웹 3000, API 8000, Grafana 3001) 있을 때, Caddy 하나만 80/443 을 열고:

```caddyfile
app.lab.example.com {
    reverse_proxy localhost:3000
}
api.lab.example.com {
    reverse_proxy localhost:8000
}
```

HTTPS 인증서도 Caddy 가 한 번에 처리한다.

## 헷갈리기 쉬운 것

- **포워드 프록시**는 반대로 "내(클라이언트)가 밖에 나갈 때" 대신 나가주는 것. 학교 프록시가 이쪽.
- **로드 밸런서**는 리버스 프록시의 한 용도(같은 서버 여러 대에 분산).
