---
id: ble
term: BLE(블루투스 저전력)
aliases:
  - Bluetooth Low Energy
  - 블루투스 LE
  - GATT
  - Bluetooth Smart
category: embedded
tags:
  - 무선
  - IoT
  - 프로토콜
  - 생체신호
level: 2
kind: protocol
related:
  - wearable
  - vital-signs
  - iot
  - microcontroller
  - mobile-permissions
see_also:
  - https://www.bluetooth.com/specifications/specs/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

작은 값을 **띄엄띄엄 보내서 전지를 아끼는** 근거리 무선 통신 방식.

## 비유

**전화 대신 쪽지**. 계속 통화를 붙잡지 않고, 필요할 때만 짧은 쪽지를 건네고 다시 잠든다.

## 예시

```python
# 노트북(Python, bleak)에서 표준 심박 서비스 구독
import asyncio
from bleak import BleakClient

HR_MEASUREMENT = "00002a37-0000-1000-8000-00805f9b34fb"

def on_hr(_, data: bytearray):
    print("bpm:", data[1])          # 플래그 바이트 다음이 심박값(8비트일 때)

async def main():
    async with BleakClient("AA:BB:CC:DD:EE:FF") as c:
        await c.start_notify(HR_MEASUREMENT, on_hr)
        await asyncio.sleep(30)

asyncio.run(main())
```

BLE 기기는 먼저 **광고(advertising)** 로 "나 여기 있어" 를 뿌리고, 폰이나 게이트웨이가 연결한다. 데이터는 **GATT** 구조 — 서비스(심박 서비스) 안의 특성(심박 측정값) — 로 정리되어 있고, 값이 바뀔 때 **notify** 로 밀어 준다. 심박·체온·혈압·산소포화도는 블루투스 표준 프로필이 있어서 제조사가 달라도 같은 UUID 로 읽힌다. 스마트폰 앱에서 BLE 를 쓰려면 블루투스(Android 는 버전에 따라 위치) 권한이 필요하다 [확인 필요].

## 헷갈리기 쉬운 것

- **클래식 블루투스**(무선 이어폰 음악)는 계속 연결해 큰 데이터를 흘리고, BLE 는 짧은 값을 가끔 보낸다. 이름만 같고 사실상 다른 프로토콜이다.
- **Wi-Fi** 는 빠르고 인터넷에 바로 붙지만 전기를 많이 먹는다. 그래서 웨어러블 → (BLE) → 폰/게이트웨이 → (Wi-Fi·LTE) → 서버 구조가 흔하다.
