---
id: react-native
term: React Native
aliases:
  - 리액트 네이티브
  - RN
  - Expo
category: mobile
tags:
  - 모바일
  - 크로스플랫폼
  - React
level: 1
kind: tool
related:
  - native-vs-cross-platform
  - react
  - flutter
  - hooks
  - typescript
  - webview
see_also:
  - https://reactnative.dev/docs/getting-started
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

React 문법 그대로 **iOS·Android 의 진짜 네이티브 화면**을 만드는 메타의 프레임워크.

## 비유

웹 요리사가 **같은 레시피(React)로 다른 주방(모바일 OS)에서 요리**하는 것. 칼질은 같지만 냄비와 불(브라우저 대신 OS 위젯)이 다르다.

## 예시

```bash
npx create-expo-app vitals-app --template blank-typescript
cd vitals-app && npx expo start      # QR 코드를 폰의 Expo Go 앱으로 찍으면 바로 실행
```

```tsx
import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'

export default function App() {
  const [bpm, setBpm] = useState(72)
  return (
    <View style={{ padding: 16 }}>
      <Text>심박수 {bpm} bpm</Text>
      <Pressable onPress={() => setBpm(60 + Math.floor(Math.random() * 70))}><Text>새로고침</Text></Pressable>
    </View>
  )
}
```

`useState`·`useEffect`·props 는 웹 React 와 똑같아서 웹 팀이 가장 빨리 앱을 낼 수 있는 길이다. 처음에는 **Expo** 로 시작하면 Xcode·Android Studio 설정 없이 실기기에서 돌려 볼 수 있다. 네이티브 SDK 를 직접 붙여야 할 때는 Expo 의 개발 빌드나 순수 RN 프로젝트로 넘어간다.

## 헷갈리기 쉬운 것

- **React Native vs 웹뷰 앱**: RN 은 HTML 을 띄우는 게 아니라 JS 가 OS 위젯(UILabel, TextView)을 만든다. 그래서 `div`·CSS 파일이 없다.
- **React Native vs Expo**: Expo 는 RN 위에 빌드·업데이트·SDK 묶음을 얹은 도구 모음이다. 경쟁 제품이 아니라 RN 을 쓰는 방법 중 하나다.
