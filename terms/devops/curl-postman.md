---
id: curl-postman
term: curl/Postman
aliases:
  - curl
  - Postman
  - 컬
  - 포스트맨
  - API 테스트 도구
  - HTTPie
category: devops
tags:
  - 개발도구
  - HTTP
  - REST
level: 1
kind: tool
related:
  - rest
  - http-methods
  - endpoint
  - json
  - http-status-code
  - jwt
  - openapi
see_also:
  - https://curl.se/docs/manpage.html
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

브라우저 없이 **API 에 직접 요청을 보내고 응답을 확인**하는 도구.

## 비유

배달 앱 대신 **주방에 직접 전화해 주문**해 보는 것. 앱(프론트)이 없어도 주방(백엔드)이 주문을 제대로 받는지 바로 안다.

## 예시

```bash
# 1) GET — Ollama 가 떠 있고 어떤 모델이 있는지
curl http://localhost:11434/api/tags

# 2) POST + JSON 본문 — 로컬 Qwen 에 질문
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model": "qwen2.5:7b", "prompt": "데드락이 뭐야?", "stream": false}'

# 3) 인증 헤더 — Supabase REST 에 토큰을 붙여서
curl "https://xxxx.supabase.co/rest/v1/items?select=*" \
  -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY"
```

`-X` 로 메서드, `-H` 로 헤더, `-d` 로 본문을 주고, `-i` 를 붙이면 상태 코드와 응답 헤더까지 보인다. Postman 은 같은 일을 GUI 로 하면서 요청 묶음을 **컬렉션**으로 저장해 팀과 공유하고, `{{base_url}}` 같은 **환경 변수**로 로컬/운영 서버를 스위치한다. 프론트에서 안 되는데 curl 로는 되면 프론트 문제, curl 로도 안 되면 백엔드 문제 — 이 **문제 범위 나누기**가 핵심 용도다. 면접에서는 "API 가 안 될 때 어떻게 확인하나요?" 로 나온다.

## 헷갈리기 쉬운 것

- **wget**: 파일 내려받기에 가까운 도구. curl 은 메서드·헤더·본문을 자유롭게 만드는 범용 HTTP 클라이언트다.
- **Postman vs 자동화 테스트**: Postman 은 사람이 눌러 보는 수동 확인이 기본. 매 커밋마다 돌리려면 Newman(CLI)이나 pytest 같은 테스트 코드로 옮긴다.
- **HTTPie / Bruno**: curl 보다 읽기 쉬운 문법, Postman 보다 가벼운 오픈소스 대안. 개념은 같다.
