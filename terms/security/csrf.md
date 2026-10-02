---
id: csrf
term: CSRF
aliases:
  - Cross-Site Request Forgery
  - 사이트 간 요청 위조
  - 씨서프
  - XSRF
category: security
tags:
  - 웹취약점
  - 세션
level: 2
kind: concept
related:
  - xss
  - session-auth
  - cors
  - jwt
  - local-storage
see_also:
  - https://community.owasp.org/attacks/csrf
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

로그인된 내 브라우저가 **다른 사이트의 꼬임에 넘어가** 원치 않는 요청을 보내는 취약점.

## 비유

은행 창구가 **내 얼굴(쿠키)만 보고** 도장을 찍어 주는데, 사기꾼이 내 손을 잡고 "여기 사인 한 번만요" 하며 이체 신청서를 내미는 것. 창구는 얼굴 말고 "본인이 직접 쓴 서류인지" 도 확인해야 한다.

## 예시

브라우저가 쿠키를 자동으로 붙이는 게 원인이니, 다른 사이트에서 시작된 요청엔 쿠키가 안 붙게 하고 상태를 바꾸는 요청엔 토큰을 요구한다.

```ts
// 세션 쿠키에 SameSite — 다른 사이트에서 출발한 요청에는 쿠키가 실리지 않는다
res.cookie("session", sid, { httpOnly: true, secure: true, sameSite: "lax" });

// POST/DELETE 는 폼에 숨겨 둔 토큰이 세션의 것과 맞아야 처리
if (req.body._csrf !== req.session.csrfToken) return res.status(403).end();
```

Supabase 클라이언트처럼 토큰을 `Authorization` 헤더에 직접 붙이는 API 는 브라우저가 자동으로 실어 주지 않으므로 CSRF 위험이 낮다. 대신 그 토큰이 XSS 로 새지 않게 지켜야 한다.

## 헷갈리기 쉬운 것

- **XSS** 는 공격 코드가 "내 사이트 안에서" 실행되고, CSRF 는 "밖에서" 요청만 유도한다. 이름이 비슷해 자주 섞인다.
- **CORS** 는 다른 출처의 "응답을 읽는 것" 을 막지 요청 전송 자체를 막지 않는다. CORS 를 잘 설정했다고 CSRF 가 막히지는 않는다.
