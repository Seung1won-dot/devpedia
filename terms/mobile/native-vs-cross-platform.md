---
id: native-vs-cross-platform
term: 네이티브/크로스 플랫폼(Flutter/RN)
aliases:
  - Native vs Cross-platform
  - 네이티브 앱
  - 크로스 플랫폼
  - Flutter
  - React Native
  - 플러터/리액트 네이티브
category: mobile
tags:
  - 모바일
  - React
level: 2
kind: concept
related:
  - react
  - app-lifecycle
  - pwa
  - typescript
  - web-performance
  - android
  - ios
see_also:
  - https://reactnative.dev/docs/getting-started
status: review
created: 2026-09-29
updated: 2026-10-03
---

## 한 줄 정의

플랫폼별 언어로 따로 만들면 **네이티브**, 한 코드로 iOS·Android 를 같이 만들면 **크로스 플랫폼**.

## 비유

네이티브는 **나라마다 그 나라 말로 책을 새로 쓰는 것**, 크로스 플랫폼은 **한 권을 쓰고 통역기를 끼워 파는 것**. 통역기는 빠르고 싸지만 미묘한 표현(플랫폼 고유 기능)은 어색할 수 있다.

## 예시

| | 네이티브 | Flutter | React Native |
|---|---|---|---|
| 언어 | Swift(iOS) / Kotlin(Android) | Dart | JS/TS |
| 화면 그리기 | OS 기본 위젯 | 자체 엔진(Impeller)이 픽셀까지 직접 | JS 가 OS 네이티브 위젯을 조종 |
| 성능 | 최고 | 네이티브에 가까움 | 브릿지 병목이 있었으나 새 아키텍처로 개선 |
| 새 OS 기능 | 바로 | 플러그인을 기다림 | 플러그인을 기다림 |

```tsx
// React Native: 문법은 React 그대로, 태그만 div → View, p → Text 로 바뀐다
import { View, Text } from 'react-native'
export function ItemCount({ items }: { items: string[] }) {
  return <View><Text>보관 중인 아이템 {items.length}개</Text></View>
}
```

고르는 기준은 **팀이 아는 언어, 성능이 민감한 기능(카메라·AR·게임)의 유무, 두 플랫폼을 동시에 내야 하는지**다. 웹 React 를 아는 팀은 RN 이 빠르고, 디자인이 양쪽에서 픽셀까지 똑같아야 하면 Flutter 가 편하다. 헬스케어 앱처럼 블루투스 기기나 HealthKit 같은 플랫폼 API 를 깊게 쓰면 결국 네이티브 모듈을 직접 짜게 된다. 면접에서는 "크로스 플랫폼의 트레이드오프는?", "왜 Flutter/RN 을 골랐나?" 로 나온다.

## 헷갈리기 쉬운 것

- **하이브리드 앱(Ionic/Cordova)**: 웹뷰 안에 웹 페이지를 띄우는 방식. Flutter/RN 은 웹뷰가 아니라 진짜 화면을 그리므로 다른 부류다.
- **PWA**: 앱 스토어 없이 브라우저로 설치하는 웹. 푸시·오프라인은 되지만 OS 기능 접근이 가장 제한적이다.
- **React Native vs React**: 컴포넌트·훅·상태 관리 개념은 같지만 `div`/CSS 대신 `View`/StyleSheet 를 쓰고 DOM 이 없다. 웹 코드가 그대로 돌지는 않는다.
