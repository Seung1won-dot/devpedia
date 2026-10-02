---
id: paxos
term: Paxos
aliases:
  - Paxos Algorithm
  - 팍소스
  - Multi-Paxos
category: distributed
tags:
  - 합의
  - 분산시스템
  - 장애허용
level: 3
kind: protocol
related:
  - consensus
  - raft
  - quorum
  - leader-election
see_also:
  - https://lamport.azurewebsites.net/pubs/paxos-simple.pdf
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**제안 번호와 두 단계 투표**로 과반의 동의를 얻어 값 하나를 확정하는 고전적 합의 프로토콜.

## 비유

회의에서 안건을 낼 때 먼저 "제 번호표는 7번인데, 이보다 작은 번호 안건은 더 받지 말아 주세요" 하고 약속을 받고(1단계), 과반이 약속하면 그제야 "이 안으로 갑시다" 를 정식으로 올린다(2단계).

## 예시

역할은 제안자(Proposer)·수락자(Acceptor)·학습자(Learner) 셋이다.

1. **Prepare**: 제안자가 번호 n 을 골라 수락자들에게 보낸다. 수락자는 "n 보다 작은 건 이제 안 받겠다" 고 약속하며, 이미 받아 둔 값이 있으면 같이 알려 준다.
2. **Accept**: 과반의 약속을 받으면, 이미 받아 둔 값이 있었다면 그 값을, 없으면 자기 값을 n 번으로 요청한다. 과반이 수락하면 확정이다.

이 "이미 있던 값을 이어받는" 규칙 덕분에 제안자가 여럿이 동시에 달려들어도 두 값이 확정되는 일은 없다. 실무에서는 값 하나가 아니라 로그를 계속 쌓아야 하므로 리더를 고정해 1단계를 생략하는 **Multi-Paxos** 형태로 쓴다. Google Chubby·Spanner 가 Paxos 계열로 알려져 있다 [확인 필요].

**트레이드오프**: 이론적으로 단단하고 변형이 많아 유연하지만, 논문만으로는 로그 복제·멤버 변경 같은 실전 부분이 비어 있어 구현마다 제각각이 된다. 새로 만든다면 대개 Raft 를 고른다.

## 헷갈리기 쉬운 것

- **Raft** 와 비교하면: Paxos 는 누구나 제안할 수 있는 대칭 구조에서 출발하고, Raft 는 처음부터 리더 한 명을 전제로 한다. Multi-Paxos 는 결국 Raft 와 꽤 비슷해진다.
- **2단계 커밋(2PC)** 도 "두 단계" 지만 참여자 **전원**의 찬성이 필요하고 조정자가 죽으면 멈춘다. Paxos 는 **과반**만 있으면 진행한다.
