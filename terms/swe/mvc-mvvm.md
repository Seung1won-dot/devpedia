---
id: mvc-mvvm
term: MVC/MVVM
aliases:
  - MVC / MVVM
  - Model-View-Controller
  - Model-View-ViewModel
  - 엠브이씨
  - MVP 패턴
  - 뷰모델
category: swe
tags:
  - 아키텍처패턴
  - React
level: 2
kind: pattern
related:
  - design-pattern
  - layered-architecture
  - state-management
  - component-props-state
  - web-framework
  - rest
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

**화면(View)·데이터(Model)·그 사이 중재자**를 세 덩어리로 나누는 구조 패턴.

## 비유

식당의 **홀(View)·재료 창고(Model)·주문받는 직원(Controller)**. MVVM 은 직원 대신 테이블 태블릿(ViewModel)을 둬서, 손님이 누르면 주방에 가고 음식이 되면 화면에 저절로 뜨는 식이다.

## 예시

| 글자 | 역할 | Spring MVC | React 앱 (MVVM 식) |
|---|---|---|---|
| **M** Model | 데이터와 업무 규칙 | `@Entity`, Service, Repository | 서버 응답, `terms.json`, 스토어 |
| **V** View | 사용자에게 보이는 것 | Thymeleaf 템플릿 또는 JSON 응답 | JSX 로 그린 화면 |
| **C** Controller | 입력을 받아 Model 을 부르고 View 를 고른다 | `@GetMapping` 메서드 | — |
| **VM** ViewModel | View 가 그대로 바인딩할 상태와 동작 | — | 커스텀 훅이 돌려주는 값과 핸들러 |

```tsx
// ViewModel — 화면이 쓸 상태와 동작만 내놓는다. 화면을 모른다
function useTermSearch() {
  const [q, setQ] = useState('')
  const results = useMemo(() => search(terms, q), [q])   // Model(terms) → 화면용 데이터
  return { q, setQ, results }
}
// View — 상태를 그대로 바인딩한다. q 가 바뀌면 화면이 따라 바뀐다
function SearchBox() {
  const vm = useTermSearch()
  return <><input value={vm.q} onChange={(e) => vm.setQ(e.target.value)} />
    <ul>{vm.results.map((t) => <li key={t.id}>{t.term}</li>)}</ul></>
}
```

MVC 는 입력이 Controller 로 들어가 Model 을 바꾸고 View 를 새로 그리는 한 방향 흐름이다 — Spring MVC 의 요청 한 번(DispatcherServlet → Controller → Service → View/JSON)이 딱 이것이다. MVVM 은 View 와 ViewModel 을 **데이터 바인딩**으로 묶어 "값을 바꾸면 화면이 알아서" 바뀌게 한다. 안드로이드 Jetpack 의 `ViewModel` + LiveData, WPF, Vue, React 의 커스텀 훅이 이 자리다. 목적은 하나 — 화면 코드에 SQL 이나 계산이 섞이지 않게 해서 각 부분을 따로 테스트하고 갈아끼울 수 있게 하는 것.

면접에선 "MVC 와 MVVM 의 차이는? 프로젝트에서 어떻게 나눴나?" 로 나온다 — 중재자가 Controller(입력 처리)냐 ViewModel(바인딩되는 상태)이냐로 답한다.

## 헷갈리기 쉬운 것

- **MVP**: Presenter 가 View 인터페이스를 통해 화면을 직접 갱신한다. MVC 와 MVVM 사이 단계로, 안드로이드 초창기에 많이 썼다.
- **계층형 아키텍처**(Controller-Service-Repository): 서버 전체를 층으로 나누는 것. MVC 의 C 는 그중 맨 위 층 하나에 해당한다.
- **React 는 MVC 인가**: React 자체는 V 만 맡는다. 훅과 상태 라이브러리를 붙이면 MVVM 에 가까워진다.
