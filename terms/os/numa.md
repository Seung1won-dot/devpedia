---
id: numa
term: NUMA
aliases:
  - Non-Uniform Memory Access
  - 비균일 메모리 접근
  - NUMA 노드
  - numactl
category: os
tags:
  - 하드웨어
  - 메모리
  - 컴퓨터구조
  - GPU
level: 3
kind: concept
related:
  - gpu-cuda
  - memory-hierarchy
  - cpu
  - locality
  - bare-metal
  - distributed-training
see_also:
  - https://man7.org/linux/man-pages/man7/numa.7.html
  - https://docs.kernel.org/mm/numa.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

CPU 소켓마다 **가까운 메모리와 먼 메모리가 따로 있어** 접근 속도가 다른 서버 구조.

## 비유

큰 사무실을 **두 층으로 나눠 층마다 캐비닛(메모리)** 을 둔 것. 내 층 캐비닛은 바로 꺼내지만 다른 층 서류는 계단을 오르내려야 해서, 같은 서류라도 어디 있느냐에 따라 걸리는 시간이 다르다.

## 예시

```bash
lscpu | grep -i numa                    # NUMA node(s): 2 / node0 CPU(s): 0-31 / node1 CPU(s): 32-63
numactl --hardware                      # 노드별 메모리 용량과 노드 간 거리(distance) 표
nvidia-smi topo -m                      # 각 GPU 가 어느 CPU 소켓(NUMA 노드)에 물려 있나
numactl --cpunodebind=0 --membind=0 python train.py    # GPU0 과 같은 노드의 코어·메모리만 쓰기
numastat -p $(pgrep -n python)          # 이 프로세스가 먼 노드 메모리를 얼마나 쓰고 있나
```

CPU 가 2개 꽂힌 GPU 서버는 GPU 절반이 소켓 0 에, 나머지가 소켓 1 에 PCIe 로 붙는다. 데이터 로더가 반대쪽 소켓 코어에서 돌면 RAM→GPU 로 가는 데이터가 소켓 사이 연결(UPI)을 건너야 해서 학습 속도가 눈에 띄게 떨어질 수 있다 [확인 필요]. 리눅스 기본 정책은 "처음 만진 CPU 의 노드에 메모리를 할당" 이라 보통은 가까운 쪽을 쓰지만, 스레드가 소켓을 넘나들면 깨진다. 트레이드오프: 노드에 고정(bind)하면 지역성은 좋아지지만 그 노드의 메모리(전체의 절반)만 쓸 수 있고 반대쪽 코어는 논다. 메모리를 많이 먹는 작업은 `--interleave=all` 로 양쪽에 고르게 펴는 게 낫고, 소켓이 1개인 워크스테이션은 노드가 하나라 신경 쓸 일이 없다.

## 헷갈리기 쉬운 것

- **UMA/SMP**: 모든 CPU 가 메모리에 같은 속도로 닿는 구조 — 소켓 1개짜리 PC 가 이것. NUMA 는 소켓 2개 이상 서버의 이야기.
- **메모리 계층(캐시)** 은 L1→L2→L3→RAM 의 속도 계층이고, NUMA 는 같은 RAM 안에서도 "내 쪽/남의 쪽" 거리가 다르다는 것.
- **분산 학습의 "노드"** 는 서버 한 대를 뜻한다. NUMA 노드는 한 서버 안의 소켓 단위라 단어만 같다.
