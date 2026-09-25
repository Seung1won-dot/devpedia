---
id: semantic-commit
term: 시맨틱 커밋
aliases:
  - Conventional Commits
  - 컨벤셔널 커밋
  - 시맨틱 커밋 메시지
  - 커밋 컨벤션
category: swe
tags:
  - Git
  - 협업
level: 1
related:
  - commit-branch-merge
  - semver
  - pull-request
  - git
  - ci-cd
see_also:
  - https://www.conventionalcommits.org/ko/v1.0.0/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

커밋 메시지 앞에 **변경 종류와 범위**를 `feat(scope): 내용` 꼴로 붙이는 규칙.

## 비유

택배 상자에 붙이는 **분류 스티커**. "식품/냉장/부산행"처럼 앞머리만 보고도 어디로 보낼지(변경 로그 어느 칸에 넣을지, 버전을 얼마나 올릴지)가 정해진다.

## 예시

Devpedia 의 실제 커밋 규칙.

```bash
git commit -m "term(infra): add ssh"
git commit -m "fix(validate): 코드 펜스 안의 ## 를 섹션 제목으로 잡던 문제"
git commit -m "docs(readme): 카드 추가 절차 추가"
git commit -m "feat(search)!: aliases 도 검색 대상에 포함"   # ! = 호환 깨지는 변경
```

형식은 `<type>(<scope>): <설명>`. 기본 type 은 feat / fix / docs / refactor / test / chore 이고, Devpedia 는 카드 추가용으로 `term` 을 더해 쓴다. 이렇게 쌓이면 `feat` 는 minor, `fix` 는 patch, `!` 는 major 로 버전이 자동 계산되고(시맨틱 버저닝) CHANGELOG 도 자동으로 나온다.

## 헷갈리기 쉬운 것

- **시맨틱 버저닝(semver)**은 버전 번호 규칙(1.4.2). 시맨틱 커밋은 그 번호를 올릴 근거가 되는 메시지 규칙. 이름이 비슷해 자주 섞인다.
- **커밋을 잘게 쪼개는 것**과는 별개. 형식이 맞아도 한 커밋에 feat 와 fix 가 섞이면 스티커가 의미를 잃는다.
