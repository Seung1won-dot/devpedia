---
id: bundler
term: 번들러(Vite/Webpack)
aliases:
  - Bundler
  - 모듈 번들러
  - Vite
  - Webpack
category: frontend
tags:
  - 번들링
  - 개발도구
  - JavaScript
level: 2
related:
  - package-manager
  - typescript
  - react
  - static-hosting
  - csr-ssr-ssg
see_also:
  - https://ko.vite.dev/guide/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

수백 개 소스 파일을 **브라우저가 읽을 몇 개 파일로 묶고 변환**해 주는 개발 도구.

## 비유

재료 수십 가지(tsx, css, 이미지)를 **도시락 한 통**에 담아 배달하는 것. 손님(브라우저)은 재료를 하나하나 받는 대신 완성된 도시락 몇 개만 받으면 된다.

## 예시

```bash
# Devpedia / Ender Chest 둘 다 Vite
npm run dev      # 개발 서버. 파일을 저장하면 브라우저에 즉시 반영(HMR)
npm run build    # dist/ 에 배포용 묶음 생성
```

```
dist/
├── index.html
└── assets/
    ├── index-Bx3k9d.js     # 모든 tsx 가 JS 하나로 (파일명의 해시는 캐시 무효화용)
    └── index-9sd2la.css
```

이 `dist/` 폴더를 GitHub Pages 나 Vercel 에 그대로 올리면 배포 끝. Webpack 이 오래된 표준이고, Vite 는 개발 중엔 묶지 않고 브라우저의 ES 모듈을 그대로 써서 시작이 훨씬 빠르기 때문에 요즘 새 프로젝트의 기본값이다.

## 헷갈리기 쉬운 것

- **패키지 매니저(npm)** 는 라이브러리를 내려받아 `node_modules` 에 두는 도구, 번들러는 그것과 내 코드를 하나로 묶는 도구.
- **컴파일러(tsc·Babel)** 는 TS→JS 같은 문법 변환만 한다. 번들러는 그런 변환기를 안에서 불러 쓰면서 파일까지 합치고 압축한다.
