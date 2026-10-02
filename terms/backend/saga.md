---
id: saga
term: 사가 패턴
aliases:
  - Saga Pattern
  - 사가
  - 보상 트랜잭션
  - 분산 트랜잭션 대안
category: backend
tags:
  - 분산시스템
  - 아키텍처패턴
  - 트랜잭션
  - 메시지큐
level: 3
kind: pattern
related:
  - transaction-acid
  - microservices
  - event-driven-architecture
  - idempotency
  - message-queue
  - cqrs
  - two-phase-commit
see_also:
  - https://microservices.io/patterns/data/saga.html
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

여러 서비스에 걸친 작업을 **단계별 로컬 트랜잭션으로 쪼개고 실패 시 보상으로 되돌리는** 패턴.

## 비유

여행사 패키지 예약. 항공·호텔·렌터카를 차례로 따로 예약하다가 렌터카가 안 되면, 이미 잡아 둔 호텔과 항공을 하나씩 취소(보상)해서 없던 일로 만든다.

## 예시

"연구 데이터셋 반출" 은 GPU 예약·스토리지 복사·승인 기록이 서로 다른 서비스와 DB 에 있어 트랜잭션 하나로 못 묶는다. 사가의 뼈대:

```python
# 각 단계는 자기 DB 에만 커밋하는 로컬 트랜잭션. 짝이 되는 보상 함수를 함께 둔다.
steps = [
    (reserve_gpu,     release_gpu),      # 1. GPU 슬롯 예약     / 보상: 예약 취소
    (copy_dataset,    delete_dataset),   # 2. 데이터셋 복사     / 보상: 복사본 삭제
    (record_approval, None),             # 3. 승인 기록        / 마지막 단계는 보상 불필요
]

def run_saga(job_id: str):
    completed = []
    for do, undo in steps:
        try:
            do(job_id)
            completed.append(undo)
        except Exception:
            for undo in reversed(completed):   # 성공한 단계를 역순으로 되돌린다
                if undo:
                    undo(job_id)
            raise
```

**오케스트레이션**은 위처럼 조정자 하나가 순서와 보상을 지휘한다. **코레오그래피**는 조정자 없이 각 서비스가 이벤트를 듣고 다음 일을 하는데, 서비스가 늘면 전체 흐름을 아무도 모르게 되기 쉽다. 보상은 롤백이 아니라 **반대 방향의 새 작업**이라(보낸 메일은 못 지우니 취소 메일을 보내는 식) 재시도돼도 안전하게 멱등해야 하고, 조정자가 죽어도 이어 가도록 진행 상태를 DB 에 남긴다.

**쓰지 말아야 할 때**: 작업이 DB 하나에서 끝나면 그냥 트랜잭션을 쓴다 — 사가는 ACID 를 포기하고 복잡도(중간 상태 노출, 보상 실패)를 사는 거래다. 중간 상태가 잠시라도 보이면 안 되는 작업(계좌 이체)에는 맞지 않고, 마이크로서비스를 막 시작했다면 경계를 다시 그어 트랜잭션이 한 서비스 안에 들어가게 하는 게 먼저다.

## 헷갈리기 쉬운 것

- **트랜잭션(ACID)** 은 한 DB 안에서 전부 아니면 전무를 보장한다. 사가는 여러 DB·서비스에 걸쳐 그걸 흉내 내되, 중간 상태가 잠깐 보인다(결과적 일관성).
- **2단계 커밋(2PC)** 은 조정자가 참여자를 모두 잠그고 동시에 커밋하는 진짜 분산 트랜잭션. 강하게 일관되지만 느리고 조정자가 죽으면 전부 멈춘다.
- **롤백**은 DB 가 자동으로 되돌리는 것, **보상 트랜잭션**은 개발자가 직접 짠 반대 작업. 보상도 실패할 수 있어 알림·수동 처리 경로가 필요하다.
