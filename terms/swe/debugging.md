---
id: debugging
term: 디버깅
aliases:
  - Debugging
  - 디버그
  - 버그 잡기
  - 오류 추적
  - 트러블슈팅
category: swe
tags:
  - 품질
  - 개발도구
  - 흔한실수
  - 면접
level: 1
kind: concept
related:
  - debugger
  - bug-report
  - logging
  - exception
  - testing-levels
  - troubleshooting-story
see_also:
  - https://docs.python.org/3/library/pdb.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

프로그램이 **왜 기대와 다르게 동작하는지** 원인을 좁혀 찾아 고치는 과정.

## 비유

집에 불이 안 들어올 때 하는 일. 온 집이 다 꺼졌나(차단기), 이 방만인가(스위치), 이 전구만인가(전구) 식으로 **범위를 반씩 좁혀** 가며 확인한다.

## 예시

```python
# 증상: 가명화한 CSV 의 환자 수가 원본보다 적다
import pandas as pd
src = pd.read_csv("emr_raw.csv", dtype=str)
out = pd.read_csv("emr_anon.csv", dtype=str)
print(len(src), len(out))                          # 1) 사실 확인: 12034 vs 11987 — 47명 증발
print(src["patient_id"].isna().sum())              # 2) 가설 A: 빈 ID 가 떨어졌나? → 0, 아니다
print(src["patient_id"].str.len().value_counts())  # 3) 가설 B: 길이가 다른 ID? → 9자리가 정확히 47개
breakpoint()                                       # 4) 여기서 멈춰 anonymize("123456789") 를 직접 넣어 본다
```

순서는 늘 같다 — **재현**(같은 입력으로 같은 증상이 나오게), **관찰**(에러 메시지와 로그를 끝까지 읽기), **가설을 하나씩 검증**(한 번에 한 가지만 바꾸기), 고친 뒤 **재발 방지 테스트 추가**. 초보가 가장 많이 하는 실수는 에러 메시지를 안 읽고 코드부터 고치는 것과, 두 군데를 동시에 바꿔서 뭐가 효과였는지 모르게 되는 것이다. "언제부터 깨졌나" 는 `git bisect` 가 커밋을 반씩 잘라 찾아 준다. 면접의 "트러블슈팅 경험" 질문은 이 네 단계를 밟은 이야기를 원한다.

## 헷갈리기 쉬운 것

- **디버거**는 디버깅에 쓰는 도구 중 하나. print·로그·테스트·`git bisect` 도 모두 디버깅 수단이다.
- **트러블슈팅**은 거의 같은 뜻으로 쓰지만, 코드 밖의 서버·네트워크·설정 문제까지 포함하는 더 넓은 말이다.
- **테스트**는 버그가 있는지 **찾는** 것, 디버깅은 찾은 뒤 **왜**를 알아내 고치는 것. 고친 자리에 테스트를 하나 남기면 둘이 이어진다.
