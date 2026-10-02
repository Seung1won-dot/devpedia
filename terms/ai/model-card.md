---
id: model-card
term: 모델 라이선스/모델 카드
aliases:
  - Model Card
  - 모델 카드
  - 모델 라이선스
  - 오픈 웨이트 라이선스
category: ai
tags:
  - LLM
  - 문서화
  - 평가
  - 규제
level: 2
kind: regulation
related:
  - open-source-license
  - huggingface
  - local-llm
  - llm-eval
  - fine-tuning
see_also:
  - https://huggingface.co/docs/hub/model-cards
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

모델의 **용도·학습 데이터·성능·쓸 수 있는 조건**을 적은 설명서와 사용 허가 문서.

## 비유

약 상자 속 설명서와 처방 조건. 약(모델)을 손에 넣었다고 아무 데나 써도 되는 게 아니라, 효능·용법·부작용(성능·한계)을 읽고 "처방 없이 써도 되는 약인지" 확인해야 한다.

## 예시

```markdown
---
license: apache-2.0
base_model: Qwen/Qwen2.5-7B-Instruct
language: [ko, en]
tags: [medical, lora]
---
## Intended use
연구용 의료 Q&A 보조. 진단·처방 결정에 단독 사용 금지.
## Training data
연구실 Q&A 500쌍(가명화, IRB 승인 번호 기재)
## Evaluation
내부 평가셋 100문항, LLM-as-judge 평균 4.2/5
## Limitations
한국어 외 성능 미검증, 소아 용량 질문에서 오답 다수
```

Hugging Face 저장소의 `README.md` 가 곧 모델 카드다. 내려받기 전에 볼 것은 `license` 한 줄 — Qwen2.5 는 대부분 Apache 2.0 이지만 일부 크기는 Qwen 자체 라이선스이고 [확인 필요], Llama 는 Meta 라이선스라 월 사용자 수 제한과 이름 표기 의무가 있다 [확인 필요]. 우리가 파인튜닝해 올리는 모델도 베이스 모델 라이선스를 그대로 물려받으므로, 의료용이면 "Limitations" 에 단독 진단 금지와 데이터 출처(IRB)를 꼭 적는다.

## 헷갈리기 쉬운 것

- **오픈소스 라이선스(MIT/GPL)** 는 코드용 라이선스. 모델 가중치는 Llama 처럼 자체 약관이 붙은 것이 많아 "오픈소스" 대신 **오픈 웨이트**라고 부른다 — 가중치는 공개돼도 학습 데이터·코드는 비공개인 경우가 대부분.
- **모델 카드 vs 데이터 카드**: 데이터셋 설명서(출처·수집 방법·편향)는 따로 쓴다. 모델 카드는 그 데이터로 만든 모델 쪽 문서.
- **README 가 비어 있는 모델**은 라이선스를 모르는 것이지, 자유롭게 써도 된다는 뜻이 아니다.
