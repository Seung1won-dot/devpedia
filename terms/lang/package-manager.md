---
id: package-manager
term: 패키지 매니저
aliases:
  - Package Manager
  - 패키지 관리자
  - npm
  - pip
category: lang
tags:
  - 개발도구
level: 1
related:
  - virtualenv
  - semver
  - gitignore
  - ci-cd
  - docker-image
see_also:
  - https://docs.npmjs.com/about-npm
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

남이 만든 라이브러리를 **버전까지 맞춰 내려받고 관리**해 주는 도구.

## 비유

**앱 스토어**. 원하는 앱을 이름만 대면 알아서 받아 주고, 그 앱이 필요로 하는 다른 것(의존성)까지 같이 챙기며 업데이트도 관리한다.

## 예시

```bash
# Node (npm): package.json 에 기록되고, package-lock.json 이 정확한 버전을 고정
npm install react@19            # 의존성 추가
npm install -D vitest           # 개발할 때만 쓰는 의존성
npm ci                          # lock 파일 그대로 설치 (CI·서버에서)

# Python (pip)
pip install pandas==2.2.2
pip freeze > requirements.txt   # 지금 깔린 버전 목록을 파일로
```

## 헷갈리기 쉬운 것

- **package.json vs package-lock.json**: 앞은 "대략 이 범위(^19.0.0)" 선언, 뒤는 "실제로 이 버전" 기록. lock 파일도 커밋해야 팀원 PC 에 똑같이 깔린다.
- **가상환경**은 패키지를 "어디에" 깔지 격리하는 것. npm 은 폴더별 `node_modules` 라 기본이 격리이고, pip 은 venv 를 따로 만들어야 한다.
