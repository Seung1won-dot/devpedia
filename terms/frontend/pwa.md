---
id: pwa
term: PWA
aliases:
  - Progressive Web App
  - 프로그레시브 웹 앱
  - 설치형 웹앱
category: frontend
tags:
  - PWA
  - 브라우저
level: 2
kind: concept
related:
  - service-worker
  - responsive-design
  - https
  - static-hosting
  - local-storage
  - webview
see_also:
  - https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps
status: review
created: 2026-09-25
updated: 2026-10-03
---

## 한 줄 정의

웹사이트에 **설치·오프라인·홈 화면 아이콘** 같은 앱 기능을 붙여 앱처럼 쓰게 만든 것.

## 비유

매번 찾아가야 하는 **가게(웹사이트)를 집 앞 자판기**로 만든 것. 홈 화면에 아이콘이 생기고, 인터넷이 끊겨도 마지막에 채워 둔 물건은 꺼내 쓸 수 있다.

## 예시

```ts
// vite.config.ts — Ender Chest 와 Devpedia 는 vite-plugin-pwa 로 PWA 를 만든다
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',                       // 새 버전이 올라오면 알아서 교체
      manifest: { name: 'Ender Chest', short_name: 'Chest', display: 'standalone' },
    }),
  ],
})
```

조건은 셋이다. **HTTPS** + **manifest 파일**(이름·아이콘·색) + **서비스 워커**. GitHub Pages 와 Vercel 은 기본이 HTTPS 라 나머지 둘만 챙기면 되고, 폰 Chrome 에서 열면 "홈 화면에 추가" 가 뜬다.

## 헷갈리기 쉬운 것

- **네이티브 앱** 은 스토어에서 받는 진짜 앱. PWA 는 브라우저 위에서 도는 웹사이트라 블루투스·백그라운드 위치 같은 일부 기능은 제한되거나 iOS 에서 지원이 약하다.
- **서비스 워커** 는 PWA 를 이루는 부품 하나(오프라인·캐시 담당). 서비스 워커만 있다고 PWA 는 아니고, 매니페스트와 HTTPS 까지 갖춰야 설치가 된다.
