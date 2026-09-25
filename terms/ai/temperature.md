---
id: temperature
term: 온도(temperature)
aliases:
  - Temperature
  - 샘플링 온도
  - 템퍼러처
category: ai
tags:
  - 프롬프트
  - LLM
level: 1
related:
  - prompt-engineering
  - hallucination
  - llm
  - token
  - local-llm
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

LLM 이 다음 단어를 고를 때 **얼마나 모험을 할지** 정하는 숫자로, 0 이면 거의 늘 같은 답.

## 비유

요리사에게 주는 "레시피대로만 해" 와 "네 맘대로 해봐" 사이의 다이얼. 0 에 가까우면 매번 똑같은 맛, 높이면 창의적이지만 가끔 이상한 게 나온다.

## 예시

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "서버 점검 항목을 JSON 배열로 써라",
  "options": {"temperature": 0, "seed": 42}
}'
```

실험 재현이나 JSON 처럼 형식이 정해진 출력은 temperature 0(+seed)으로 고정하고, 브레인스토밍·글쓰기는 0.7~1.0 정도로 둔다. 0 이어도 GPU 연산 순서 때문에 100% 동일하진 않을 수 있다 [확인 필요].

## 헷갈리기 쉬운 것

- **top_p / top_k** 도 무작위성을 조절하지만 방식이 다르다(후보 단어를 몇 개까지 볼지). 보통 temperature 하나만 만져도 충분.
- **온도 0 = 정확함**이 아니다. 틀린 답을 매번 똑같이 틀리게 내놓을 뿐, 할루시네이션은 따로 잡아야 한다.
