---
id: mixed-precision
term: fp16/bf16 혼합 정밀도
aliases:
  - Mixed Precision
  - 혼합 정밀도
  - AMP
  - bf16
  - fp16
category: ai
tags:
  - GPU
  - 학습
  - 딥러닝
level: 2
kind: concept
related:
  - vram
  - quantization
  - floating-point
  - pytorch
  - gpu-cuda
  - distributed-training
see_also:
  - https://pytorch.org/docs/stable/amp.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

대부분 계산은 **16비트로, 중요한 값만 32비트로** 두어 VRAM 과 시간을 아끼는 학습 기법.

## 비유

장보기 메모는 대충 어림수로 적고(16비트), 가계부 합계만 원 단위로 정확히 적는 것(32비트). 메모는 빨라지고 합계는 틀어지지 않는다.

## 예시

```python
import torch
for x, y in loader:
    with torch.autocast("cuda", dtype=torch.bfloat16):   # 순전파·역전파 계산은 bf16
        loss = loss_fn(model(x), y)
    loss.backward()                                       # 가중치·옵티마이저 상태는 fp32 그대로
    optimizer.step(); optimizer.zero_grad()
```

중간 계산값(활성값) 메모리가 절반으로 줄고, 텐서 코어가 16비트 연산을 훨씬 빨리 처리한다 [확인 필요]. fp16 은 표현 범위가 좁아 작은 기울기가 0 이 되거나 inf 가 터지므로 `GradScaler` 로 손실을 키웠다 되돌리는 과정이 필요하고, bf16 은 범위가 fp32 와 같아 그냥 쓰면 되지만 RTX 30xx/A100 이후 GPU 에서만 빠르다 [확인 필요]. 연구실 24GB 카드에서 7B 를 LoRA 로 튜닝할 때 bf16 이 사실상 기본값이다.

## 헷갈리기 쉬운 것

- **양자화**는 다 만든 모델을 4bit/8bit 로 줄여 추론을 싸게 하는 것. 혼합 정밀도는 학습 중 계산 정밀도를 낮추는 것이고, 저장되는 모델은 보통 fp32 나 bf16 이다.
- **fp16 vs bf16**: 둘 다 16비트지만 자릿수 배분이 다르다. fp16 은 소수점이 정밀하고 범위가 좁고, bf16 은 범위가 넓고 소수점이 거칠다 — 학습에는 bf16 이 편하다.
- "혼합" 이라는 말대로 전부 16비트가 아니다. 마스터 가중치와 옵티마이저 상태는 32비트라 VRAM 이 정확히 절반으로 줄지는 않는다.
