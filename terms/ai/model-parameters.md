---
id: model-parameters
term: 파라미터(7B/70B)
aliases:
  - Parameters
  - Weights
  - 매개변수
  - 가중치
category: ai
tags:
  - LLM
  - GPU
level: 1
kind: concept
related:
  - llm
  - quantization
  - vram
  - token
  - local-llm
  - moe
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

모델 안에 들어 있는 **학습된 숫자(가중치)의 개수**로, 7B 는 약 70억 개.

## 비유

라디오의 다이얼 개수. 다이얼이 많을수록 소리를 정교하게 맞출 수 있지만, 라디오가 그만큼 크고 무거워진다.

## 예시

```bash
ollama list
# NAME              SIZE
# qwen2.5:7b        4.7 GB   ← 7B, 4bit 양자화
# qwen2.5:72b       47 GB    ← 72B, 4bit 양자화
```

파라미터 1개가 16bit(2바이트)면 7B 는 약 14GB, 4bit 로 줄이면 약 4~5GB. 파라미터 수를 알면 VRAM 이 얼마나 필요한지 바로 어림잡을 수 있다.

## 헷갈리기 쉬운 것

- **토큰**은 모델이 읽고 쓰는 글의 단위, 파라미터는 모델 자체의 크기. "7B 모델이 32K 토큰을 읽는다" 에서 앞이 파라미터, 뒤가 토큰.
- **하이퍼파라미터**는 학습 전에 사람이 정하는 설정값(학습률, epoch 수). 파라미터는 학습으로 채워지는 값.
