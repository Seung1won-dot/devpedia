---
id: fallacies-of-distributed-computing
term: 분산 컴퓨팅의 오해 8가지
aliases:
  - Fallacies of Distributed Computing
  - 분산 컴퓨팅의 8가지 오류
  - 네트워크는 믿을 만하다
category: distributed
tags:
  - 분산시스템
  - 장애허용
  - 흔한실수
level: 2
kind: concept
related:
  - distributed-system
  - latency-bandwidth
  - retry-backoff
  - circuit-breaker
  - heartbeat
  - tracing
see_also:
  - https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

분산 시스템을 처음 만들 때 **무심코 참이라고 가정하는 여덟 가지 착각** 목록.

## 비유

택배를 보내며 "당연히 하루 만에, 안 깨지고, 공짜로 도착하겠지" 하고 포장을 대충 하는 것. 사고는 드물지만 매일 수천 개를 보내면 반드시 난다.

## 예시

여덟 가지는 이렇다.

1. 네트워크는 믿을 만하다
2. 지연 시간은 0 이다
3. 대역폭은 무한하다
4. 네트워크는 안전하다
5. 구성(토폴로지)은 바뀌지 않는다
6. 관리자는 한 명이다
7. 전송 비용은 0 이다
8. 네트워크는 균질하다

연구실에서 흔한 사고: FastAPI 서버가 GPU 서버의 vLLM 을 `requests.post()` 로 부르면서 타임아웃을 안 걸었다(1·2번 착각). GPU 서버 스위치가 잠깐 끊기자 요청 스레드가 전부 무한 대기로 묶여 웹 서버까지 멈췄다. 처방은 타임아웃 + 재시도/백오프 + 서킷 브레이커, 그리고 "응답이 없다 = 실패인지 지연인지 모른다" 를 전제로 설계하는 것이다.

## 헷갈리기 쉬운 것

- **CAP 이론**은 "끊기면 무엇을 포기할지" 라는 증명된 한계이고, 이 목록은 "끊길 수 있다는 걸 잊는다" 는 사람의 실수 목록이다. 이론이 아니라 체크리스트로 쓴다.
- "로컬 함수 호출처럼 보이는 원격 호출"(gRPC 스텁, ORM 지연 로딩)이 이 착각을 가장 쉽게 부른다. 코드 모양이 같아도 실패 방식은 전혀 다르다.
