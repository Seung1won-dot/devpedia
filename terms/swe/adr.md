---
id: adr
term: ADR
aliases:
  - Architecture Decision Record
  - 아키텍처 결정 기록
  - 설계 결정 기록
category: swe
tags:
  - 문서화
  - 아키텍처
level: 2
kind: pattern
related:
  - readme
  - technical-debt
  - requirements-spec
  - pull-request
  - static-hosting
  - postmortem
see_also:
  - https://adr.github.io/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

중요한 기술 선택을 **왜 그렇게 정했는지** 짧게 남기는 한 장짜리 기록.

## 비유

가족 회의의 **결정 메모**. "왜 이사 안 가기로 했는지"를 날짜와 함께 적어두면, 1년 뒤 같은 얘기가 나올 때 처음부터 다시 싸우지 않는다.

## 예시

```markdown
# ADR-0003: 카드 저장소로 DB 대신 Markdown 파일을 쓴다
- 상태: 채택 (2026-09-25)
- 맥락: 카드 200장 규모, 작성자 1~3명, 오프라인(PWA)에서도 읽혀야 함
- 결정: terms/<category>/<id>.md 를 빌드 시 JSON 번들로. DB·서버 없음
- 결과: (+) git 으로 리뷰·이력 관리, 정적 호스팅이라 공짜  (−) 본문 검색·동시 편집은 포기
```

`docs/adr/0003-markdown-not-db.md` 처럼 번호를 붙여 쌓는다. 나중에 뒤집더라도 지우지 않고 "폐기됨 — ADR-0011 로 대체"라고 적는다. 논문 코드에서 "왜 PyTorch 를 이 버전에 고정했는지" 같은 결정도 ADR 감이다.

## 헷갈리기 쉬운 것

- **README** 는 "지금 어떻게 돌리나", ADR 은 "왜 이렇게 됐나"의 역사. README 는 최신 상태로 덮어쓰지만 ADR 은 지우지 않는다.
- **요구사항 명세**는 "무엇을 만들지", ADR 은 그걸 만들기 위한 "기술 선택".
