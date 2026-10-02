---
id: distributed-training
term: 분산 학습
aliases:
  - Distributed Training
  - 데이터 병렬(DDP)
  - 모델 병렬
  - FSDP
  - DeepSpeed
  - 멀티 GPU 학습
category: ai
tags:
  - GPU
  - 학습
  - 분산시스템
  - 딥러닝
level: 3
kind: concept
related:
  - gpu-cuda
  - vram
  - mixed-precision
  - pytorch
  - scale-up-out
  - lora
see_also:
  - https://pytorch.org/tutorials/intermediate/ddp_tutorial.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

한 모델의 학습을 **여러 GPU 나 서버에 나눠** 동시에 돌리는 방법.

## 비유

벽화 그리기. 사람 여럿이 같은 밑그림을 들고 구역을 나눠 칠하며 주기적으로 색을 맞추는 게 데이터 병렬이고, 그림이 너무 커서 한 사람 작업대에 안 올라가면 그림 자체를 조각내 나눠 드는 게 모델 병렬이다.

## 예시

```bash
torchrun --nproc_per_node=2 train.py        # 한 서버의 GPU 2장으로 데이터 병렬(DDP)
```

```python
# train.py 핵심부
import os, torch, torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
dist.init_process_group("nccl")
rank = int(os.environ["LOCAL_RANK"]); torch.cuda.set_device(rank)
model = DDP(model.cuda(rank), device_ids=[rank])                      # GPU 마다 모델 복사본
sampler = torch.utils.data.distributed.DistributedSampler(dataset)    # 데이터만 나눠 받는다
```

데이터 병렬(DDP)은 GPU 마다 모델 전체를 복사해 두고 배치만 나누므로 "모델은 한 장에 들어가는데 더 빨리" 가 목적이다. 모델이 한 장에 안 들어가면 FSDP/DeepSpeed ZeRO 로 가중치·옵티마이저 상태를 GPU 들에 쪼개 들거나(샤딩), 층을 나눠 두는 파이프라인·텐서 병렬로 간다. 트레이드오프: GPU 가 늘수록 동기화 통신이 늘어 N 장이 N 배 빨라지지 않고, 서버를 넘어가면 네트워크(인피니밴드 유무)가 병목이 되며, 코드와 디버깅 복잡도가 확 뛴다. 연구실 현실은 GPU 서버 1대에 24GB 급 한 장이라, 분산 학습보다 LoRA·bf16·gradient checkpointing·작은 배치 + gradient accumulation 으로 한 장에 욱여넣는 게 먼저다 — 카드가 두 장 이상 생기면 그때 DDP 한 줄을 붙인다.

## 헷갈리기 쉬운 것

- **스케일 업/아웃**과 그대로 대응된다. 더 큰 GPU 한 장이 스케일 업, GPU 여러 장이 스케일 아웃(분산 학습).
- **데이터 병렬 vs 모델 병렬**: 데이터 병렬은 모델 복사·데이터 분할(속도 목적), 모델 병렬은 모델 분할(크기 목적). 모델이 한 장에 들어가면 거의 항상 데이터 병렬이 먼저다.
- **분산 추론**(vLLM 의 tensor parallel 로 큰 모델을 GPU 여러 장에 걸치는 것)은 학습이 아니라 서빙 쪽 이야기.
- `DataLoader(num_workers=8)` 은 데이터 로딩만 CPU 프로세스로 병렬화하는 것이라 GPU 분산이 아니다.
