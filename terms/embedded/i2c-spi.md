---
id: i2c-spi
term: I2C · SPI
aliases:
  - I²C
  - Inter-Integrated Circuit
  - Serial Peripheral Interface
  - 아이투씨
  - 센서 버스
category: embedded
tags:
  - 통신버스
  - 마이크로컨트롤러
  - 프로토콜
level: 2
kind: protocol
related:
  - uart
  - microcontroller
  - adc
  - gpio
  - vital-signs
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

MCU 가 센서·메모리 칩과 **짧은 거리에서** 데이터를 주고받는 두 가지 대표 버스.

## 비유

I2C 는 **한 줄짜리 반 호명**: 선생님이 "3번!" 하고 부르면 그 학생만 대답한다. SPI 는 학생마다 **전용 내선 전화**를 깔아 빠르지만 선이 많다.

## 예시

```python
# MicroPython: I2C 버스에 붙은 칩 주소 찾기 → 맥박·SpO2 센서 MAX30102 는 보통 0x57
from machine import I2C, Pin
i2c = I2C(0, scl=Pin(22), sda=Pin(21), freq=400_000)
print([hex(a) for a in i2c.scan()])
```

| | I2C | SPI |
| :-- | :-- | :-- |
| 선 | SDA·SCL 2가닥 | MOSI·MISO·SCK + 기기마다 CS |
| 상대 고르기 | 7비트 주소 | CS 핀을 LOW 로 |
| 속도 | 보통 100k~400kHz | 수~수십 MHz [확인 필요] |
| 주로 | 온도·가속도·PPG 센서 | 디스플레이, SD 카드, 고속 ADC |

센서가 안 잡히면 `scan()` 으로 주소부터 확인하고, I2C 는 풀업 저항이 빠졌는지 본다.

## 헷갈리기 쉬운 것

- **UART** 는 1:1·클럭 없음, I2C·SPI 는 1:N·클럭 공유다. 칩 바깥(PC·모듈)과는 UART, 보드 안 센서와는 I2C/SPI 를 쓰는 편이다.
- 선 수를 아끼려면 I2C, 속도가 필요하면 SPI 를 고른다.
