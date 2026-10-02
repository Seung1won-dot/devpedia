---
id: local-storage
term: 쿠키/localStorage
aliases:
  - Cookie
  - 쿠키
  - 로컬 스토리지
  - Web Storage
category: frontend
tags:
  - 브라우저
  - 세션
  - 보안
level: 1
kind: concept
related:
  - session-auth
  - jwt
  - xss
  - http
  - state-management
  - i18n
see_also:
  - https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

브라우저에 데이터를 남기는 방법으로, **쿠키는 서버로 자동 전송**되고 **localStorage 는 JS 전용**.

## 비유

쿠키는 **놀이공원 손목 팔찌** — 어느 놀이기구(요청)에 가도 직원(서버)이 자동으로 본다. localStorage 는 **개인 사물함** — 내(JS)가 넣고 꺼낼 뿐 직원은 있는지도 모른다.

## 예시

```ts
// Devpedia: 별표한 용어 id 를 localStorage 에 저장한다 (서버 없음, 이 브라우저에만 남는다)
localStorage.setItem('devpedia:stars', JSON.stringify(['rag', 'cors']))

const stars: string[] = JSON.parse(localStorage.getItem('devpedia:stars') ?? '[]')
```

쿠키는 보통 JS 로 만지지 않고 서버가 응답 헤더로 심는다. `HttpOnly` 가 붙으면 JS 에서 읽을 수조차 없어서 로그인 세션용으로 안전하다.

```
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

Ender Chest 의 Supabase 로그인 토큰은 기본 설정에서 localStorage 에 들어간다.

## 헷갈리기 쉬운 것

- **sessionStorage** 는 localStorage 와 쓰는 법이 같은데 탭을 닫으면 사라진다. localStorage 는 지우기 전까지 남는다.
- 로그인 토큰을 어디 두나: localStorage 는 **XSS** 에 털릴 수 있고, HttpOnly 쿠키는 JS 가 못 읽는 대신 **CSRF** 를 신경 써야 한다. 둘 다 공짜 정답은 아니다.
