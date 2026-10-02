---
id: funnel
term: 퍼널 분석
aliases:
  - Funnel Analysis
  - 깔때기 분석
  - 전환 퍼널
  - 전환율
category: product
tags:
  - 지표
  - 데이터분석
  - 그로스
level: 2
kind: concept
related:
  - dau-mau
  - retention-churn
  - ab-test
  - growth-hacking
  - user-flow
  - pandas-numpy
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

가입·결제 같은 목표까지 **단계별로 몇 명이 남고 빠지는지** 보는 분석.

## 비유

**깔때기**에 물을 부으면 아래로 갈수록 좁아진다. 어디서 가장 많이 새는지 찾아 그 구멍부터 막는 것이다.

## 예시

| 단계 | 사용자 | 이전 단계 대비 |
| :-- | --: | --: |
| 랜딩 방문 | 10,000 | - |
| 회원가입 | 1,200 | 12% |
| 첫 카드 저장 | 600 | 50% |
| 유료 결제 | 90 | 15% |

전체 전환율은 90 / 10,000 = **0.9%** 다. 가입 단계(12%)가 가장 크게 새므로 결제 화면보다 가입 폼을 먼저 손보는 게 맞다.

```python
steps = ["visit", "signup", "save", "pay"]
counts = [df[df.event == s].user_id.nunique() for s in steps]
print([round(b / a * 100, 1) for a, b in zip(counts, counts[1:])])  # [12.0, 50.0, 15.0]
```

## 헷갈리기 쉬운 것

- **리텐션**은 "시간이 지나도 다시 오나"를 보고, 퍼널은 "한 번의 여정에서 어디까지 가나"를 본다.
- 단계 순서를 지키지 않고 이벤트 수만 세면 **가입 없이 결제한 것처럼** 보이는 오류가 생긴다. 사용자별로 앞 단계를 거쳤는지 확인해야 한다.
