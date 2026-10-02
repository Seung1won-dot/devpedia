---
id: reproducibility
term: 재현성/랜덤 시드
aliases:
  - Reproducibility
  - 재현성
  - 랜덤 시드
  - random seed
  - seed 고정
category: ai
tags:
  - 연구
  - 학습
  - 흔한실수
  - ML기초
level: 2
kind: concept
related:
  - experiment-tracking
  - train-validation-test
  - temperature
  - checkpoint
  - lockfile
  - hyperparameter
see_also:
  - https://pytorch.org/docs/stable/notes/randomness.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

같은 코드·데이터·설정으로 다시 돌리면 **같은 결과가 나오는** 실험의 성질.

## 비유

레시피에 "소금 약간, 적당히 굽기" 대신 "소금 3g, 180도 12분" 이라고 적어 두는 것. 누가 언제 해도 같은 맛이 나야 "이 요리법이 좋다" 고 말할 수 있다.

## 예시

```python
import random, numpy as np, torch

def seed_everything(seed: int = 42):
    random.seed(seed); np.random.seed(seed); torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True   # 조금 느려지는 대신 같은 결과
    torch.backends.cudnn.benchmark = False

seed_everything(42)
# train_test_split(..., random_state=42) 와
# DataLoader(shuffle=True, generator=torch.Generator().manual_seed(42)) 도 함께
```

시드 고정은 시작일 뿐이다. 데이터 분할의 `random_state`, 패키지 버전(lock 파일), CUDA·드라이버 버전, 심지어 GPU 종류까지 같아야 숫자가 맞고, GPU 연산 일부는 시드를 고정해도 비트 단위로 똑같지 않을 수 있다 [확인 필요]. 그래서 보고서에는 시드 하나로 나온 최고 점수 대신 시드 3~5개의 평균±표준편차를 적는다. LLM 추론은 `temperature 0` 과 `seed` 를 같이 주면 거의 재현된다.

## 헷갈리기 쉬운 것

- **재현성 vs 좋은 성능**: 시드 하나로 운 좋게 나온 점수는 재현은 되지만 일반화된 성능이 아니다. 여러 시드로 돌려 보는 이유.
- **결정론(deterministic)** 은 비트 단위로 똑같은 것. 연구에서 필요한 재현성은 "같은 결론이 나온다" 수준이면 충분할 때가 많아, 속도를 크게 희생하면서까지 결정론을 강제하지는 않는다.
- **체크포인트**는 결과물을 보존하는 것, 재현성은 그 결과물을 다시 만들 수 있는 것. 체크포인트만 있고 설정 기록이 없으면 "어떻게 나왔는지" 를 못 답한다.
