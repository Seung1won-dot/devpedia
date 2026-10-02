---
id: generics
term: 제네릭
aliases:
  - Generics
  - 제네릭 타입
  - 타입 매개변수
  - Generic Type
  - 템플릿
category: lang
tags:
  - 타입
  - TypeScript
  - Python
level: 2
kind: concept
related:
  - type-hint
  - type-inference
  - static-dynamic-typing
  - interface-abstract-class
  - abstraction
see_also:
  - https://www.typescriptlang.org/docs/handbook/2/generics.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

타입을 **나중에 채우는 빈칸(T)**으로 남겨 두고, 한 코드를 여러 타입에 안전하게 재사용하는 것.

## 비유

**"○○ 보관함" 이라고 빈칸을 둔 이름표**. 상자는 하나인데 빈칸에 "약품" 을 쓰면 약품 상자, "서류" 를 쓰면 서류 상자가 되고, 약품 상자에 서류를 넣으려 하면 바로 걸린다.

## 예시

```ts
// API 응답의 껍데기는 늘 같고 data 만 달라진다 — 그 자리를 T 로 비워 둔다
interface ApiResponse<T> {
  ok: boolean
  data: T
}
async function getJson<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url)
  return res.json()
}
const r = await getJson<{ mrn: string; name: string }>('/api/patients/1')
r.data.name        // 자동완성 OK
r.data.age         // 컴파일 오류 — T 에 age 가 없다
```

```python
from typing import TypeVar, Generic
T = TypeVar("T")

class Page(Generic[T]):                 # Python 3.12+ 는 class Page[T]: 로 짧게
    def __init__(self, items: list[T], total: int) -> None:
        self.items, self.total = items, total

page = Page(["a", "b"], total=2)        # Page[str] 로 추론
page.items[0].upper()                   # 에디터가 str 인 걸 안다
```

제네릭이 없으면 선택지가 둘뿐이다 — 타입마다 같은 코드를 복붙하거나, `any`/`Any` 로 받아서 검사를 포기하거나. 제네릭은 "어떤 타입이든 받되, **넣은 타입을 기억했다가 꺼낼 때 그대로 돌려준다**" 는 세 번째 길이다. 이미 매일 쓰고 있다 — `list[str]`, `Promise<Response>`, `useState<number>()` 가 전부 제네릭이다.

## 헷갈리기 쉬운 것

- **`any` / `Any`**: 아무 타입이나 받는 건 같지만, `any` 는 들어간 순간 타입 정보가 사라지고 제네릭은 보존한다. `const x: any[] = ['a']; x[0].foo` 는 통과하고, `const y: string[]` 이면 잡힌다.
- **유니온 타입**(`string | number`): 미리 정한 몇 가지 중 하나다. 제네릭은 호출하는 쪽이 **그때그때** 타입을 정하고, 함수 안에서는 그 타입이 하나로 고정된다.
- **오버로딩**: 타입별로 함수를 여러 개 적는 것이고, 제네릭은 하나로 끝낸다. 타입마다 **동작이 다르면** 오버로딩, 동작이 같고 타입만 다르면 제네릭.
