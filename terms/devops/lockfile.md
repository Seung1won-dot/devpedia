---
id: lockfile
term: lock 파일
aliases:
  - Lock File
  - 락 파일
  - package-lock.json
  - uv.lock
  - poetry.lock
category: devops
tags:
  - 개발도구
  - 협업
  - 연구
level: 1
kind: concept
related:
  - package-manager
  - semver
  - virtualenv
  - dependabot
  - reproducibility
  - devcontainer
see_also:
  - https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json
  - https://docs.astral.sh/uv/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

설치된 모든 의존성의 **정확한 버전을 기록해** 누가 설치해도 같은 결과가 나오게 하는 파일.

## 비유

요리책에 "밀가루 적당히" 라고 적힌 게 package.json 이라면, lock 파일은 **"OO 브랜드 중력분 300g" 까지 적힌 장보기 영수증**. 영수증대로 사면 다른 사람 부엌에서도 같은 맛이 난다.

## 예시

```bash
npm install react     # package.json 엔 "^19.0.0"(범위), package-lock.json 엔 실제 깔린 19.1.0 + 해시
npm ci                # lock 파일 그대로 설치 — CI·서버에서는 install 대신 이것
uv add torch          # Python(uv): pyproject.toml 에 추가 + uv.lock 갱신
uv sync               # uv.lock 대로 정확히 설치 — GPU 서버와 노트북이 같은 버전
```

범위(`^19.0.0`)만 적어 두면 오늘 설치한 사람과 3개월 뒤 설치한 사람의 버전이 달라져 "내 컴퓨터에선 되는데" 가 생긴다. lock 파일은 의존성의 의존성까지 전부 고정하고 해시도 적어 두므로, 재현성이 중요한 실험 코드는 lock 파일을 **반드시 커밋**한다. `pip freeze > requirements.txt` 는 비슷한 역할이지만 해시가 없고 환경에 남은 잡동사니 패키지까지 섞인다.

## 헷갈리기 쉬운 것

- **package.json / pyproject.toml** 은 "내가 원하는 것(범위)", lock 파일은 "실제로 깔린 것(정확한 버전)". 사람이 고치는 건 전자뿐, 후자는 도구가 쓴다.
- **`npm install` 과 `npm ci`**: install 은 범위 안에서 lock 을 갱신할 수 있고, ci 는 lock 과 다르면 실패한다. 서버·CI 는 ci.
- **.gitignore 대상이 아니다.** lock 파일은 커밋한다. 남이 설치해 쓸 라이브러리를 만들 때만 커밋하지 않기도 한다.
