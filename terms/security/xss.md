---
id: xss
term: XSS
aliases:
  - Cross-Site Scripting
  - 크로스 사이트 스크립팅
  - 엑스에스에스
category: security
tags:
  - 웹취약점
  - 브라우저
level: 2
kind: concept
related:
  - csrf
  - sql-injection
  - dom
  - local-storage
  - owasp-top-10
see_also:
  - https://community.owasp.org/attacks/xss/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

남이 심은 스크립트가 **내 브라우저에서 그 사이트 권한으로** 실행되는 취약점.

## 비유

아파트 게시판에 누가 붙인 **가짜 공지**에 "관리비는 이 계좌로" 라고 적혀 있는데, 게시판에 붙어 있으니 관리사무소 말인 줄 알고 따르는 것. 남이 붙인 종이는 종이로만 보여야지, 관리사무소 목소리가 되면 안 된다.

## 예시

React 는 `{}` 안의 문자열을 자동으로 이스케이프해서 `<script>` 가 글자로만 보인다. 이걸 우회하는 API 를 피하는 게 핵심.

```ts
// ✅ 안전 — 댓글에 <script> 가 있어도 그냥 글자로 렌더링
<p>{comment.body}</p>

// ❌ 사용자 입력을 HTML 로 그대로 꽂는 것. 꼭 써야 하면 DOMPurify 로 먼저 소독
<div dangerouslySetInnerHTML={{ __html: comment.body }} />
```

추가 방어로 Caddy 에 `header Content-Security-Policy "default-src 'self'"` 를 걸면 허용하지 않은 출처의 스크립트는 브라우저가 아예 실행하지 않는다. 세션 쿠키는 `HttpOnly` 로 두어 스크립트가 읽지 못하게 한다.

## 헷갈리기 쉬운 것

- **CSRF** 는 스크립트를 심는 게 아니라, 로그인된 상태를 이용해 "요청을 대신 보내게" 하는 것. XSS 가 뚫리면 CSRF 방어(토큰)도 같이 무너진다.
- **SQL 인젝션**은 서버의 DB 쪽에서 터진다. XSS 는 피해자가 다른 사용자의 브라우저.
