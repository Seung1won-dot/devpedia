---
id: web-components
term: 웹 컴포넌트/Shadow DOM
aliases:
  - Web Components
  - 웹 컴포넌트
  - Custom Elements
  - 커스텀 엘리먼트
  - 섀도 DOM
  - Lit
category: frontend
tags:
  - HTML
  - JavaScript
  - 브라우저
level: 3
kind: concept
related:
  - dom
  - react
  - vue
  - component-props-state
  - html-css-js
  - semantic-html
see_also:
  - https://developer.mozilla.org/ko/docs/Web/API/Web_components
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

프레임워크 없이 **브라우저 표준만으로 재사용 가능한 HTML 태그**를 만드는 기술 묶음.

## 비유

**표준 규격 콘센트**. 어느 회사 제품이든 꽂으면 되듯 React 든 Vue 든 맨 HTML 이든 `<my-chart>` 를 꽂아 쓸 수 있고, Shadow DOM 은 콘센트 안쪽 배선을 겉에서 못 건드리게 덮어 둔 커버다.

## 예시

```ts
// <vital-badge value="120" unit="bpm"></vital-badge> — 어떤 페이지에서도 쓸 수 있는 커스텀 태그
class VitalBadge extends HTMLElement {
  static observedAttributes = ['value', 'unit']
  #root = this.attachShadow({ mode: 'open' })   // Shadow DOM: 바깥 CSS 가 안으로, 안 CSS 가 밖으로 새지 않는다

  connectedCallback() { this.render() }          // 문서에 붙을 때
  attributeChangedCallback() { this.render() }   // 속성이 바뀔 때

  render() {
    const v = Number(this.getAttribute('value'))
    this.#root.innerHTML = `
      <style>span { padding: 2px 6px; border-radius: 4px; background: ${v > 100 ? '#fdd' : '#dfd'} }</style>
      <span>${v} ${this.getAttribute('unit') ?? ''}</span>`
  }
}
customElements.define('vital-badge', VitalBadge)   // 태그 이름에 하이픈 필수
```

세 표준의 묶음이다 — **Custom Elements**(새 태그 등록), **Shadow DOM**(스타일·DOM 격리), **HTML Templates**(`<template>`). 장점은 프레임워크 독립성: React 로 만든 대시보드와 오래된 jQuery 페이지에 같은 위젯을 꽂을 수 있고, 프레임워크가 유행에서 밀려도 브라우저가 그대로 돌린다. 단점은 상태 관리·데이터 흐름·서버 렌더링이 React 만큼 편하지 않다는 것이라 보통 **Lit** 같은 얇은 라이브러리를 얹는다. 트레이드오프: 한 팀이 한 프레임워크로 만드는 앱이면 React 컴포넌트가 생산적이고, **여러 팀·여러 스택이 공유하는 디자인 시스템이나 위젯**이면 웹 컴포넌트가 맞다.

## 헷갈리기 쉬운 것

- **React 컴포넌트** 는 React 안에서만 사는 함수. 웹 컴포넌트는 브라우저가 직접 아는 태그라 React 밖에서도 동작한다. React 19 부터는 커스텀 엘리먼트에 props 를 넘기는 것이 매끄러워졌다 [확인 필요].
- **Shadow DOM vs 가상 DOM**: 이름만 비슷하다. Shadow DOM 은 **격리**(스타일·DOM 캡슐화)를 위한 브라우저 기능이고, 가상 DOM 은 **빠른 갱신**을 위한 React 의 메모리 속 복사본이다.
- **iframe** 은 격리가 더 강하지만(별도 문서·출처) 무겁고 크기 조절·통신이 불편하다. Shadow DOM 은 같은 문서 안의 가벼운 격리.
