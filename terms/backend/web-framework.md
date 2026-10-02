---
id: web-framework
term: 웹 프레임워크(Spring/Django/Express)
aliases:
  - Web Framework
  - 백엔드 프레임워크
  - Spring Boot
  - Django
  - Express
  - NestJS
  - FastAPI
category: backend
tags:
  - 개발도구
  - 아키텍처
  - 취업
level: 1
kind: tool
related:
  - layered-architecture
  - middleware
  - rest
  - orm
  - dependency-injection
  - roadmap-by-grade
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

라우팅·요청 해석·DB 연결처럼 **서버마다 반복되는 뼈대를 미리 갖춘 틀**에 내 코드를 끼워 넣는 것.

## 비유

기초·기둥·배관이 다 된 **모델하우스를 받아 벽지와 가구만 고르는 것**. 빨리 입주하지만 문 위치 같은 큰 구조는 틀이 정한 대로 따라야 한다.

## 예시

| 프레임워크 | 언어 | 성격 |
|---|---|---|
| Spring Boot | Java/Kotlin | 풀 기능. DI·JPA·보안 내장, 배울 게 많음. 국내 백엔드 공고 최다 [확인 필요] |
| Django / FastAPI | Python | Django 는 관리자 화면·ORM 포함, FastAPI 는 가볍고 비동기·타입 힌트 중심. AI 쪽과 궁합 |
| Express / NestJS | Node.js | Express 는 최소한만, NestJS 는 Spring 을 닮은 구조(DI·모듈·데코레이터) |

```python
# FastAPI: 라우팅, JSON 파싱, 타입 검증, /docs 문서를 틀이 다 해 준다
@app.get("/terms/{term_id}")
def read_term(term_id: str):
    return repo.find(term_id)      # 내가 쓰는 건 이 함수 안쪽뿐
```

내가 `read_term` 을 부르는 게 아니라 **프레임워크가 요청이 오면 내 함수를 부른다** — 이게 라이브러리와의 차이(제어의 역전)다. `requests.get()` 처럼 내가 부르면 라이브러리, 내가 등록해 두면 틀이 불러 주는 게 프레임워크. 셋 다 라우팅·미들웨어·ORM·의존성 주입·계층 분리라는 같은 개념을 이름만 바꿔 쓰므로, **하나를 골라 깊게** 파면 나머지는 문법 차이다. 연구실처럼 Python 모델 서빙이 붙으면 FastAPI 가, 국내 취업이 목표면 Spring Boot 가 무난한 첫 선택이다. 면접에서는 "라이브러리와 프레임워크의 차이는?", "왜 그 프레임워크를 골랐나?" 로 나온다.

## 헷갈리기 쉬운 것

- **라이브러리**는 내가 부르는 도구 상자, 프레임워크는 나를 부르는 틀. 흐름의 주도권이 누구에게 있느냐로 가른다.
- **런타임/언어**와 다르다. Node.js 는 JavaScript 를 서버에서 돌리는 런타임이고 Express 는 그 위의 프레임워크. Java 와 Spring 의 관계도 같다.
- **프론트 프레임워크**(React·Vue)는 브라우저 화면을 만드는 틀. 여기서 말하는 건 요청을 받아 DB 를 다루는 서버 쪽 틀이다.
