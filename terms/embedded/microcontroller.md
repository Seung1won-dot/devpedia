---
id: microcontroller
term: 마이크로컨트롤러(MCU)
aliases:
  - Microcontroller
  - MCU
  - 마이컴
  - STM32
  - ESP32
category: embedded
tags:
  - 마이크로컨트롤러
  - 하드웨어
  - 컴퓨터구조
level: 1
kind: concept
related:
  - cpu
  - ram
  - firmware
  - gpio
  - arduino
  - raspberry-pi
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

CPU·메모리·입출력 핀을 **칩 하나에 다 넣은** 작은 컴퓨터.

## 비유

**도시락**. 밥·반찬·수저가 한 통에 다 들어 있어서 따로 차릴 필요 없이 바로 먹을 수 있지만, 대신 양은 적다.

## 예시

웨어러블 심박 패치 안에는 손톱만 한 MCU 하나가 들어 있다. 이 칩이 센서 값을 읽고, 간단한 필터를 돌리고, BLE 로 스마트폰에 보낸다. 흔히 보는 칩은 STM32(ARM Cortex-M 계열), ESP32(Wi-Fi·BLE 내장), 아두이노 우노에 들어간 ATmega328P 다.

메모리는 보통 RAM 수십~수백 KB, 플래시 수백 KB~수 MB 수준이라 [확인 필요] 리눅스는 못 올리고 펌웨어 하나만 돈다. 전기는 아주 적게 먹어서 코인 전지로 몇 달씩 버티기도 한다.

## 헷갈리기 쉬운 것

- **CPU** 는 계산만 하는 부품이고 메모리·입출력은 바깥 칩에 붙인다. MCU 는 그걸 전부 한 칩에 넣고 성능을 낮춘 대신 싸고 전기를 덜 쓴다.
- **라즈베리 파이**는 MCU 가 아니라 리눅스가 도는 작은 PC(SBC)다. 아두이노 보드는 MCU 를 쓰기 쉽게 핀을 빼 놓은 보드다.
- **MPU**(마이크로프로세서)는 외부 RAM 을 붙여 OS 를 올리는 쪽, MCU 는 내장 메모리로 펌웨어만 돌리는 쪽이다.
