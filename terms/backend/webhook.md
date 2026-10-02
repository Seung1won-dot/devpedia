---
id: webhook
term: 웹훅
aliases:
  - Webhook
  - 웹 훅
  - 콜백 URL
  - HTTP 콜백
category: backend
tags:
  - API설계
  - HTTP
level: 2
kind: pattern
related:
  - api
  - endpoint
  - message-queue
  - github-actions
  - idempotency
  - retry-backoff
  - alerting
see_also:
  - https://api.slack.com/messaging/webhooks
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

어떤 일이 생기면 **상대가 정해 둔 URL 로 HTTP 요청을 보내** 알려 주는 방식.

## 비유

"택배 오면 이 번호로 문자 주세요" 하고 **연락처를 미리 맡겨 두는 것**. 내가 계속 경비실에 전화해 묻지 않아도, 일이 생기면 저쪽이 먼저 알려 준다.

## 예시

Hermes 크론잡이 끝나면 Slack 웹훅으로 알림 — 우리가 웹훅을 **부르는** 쪽:

```bash
curl -X POST "https://hooks.slack.com/services/T000/B000/xxxx" \
  -H "Content-Type: application/json" \
  -d '{"text": "[hermes] 야간 백업 완료 (12분, 3.2 GB)"}'
```

반대로 우리 서버가 웹훅을 **받는** 쪽 — GitHub 에 push 가 오면 GitHub 가 우리 엔드포인트를 호출한다:

```python
@app.post("/hooks/github")
async def on_push(req: Request):
    verify_signature(req)              # 시크릿으로 서명 검증 — 아무나 못 부르게
    payload = await req.json()
    if payload["ref"] == "refs/heads/main":
        trigger_deploy()
    return {"ok": True}
```

Supabase 의 Database Webhooks 도 같은 것 — 테이블에 INSERT 가 생기면 지정한 URL(예: Edge Function)을 호출한다.

## 헷갈리기 쉬운 것

- **폴링**은 내가 주기적으로 "새 거 있어?" 하고 물어보는 것. 웹훅은 저쪽이 먼저 알려 준다.
- **API 호출**과 방향이 반대. 보통은 내가 남의 API 를 부르지만 웹훅은 남이 내 엔드포인트를 부른다. 그래서 서명 검증과 재전송 대비(멱등성)가 따라온다.
