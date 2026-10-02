---
id: call-by-value-reference
term: 값 전달/참조 전달
aliases:
  - Call by Value / Reference
  - 값에 의한 호출
  - 참조에 의한 호출
  - Call by Sharing
  - 매개변수 전달 방식
category: lang
tags:
  - Python
  - 메모리관리
  - 면접
level: 2
kind: concept
related:
  - stack-heap-memory
  - variable-type
  - immutability
  - class-instance
  - technical-interview
  - shallow-deep-copy
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

함수에 인자를 넘길 때 **값을 복사**해 주느냐, **원본을 가리키는 주소**를 주느냐의 차이.

## 비유

문서를 **복사본으로 건네기**와 **원본이 든 서랍 열쇠를 건네기**. 복사본에 뭘 적어도 원본은 그대로지만, 열쇠를 받은 사람이 서랍 속 문서에 낙서하면 원본이 바뀐다.

## 예시

```python
def append_item(items):
    items.append("x")        # 넘어온 리스트 "그 객체" 를 고친다 → 바깥에도 보인다

def replace_items(items):
    items = ["x"]            # 지역 이름표를 새 객체에 붙일 뿐 → 바깥은 그대로

a = [1, 2]
append_item(a);  print(a)    # [1, 2, 'x']
replace_items(a); print(a)   # [1, 2, 'x']  — 재할당은 밖으로 안 퍼진다
```

Python 은 변수에 "객체를 가리키는 참조" 가 들어 있고, 함수를 부를 때 그 참조를 **복사**해서 넘긴다(call by sharing 이라고도 부른다). 그래서 넘어온 객체를 **수정**하면 호출한 쪽도 바뀌지만, 매개변수에 **새 객체를 대입**하면 지역 변수만 바뀐다. Java 도 똑같다 — 기본형(int)은 값이, 참조형(객체)은 참조값(주소)이 복사되므로 `swap(a, b)` 로 두 객체를 바꿔치기할 수 없다. C++ 의 `int&` 처럼 변수 자체를 넘기는 진짜 참조 전달과는 구분해야 한다.

면접에선 "Java 는 call by value 인가 reference 인가?" 로 나온다 — 답은 **항상 값 전달**이고, 참조형은 그 값이 주소일 뿐이다.

## 헷갈리기 쉬운 것

- **얕은 복사/깊은 복사**: 전달 방식과는 다른 문제로, 리스트 안의 객체까지 새로 만드느냐(`copy.deepcopy`)의 차이. 얕은 복사본을 넘기면 겉은 다른 리스트인데 안의 딕셔너리는 공유된다.
- **불변 객체**(문자열·튜플·int): 참조가 넘어가도 고칠 방법이 없어 값 전달처럼 보인다. `s += "a"` 는 수정이 아니라 새 문자열을 만들어 재할당하는 것이다.
