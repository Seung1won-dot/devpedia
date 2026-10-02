---
id: kv-cache
term: KV 캐시
aliases:
  - KV Cache
  - Key-Value 캐시
  - 키-값 캐시(어텐션)
  - 프리픽스 캐시
category: ai
tags:
  - LLM
  - 서빙
  - GPU
  - 캐시
level: 3
kind: concept
related:
  - transformer
  - context-window
  - vram
  - local-llm
  - token
  - speculative-decoding
see_also:
  - https://huggingface.co/docs/transformers/kv_cache
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

앞 토큰들의 **어텐션 키·값을 저장해 두고** 다음 토큰을 만들 때 재사용하는 메모리.

## 비유

긴 덧셈을 하면서 지금까지의 합계를 메모해 두는 것. 숫자 하나 더할 때마다 처음부터 다시 더하지 않고 메모된 합계에 새 숫자만 더하는데, 대신 메모지가 필요하다.

## 예시

```python
# Qwen2.5-7B: 28층, KV 헤드 4개(GQA), 헤드 차원 128, bf16 = 2바이트  [확인 필요]
layers, kv_heads, head_dim, nbytes = 28, 4, 128, 2
per_token = 2 * layers * kv_heads * head_dim * nbytes   # K 와 V 둘 다
print(per_token // 1024, "KB/token")                    # 56 KB/token
print(per_token * 32768 / 1024**3, "GB @32K")           # 약 1.75 GB
```

생성은 토큰을 하나씩 이어 붙이는 작업이라, 캐시가 없으면 토큰마다 앞 문맥 전체의 어텐션을 다시 계산해 길이의 제곱으로 느려진다. KV 캐시는 그 재계산을 없애는 대신 VRAM 을 먹는다 — 가중치와 별도로 "컨텍스트 길이 × 동시 요청 수" 만큼 쌓인다. 컨텍스트를 늘리면 VRAM 이 더 드는 이유, vLLM 이 기동할 때 VRAM 을 미리 다 잡는 이유(캐시 풀, PagedAttention)가 이것이다. 트레이드오프: 24GB 카드에 7B 4bit(약 5GB)를 올리면 남는 VRAM 이 곧 "동시 요청 수 × 컨텍스트 길이" 의 상한이라, 긴 문서 RAG 를 여러 명이 동시에 쓰면 캐시가 가중치보다 커진다. GQA 나 KV 8bit 양자화는 이 캐시를 줄이는 기법이다.

## 헷갈리기 쉬운 것

- **프리픽스 캐시(prompt caching)**: 시스템 프롬프트처럼 요청마다 똑같은 앞부분의 KV 를 요청 사이에 재사용하는 것. KV 캐시 위에 얹는 기능으로, Ollama·vLLM 둘 다 지원한다 [확인 필요].
- **백엔드 캐시(Redis)** 는 완성된 응답을 저장해 두는 것. KV 캐시는 모델 내부의 중간 계산값이라 사용자는 볼 일이 없다.
- **컨텍스트 윈도우**는 한도, KV 캐시는 그 한도 안에서 실제로 쓴 토큰만큼 차지하는 메모리.
