---
id: collaboration-tools
term: 협업 도구(Jira/Notion/Slack/Figma)
aliases:
  - Collaboration Tools
  - 협업 툴
  - Jira
  - Notion
  - Slack
  - Figma
  - 지라/노션/슬랙/피그마
category: devops
tags:
  - 협업
  - 취업
level: 1
kind: tool
related:
  - github-issues
  - agile-scrum
  - user-story
  - requirements-spec
  - pull-request
  - on-call
  - wireframe
status: review
created: 2026-09-29
updated: 2026-10-03
---

## 한 줄 정의

팀이 **할 일·문서·대화·디자인을 한곳에서 나누는** 서비스 묶음.

## 비유

공사 현장의 **작업 지시서(Jira)·현장 수첩(Notion)·무전기(Slack)·설계 도면(Figma)**. 역할이 제각각이라 하나가 다른 것을 대신하지 못한다.

## 예시

| 도구 | 역할 | 개발자가 매일 하는 일 |
|---|---|---|
| Jira | 이슈·스프린트 추적 | 티켓(`ECL-42`)을 받아 상태를 To Do → In Progress → Done 으로 옮긴다 |
| Notion / Confluence | 문서·위키 | 온보딩 문서, 회의록, API 명세를 읽고 쓴다 |
| Slack | 소통 | 채널별 대화와 스레드, GitHub·Jira 알림 봇, 장애 공지 |
| Figma | 디자인 확인 | 시안에서 여백·색·폰트 값을 읽어 CSS 로 옮긴다 |

```bash
git switch -c feature/ECL-42-search-fix   # 브랜치 이름에 티켓 키 → Jira 가 PR 과 자동 연결
```

Figma 에서 개발자가 보는 건 그림이 아니라 **스펙**이다. Dev Mode(Inspect) 패널에서 요소를 클릭하면 여백(px)·색상 코드·폰트 크기·컴포넌트 이름이 나오고, 이를 그대로 CSS 와 컴포넌트로 옮기며, 디자인의 버튼 컴포넌트와 코드의 `Button` 컴포넌트를 1:1 로 맞추는 게 이상적이다. 온보딩 첫날은 보통 Slack 채널 초대 → Notion 온보딩 문서 → Jira 첫 티켓 순서로 흘러간다. 면접에서 "협업 도구 써 본 경험은?" 이라 물으면 도구 이름보다 **티켓 단위로 일하고 결정을 문서로 남긴 습관**을 말한다.

## 헷갈리기 쉬운 것

- **Jira vs GitHub Issues**: 둘 다 이슈 추적. Jira 는 스프린트·번다운 차트·워크플로 커스텀이 강해 큰 조직용, GitHub Issues 는 코드 옆에 붙어 있어 작은 팀용.
- **Notion vs Confluence**: 둘 다 위키. Confluence 는 Jira 와 같은 회사(Atlassian) 제품이라 Jira 쓰는 조직에 많고, Notion 은 소규모 팀에서 많이 보인다.
- **Slack vs 이메일**: 슬랙은 빠른 대화, 이메일은 외부·공식 기록. 슬랙에서 나온 결정도 Notion 이나 Jira 에 옮겨 적어야 남는다.
