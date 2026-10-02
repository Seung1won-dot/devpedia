---
id: app-store-review
term: 앱 스토어 심사 · 배포
aliases:
  - App Store Review
  - 앱 심사
  - TestFlight
  - Google Play Console
  - 내부 테스트 트랙
category: mobile
tags:
  - 모바일
  - 앱배포
  - 배포
level: 1
kind: concept
related:
  - app-signing
  - ios
  - android
  - mobile-permissions
  - blue-green-canary
  - semver
see_also:
  - https://developer.apple.com/app-store/review/guidelines/
  - https://support.google.com/googleplay/android-developer/
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

만든 앱을 스토어에 올리기 전 **애플·구글이 규칙 위반 여부를 검사**하고 공개하는 과정.

## 비유

**백화점 입점 심사**. 물건(앱)을 만들었다고 바로 진열대에 못 올리고, 매장 규칙(가이드라인)을 지켰는지 검사받은 뒤에야 손님이 살 수 있다.

## 예시

연구실에서 환자용 기록 앱을 낸다고 하면 흐름은 이렇다.

1. 개발자 계정 등록 — 애플은 연회비, 구글은 1회 등록비가 있다 [확인 필요].
2. 내부 배포 — iOS 는 **TestFlight**, Android 는 Play Console 의 **내부 테스트 트랙**으로 연구원 폰에 먼저 깐다.
3. 스토어 정보 작성 — 스크린샷, 개인정보 처리방침 URL, 수집 데이터 항목 신고.
4. 심사 제출 — 보통 하루~며칠 걸리고 정책에 따라 달라진다 [확인 필요].
5. 단계적 출시 — 사용자 일부에게만 먼저 열어 크래시를 보고 늘린다.

자주 받는 반려 사유는 **권한 요청 문구가 모호함**, 로그인이 필요한데 심사용 테스트 계정을 안 줌, 앱이 웹사이트를 감싼 것뿐임, 의료·건강 기능에 근거나 면책 문구가 없음이다 [확인 필요].

## 헷갈리기 쉬운 것

- **TestFlight vs 정식 배포**: TestFlight 도 간단한 심사를 거치지만 초대받은 테스터만 설치한다. 정식 배포는 전체 심사 후 누구나 검색해 받는다.
- **심사 vs 서명**: 서명은 "누가 만들었고 변조되지 않았다" 는 증명, 심사는 "스토어 규칙을 지켰다" 는 검사다. 서명이 없으면 업로드조차 안 된다.
