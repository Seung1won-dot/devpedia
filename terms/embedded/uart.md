---
id: uart
term: UART(시리얼 통신)
aliases:
  - Universal Asynchronous Receiver/Transmitter
  - 시리얼 통신
  - Serial
  - 보드레이트
  - 시리얼 모니터
category: embedded
tags:
  - 통신버스
  - 마이크로컨트롤러
  - 프로토콜
level: 2
kind: protocol
related:
  - i2c-spi
  - arduino
  - microcontroller
  - tmux
  - firmware
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

두 기기가 **약속한 속도로 한 비트씩** 주고받는 가장 단순한 시리얼 통신.

## 비유

**무전기 두 대**로 대화하기. 시계는 맞추지 않지만 "1초에 몇 글자로 말하자"는 속도만 미리 정해 두면 서로 알아듣는다.

## 예시

```bash
# 노트북에 USB-시리얼로 꽂은 보드의 로그 보기 (115200 bps)
screen /dev/ttyUSB0 115200
# 종료: Ctrl-a 다음 k
```

선은 TX·RX·GND 세 가닥이면 되고, 내 TX 를 상대 RX 에 엇갈려 꽂는다. 양쪽 **보드레이트**(9600, 115200 등)가 다르면 글자가 깨져 알아볼 수 없는 문자가 찍힌다 — 깨진 출력을 보면 속도부터 의심한다. 펌웨어 디버깅의 첫 도구가 이 시리얼 로그이고, 아두이노 IDE 의 "시리얼 모니터"도 같은 것이다. Windows 에서는 `/dev/ttyUSB0` 대신 `COM3` 같은 이름으로 잡힌다.

## 헷갈리기 쉬운 것

- **I2C·SPI** 는 클럭 선을 같이 보내는 동기식이라 빠르고 여러 기기를 버스에 붙인다. UART 는 클럭 없는 비동기식 1:1 연결이다.
- **USB** 는 전혀 다른 프로토콜이다. "USB 시리얼"은 USB 위에 UART 를 흉내 내는 변환 칩(CH340, FTDI 등)을 쓴 것이다.
- **RS-232/RS-485** 는 UART 신호를 더 멀리 보내기 위한 전압 규격이다.
