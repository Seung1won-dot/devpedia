---
id: message-queue
term: 메시지 큐
aliases:
  - Message Queue
  - MQ
  - 메시지 브로커
  - 작업 큐
category: backend
tags:
  - 메시지큐
  - 비동기
  - 아키텍처
level: 3
kind: concept
related:
  - stack-queue
  - microservices
  - sync-async
  - cache
  - webhook
  - event-driven-architecture
  - background-job
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

**할 일을 줄에 넣어 두면** 다른 프로세스가 나중에 꺼내 처리하는 전달 장치.

## 비유

식당 주방의 **주문서 꽂이**. 홀 직원(API)은 주문서를 꽂고 바로 다음 손님을 받고, 주방(워커)은 자기 속도로 하나씩 뽑아 요리한다.

## 예시

사용자가 PDF 를 올리면 API 는 "임베딩해 줘" 메시지만 큐에 넣고 바로 202 를 돌려주고, GPU 서버의 워커가 꺼내 처리한다:

```python
# API 쪽 (producer) — Redis 리스트를 큐로
r.lpush("embed_jobs", json.dumps({"doc_id": 17}))

# GPU 워커 쪽 (consumer) — 무한 루프
while True:
    _, raw = r.brpop("embed_jobs")          # 비어 있으면 기다림
    job = json.loads(raw)
    embed_and_store(job["doc_id"])
```

큐 덕분에 (1) 업로드 응답 시간이 GPU 작업 시간과 무관해지고, (2) 워커가 죽어도 메시지는 큐에 남고, (3) 몰릴 때 워커만 늘리면 된다. 본격적으로는 RabbitMQ·Kafka·SQS, 가볍게는 Redis 나 Postgres 테이블(`SELECT ... FOR UPDATE SKIP LOCKED`)로도 만든다.

## 헷갈리기 쉬운 것

- **웹훅**은 "일이 생기면 URL 로 알려 주는" 푸시 방식이라 받는 쪽이 꺼져 있으면 유실될 수 있다. 큐는 받는 쪽이 꺼낼 때까지 보관한다.
- **자료구조의 큐**는 한 프로그램 메모리 안의 FIFO. 메시지 큐는 그걸 프로세스·서버 사이에 걸쳐 놓은 것이라 재시도·확인 응답·영속성이 따라붙는다.
