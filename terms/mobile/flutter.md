---
id: flutter
term: Flutter
aliases:
  - 플러터
  - Dart
  - 다트
category: mobile
tags:
  - 모바일
  - 크로스플랫폼
level: 1
kind: tool
related:
  - native-vs-cross-platform
  - react-native
  - jetpack-compose
  - component-props-state
  - android
  - ios
see_also:
  - https://docs.flutter.dev/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

구글이 만든 **Dart 언어 기반 크로스 플랫폼 UI 프레임워크**로 화면을 위젯으로 조립한다.

## 비유

각 나라 가구점(OS 기본 버튼)을 빌리지 않고 **자기 공장에서 만든 가구를 그대로 실어 가는 것**. 어느 나라에 가도 모양이 똑같다.

## 예시

```dart
class HeartRateCard extends StatelessWidget {
  const HeartRateCard({super.key, required this.bpm});
  final int bpm;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text('심박수 $bpm bpm', style: Theme.of(context).textTheme.titleLarge),
      ),
    );
  }
}
```

글자·여백·카드까지 **모든 것이 위젯**이고, 위젯 안에 위젯을 넣어 트리를 만든다. `flutter run` 중 코드를 저장하면 **핫 리로드**로 앱 상태를 유지한 채 화면만 바뀐다. 상태가 있는 화면은 `StatefulWidget` 의 `setState` 로 시작하고, 커지면 Provider·Riverpod 같은 상태 관리 라이브러리를 붙인다. 블루투스·HealthKit 처럼 OS 깊은 기능은 플러그인(pub.dev)이나 플랫폼 채널로 네이티브 코드를 부른다.

## 헷갈리기 쉬운 것

- **Flutter vs Dart**: Dart 는 언어, Flutter 는 그 언어로 쓰는 UI 프레임워크다. Dart 단독으로 서버나 CLI 도 만들 수 있다.
- **StatelessWidget vs StatefulWidget**: 앞은 받은 값만 그리는 위젯, 뒤는 스스로 바뀌는 값을 들고 있는 위젯이다. React 의 props 만 쓰는 컴포넌트와 state 를 쓰는 컴포넌트 차이와 같다.
