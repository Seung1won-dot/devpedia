---
id: firmware
term: 펌웨어
aliases:
  - Firmware
  - FW
  - OTA 업데이트
  - Over-the-Air Update
category: embedded
tags:
  - 펌웨어
  - 마이크로컨트롤러
  - 배포
level: 1
kind: concept
related:
  - microcontroller
  - boot-process
  - cross-compile
  - bare-metal-programming
  - watchdog-timer
  - samd
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

기기 안의 플래시 메모리에 **구워 넣어** 그 하드웨어를 직접 움직이는 프로그램.

## 비유

전자레인지 안에 박혀 있는 **요리 설명서**. 사용자는 버튼만 누르지만, 버튼마다 몇 초 돌릴지는 그 설명서가 정해 둔다.

## 예시

```bash
# ESP32 에 빌드한 펌웨어를 USB 로 굽기 (esptool)
esptool.py --chip esp32 --port /dev/ttyUSB0 write_flash 0x10000 firmware.bin
```

책상 위에서는 이렇게 USB 로 굽지만, 이미 환자에게 나간 웨어러블은 회수할 수 없다. 그래서 무선으로 새 펌웨어를 내려받아 교체하는 **OTA 업데이트**를 넣는다. OTA 는 받는 도중 전원이 끊겨도 기기가 벽돌이 되지 않도록 슬롯 두 개(A/B)에 번갈아 쓰고, 서명을 검사한 뒤에만 부팅하게 만드는 게 보통이다. 의료기기라면 펌웨어 버전 변경도 인허가·변경 관리 대상이 될 수 있다 [확인 필요].

## 헷갈리기 쉬운 것

- **소프트웨어**(앱)는 OS 위에서 깔고 지우는 것, 펌웨어는 기기 자체에 붙어 OS 없이도 도는 것이다. 다만 공유기·SSD 처럼 펌웨어 안에 작은 OS 가 들어 있는 경우도 있어 경계는 흐리다.
- **드라이버**는 PC 의 OS 가 장치를 부리는 코드, 펌웨어는 장치 쪽 칩 안에서 도는 코드다.
