---
id: profiling
term: 프로파일링
aliases:
  - Profiling
  - 프로파일러
  - Profiler
  - 성능 측정
  - cProfile
category: swe
tags:
  - 성능
  - 성능최적화
  - 개발도구
  - Python
level: 2
kind: concept
related:
  - debugging
  - debugger
  - big-o
  - performance-improvement-story
  - memory-leak
  - monitoring
see_also:
  - https://docs.python.org/3/library/profile.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

프로그램이 **어디서 시간과 메모리를 많이 쓰는지** 실제로 재서 찾아내는 일.

## 비유

돈이 어디로 새는지 모를 때 한 달 **가계부**를 적어 보는 것. 감으로는 커피값인 줄 알았는데 적어 보니 배달비였다는 게 드러난다.

## 예시

```bash
# 함수별 누적 시간을 느린 순으로 — EMR CSV 전처리가 왜 20분 걸리는지
python -m cProfile -s cumulative preprocess.py | head -n 30

# 이미 돌고 있는 학습 프로세스를 멈추지 않고 들여다보기 (PID 는 ps 로 확인)
pip install py-spy
py-spy top --pid 12345                      # top 처럼 실시간 함수 순위
py-spy record -o profile.svg --pid 12345    # 플레임 그래프로 저장
```

"pandas 가 느리겠지" 하고 추측으로 고치지 말고 먼저 잰다. 대개 상위 두세 함수가 전체 시간의 대부분을 차지하고, 그게 생각지도 못한 곳(날짜 파싱, 로그 출력)인 경우가 많다. 순서는 **측정 → 가장 비싼 곳 하나 고침 → 다시 측정**. 메모리는 표준 라이브러리 `tracemalloc` 으로 같은 식으로 잰다. 고치기 전후 숫자를 남겨 두면 그대로 이력서의 성능 개선 수치가 된다.

## 헷갈리기 쉬운 것

- **벤치마크**는 "전체가 얼마나 빠른가" 숫자 하나(초당 요청 수). 프로파일링은 그 시간이 안에서 어디로 갔는지 분해한다 — 벤치마크로 느린 걸 알고, 프로파일링으로 왜 느린지 찾는다.
- **디버깅**은 틀리게 동작하는 원인 찾기, 프로파일링은 맞게 동작하지만 느린 원인 찾기.
- **모니터링**은 운영 중인 서비스를 밖에서 계속 지켜보는 것. 프로파일링은 프로세스 하나의 안을 일회성으로 해부한다.
- **Big-O** 는 종이 위의 증가율. O(n) 코드도 디스크 I/O 때문에 느릴 수 있어서, 실제로 어디가 느린지는 재 봐야 안다.
