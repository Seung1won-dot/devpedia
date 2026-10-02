---
id: endianness
term: 빅 엔디안/리틀 엔디안
aliases:
  - Endianness
  - 엔디안
  - 바이트 순서
  - Big Endian
  - Little Endian
  - 네트워크 바이트 순서
category: os
tags:
  - 컴퓨터구조
  - 네트워크
level: 2
kind: concept
related:
  - twos-complement
  - floating-point
  - tcp-udp
  - dicom
  - register
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

여러 바이트짜리 숫자를 메모리에 **큰 자리부터 놓을지 작은 자리부터 놓을지**의 순서.

## 비유

날짜 쓰는 순서. 한국은 **2026-09-29(큰 단위부터, 빅 엔디안)**, 유럽식은 **29-09-2026(작은 단위부터, 리틀 엔디안)** 인데 서로 약속 없이 주고받으면 9월 29일이 엉뚱한 날짜가 된다.

## 예시

```python
import struct, sys
n = 0x12345678
struct.pack(">I", n)      # b'\x12\x34\x56\x78'  빅 엔디안 (네트워크 순서)
struct.pack("<I", n)      # b'\x78\x56\x34\x12'  리틀 엔디안 (x86, ARM 기본)
sys.byteorder             # 'little'  ← 지금 이 컴퓨터

import socket
socket.htons(8080)        # 36895 — host to network short: 리틀→빅 변환
```

```bash
lscpu | grep -i "byte order"     # Byte Order: Little Endian
```

x86 과 대부분의 ARM 은 리틀 엔디안이고, TCP/IP 헤더(포트 번호·IP 주소)는 빅 엔디안이라 소켓 프로그래밍에서 `htons`/`ntohl` 로 매번 뒤집는다. 연구실에서 실제로 부딪히는 건 **DICOM** 이다. 전송 문법(Transfer Syntax)마다 엔디안이 다르고, `pydicom` 없이 바이트를 직접 읽다가 픽셀 값이 엉뚱하게 나오면 십중팔구 이 문제다. 면접에서는 "네트워크 바이트 순서는 무엇이고 왜 변환이 필요한가?" 로 나온다.

## 헷갈리기 쉬운 것

- **비트 순서가 아니라 바이트 순서**: 한 바이트 안의 비트는 안 뒤집힌다. `0x12345678` 이 `0x78563412` 가 되는 것이지 비트 단위로 거꾸로 되는 게 아니다.
- **1바이트 데이터엔 없다**: UTF-8 문자열이나 uint8 이미지 픽셀은 엔디안 문제가 없다. 2바이트 이상 숫자(int16 CT 픽셀, float32 텐서)를 파일·네트워크로 주고받을 때만 신경 쓴다.
- **UTF-16 의 BOM**: 텍스트 파일 맨 앞의 `FF FE`/`FE FF` 가 바로 "이 파일은 어느 엔디안" 표시. 윈도우에서 만든 파일이 리눅스에서 깨지는 원인 중 하나.
