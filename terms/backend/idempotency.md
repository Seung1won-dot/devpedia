---
id: idempotency
term: 멱등성
aliases:
  - Idempotency
  - 멱등
  - 아이덤포턴시
  - 멱등 연산
category: backend
tags:
  - API설계
  - REST
level: 3
related:
  - rest
  - webhook
  - message-queue
  - transaction-acid
  - http
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/Idempotent
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**같은 요청을 여러 번 보내도 결과가 한 번 보낸 것과 같은** 성질.

## 비유

엘리베이터 **5층 버튼**. 한 번 누르나 열 번 누르나 5층에 한 번 서지, 누를 때마다 5층씩 더 올라가는 버튼(멱등하지 않음)이면 곤란하다.

## 예시

결제 요청에 타임아웃이 나서 클라이언트가 재시도하면 두 번 결제될 수 있다. 그래서 **멱등 키**를 붙인다:

```http
POST /payments HTTP/1.1
Idempotency-Key: 7f3a9c1e-order-1042
Content-Type: application/json

{ "order_id": 1042, "amount": 12000 }
```

서버는 키를 Redis/DB 에 저장해 두고, 같은 키가 또 오면 새로 처리하지 않고 **첫 번째 응답을 그대로** 돌려준다.

HTTP 메서드 자체에도 이 성질이 정해져 있다:

- `GET` `PUT` `DELETE` — 멱등 (두 번 해도 상태가 같음)
- `POST` — 멱등 아님 (보통 매번 새 자원 생성)
- `PATCH` — 경우에 따라 (`count += 1` 이면 아님, `count = 5` 면 멱등)

웹훅 수신부와 큐 워커도 같은 이유로 멱등해야 한다 — 보내는 쪽이 "정확히 한 번"을 보장하지 못하고 재전송하기 때문이다.

## 헷갈리기 쉬운 것

- **안전(safe)한 메서드**(GET, HEAD)는 "서버 상태를 아예 안 바꿈". 멱등은 "바꾸더라도 여러 번 = 한 번". DELETE 는 멱등이지만 안전하진 않다.
- **트랜잭션**은 여러 작업을 "전부 아니면 전무"로 묶는 것. 멱등성은 같은 작업이 반복돼도 괜찮게 만드는 것 — 재시도가 안전하려면 둘 다 필요하다.
