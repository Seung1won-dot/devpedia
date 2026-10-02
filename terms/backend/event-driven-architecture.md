---
id: event-driven-architecture
term: 이벤트 기반 아키텍처
aliases:
  - Event-Driven Architecture
  - EDA
  - 이벤트 드리븐 아키텍처
  - 발행/구독
  - Pub/Sub
category: backend
tags:
  - 메시지큐
  - 아키텍처패턴
  - 비동기
level: 3
kind: pattern
related:
  - message-queue
  - microservices
  - webhook
  - sync-async
  - observer-pattern
  - cap-theorem
  - cqrs
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

서비스끼리 직접 호출하는 대신 **일어난 사건을 큐에 발행**하고, 관심 있는 쪽이 구독해 처리하는 구조.

## 비유

이사 온 사람이 집집마다 초인종을 누르는 대신 **아파트 게시판에 "이사 왔어요" 한 장** 붙이는 것. 통장·경비실·옆집이 각자 보고 알아서 움직이고, 붙인 사람은 누가 읽는지 몰라도 된다.

## 예시

```python
# 업로드 서비스 (발행자): 누가 듣는지 모른다. 바로 202 응답
producer.send("document.uploaded", {"doc_id": 17, "owner": uid})

# 임베딩 서비스 (구독자 1) — GPU 서버에서 돈다
for ev in consumer.subscribe("document.uploaded"):
    embed(ev["doc_id"])

# 알림 서비스 (구독자 2) — 나중에 추가해도 업로드 코드는 안 건드린다
for ev in consumer.subscribe("document.uploaded"):
    notify(ev["owner"], "처리를 시작했어요")
```

동기 REST 라면 업로드 서비스가 `POST /embed` 를 부르고 GPU 작업이 끝날 때까지 기다리며, 임베딩 서버가 죽으면 업로드도 같이 실패한다. 이벤트로 바꾸면 (1) 임베딩 서버가 죽어도 업로드는 성공하고 메시지는 큐(Kafka·RabbitMQ)에 남으며, (2) 구독자를 늘려도 발행자는 그대로다(느슨한 결합). 대가는 **최종 일관성**: 업로드 직후 검색하면 아직 안 나올 수 있어 화면에 "처리 중" 이 필요하고, 같은 이벤트가 두 번 올 수 있으니(at-least-once) 구독자는 멱등하게 짠다. 요청 하나가 서비스 여러 개를 거치므로 추적 ID 없이는 디버깅이 어렵다. 면접에서는 "동기 호출 대신 이벤트를 쓰면 얻는 것과 잃는 것은?" 으로 나온다.

## 헷갈리기 쉬운 것

- **메시지 큐**는 도구, 이벤트 기반 아키텍처는 그 도구로 시스템을 짜는 방식. Kafka 는 이벤트를 로그로 보관해 다시 읽을 수 있고, RabbitMQ 는 전달 확인 뒤 지운다.
- **웹훅**은 브로커 없이 상대 URL 로 직접 HTTP 를 쏘는 것. 회사 밖(GitHub → 내 서버)으로 알릴 때 쓰고, 상대가 꺼져 있으면 유실될 수 있다.
- **옵저버 패턴**은 같은 발행/구독 아이디어를 한 프로세스 메모리 안에서 객체끼리 하는 것. 이벤트 기반 아키텍처는 그걸 네트워크 너머 서비스 사이로 넓힌 것이다.
