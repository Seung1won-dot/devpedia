---
id: codeowners
term: CODEOWNERS
aliases:
  - 코드 오너
  - 코드오너스
  - 코드 소유자 파일
  - 리뷰어 자동 지정
category: devops
tags:
  - Git
  - 협업
  - CI/CD
level: 2
kind: tool
related:
  - pull-request
  - monorepo
  - git-flow
  - github-issues
  - coding-convention
see_also:
  - https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

경로별로 **담당자를 적어 두면** 그 파일을 고친 PR 에 리뷰어가 자동으로 붙는 파일.

## 비유

병원의 **부서별 결재선**. 약국 서류는 약제부장이, 영상 서류는 영상의학과장이 도장을 찍어야 넘어가듯, 폴더마다 "이 사람 확인 없이는 머지 안 됨"을 정해 둔다.

## 예시

```text
# .github/CODEOWNERS — 아래쪽 규칙이 위쪽을 덮어쓴다
*                       @eclab/core             # 기본 담당(팀)
/apps/api/              @eclab/backend
/apps/web/              @eclab/frontend
/packages/fhir-types/   @eclab/backend @eclab/frontend   # 둘 다 봐야 함
/pipelines/deid/        @deid-owner             # 가명화 코드는 이 사람 눈을 꼭 거친다
*.ipynb                 @pi-account             # 노트북은 PI 확인
```

PR 이 열리면 GitHub 가 바뀐 파일 경로를 규칙과 맞춰 보고 마지막으로 맞은 줄의 소유자를 리뷰어로 요청한다. 파일만 두면 "요청"까지만 되고, 브랜치 보호 규칙에서 **Require review from Code Owners** 를 켜야 소유자 승인 없이는 머지가 막힌다. 연구실에선 가명화 파이프라인 폴더에 담당자를 묶어 두면 식별자가 새어 나가는 변경이 적어도 한 사람의 눈을 거치게 된다. GitLab 도 같은 이름의 파일을 지원한다(승인 강제는 유료 플랜) [확인 필요].

## 헷갈리기 쉬운 것

- **리뷰어 수동 지정**은 잊어버리면 그만이지만 CODEOWNERS 는 못 잊는다. 대신 소유자가 휴가면 머지가 막히니 개인보다 팀(`@org/team`)으로 적는 게 안전하다.
- **저장소 권한(Write/Admin)** 은 "누가 push 할 수 있나", CODEOWNERS 는 "누가 봐야 하나". 소유자여도 권한이 없으면 머지를 못 하고, Admin 이어도 소유자 승인이 없으면 막힌다.
- **`.gitignore`** 와 패턴 문법은 거의 같지만, 이 파일은 저장소 루트·`docs/`·`.github/` 셋 중 한 곳에만 둘 수 있다.
