---
id: mobile-crash-reporting
term: 크래시 리포팅(Crashlytics)
aliases:
  - Crash Reporting
  - Firebase Crashlytics
  - Sentry
  - 크래시 리포트
  - 크래시리틱스
category: mobile
tags:
  - 모바일
  - 모니터링
  - 로깅
level: 2
kind: tool
related:
  - monitoring
  - logging
  - alerting
  - exception
  - bug-report
  - app-lifecycle
see_also:
  - https://firebase.google.com/docs/crashlytics
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

사용자 폰에서 앱이 죽을 때 **스택 트레이스와 기기 정보를 모아 개발자에게 보내는** 도구.

## 비유

**비행기 블랙박스**. 사고(크래시)가 난 뒤에 무슨 일이 있었는지 현장에 없던 사람도 기록을 보고 재구성할 수 있다.

## 예시

```kotlin
// Firebase Crashlytics: 크래시는 자동 수집, 맥락은 직접 남긴다
Firebase.crashlytics.setUserId(pseudonymousId)          // 실명·MRN 말고 가명 ID
Firebase.crashlytics.log("BLE 연결 시도: device=${device.name}")

try {
    parseEcg(packet)
} catch (e: IllegalStateException) {
    Firebase.crashlytics.recordException(e)              // 죽지 않은 오류도 기록
}
```

서버는 로그를 직접 볼 수 있지만, 앱은 **수천 대의 남의 폰에서 돌기 때문에** 이런 도구 없이는 크래시를 알 방법이 없다. 대시보드에서 "Android 14, 갤럭시 S23 에서만 3% 크래시" 처럼 기종·OS·앱 버전별로 묶어 보여 주고, 크래시 없는 사용자 비율(crash-free users)을 품질 지표로 본다. 릴리스 빌드는 코드가 난독화돼 있어서 **매핑 파일(ProGuard/R8)이나 dSYM** 을 올려야 스택 트레이스가 읽힌다. 의료 앱이면 로그에 환자 정보가 섞이지 않게 조심한다.

## 헷갈리기 쉬운 것

- **크래시 리포팅 vs 서버 모니터링**: Prometheus 는 내 서버에서 지표를 긁어 가고, 크래시 리포터는 흩어진 기기들이 밀어 보낸다. 앱은 크래시 직후가 아니라 다음 실행 때 보고를 올리는 경우가 많다.
- **크래시 vs ANR**: ANR(App Not Responding)은 죽지는 않았지만 메인 스레드가 몇 초 이상 막혀 OS 가 "응답 없음" 을 띄운 것이다. Play Console 에서 따로 집계된다.
