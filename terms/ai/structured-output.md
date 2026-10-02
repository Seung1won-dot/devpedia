---
id: structured-output
term: 구조화 출력/JSON 모드
aliases:
  - Structured Output
  - JSON Mode
  - 구조화 출력
  - JSON 모드
  - Constrained Decoding
  - 스키마 제약 디코딩
category: ai
tags:
  - LLM
  - 프롬프트
  - 데이터
level: 2
kind: concept
related:
  - tool-calling
  - json
  - prompt-engineering
  - sampling
  - validation
  - local-llm
see_also:
  - https://github.com/ollama/ollama/blob/main/docs/api.md
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

LLM 의 답을 **정해진 JSON 스키마에 맞게만** 내도록 강제하는 기능.

## 비유

자유 서술형 답안 대신 **빈칸이 정해진 신청서 양식**을 내미는 것. 무슨 말을 쓰든 칸 밖에는 못 쓰니, 뒤에서 처리하는 사람(프로그램)이 바로 읽을 수 있다.

## 예시

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "qwen2.5:7b",
  "messages": [{"role": "user",
    "content": "판독문에서 항목을 뽑아라: 우측 하엽에 2.3cm 결절, 흉수 없음."}],
  "format": {
    "type": "object",
    "properties": {
      "nodule_present":   {"type": "boolean"},
      "nodule_size_cm":   {"type": ["number", "null"]},
      "location":         {"type": ["string", "null"]},
      "pleural_effusion": {"type": "boolean"}
    },
    "required": ["nodule_present", "nodule_size_cm", "location", "pleural_effusion"]
  },
  "stream": false
}'
# → "content": "{\"nodule_present\": true, \"nodule_size_cm\": 2.3, \"location\": \"우측 하엽\", \"pleural_effusion\": false}"
```

`format` 에 JSON 스키마를 주면 Ollama 가 **토큰을 뽑는 단계에서** 스키마에 안 맞는 토큰을 아예 못 고르게 막는다. 프롬프트에 "JSON 으로 답해" 라고만 쓰면 코드 펜스(백틱 세 개)나 "네, 결과입니다" 같은 군더더기가 끼어 파싱이 깨지는데, 이 방식은 그런 일이 없다. 파이썬에서는 pydantic 모델의 `model_json_schema()` 를 그대로 넣고, 받은 뒤 `model_validate_json()` 으로 한 번 더 검증한다. EMR 판독문 수천 건을 표로 바꾸는 작업이 전형적인 용도다. 단, 보장되는 것은 **형식**이지 값이 아니다 — 스키마가 숫자를 요구하면 모델은 없던 숫자라도 채워 넣으므로, 없을 수 있는 항목은 위처럼 `null` 을 허용하고 표본을 사람이 검수한다.

## 헷갈리기 쉬운 것

- **툴 콜링**: 모델이 "어떤 함수를 어떤 인자로 부를지" 를 JSON 으로 내는 것. 안에서는 구조화 출력을 쓰지만, 구조화 출력은 함수 없이 결과 자체를 JSON 으로 받는다.
- **"JSON 으로 답해" 프롬프트 vs JSON 모드**: 프롬프트만으로는 열에 하나는 깨진 JSON 이 온다. 스키마 제약은 토큰 단계에서 막으므로 파싱 실패가 사라진다.
- **스키마 검증(pydantic/zod)**: 받은 **뒤에** 검사하는 것. 구조화 출력은 생성 **중에** 막는 것이고, 둘을 겹쳐 쓰는 게 안전하다.
