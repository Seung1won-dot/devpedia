---
id: coding-test-language
term: 코테 언어 선택
aliases:
  - Coding Test Language
  - 코딩테스트 언어
  - 코테 언어
  - PyPy
category: career
tags:
  - 코딩테스트
  - Python
level: 1
kind: concept
related:
  - coding-test
  - coding-test-platforms
  - big-o
  - compiler-interpreter
  - coding-test-topics
  - samsung-sw-test
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

코테에서 쓸 언어를 **하나 정해 고정**하고 그 언어의 시간·입출력 특성을 익히는 일.

## 비유

시험용 필기구 고르기. 만년필·연필·볼펜 중 뭐든 되지만, **시험장에서 처음 써 보는 펜**은 손에 안 붙는다.

## 예시

```text
언어     장점                                       단점                                  주로
Python   코드 짧다, 딕셔너리·슬라이싱·정렬 편함       느리다 (C++ 대비 수십 배), 재귀 깊이 제한   입문자, 국내 기업 대부분
C++      가장 빠르다, STL(vector·map·priority_queue)   문법 장황, 실수하면 원인 모를 런타임 에러   삼성·게임·임베디드
Java     국내 기업 실무 언어라 친숙, 라이브러리 풍부      코드 길다, Scanner 쓰면 입력에서 시간 초과   국내 대기업·SI
JS/TS    프론트 지원자에겐 자연스러움                 sort 기본이 문자열 비교, 입력 처리 불편       프론트 직군
```

Python 으로 시간 초과가 나면 알고리즘을 바꾸기 전에 아래부터 확인한다.

```python
import sys
input = sys.stdin.readline            # input() 보다 훨씬 빠르다 (끝 개행은 .strip())
sys.setrecursionlimit(10**6)          # DFS 재귀가 1000 깊이에서 죽는 것 방지
n = int(input())
arr = list(map(int, input().split()))
out = []                              # print 를 반복하지 말고 모아서 한 번에
for x in arr:
    out.append(str(x * 2))
print("\n".join(out))
# 반복이 1천만 번을 넘으면 같은 코드를 "PyPy3" 로 제출 (백준 지원, 프로그래머스는 미지원 [확인 필요])
```

원칙은 세 가지다. 첫째, 하나 골라 최소 3개월은 바꾸지 않는다 — 언어를 바꾸는 순간 자료구조 문법을 처음부터 다시 익힌다. 둘째, 공고의 "사용 가능 언어" 를 먼저 확인한다. 대부분 자유지만 Java 나 C/C++ 로 제한하는 기업이 있다 [확인 필요]. 셋째, 시간 초과가 언어 탓인지 알고리즘 탓인지 구분한다 — O(n²) 에 n=10^5 면 PyPy 로도, C++ 로도 안 산다. 실무 언어와 코테 언어가 달라도 되는 회사가 대부분이고, Python 으로 코테를 보고 Java 백엔드로 입사하는 경우도 흔하다.

## 헷갈리기 쉬운 것

- **PyPy 와 CPython** 은 같은 Python 코드를 다르게 실행하는 실행기. PyPy 가 반복문에 몇 배 빠르지만 재귀·메모리는 오히려 불리할 수 있다.
- **실무 언어와 코테 언어**는 달라도 된다. 면접에서 "왜 Python 으로 풀었나?" 는 "빨리 정확하게 풀려고" 면 충분한 답이다.
- **Java 의 Scanner 와 BufferedReader**: 입력이 수십만 줄이면 Scanner 는 그 자체로 시간 초과 원인이다.
