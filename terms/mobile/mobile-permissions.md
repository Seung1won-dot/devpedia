---
id: mobile-permissions
term: 앱 권한(카메라·위치)
aliases:
  - App Permissions
  - Runtime Permission
  - 런타임 권한
  - 권한 요청
category: mobile
tags:
  - 모바일
  - 접근제어
  - 흔한실수
level: 1
kind: concept
related:
  - least-privilege
  - android
  - ios
  - app-store-review
  - medical-data-law
  - sandbox
see_also:
  - https://developer.android.com/guide/topics/permissions/overview
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

앱이 카메라·위치·연락처 같은 민감한 기능을 쓰기 전 **사용자에게 허락을 받는 장치**.

## 비유

**남의 집 방문 때 "냉장고 열어도 될까요?" 묻기**. 집주인은 거절할 수도, 이번만 허락할 수도 있고, 거절당했다고 집을 나가 버리면 안 된다.

## 예시

```kotlin
// Android: 카메라 버튼을 눌렀을 때만 묻는다
val launcher = registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
    if (granted) openCamera()
    else showMessage("사진 없이 텍스트로도 기록할 수 있어요")   // 거절해도 앱은 계속 쓸 수 있게
}

cameraButton.setOnClickListener { launcher.launch(Manifest.permission.CAMERA) }
```

선언과 요청은 따로다. Android 는 `AndroidManifest.xml` 에 `uses-permission` 을, iOS 는 `Info.plist` 에 `NSCameraUsageDescription` 같은 **사용 이유 문구**를 적어 둬야 하고, 실제 팝업은 기능을 쓰는 순간 코드로 띄운다. 앱 시작하자마자 권한 다섯 개를 몰아서 묻는 것이 대표적인 실수로, 거절률이 높고 심사 반려 사유도 된다. 두 번 이상 거절하면 OS 가 더는 팝업을 안 띄우므로, 그때는 설정 화면으로 안내해야 한다.

## 헷갈리기 쉬운 것

- **설치 시 권한 vs 런타임 권한**: 인터넷 같은 일반 권한은 설치만으로 받고, 카메라·위치 같은 위험 권한은 실행 중에 따로 물어야 한다.
- **앱 권한 vs 서버 인가**: 앱 권한은 "이 폰의 기능을 써도 되나", 인가(RBAC 등)는 "이 사용자가 이 데이터를 봐도 되나" 다. 의료 앱은 둘 다 필요하다.
- **정밀 위치 vs 대략 위치**: 최신 OS 는 사용자가 대략 위치만 줄 수 있다. 꼭 정밀 위치가 필요한 기능인지 먼저 따져 본다.
