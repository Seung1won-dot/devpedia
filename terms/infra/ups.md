---
id: ups
term: UPS
aliases:
  - Uninterruptible Power Supply
  - 무정전 전원 장치
  - 유피에스
  - 무정전 전원 공급 장치
category: infra
tags:
  - 하드웨어
  - 홈랩
  - 서버운영
level: 1
kind: tool
related:
  - homelab
  - nas
  - server
  - proxmox
  - snapshot-backup
see_also:
  - https://networkupstools.org/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

정전이 나도 **배터리로 몇 분 버티며** 서버를 안전하게 끌 시간을 벌어 주는 장치.

## 비유

서버용 **보조 배터리**. 콘센트가 끊겨도 바로 꺼지지 않게 몇 분을 벌어 주어, 그 사이에 하던 일을 저장하고 정상 종료할 수 있게 한다.

## 예시

```bash
# Proxmox 호스트에 UPS 를 USB 로 연결하고 NUT 로 상태 읽기
apt install -y nut
# /etc/nut/ups.conf
# [lab-ups]
#   driver = usbhid-ups
#   port = auto
upsc lab-ups@localhost | grep -E "battery.charge|ups.status|battery.runtime"
# ups.status: OL (상용 전원) / OB (배터리로 동작 중) / LB (배터리 부족 → 종료 시작)
```

NUT 가 "배터리 부족(LB)" 을 감지하면 Proxmox 가 VM 들을 순서대로 끄고 호스트도 내려간다 — 쓰다 만 DB 파일이나 깨진 ZFS 풀 대신 다음날 정상 부팅을 만난다. 가정용 라인 인터랙티브 UPS 1000VA/600W 급이면 서버 한 대와 NAS 를 10~15분 정도 버티고 [확인 필요], 납축 배터리는 3~5년마다 갈아 줘야 한다 [확인 필요]. 데이터센터가 아니라 사무실 구석에 서버를 두는 연구실일수록 필요하다.

## 헷갈리기 쉬운 것

- **서지 보호 멀티탭**은 번개 같은 순간 과전압만 막을 뿐 전기가 끊기면 같이 꺼진다. UPS 는 서지 보호에 더해 전력을 공급한다.
- **발전기**는 몇 시간이고 돌지만 시동까지 몇 초 비고 소음·연료가 든다. UPS 가 그 몇 초를 메우고, 홈랩은 발전기 없이 UPS 만으로 "안전하게 끄기" 를 목표로 한다.
- **스냅샷·백업**은 데이터를 지키고, UPS 는 데이터가 쓰이던 도중 전원이 끊기는 사고 자체를 막는다. 둘은 대체재가 아니라 짝이다.
