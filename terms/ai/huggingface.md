---
id: huggingface
term: Hugging Face
aliases:
  - Hugging Face Hub
  - 허깅페이스
  - transformers
  - datasets
  - HF
category: ai
tags:
  - LLM
  - 딥러닝
  - 개발도구
level: 1
kind: tool
related:
  - pytorch
  - fine-tuning
  - lora
  - model-card
  - checkpoint
  - local-llm
  - multimodal
see_also:
  - https://huggingface.co/docs/transformers/index
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

학습된 모델과 데이터셋을 **깃허브처럼 공유하는 허브**이자 그걸 불러 쓰는 파이썬 라이브러리.

## 비유

모델계의 깃허브이자 앱스토어. 남이 몇 달 걸려 학습한 모델을 이름 하나로 받아 바로 쓰고, 내가 튜닝한 모델도 올려 둘 수 있다.

## 예시

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
name = "Qwen/Qwen2.5-0.5B-Instruct"                 # 허브 주소 = "조직/모델"
tok = AutoTokenizer.from_pretrained(name)            # 처음 한 번 내려받고 ~/.cache/huggingface 에 캐시
model = AutoModelForCausalLM.from_pretrained(name, device_map="auto")

msgs = [{"role": "user", "content": "DICOM 이 뭔지 한 줄로"}]
text = tok.apply_chat_template(msgs, tokenize=False, add_generation_prompt=True)
inputs = tok(text, return_tensors="pt").to(model.device)
out = model.generate(**inputs, max_new_tokens=60)
print(tok.decode(out[0][inputs["input_ids"].shape[-1]:], skip_special_tokens=True))
```

`from_pretrained("조직/모델")` 한 줄이 허브에서 가중치·토크나이저·설정 파일을 받아 PyTorch 모델로 만들어 준다. 라이브러리 가족은 역할별로 나뉜다 — `transformers`(모델), `datasets`(데이터), `peft`(LoRA), `trl`(파인튜닝), `accelerate`(멀티 GPU). 폐쇄망 GPU 서버는 인터넷이 없으니 노트북에서 `huggingface-cli download Qwen/Qwen2.5-0.5B-Instruct` 로 받아 옮기고 `HF_HUB_OFFLINE=1` 로 돌린다. Llama 처럼 라이선스 동의가 필요한 gated 모델은 `huggingface-cli login` 뒤에만 받아진다.

## 헷갈리기 쉬운 것

- **허브 vs transformers**: 허브는 모델이 저장된 사이트(창고), transformers 는 그걸 불러 쓰는 라이브러리. 허브에는 GGUF·Stable Diffusion 가중치처럼 transformers 로 못 여는 파일도 많다.
- **Ollama**: 허브가 창고라면 Ollama 는 서빙 도구. 같은 Qwen 이라도 허브에서는 safetensors 원본을, Ollama 는 양자화된 GGUF 를 받는다 — 그 GGUF 도 대부분 허브에 올라와 있다.
- **GitHub**: 코드는 GitHub, 수 GB 짜리 가중치는 허브. 모델 저장소도 git(LFS) 기반이라 `git clone` 이 된다.
