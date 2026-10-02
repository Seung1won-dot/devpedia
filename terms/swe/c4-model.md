---
id: c4-model
term: C4 모델
aliases:
  - C4 Model
  - C4 다이어그램
  - Context-Container-Component-Code
  - 아키텍처 다이어그램
category: swe
tags:
  - 문서화
  - 아키텍처
  - 협업
level: 3
kind: pattern
related:
  - sequence-diagram
  - erd
  - adr
  - readme
  - docker-compose
  - microservices
see_also:
  - https://c4model.com/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

시스템 구조를 **지도처럼 네 단계로 확대**해 가며 그리는 아키텍처 다이어그램 규칙.

## 비유

**지도 앱의 확대 단계**. 나라 → 도시 → 동네 → 건물 순으로 줌 인하되 한 화면에 나라와 건물을 같이 그리지 않으니, 보는 사람은 자기에게 필요한 배율만 보면 된다.

## 예시

```text
[Level 1 — System Context]  누가 쓰고, 어떤 외부 시스템과 닿는가
  연구원(사람) ──→ [ EMR 분석 플랫폼 ] ←── 병원 EMR (외부, 가명화 CSV 반출)
                          │
                          └──→ 로컬 LLM 서버 (외부, Ollama)

[Level 2 — Container]  따로 실행되는 덩어리. Docker Compose 서비스 하나 ≈ 상자 하나
  [React SPA] ──HTTPS──▶ [FastAPI API] ──SQL──▶ [PostgreSQL + pgvector]
                               │
                               └──HTTP──▶ [Ollama]  (GPU 서버)
  외부 접속은 Caddy 리버스 프록시 + Tailscale 을 통해서만
```

Level 3(Component) 은 FastAPI 상자 안의 라우터·서비스·리포지토리, Level 4(Code) 는 클래스 다이어그램인데 보통 4 는 그리지 않는다 — 코드가 금방 달라져 그림이 거짓말을 하기 때문이다. 규칙은 상자마다 **이름·기술·한 줄 책임**, 화살표마다 **무엇을 어떤 프로토콜로**. README 에 Level 1·2 두 장만 있어도 신입이 "이게 어디서 도는 거예요?"를 묻는 횟수가 확 준다. Structurizr DSL 이나 Mermaid 의 C4 문법으로 텍스트로 적어 git 에 넣으면 코드와 같이 리뷰된다. 트레이드오프: 3명 과제에 Level 3 까지 그리면 그림 유지가 코드 수정보다 비싸진다 — 1·2 만 그리고, 구조가 바뀌는 PR 에서 함께 고친다.

## 헷갈리기 쉬운 것

- **시퀀스 다이어그램**은 시간 순서(누가 누구를 먼저 부르나)를 그리는 동적 그림. C4 는 뭐가 있고 뭐와 연결되는지 정적 구조다. 시퀀스는 C4 의 상자들을 등장인물로 삼아 흐름 하나를 그린다.
- **ERD** 는 데이터 구조. C4 에서는 PostgreSQL 전체가 상자 하나일 뿐이다.
- **Docker 컨테이너**와 C4 의 "컨테이너"는 이름만 같다. C4 의 컨테이너는 "따로 실행되는 단위"라서 DB 도, 브라우저에서 도는 SPA 도 컨테이너다.
