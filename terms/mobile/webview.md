---
id: webview
term: 웹뷰 · 하이브리드 앱
aliases:
  - WebView
  - WKWebView
  - Hybrid App
  - 하이브리드 앱
  - Capacitor
category: mobile
tags:
  - 모바일
  - 크로스플랫폼
  - 브라우저
level: 1
kind: concept
related:
  - pwa
  - native-vs-cross-platform
  - react-native
  - xss
  - app-store-review
  - browser-rendering
see_also:
  - https://developer.android.com/develop/ui/views/layout/webapps/webview
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

앱 화면 안에 **브라우저 창을 끼워 넣어 웹페이지를 보여 주는** 부품이자 그렇게 만든 앱.

## 비유

**가게 안에 TV 를 걸어 홈쇼핑 채널을 틀어 둔 것**. 간판(앱 아이콘)은 가게 것이지만 화면 속 내용은 바깥 방송국(웹 서버)에서 온다.

## 예시

```kotlin
val webView = WebView(this).apply {
    settings.javaScriptEnabled = true
    webViewClient = WebViewClient()                         // 링크를 외부 브라우저 대신 안에서 열기
    loadUrl("https://eclab.example.kr/survey")
}
setContentView(webView)
```

이미 있는 웹 설문 페이지를 앱에 넣을 때 가장 빠른 방법이다. 웹을 고치면 앱 업데이트 없이 바로 반영되는 것도 장점이다. 대신 스크롤·전환 느낌이 네이티브보다 어색하고, 앱이 웹사이트를 감싼 것뿐이면 스토어 심사에서 반려될 수 있다. `addJavascriptInterface` 같은 **JS 브리지**로 웹이 네이티브 기능을 부를 수 있게 하면, 신뢰하지 않는 페이지를 띄웠을 때 XSS 가 앱 권한 탈취로 커질 수 있으니 허용 도메인을 좁힌다.

## 헷갈리기 쉬운 것

- **웹뷰 앱 vs PWA**: 웹뷰 앱은 스토어에서 받는 진짜 앱 껍데기 안의 웹, PWA 는 껍데기 없이 브라우저에서 설치하는 웹이다.
- **웹뷰 vs React Native**: RN 은 웹뷰를 쓰지 않고 OS 위젯을 직접 그린다. "JS 로 만든 앱" 이라는 점만 같다.
- **WebView vs 인앱 브라우저(Custom Tabs/SFSafariViewController)**: 로그인·외부 링크는 앱이 내용을 못 엿보는 인앱 브라우저로 여는 것이 권장된다.
