---
id: shallow-deep-copy
term: 얕은 복사/깊은 복사
aliases:
  - Shallow Copy / Deep Copy
  - 얕은 복사
  - 깊은 복사
  - copy.deepcopy
  - structuredClone
category: lang
tags:
  - 메모리관리
  - Python
  - JavaScript
  - 흔한실수
level: 1
kind: concept
related:
  - call-by-value-reference
  - immutability
  - stack-heap-memory
  - pandas-numpy
  - state-management
see_also:
  - https://docs.python.org/ko/3/library/copy.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

겉 상자만 새로 만들면 **얕은 복사**, 안의 내용물까지 전부 새로 만들면 **깊은 복사**다.

## 비유

**열쇠 복사와 집 복제**. 열쇠만 하나 더 만들면(얕은) 누가 가구를 옮겨도 둘 다 같은 집이라 그대로 보이고, 똑같은 집을 하나 더 지어야(깊은) 서로 영향이 없다.

## 예시

```python
import copy

patient = {"mrn": "001", "visits": [{"date": "2026-01-03"}]}
shallow = dict(patient)             # 또는 patient.copy(), {**patient}
deep = copy.deepcopy(patient)

shallow["visits"].append({"date": "2026-02-10"})
print(len(patient["visits"]))       # 2 — 원본도 바뀜! 안쪽 리스트는 같은 객체를 가리킨다
print(len(deep["visits"]))          # 1 — 완전히 분리

shallow["mrn"] = "002"
print(patient["mrn"])               # "001" — 겉 상자의 키 자체를 바꾸는 건 원본에 안 번진다
```

```ts
const a = { mrn: '001', visits: [{ date: '2026-01-03' }] }
const b = { ...a }                  // 스프레드 = 얕은 복사
b.visits.push({ date: '2026-02-10' })
console.log(a.visits.length)        // 2 — 같은 배열
const c = structuredClone(a)        // 깊은 복사 (브라우저·Node 17+)
```

얕은 복사는 한 겹만 새로 만들기 때문에, 중첩된 리스트·딕셔너리를 가진 데이터는 복사본을 고쳤는데 원본이 바뀌는 사고가 난다. 깊은 복사는 안전하지만 큰 데이터(DICOM 배열, DataFrame)를 통째로 또 만들어 메모리와 시간을 쓴다. pandas 의 `df.copy()` 는 기본이 깊은 복사이고, NumPy 의 슬라이싱 `arr[:10]` 은 복사가 아니라 **같은 메모리를 보는 뷰**라 더 헷갈린다.

## 헷갈리기 쉬운 것

- **참조 대입**(`b = a`): 복사가 아예 아니다. 같은 물건에 이름표를 하나 더 붙인 것이라 겉 상자의 키를 바꿔도 둘 다 바뀐다.
- **불변성**: 복사를 잘 하는 법이 아니라, 아예 안 바꾸고 새 값을 만드는 방식이다. React `setState` 에 스프레드를 쓰는 건 얕은 복사라서, 중첩 상태는 안쪽까지 매 겹 새로 펼쳐야 한다.
- **`JSON.parse(JSON.stringify(x))`**: 깊은 복사 꼼수지만 `Date` 는 문자열이 되고 `undefined`·함수는 사라진다. `structuredClone` 이나 `copy.deepcopy` 를 쓴다.
