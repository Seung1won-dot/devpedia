---
id: react
term: React
aliases:
  - React.js
  - 리액트
  - ReactJS
category: frontend
tags:
  - React
  - 렌더링
  - JavaScript
level: 1
related:
  - component-props-state
  - hooks
  - virtual-dom
  - html-css-js
  - typescript
see_also:
  - https://ko.react.dev/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

화면을 **컴포넌트 단위로 조립**하고, 데이터가 바뀌면 화면을 알아서 다시 그려주는 JS 라이브러리.

## 비유

**레고 블록**처럼 작은 부품(컴포넌트)을 조립해 화면을 만든다. 부품 하나에 들어가는 숫자를 바꾸면 그 부품만 새로 찍혀 나오고, 나머지는 그대로다.

## 예시

```tsx
// Ender Chest: 보관 중인 아이템 개수를 보여주는 컴포넌트
function ItemCount({ items }: { items: string[] }) {
  return <p>보관 중인 아이템 {items.length}개</p>
}

// 쓰는 쪽. items 배열이 바뀌면 React 가 <p> 안의 숫자를 알아서 갱신한다
<ItemCount items={['다이아몬드', '철괴', '흑요석']} />
```

HTML 처럼 생긴 부분(JSX)이 JS 안에 그대로 들어가는 게 처음엔 낯설다. Devpedia 와 Ender Chest 모두 Vite + React + TypeScript 조합으로 만들었다.

## 헷갈리기 쉬운 것

- **Next.js** 는 React 위에 라우팅·SSR·배포 설정을 얹은 프레임워크. React 자체는 "화면 그리기" 만 맡는 라이브러리라, 나머지(라우터, 상태 관리, 번들러)는 골라 붙인다.
- **React Native** 는 같은 문법으로 iOS/Android 앱을 만드는 별개 도구. 브라우저용 React 코드가 그대로 돌아가진 않는다.
