---
id: https
term: HTTPS
aliases:
  - HTTP Secure
  - HTTP over TLS
  - 보안 HTTP
  - 에이치티티피에스
category: network
tags:
  - HTTP
  - 보안통신
  - HTTPS
level: 1
kind: protocol
related:
  - http
  - tls
  - certificate
  - caddy
  - reverse-proxy
  - lets-encrypt
  - doh
see_also:
  - https://developer.mozilla.org/ko/docs/Glossary/HTTPS
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

HTTP 통신을 **TLS 로 암호화**해서 중간에서 훔쳐보거나 바꿀 수 없게 한 것.

## 비유

엽서(HTTP) 대신 **봉한 편지**(HTTPS). 내용은 똑같이 쓰지만, 우체부(중간 네트워크)가 읽을 수 없고 뜯은 흔적도 남는다.

## 예시

```caddyfile
# Caddy 는 도메인만 적으면 Let's Encrypt 인증서를 자동 발급·갱신한다
notes.lab.example.com {
    reverse_proxy localhost:3000
}
```

```bash
curl -vI https://notes.lab.example.com 2>&1 | grep -E "subject|expire"
```

Ender Chest 를 GitHub Pages 에 올리면 기본으로 HTTPS 가 붙는다. 브라우저는 HTTP 사이트에서 위치·카메라·PWA 설치 같은 기능을 아예 막으니, 요즘은 선택이 아니라 필수.

## 헷갈리기 쉬운 것

- **TLS/SSL** 은 암호화 기술 그 자체, HTTPS 는 그걸 HTTP 에 적용한 결과. 인증서는 "TLS 인증서"지 "HTTPS 인증서"가 아니다.
- HTTPS 는 **오가는 구간**만 지킨다. 서버에 도착한 뒤 DB 에 평문으로 저장하면 그건 별개 문제.
