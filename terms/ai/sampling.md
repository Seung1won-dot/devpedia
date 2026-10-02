---
id: sampling
term: top-p/top-k 샘플링
aliases:
  - Sampling
  - Top-p Sampling
  - Nucleus Sampling
  - Top-k Sampling
  - 샘플링
  - 디코딩 전략
  - 그리디 디코딩
category: ai
tags:
  - LLM
  - 프롬프트
  - 서빙
level: 2
kind: concept
related:
  - temperature
  - token
  - llm
  - local-llm
  - hallucination
  - structured-output
see_also:
  - https://huggingface.co/blog/how-to-generate
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

LLM 이 다음 토큰을 뽑을 때 **후보를 몇 개까지 남길지** 정하는 규칙.

## 비유

메뉴판에서 고르기. top-k 는 "인기 메뉴 상위 5개 중에서만", top-p 는 "주문 비율을 더해 90% 가 될 때까지의 메뉴 중에서만" 고르게 해서, 메뉴판 맨 아래의 이상한 메뉴가 뽑히는 일을 막는다.

## 예시

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "다음 퇴원 요약을 환자가 이해할 수 있는 말로 바꿔라: ...",
  "options": {"temperature": 0.7, "top_p": 0.9, "top_k": 40, "repeat_penalty": 1.1}
}'
```

모델은 토큰 하나를 낼 때마다 어휘 전체(수만~15만 개)에 확률을 매긴다. temperature 가 그 분포를 뾰족하게·평평하게 만들고, top-k 는 상위 k 개만, top-p 는 확률을 큰 순서로 더해 p 에 이를 때까지만 남긴 뒤 그 안에서 무작위로 뽑는다. top-p 는 모델이 확신할 때는 후보가 1~2개, 애매할 때는 수십 개로 **알아서 조절**되어 top-k 보다 많이 쓴다. 의료 요약·코드 추출처럼 틀리면 안 되는 작업은 temperature 0 이나 top_p 0.1~0.3 처럼 좁게, 환자 교육 자료 초안처럼 다양성이 필요하면 넓게 둔다. Ollama 기본값은 temperature 0.8, top_k 40, top_p 0.9 다 [확인 필요].

## 헷갈리기 쉬운 것

- **temperature vs top-p/top-k**: temperature 는 확률 분포의 모양을 바꾸고, top-p/top-k 는 후보를 자른다. 적용 순서는 구현(vLLM, llama.cpp)마다 달라 같은 값이라도 결과가 조금 다를 수 있다.
- **greedy(temperature 0)**: 매번 1등 토큰만 고른다. 결정적이라 재현에 좋지만 같은 말을 반복하는 데 빠지기 쉬워 `repeat_penalty` 와 같이 쓴다.
- **빔 서치(beam search)**: 후보 문장 여러 개를 동시에 끌고 가 전체 점수가 높은 것을 고르는 방식. 번역·요약 모델에 썼고 채팅 LLM 에서는 잘 안 쓴다.
