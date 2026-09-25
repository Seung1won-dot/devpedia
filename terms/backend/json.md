---
id: json
term: JSON
aliases:
  - JavaScript Object Notation
  - 제이슨
  - JSON 포맷
category: backend
tags:
  - 데이터
  - API설계
  - JavaScript
level: 1
related:
  - api
  - rest
  - http
  - document-db
  - fhir
see_also:
  - https://www.json.org/json-ko.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**중괄호와 키-값 쌍**으로 데이터를 적는, 사람도 기계도 읽기 쉬운 텍스트 형식.

## 비유

누구나 같은 칸에 같은 순서로 적는 **표준 신청서 양식**. 이름 칸에 이름, 나이 칸에 숫자를 적어 두면 어느 창구(언어)에 내도 그대로 읽힌다.

## 예시

Supabase 에서 행 하나를 읽으면 이런 JSON 이 온다:

```json
{
  "id": 7,
  "title": "GPU 서버 백업 정책",
  "tags": ["infra", "backup"],
  "published": false,
  "owner": { "name": "승원", "role": "admin" }
}
```

```ts
const data = JSON.parse(text)   // 문자열 → 객체
JSON.stringify(data)            // 객체 → 문자열
```

값 종류는 문자열·숫자·불리언·null·배열·객체 6가지뿐이고, 주석과 끝 쉼표는 못 쓴다.

## 헷갈리기 쉬운 것

- **JS 객체 리터럴**과 닮았지만 JSON 은 키에 반드시 큰따옴표, 주석·함수·`undefined` 는 불가. 언어와 무관한 텍스트라서 Python 도 Go 도 그대로 읽는다.
- **YAML** 은 들여쓰기로 구조를 표현하는 설정 파일용 형식(이 사전의 frontmatter 가 YAML). 주석이 되고 손으로 쓰기 편하지만 API 응답에는 JSON 을 쓴다.
