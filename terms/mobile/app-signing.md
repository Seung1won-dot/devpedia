---
id: app-signing
term: 앱 서명 · 빌드(APK/AAB/IPA)
aliases:
  - App Signing
  - Code Signing
  - 키스토어
  - Keystore
  - APK
  - AAB
  - IPA
  - 프로비저닝 프로파일
category: mobile
tags:
  - 모바일
  - 앱배포
  - 키관리
level: 2
kind: concept
related:
  - digital-signature
  - app-store-review
  - secrets-management
  - ci-cd
  - certificate
  - android
see_also:
  - https://developer.android.com/studio/publish/app-signing
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

빌드한 앱 파일에 **개발자 키로 서명**해 누가 만들었고 변조되지 않았음을 증명하는 절차.

## 비유

**공문서의 직인**. 같은 기관 직인이 찍혀야 개정판(업데이트)으로 인정되고, 직인을 잃어버리면 이전 문서의 후속판을 더는 낼 수 없다.

## 예시

```bash
# 업로드 키 만들기 (한 번만) — 이 파일과 비밀번호를 잃으면 큰일
keytool -genkeypair -v -keystore upload-key.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000

# 서명된 AAB 빌드
./gradlew bundleRelease
```

Android 는 스토어 업로드용 **AAB**(구글이 기기별 APK 로 쪼개 줌)와 직접 설치용 **APK**, iOS 는 **IPA** 를 만든다. iOS 는 키스토어 대신 애플 개발자 계정의 인증서와 **프로비저닝 프로파일**(어느 앱을 어느 기기에 깔 수 있는지)이 짝을 이뤄야 한다. 키스토어 파일과 비밀번호는 git 에 올리지 말고 CI 시크릿·비밀번호 관리자에 따로 백업한다. Play 앱 서명을 쓰면 업로드 키를 잃어도 재설정할 수 있지만, 직접 서명하던 앱이 키를 잃으면 같은 앱으로 업데이트를 못 낸다 [확인 필요].

## 헷갈리기 쉬운 것

- **APK vs AAB**: APK 는 바로 설치되는 완성품, AAB 는 스토어에 올리는 원재료로 폰에 직접 깔 수 없다.
- **업로드 키 vs 앱 서명 키**: Play 앱 서명을 쓰면 개발자는 업로드 키로 서명해 올리고, 구글이 보관한 앱 서명 키로 다시 서명해 배포한다.
- **디버그 서명 vs 릴리스 서명**: 개발 중엔 자동 생성된 디버그 키가 쓰인다. 디버그로 서명된 앱은 스토어에 올릴 수 없다.
