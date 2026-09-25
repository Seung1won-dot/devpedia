---
id: regex
term: 정규표현식
aliases:
  - Regular Expression
  - 정규식
  - 정규 표현식
  - regex
category: lang
tags:
  - Python
  - JavaScript
  - 검색
level: 2
related:
  - shell
  - logging
  - de-identification
  - sql
see_also:
  - https://docs.python.org/3/library/re.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

글자·숫자·반복 같은 **패턴을 기호로 적어** 문자열을 찾거나 바꾸는 규칙.

## 비유

**서류 양식 검사원**. "010 으로 시작하고, 하이픈, 숫자 4자리" 처럼 모양 규칙을 적어 두면 수천 장의 서류에서 맞는 것만 골라내거나 가려(마스킹) 준다.

## 예시

```python
import re

log = "2026-09-25 14:02:11 환자 010-1234-5678 접수, 보호자 010-9876-5432"
phone = re.compile(r"010-\d{4}-\d{4}")

print(phone.findall(log))                 # ['010-1234-5678', '010-9876-5432']
print(phone.sub("010-****-****", log))    # 마스킹(가명화)에 자주 씀
m = re.match(r"(\d{4})-(\d{2})-(\d{2})", log)
print(m.group(1), m.group(2))             # 2026 09
```

## 헷갈리기 쉬운 것

- 셸의 **글로브**(`*.md`)와 다르다. 글로브의 `*` 는 "아무 글자나", 정규식의 `*` 는 "앞 것을 0번 이상 반복". `.md` 로 끝나는 걸 찾으려면 정규식은 `\.md$`.
- **SQL LIKE** 의 `%`/`_` 도 단순 와일드카드. 복잡한 패턴은 DB 마다 `REGEXP`/`~` 같은 별도 문법을 쓴다.
