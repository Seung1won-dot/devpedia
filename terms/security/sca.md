---
id: sca
term: 의존성 취약점 스캔(SCA)
aliases:
  - SCA
  - Software Composition Analysis
  - 소프트웨어 구성 분석
  - npm audit
  - pip-audit
category: security
tags:
  - 보안
  - CI/CD
  - 개발도구
level: 2
kind: tool
related:
  - cve
  - dependabot
  - lockfile
  - supply-chain-attack
  - package-manager
  - github-actions
see_also:
  - https://docs.npmjs.com/cli/v10/commands/npm-audit
  - https://owasp.org/www-community/Component_Analysis
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

내 프로젝트가 **가져다 쓰는 라이브러리에 알려진 취약점**이 있는지 자동으로 대조하는 검사.

## 비유

장 봐 온 식재료를 **리콜 목록**과 대조해 보는 것. 내가 만든 요리가 아니라 사 온 재료에 문제가 있을 수 있으니, 영수증(lock 파일)을 보고 하나씩 확인한다.

## 예시

내가 쓴 코드는 몇천 줄이어도 `node_modules` 나 `site-packages` 는 수십만 줄이다. 그쪽에 뚫린 구멍은 눈으로 못 찾으니 도구가 lock 파일을 CVE 데이터베이스와 맞춰 본다.

```bash
npm audit --audit-level=high      # package-lock.json 의 모든 의존성을 대조, high 이상이면 종료코드 1
pip-audit -r requirements.txt     # Python (pip install pip-audit)
trivy fs .                        # 여러 언어의 lock 파일 + Dockerfile 을 한 번에
```

GitHub Actions 에 넣어 두면 PR 마다 자동으로 돌고, Dependabot 을 켜면 고친 버전으로 올리는 PR 까지 만들어 준다. 결과가 수십 개 떠도 당황하지 말 것 — 테스트에만 쓰는 dev 의존성인지, 취약한 함수를 실제로 호출하는지 보고 우선순위를 매긴다. `npm audit fix --force` 는 메이저 버전을 올려 앱을 깨뜨릴 수 있으니 쓰지 않는다.

## 헷갈리기 쉬운 것

- **SAST**(정적 분석, Semgrep·CodeQL) 는 **내가 쓴 코드**의 결함을 찾는다. SCA 는 **남이 쓴 코드**(의존성)의 알려진 결함을 찾는다. 보는 대상이 다르다.
- **DAST** 는 돌아가는 서비스에 실제 요청을 날려 보는 검사. 코드를 안 보고 밖에서 두드린다.
- **Dependabot** 은 SCA 결과를 받아 버전을 올리는 PR 을 만드는 도구. 스캔 자체가 아니라 그다음 단계다.
