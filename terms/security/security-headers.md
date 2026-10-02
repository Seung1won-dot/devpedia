---
id: security-headers
term: 보안 헤더(CSP/HSTS)
aliases:
  - Security Headers
  - 보안 헤더
  - Content-Security-Policy
  - CSP
  - HSTS
  - Strict-Transport-Security
  - X-Frame-Options
category: security
tags:
  - HTTP
  - HTTPS
  - 웹취약점
  - 브라우저
level: 2
kind: concept
related:
  - xss
  - https
  - caddy
  - nginx
  - cors
  - reverse-proxy
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
  - https://securityheaders.com
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

서버가 응답에 붙여 **브라우저의 보안 동작을 지시하는** HTTP 헤더 모음.

## 비유

서류 봉투에 붙이는 **"복사 금지·외부 반출 금지" 스티커**. 내용물(HTML)은 그대로지만, 받는 쪽(브라우저)이 스티커를 읽고 알아서 조심한다.

## 예시

리버스 프록시에서 한 번만 붙이면 뒤의 모든 앱에 적용된다.

```caddyfile
lab.example.com {
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        Content-Security-Policy "default-src 'self'; img-src 'self' data:; frame-ancestors 'none'"
        X-Content-Type-Options "nosniff"
        Referrer-Policy "strict-origin-when-cross-origin"
        -Server
    }
    reverse_proxy 127.0.0.1:8000
}
```

```nginx
# Nginx 는 add_header 로. always 가 없으면 4xx/5xx 응답에는 안 붙는다
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'none'" always;
add_header X-Content-Type-Options "nosniff" always;
```

- **HSTS**: 한 번 HTTPS 로 접속한 브라우저는 그 뒤 1년간 `http://` 로는 아예 요청을 보내지 않는다. 다운그레이드·도청을 막지만, HTTP 로만 되는 하위 도메인이 있으면 `includeSubDomains` 가 그걸 바로 깨뜨린다.
- **CSP**: 스크립트·이미지 등을 어디서 불러와도 되는지 허용 목록. XSS 로 끼어든 스크립트가 다른 출처면 실행 자체가 거부된다. 처음엔 `Content-Security-Policy-Report-Only` 로 깨지는 곳을 보고 나서 켠다. `'unsafe-inline'` 을 넣는 순간 XSS 방어 효과는 거의 사라지니, Vite/React 의 인라인 스크립트는 nonce 나 해시로 푼다.
- **frame-ancestors 'none'**(옛 `X-Frame-Options: DENY`): 내 페이지를 남의 iframe 에 못 넣게 해 클릭재킹을 막는다. **nosniff**: 브라우저가 MIME 타입을 멋대로 추측해 CSS 를 스크립트로 실행하는 일을 막는다.

적용 후 securityheaders.com 에 도메인을 넣으면 빠진 헤더를 등급으로 보여 준다.

## 헷갈리기 쉬운 것

- **CORS** 헤더(`Access-Control-Allow-Origin`)도 응답 헤더지만 방향이 반대다 — 다른 출처가 내 응답을 읽을 수 있게 **풀어 주는** 것이고, 보안 헤더는 브라우저 동작을 **조이는** 것.
- **HTTPS 리다이렉트**는 서버가 요청을 받은 뒤 돌려보내는 것이라 첫 HTTP 요청은 평문으로 한 번 나간다. HSTS 는 브라우저가 그 첫 요청조차 안 보내게 한다. 둘 다 쓴다.
- **쿠키 플래그(HttpOnly/Secure/SameSite)** 는 독립 헤더가 아니라 `Set-Cookie` 한 줄 뒤에 붙는 속성이다. 보안 헤더 목록에 같이 나오곤 하지만 토큰 저장 위치 쪽 이야기.
