---
id: github-issues
term: GitHub Issues
aliases:
  - 깃허브 이슈
  - Issue Tracker
  - 이슈 트래커
  - 이슈
  - GitHub Projects
category: devops
tags:
  - 협업
  - Git
  - 포트폴리오
level: 1
kind: tool
related:
  - pull-request
  - github-actions
  - collaboration-tools
  - user-story
  - agile-scrum
  - semantic-commit
  - backlog
see_also:
  - https://docs.github.com/issues
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

저장소 안에서 **할 일과 버그를 번호 붙여 추적**하는 GitHub 의 게시판.

## 비유

냉장고에 붙이는 **번호 매긴 포스트잇**. "12번: 검색이 느림" 을 붙여 두면 누가 맡았는지, 끝났는지 온 가족이 같은 걸 본다.

## 예시

```yaml
# .github/ISSUE_TEMPLATE/bug.yml — 버그 신고 양식(이슈 폼)
name: 버그 신고
description: 재현 가능한 버그를 알려 주세요
labels: [bug]
body:
  - type: textarea
    id: steps
    attributes:
      label: 재현 순서
      placeholder: "1. 검색창에 '데드락' 입력  2. 결과 0건"
    validations:
      required: true
```

```bash
git commit -m "fix(search): 한글 초성 검색 오류 수정 (Closes #12)"
```

커밋 메시지나 PR 본문에 `Closes #12` 를 쓰면 `main` 에 머지되는 순간 이슈가 자동으로 닫히고, 이슈 페이지에 어떤 PR 로 고쳤는지 이력이 남는다. 라벨(`bug`, `enhancement`, `good first issue`)로 분류하고, Projects 보드에 To do / In progress / Done 칸반으로 늘어놓는다. 혼자 하는 포트폴리오 프로젝트라도 이슈 → 브랜치 → PR → 머지 흐름이 남아 있으면 **협업 방식으로 일할 줄 안다는 증거**가 된다. 면접에서는 "팀에서 일감은 어떻게 나누고 추적했나요?" 로 나온다.

## 헷갈리기 쉬운 것

- **Issue vs PR**: 이슈는 "무엇을 왜 할지" 의 논의, PR 은 "이렇게 고쳤다" 는 코드. 이슈 하나에 PR 이 여러 개 달릴 수 있다.
- **Discussions**: 결론이 정해지지 않은 질문·아이디어용 게시판. 할 일로 확정되면 이슈로 옮긴다.
- **Jira**: 같은 역할의 별도 서비스. 스프린트·스토리 포인트 같은 기능이 많아 큰 조직에서 쓰고, GitHub Issues 는 코드 옆에 붙어 있어 작은 팀과 오픈소스에 맞다.
