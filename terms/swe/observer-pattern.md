---
id: observer-pattern
term: 옵저버 패턴
aliases:
  - Observer Pattern
  - 옵저버
  - 관찰자 패턴
  - 구독-알림 패턴
  - Pub/Sub 과 옵저버
category: swe
tags:
  - 디자인패턴
  - React
level: 2
kind: pattern
related:
  - design-pattern
  - callback
  - state-management
  - message-queue
  - webhook
  - event-driven-architecture
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

상태가 바뀌면 **미리 등록해 둔 구독자들에게 알려 주는** 구조.

## 비유

**유튜브 구독**. 채널이 영상을 올리면 구독자 전원에게 알림이 가고, 채널은 누가 구독했는지 명단만 들고 있을 뿐 각자가 알림을 받고 뭘 하는지는 모른다.

## 예시

```python
class HeartRate:                                  # Subject — 상태를 가진 쪽
    def __init__(self): self._subs, self.bpm = [], 0
    def subscribe(self, fn):                      # Observer 등록
        self._subs.append(fn)
        return lambda: self._subs.remove(fn)      # 구독 해제 함수를 돌려준다
    def set(self, bpm):
        self.bpm = bpm
        for fn in self._subs: fn(bpm)             # 바뀌면 전원에게 알림

hr = HeartRate()
hr.subscribe(lambda b: print("차트 갱신", b))
off = hr.subscribe(lambda b: b > 120 and print("알람!", b))
hr.set(130)          # 차트 갱신 130 / 알람! 130
off(); hr.set(140)   # 차트 갱신 140 — 알람은 구독 해제됨
```

`HeartRate` 는 누가 듣는지 모른다. 차트·알람·로그 저장을 나중에 붙여도 `set()` 은 그대로라 **알리는 쪽과 반응하는 쪽이 분리**된다. DOM 의 `addEventListener`, React 의 외부 스토어 구독(`useSyncExternalStore`, Zustand 의 `subscribe`), Vue 의 반응성, RxJS 가 전부 이 구조다. 구독 해제를 잊으면 사라진 컴포넌트에 계속 알림이 가서 메모리 누수가 나는데, `useEffect` 의 cleanup 함수가 딱 `off()` 자리다.

면접에선 "옵저버 패턴과 Pub/Sub 의 차이는?" 이 단골이다 — 중간에 브로커가 있느냐, 서로를 아느냐로 답한다.

## 헷갈리기 쉬운 것

- **Pub/Sub**: 발행자와 구독자 사이에 브로커(메시지 큐·이벤트 버스)가 있어 서로를 전혀 모르고, 보통 비동기·프로세스 간이다. 옵저버는 주체가 구독자 목록을 직접 들고 같은 프로세스 안에서 바로 호출한다.
- **콜백**: 구독자가 넘기는 함수 하나하나가 콜백이다. 옵저버는 그 콜백을 여러 개 등록해 두고 상태 변화마다 전부 부르는 구조다.
- **웹훅**: HTTP 로 하는 옵저버. "이벤트 나면 이 URL 로 POST 해 줘" 하고 등록한다.
