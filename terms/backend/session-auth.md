---
id: session-auth
term: 세션/쿠키 인증
aliases:
  - Session-based Authentication
  - 세션 인증
  - 쿠키 인증
  - 세션 기반 로그인
category: backend
tags:
  - 세션
  - 인증
  - HTTP
level: 2
related:
  - authentication-authorization
  - jwt
  - local-storage
  - csrf
  - cache
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

로그인 정보를 **서버가 세션으로 보관**하고 브라우저엔 **번호표(쿠키)**만 주는 방식.

## 비유

옷 맡기고 받는 **보관소 번호표**. 옷(내 정보)은 보관소(서버)에 있고, 나는 번호표(쿠키)만 들고 다니다 보여주면 매번 내 옷을 찾아준다.

## 예시

Express + express-session:

```ts
app.post("/login", async (req, res) => {
  const user = await verify(req.body.email, req.body.password)
  req.session.userId = user.id          // 서버 메모리/Redis 에 저장
  res.sendStatus(204)                   // Set-Cookie: connect.sid=... 자동 전송
})

app.get("/me", (req, res) => {
  if (!req.session.userId) return res.sendStatus(401)
  res.json({ id: req.session.userId })
})
```

브라우저는 이후 요청마다 쿠키를 자동으로 붙인다. 로그아웃은 서버에서 세션을 지우면 끝이라 즉시 무효화가 쉽다. 서버가 여러 대면 세션 저장소를 Redis 처럼 공유해야 한다.

## 헷갈리기 쉬운 것

- **JWT** 는 반대로 정보를 토큰 안에 넣어 클라이언트가 들고 다니고 서버는 저장하지 않는다. 세션은 서버가 기억, JWT 는 토큰이 기억.
- **쿠키**는 그냥 브라우저가 자동으로 붙이는 작은 저장 공간. 세션 인증은 쿠키를 "번호표"로 쓰는 한 용도이고, JWT 도 쿠키에 담을 수 있다. 자동 전송되기 때문에 **CSRF** 대비가 따라온다.
