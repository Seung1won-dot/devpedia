---
id: transformer
term: Transformer/어텐션
aliases:
  - Transformer
  - Attention
  - 트랜스포머
  - 어텐션
category: ai
tags:
  - 딥러닝
  - LLM
level: 2
kind: concept
related:
  - neural-network
  - llm
  - token
  - context-window
  - embedding
  - rnn
  - moe
see_also:
  - https://arxiv.org/abs/1706.03762
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

문장의 모든 단어를 **서로 얼마나 관련 있는지(어텐션)** 한 번에 보는 신경망 구조.

## 비유

소설을 읽을 때 "그녀"가 나오면 앞의 어느 인물을 가리키는지 되짚어 보는 것. 어텐션은 단어마다 어디를 봐야 하는지를 점수로 매기는 장치다.

## 예시

```python
from transformers import AutoConfig
cfg = AutoConfig.from_pretrained("Qwen/Qwen2.5-7B")
print(cfg.num_hidden_layers, cfg.num_attention_heads)   # 28 28  [확인 필요]
```

Qwen2.5-7B 는 Transformer 블록 약 28개를 쌓은 것. 블록마다 어텐션 헤드 여러 개가 각자 다른 관점으로 단어 사이 관계를 본다.

## 헷갈리기 쉬운 것

- **LLM** 은 Transformer 로 만든 아주 큰 언어 모델. Transformer 는 구조 이름, LLM 은 그 구조로 만든 결과물.
- **어텐션**은 Transformer 안의 핵심 부품 하나. Transformer = 어텐션 + 앞뒤 계산층을 여러 겹 쌓은 것.
