---
id: clock-skew
term: 시계 차이 · 논리 시계
aliases:
  - Clock Skew
  - 램포트 시계
  - Lamport Clock
  - 벡터 시계
  - Vector Clock
  - NTP
category: distributed
tags:
  - 분산시스템
  - 일관성
  - 동기화
level: 3
kind: concept
related:
  - consistency-models
  - distributed-lock
  - eventual-consistency
  - tracing
  - logging
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

서버마다 **시계가 조금씩 달라** 시각만으로 사건 순서를 정할 수 없는 문제와 그 대안.

## 비유

친구들 손목시계가 1~2분씩 달라서 "누가 먼저 도착했나" 를 시계로 다투면 답이 안 나온다. 대신 도착할 때마다 번호표를 하나씩 올려 받으면 순서는 확실해진다 — 이게 논리 시계다.

## 예시

```bash
# 서버 시계가 NTP 기준과 얼마나 어긋났는지 확인 (Ubuntu, chrony)
chronyc tracking      # "System time" 줄이 오차
timedatectl status    # "System clock synchronized: yes" 인지
```

NTP 로 맞춰도 수 밀리초 오차는 남고, 동기화가 꺼진 VM 은 몇 초씩 밀린다. 그래서 두 서버 로그를 시각으로 합치면 "응답이 요청보다 먼저" 찍히는 일이 생기고, 마지막 쓰기 승리(LWW) DB 는 시계가 빠른 서버의 옛 값이 새 값을 덮어쓴다.

**램포트 시계**: 각자 카운터를 들고, 사건마다 +1, 메시지를 받으면 `max(내 값, 받은 값) + 1`. A 가 B 의 원인이면 A 의 숫자가 반드시 작다. 반대는 성립하지 않는다(숫자가 작다고 원인은 아님).
**벡터 시계**: 노드별 카운터 배열을 들고 다녀서 "A 가 B 보다 먼저" 와 "둘은 동시(무관)" 를 구분한다. 충돌 감지에 쓰지만 노드 수만큼 크기가 커진다.

**트레이드오프**: 물리 시계는 사람이 읽기 좋고 싸지만 순서 판단엔 위험하고, 논리 시계는 순서는 정확하지만 실제 시각을 모른다. 둘을 섞은 하이브리드 논리 시계(HLC)를 쓰는 DB 도 있다 [확인 필요].

## 헷갈리기 쉬운 것

- **시간대(타임존) 차이**는 표시 문제라 UTC 로 저장하면 끝나지만, 시계 차이는 같은 UTC 에서도 하드웨어가 다르게 흘러가는 문제다.
- 분산 락 만료나 리스(lease) 기반 리더 선출은 "상대 시계도 대충 맞다" 를 가정한다. 시계가 크게 튀면 리더가 둘이 될 수 있다.
