---
id: changelog
term: CHANGELOG
aliases:
  - Changelog
  - 체인지로그
  - 변경 이력
  - 릴리스 노트
  - Keep a Changelog
category: swe
tags:
  - 문서화
  - 배포
  - 협업
level: 1
kind: concept
related:
  - semver
  - git-tag-release
  - semantic-commit
  - readme
  - rollback
see_also:
  - https://keepachangelog.com/ko/1.0.0/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

버전마다 **무엇이 바뀌었는지 사용자 눈높이로** 적어 두는 변경 이력 파일.

## 비유

약 상자에 들어 있는 **개정 안내문**. "이번 판부터 복용량 표기가 mg 로 바뀌었습니다" 처럼, 쓰는 사람이 알아야 할 변화만 날짜와 함께 적혀 있다.

## 예시

```markdown
# Changelog
형식은 Keep a Changelog, 버전 번호는 SemVer 를 따른다.

## [Unreleased]
### Added
- DICOM 익명화에 `--keep-study-date` 옵션

## [1.2.0] - 2026-09-30
### Added
- FHIR R4 Observation 리소스 → CSV 변환
### Fixed
- 환자 ID 가 10자리 미만일 때 앞자리 0 이 사라지던 문제 (#41)

## [1.1.0] - 2026-09-12
### Changed
- 기본 출력 인코딩을 UTF-8 로 변경 — cp949 로 읽던 스크립트는 수정 필요
```

최신 버전이 맨 위, 작업 중인 것은 `Unreleased` 에 쌓다가 릴리스하는 날 버전·날짜로 바꾼다. 분류는 Added·Changed·Deprecated·Removed·Fixed·Security 여섯 가지면 된다. 커밋 로그를 그대로 붙이지 말 것 — 커밋은 "어떻게 고쳤나", CHANGELOG 는 "쓰는 사람에게 뭐가 달라졌나" 다. 시맨틱 커밋을 지켰다면 git-cliff·release-please 같은 도구가 초안을 만들어 주고, Added 는 MINOR, Fixed 는 PATCH, 호환이 깨지는 Changed 는 MAJOR 로 버전 자리까지 이어진다.

## 헷갈리기 쉬운 것

- **git log**는 모든 커밋이 다 있어 사용자가 읽기엔 너무 잘다. CHANGELOG 는 그중 사용자가 알아야 할 것만 골라 쓴 요약이다.
- **릴리스 노트**는 GitHub Releases 에 버전 하나씩 올리는 글. 내용은 거의 같고, CHANGELOG 는 저장소 안 한 파일에 전 버전이 쌓인다는 점이 다르다.
- **README**는 지금 버전을 어떻게 쓰는지, CHANGELOG 는 버전 사이에 뭐가 달라졌는지.
