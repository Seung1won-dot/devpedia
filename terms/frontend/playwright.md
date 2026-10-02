---
id: playwright
term: E2E 테스트(Playwright)
aliases:
  - Playwright
  - 플레이라이트
  - End-to-End Test
  - E2E
  - 브라우저 자동화
  - Cypress
category: frontend
tags:
  - 테스트
  - 브라우저
  - 개발도구
level: 2
kind: tool
related:
  - testing-levels
  - ci-cd
  - github-actions
  - mocking
  - tdd
  - usability-test
see_also:
  - https://playwright.dev/docs/intro
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

진짜 브라우저를 **스크립트로 조종해 사용자 흐름 전체를 검사**하는 E2E 테스트 도구.

## 비유

신차를 **로봇이 실제 도로에서 시승**하는 것. 부품 검사(단위 테스트)를 다 통과해도 시동 걸고 주차장까지 가 봐야 진짜 고객이 겪을 문제가 드러난다.

## 예시

```ts
// e2e/search.spec.ts — Devpedia 검색창에 "ssh" 를 치면 SSH 카드가 뜬다
import { test, expect } from '@playwright/test'

test('검색어를 치면 카드가 뜬다', async ({ page }) => {
  await page.goto('/')                                              // baseURL 은 playwright.config.ts 에서
  await page.getByRole('searchbox', { name: '용어 검색' }).fill('ssh') // 사용자가 보는 역할·이름으로 찾는다
  const card = page.getByRole('link', { name: /SSH/ }).first()
  await expect(card).toBeVisible()                                  // 나타날 때까지 자동 대기
  await card.click()
  await expect(page).toHaveURL(/#ssh/)
})
```

```bash
npm init playwright@latest      # 설치 + Chromium/Firefox/WebKit 내려받기 + GitHub Actions 워크플로 생성
npx playwright test --ui        # 단계별 화면을 보며 디버깅
npx playwright codegen http://localhost:5173   # 직접 클릭하는 대로 테스트 코드 자동 생성
```

`getByRole` 처럼 **사용자가 보는 기준**(역할·라벨·텍스트)으로 요소를 찾는 것이 Playwright 의 철학이라 CSS 클래스가 바뀌어도 잘 안 깨지고, 덤으로 접근성 마크업이 좋아진다. `expect(...).toBeVisible()` 은 나타날 때까지 알아서 기다리므로 `sleep` 을 넣을 필요가 없다. 테스트당 수 초로 느리고 환경 탓에 가끔 실패(flaky)하므로 **핵심 흐름 몇 개만** 쓰고 나머지는 단위·통합 테스트에 맡긴다. CI 에서는 `npm run build` 뒤에 돌려 배포 직전 관문으로 둔다.

## 헷갈리기 쉬운 것

- **Cypress** 는 같은 자리의 경쟁자. 브라우저 안에서 도는 구조라 여러 탭·여러 도메인·WebKit(Safari) 에 제약이 있고, Playwright 는 바깥에서 조종해 세 엔진을 다 지원한다. 새 프로젝트는 Playwright 가 기본값에 가깝다.
- **Selenium** 은 더 오래된 범용 브라우저 자동화. 언어 지원이 넓지만 설정이 무겁고 자동 대기가 없어 flaky 하기 쉽다.
- **Testing Library(vitest + jsdom)** 는 컴포넌트 단위 테스트. 가짜 DOM 에서 돌아 빠르지만 레이아웃·네트워크·라우팅까지는 못 본다. 피라미드에서 한 층 아래이고, `getByRole` 같은 선택 방식은 서로 닮았다.
