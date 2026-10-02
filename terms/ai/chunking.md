---
id: chunking
term: 청킹
aliases:
  - Chunking
  - 청크
  - 문서 분할
  - 텍스트 분할
  - Text Splitting
category: ai
tags:
  - RAG
  - 임베딩
  - 검색
  - LLM
level: 2
kind: concept
related:
  - rag
  - embedding
  - context-window
  - token
  - vector-db
  - reranker
  - pgvector
see_also:
  - https://python.langchain.com/docs/concepts/text_splitters/
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

긴 문서를 **검색·임베딩하기 좋은 크기의 조각**으로 자르는 RAG 전처리.

## 비유

두꺼운 책을 통째로 색인하지 않고 **문단 단위로 카드에 옮겨 적어** 서랍에 넣는 것. 질문이 오면 책 한 권이 아니라 꼭 맞는 카드 몇 장만 꺼내 읽는다.

## 예시

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,        # 글자 수 기준 (토큰 아님) — 임베딩 모델 입력 한도 안에서
    chunk_overlap=50,      # 앞 조각의 끝 50자를 다음 조각 앞에 겹쳐 둔다
    separators=["\n\n", "\n", " "],   # 문단 → 줄 → 단어 순으로 자른다
)
chunks = splitter.split_text(discharge_summary)   # 퇴원 요약 1건 → 조각 6~10개
# 조각마다 {"doc_id", "section", "date"} 메타데이터를 붙여 임베딩 → pgvector 에 저장
```

임베딩 모델은 입력 한도(예: 512 토큰)가 있고, 한 벡터에 내용이 많이 섞이면 뜻이 흐려져 검색이 안 된다. 그래서 **너무 크면** 엉뚱한 조각이 걸리고 **너무 작으면** 문맥이 끊긴다(검사 수치 표가 반 토막). EMR 문서는 "주호소/현병력/검사/처방" 처럼 섹션 구조가 뚜렷하므로 글자 수보다 섹션 경계로 먼저 자르는 편이 낫고, 각 조각에 문서 ID·종류·날짜를 메타데이터로 붙여야 "이 환자의 최근 처방만" 처럼 걸러서 검색된다. 겹침(overlap)은 문장이 경계에서 잘려도 어느 한 조각에는 온전히 들어가게 해 준다. 청크 크기는 정답이 없어 200~1000 토큰 사이에서 시작해 검색 품질을 재 보며 정한다.

## 헷갈리기 쉬운 것

- **글자 vs 토큰**: 위 500 은 글자 수다. 한국어는 글자 하나가 토큰 1~2개가 되므로, 임베딩 모델 한도(토큰)에 맞추려면 토크나이저 기준으로 세는 splitter 를 쓴다.
- **컨텍스트 윈도우**: LLM 이 한 번에 읽을 수 있는 양. 청킹은 그 안에 **골라 넣을** 조각을 만드는 일이라, 윈도우가 128k 라고 청킹이 필요 없어지지는 않는다(검색 정밀도와 비용).
- **문서 단위 저장**: 청킹 없이 문서 하나를 벡터 하나로 넣으면 긴 문서의 세부 내용이 한 벡터에 뭉개져 검색이 안 된다.
