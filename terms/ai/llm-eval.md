---
id: llm-eval
term: LLM-as-judge 평가
aliases:
  - LLM Evaluation
  - LLM-as-a-Judge
  - LLM 평가
  - 심판 모델 평가
category: ai
tags:
  - LLM
  - 평가
  - 연구
level: 2
kind: concept
related:
  - precision-recall-f1
  - hallucination
  - rag
  - reproducibility
  - prompt-engineering
  - model-card
see_also:
  - https://arxiv.org/abs/2306.05685
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

정답이 하나가 아닌 LLM 답변을 **다른 LLM 에게 채점시켜** 품질을 재는 방법.

## 비유

논술 시험 채점. 객관식처럼 정답표와 맞춰 볼 수 없으니 채점 기준표를 든 선생님(심판 모델)이 점수를 매기는데, 선생님마다 점수가 달라서 기준표가 전부다.

## 예시

```python
import json, requests
RUBRIC = """질문·참고문서·답변을 보고 1~5점으로 채점하라.
참고문서에 없는 내용을 지어냈으면 1점, 문서 근거만으로 정확히 답했으면 5점.
JSON 으로만 답하라: {{"score": 정수, "reason": "한 문장"}}
질문: {q}
참고문서: {ctx}
답변: {a}"""

def judge(q, ctx, a):
    r = requests.post("http://localhost:11434/api/generate", json={
        "model": "qwen2.5:14b", "format": "json", "stream": False,
        "options": {"temperature": 0, "seed": 42},
        "prompt": RUBRIC.format(q=q, ctx=ctx, a=a)})
    return json.loads(r.json()["response"])        # {"score": 2, "reason": "..."}
```

RAG 파이프라인 답변 300개를 사람이 다 읽을 수 없으니 심판 모델이 1차 채점을 하고, 사람은 낮은 점수만 골라 본다. 믿고 쓰기 전에 사람이 매긴 점수 30~50개와 심판 점수의 일치율을 먼저 확인할 것. 심판 모델은 긴 답, 자기 말투와 비슷한 답을 후하게 주는 편향이 알려져 있어 채점 대상보다 큰 모델을 쓰고, temperature 0 과 평가셋을 고정해 두어야 숫자가 흔들리지 않는다.

## 헷갈리기 쉬운 것

- **정확도/F1** 은 정답 레이블이 있을 때 쓰는 자동 채점. 요약·설명처럼 맞는 답이 여럿이면 사람 평가나 LLM 판정으로 간다.
- **벤치마크(MMLU 등)** 는 공개 문제집으로 모델의 일반 능력을 재는 것. 우리 파이프라인이 우리 데이터에서 잘 되는지는 우리 평가셋으로 따로 재야 한다.
- **할루시네이션 탐지**는 채점 기준 중 하나(근거 충실도)일 뿐, 유용성·형식·안전성도 같이 본다.
