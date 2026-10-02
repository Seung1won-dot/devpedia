---
id: event-bubbling
term: 이벤트 버블링
aliases:
  - Event Bubbling
  - 버블링
  - 이벤트 전파
  - 캡처링
  - stopPropagation
category: frontend
tags:
  - JavaScript
  - 브라우저
  - 흔한실수
level: 1
kind: concept
related:
  - dom
  - html-css-js
  - react
  - callback
  - observer-pattern
see_also:
  - https://developer.mozilla.org/ko/docs/Learn_web_development/Core/Scripting/Event_bubbling
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

요소에서 생긴 이벤트가 **부모를 타고 위로 올라가며** 조상 핸들러까지 차례로 부르는 동작.

## 비유

학생이 손을 들면 **담임 → 학년부장 → 교장** 순으로 보고가 올라가는 것. 중간에 담임이 "내 선에서 끝냈다" 하고 막으면(stopPropagation) 위로는 안 올라간다.

## 예시

```tsx
// 카드 전체를 누르면 열리고, 안쪽 ★ 버튼은 즐겨찾기만 토글돼야 한다
function TermCard({ term, onOpen, onStar }: { term: string; onOpen: () => void; onStar: () => void }) {
  return (
    <li onClick={onOpen}>
      {term}
      <button
        onClick={(e) => {
          e.stopPropagation()   // 이 줄이 없으면 ★ 클릭이 li 까지 올라가 카드도 같이 열린다
          onStar()
        }}
      >
        ★
      </button>
    </li>
  )
}
```

클릭은 `button → li → ul → body → document` 순서로 올라가고, 각 단계에 핸들러가 있으면 전부 실행된다. React 의 `onClick` 도 이 순서를 그대로 따른다. 반대로 이 성질을 이용해 `li` 100개에 핸들러를 다는 대신 `ul` 하나에만 달고 `e.target` 으로 누가 눌렸는지 알아내는 것을 **이벤트 위임**이라 한다. "버튼을 눌렀는데 뒤의 카드까지 열린다" 는 초보의 단골 버그는 거의 다 이것.

## 헷갈리기 쉬운 것

- **캡처링**은 반대 방향 — `document` 에서 출발해 눌린 요소까지 내려오는 단계로, 버블링보다 먼저 일어난다. `addEventListener(type, fn, true)` 나 React 의 `onClickCapture` 로 잡는다. 평소엔 거의 쓸 일이 없다.
- **preventDefault** 는 브라우저의 기본 동작(링크 이동, 폼 제출로 새로고침)을 막고, **stopPropagation** 은 위로 올라가는 것을 막는다. 서로 무관해서 둘 다 필요하면 둘 다 부른다.
- **이벤트 위임** 은 버블링을 이용한 기법이지 별개 원리가 아니다. 버블링이 없으면 위임도 불가능하다.
