---
id: secrets-management
term: 환경변수/시크릿 관리
aliases:
  - Secrets Management
  - 시크릿 관리
  - ".env 관리"
  - API 키 관리
category: devops
tags:
  - 키관리
  - 보안
  - 배포
  - 시크릿
level: 1
kind: concept
related:
  - environment-variable
  - secret-leak
  - gitignore
  - github-actions
  - environments
  - api-key
see_also:
  - https://12factor.net/config
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

API 키·비밀번호를 **코드 밖에 두고** 실행할 때만 넣어 주는 방법.

## 비유

집 열쇠를 **현관문에 붙여 두지 않고** 주머니에 갖고 다니는 것. 집 설계도(코드)를 남에게 보여 줘도 열쇠는 따로 있으니 안전하다.

## 예시

```bash
# 로컬: .env 에 두고 .gitignore 로 커밋 차단
echo 'SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T000/B000/xxxx' >> .env
echo '.env' >> .gitignore

# CI: 저장소 Settings → Secrets 에 등록하고 워크플로에서 이렇게 읽는다
#   - run: curl -X POST "$SLACK_WEBHOOK_URL" -d '{"text":"배포 완료"}'
#     env: { SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }} }
```

Hermes 크론잡이 쓰는 Slack 웹훅 URL 은 서버의 `.env` 로, GitHub Actions 는 저장소 Secrets 로, Vercel 은 프로젝트 환경변수 설정으로 넣는다. 셋 다 "코드 안에는 없다"가 공통이다.

## 헷갈리기 쉬운 것

- **환경변수 ≠ 시크릿**: `PORT=3000` 같은 설정도 환경변수지만 비밀은 아니다. 시크릿은 환경변수 중 새면 안 되는 것(키·토큰·비밀번호).
- **.env.example** 은 키 이름만 적고 값은 비운 견본 파일. 이건 커밋해서 팀원이 뭘 채워야 하는지 알게 한다.
