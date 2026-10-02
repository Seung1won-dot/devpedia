---
id: freemium
term: 프리미엄 · 구독 모델
aliases:
  - Freemium
  - Subscription Model
  - 부분 유료화
  - 무료 체험
  - Free Trial
category: product
tags:
  - 비즈니스모델
  - 그로스
level: 1
kind: concept
related:
  - saas-model
  - cac-ltv
  - funnel
  - b2b-b2c
  - feature-flag
  - dark-pattern
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

기본은 **무료로 쓰게** 하고 더 많은 기능·용량에만 돈을 받는 수익 방식.

## 비유

마트 **시식 코너**다. 맛보기는 공짜로 주고, 마음에 든 사람만 한 봉지를 사 간다.

## 예시

```text
무료     카드 열람, 검색
Pro 월 5,000원  오프라인 저장, 학습 진도, 광고 제거
Team     연구실 공용 노트, 관리자 권한
```

무료 사용자 10,000명 중 3% 가 Pro 로 넘어오면 300명 × 5,000원 = 월 150만 원이다. 무료→유료 전환율은 보통 한 자릿수 % 라고들 한다 [확인 필요]. 개발 쪽에서는 요금제별 기능 차단을 **피처 플래그**나 권한 체크로 구현하고, 무료 사용자의 서버비가 유료 매출을 넘지 않는지 계속 본다.

## 헷갈리기 쉬운 것

- **무료 체험(free trial)** 은 모든 기능을 기간 한정으로 열어 주고, 프리미엄은 기간 제한 없이 일부 기능만 연다.
- 영어 **Freemium**(free + premium)과 고급이라는 뜻의 **Premium** 이 한글로 둘 다 "프리미엄"이라 헷갈린다. 문서에는 영문을 같이 적는 게 안전하다.
