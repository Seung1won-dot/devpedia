---
id: penetration-test
term: 침투 테스트
aliases:
  - Penetration Test
  - Pentest
  - 펜테스트
  - 모의 해킹
  - 모의 침투
category: security
tags:
  - 보안
  - 테스트
  - 웹취약점
level: 2
kind: concept
related:
  - owasp-top-10
  - cve
  - sql-injection
  - privilege-escalation
  - sca
  - security-headers
see_also:
  - https://owasp.org/www-project-web-security-testing-guide/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

허가받은 전문가가 **진짜 공격자처럼 실제로 뚫어 보며** 약점을 찾아 알려 주는 검사.

## 비유

은행이 돈을 주고 **금고털이 전문가를 고용**해 자기 금고를 털어 보게 하는 것. 진짜 도둑이 오기 전에 어느 창문이 허술한지 알게 된다.

## 예시

연구실 서비스를 Tailscale 밖으로 공개하기 전에 한 번 받는 것이 전형적인 시점. 반드시 **서면 허가(범위·기간·연락처)** 를 먼저 받는다 — 허가 없이 남의 서버를 두드리면 정보통신망법 위반이고, 학교·병원 네트워크는 특히 민감하다.

```bash
# 정찰: 내 서버에 어떤 포트·서비스가 열려 있는지 (반드시 내 소유 서버에만)
nmap -sV -p- lab.example.com
# 웹 기본 점검: OWASP ZAP 이 헤더·쿠키·흔한 설정 실수를 공격 없이 훑는다
docker run --rm -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://lab.example.com
```

결과물은 "뚫었다/못 뚫었다" 가 아니라 **심각도·재현 조건·수정 권고**가 적힌 보고서다. 자동 스캐너가 못 하는 일 — 낮은 취약점 여러 개를 엮어 관리자 권한까지 가는 경로를 보여 주는 것 — 이 사람이 하는 침투 테스트의 가치다.

## 헷갈리기 쉬운 것

- **취약점 스캔**은 도구가 알려진 결함 목록과 대조하는 자동 검사(넓고 얕게). 침투 테스트는 사람이 그 결함을 실제로 악용해 "어디까지 갈 수 있나" 를 증명한다(좁고 깊게).
- **레드팀**은 몇 주에 걸쳐 피싱·물리 침입까지 포함해 조직 전체를 공격하고, 방어팀(블루팀) 이 탐지하는지까지 본다. 침투 테스트는 정해진 시스템 범위 안에서 약점을 찾는 것.
- **버그 바운티**는 불특정 외부인이 알아서 찾아 신고하면 보상하는 상시 프로그램. 침투 테스트는 계약한 팀이 정해진 기간에 한다.
