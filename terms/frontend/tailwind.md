---
id: tailwind
term: Tailwind
aliases:
  - Tailwind CSS
  - 테일윈드
  - 유틸리티 퍼스트 CSS
  - 유틸리티 클래스
category: frontend
tags:
  - CSS
  - React
  - 개발도구
level: 1
kind: tool
related:
  - html-css-js
  - flexbox-grid
  - responsive-design
  - media-query
  - react
  - bundler
  - design-system
see_also:
  - https://tailwindcss.com/docs
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

flex, p-4 같은 **작은 클래스를 HTML 에 조합해 스타일을 입히는** CSS 프레임워크.

## 비유

옷을 맞춤 제작(CSS 파일에 이름 짓고 규칙 쓰기)하는 대신 **레고 블록**처럼 "파란색, 둥근 모서리, 여백 4" 블록을 바로 끼워 맞추는 것. 블록 종류가 정해져 있어서 팀원끼리 결과물이 비슷해진다.

## 예시

```tsx
// 카드 한 장. 클래스 이름이 곧 스타일이라 CSS 파일을 오갈 필요가 없다
export function TermCard({ term, definition }: { term: string; definition: string }) {
  return (
    <article className="rounded-xl border p-4 shadow-sm hover:shadow-md md:p-6 dark:bg-zinc-900">
      <h2 className="text-lg font-bold">{term}</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{definition}</p>
    </article>
  )
}
```

```bash
npm install tailwindcss @tailwindcss/vite   # v4: vite.config.ts 에 플러그인 한 줄, CSS 에 @import "tailwindcss" 한 줄 [확인 필요]
```

`md:p-6` 은 768px 이상에서만, `hover:` 는 마우스를 올렸을 때만, `dark:` 는 다크 모드에서만 적용되는 **접두사**다. 빌드 때 실제로 쓴 클래스만 골라 CSS 를 만들기 때문에 결과 CSS 가 작다. 클래스가 길어져 HTML 이 지저분해 보이는 게 단점이라, 반복되는 묶음은 CSS 로 빼지 말고 React 컴포넌트로 빼서 재사용하는 것이 권장 방식이다.

## 헷갈리기 쉬운 것

- **Bootstrap** 은 완성된 부품(버튼·카드·네비바) 묶음이고, Tailwind 는 부품이 아니라 재료(유틸리티)만 준다. 그래서 Bootstrap 사이트는 서로 비슷해 보이고 Tailwind 는 디자인이 자유로운 대신 손이 더 간다.
- **CSS Modules / styled-components** 는 스타일을 컴포넌트 단위로 격리하는 방식. Tailwind 는 전역 유틸리티라 이름 충돌 문제 자체가 없다.
- **shadcn/ui** 는 Tailwind 위에 만든, 복사해 쓰는 컴포넌트 모음. Tailwind 의 대체재가 아니라 그 위층이다.
