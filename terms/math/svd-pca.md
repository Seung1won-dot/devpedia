---
id: svd-pca
term: SVD · PCA(차원 축소)
aliases:
  - Singular Value Decomposition
  - Principal Component Analysis
  - 특이값 분해
  - 주성분 분석
  - 차원 축소
category: math
tags:
  - 선형대수
  - 데이터분석
  - 임베딩
level: 3
kind: concept
related:
  - eigenvalue
  - matrix
  - visualization
  - feature-engineering
  - embedding
  - descriptive-stats
see_also:
  - https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

데이터를 **가장 넓게 퍼진 몇 개 축**으로 다시 표현해 차원을 줄이는 기법.

## 비유

3D 조각상을 사진 한 장으로 남길 때, **모양이 가장 잘 드러나는 각도**를 골라 찍는 것. 정보가 조금 사라지지만 핵심 윤곽은 남는다.

## 예시

```python
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# X: (환자 수, 검사 항목 40개) 검사 수치 표
Xs = StandardScaler().fit_transform(X)     # 단위가 다른 피처는 먼저 표준화
pca = PCA(n_components=2)
Z = pca.fit_transform(Xs)                  # (환자 수, 2) → 산점도로 그리기
print(pca.explained_variance_ratio_)       # 두 축이 원래 분산의 몇 %를 설명하는지
```

SVD 는 아무 행렬이나 `X = U·Σ·Vᵀ` 세 조각으로 나누는 분해이고, PCA 는 평균을 뺀 데이터에 SVD 를 해서 큰 특이값 쪽 축만 남기는 것이다. 384차원 임베딩을 2D 로 찍어 보기, 노이즈 제거, 압축(큰 특이값 k개만 남기기)에 쓴다.

트레이드오프: PCA 는 빠르고 결과가 매번 같으며 새 데이터에도 같은 변환을 쓸 수 있지만, **직선 방향만** 찾기 때문에 꼬인 구조는 못 펼친다. 또 새 축은 "검사 항목 섞음" 이라 의미 해석이 어려워진다.

## 헷갈리기 쉬운 것

- **PCA vs t-SNE/UMAP**: 둘 다 2D 시각화에 쓰지만 t-SNE/UMAP 은 비선형이라 군집은 잘 보여도 점 사이 거리·군집 크기를 그대로 믿으면 안 된다. 학습 피처로 쓰기엔 PCA 가 안전하다.
- **표준화 생략**: 단위가 큰 피처(예: 혈소판 수)가 축을 독차지한다. 가장 흔한 실수.
- **차원 축소 vs 피처 선택**: PCA 는 피처를 섞어 새 축을 만들고, 피처 선택은 원래 열 중 일부를 고른다.
