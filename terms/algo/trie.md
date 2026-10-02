---
id: trie
term: 트라이
aliases:
  - Trie
  - 접두사 트리
  - Prefix Tree
  - 문자열 트리
category: algo
tags:
  - 트리
  - 검색
level: 2
kind: concept
related:
  - tree
  - hash-table
  - binary-search
  - backtracking
  - index
  - kmp
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

단어를 **글자 하나씩 가지로 뻗어** 저장해서 앞부분이 같은 단어를 한 번에 찾는 트리.

## 비유

**사전의 색인 탭**. ㄱ 탭 → "가" → "가나" 식으로 앞글자를 따라 내려가면, 같은 앞글자로 시작하는 단어들이 자연히 한 뭉치로 모여 있다.

## 예시

```python
class Trie:
    def __init__(self):
        self.root = {}                          # 노드 = dict, 단어 끝 표시는 "$"

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["$"] = True
    def starts_with(self, prefix):              # 접두사로 시작하는 단어 전부
        node = self.root
        for ch in prefix:
            if ch not in node: return []
            node = node[ch]
        return self._collect(node, prefix)
```

`_collect` 는 노드 아래를 DFS 로 훑어 `$` 를 만날 때마다 단어를 모으면 된다. Devpedia 검색창에 "ba" 를 치면 `backtracking`, `balanced-tree` 를 바로 띄우는 자동완성이 이것이고, 단어 길이가 L 이면 사전 크기와 상관없이 O(L) 에 접두사를 찾는다. 코딩테스트에선 "전화번호 목록(한 번호가 다른 번호의 접두사인가)" 류로 나오고, 면접에선 "자동완성을 어떻게 구현할 건가?" 의 정답 재료다.

## 헷갈리기 쉬운 것

- **해시 테이블**: 정확히 일치하는 단어 하나 찾기는 해시가 더 빠르고 간단하다. "이걸로 시작하는 단어 전부" 는 해시로 못 하고 트라이가 필요하다.
- **이진 탐색 트리**: BST 는 단어 전체를 비교하며 좌우로 내려가고, 트라이는 글자 하나가 한 층이다. 트라이는 비교 횟수가 단어 길이에만 비례한다.
- **메모리**: 글자마다 노드를 만들어 메모리를 많이 먹는다. 실무 검색엔진은 압축 트라이(radix tree)나 역색인을 쓴다.
