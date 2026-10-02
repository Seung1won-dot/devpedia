---
id: dot-product
term: 내적 · 코사인 유사도
aliases:
  - Dot Product
  - Inner Product
  - Cosine Similarity
  - 내적
  - 코사인 유사도
category: math
tags:
  - 선형대수
  - 임베딩
  - 검색
level: 2
kind: concept
related:
  - vector
  - vector-norm
  - embedding
  - vector-db
  - pgvector
  - rag
see_also:
  - https://github.com/pgvector/pgvector
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

두 벡터의 같은 자리끼리 곱해 더한 값으로, **얼마나 같은 방향인지**를 잰다.

## 비유

두 사람의 취향표를 항목별로 곱해 더하면 "둘 다 좋아하는 것" 이 많을수록 점수가 커진다. 코사인 유사도는 여기서 **목소리 크기(벡터 길이)를 빼고** 취향의 방향만 비교한 점수다.

## 예시

```python
import numpy as np

a = np.array([1.0, 2.0, 3.0])
b = np.array([2.0, 4.0, 6.1])

dot = a @ b                                        # 1*2 + 2*4 + 3*6.1
cos = dot / (np.linalg.norm(a) * np.linalg.norm(b))
print(round(cos, 4))                               # 1.0 에 가까움 = 거의 같은 방향
```

```sql
-- pgvector: 질문 임베딩과 가장 비슷한 문서 5개
SELECT id, content FROM docs
ORDER BY embedding <=> '[0.12, -0.53, ...]'   -- <=> 는 코사인 거리(1 - 코사인 유사도)
LIMIT 5;
```

RAG 의 검색 단계가 바로 이것이다. 공식은 `cos(a, b) = a·b / (|a|·|b|)` 이고 -1(반대)~1(같은 방향) 사이 값이 나온다. pgvector 에서 `<->` 는 L2 거리, `<#>` 는 음의 내적, `<=>` 는 코사인 거리다.

## 헷갈리기 쉬운 것

- **내적 vs 코사인 유사도**: 내적은 길이에 영향을 받고, 코사인은 방향만 본다. 벡터를 미리 길이 1로 정규화해 두면 둘이 같아져서, 많은 벡터 DB 가 정규화 후 내적으로 빠르게 계산한다.
- **코사인 유사도 vs 코사인 거리**: 거리 = `1 - 유사도`. `ORDER BY` 방향을 반대로 쓰면 가장 안 비슷한 문서가 나온다.
- **유클리드(L2) 거리**는 점 사이 직선 거리다. 정규화된 벡터에서는 코사인과 순위가 같다.
