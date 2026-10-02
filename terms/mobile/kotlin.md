---
id: kotlin
term: Kotlin
aliases:
  - 코틀린
  - Kotlin/JVM
  - kt
category: mobile
tags:
  - 모바일
  - Android
  - 타입
level: 1
kind: tool
related:
  - android
  - jetpack-compose
  - null-handling
  - swift
  - bytecode-vm
  - promise-async-await
see_also:
  - https://kotlinlang.org/docs/home.html
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

JVM 위에서 돌며 **Android 앱의 공식 권장 언어**인 간결한 정적 타입 언어.

## 비유

**자바를 다듬은 개정판 맞춤법**. 같은 말(JVM)을 쓰지만 군더더기 문장을 줄이고, 빈칸(null)을 실수로 남기면 교정 선생님이 바로 빨간 줄을 긋는다.

## 예시

```kotlin
data class Vital(val patientId: String, val heartRate: Int?)

fun describe(v: Vital): String {
    val hr = v.heartRate ?: return "${v.patientId}: 측정값 없음"   // null 이면 바로 반환
    return "${v.patientId}: ${hr}bpm"
}

// 코루틴: 콜백 지옥 없이 순서대로 읽히는 비동기 코드
suspend fun load(api: VitalApi) = withContext(Dispatchers.IO) { api.fetchLatest() }
```

`Int?` 처럼 **물음표가 붙어야만 null 이 들어갈 수 있어서** 자바에서 흔하던 NullPointerException 을 컴파일 단계에서 대부분 막는다. `data class` 한 줄이면 equals·toString 이 자동으로 생기고, 비동기는 `suspend` 함수와 코루틴으로 쓴다. 자바 라이브러리를 그대로 불러 쓸 수 있어 기존 프로젝트에 파일 단위로 섞어 넣기도 쉽다.

## 헷갈리기 쉬운 것

- **Kotlin vs Java**: 둘 다 JVM 바이트코드로 컴파일되고 서로 호출된다. Android 신규 코드는 Kotlin 이 기본이고, Java 는 레거시 유지보수에서 주로 만난다.
- **Kotlin vs Swift**: 문법(`val`/`let`, `?` 옵셔널)이 놀랄 만큼 닮았지만 Kotlin 은 JVM·GC 기반, Swift 는 네이티브 컴파일·ARC 기반이다.
