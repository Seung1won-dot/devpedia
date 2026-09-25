---
id: hash-table
term: 해시 테이블
aliases:
  - Hash Table
  - 해시맵
  - 딕셔너리(dict)
  - HashMap
category: algo
tags:
  - 해시
  - 탐색
  - 검색
level: 1
related:
  - hash
  - array
  - big-o
  - key-value-store
  - cache
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

키를 **계산해서 나온 번호 칸**에 값을 넣어 두고 거의 한 번에 찾는 자료구조.

## 비유

**도서관 청구기호**. 책 제목만 있으면 규칙대로 기호가 계산되어 어느 서가 몇 번째 칸인지 바로 알 수 있으니, 온 서가를 뒤질 필요가 없다.

## 예시

```python
cards = {"reverse-proxy": "외부 요청을 대신 받는 중간 서버", "rag": "문서를 검색해서 LLM 에 전달"}

index = {}                                     # 단어 → 그 단어가 나오는 카드 id 집합
for term_id, text in cards.items():
    for word in text.split():
        index.setdefault(word, set()).add(term_id)

print(index["검색해서"])                       # {'rag'} — 카드가 1만 장이어도 거의 즉시
```

검색 인덱스, 중복 제거(`set`), 방문 여부 기록이 전부 이것. Python `dict`/`set`, JS `Map`, Redis 의 키 저장소가 해시 테이블이다.

## 헷갈리기 쉬운 것

- **해시(SHA-256)**: 보안 쪽 해시는 데이터가 바뀌었는지 확인하거나 비밀번호를 저장할 때 쓰는 함수. 해시 테이블은 같은 아이디어(값 → 번호)를 "빨리 찾기" 에 쓴 자료구조다.
- **배열**: 배열은 0, 1, 2… 번호로만 찾는다. 해시 테이블은 문자열 같은 아무 키로 찾되, 그 키를 내부에서 배열 번호로 바꾼다.
- **충돌**: 다른 키가 같은 번호로 계산되는 일. 그래서 "거의" 한 번이지, 운이 나쁘면 느려질 수 있다.
