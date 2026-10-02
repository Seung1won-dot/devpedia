---
id: adc
term: ADC(아날로그-디지털 변환)
aliases:
  - Analog-to-Digital Converter
  - 아날로그-디지털 변환기
  - 샘플링
  - 분해능
category: embedded
tags:
  - 마이크로컨트롤러
  - 생체신호
  - 하드웨어
level: 2
kind: concept
related:
  - gpio
  - pwm
  - ecg
  - vital-signs
  - i2c-spi
  - wearable
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

센서가 내는 **연속적인 전압을 숫자로** 바꿔 MCU 가 읽게 해 주는 장치.

## 비유

계속 변하는 키를 **눈금 자로 일정 간격마다 재서** 수첩에 숫자로 적는 것. 자 눈금이 촘촘할수록(분해능), 자주 잴수록(샘플링) 원래 모양에 가깝다.

## 예시

```python
# MicroPython (ESP32): 34번 핀에 연결한 ECG 모듈 출력 읽기, 약 250Hz
from machine import ADC, Pin
import time
adc = ADC(Pin(34))
adc.atten(ADC.ATTN_11DB)      # 입력 범위 약 0~3.3V
while True:
    print(adc.read_u16())     # 0~65535 로 정규화된 값
    time.sleep_ms(4)
```

두 숫자를 기억한다. **분해능**(비트 수): 12비트면 0~4095 단계로 나눈다. **샘플링 레이트**: 1초에 몇 번 재느냐. 신호에 담긴 최고 주파수의 2배보다 빨리 재야 모양이 안 뭉개지고(나이퀴스트), 그래서 심전도는 보통 수백 Hz 로 샘플링한다 [확인 필요]. 연구 데이터에 "몇 Hz, 몇 비트로 찍었는지" 가 꼭 붙어야 하는 이유다.

## 헷갈리기 쉬운 것

- **GPIO** 입력은 높다/낮다 두 값만, ADC 는 그 사이 값을 숫자로 준다.
- **DAC** 는 반대 방향(숫자 → 전압)이다. **PWM** 은 DAC 없이 평균 전압을 흉내 내는 꼼수다.
- 많은 디지털 센서는 칩 안에 ADC 가 들어 있어서 MCU 는 I2C 로 이미 숫자가 된 값만 받는다.
