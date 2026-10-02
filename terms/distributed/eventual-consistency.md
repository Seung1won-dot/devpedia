---
id: eventual-consistency
term: 최종 일관성
aliases:
  - Eventual Consistency
  - 결과적 일관성
  - 궁극적 일관성
category: distributed
tags:
  - 일관성
  - 분산시스템
  - NoSQL
level: 2
kind: concept
related:
  - consistency-models
  - cap-theorem
  - dns
  - replication
  - cache
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

잠시 사본끼리 값이 달라도 **새 쓰기가 멈추면 결국 모두 같아진다**는 약한 보장.

## 비유

단체 메일로 일정 변경을 알리면 바로 읽은 사람, 저녁에 읽은 사람이 섞여 한동안 서로 다른 일정을 알고 있다. 그래도 다음 날쯤이면 모두 새 일정을 안다.

## 예시

가장 익숙한 예는 **DNS** 다. 연구실 서비스 도메인의 A 레코드를 새 서버 IP 로 바꿔도, 전 세계 DNS 캐시가 TTL 만큼 옛 IP 를 들고 있다.

```bash
# 서로 다른 리졸버에 물어보면 한동안 다른 답이 나온다
dig +short lab.example.org @8.8.8.8
dig +short lab.example.org @1.1.1.1
```

SNS 좋아요 수, 상품 조회수, 읽기 전용 복제본(replica)에서 읽는 대시보드도 마찬가지다. 몇 초 어긋나도 아무도 손해 보지 않는 곳에 쓰면, 쓰기가 빠르고 네트워크가 끊겨도 각자 계속 응답할 수 있다.

## 헷갈리기 쉬운 것

- "최종" 은 **언제** 같아지는지 약속하지 않는다. 복제 지연이 1초일 수도 10분일 수도 있으니, 지연을 모니터링하는 게 따로 필요하다.
- 같은 키에 두 곳에서 동시에 쓰면 무엇이 이기는지(마지막 쓰기 승리, 병합 등) 규칙이 따로 있어야 한다. 최종 일관성 자체는 "같아진다" 만 말할 뿐 "올바른 값으로" 를 보장하지 않는다.
- **강한 일관성**과의 비교는 일관성 모델 카드를 보자.
