---
id: quantization
term: 양자화(GGUF/4bit)
aliases:
  - Quantization
  - GGUF
  - 양자화
  - 4bit 양자화
category: ai
tags:
  - LLM
  - 서빙
  - GPU
level: 2
related:
  - model-parameters
  - vram
  - local-llm
  - lora
  - llm
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

모델 숫자를 **더 짧은 자릿수로 줄여** 용량과 VRAM 을 아끼는 압축 기법.

## 비유

3.14159265 를 3.14 로 적는 것. 자리는 훨씬 덜 차지하고, 웬만한 계산엔 차이가 거의 안 난다.

## 예시

```bash
# 같은 7B 모델, 양자화 정도별 용량 (Ollama 태그)
ollama pull qwen2.5:7b-instruct-fp16      # 약 15 GB
ollama pull qwen2.5:7b-instruct-q8_0      # 약 8 GB
ollama pull qwen2.5:7b-instruct-q4_K_M    # 약 4.7 GB  ← 기본 태그
```

16bit → 4bit 로 줄이면 VRAM 이 약 1/3~1/4 로 줄어 8GB 카드에서도 7B 가 돌아간다. GGUF 는 이렇게 양자화한 모델을 담는 파일 형식(llama.cpp/Ollama 용).

## 헷갈리기 쉬운 것

- **LoRA** 는 학습을 싸게 하는 것, 양자화는 실행을 싸게 하는 것. 둘을 합친 게 QLoRA.
- **GGUF 와 safetensors**: GGUF 는 양자화된 실행용 파일, safetensors 는 Hugging Face 의 원본(보통 16bit) 저장 형식.
