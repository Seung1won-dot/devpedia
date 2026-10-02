---
id: watchdog-timer
term: 워치독 타이머
aliases:
  - Watchdog Timer
  - WDT
  - IWDG
  - 워치독
category: embedded
tags:
  - 펌웨어
  - 마이크로컨트롤러
  - 장애허용
level: 2
kind: concept
related:
  - firmware
  - rtos
  - bare-metal-programming
  - healthcheck
  - deadlock
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

프로그램이 정해진 시간 안에 신호를 안 주면 **멈춘 것으로 보고 칩을 재부팅**하는 타이머.

## 비유

**졸음운전 경보기**. 운전자가 일정 시간마다 버튼을 누르지 않으면 "잠들었다" 고 판단해 차를 세운다.

## 예시

```python
# MicroPython: 2초 안에 feed() 가 없으면 자동 리셋
from machine import WDT
wdt = WDT(timeout=2000)
while True:
    read_and_send_vitals()
    wdt.feed()          # "나 아직 살아 있어"
```

타이머는 계속 줄어들고, 코드가 `feed()`(kick)로 다시 채운다. 무한 루프·데드락·I2C 센서 무응답으로 코드가 멈추면 feed 가 끊겨 하드웨어가 강제로 리셋한다. 사람 손이 닿지 않는 병실 모니터나 원격 센서가 스스로 살아나는 마지막 안전장치다.

feed 는 **메인 루프 한 바퀴가 정상적으로 다 돌았을 때만** 해야 한다. 타이머 인터럽트에서 기계적으로 feed 하면 메인 로직이 멈춰도 워치독이 눈치채지 못한다. 재부팅 원인 레지스터를 읽어 "워치독 리셋이었다" 를 로그로 남기면 디버깅에 큰 도움이 된다.

## 헷갈리기 쉬운 것

- **헬스체크**는 바깥(로드 밸런서·쿠버네티스)이 서비스에 물어보는 것, 워치독은 칩 안의 하드웨어가 스스로 감시하는 것이다. 둘 다 "멈추면 재시작" 이라는 발상은 같다.
- 재부팅은 원인을 고치지 않는다. 워치독 리셋이 자주 난다면 버그를 찾아야 할 신호다.
