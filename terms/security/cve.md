---
id: cve
term: 취약점/CVE
aliases:
  - CVE
  - Common Vulnerabilities and Exposures
  - 취약점 번호
  - 보안 취약점
category: security
tags:
  - 보안
  - 표준화
level: 2
related:
  - owasp-top-10
  - package-manager
  - docker-image
  - monitoring
  - semver
see_also:
  - https://www.cve.org/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

공개된 소프트웨어 취약점마다 붙는 **전 세계 공통 일련번호**.

## 비유

자동차 **리콜 번호**. "그 브레이크 문제" 라고 하면 헷갈리지만 리콜 번호를 말하면 어느 정비소든 같은 결함을 찾는다.

## 예시

번호 형식은 `CVE-연도-번호` 이고, 심각도는 CVSS 점수(0~10)로 따로 매긴다. 내 프로젝트가 쓰는 패키지에 알려진 CVE 가 있는지 주기적으로 돌린다.

```bash
npm audit                          # package-lock 기준으로 알려진 취약점 조회
npm audit fix                      # 패치 버전으로 올릴 수 있는 것은 자동 수정
pip-audit                          # Python 쪽 (pip install pip-audit)
trivy image labapp:latest          # 컨테이너 이미지 안의 OS 패키지까지 검사
```

연구실 Proxmox·Caddy·Docker 같은 서버 소프트웨어도 대상이라, 릴리스 노트에 "CVE-" 가 보이면 그 주에 업데이트한다. [확인 필요] 유명 사례로 2024년 xz 백도어(CVE-2024-3094)가 있다.

## 헷갈리기 쉬운 것

- **CVSS** 는 그 취약점이 얼마나 심각한지 매긴 점수(0~10). CVE 는 이름표, CVSS 는 그 이름표에 붙은 위험도.
- **OWASP Top 10** 은 취약점 "유형" 의 순위표. CVE 는 특정 제품·버전의 "개별 결함" 하나하나에 붙는 번호.
