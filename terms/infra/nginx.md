---
id: nginx
term: Nginx
aliases:
  - 엔진엑스
  - nginx.conf
  - 엔진X
category: infra
tags:
  - 서버운영
  - HTTP
  - HTTPS
  - 네트워크
level: 1
kind: tool
related:
  - caddy
  - reverse-proxy
  - lets-encrypt
  - load-balancer
  - https
  - static-hosting
see_also:
  - https://nginx.org/en/docs/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

정적 파일 서빙과 리버스 프록시에 가장 많이 쓰이는 **가볍고 빠른 웹 서버**.

## 비유

큰 건물의 **베테랑 경비원**. 손님이 수천 명 몰려도 지치지 않고 게시판(정적 파일)이나 안쪽 사무실(앱)로 안내하지만, 출입증(HTTPS 인증서)은 내가 따로 발급받아 손에 쥐여 줘야 한다.

## 예시

```nginx
# /etc/nginx/sites-available/lab.conf — API 를 HTTPS 로 공개
server {
    listen 443 ssl;
    server_name lab.example.com;
    ssl_certificate     /etc/letsencrypt/live/lab.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lab.example.com/privkey.pem;
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
    }
}
```

```caddyfile
# 같은 일을 하는 Caddyfile — 인증서 줄이 없다
lab.example.com {
    reverse_proxy 127.0.0.1:8000
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx   # 문법 검사 후 무중단 재적용
```

Nginx 는 인증서를 certbot 으로 받아 경로를 적어 주고 80→443 리다이렉트도 직접 써야 해서 줄이 길지만, 그만큼 캐시·레이트 리밋·헤더 조작을 세밀하게 다룰 수 있고 인터넷에 설정 예제가 압도적으로 많다. 관리자가 한 명인 연구실은 Caddy 로 시작하고, 트래픽이 커지거나 회사 인프라를 만나면 Nginx 설정을 읽을 줄 알아야 한다. React 빌드 결과를 컨테이너로 배포할 때 `FROM nginx:alpine` 에 `dist/` 를 복사하는 것도 흔한 쓰임이다.

## 헷갈리기 쉬운 것

- **Caddy** 는 같은 역할의 더 새로운 웹 서버로 HTTPS 가 자동이고 설정이 짧다. Nginx 는 손이 더 가는 대신 성능 튜닝 폭이 넓고 자료가 많다.
- **Apache** 는 Nginx 보다 오래된 웹 서버로 `.htaccess` 같은 폴더별 설정이 특징. Nginx 는 이벤트 기반이라 동시 접속에 강하다.
- **리버스 프록시**는 역할 이름이고 Nginx 는 그 역할을 하는 프로그램 중 하나. Nginx 는 정적 파일 서빙·로드 밸런싱도 한다.
