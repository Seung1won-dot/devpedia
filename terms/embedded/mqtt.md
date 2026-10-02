---
id: mqtt
term: MQTT
aliases:
  - Message Queuing Telemetry Transport
  - MQTT 브로커
  - Mosquitto
  - 발행/구독
category: embedded
tags:
  - IoT
  - 프로토콜
  - 메시지큐
level: 2
kind: protocol
related:
  - message-queue
  - iot
  - tcp-udp
  - event-driven-architecture
  - websocket
  - tls
  - exactly-once
see_also:
  - https://mqtt.org/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

작은 기기가 **브로커를 거쳐 주제별로** 메시지를 발행·구독하는 가벼운 IoT 프로토콜.

## 비유

**단톡방 여러 개**가 있는 우체국. 보내는 쪽은 "3병동/심박" 방에 올리기만 하고, 그 방을 구독한 사람은 누가 보냈는지 몰라도 전부 받는다.

## 예시

```bash
# 터미널 1: 병동 전체 심박 구독 (+ 는 한 단계 와일드카드)
mosquitto_sub -h broker.lab.local -t 'ward3/+/hr' -v

# 터미널 2: 침대 12번 게이트웨이가 값 발행
mosquitto_pub -h broker.lab.local -t 'ward3/bed12/hr' -m '{"bpm":78,"ts":1759450000}' -q 1
```

TCP 위에서 돌고 헤더가 몇 바이트뿐이라 배터리·대역폭이 빠듯한 기기에 맞다. **QoS** 0(한 번 보내고 끝)/1(최소 한 번)/2(정확히 한 번) 중 고르고, **retain** 메시지로 마지막 값을 새 구독자에게 바로 주며, 기기가 갑자기 끊기면 **LWT**(유언 메시지)로 "오프라인" 을 알린다. 브로커는 보통 Mosquitto 나 EMQX 를 Docker 로 띄운다. 환자 데이터가 오가면 1883 평문 대신 8883 TLS 와 계정 인증을 켠다.

## 헷갈리기 쉬운 것

- **Kafka·RabbitMQ** 같은 메시지 큐는 서버끼리 대량 처리·보관에 강하고, MQTT 는 수많은 작은 기기의 가벼운 연결에 강하다. 실제로는 MQTT 로 받아 Kafka 로 넘기는 구성이 흔하다.
- **HTTP** 는 매번 요청-응답이라 기기가 계속 물어봐야 하지만, MQTT 는 연결을 열어 둔 채 밀어 준다.
