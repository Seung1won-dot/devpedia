---
id: latency-bandwidth
term: 대역폭/지연시간
aliases:
  - Bandwidth
  - Latency
  - 레이턴시
  - 핑(ping)
category: network
tags:
  - 성능
  - 네트워크
  - TCP/IP
level: 1
kind: metric
related:
  - three-way-handshake
  - cdn
  - tcp-udp
  - monitoring
  - gpu-cuda
  - slo-sla
see_also:
  - https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Understanding_latency
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

대역폭은 **한 번에 보낼 수 있는 양**, 지연시간은 **한 번 갔다 오는 데 걸리는 시간**이다.

## 비유

대역폭은 **고속도로 차선 수**, 지연시간은 **출발지에서 목적지까지 걸리는 시간**. 차선을 늘리면 트럭(큰 파일)이 한꺼번에 많이 지나가지만, 서울→부산 거리 자체가 줄지는 않는다.

## 예시

```bash
ping -c 5 gpu-server        # 지연시간: 연구실 안 1ms, Tailscale 경유 집 20~40ms, 해외 200ms+
iperf3 -c gpu-server        # 대역폭: 같은 스위치면 약 940 Mbit/s (1G 랜)
```

학습 데이터셋 100GB 를 GPU 서버로 옮길 땐 대역폭이 문제(1G 랜이면 15분 정도), Ollama 에 짧은 질문을 던질 땐 지연시간이 문제. 웹앱이 느릴 때 파일 크기를 줄여도 안 빨라지면 대역폭이 아니라 왕복 횟수(지연시간) 쪽을 봐야 한다.

## 헷갈리기 쉬운 것

- **처리량(throughput)** 은 실제로 나온 속도, 대역폭은 이론상 최대치. 1G 랜(대역폭)에서 실제 복사가 700 Mbit/s 로 나오면 그게 처리량.
- **핑(ping)** 은 지연시간을 재는 도구 이름이 그대로 지연시간의 별명이 된 것. 게임에서 "핑 높다" = 지연시간 크다.
