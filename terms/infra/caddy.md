---
id: caddy
term: Caddy
aliases:
  - Caddy
  - 캐디
category: infra
tags:
  - HTTPS
  - 서버운영
  - 네트워크
level: 2
kind: tool
related:
  - reverse-proxy
  - https
  - tls
  - certificate
  - dns
  - lets-encrypt
  - nginx
see_also:
  - https://caddyserver.com/docs/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

요청을 받아 파일을 주거나 뒤의 앱에 넘기는 **웹 서버**로, Caddy 는 **HTTPS 가 자동**이다.

## 비유

건물의 **현관 경비원**. 손님이 오면 게시판(정적 파일)을 보여 주거나 안쪽 사무실(앱)로 안내하고, Caddy 는 출입증(HTTPS 인증서)까지 알아서 발급·갱신한다.

## 예시

```caddyfile
# /etc/caddy/Caddyfile — 도메인만 적으면 Let's Encrypt 인증서를 자동으로 받는다
lab.example.com {
    reverse_proxy localhost:8000
}
docs.lab.example.com {
    root * /srv/docs
    file_server
}
```

```bash
sudo systemctl reload caddy && curl -I https://lab.example.com
```

DNS 가 이 서버를 가리키고 80/443 이 열려 있으면 그걸로 끝이다 — Nginx 로 같은 일을 하려면 `server {}` 블록에 certbot 으로 받은 인증서 경로를 적고 갱신 크론까지 걸어야 해서, 관리자가 한 명인 연구실은 Caddy 가 손이 덜 간다.

## 헷갈리기 쉬운 것

- **리버스 프록시**는 역할 이름이고 Caddy/Nginx 는 그 역할을 하는 프로그램. 둘 다 정적 파일 서빙도 한다.
- **Apache** 는 같은 부류의 더 오래된 웹 서버. Nginx 는 동시 접속 처리에 강하고, Caddy 는 설정과 HTTPS 가 쉽다.
