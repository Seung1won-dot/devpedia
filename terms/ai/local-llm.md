---
id: local-llm
term: 로컬 LLM(Ollama/vLLM)
aliases:
  - Local LLM
  - Ollama
  - vLLM
  - 로컬 LLM
category: ai
tags:
  - 서빙
  - LLM
  - GPU
  - 연구실
level: 1
kind: tool
related:
  - llm
  - quantization
  - vram
  - gpu-cuda
  - air-gapped-network
  - streaming-response
see_also:
  - https://github.com/ollama/ollama
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

외부 API 대신 **내 컴퓨터나 연구실 서버에서 직접 돌리는** LLM.

## 비유

배달 음식 대신 집에서 직접 요리하기. 재료(모델)만 받아 오면 돈이 안 들고 무엇을 먹었는지 밖으로 새지 않지만, 주방(GPU)이 있어야 한다.

## 예시

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama run qwen2.5:7b            # 모델 자동 다운로드(약 4.7GB) 후 대화
curl http://localhost:11434/api/generate -d '{"model":"qwen2.5:7b","prompt":"안녕"}'
```

연구실 GPU 서버에 Ollama 를 올리면 11434 포트로 API 가 열린다. 개인 실험은 Ollama, 여러 명이 동시에 쓰는 서비스는 처리량이 훨씬 좋은 vLLM 이 낫고, 의료 데이터처럼 밖으로 못 보내는 자료는 로컬이 사실상 유일한 선택.

## 헷갈리기 쉬운 것

- **오픈 웨이트 모델**(Qwen, Llama)은 내려받을 수 있는 모델 자체. 로컬 LLM 은 그걸 내 장비에서 돌리는 방식이고, 오픈 모델을 클라우드 API 로 쓸 수도 있다.
- **Ollama 와 vLLM**: Ollama 는 설치 한 줄로 끝나는 개인용, vLLM 은 동시 요청을 많이 받는 서버용. vLLM 은 기본 설정으로 VRAM 을 거의 다 미리 잡아 둔다 [확인 필요].
