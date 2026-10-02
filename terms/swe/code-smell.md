---
id: code-smell
term: 코드 스멜
aliases:
  - Code Smell
  - 코드 냄새
  - 나쁜 냄새
  - 코드 악취
category: swe
tags:
  - 품질
  - 설계원칙
  - 흔한실수
level: 1
kind: concept
related:
  - refactoring
  - clean-code
  - technical-debt
  - coupling-cohesion
  - dry-kiss-yagni
  - solid
see_also:
  - https://refactoring.guru/refactoring/smells
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

당장 버그는 아니지만 **설계에 문제가 있다는 신호**가 되는 코드의 겉모습.

## 비유

냉장고에서 나는 **이상한 냄새**. 아직 탈이 난 건 아니지만 안에서 뭔가 상해 가고 있다는 뜻이라, 냄새가 나면 열어서 찾아봐야 한다.

## 예시

```python
# 함수 하나에 냄새 네 가지 — 돌아가긴 한다
def process(data, flag, flag2, mode, verbose, db, cfg):   # ① 긴 매개변수 목록
    if mode == 1:                                           # ② 매직 넘버 — 1 이 뭔지 아무도 모른다
        ...
    elif mode == 2:
        ...
    elif mode == 3:                                         # ③ 긴 if/elif 사다리 — 전략 패턴 신호
        ...
    for row in data:
        if row["age"] > 65 and row["dept"] == "CARD":       # ④ 같은 조건이 다른 파일 세 곳에 또 있다 — 중복
            ...
    # ... 아래로 180줄 더 — 긴 함수
```

자주 보이는 냄새는 열 개 남짓이다 — 긴 함수, 긴 매개변수 목록, 중복 코드, 매직 넘버, 주석이 있어야 이해되는 코드, 다른 객체 속을 자꾸 들여다보는 함수, 아무도 안 부르는 죽은 코드. 냄새마다 짝이 되는 리팩토링이 있다: 긴 함수 → 함수 추출, 매직 넘버 → 이름 붙인 상수, if 사다리 → 딕셔너리나 전략 패턴. 다만 냄새가 난다고 다 고쳐야 하는 건 아니다 — 한 번 돌리고 버릴 분석 스크립트라면 그냥 둔다. 코드 리뷰에서 "여기 냄새 나는데요" 라고 말할 수 있는 **공통 어휘**라는 점이 이 말의 쓸모다.

## 헷갈리기 쉬운 것

- **버그**는 동작이 틀린 것, 코드 스멜은 동작은 맞는데 고치기 어렵게 생긴 것. 냄새를 방치하면 버그가 숨기 좋은 자리가 된다.
- **안티패턴**은 God Object·스파게티 코드처럼 이름 붙은 "잘못된 구조". 스멜은 그 징후로, 안티패턴이 구조 전체라면 스멜은 국소적이다.
- **기술 부채**는 냄새를 알고도 남겨 둬서 쌓이는 비용. 스멜이 증상이라면 부채는 그 누적 청구서다.
