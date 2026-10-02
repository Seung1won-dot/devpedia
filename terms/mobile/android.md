---
id: android
term: Android
aliases:
  - 안드로이드
  - Android OS
  - Android Studio
  - 안드로이드 스튜디오
category: mobile
tags:
  - 모바일
  - Android
level: 1
kind: tool
related:
  - kotlin
  - jetpack-compose
  - app-lifecycle
  - native-vs-cross-platform
  - linux-distro
  - ios
see_also:
  - https://developer.android.com/guide
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

구글이 만든 **리눅스 커널 기반 모바일 OS**이자 그 위에서 앱을 만드는 개발 환경.

## 비유

여러 제조사가 같은 **설계도로 각자 집을 짓는 아파트 단지**. 삼성·샤오미가 외관(UI)은 바꿔도 배관(OS 구조)은 같아서 한 앱이 여러 기종에서 돈다.

## 예시

```kotlin
// app/build.gradle.kts — 앱이 지원하는 OS 버전 범위를 정하는 곳
android {
    namespace = "kr.ac.sch.eclab.vitals"
    compileSdk = 35
    defaultConfig {
        minSdk = 26        // 이보다 오래된 폰에는 설치 안 됨
        targetSdk = 35     // 이 버전의 동작 규칙을 따르겠다는 선언
    }
}
```

개발은 **Android Studio**(IntelliJ 기반 IDE)에서 하고, 빌드는 **Gradle** 이 맡는다. Windows 노트북에서도 에뮬레이터로 바로 돌려 볼 수 있어 iOS 보다 진입이 쉽다. 다만 기종·OS 버전이 제각각이라(파편화) `minSdk` 를 얼마로 잡을지가 첫 결정이다. 스토어가 요구하는 최소 `targetSdk` 는 해마다 올라간다 [확인 필요].

## 헷갈리기 쉬운 것

- **Android vs 리눅스 배포판**: 커널은 리눅스지만 셸·패키지 관리자(apt) 같은 일반 리눅스 환경이 없고, 앱은 ART 런타임 위에서 돈다. Ubuntu 처럼 쓰는 OS 가 아니다.
- **compileSdk vs minSdk vs targetSdk**: compileSdk 는 빌드할 때 쓰는 API 버전, minSdk 는 설치 가능한 최저 버전, targetSdk 는 "이 버전 동작 방식에 맞췄다" 는 약속이다.
