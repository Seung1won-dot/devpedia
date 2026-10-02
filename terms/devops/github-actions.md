---
id: github-actions
term: GitHub Actions
aliases:
  - 깃허브 액션
  - GitHub 워크플로
  - 액션
category: devops
tags:
  - CI/CD
  - Git
  - 배포
level: 1
kind: tool
related:
  - ci-cd
  - git
  - pull-request
  - static-hosting
  - secrets-management
see_also:
  - https://docs.github.com/actions
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

GitHub 에 코드를 올리면 **자동으로 명령을 실행**해 주는 기능.

## 비유

편지를 우체통에 넣으면(push) 알아서 **검수·포장·배송**까지 해 주는 우체국. 내가 매번 "검사해 줘, 배포해 줘" 하지 않아도 정해진 절차가 돈다.

## 예시

```yaml
# .github/workflows/deploy.yml — Devpedia (요약)
on: { push: { branches: [main] } }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run validate && npm run build
      - uses: actions/deploy-pages@v4     # dist/ 를 GitHub Pages 로
```

main 에 push 하면 validate → build → Pages 배포가 자동으로 돈다. 실제 파일에는 `actions/upload-pages-artifact` 단계와 `permissions` 설정이 더 들어간다.

## 헷갈리기 쉬운 것

- **CI/CD** 는 개념(자동 검사·배포), GitHub Actions 는 그걸 구현하는 도구 중 하나. Jenkins·GitLab CI 도 같은 역할.
- **Vercel 배포**(Ender Chest)는 Vercel 이 push 를 감지해 알아서 빌드하므로 워크플로 파일을 안 써도 된다.
