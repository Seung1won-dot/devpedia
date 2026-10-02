---
id: dependabot
term: 의존성 자동 갱신(Dependabot)
aliases:
  - Dependabot
  - Renovate
  - 디펜다봇
  - 의존성 업데이트 봇
  - 자동 의존성 업데이트
category: devops
tags:
  - CI/CD
  - 보안
  - Git
  - 개발도구
level: 2
kind: tool
related:
  - sca
  - cve
  - lockfile
  - semver
  - pull-request
  - github-actions
see_also:
  - https://docs.github.com/en/code-security/dependabot
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

라이브러리 새 버전·보안 패치가 나오면 **버전 올리는 PR 을 대신 열어 주는** 봇.

## 비유

쓰는 앱이 많을 때 뜨는 **앱스토어 업데이트 알림**. "이거 새 버전 나왔는데 올릴래?" 하고 하나씩 물어보되, 내가 누르기 전엔 바꾸지 않는다.

## 예시

```yaml
# .github/dependabot.yml — 커밋해 두면 GitHub 가 알아서 돌린다
version: 2
updates:
  - package-ecosystem: "pip"            # requirements.txt / pyproject.toml
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      minor-and-patch:                  # 작은 버전 올림은 PR 하나로 묶기
        update-types: ["minor", "patch"]
  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
  - package-ecosystem: "github-actions" # 워크플로의 actions/checkout@v4 같은 것도
    directory: "/"
    schedule:
      interval: "monthly"
```

매주 정해진 요일에 "Bump fastapi from 0.115.0 to 0.116.0" 같은 PR 이 열리고, CI 가 통과하면 사람이 머지한다. 취약점(CVE)이 공개된 패키지는 스케줄과 상관없이 보안 업데이트 PR 이 바로 뜬다. 3인 연구실에서 PR 이 매주 10개씩 쌓이면 아무도 안 보게 되니, 위처럼 `groups` 로 묶고 패치 버전은 CI 통과 시 자동 머지하는 식으로 양을 줄이는 게 핵심이다.

## 헷갈리기 쉬운 것

- **SCA(의존성 취약점 스캔)**는 "지금 쓰는 버전에 알려진 구멍이 있나" 검사하는 것, Dependabot 은 그걸 포함해 "버전을 올려 주는" 것. GitHub 에선 Dependabot alerts(스캔)와 Dependabot updates(PR)가 한 이름 아래 있어 헷갈린다.
- **lock 파일**이 없으면 Dependabot 이 바꿀 "고정 버전"이 없어 PR 의 diff 가 의미가 없다. 사실상 lock 파일을 갱신해 주는 봇이다.
- **Renovate** 는 같은 역할의 대안으로 설정이 더 세밀하고 GitHub 밖(GitLab 등)에서도 쓸 수 있다.
