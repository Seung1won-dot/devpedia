---
id: pwm
term: PWM
aliases:
  - Pulse Width Modulation
  - 펄스 폭 변조
  - 듀티비
  - Duty Cycle
category: embedded
tags:
  - 마이크로컨트롤러
  - 하드웨어
  - 저수준
level: 2
kind: concept
related:
  - gpio
  - adc
  - microcontroller
  - arduino
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

디지털 핀을 **아주 빠르게 껐다 켜서** 켜진 비율로 중간 세기를 흉내 내는 기법.

## 비유

선풍기 스위치를 1초에 수백 번 **껐다 켰다** 하는 것. 켜진 시간이 길수록 바람이 세게 느껴진다.

## 예시

```cpp
// 아두이노: 9번 핀 LED 밝기 0~255 단계 (analogWrite 는 실제로는 PWM)
void setup() { pinMode(9, OUTPUT); }
void loop() {
  for (int d = 0; d <= 255; d++) { analogWrite(9, d); delay(5); }
}
```

한 주기 중 HIGH 인 비율을 **듀티비**라고 한다. 듀티 25% 면 평균 전압이 대략 1/4 이 되어 LED 는 어둡게, 모터는 느리게 돈다. 주파수가 너무 낮으면 LED 가 깜빡이는 게 보이고 모터에서 소리가 나서, 용도에 맞게 수백 Hz~수십 kHz 로 맞춘다. 서보 모터는 듀티비 대신 펄스 폭(1~2ms)으로 각도를 정한다 [확인 필요].

## 헷갈리기 쉬운 것

- 함수 이름이 `analogWrite` 라서 **ADC** 의 반대(DAC, 진짜 아날로그 전압 출력)로 오해하기 쉽다. PWM 은 여전히 0/1 신호이고, 필요하면 RC 필터로 평평하게 만든다.
- 그냥 **GPIO** 로 코드에서 껐다 켜도 PWM 이지만, 타이머 하드웨어 PWM 을 쓰면 CPU 가 다른 일을 해도 주기가 흔들리지 않는다.
