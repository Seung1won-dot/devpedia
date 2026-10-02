---
id: tech-stack-selection
term: 기술 스택 선정
aliases:
  - Tech Stack Selection
  - 기술 스택
  - 스택 선택
  - 기술 선정
category: swe
tags:
  - 아키텍처
  - 방법론
  - 면접
  - 연구실
level: 2
kind: concept
related:
  - adr
  - trade-off
  - tech-decision-rationale
  - web-framework
  - open-source-license
  - mvp
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

만들 것과 팀 상황에 맞춰 **언어·프레임워크·DB 를 고르고 이유를 남기는** 일.

## 비유

**캠핑 장비 고르기**. 유튜버가 쓰는 최신 텐트가 아니라 우리 인원·차 크기·날씨에 맞고, 고장 나면 근처에서 고칠 수 있는 걸 고른다.

## 예시

```text
[EMR 추출 데이터 대시보드 — 3명, 6개월, 병원 폐쇄망에 배포]
후보: Next.js + Prisma  /  FastAPI + React + PostgreSQL  /  Django

1. 팀이 지금 아는 것?        셋 다 Python·pandas 는 씀, JS 는 한 명       → Python 백엔드 +1
2. 폐쇄망에서 설치 가능?      pip·npm 오프라인 미러 필요 — 의존성 적은 쪽 유리
3. 핵심이 데이터 처리인가?    pandas 와 같은 프로세스에서 돌리고 싶다          → FastAPI +1
4. 1년 뒤 누가 유지보수?      졸업하면 후배 — 문서 많고 널리 쓰이는 것
5. 라이선스·비용?             전부 MIT·PostgreSQL 라이선스 — 문제 없음
→ FastAPI + React(Vite) + PostgreSQL.  docs/adr/0001-stack.md 에 기록
```

순서가 중요하다 — **제약(팀·배포 환경·데이터·기간)을 먼저 적고**, 기술 비교는 그다음이다. "요즘 핫해서"는 이유가 아니고 "팀이 이미 알아서"는 아주 좋은 이유다. 흔한 실수는 이력서용 신기술 끼워 넣기와 과한 스택(3명 프로젝트에 쿠버네티스). 바뀔 가능성이 큰 부분(LLM 공급자, 벡터 DB)은 교체 비용이 낮은 쪽을 고른다. 결정은 ADR 로 남겨야 반년 뒤 "왜 Django 안 썼지?"에 답할 수 있고, 그 기록이 면접의 "기술 선택 이유"가 된다.

## 헷갈리기 쉬운 것

- **아키텍처 설계**는 "어떻게 나눌지", 스택 선정은 "무엇으로 만들지". 같은 스택으로 모놀리식도 마이크로서비스도 만들 수 있다.
- **ADR** 은 선정 결과를 적는 양식이고, 스택 선정은 그 앞의 비교 과정이다.
- **MVP** 단계에선 스택보다 빨리 검증하는 게 우선이라, 가장 익숙한 스택을 그냥 쓰는 게 보통 맞다.
