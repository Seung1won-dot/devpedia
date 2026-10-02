---
id: session-hijacking
term: 세션 하이재킹
aliases:
  - Session Hijacking
  - 세션 하이재킹
  - 세션 탈취
  - 쿠키 탈취
  - 세션 고정
  - Session Fixation
category: security
tags:
  - 세션
  - 인증공격
  - 웹취약점
level: 2
kind: concept
related:
  - session-auth
  - xss
  - csrf
  - token-storage
  - https
  - cookie-vs-session
see_also:
  - https://owasp.org/www-community/attacks/Session_hijacking_attack
  - https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

남의 **세션 ID(쿠키)를 손에 넣어** 그 사람으로 로그인된 척 행세하는 공격.

## 비유

옷 보관소 **번호표를 슬쩍해 남의 외투를 찾아가는 것**. 직원은 번호표만 보지 얼굴은 안 보니, 번호표가 곧 신분이다.

## 예시

세션 ID 가 새는 길은 크게 네 가지다. (1) `HttpOnly` 없는 쿠키를 **XSS** 스크립트가 읽어 공격자 서버로 보낸다. (2) 카페 와이파이에서 **평문 HTTP** 로 오가는 쿠키를 엿듣는다 — HTTPS 가 기본이 된 이유. (3) 사용자 PC 의 **악성코드**가 브라우저 쿠키 저장소를 통째로 복사한다(인포스틸러라고 부르며 최근 사례가 많다 [확인 필요]). (4) **세션 고정**: 공격자가 미리 정한 세션 ID 를 링크에 심어 두고, 피해자가 그 ID 로 로그인했는데 서버가 ID 를 바꾸지 않으면 공격자도 같은 ID 로 로그인 상태가 된다.

서버 쪽 방어는 이렇게 생겼다.

```ts
// Express + express-session
app.use(session({
  secret: process.env.SESSION_SECRET!,
  cookie: { httpOnly: true, secure: true, sameSite: "lax", maxAge: 30 * 60 * 1000 },
}))

app.post("/login", async (req, res) => {
  const user = await verify(req.body.email, req.body.password)
  req.session.regenerate(() => {          // 로그인 성공 순간 ID 를 새로 발급 → 세션 고정 차단
    req.session.userId = user.id
    res.sendStatus(204)
  })
})

app.post("/logout", (req, res) => req.session.destroy(() => res.sendStatus(204)))  // 서버에서 즉시 폐기
```

여기에 세션 ID 는 길고 예측 불가능하게, URL 에는 절대 싣지 않고(로그·Referer 에 남는다), 비밀번호 변경·결제 같은 민감 작업 전엔 재인증을 요구한다. JWT 는 서버가 토큰을 기억하지 않아 탈취돼도 만료 전엔 끊을 수 없으니, 액세스 토큰은 짧게 두고 리프레시 토큰을 교체(rotation)하는 식으로 보완한다.

## 헷갈리기 쉬운 것

- **CSRF** 는 공격자가 쿠키 값을 모른 채 피해자의 브라우저가 대신 보내게 만든다. 하이재킹은 쿠키 값 자체를 들고 공격자 컴퓨터에서 쓰는 것이라 SameSite 나 CSRF 토큰으로는 막히지 않는다.
- **XSS** 는 세션을 훔치는 여러 수단 중 하나(원인), 하이재킹은 훔친 뒤 벌어지는 일(결과). XSS 를 막아도 악성코드·평문 통신 경로는 따로 막아야 한다.
- **세션 고정**은 방향이 반대다 — 훔치는 게 아니라 공격자가 아는 ID 를 미리 심어 둔다. 그래서 방어도 "읽지 못하게" 가 아니라 "로그인 때 ID 를 갈아 끼우기" 다.
