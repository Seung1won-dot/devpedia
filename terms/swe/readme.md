---
id: readme
term: 문서화/README
aliases:
  - README
  - 리드미
  - 프로젝트 문서
  - README.md
category: swe
tags:
  - 문서화
  - 협업
level: 1
related:
  - adr
  - open-source-license
  - git
  - semantic-commit
  - requirements-spec
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

저장소를 처음 연 사람이 **뭐하는 프로젝트고 어떻게 돌리는지** 알게 하는 첫 문서.

## 비유

가전제품 상자 맨 위에 놓인 **빠른 시작 안내서**. 두꺼운 설명서(전체 문서) 전에 "전원 켜는 법, 첫 화면에서 할 일"만 한 장에 담는다.

## 예시

```markdown
# Devpedia
카테고리별 IT 용어 사전 — 한 줄 정의·비유·예시·관련 용어

## 시작하기
npm install && npm run dev          # http://localhost:5173

## 카드 추가
npm run new -- swe adr "ADR"        # terms/swe/adr.md 생성
npm run validate                    # 60자·태그·related 검사

## 구조
terms/<category>/<id>.md  카드 · taxonomy/  태그·카테고리 · scripts/  빌드·검증
```

순서는 "한 줄 소개 → 5분 안에 돌려보기 → 구조 → 기여 방법 → 라이선스". 논문 코드를 공개할 때는 **재현 명령 한 줄**(`python train.py --config paper.yaml`)과 데이터 받는 법이 빠지면 아무도 못 돌린다. 6개월 뒤의 나도 "처음 연 사람"이다.

## 헷갈리기 쉬운 것

- **CONTRIBUTING.md** 는 "기여하려는 사람"용(브랜치 규칙, 커밋 규칙, 리뷰 체크리스트). README 는 "쓰려는 사람"용.
- **주석·docstring** 은 코드 안에서 함수 하나를 설명. README 는 프로젝트 전체를 밖에서 본 설명. 둘 다 있어야 한다.
