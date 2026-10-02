---
id: deep-link
term: 딥 링크 · 유니버설 링크
aliases:
  - Deep Link
  - Universal Link
  - App Links
  - 앱 링크
  - URL 스킴
category: mobile
tags:
  - 모바일
  - Android
  - iOS
level: 2
kind: concept
related:
  - client-routing
  - push-notification
  - android
  - ios
  - dns
  - phishing
see_also:
  - https://developer.android.com/training/app-links
  - https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

URL 하나로 **앱의 특정 화면을 바로 여는** 기능이다.

## 비유

건물 정문(앱 첫 화면)이 아니라 **"3층 302호" 가 적힌 출입증**. 링크를 누르면 로비를 거치지 않고 그 방으로 바로 들어간다.

## 예시

```xml
<!-- AndroidManifest.xml — https://eclab.example.kr/record/123 을 앱이 받도록 선언 -->
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="eclab.example.kr" android:pathPrefix="/record" />
</intent-filter>
```

그냥 `eclab://record/123` 같은 **커스텀 스킴**도 되지만, 다른 앱이 같은 스킴을 가로챌 수 있다. 그래서 요즘은 진짜 https 주소를 쓰는 **유니버설 링크(iOS)·앱 링크(Android)** 를 쓴다. 도메인 소유를 증명하려고 웹 서버의 `/.well-known/` 경로에 `apple-app-site-association`·`assetlinks.json` 파일을 올려 두면, 앱이 설치된 폰에서는 앱이 열리고 없는 폰에서는 같은 주소의 웹페이지가 열린다. 푸시 알림의 `data` 에 이 경로를 담아 누르면 해당 화면으로 보내는 식으로 함께 쓴다.

## 헷갈리기 쉬운 것

- **커스텀 스킴 vs 유니버설 링크**: 스킴은 등록만 하면 끝이라 쉽지만 소유 검증이 없다. 유니버설 링크는 도메인 검증이 필요한 대신 가로채기가 안 된다.
- **딥 링크 vs 디퍼드 딥 링크**: 디퍼드는 앱이 없을 때 스토어로 보냈다가, 설치 후 첫 실행에서 원래 화면으로 이어 주는 것이다. 보통 외부 SDK 가 필요하다.
- **딥 링크 vs 웹 라우팅**: react-router 의 `/record/:id` 와 같은 발상을 OS 수준으로 확장한 것이다.
