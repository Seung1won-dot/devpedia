---
id: fine-tuning
term: 사전학습/파인튜닝
aliases:
  - Fine-tuning
  - Pre-training
  - 파인튜닝
  - 미세조정
category: ai
tags:
  - 학습
  - LLM
level: 2
kind: concept
related:
  - lora
  - rag
  - training-inference
  - llm
  - vram
  - rlhf
see_also:
  - https://huggingface.co/docs/trl/sft_trainer
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

이미 학습된 모델을 **내 데이터로 조금 더 학습**시켜 말투나 전문 분야를 맞추는 것.

## 비유

사전학습은 대학 졸업까지의 일반 교육, 파인튜닝은 입사 후 받는 몇 주짜리 직무 교육. 기초는 그대로 두고 우리 회사 방식만 익힌다.

## 예시

```python
from datasets import load_dataset
from peft import LoraConfig
from trl import SFTTrainer
ds = load_dataset("json", data_files="lab_qa.jsonl")["train"]   # 연구실 Q&A 500쌍
trainer = SFTTrainer(model="Qwen/Qwen2.5-7B-Instruct", train_dataset=ds, peft_config=LoraConfig(r=16))
trainer.train()
```

연구실 질문-답변 데이터로 Qwen 을 튜닝하는 뼈대. 7B 를 LoRA 로 튜닝하면 VRAM 약 16~24GB [확인 필요], 전체 파인튜닝은 그보다 훨씬 많이 든다.

## 헷갈리기 쉬운 것

- **RAG** 는 모델은 안 건드리고 참고 문서를 붙이는 것. 자료가 자주 바뀌면 RAG, 말투·형식·전문 용어 습관을 바꾸려면 파인튜닝.
- **사전학습(pre-training)** 은 처음부터 인터넷 규모의 글로 학습하는 단계라 연구실에서 할 일은 거의 없다. 우리가 하는 건 거의 다 파인튜닝.
