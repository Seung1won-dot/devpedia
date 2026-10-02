---
id: arduino
term: 아두이노
aliases:
  - Arduino
  - Arduino Uno
  - 아두이노 IDE
  - 스케치
category: embedded
tags:
  - 마이크로컨트롤러
  - 펌웨어
  - 개발도구
level: 1
kind: tool
related:
  - microcontroller
  - gpio
  - uart
  - raspberry-pi
  - firmware
see_also:
  - https://docs.arduino.cc/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

MCU 를 **초보도 쉽게 다루도록** 만든 오픈소스 보드와 개발 환경 묶음.

## 비유

**레고 기본 세트**. 전자 회로를 처음부터 납땜하는 대신, 판 위에 꽂고 코드 몇 줄만 쓰면 바로 움직인다.

## 예시

```cpp
const int LED = 13;

void setup() {            // 전원이 들어오면 딱 한 번
  pinMode(LED, OUTPUT);
  Serial.begin(115200);
}

void loop() {             // 그 뒤로 끝없이 반복
  int raw = analogRead(A0);       // 맥박 센서 값 읽기
  Serial.println(raw);
  digitalWrite(LED, raw > 600 ? HIGH : LOW);
  delay(10);
}
```

아두이노 프로그램(스케치)은 `setup()` 과 `loop()` 두 함수가 전부다. 실제로는 C++ 이고, IDE 가 `main()` 을 숨겨서 `setup()` 한 번 → `loop()` 무한 반복으로 불러 준다. 업로드 버튼을 누르면 크로스 컴파일과 굽기가 한 번에 된다. 연구실에서 센서 시제품을 빨리 확인할 때 많이 쓰고, 제품 단계에서는 STM32·nRF 계열과 전용 SDK 로 옮겨 가는 편이다.

## 헷갈리기 쉬운 것

- **라즈베리 파이**는 리눅스가 도는 컴퓨터, 아두이노는 OS 없이 스케치 하나만 도는 MCU 보드다.
- "아두이노"는 보드 이름이면서 IDE·라이브러리 생태계 이름이기도 하다. ESP32 같은 다른 칩도 아두이노 방식으로 코딩할 수 있다.
