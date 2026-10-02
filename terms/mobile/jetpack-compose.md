---
id: jetpack-compose
term: Jetpack Compose
aliases:
  - 젯팩 컴포즈
  - Compose
  - 컴포즈
category: mobile
tags:
  - 모바일
  - Android
  - React
level: 2
kind: tool
related:
  - kotlin
  - android
  - swiftui
  - react
  - component-props-state
  - virtual-dom
see_also:
  - https://developer.android.com/develop/ui/compose
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

Kotlin 함수로 화면을 그리는 Android 의 **선언형 UI 툴킷**이다.

## 비유

예전 XML 레이아웃은 **가구를 놓은 뒤 하나씩 옮겨 다니는 이사**, Compose 는 **"지금 방은 이렇게 생겼다" 는 도면만 주면 일꾼이 알아서 다시 배치**하는 방식이다.

## 예시

```kotlin
@Composable
fun HeartRateCard(bpm: Int, onRefresh: () -> Unit) {
    Column(Modifier.padding(16.dp)) {
        Text("심박수 $bpm bpm", style = MaterialTheme.typography.titleLarge)
        if (bpm > 120) Text("빈맥 주의", color = Color.Red)
        Button(onClick = onRefresh) { Text("새로고침") }
    }
}

@Composable
fun Screen() {
    var bpm by remember { mutableStateOf(72) }        // 상태가 바뀌면 이 함수가 다시 실행됨
    HeartRateCard(bpm) { bpm = (60..130).random() }
}
```

`@Composable` 함수는 **상태를 받아 화면을 반환하는 함수**이고, 상태가 바뀌면 Compose 가 그 부분만 다시 호출한다(recomposition). `findViewById` 로 뷰를 찾아 `setText` 하던 명령형 코드가 사라진다. React 를 써 본 사람은 `remember` = `useState`, 매개변수 = props 로 읽으면 바로 감이 온다.

## 헷갈리기 쉬운 것

- **Compose vs React**: 발상은 같지만 Compose 는 가상 DOM 을 만들지 않고 컴파일러 플러그인이 바뀐 상태를 읽는 함수만 골라 다시 실행한다.
- **Compose vs XML View**: 둘은 한 앱에서 섞어 쓸 수 있다. 기존 앱은 화면 단위로 하나씩 옮기는 경우가 많다.
- **Compose vs Compose Multiplatform**: 후자는 JetBrains 가 같은 문법을 iOS·데스크톱으로 넓힌 것으로, 구글의 Android 공식 툴킷과는 따로 관리된다.
