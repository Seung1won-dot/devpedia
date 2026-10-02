---
id: token-storage
term: 토큰 저장 위치
aliases:
  - Token Storage
  - 토큰 저장 위치
  - 쿠키 vs localStorage
  - JWT 어디에 저장
  - HttpOnly 쿠키
category: security
tags:
  - 세션
  - 브라우저
  - 웹취약점
  - 면접
level: 1
kind: concept
related:
  - local-storage
  - jwt
  - xss
  - csrf
  - refresh-token
  - session-hijacking
  - mobile-local-storage
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage
  - https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

로그인 토큰을 **쿠키에 둘지 localStorage 에 둘지** 정하는 보안 선택.

## 비유

집 열쇠를 **문 옆 자물쇠함**(쿠키)에 둘지 **내 가방**(localStorage)에 넣고 다닐지의 문제. 자물쇠함은 나도 못 열어 보지만 집 앞에 선 사람이 대신 쓸 수 있고(CSRF), 가방은 꺼내 쓰기 편한 대신 소매치기(XSS)에 통째로 털린다.

## 예시

```python
# FastAPI: 토큰을 JS 가 읽을 수 없는 쿠키로 내려 준다
response.set_cookie(
    key="access_token", value=token,
    httponly=True,      # document.cookie 로 못 읽음 → XSS 로 훔치기 어려움
    secure=True,        # HTTPS 에서만 전송
    samesite="lax",     # 다른 사이트에서 출발한 요청엔 안 실림 → CSRF 완화
    max_age=900,        # 15분
)
```

```ts
// 반대 선택: 응답 JSON 의 토큰을 localStorage 에 두고 매 요청 헤더에 붙인다
localStorage.setItem("access_token", token)
fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } })
```

위쪽은 브라우저가 쿠키를 자동으로 붙이니 프론트 코드가 단순하고, XSS 가 토큰을 **읽어 가지는** 못한다. 대신 자동 전송 때문에 CSRF 를 신경 써야 한다(SameSite + 상태 변경 요청엔 CSRF 토큰). 아래쪽은 CSRF 걱정이 없지만 페이지 안 어떤 스크립트든 토큰을 읽을 수 있어서, 광고 SDK 나 npm 패키지 하나만 오염돼도 토큰이 샌다. 그래서 흔한 절충은 **리프레시 토큰은 HttpOnly 쿠키, 짧게 사는 액세스 토큰은 JS 메모리(변수)** 에만 두는 것 — 새로고침하면 사라지지만 쿠키로 다시 받으면 된다. Supabase JS 클라이언트는 기본값이 localStorage 라 이 트레이드오프를 알고 쓰는 게 좋다.

## 헷갈리기 쉬운 것

- **쿠키 vs 세션**은 "사용자 상태를 서버에 두나 브라우저에 두나" 의 질문. 토큰 저장 위치는 그중 브라우저 쪽에서 "어느 서랍에 넣나" 의 질문이다.
- **sessionStorage** 는 탭을 닫으면 지워질 뿐, XSS 가 읽을 수 있다는 점은 localStorage 와 똑같다. 수명이 짧아질 뿐 안전해지는 건 아니다.
- **HttpOnly** 는 토큰을 "읽어 가는 것" 만 막는다. XSS 가 성공하면 그 페이지에서 요청을 보내 쿠키를 **써먹는** 건 여전히 가능하다 — 피해를 줄이는 장치지, XSS 를 안 막아도 되는 면허가 아니다.
