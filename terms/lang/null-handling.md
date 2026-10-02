---
id: null-handling
term: null/None 처리
aliases:
  - Null Handling
  - 널 처리
  - None
  - Optional
  - 옵셔널 체이닝
  - null 안전성
category: lang
tags:
  - 타입
  - Python
  - TypeScript
  - 흔한실수
level: 1
kind: concept
related:
  - exception
  - type-hint
  - variable-type
  - missing-data
  - validation
see_also:
  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

**값이 없음**을 뜻하는 null/None 을 값처럼 쓰다 터지지 않게 미리 거르는 일.

## 비유

**빈 봉투**. 봉투(변수)는 분명 손에 있는데 안에 돈(값)이 없을 수 있어서, 돈을 세기 전에 먼저 봉투 안을 들여다봐야 한다.

## 예시

```python
def find_patient(mrn: str) -> dict | None:     # "없으면 None 을 돌려준다" 를 타입에 적어 둔다
    rows = [r for r in db if r["mrn"] == mrn]
    return rows[0] if rows else None

p = find_patient("001")
print(p["name"])              # p 가 None 이면 TypeError: 'NoneType' object is not subscriptable
if p is not None:             # None 검사는 == 이 아니라 is 로
    print(p["name"])

name = (p or {}).get("name", "이름 없음")   # 한 줄로 기본값까지
```

```ts
// tsconfig 의 strictNullChecks 가 켜져 있으면 실행 전에 잡힌다
const p = patients.find((x) => x.mrn === '001')   // 타입: Patient | undefined
p.name                                            // 오류 — undefined 일 수 있다
const name = p?.name ?? '이름 없음'              // 옵셔널 체이닝 + null 병합
```

API 응답·DB 조회·`dict.get()`·배열 `find()` 처럼 "없을 수도 있는" 자리에서 null 이 태어난다. 좋은 습관은 두 가지 — 없을 수 있다는 사실을 **타입에 적어 두기**(`| None`, `| undefined`)와, 그 값을 **쓰는 쪽이 아니라 받는 즉시** 걸러서 기본값을 주거나 예외를 던지기. 한 번 걸러진 뒤로는 안쪽 코드가 매번 검사하지 않아도 된다.

## 헷갈리기 쉬운 것

- **`None` 과 `0`·`""`·`[]`**: "없음" 과 "비어 있음" 은 다르다. `if not x:` 는 둘 다 걸러 버려서, 심박수 0 이나 빈 메모를 "값 없음" 으로 오해하는 버그가 난다. None 만 거르려면 `if x is None:`.
- **`undefined` 와 `null`**(JS): `undefined` 는 아직 아무것도 안 넣은 것, `null` 은 일부러 비워 둔 것이다. `??` 는 둘만 잡고 `||` 는 `0`·`''` 까지 기본값으로 바꿔 버린다.
- **NaN**(pandas): CSV 의 빈 칸은 None 이 아니라 `NaN` 으로 읽히고, `NaN == NaN` 도 False 다. `pd.isna()` 로 검사해야 한다 — 결측치 처리 카드 참고.
