---
id: mobile-local-storage
term: 모바일 로컬 저장소
aliases:
  - Mobile Local Storage
  - SharedPreferences
  - UserDefaults
  - Keychain
  - 키체인
  - DataStore
category: mobile
tags:
  - 모바일
  - 스토리지
  - 시크릿
level: 2
kind: concept
related:
  - local-storage
  - token-storage
  - sqlite
  - encryption-at-rest-in-transit
  - kms-hsm
  - app-lifecycle
see_also:
  - https://developer.android.com/training/data-storage
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

앱이 **폰 안에 데이터를 남겨 두는 곳**으로 용도에 따라 저장소를 골라 쓴다.

## 비유

집 안 수납이다. **포스트잇(설정값)**, **책장(SQLite 데이터베이스)**, **금고(Keychain/Keystore)** 는 각각 넣는 물건이 다르다.

## 예시

| 용도 | Android | iOS | 넣는 것 |
|---|---|---|---|
| 작은 설정값 | SharedPreferences / DataStore | UserDefaults | 다크 모드, 마지막 탭 |
| 구조화 데이터 | Room(SQLite) | Core Data / SwiftData / SQLite | 오프라인 측정 기록 |
| 비밀 | Keystore + EncryptedSharedPreferences | **Keychain** | 리프레시 토큰, 암호화 키 |

```swift
UserDefaults.standard.set(true, forKey: "darkMode")   // OK: 설정값
// UserDefaults.standard.set(token, forKey: "refreshToken")  // 금지: 평문 plist 로 저장됨
```

가장 흔한 사고는 **토큰을 SharedPreferences·UserDefaults 에 평문으로 넣는 것**이다. 탈옥·루팅 기기나 백업 파일에서 그대로 읽힌다. 비밀은 Keychain/Keystore 에, 오프라인 환자 기록처럼 민감한 데이터는 암호화된 DB 에 두고 로그아웃 때 지운다.

## 헷갈리기 쉬운 것

- **모바일 저장소 vs 웹 localStorage**: 둘 다 키-값이지만 웹은 같은 출처 JS 가 모두 읽을 수 있어 XSS 위험이 있고, 모바일은 앱 샌드박스로 다른 앱이 못 읽는다. 그래도 기기를 손에 쥔 공격자에게는 평문이 그대로 보인다.
- **Keychain vs Keystore**: Keychain 은 값 자체를 저장하는 금고, Android Keystore 는 주로 **키**를 하드웨어에 보관하고 그 키로 다른 데이터를 암호화하는 방식이다.
