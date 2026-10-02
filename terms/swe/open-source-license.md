---
id: open-source-license
term: 오픈소스 라이선스(MIT/GPL)
aliases:
  - Open Source License
  - 오픈소스 라이선스
  - MIT 라이선스
  - GPL
category: swe
tags:
  - 협업
  - 문서화
level: 1
kind: regulation
related:
  - readme
  - package-manager
  - git
  - semver
see_also:
  - https://choosealicense.com/
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

공개한 코드를 남이 **어디까지 쓰고 고치고 되팔 수 있는지** 정한 사용 규칙.

## 비유

레시피 공개할 때 붙이는 **조건표**. MIT 는 "내 이름만 남기면 뭐든 해라", GPL 은 "이 레시피로 만든 요리의 레시피도 공개해라"에 가깝다.

## 예시

논문 코드를 공개할 때 고르는 기준.

```text
MIT         : 회사도 가져다 쓰게 하고 싶고 저작권 표시만 남기면 됨 → 대부분의 ML 코드
Apache-2.0  : MIT + 특허 조항. 기업 기여를 받고 싶으면 이쪽
GPL-3.0     : 우리 코드를 쓴 소프트웨어도 소스를 공개하게 강제하고 싶을 때
(없음)      : LICENSE 파일이 없으면 "공개돼 있어도 남이 쓸 수 없음"이 기본
```

```bash
# 저장소 루트에 LICENSE 파일을 두고, package.json / pyproject.toml 에도 적는다
"license": "MIT"
```

의존성 쪽도 봐야 한다 — GPL 라이브러리를 가져다 쓴 프로그램을 배포하면 내 코드도 GPL 로 열어야 한다(전염성). `npx license-checker` 로 node_modules 의 라이선스 목록을 뽑을 수 있다. 연구실 코드는 지도교수·학교 산학 규정에 따라 달라지니 공개 전에 한 번 묻는다. [확인 필요: 학교별 규정]

## 헷갈리기 쉬운 것

- **MIT 와 GPL**: MIT 는 허용적(가져가서 비공개로 팔아도 됨), GPL 은 카피레프트(가져간 쪽도 소스를 열어야 함). "저작권 표시 유지"는 둘 다 공통.
- **오픈소스 ≠ 저작권 포기**. 저작권은 그대로 있고 허락 조건만 붙인 것. 진짜 포기는 CC0 / 퍼블릭 도메인.
