---
id: lora
term: LoRA
aliases:
  - Low-Rank Adaptation
  - 로라
  - LoRA 어댑터
category: ai
tags:
  - 학습
  - LLM
  - GPU
level: 3
kind: concept
related:
  - fine-tuning
  - quantization
  - vram
  - model-parameters
  - gpu-cuda
see_also:
  - https://huggingface.co/docs/peft/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

원본 가중치는 얼려 두고 **작은 덧붙임 행렬만 학습**하는 저비용 파인튜닝 기법.

## 비유

두꺼운 교과서에 글자를 고쳐 쓰는 대신 얇은 포스트잇을 붙이는 것. 원본은 그대로라 포스트잇만 떼면 되돌아가고, 다른 포스트잇 세트로 바꿔 붙일 수도 있다.

## 예시

```python
from peft import LoraConfig, get_peft_model
config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(base_model, config)
model.print_trainable_parameters()
# trainable: 약 5M / all: 7.6B (약 0.07%)  [확인 필요]
```

7B 전체(76억 개)를 학습하면 VRAM 이 수십~백 GB 넘게 필요하지만, LoRA 는 0.1% 안팎만 학습해 24GB 카드 한 장으로도 돌아간다 [확인 필요]. 결과물(어댑터)은 수십 MB 라 공유도 쉽다.

## 헷갈리기 쉬운 것

- **QLoRA** 는 원본을 4bit 로 양자화해 놓고 LoRA 를 붙이는 것. VRAM 을 더 아낀다.
- **전체 파인튜닝**은 모든 가중치를 고친다. LoRA 는 파인튜닝을 싸게 하는 방법 중 하나이지 다른 종류의 일이 아니다.
