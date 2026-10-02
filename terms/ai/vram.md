---
id: vram
term: GPU 메모리(VRAM)
aliases:
  - VRAM
  - Video RAM
  - GPU 메모리
  - 그래픽 메모리
category: ai
tags:
  - GPU
  - 하드웨어
  - 서빙
  - 연구실
level: 1
kind: concept
related:
  - gpu-cuda
  - quantization
  - model-parameters
  - ram
  - local-llm
  - mixed-precision
  - kv-cache
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

GPU 에 붙어 있는 전용 메모리로, **모델이 통째로 들어가야** LLM 이 돌아간다.

## 비유

작업대 크기. 도구(모델)가 작업대에 다 올라가야 일을 시작할 수 있고, 안 올라가면 바닥(일반 RAM)에 두고 왔다 갔다 해야 해서 수십 배 느려진다.

## 예시

```bash
nvidia-smi --query-gpu=name,memory.used,memory.total --format=csv
# name, memory.used [MiB], memory.total [MiB]
# NVIDIA GeForce RTX 4090, 5860 MiB, 24564 MiB    ← qwen2.5:7b(4bit) 올린 상태
```

대략 "파라미터 수 × 파라미터당 바이트 + 컨텍스트용 여유" 로 어림잡는다. 7B 4bit 는 약 5~6GB, 7B 16bit 는 약 15GB, 72B 4bit 는 약 45GB 라 24GB 카드 한 장으로는 안 올라간다 [확인 필요].

## 헷갈리기 쉬운 것

- **RAM** 은 CPU 쪽 메모리. VRAM 이 모자라면 Ollama 가 일부를 RAM 으로 넘겨 돌리긴 하는데, 그 순간 속도가 확 떨어진다.
- **GPU 연산 속도(TFLOPS)** 와 VRAM 은 별개. LLM 은 대개 "돌아가느냐" 를 VRAM 이 정하고, "얼마나 빠르냐" 를 연산 속도와 메모리 대역폭이 정한다.
