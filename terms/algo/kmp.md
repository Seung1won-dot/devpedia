---
id: kmp
term: KMP 문자열 매칭
aliases:
  - KMP
  - Knuth-Morris-Pratt
  - 문자열 매칭
  - 실패 함수
  - 패턴 매칭
category: algo
tags:
  - 탐색
  - 복잡도
  - 코딩테스트
  - 검색
level: 3
kind: concept
related:
  - trie
  - two-pointers
  - regex
  - big-o
  - hash-table
  - full-text-search
  - finite-automata
see_also:
  - https://cp-algorithms.com/string/prefix-function.html
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

긴 글에서 패턴을 찾을 때 **틀렸던 자리 정보를 재활용해 뒤로 되돌아가지 않는** 문자열 탐색.

## 비유

**이미 맞춘 꼬리를 다음 비교의 머리로 재활용하기**. "ABAB?" 를 대 보다 다섯 번째에서 틀렸을 때, 방금 맞춘 뒤쪽 "AB" 가 패턴 앞 "AB" 와 같다는 걸 미리 적어 둔 표로 알고 세 번째 글자부터 이어 비교한다.

## 예시

```python
def failure(p):                      # pi[i] = p[:i+1] 에서 "접두사 == 접미사" 인 최대 길이
    pi, j = [0] * len(p), 0
    for i in range(1, len(p)):
        while j > 0 and p[i] != p[j]:
            j = pi[j - 1]            # 틀리면 더 짧은 접두사로 되감기
        if p[i] == p[j]:
            j += 1; pi[i] = j
    return pi

def kmp(text, p):                    # p 가 나타나는 모든 시작 위치
    pi, j, found = failure(p), 0, []
    for i, ch in enumerate(text):
        while j > 0 and ch != p[j]:
            j = pi[j - 1]            # text 쪽 i 는 절대 뒤로 가지 않는다
        if ch == p[j]:
            j += 1
            if j == len(p):
                found.append(i - j + 1); j = pi[j - 1]
    return found

print(failure("ABABC"))              # [0, 0, 1, 2, 0]
print(kmp("ABABABCABABC", "ABABC"))  # [2, 7]
```

글 길이 n, 패턴 길이 m 일 때 단순 비교는 최악 O(n·m), KMP 는 O(n+m) 이다. 트레이드오프: 문자열 하나 찾기는 C 로 구현된 `text.find(p)`/`in` 이 더 빠르고 짧으니 실무에서 직접 짤 일은 거의 없다. KMP 를 꺼내는 때는 실패 함수 자체가 답인 문제 — 문자열의 최소 반복 주기 `n - pi[-1]`, "접두사이면서 접미사" 길이 — 이거나, 입력이 흘러 들어와 뒤로 못 돌아가는 스트림일 때다. 코딩테스트에선 백준 1786 "찾기" 가 기본형이다.

## 헷갈리기 쉬운 것

- **단순(브루트포스) 매칭**: 틀리면 글의 시작 위치를 한 칸 밀고 패턴은 처음부터 다시 댄다. `AAAA…B` 같은 입력에서 O(n·m) 으로 터진다.
- **라빈-카프**: 글자 비교 대신 해시값을 비교한다. 평균은 빠르지만 충돌 시 느려지고, 패턴 여러 개를 동시에 찾을 때 유리하다.
- **정규표현식**: 패턴 "언어" 를 해석하는 범용 엔진이라 고정 문자열 하나 찾기엔 느리다. KMP 는 고정 문자열 전용.
- **아호-코라식**: 패턴 여러 개를 트라이에 넣고 KMP 의 실패 함수를 붙인 것 — 금칙어 수천 개를 한 번에 거를 때 쓴다.
