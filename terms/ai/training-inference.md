---
id: training-inference
term: 학습/추론
aliases:
  - Training / Inference
  - 트레이닝
  - 인퍼런스
  - 학습과 추론
category: ai
tags:
  - ML기초
  - 학습
  - 서빙
level: 1
related:
  - machine-learning
  - fine-tuning
  - local-llm
  - gpu-cuda
  - vram
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**학습**은 데이터로 모델을 만드는 단계, **추론**은 만든 모델로 답을 내는 단계.

## 비유

학습은 요리사가 몇 달간 레시피를 익히는 수련 기간, 추론은 익힌 솜씨로 주문 하나를 뚝딱 만들어 내는 것. 수련은 오래 걸리지만 한 접시 내놓는 건 금방이다.

## 예시

```bash
# 추론: 이미 학습된 모델을 받아서 바로 씀 (GPU 1장, 몇 초)
ollama run qwen2.5:7b "연구실 서버 백업 주기를 추천해줘"

# 학습(파인튜닝): 데이터로 가중치를 바꿈 (GPU 여러 장, 몇 시간~며칠)
python train.py --model Qwen/Qwen2.5-7B --data lab_qa.jsonl --epochs 3
```

연구실에서 하는 일 대부분은 추론이고, 학습은 파인튜닝할 때만 잠깐 한다. 추론은 VRAM 만 맞으면 되지만 학습은 그 몇 배의 VRAM 과 시간이 든다.

## 헷갈리기 쉬운 것

- **파인튜닝**은 학습의 한 종류(이미 학습된 모델을 조금 더 학습). 처음부터 학습하는 건 사전학습.
- **서빙**은 추론을 API 로 계속 돌리는 운영 쪽 이야기. 추론 자체는 "한 번 답을 내는" 행위.
