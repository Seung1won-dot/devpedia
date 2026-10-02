---
id: figma
term: Figma
aliases:
  - 피그마
  - Figma Dev Mode
  - 개발자 모드
category: ux
tags:
  - UI디자인
  - 협업
  - 개발도구
level: 1
kind: tool
related:
  - design-system
  - design-token
  - collaboration-tools
  - flexbox-grid
  - prototype
  - wireframe
see_also:
  - https://help.figma.com/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

브라우저에서 여럿이 동시에 화면을 그리고 **개발자에게 넘기는** 디자인 도구.

## 비유

디자인계의 **구글 문서**. 파일을 메일로 주고받지 않고, 링크 하나로 모두가 같은 판을 보고 댓글을 단다.

## 예시

개발자가 Figma 링크를 받으면 주로 이 세 가지를 본다.

- **개발자 모드(Dev Mode)**: 요소를 클릭하면 크기·여백·색을 CSS 로 보여 준다. 다만 `#8C8F97` 처럼 원시 값이 아니라 `--text-3` 같은 토큰 이름이 붙어 있는지 먼저 확인한다 [확인 필요].
- **오토 레이아웃**: 자식 요소를 가로/세로로 쌓고 간격을 주는 기능으로, 사실상 CSS Flexbox 와 같은 모델이다. 디자이너가 오토 레이아웃으로 그렸으면 `display: flex; gap: 8px` 로 그대로 옮기면 된다.
- **컴포넌트·변형(variant)**: 버튼 하나에 기본/hover/disabled 변형이 묶여 있다. React 컴포넌트의 props 와 1:1 로 맞추면 이후 수정이 쉽다.

## 헷갈리기 쉬운 것

- **Figma 시안 = 최종 명세가 아니다.** 빈 상태·에러·긴 텍스트·로딩이 빠져 있기 쉬우니 개발 전에 물어본다.
- **FigJam**은 같은 회사의 화이트보드 도구로, 시안이 아니라 브레인스토밍·흐름도용이다.
