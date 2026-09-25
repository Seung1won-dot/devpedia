---
id: token
term: 토큰/토크나이저
aliases:
  - Token
  - Tokenizer
  - 토큰
  - 토크나이저
category: ai
tags:
  - LLM
level: 1
related:
  - llm
  - context-window
  - embedding
  - model-parameters
  - rag
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

LLM 이 글을 읽고 쓰는 **최소 단위 조각**으로, 보통 단어보다 조금 작다.

## 비유

레고 블록. 문장을 통째로 다루지 않고 블록으로 쪼개서 세고, 쌓고, 값을 매긴다.

## 예시

```python
from transformers import AutoTokenizer
tok = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-7B")
ids = tok.encode("연구실 GPU 서버를 점검한다")
print(len(ids), tok.convert_ids_to_tokens(ids))
```

한국어는 영어보다 같은 뜻에 토큰이 더 많이 든다(약 1.5~2배 [확인 필요]). API 요금과 컨텍스트 윈도우 모두 토큰 단위로 세니 한국어 문서 RAG 는 이걸 감안해야 한다.

## 헷갈리기 쉬운 것

- **파라미터**는 모델 안에 든 숫자(가중치)의 개수, 토큰은 모델에 넣고 빼는 글의 개수. "7B 모델이 32K 토큰을 읽는다" 처럼 쓴다.
- **토크나이저**는 글을 토큰으로 쪼개는 도구. 모델마다 다르니 Qwen 으로 센 토큰 수와 GPT 로 센 수가 다르다.
