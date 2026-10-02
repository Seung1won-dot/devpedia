---
id: gpio
term: GPIO
aliases:
  - General Purpose Input/Output
  - 범용 입출력
  - GPIO 핀
  - 디지털 핀
category: embedded
tags:
  - 마이크로컨트롤러
  - 하드웨어
  - 저수준
level: 1
kind: concept
related:
  - microcontroller
  - arduino
  - pwm
  - adc
  - interrupt
  - bitwise
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

코드로 **켜고 끄거나 읽을 수 있는** 칩의 범용 디지털 핀.

## 비유

벽에 달린 **전등 스위치**. 내가 올리면 불이 켜지고(출력), 반대로 누가 스위치를 눌렀는지 확인할 수도 있다(입력).

## 예시

```python
# MicroPython (ESP32): 2번 핀 LED 깜빡이기
from machine import Pin
import time

led = Pin(2, Pin.OUT)
while True:
    led.value(not led.value())
    time.sleep(0.5)
```

```c
// STM32 레지스터 직접 쓰기: PA5 를 HIGH 로 (BSRR 하위 16비트 = set)
GPIOA->BSRR = (1U << 5);
// 다시 LOW 로 (상위 16비트 = reset)
GPIOA->BSRR = (1U << (5 + 16));
```

각 핀은 입력/출력 모드를 고르고, 출력이면 HIGH(예: 3.3V)/LOW(0V), 입력이면 지금 전압이 높은지 낮은지를 읽는다. 버튼을 읽을 때는 계속 확인(폴링)하는 대신 핀 변화에 **인터럽트**를 걸면 전기를 아낀다. 3.3V 칩 핀에 5V 를 넣으면 칩이 망가질 수 있으니 전압부터 확인한다.

## 헷갈리기 쉬운 것

- GPIO 는 0/1 두 값뿐이다. 중간 밝기는 **PWM**(빠르게 껐다 켜기)으로 흉내 내고, 센서 전압 같은 연속값은 **ADC** 로 읽는다.
