---
id: semver
term: 시맨틱 버저닝
aliases:
  - Semantic Versioning
  - SemVer
  - 유의적 버전
  - MAJOR.MINOR.PATCH
category: devops
tags:
  - 배포
  - 표준화
  - 협업
level: 1
kind: protocol
related:
  - package-manager
  - semantic-commit
  - rollback
  - container-registry
  - api
  - api-versioning
  - git-tag-release
see_also:
  - https://semver.org/lang/ko/
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

버전을 **MAJOR.MINOR.PATCH** 세 숫자로 적어 변경의 크기를 알리는 규칙.

## 비유

교과서 판본 표기. **개정판(MAJOR)** 은 목차가 바뀌어 옛 판과 같이 못 쓰고, **증보판(MINOR)** 은 장이 추가됐을 뿐이며, **오타 수정(PATCH)** 은 내용이 같다.

## 예시

```bash
# 지금 1.4.2 — 어디가 바뀌었나에 따라 올리는 자리가 다르다
npm version patch        # 1.4.3  버그 수정, 쓰는 쪽은 아무것도 안 바꿔도 됨
npm version minor        # 1.5.0  기능 추가, 기존 기능은 그대로
npm version major        # 2.0.0  기존 사용법이 깨짐 (API 응답 형식 변경 등)
git push --follow-tags   # v1.5.0 태그도 함께 올리기
```

Docker 이미지 태그(`hermes:1.5.0`)와 `package.json` 의 version 에 같은 규칙을 쓰면, 롤백할 때 어느 태그로 돌아가야 안전한지가 바로 보인다. 0.x 는 "아직 뭐든 바뀔 수 있음" 이라는 뜻이라 Devpedia 도 지금 0.1.0 이다.

## 헷갈리기 쉬운 것

- **시맨틱 커밋**은 커밋 메시지 규칙(`feat:`, `fix:`), 시맨틱 버저닝은 버전 번호 규칙. 둘을 이으면 `feat` → MINOR, `fix` → PATCH 로 버전을 자동으로 올릴 수 있다.
- **`^1.4.2` 와 `~1.4.2`**(package.json): `^` 는 MAJOR 만 고정(1.x.x 허용), `~` 는 MINOR 까지 고정(1.4.x 허용). SemVer 를 지킨다는 믿음 위에서 동작한다.
