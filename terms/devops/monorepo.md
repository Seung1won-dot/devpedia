---
id: monorepo
term: 모노레포
aliases:
  - Monorepo
  - 단일 저장소
  - 모노리포
  - 멀티레포 vs 모노레포
category: devops
tags:
  - Git
  - 협업
  - 아키텍처패턴
level: 2
kind: pattern
related:
  - git
  - microservices
  - codeowners
  - ci-cd
  - task-runner
  - lockfile
see_also:
  - https://monorepo.tools/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

여러 프로젝트(API·프론트·공용 코드)를 **Git 저장소 하나**에 함께 두는 방식.

## 비유

연구실 **공용 캐비닛 하나**에 모든 프로젝트 서류를 넣는 것. 찾기 쉽고 양식을 통일하기 좋지만, 캐비닛이 커질수록 정리 규칙이 없으면 뒤죽박죽이 된다.

## 예시

```text
eclab-platform/
├── apps/
│   ├── api/            # FastAPI
│   └── web/            # React + Vite
├── packages/
│   └── fhir-types/     # 두 앱이 같이 쓰는 TypeScript 타입
├── package.json        # "workspaces": ["apps/*", "packages/*"]
└── .github/workflows/
```

```json
{
  "name": "eclab-platform",
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```

FHIR 타입 하나를 고치면 API 와 웹이 **같은 커밋**에서 바뀌므로 "타입 패키지 버전이 안 맞아요" 같은 사고가 사라지고, lock 파일·린트 설정도 하나다. 대신 CI 가 매번 전체를 돌리면 느려지니 바뀐 폴더만 돌리는 장치(워크플로의 `paths` 필터, Turborepo/Nx 의 affected)가 필요해진다. 앱 2~3개에 사람 3명인 연구실이라면 모노레포가 거의 항상 편하고, 멀티레포가 이기는 건 팀·배포 주기·접근 권한이 완전히 다를 때다.

## 헷갈리기 쉬운 것

- **모놀리식**과 다르다. 모노레포는 "코드가 한 저장소에" 있는 것이고, 배포는 마이크로서비스로 따로 할 수 있다. 모놀리식은 "배포 단위가 하나".
- **멀티레포(폴리레포)** 는 프로젝트마다 저장소를 두는 것. 권한과 릴리스 주기를 따로 가져가기 좋지만, 공용 코드 하나 바꾸면 PR 을 여러 군데 열어야 한다.
- **Git 서브모듈**은 다른 저장소를 특정 커밋에 고정해 끼워 넣는 기능이다. 모노레포의 대용으로 쓰면 "서브모듈 업데이트 안 했어요" 지옥이 열린다.
