---
id: layered-architecture
term: 레이어드 아키텍처
aliases:
  - Layered Architecture
  - 계층형 아키텍처
  - 3계층 구조
  - Controller-Service-Repository
  - N-tier
category: backend
tags:
  - 아키텍처패턴
  - 설계원칙
level: 2
kind: pattern
related:
  - mvc-mvvm
  - dependency-injection
  - web-framework
  - orm
  - rest
  - solid
  - clean-architecture
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

서버 코드를 **요청 받기·업무 규칙·DB 접근** 층으로 나누고 위에서 아래로만 부르게 하는 구조.

## 비유

식당의 **홀 직원·주방장·창고 담당**. 홀은 주문만 받아 주방에 넘기고, 주방은 레시피대로 만들며, 재료는 창고 담당만 꺼낸다 — 홀 직원이 창고에 직접 들어가지 않는다.

## 예시

NestJS 에서 Devpedia 카드 API 를 만든다면 폴더가 이렇게 갈린다:

```text
src/terms/
  terms.controller.ts   # HTTP 만: 경로, 상태 코드, 입력 검증
  terms.service.ts      # 업무 규칙: "related 는 최대 7개, 자기 자신 금지"
  terms.repository.ts   # DB 만: Prisma / SQL
```

```ts
@Controller("terms")
export class TermsController {
  constructor(private readonly service: TermsService) {}   // 바로 아래층만 주입
  @Get(":id")
  find(@Param("id") id: string) { return this.service.find(id) }   // 규칙은 모른다
}
```

Spring 이면 `@RestController → @Service → @Repository`, Django 면 `views → services → models` 로 이름만 다르다. 규칙은 두 가지: **의존은 아래로만**(Repository 가 Controller 를 import 하면 안 됨), **각 층은 자기 일만**(Controller 에 `if (level > 3)` 같은 업무 규칙이 들어가면 안 됨). 그래야 Service 를 HTTP 없이 단위 테스트하고, DB 를 Supabase 에서 다른 것으로 바꿔도 Repository 만 고친다. 면접에서는 "Controller 에 비즈니스 로직을 넣으면 왜 안 되나?", "Service 와 Repository 의 책임을 나누는 기준은?" 으로 나온다.

## 헷갈리기 쉬운 것

- **MVC** 는 화면(View)이 있는 앱을 나누는 틀이고, 레이어드는 서버 안쪽을 나누는 틀. 웹 백엔드에서는 MVC 의 Controller 가 그대로 최상층이고 Model 이 Service+Repository+엔티티로 펼쳐진 것이라 보면 된다.
- **클린/헥사고날 아키텍처**는 의존 방향을 뒤집어 업무 규칙이 DB 를 모르게 만든 것. 레이어드는 Service 가 Repository 를 직접 알기 때문에 더 단순하고, 대부분의 과제·소규모 서비스에는 이걸로 충분하다.
- **마이크로서비스**는 프로세스를 쪼개는 것이고 레이어드는 한 프로세스 안의 코드를 쪼개는 것. 마이크로서비스 각각의 안쪽도 보통 레이어드다.
