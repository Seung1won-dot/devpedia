---
id: form-handling
term: 폼 처리
aliases:
  - Form Handling
  - 폼
  - 제어 컴포넌트
  - Controlled Component
  - react-hook-form
category: frontend
tags:
  - React
  - HTML
  - JavaScript
level: 1
kind: concept
related:
  - component-props-state
  - hooks
  - http-methods
  - validation
  - semantic-html
  - fetch
see_also:
  - https://developer.mozilla.org/ko/docs/Learn_web_development/Extensions/Forms
  - https://react-hook-form.com/get-started
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

사용자가 입력창에 적은 값을 **읽어 검사하고 서버로 보내는** 과정 전체를 다루는 일.

## 비유

병원 **접수 창구의 문진표**. 환자가 칸을 채우면 직원이 빈칸·오타를 그 자리에서 확인하고(검증), 다 맞으면 차트실로 넘긴다(제출).

## 예시

```tsx
// 연구 대상자 등록 폼 — state 가 입력값을 들고 있는 '제어 컴포넌트' 방식
import { useState, type FormEvent } from 'react'

export function RegisterForm() {
  const [studyId, setStudyId] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()                         // 브라우저 기본 동작(새로고침하며 제출)을 막는다
    if (!/^S\d{4}$/.test(studyId)) return setError('S + 숫자 4자리 형식이어야 합니다')
    await fetch('/api/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studyId }),
    })
    setStudyId('')
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="studyId">연구 ID</label>
      <input id="studyId" value={studyId} onChange={(e) => setStudyId(e.target.value)} required />
      {error && <p role="alert">{error}</p>}
      <button type="submit">등록</button>
    </form>
  )
}
```

핵심은 셋이다 — `e.preventDefault()` 로 새로고침 막기, 입력값을 state 로 들고 있기, 보내기 전에 검사하기. 칸이 열 개를 넘어가면 state 도 열 개가 되므로 **react-hook-form** 에 `zod` 스키마를 붙여 검증·에러 표시를 맡기는 것이 보통이다. 브라우저 검증(`required`, `type="email"`)은 최소 방어일 뿐이고, 서버(FastAPI 의 pydantic)에서 반드시 다시 검사한다.

## 헷갈리기 쉬운 것

- **제어 vs 비제어 컴포넌트**: 제어는 React state 가 값을 들고 있는 것(`value` + `onChange`), 비제어는 DOM 이 들고 있다가 제출 때 `ref` 로 읽는 것. react-hook-form 은 기본이 비제어라 글자를 칠 때마다 리렌더되지 않는다.
- **클라이언트 검증 vs 서버 검증**: 전자는 사용자 편의(즉시 피드백), 후자는 보안과 데이터 무결성. 전자는 개발자 도구로 얼마든지 우회되므로 생략할 수 있는 쪽은 전자뿐이다.
- **GET 폼 vs POST 폼**: 검색처럼 URL 에 남겨도 되는 건 GET(`?q=ssh`), 데이터를 만들거나 바꾸면 POST. 로그인 폼을 GET 으로 만들면 비밀번호가 주소창과 서버 로그에 남는다.
