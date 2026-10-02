---
id: raft
term: Raft
aliases:
  - Raft Consensus
  - 래프트
  - etcd 합의
category: distributed
tags:
  - 합의
  - 분산시스템
  - 장애허용
level: 3
kind: protocol
related:
  - consensus
  - leader-election
  - quorum
  - paxos
  - split-brain
  - kubernetes
see_also:
  - https://raft.github.io/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**리더 한 명이 로그를 받아 과반에 복제**하는 방식으로 합의하는, 이해하기 쉽게 설계된 프로토콜.

## 비유

반장 한 명만 칠판에 쓸 수 있고, 반 친구 과반이 공책에 받아 적었다고 손을 들어야 그 줄이 확정된다. 반장이 조용해지면 다른 학생이 "내가 반장 할게" 하고 투표를 부른다.

## 예시

```bash
# 3노드 etcd 클러스터에서 누가 리더인지, 임기(term)와 로그 위치 확인
etcdctl --endpoints=http://10.0.0.11:2379,http://10.0.0.12:2379,http://10.0.0.13:2379 \
  endpoint status -w table
```

출력의 `IS LEADER` 열에 `true` 가 한 줄, `RAFT TERM` 이 세 노드에서 같은 숫자로 나온다. 리더 노드를 `systemctl stop etcd` 로 끄면 나머지 둘 중 하나가 선거 타임아웃 뒤 후보가 되어 표 2개(자기 표 포함)를 얻고 새 리더가 된다 — term 숫자가 1 올라간다.

Raft 는 문제를 셋으로 나눈다. **리더 선출**(term 마다 리더 최대 한 명), **로그 복제**(리더만 쓰기를 받고 과반이 저장하면 커밋), **안전성**(최신 로그를 가진 노드만 리더가 될 수 있음). 쿠버네티스의 etcd, Consul, CockroachDB 등이 Raft 를 쓴다.

**트레이드오프**: 모든 쓰기가 리더 한 대를 거쳐 리더가 병목이고, 노드가 늘면 과반 왕복이 느려진다. 그래서 클러스터는 보통 3대나 5대로 둔다(짝수는 장애 허용 수가 늘지 않아 손해).

## 헷갈리기 쉬운 것

- **Paxos** 와 같은 문제를 풀고 장애 허용 능력도 같지만, Raft 는 "강한 리더" 를 둬서 구현과 이해가 쉽게 만든 것이 목적이다.
- **리더 선출**은 Raft 의 일부 기능이다. Raft 없이도 락이나 임대(lease)로 리더를 뽑을 수 있지만, 로그 복제까지 맞춰 주는 건 아니다.
