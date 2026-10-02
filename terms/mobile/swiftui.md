---
id: swiftui
term: SwiftUI
aliases:
  - 스위프트UI
  - Swift UI
  - UIKit 후속
category: mobile
tags:
  - 모바일
  - iOS
  - React
level: 2
kind: tool
related:
  - swift
  - ios
  - jetpack-compose
  - react
  - component-props-state
see_also:
  - https://developer.apple.com/documentation/swiftui
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

Swift 코드로 화면 모양을 선언하면 상태 변화에 맞춰 다시 그려 주는 **애플의 선언형 UI 프레임워크**.

## 비유

**레고 설명서**처럼 "이 블록 위에 저 블록" 만 적어 두면, 부품(상태)이 바뀔 때 조립 로봇이 설명서대로 다시 맞춰 준다.

## 예시

```swift
struct HeartRateView: View {
    @State private var bpm = 72               // 바뀌면 body 가 다시 계산됨

    var body: some View {
        VStack(spacing: 12) {
            Text("심박수 \(bpm) bpm").font(.title)
            if bpm > 120 { Text("빈맥 주의").foregroundStyle(.red) }
            Button("새로고침") { bpm = Int.random(in: 60...130) }
        }
        .padding()
    }
}
```

`body` 는 현재 상태를 보고 화면을 설명하는 값일 뿐이고, 실제로 무엇을 바꿀지는 SwiftUI 가 계산한다. Xcode 의 **프리뷰** 창에서 코드를 고치는 즉시 결과가 보여 화면 작업 속도가 빠르다. 다만 오래된 iOS 버전에서는 일부 기능이 없어서, 지원 OS 범위가 넓은 앱은 이전 방식인 **UIKit** 과 섞어 쓴다.

## 헷갈리기 쉬운 것

- **SwiftUI vs UIKit**: UIKit 은 ViewController 가 뷰를 직접 만들고 고치는 명령형 방식이다. 새 화면은 SwiftUI, 세밀한 제어가 필요한 곳은 UIKit 으로 나누는 팀이 많다.
- **SwiftUI vs Jetpack Compose**: `@State` ↔ `remember { mutableStateOf() }`, `VStack` ↔ `Column` 처럼 거의 일대일로 대응한다. 한쪽을 알면 다른 쪽은 이름만 익히면 된다.
