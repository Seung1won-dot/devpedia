---
id: app-lifecycle
term: 앱 생명주기
aliases:
  - App Lifecycle
  - Activity Lifecycle
  - 액티비티 생명주기
  - ViewController Lifecycle
  - 라이프사이클
category: mobile
tags:
  - 모바일
  - 면접
level: 2
kind: concept
related:
  - native-vs-cross-platform
  - hooks
  - component-props-state
  - process
  - local-storage
  - android
  - push-notification
see_also:
  - https://developer.android.com/guide/components/activities/activity-lifecycle
status: review
created: 2026-09-29
updated: 2026-10-03
---

## 한 줄 정의

앱 화면이 **만들어지고 보이고 가려지고 사라지는 각 순간**에 OS 가 불러 주는 함수들의 순서.

## 비유

가게의 하루와 같아서 **문 열기(onCreate) → 간판 켜기(onStart) → 손님 받기(onResume) → 잠깐 자리 비움(onPause) → 셔터 내리기(onStop) → 폐업(onDestroy)** 순으로 흘러간다. 자리를 비울 땐 금고를 잠그고, 폐업 땐 재고를 정리해야 한다.

## 예시

```kotlin
class TermActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {      // 최초 1회: 레이아웃·초기화
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_term)
        query = savedInstanceState?.getString("query") ?: ""   // 죽었다 살아났으면 복원
    }
    override fun onResume() { super.onResume(); sensor.start() }   // 화면 앞에 올 때마다
    override fun onPause()  { sensor.stop(); super.onPause() }     // 전화·홈 버튼으로 가려질 때
    override fun onSaveInstanceState(out: Bundle) {                // 회전·메모리 부족 대비 상태 저장
        super.onSaveInstanceState(out)
        out.putString("query", query)
    }
}
```

Android Activity 는 `onCreate → onStart → onResume → (onPause → onStop → onDestroy)`, iOS ViewController 는 `viewDidLoad → viewWillAppear → viewDidAppear → viewWillDisappear → viewDidDisappear` 순서다. 중요한 이유는 둘인데, **리소스 해제** — 카메라·GPS·센서를 onPause/viewWillDisappear 에서 안 끄면 배터리가 새고 다른 앱이 카메라를 못 쓴다. **상태 저장** — 화면 회전이나 메모리 부족으로 OS 가 Activity 를 죽였다 다시 만들 수 있어서, 입력 중이던 검색어는 저장해 둬야 한다. 면접에서는 "onPause 와 onStop 의 차이는?", "화면을 회전하면 무슨 일이 일어나나?" 로 나온다.

## 헷갈리기 쉬운 것

- **onPause vs onStop**: onPause 는 일부만 가려짐(반투명 다이얼로그, 멀티윈도우), onStop 은 완전히 안 보임. 가벼운 정리는 onPause, 무거운 정리는 onStop 에서 한다.
- **React 컴포넌트 생명주기**: `useEffect(() => { start(); return () => stop() }, [])` 의 마운트/언마운트와 같은 발상. 다만 모바일은 "보이지만 잠시 멈춤(pause)" 같은 중간 상태가 더 많다.
- **앱 생명주기 vs 화면 생명주기**: Application/AppDelegate 수준(앱 전체가 백그라운드로 감)과 Activity/ViewController 수준(화면 하나)은 다른 층이다. 푸시 토큰 갱신은 앱 수준, 센서 정지는 화면 수준.
