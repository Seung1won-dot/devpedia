---
id: scope
term: 스코프
aliases:
  - Scope
  - 유효 범위
  - 변수의 범위
  - 전역 변수/지역 변수
category: lang
tags:
  - Python
  - JavaScript
  - 흔한실수
level: 1
kind: concept
related:
  - closure
  - variable-type
  - module-import
  - stack-heap-memory
  - higher-order-function
  - symbol-table
see_also:
  - https://developer.mozilla.org/en-US/docs/Glossary/Scope
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

변수나 함수의 이름이 **코드 어디까지 보이는지** 정해 주는 범위.

## 비유

**아파트 복도 게시판과 우리 집 냉장고 메모**. 복도 게시판(전역)은 모든 집에서 읽을 수 있지만, 우리 집 냉장고에 붙인 메모(지역)는 우리 집 안에서만 보이고 옆집은 같은 이름의 메모를 따로 붙일 수 있다.

## 예시

```python
count = 0                     # 모듈(전역) 스코프

def add():
    count += 1                # UnboundLocalError — 함수 안에서 대입하면 "지역 변수" 로 취급된다

def add_ok():
    global count              # 전역 것을 쓰겠다고 명시
    count += 1

def show():
    print(count)              # 읽기만 하면 바깥 것을 그대로 본다 — 안쪽에서 바깥으로 찾아 올라감
```

```ts
if (true) {
  let a = 1
  var b = 2
}
console.log(b)   // 2 — var 는 함수 단위라 블록 밖에서도 보인다
console.log(a)   // 오류 — let/const 는 블록({}) 안에서만 산다
```

이름을 찾을 때는 **안쪽에서 바깥쪽으로** 올라간다(함수 → 감싼 함수 → 모듈 → 내장). 파이썬은 `if`/`for` 블록이 스코프를 만들지 않아 루프 변수가 루프 뒤에도 남고, JS 는 `let`/`const` 가 블록마다 새 스코프를 만든다. 전역 변수를 여기저기서 바꾸는 코드가 "어디서 값이 바뀌었는지 모르겠다" 버그의 단골 원인이라, 함수 인자로 넘기고 반환값으로 돌려받는 습관이 안전하다.

## 헷갈리기 쉬운 것

- **클로저**: 스코프는 "어디서 보이나" 의 규칙이고, 클로저는 그 규칙 덕에 함수가 바깥 변수를 들고 나가는 현상.
- **모듈**: 파일 하나가 곧 스코프 하나다. 다른 파일의 변수를 쓰려면 `import` 로 가져와야지, 같은 프로젝트라고 자동으로 보이지 않는다.
- **환경변수**: 프로그램 밖(OS 프로세스)에 있는 값이라 언어의 스코프 규칙과 무관하다. `os.environ` 으로 읽어 와야 변수가 된다.
