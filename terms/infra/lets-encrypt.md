---
id: lets-encrypt
term: Let's Encrypt
aliases:
  - 렛츠 인크립트
  - ACME
  - certbot
  - 무료 TLS 인증서
category: infra
tags:
  - HTTPS
  - 보안통신
  - 키관리
  - 서버운영
level: 1
kind: tool
related:
  - certificate
  - https
  - tls
  - caddy
  - nginx
  - dns-record
see_also:
  - https://letsencrypt.org/docs/
  - https://datatracker.ietf.org/doc/html/rfc8555
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

도메인 소유만 자동으로 확인하고 **HTTPS 인증서를 무료로 발급**해 주는 인증 기관.

## 비유

**무인 민원 발급기**. 창구(유료 CA)에 서류 내고 며칠 기다리는 대신 기계 앞에서 신분(도메인 소유) 확인만 하면 그 자리에서 뽑아 주고, 유효기간이 짧은 대신 재발급도 기계가 알아서 한다.

## 예시

```bash
# Nginx 서버: certbot 이 도메인 확인 → 인증서 받기 → nginx 설정까지 고친다
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d lab.example.com
sudo certbot renew --dry-run        # 자동 갱신 타이머가 제대로 도는지 확인
```

```caddyfile
# Caddy 는 도메인만 적으면 같은 일을 내부에서 자동으로 한다
lab.example.com {
    reverse_proxy 127.0.0.1:8000
}
```

소유 확인은 두 가지다. **HTTP-01** 은 Let's Encrypt 가 `http://도메인/.well-known/acme-challenge/...` 로 직접 접속해 보므로 80번 포트가 인터넷에 열려 있어야 한다. 연구실처럼 포트를 안 열고 Tailscale 로만 들어가는 서버는 **DNS-01** — DNS 에 TXT 레코드를 넣어 증명하므로 Caddy 의 DNS 플러그인이나 `certbot-dns-cloudflare` 에 DNS 업체 API 토큰을 준다(`tailscale cert` 도 같은 원리). 유효기간은 90일이라 [확인 필요] 손으로 갱신하면 반드시 까먹으니 자동화가 전제다.

## 헷갈리기 쉬운 것

- **인증서**는 발급받는 문서고, Let's Encrypt 는 그걸 찍어 주는 **기관(CA)**. 유료 CA 와 역할은 같고 값이 0원일 뿐이다.
- **ACME** 는 "자동으로 인증서 받는 절차" 를 정한 프로토콜, **certbot** 은 그 절차를 실행하는 프로그램, Let's Encrypt 는 반대편에서 받아 주는 기관. Caddy 는 certbot 역할을 내장했다.
- **자체 서명 인증서**는 내가 나를 보증한 것이라 브라우저가 경고를 띄운다. Let's Encrypt 인증서는 모든 브라우저가 믿는다.
