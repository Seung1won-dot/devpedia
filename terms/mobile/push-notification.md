---
id: push-notification
term: 푸시 알림(FCM/APNs)
aliases:
  - Push Notification
  - FCM
  - Firebase Cloud Messaging
  - APNs
  - 디바이스 토큰
category: mobile
tags:
  - 모바일
  - 앱배포
  - 메시지큐
level: 2
kind: protocol
related:
  - app-lifecycle
  - baas
  - webhook
  - mobile-permissions
  - service-worker
  - websocket
see_also:
  - https://firebase.google.com/docs/cloud-messaging
  - https://developer.apple.com/documentation/usernotifications
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

앱이 꺼져 있어도 서버가 **OS 의 푸시 서버를 거쳐** 폰에 메시지를 보내는 방식.

## 비유

**아파트 경비실 택배 보관**. 택배 기사(우리 서버)는 집집마다 찾아가지 않고 경비실(FCM·APNs)에 맡기며, 경비실은 동·호수(디바이스 토큰)를 보고 알림을 띄운다.

## 예시

흐름은 세 단계다. ① 앱이 처음 켜질 때 FCM/APNs 에서 **디바이스 토큰**을 받아 우리 서버에 저장 ② 이벤트가 생기면 서버가 그 토큰으로 FCM 에 요청 ③ FCM(iOS 는 APNs 경유)이 폰에 전달.

```json
{
  "message": {
    "token": "fcm-device-token-from-app",
    "notification": { "title": "측정 알림", "body": "오늘 혈압을 아직 기록하지 않았어요" },
    "data": { "screen": "bp-input" }
  }
}
```

이 JSON 을 FCM HTTP v1 API(`POST https://fcm.googleapis.com/v1/projects/<project-id>/messages:send`)에 서비스 계정 토큰과 함께 보낸다. `notification` 은 OS 가 알아서 띄우고, `data` 는 앱 코드가 받아 처리한다. 토큰은 앱 재설치·복원 때 바뀌므로 갱신 콜백에서 서버 값을 업데이트해야 하고, 알림 본문에는 환자명 같은 민감 정보를 넣지 않는다.

## 헷갈리기 쉬운 것

- **FCM vs APNs**: APNs 는 애플 기기로 가는 유일한 통로, FCM 은 구글의 통로이면서 APNs 로 중계도 해 준다. 그래서 크로스 플랫폼 앱은 FCM 하나로 양쪽에 보내는 경우가 많다.
- **푸시 vs WebSocket**: WebSocket 은 앱이 켜져 있을 때만 연결이 유지된다. 꺼진 앱을 깨우는 건 푸시만 할 수 있다.
- **푸시 vs 로컬 알림**: 로컬 알림은 서버 없이 앱이 스스로 예약하는 알림(복약 시간 등)이다.
