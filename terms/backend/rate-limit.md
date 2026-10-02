---
id: rate-limit
term: 레이트 리밋
aliases:
  - Rate Limiting
  - 요청 제한
  - 속도 제한
  - 스로틀링
category: backend
tags:
  - API설계
  - 보안
level: 2
kind: pattern
related:
  - api
  - middleware
  - cache
  - brute-force
  - http-status-code
  - api-key
  - retry-backoff
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

한 사용자가 **일정 시간에 보낼 수 있는 요청 수를 제한**하는 것.

## 비유

놀이기구의 **"한 사람당 하루 3번"** 규칙. 한 사람이 계속 타면 줄 선 다른 사람이 못 타니, 횟수를 세어 두고 넘으면 잠시 못 타게 한다.

## 예시

Express 미들웨어 한 줄로 로그인 시도를 15분에 5번으로 제한:

```ts
import rateLimit from "express-rate-limit"
app.use("/api/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }))
```

넘으면 **429 Too Many Requests** 와 "언제 다시 오라"는 헤더를 돌려준다:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 600
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
```

서버가 여러 대면 카운터를 Redis 에 두고(`INCR login:42` + `EXPIRE login:42 900`) 공유한다. Caddy 같은 리버스 프록시 단에서 거는 방법도 있고, Supabase Auth 도 이메일 발송 같은 요청에 기본 레이트 리밋이 걸려 있다.

## 헷갈리기 쉬운 것

- **스로틀링**은 넘친 요청을 거절하는 대신 "느리게 처리하거나 줄 세우기". 실무에선 둘을 섞어 부른다.
- **브루트포스 방어**는 레이트 리밋의 대표 용도이지 같은 말은 아니다. 레이트 리밋은 비용 폭주·크롤러 차단·공정 분배에도 쓴다.
