---
id: certificate
term: 인증서(CA)
aliases:
  - Certificate
  - 인증서
  - TLS 인증서
  - CA(Certificate Authority)
category: security
tags:
  - HTTPS
  - 키관리
  - 보안통신
level: 2
kind: concept
related:
  - tls
  - https
  - digital-signature
  - public-key-cryptography
  - caddy
  - lets-encrypt
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/Digital_certificate
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**이 공개키가 이 도메인 것이 맞다**고 믿을 만한 기관(CA)이 서명해 준 문서.

## 비유

**주민등록증**. 내가 "저 홍길동인데요" 라고 말해봐야 못 믿지만, 나라(CA)가 발급한 신분증을 보이면 처음 보는 사람도 믿는다.

## 예시

Caddy 는 도메인만 적어 두면 Let's Encrypt 라는 무료 CA 에서 인증서를 받아 오고, 만료 전에 알아서 갱신한다.

```caddyfile
app.lab.example.com {
    reverse_proxy localhost:3000
}
```

```bash
curl -vI https://app.lab.example.com 2>&1 | grep -E "issuer|expire"
# issuer: ... O=Let's Encrypt ...   /  expire date: ...
```

브라우저는 "믿는 CA 목록" 을 갖고 있어서, 목록에 있는 CA 가 서명한 인증서만 자물쇠 아이콘을 띄운다.

## 헷갈리기 쉬운 것

- **디지털 서명**은 도구, 인증서는 그 도구로 만든 결과물. 인증서 = "공개키 + 도메인 이름 + CA 의 서명".
- **자체 서명 인증서**는 내가 나를 보증한 것. 암호화 자체는 되지만 브라우저가 "신원 확인 안 됨" 경고를 띄운다. 연구실 내부망에서만 쓸 때 임시로 쓴다.
