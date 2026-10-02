---
id: raspberry-pi
term: 라즈베리 파이
aliases:
  - Raspberry Pi
  - 라즈파이
  - RPi
  - SBC
  - 싱글보드 컴퓨터
category: embedded
tags:
  - 하드웨어
  - 리눅스
  - IoT
  - 홈랩
level: 1
kind: tool
related:
  - microcontroller
  - arduino
  - linux-distro
  - gpio
  - iot
  - homelab
see_also:
  - https://www.raspberrypi.com/documentation/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

신용카드만 한 판 하나에 **리눅스가 도는** 저렴한 싱글보드 컴퓨터.

## 비유

**손바닥만 한 데스크톱 본체**. 모니터·키보드를 꽂으면 그냥 PC 이고, 옆에 핀이 달려 있어 센서도 바로 연결할 수 있다.

## 예시

```bash
# 라즈베리 파이 OS(데비안 계열)에 SSH 로 접속해 센서 수집 스크립트 실행
ssh pi@raspberrypi.local
sudo apt install python3-gpiozero
python3 collect_spo2.py   # BLE 산소포화도 측정기 값을 받아 서버로 전송
```

연구실에서는 병실 침대 옆에 두는 **게이트웨이**로 자주 쓴다. 웨어러블이 BLE 로 보낸 값을 파이가 받아 MQTT 로 서버에 올린다. 리눅스라 Python·Docker·SSH 를 평소처럼 쓸 수 있다는 게 가장 큰 장점이다.

## 헷갈리기 쉬운 것

- **아두이노**(MCU)와 달리 OS 가 있어서 부팅에 수십 초가 걸리고, 전원을 그냥 뽑으면 SD 카드가 깨질 수 있다. 대신 네트워크·파일·여러 프로그램을 동시에 다룬다.
- 정확한 타이밍(μs 단위)이 필요한 신호 생성은 리눅스 스케줄러 때문에 흔들린다. 그런 일은 옆에 MCU 를 붙여 맡기는 게 보통이다.
- **Raspberry Pi Pico** 는 이름만 같고 RP2040 MCU 보드라 리눅스가 돌지 않는다.
