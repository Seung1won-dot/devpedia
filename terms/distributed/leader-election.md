---
id: leader-election
term: 리더 선출
aliases:
  - Leader Election
  - 마스터 선출
  - 프라이머리 선출
category: distributed
tags:
  - 합의
  - 분산시스템
  - 장애허용
level: 2
kind: concept
related:
  - raft
  - heartbeat
  - split-brain
  - distributed-lock
  - quorum
  - kubernetes
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

여러 서버 중 **일을 지휘할 한 대를 뽑고**, 그 한 대가 죽으면 새로 뽑는 절차.

## 비유

조별 과제에서 조장을 뽑고, 조장이 연락 두절되면 남은 조원끼리 다시 조장을 정하는 것. 핵심은 "조장이 동시에 두 명" 인 상황을 막는 것이다.

## 예시

쿠버네티스는 컨트롤러가 여러 개 떠 있어도 실제로 일하는 건 한 개뿐이다. 누가 리더인지는 Lease 객체에 적혀 있다.

```bash
kubectl -n kube-system get lease kube-controller-manager -o yaml
# spec.holderIdentity: 지금 리더인 파드 이름
# spec.renewTime: 리더가 마지막으로 "나 살아 있음" 을 갱신한 시각
```

리더는 주기적으로 renewTime 을 갱신하고, 정해진 시간 동안 갱신이 없으면 다른 후보가 Lease 를 가져가 새 리더가 된다. 연구실 배치 작업(매일 밤 EMR 추출)도 워커 3대 중 한 대만 돌아야 한다면 같은 원리를 쓴다 — Redis 키나 DB 락으로 "리더 자리" 를 잡는다.

## 헷갈리기 쉬운 것

- **Raft 의 리더 선출**은 투표·임기(term)·과반으로 리더가 둘이 될 수 없음을 보장한다. 락이나 Lease 기반 선출은 시계 차이·GC 멈춤 때문에 잠깐 리더가 둘이 될 수 있어서 펜싱 토큰 같은 보완이 필요하다.
- **로드 밸런서**는 요청을 여러 대에 고르게 나누는 것이고, 리더 선출은 오히려 한 대에만 일을 몰아주는 것이다.
