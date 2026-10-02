---
id: distillation
term: 디스틸레이션
aliases:
  - Knowledge Distillation
  - 지식 증류
  - 증류
  - 교사-학생 학습
category: ai
tags:
  - LLM
  - 학습
  - 서빙
level: 3
kind: concept
related:
  - fine-tuning
  - quantization
  - model-parameters
  - transfer-learning
  - local-llm
  - speculative-decoding
see_also:
  - https://arxiv.org/abs/1503.02531
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

큰 **교사 모델의 출력을 작은 학생 모델이 따라 배우게** 해 크기를 줄이는 기법.

## 비유

교수님이 쓴 두꺼운 원서 대신, 그 강의를 들은 조교가 만든 요약 노트로 공부하는 것. 노트는 얇지만 "뭐가 중요한지" 교수님이 판단한 결과가 담겨 있다.

## 예시

```python
import torch.nn.functional as F
T = 2.0                                    # 온도: 교사의 확률 분포를 부드럽게 펴서 보여 준다
def distill_loss(student_logits, teacher_logits, labels, alpha=0.5):
    soft = F.kl_div(F.log_softmax(student_logits / T, -1),
                    F.softmax(teacher_logits / T, -1), reduction="batchmean") * T * T
    hard = F.cross_entropy(student_logits, labels)      # 정답 레이블도 같이
    return alpha * soft + (1 - alpha) * hard
```

교사가 내놓는 확률("고양이 0.7, 호랑이 0.2, 개 0.1")에는 정답 레이블 하나보다 훨씬 많은 정보가 있어 학생이 더 잘 배운다. LLM 에서는 보통 더 단순하게 간다 — 큰 모델이 만든 답변 수천 개로 작은 모델을 SFT 하는 "데이터 디스틸레이션". 트레이드오프: 학생은 작고 빠르지만 교사를 넘지 못하고 교사의 오류와 편향도 그대로 물려받으며, 교사 출력을 뽑는 데 GPU 시간이 많이 든다. 연구실이라면 72B 급으로 가명화 EMR 요약 정답을 만든 뒤(24GB 한 장엔 72B 가 안 올라가 API 나 다중 GPU 가 필요 [확인 필요]) 1.5B~3B 학생을 튜닝해 폐쇄망의 작은 GPU 에서 서빙하는 그림이다. 상용 API 출력을 경쟁 모델 학습에 쓰는 것은 약관으로 금지된 경우가 있으니 확인하고 쓴다 [확인 필요].

## 헷갈리기 쉬운 것

- **양자화**는 같은 모델의 숫자 자릿수만 줄이는 것(구조 그대로). 디스틸레이션은 더 작은 다른 모델을 새로 학습한다. 둘은 겹쳐 쓴다 — 디스틸한 3B 를 다시 4bit 로.
- **파인튜닝**과의 관계: 학생을 학습시키는 행위 자체는 파인튜닝이다. 차이는 정답을 사람 레이블이 아니라 교사 모델에서 가져온다는 점.
- **프루닝(가지치기)** 은 기존 모델에서 덜 중요한 가중치를 잘라 내는 것. 디스틸레이션은 처음부터 작은 모델에 지식을 옮긴다.
