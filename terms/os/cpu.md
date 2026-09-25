---
id: cpu
term: CPU
aliases:
  - Central Processing Unit
  - 중앙처리장치
  - 프로세서
category: os
tags:
  - 하드웨어
level: 1
related:
  - ram
  - cache-memory
  - process
  - thread
  - gpu-cuda
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

프로그램의 **명령을 하나씩 읽어 계산하고 실행**하는 컴퓨터의 두뇌.

## 비유

주방의 **요리사**. 레시피(프로그램)를 한 줄씩 읽고 재료를 손질해 요리를 만드는데, 요리사가 빠를수록 음식이 빨리 나온다.

## 예시

```bash
# 연구실 GPU 서버에 SSH 접속 후 CPU 확인
lscpu | grep -E "Model name|^CPU\(s\)|Thread"
nproc            # 쓸 수 있는 논리 코어 수
htop             # 코어별 사용률 실시간 보기
```

Proxmox 에서 VM 만들 때 "코어 4개" 를 주는 건 호스트 CPU 코어 일부를 빌려주는 것. 딥러닝 학습은 GPU 가 하지만 데이터 로딩·전처리는 CPU 가 하므로, DataLoader 의 `num_workers` 는 코어 수를 보고 정한다.

## 헷갈리기 쉬운 것

- **GPU** 는 단순 계산을 수천 개 동시에 하는 데 특화, CPU 는 복잡한 일을 몇 개씩 빠르게. 모델 학습은 GPU, 서버 운영·일반 프로그램은 CPU.
- **코어**는 CPU 안의 독립된 계산 단위. "8코어 CPU" 는 요리사 8명이 한 주방에 있는 것.
