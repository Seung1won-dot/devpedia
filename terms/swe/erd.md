---
id: erd
term: ERD
aliases:
  - Entity-Relationship Diagram
  - 개체-관계 다이어그램
  - 개체 관계도
  - 이알디
category: swe
tags:
  - 관계형
  - 문서화
level: 1
related:
  - rdbms
  - primary-foreign-key
  - normalization
  - join
  - sequence-diagram
see_also:
  - https://mermaid.js.org/syntax/entityRelationshipDiagram.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

저장할 데이터 덩어리(테이블)들과 **그 사이 관계**를 상자와 선으로 그린 그림.

## 비유

가족 **족보 그림**. 사람 대신 "회원·주문·상품" 같은 상자를 두고, 누가 누구에게 딸려 있는지(한 회원이 주문 여러 개)를 선과 까마귀발 표시로 적는다.

## 예시

Devpedia 카드를 파일 대신 DB 에 넣는다면 이런 ERD 가 된다.

```text
erDiagram
    CATEGORY ||--o{ TERM : "포함"
    TERM     }o--o{ TAG  : "붙음"
    TERM {
        string id PK
        string term
        int    level
        string category_id FK
    }
```

카테고리 하나에 카드 여럿(1:N), 카드와 태그는 서로 여럿(N:M)이다. `||--o{` 는 "정확히 하나 – 0개 이상"이라는 뜻이고, N:M 은 실제 테이블로 만들 때 중간 테이블(TERM_TAG)로 풀린다. 설계 초반에 이 그림부터 그려두면 외래키를 어디에 둘지가 저절로 정해진다.

## 헷갈리기 쉬운 것

- **클래스 다이어그램**은 코드의 클래스·메서드 구조, ERD 는 DB 테이블 구조. 모양은 비슷하지만 ERD 에는 메서드가 없고 키(PK/FK)가 있다.
- **정규화**는 ERD 를 그리면서 중복을 줄여가는 작업. ERD 는 결과물, 정규화는 과정.
