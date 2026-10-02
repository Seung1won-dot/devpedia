---
id: heuristic-evaluation
term: 휴리스틱 평가(닐슨 10원칙)
aliases:
  - Heuristic Evaluation
  - Nielsen's 10 Usability Heuristics
  - 닐슨 휴리스틱
  - 사용성 휴리스틱
category: ux
tags:
  - UX리서치
  - 품질
  - 방법론
level: 2
kind: concept
related:
  - usability-test
  - ux-ui
  - color-contrast
  - dark-pattern
  - pull-request
see_also:
  - https://www.nngroup.com/articles/ten-usability-heuristics/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

전문가가 **정해진 체크리스트**를 들고 화면을 훑으며 사용성 문제를 찾는 검토 방법.

## 비유

건물 **소방 점검**. 불이 나기 전에 점검표("비상구 표시 있음?", "소화기 있음?")를 들고 돌며 문제를 미리 찾는다.

## 예시

닐슨의 10원칙 중 개발자가 바로 고칠 수 있는 것들로 Devpedia 를 점검하면:

```text
원칙                       점검 질문                          발견 예
시스템 상태 보여 주기        검색 중임을 알 수 있나?             결과 갱신 중 표시 없음
사용자 언어 쓰기             메뉴가 내부 용어 아닌가?            "kind" 를 화면에 그대로 노출
오류 예방                   실수하기 전에 막나?                 -
알아보게 하기(기억 말고)     최근 본 카드가 남아 있나?           -
오류에서 회복 돕기           검색 결과 0개일 때 다음 길이 있나?   빈 화면만 뜸
```

사용자 없이 1~2시간이면 끝나서 싸지만, 평가자의 눈에만 의존하므로 실제 사용자가 막히는 곳을 놓칠 수 있다. 평가자 3~5명이 따로 보고 합치는 게 일반적이다 [확인 필요].

## 헷갈리기 쉬운 것

- **사용성 테스트**는 실제 사용자를 앉혀 관찰하는 것, 휴리스틱 평가는 전문가가 원칙에 비춰 보는 것. 휴리스틱으로 뻔한 문제를 먼저 치우고 테스트하면 효율적이다.
- 코드 리뷰가 코드 스타일 가이드로 보듯, 휴리스틱 평가는 화면을 원칙 목록으로 리뷰하는 것이다.
