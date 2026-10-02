---
id: rlhf
term: RLHF/DPO
aliases:
  - Reinforcement Learning from Human Feedback
  - 인간 피드백 강화학습
  - Direct Preference Optimization
  - 선호 학습
  - 정렬(alignment)
category: ai
tags:
  - LLM
  - 학습
  - 평가
level: 3
kind: concept
related:
  - fine-tuning
  - learning-paradigms
  - llm-eval
  - guardrails
  - lora
  - hallucination
see_also:
  - https://huggingface.co/docs/trl/dpo_trainer
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

사람이 **더 좋다고 고른 답변 쪽으로** 모델을 밀어 주는 LLM 마무리 학습.

## 비유

글쓰기 과외. 모범 답안을 베껴 쓰게 하는 대신(SFT) 두 편을 나란히 보여 주고 "이쪽이 낫다" 는 평가를 수백 번 반복해서 취향을 익히게 한다.

## 예시

```python
from datasets import load_dataset
from trl import DPOConfig, DPOTrainer
# 각 행: {"prompt": 질문, "chosen": 더 나은 답, "rejected": 덜 나은 답}
ds = load_dataset("json", data_files="lab_prefs.jsonl")["train"]
trainer = DPOTrainer(model=sft_model, ref_model=None, args=DPOConfig(beta=0.1),
                     train_dataset=ds, processing_class=tokenizer, peft_config=lora_cfg)
trainer.train()
```

LLM 은 사전학습 → SFT(지시 따르기) → 선호 학습 순으로 완성된다. RLHF 는 사람 선호로 보상 모델을 따로 학습한 뒤 PPO 로 본 모델을 강화학습하는 방식이라, 정책·참조·보상·가치 모델을 동시에 띄워야 해서 VRAM 이 어마어마하다. DPO 는 보상 모델 없이 선호 쌍으로 본 모델을 직접 학습해 7B 를 LoRA 로 하면 24GB 한 장에서도 돌아간다 [확인 필요]. 트레이드오프: DPO 는 싸고 안정적이지만 선호 데이터 분포 밖에서는 RLHF 만큼 유연하지 않고, 어느 쪽이든 진짜 비용은 "A 와 B 중 뭐가 나은가" 를 사람이 수백~수천 쌍 매기는 일이다. 연구실에서 받는 Qwen Instruct 는 이미 선호 학습이 끝난 모델이라, 우리가 할 일은 기껏해야 말투·형식 선호를 DPO 로 덧입히는 정도다.

## 헷갈리기 쉬운 것

- **SFT(파인튜닝)** 는 "이렇게 답해" 하고 정답을 그대로 따라 쓰게 하는 것. 선호 학습은 "A 보다 B" 비교로 배우며, 보통 SFT 다음에 한다.
- **강화학습** 일반과 RLHF 의 차이: 보상이 게임 점수 같은 환경이 아니라 사람의 선호에서 나온다. DPO 는 이름과 달리 강화학습 루프가 없다.
- **가드레일**은 모델 밖에서 거르는 필터, RLHF 는 모델 안에 안전·선호를 새기는 학습. 겹쳐 쓴다.
