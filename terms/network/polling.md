---
id: polling
term: 폴링/롱폴링
aliases:
  - Polling
  - Long Polling
  - 롱 폴링
  - 쇼트 폴링
  - 주기적 조회
category: network
tags:
  - HTTP
  - 비동기
  - 성능
level: 2
kind: pattern
related:
  - websocket
  - sse
  - webhook
  - react-query
  - background-job
  - rate-limit
see_also:
  - https://datatracker.ietf.org/doc/html/rfc6202
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

클라이언트가 **새 소식이 있는지 주기적으로 서버에 물어보는** 방식.

## 비유

폴링은 뒷자리 아이가 "**다 왔어요?**" 를 5분마다 묻는 것. 롱폴링은 한 번 물으면 운전자가 도착할 때(또는 30분이 지날 때)까지 대답을 미뤘다가 "다 왔다" 하고 바로 알려 주는 것.

## 예시

```python
# 학습 잡 상태를 2초마다 묻기 (쇼트 폴링) — FastAPI 백엔드 기준
import time, requests

while True:
    job = requests.get("http://gpu-server:8000/jobs/42").json()
    if job["status"] in ("done", "failed"):
        break
    time.sleep(2)
```

```ts
// React Query 는 옵션 하나로 폴링한다
useQuery({ queryKey: ["job", 42], queryFn: fetchJob, refetchInterval: 2000 })
```

구현이 제일 쉽고 어떤 프록시·방화벽도 통과하는 게 장점. 단점은 대부분의 요청이 "변한 거 없음" 으로 끝나 낭비라는 것 — 탭 500개가 2초마다 물으면 초당 250 요청이 아무 일 없이 서버를 때린다. 롱폴링은 서버가 요청을 붙들고 있다가 변화가 생기거나 20~30초가 지나면 응답하고, 클라이언트는 받자마자 다시 묻는다. HTTP 만으로 거의 실시간이 되지만, 리버스 프록시의 타임아웃을 붙드는 시간보다 길게 잡아야 한다. 변화가 뜸하면 간격을 2→4→8초로 늘리는(백오프) 게 예의다.

## 헷갈리기 쉬운 것

- **WebSocket / SSE** 는 서버가 먼저 밀어 주는(push) 방식. 변화가 잦고 즉시성이 중요하면 그쪽, 몇 초 늦어도 되고 단순함이 중요하면 폴링.
- **웹훅**은 서버→서버 push: "변하면 이 URL 로 알려 줘" 라고 등록해 둔다. 폴링의 반대 방향이지만 공개된 URL 이 있어야 해서 노트북에서 받기는 어렵다.
- **크론**은 시간표대로 작업을 돌리는 것. 주기적이라는 점만 같고, 폴링은 "상태 변화를 알아채려고" 묻는 것이다.
