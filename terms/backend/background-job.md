---
id: background-job
term: 백그라운드 작업/워커
aliases:
  - Background Job
  - 백그라운드 태스크
  - 워커
  - 작업 큐
  - Celery
category: backend
tags:
  - 비동기
  - 메시지큐
  - 아키텍처
  - Python
level: 2
kind: pattern
related:
  - message-queue
  - redis
  - retry-backoff
  - cron
  - idempotency
  - sync-async
see_also:
  - https://docs.celeryq.dev/en/stable/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

오래 걸리는 일을 **요청 응답과 분리해 별도 프로세스(워커)가 나중에 처리**하게 하는 방식.

## 비유

세탁소 접수. 옷을 맡기면 번호표만 받고 바로 나오고, 뒤에서 직원이 순서대로 세탁한 뒤 "다 됐어요" 문자를 보낸다.

## 예시

CT 한 건 세그멘테이션에 몇 분이 걸리는데 HTTP 요청을 그동안 붙잡고 있으면 타임아웃이 난다. Celery + Redis 로 떼어 낸다:

```python
# tasks.py
from celery import Celery

app = Celery("lab", broker="redis://localhost:6379/0", backend="redis://localhost:6379/1")

@app.task(bind=True, max_retries=3)
def segment_ct(self, study_uid: str):
    ...  # DICOM 불러와 모델 추론, 결과를 DB 에 저장
    return {"study_uid": study_uid, "status": "done"}
```

```python
# FastAPI 쪽: 큐에 넣고 202 로 즉시 응답
@app.post("/segment", status_code=202)
def enqueue(study_uid: str):
    result = segment_ct.delay(study_uid)
    return {"task_id": result.id}
```

```bash
celery -A tasks worker --loglevel=info --concurrency=2
```

클라이언트는 `task_id` 로 `/tasks/{id}` 를 폴링하거나 웹훅으로 완료를 받는다. 워커는 API 서버와 다른 머신(GPU 서버)에서 따로 돌리고 따로 늘릴 수 있다. 워커가 죽거나 실패하면 큐가 작업을 다시 넘기므로, **작업은 멱등**해야 한다. Celery 는 Windows 를 공식 지원하지 않아 연구실 노트북에서는 WSL 이나 Docker 로 돌린다 [확인 필요]. 가벼운 대안으로 RQ, arq, Dramatiq 이 있다.

## 헷갈리기 쉬운 것

- **FastAPI `BackgroundTasks`** 는 응답을 보낸 뒤 같은 프로세스 안에서 함수를 돌린다. 서버가 재시작되면 사라지고 GPU 를 몇 분 쓰는 일은 요청 처리까지 느리게 만든다. 메일 한 통 보내기 정도에만 맞다.
- **크론**은 "매일 새벽 3시"처럼 시간이 트리거다. 백그라운드 작업은 요청이나 이벤트가 트리거이고, Celery beat 를 붙이면 크론 역할도 한다.
- **async/await** 는 한 프로세스 안에서 I/O 를 기다리는 동안 다른 요청을 처리하는 기법. CPU·GPU 를 오래 쓰는 계산은 async 로 해결되지 않고 워커로 빼야 한다.
