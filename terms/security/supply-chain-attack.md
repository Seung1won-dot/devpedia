---
id: supply-chain-attack
term: 공급망 공격
aliases:
  - Supply Chain Attack
  - 소프트웨어 공급망 공격
  - 타이포스쿼팅
  - 의존성 오염
category: security
tags:
  - 보안
  - 개발도구
  - CI/CD
  - 컨테이너
level: 3
kind: concept
related:
  - sca
  - cve
  - lockfile
  - digital-signature
  - container-registry
  - package-manager
see_also:
  - https://slsa.dev/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

내가 믿고 **가져다 쓰는 패키지·빌드 도구·업데이트 경로를 오염**시켜 나를 뚫는 공격.

## 비유

집 문을 따는 대신 **내가 주문한 가구 공장에 몰래 도청기를 심는 것**. 나는 정품이라 믿고 집 안에 들여놓는다.

## 예시

`pip install`, `npm install`, `FROM python:3.12`, `uses: actions/checkout@v4` — 이 한 줄 한 줄이 남의 코드를 내 서버에서 돌리겠다는 약속이다. 공격자는 유지보수자 계정을 탈취하거나(2018년 event-stream), 2년간 기여자로 신뢰를 쌓은 뒤 백도어를 넣거나(2024년 xz-utils, CVE-2024-3094), `reqeusts` 처럼 오타 이름의 가짜 패키지를 올려 둔다(타이포스쿼팅) [확인 필요].

```bash
npm ci                                     # package-lock 과 조금이라도 다르면 실패 — 몰래 바뀐 버전을 차단
docker images --digests python:3.12-slim   # 태그 대신 여기 나온 sha256 다이제스트를 Dockerfile 에 고정
```

GitHub Actions 는 `@v4` 같은 태그가 아니라 커밋 SHA 로 고정한다 — 태그는 누가 옮길 수 있다. **트레이드오프**: 다이제스트·SHA 고정은 "몰래 바뀜" 을 막는 대신 보안 패치도 자동으로 안 들어오니 Dependabot 이 올려 주는 PR 과 짝으로 써야 한다. 의존성을 줄이면 공격면도 줄지만 바퀴를 다시 만드는 비용이 든다. 3명 연구실이 전부 할 수는 없으니 lock 파일 커밋 + `npm ci` + 액션 SHA 고정 + SCA 스캔, 이 네 가지가 비용 대비 효과가 가장 크다.

## 헷갈리기 쉬운 것

- **SCA(의존성 취약점 스캔)** 는 "알려진" CVE 를 찾는다. 공급망 공격은 아직 아무도 모르는 악성 코드가 정상 릴리스로 들어오는 것이라, 스캐너가 깨끗하다고 해도 안전하다는 뜻은 아니다.
- **CVE** 는 대부분 개발자의 실수로 생긴 결함. 공급망 공격은 누군가 의도적으로 심은 것이라 패치만 기다려서는 안 되고 "어디서 받았나" 를 따져야 한다.
- **타이포스쿼팅**은 공급망 공격의 한 수법일 뿐이다. 유지보수자 계정 탈취, 빌드 서버 침입, 레지스트리 미러 오염도 모두 공급망 공격.
