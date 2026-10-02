---
id: http-status-code
term: HTTP 상태 코드
aliases:
  - HTTP Status Code
  - HTTP 응답 코드
  - 상태코드
category: network
tags:
  - HTTP
  - REST
  - API설계
level: 1
kind: protocol
related:
  - http
  - rest
  - api
  - endpoint
  - healthcheck
  - validation
see_also:
  - https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Status
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

서버가 응답 맨 앞에 붙이는 **요청 결과를 나타내는 세 자리 숫자**.

## 비유

택배 조회 화면의 **배송 상태**. "배송 완료(200)", "주소 불명(404)", "물류센터 사고(500)"처럼 숫자만 봐도 어디서 무슨 일이 났는지 안다.

## 예시

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://api.lab.example.com/health
# 200 이면 정상, 502 면 Caddy 뒤의 앱이 죽은 것
```

| 앞자리 | 뜻 | 자주 보는 것 |
|---|---|---|
| 2xx | 성공 | 200 OK, 201 만들어짐 |
| 3xx | 다른 곳으로 | 301 영구 이동, 304 캐시 써라 |
| 4xx | 요청한 쪽 잘못 | 400 형식 오류, 401 로그인 필요, 403 권한 없음, 404 없음, 429 너무 자주 |
| 5xx | 서버 쪽 잘못 | 500 서버 에러, 502 뒤 서버 응답 없음, 503 점검 중 |

Hermes 크론잡이 실패했을 때 로그의 상태 코드부터 보면 원인이 우리 쪽(4xx)인지 상대 쪽(5xx)인지 바로 갈린다.

## 헷갈리기 쉬운 것

- **401 과 403**: 401 은 "누군지 몰라(로그인 안 됨)", 403 은 "누군지 아는데 권한 없음". Supabase 에서 RLS 에 걸린 SELECT 는 403 이 아니라 빈 배열(200)로 온다.
- **502 와 504**: 둘 다 리버스 프록시가 내는 코드. 502 는 뒤 서버가 죽었거나 이상한 답을 줌, 504 는 살아는 있는데 너무 늦음.
