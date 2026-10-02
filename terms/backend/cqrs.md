---
id: cqrs
term: CQRS
aliases:
  - Command Query Responsibility Segregation
  - 명령·조회 책임 분리
  - 커맨드 쿼리 분리
  - 씨큐알에스
category: backend
tags:
  - 아키텍처패턴
  - 분산시스템
  - 성능
level: 3
kind: pattern
related:
  - event-driven-architecture
  - ddd
  - replication
  - denormalization
  - saga
  - layered-architecture
see_also:
  - https://martinfowler.com/bliki/CQRS.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

데이터를 **바꾸는 쪽(명령)과 읽는 쪽(조회)의 모델·경로를 따로** 설계하는 패턴.

## 비유

병원의 **진료 차트 작성**과 **로비 현황판**. 의사는 환자별 차트에 꼼꼼히 적고(명령), 원무과는 그걸 미리 집계해 둔 현황판을 보기만 하니(조회) 서로 방해하지 않는다.

## 예시

진료 기록은 정규화된 테이블에 트랜잭션으로 쓰고, 대시보드의 "오늘 진료과별 건수"는 쓰기 때마다 갱신해 둔 별도 저장소에서 읽는다:

```python
import redis
r = redis.Redis()

# 명령 쪽: 정규화 테이블에 커밋하고 이벤트 발행
@app.post("/visits", status_code=201)
def create_visit(v: VisitIn, db: Session = Depends(get_db)):
    visit = Visit(**v.model_dump())
    db.add(visit)
    db.commit()
    publish("visit.created", {"dept": v.dept, "date": str(v.date)})   # 메시지 큐로
    return {"id": visit.id}

# 조회 쪽: 이벤트를 받아 읽기 전용 집계를 미리 만들어 둔다
def on_visit_created(evt):
    r.hincrby(f"visits:{evt['date']}", evt["dept"], 1)

@app.get("/dashboard/visits-by-dept")
def dashboard(date: str):
    return r.hgetall(f"visits:{date}")        # JOIN 도 GROUP BY 도 없이 즉답
```

쓰기 모델은 정합성과 트랜잭션에, 읽기 모델은 화면에 맞는 반정규화 형태에 최적화한다. 둘 사이는 이벤트로 맞추므로 **결과적 일관성**(몇 초 지연)을 받아들여야 한다. 가장 가벼운 형태는 "쓰기는 프라이머리 DB, 읽기는 레플리카" 로 연결만 나누는 것.

**쓰지 말아야 할 때**: CRUD 가 전부인 앱은 모델이 둘이 돼 유지 비용만 늘고 "방금 저장했는데 목록에 없어요" 류의 지연 버그가 생긴다. 쓰자마자 정확히 읽어야 하는 화면(재고·잔액)에도 맞지 않다. 읽기:쓰기 비율이 극단적이거나 조회 화면이 쓰기 모델과 모양이 전혀 다를 때(집계 대시보드, 검색)가 CQRS 의 자리이고, 그 전엔 인덱스와 캐시가 먼저다.

## 헷갈리기 쉬운 것

- **이벤트 소싱**은 현재 상태 대신 "일어난 사건의 로그"를 저장하는 것. 자주 짝지어지지만 별개라, CQRS 는 이벤트 소싱 없이 레플리카·캐시만으로도 된다.
- **레플리케이션**은 같은 모델을 그대로 복제한다. CQRS 의 읽기 모델은 모양 자체가 다를 수 있다(집계·비정규화).
- **CQS** 는 "값을 돌려주는 메서드는 상태를 바꾸지 말라"는 메서드 수준 원칙. CQRS 는 그 생각을 시스템 구조와 저장소까지 넓힌 것이다.
