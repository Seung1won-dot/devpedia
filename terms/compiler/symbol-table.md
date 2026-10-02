---
id: symbol-table
term: 심볼 테이블
aliases:
  - Symbol Table
  - 기호표
  - 심볼표
category: compiler
tags:
  - 컴파일러
  - 해시
level: 2
kind: concept
related:
  - scope
  - semantic-analysis
  - linker
  - hash-table
  - ast
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

변수·함수 이름마다 **종류·타입·위치**를 적어 두는 컴파일러의 장부.

## 비유

회사 **사내 전화번호부**다. 이름으로 찾으면 부서(스코프)·직급(타입)·내선(주소)이 나오고, 번호부에 없는 사람을 찾으면 "그런 직원 없음" 에러가 난다.

## 예시

```python
import symtable

src = "g = 1\ndef f(a):\n    b = a + g\n    return b\n"
f = symtable.symtable(src, "<demo>", "exec").get_children()[0]
for s in f.get_symbols():
    print(s.get_name(), "local" if s.is_local() else "global")
# a local
# b local
# g global
```

```bash
nm util.o        # 목적 파일의 심볼 테이블: T util_add(정의됨), U printf(외부에 있음)
```

컴파일러는 스코프에 들어갈 때마다 새 표를 쌓고 나올 때 버리며, 이름 찾기는 안쪽 표부터 바깥 표로 올라간다. 보통 해시 테이블로 만든다. 컴파일이 끝나도 목적 파일에 심볼 테이블이 남아 링커가 "이 이름은 어느 파일에 있나" 를 맞춰 본다.

## 헷갈리기 쉬운 것

- **스코프**는 "이름이 보이는 범위" 라는 언어 규칙이고, 심볼 테이블은 컴파일러가 그 규칙을 구현하는 자료구조다.
- **디버그 심볼**(`-g`, `.pdb`)은 디버거용으로 소스 줄 번호까지 담은 확장판이다. `strip` 하면 지워진다.
