---
id: ios
term: iOS
aliases:
  - 아이오에스
  - Xcode
  - 엑스코드
  - iPhone OS
category: mobile
tags:
  - 모바일
  - iOS
level: 1
kind: tool
related:
  - swift
  - swiftui
  - android
  - app-store-review
  - app-signing
  - native-vs-cross-platform
see_also:
  - https://developer.apple.com/documentation/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

애플이 아이폰·아이패드용으로 만든 모바일 OS이자 **Xcode 로만 빌드하는 앱 생태계**.

## 비유

**한 회사가 직접 짓고 관리하는 단독 주택 단지**. 집 모양이 몇 가지뿐이라 관리는 쉽지만, 공사(빌드)는 그 회사 공구(맥과 Xcode)로만 할 수 있다.

## 예시

```xml
<!-- Info.plist — 앱의 신분증. 권한 요청 문구도 여기 적는다 -->
<key>CFBundleIdentifier</key>
<string>kr.ac.sch.eclab.vitals</string>
<key>NSCameraUsageDescription</key>
<string>상처 사진을 찍어 기록하기 위해 카메라를 사용합니다.</string>
```

iOS 앱은 **Xcode** 가 있어야 빌드·서명·업로드가 되고, Xcode 는 macOS 에서만 돈다. 그래서 Flutter·React Native 로 짜더라도 iOS 빌드 단계에서는 맥(또는 클라우드 맥 CI)이 필요하다. 기종 수가 적고 사용자가 OS 업데이트를 빨리 하는 편이라 Android 보다 파편화 고민이 적다.

## 헷갈리기 쉬운 것

- **iOS vs iPadOS vs macOS**: iPadOS 는 iOS 에서 갈라져 나와 대부분의 앱이 그대로 돈다. macOS 는 별개 OS 지만 SwiftUI 로 화면 코드를 일부 공유할 수 있다.
- **Xcode vs Swift**: Xcode 는 IDE·빌드 도구, Swift 는 언어다. Swift 코드는 리눅스에서도 컴파일되지만 iOS 앱 빌드는 Xcode 툴체인이 있어야 한다.
