---
id: secret-leak
term: 시크릿 유출(.env 커밋)
aliases:
  - Secret Leak
  - 시크릿 유출
  - API 키 유출
  - 크리덴셜 유출
category: security
tags:
  - 키관리
  - Git
level: 1
related:
  - secrets-management
  - gitignore
  - environment-variable
  - git
  - least-privilege
see_also:
  - https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

API 키·비밀번호 같은 **비밀값이 코드나 공개 저장소에 노출**되는 사고.

## 비유

집 열쇠를 현관 앞 **화분 밑**에 두고 그 사진을 SNS 에 올리는 것. 사진을 지워도 이미 본 사람은 사라지지 않는다.

## 예시

`.env` 를 커밋하기 전에 막는 게 첫째, 이미 올라갔다면 지우는 것보다 **키를 폐기하고 새로 발급**하는 게 먼저다.

```bash
echo ".env" >> .gitignore
git rm --cached .env                          # 이미 추적 중이면 인덱스에서만 뺀다
git log --all --oneline -S "service_role"     # 과거 커밋 어딘가에 남아 있는지 확인
```

공개 저장소에 올라간 키는 봇이 수 분 안에 긁어 간다. GitHub 저장소 Settings → Code security 의 Push protection 을 켜면 키 모양 문자열은 push 자체가 거부된다. Supabase 의 `service_role` 키는 RLS 를 통째로 우회하니 서버에서만 쓰고, 프론트엔드 번들에는 `anon` 키만 들어가야 한다.

## 헷갈리기 쉬운 것

- **시크릿 관리**는 유출을 막는 "방법" (환경변수, GitHub Secrets, 볼트). 시크릿 유출은 그게 실패한 "사고".
- **환경변수**는 시크릿을 코드 밖에 두는 통로일 뿐이다. 그 값을 담은 `.env` 파일이 커밋되면 코드에 하드코딩한 것과 똑같다.
