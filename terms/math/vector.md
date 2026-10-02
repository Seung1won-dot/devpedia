---
id: vector
term: 벡터
aliases:
  - Vector
  - 벡터
  - 1차원 배열
category: math
tags:
  - 선형대수
  - 임베딩
  - ML기초
level: 1
kind: concept
related:
  - matrix
  - dot-product
  - vector-norm
  - embedding
  - vector-db
  - pandas-numpy
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

**숫자 여러 개를 순서대로 묶어** 하나의 대상을 나타내는 값.

## 비유

환자 한 명을 `[나이, 키, 몸무게, 심박수]` 처럼 칸이 정해진 **카드 한 장**에 적는 것. 칸 순서만 맞으면 두 카드를 나란히 놓고 얼마나 다른지 비교할 수 있다.

## 예시

```python
import numpy as np
from sentence_transformers import SentenceTransformer

v = np.array([63, 172.0, 68.5, 82])   # 환자 한 명 = 4차원 벡터
print(v.shape)                        # (4,)

m = SentenceTransformer("all-MiniLM-L6-v2")
e = m.encode("흉통이 30분 이상 지속")
print(e.shape)                        # (384,)  문장 하나 = 384차원 벡터
```

임베딩이 벡터인 이유는 단순하다. 글을 숫자 칸 수백 개로 바꿔 두면 "비슷한 뜻 = 가까운 점" 이 되어 거리·각도로 계산할 수 있기 때문이다. 벡터 DB 는 이런 점 수백만 개 중 가까운 것을 빨리 찾는 저장소다.

## 헷갈리기 쉬운 것

- **물리의 벡터**(화살표, 크기와 방향)와 같은 것이다. 2·3차원은 화살표로 그릴 수 있고, ML 에서는 그 칸 수가 수백~수천으로 늘어났을 뿐이다.
- **C++ `std::vector` / 파이썬 리스트**는 "늘어나는 배열" 이라는 자료구조 이름일 뿐, 덧셈·내적 같은 수학 연산은 없다. 리스트끼리 `+` 하면 이어 붙여진다.
- **스칼라**는 숫자 하나, 벡터는 1차원, **행렬**은 2차원, 텐서는 그 이상 차원의 배열이다.
