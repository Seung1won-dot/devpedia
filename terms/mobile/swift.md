---
id: swift
term: Swift
aliases:
  - 스위프트
  - Swift 언어
category: mobile
tags:
  - 모바일
  - iOS
  - 타입
level: 1
kind: tool
related:
  - ios
  - swiftui
  - kotlin
  - null-handling
  - llvm
  - garbage-collection
see_also:
  - https://www.swift.org/documentation/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

애플이 만든 **iOS·macOS 앱의 공식 언어**로 옵셔널과 네이티브 컴파일이 특징이다.

## 비유

**빈 상자에는 반드시 "비어 있을 수 있음" 스티커를 붙이게 하는 물류창고**. 스티커 없는 상자는 열기 전에 내용물이 있다고 보장되니, 열다가 당황할 일이 줄어든다.

## 예시

```swift
struct Vital {
    let patientId: String
    let heartRate: Int?          // 옵셔널: 값이 없을 수 있음
}

func describe(_ v: Vital) -> String {
    guard let hr = v.heartRate else { return "\(v.patientId): 측정값 없음" }
    return "\(v.patientId): \(hr)bpm"
}

let latest = try await api.fetchLatest()   // async/await 동시성
```

`guard let`·`if let` 으로 옵셔널을 벗겨야만 값을 쓸 수 있어서 null 관련 크래시가 줄어든다. 컴파일러는 LLVM 기반이라 기계어로 바로 컴파일되고, 메모리는 GC 대신 **ARC(참조 카운팅)** 로 관리한다. 그래서 두 객체가 서로를 강하게 붙잡는 순환 참조는 `weak` 로 직접 끊어 줘야 한다.

## 헷갈리기 쉬운 것

- **Swift vs Objective-C**: Objective-C 는 이전 세대 애플 언어로, 오래된 SDK·라이브러리에서 아직 보인다. 두 언어는 한 프로젝트에서 섞어 쓸 수 있다.
- **ARC vs 가비지 컬렉션**: ARC 는 참조 수가 0 이 되는 순간 즉시 해제해 멈춤이 없지만 순환 참조를 스스로 못 푼다. GC 는 순환도 치우지만 수거 타이밍을 예측하기 어렵다.
