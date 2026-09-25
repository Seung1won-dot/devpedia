---
id: tls
term: TLS/SSL
aliases:
  - Transport Layer Security
  - Secure Sockets Layer
  - 전송 계층 보안
  - SSL 인증서
category: network
tags:
  - 보안통신
  - 암호화
  - HTTPS
level: 2
related:
  - https
  - certificate
  - public-key-cryptography
  - encryption
  - caddy
see_also:
  - https://datatracker.ietf.org/doc/html/rfc8446
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

두 컴퓨터가 통신하기 전에 **상대를 확인하고 암호 열쇠를 맞추는** 보안 규약.

## 비유

처음 만난 사람과 **신분증 확인 후 둘만 아는 암호 정하기**. 신분증(인증서)으로 상대가 진짜인지 보고, 그 자리에서 정한 암호로 이후 대화를 전부 잠근다.

## 예시

```bash
# 인증서 발급자와 만료일 확인
openssl s_client -connect notes.lab.example.com:443 -servername notes.lab.example.com </dev/null 2>/dev/null \
  | openssl x509 -noout -issuer -dates
```

Caddy 를 쓰면 Let's Encrypt 인증서를 알아서 받고 만료 전에 갱신해 준다. Nginx 를 직접 쓰면 certbot 을 크론에 걸어야 하고, 이걸 잊어서 "인증서 만료" 로 사이트가 죽는 게 홈랩 단골 사고.

## 헷갈리기 쉬운 것

- **SSL** 은 TLS 의 옛 이름. 지금 실제로 쓰는 건 전부 TLS(1.2/1.3)인데 "SSL 인증서"라는 말만 습관처럼 남았다.
- **HTTPS** 는 TLS 를 HTTP 에 얹은 것. TLS 는 메일(SMTPS), DB 접속(PostgreSQL 의 sslmode) 처럼 HTTP 아닌 곳에도 쓴다.
